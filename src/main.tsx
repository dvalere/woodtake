import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Comment, ZRangeOptions } from '@devvit/public-api';
import { RenderContext } from '@devvit/public-api/devvit/internals/blocks/handler/RenderContext.js';
import { Guide } from './PAGES/guide.js';
import { Leaderboard } from './PAGES/leaderboard.js';
import { ViewingPost } from './PAGES/viewingPost.js';
import { Gallery } from './PAGES/gallery.js';
import { Comments } from './PAGES/comments.js';
import { Block } from './utils/block.js';
import type { T1ID } from  '/Users/darius.valere/devapps/woodtake/node_modules/@devvit/shared-types/tid.d.ts';
Devvit.configure({ media: true, redditAPI: true, redis: true,});

export type PageProps = {
  setPage: (page: string) => void;
}

Devvit.addCustomPostType({
  name: 'woodID',
  description: 'Identify types of wood',
  height: 'regular',
  render: context => {
    const { useState } = context;
    const set = 'post_' + context.postId!;
    const [page, setPage] = useState('gallery');
    const [identify, setIdentify] = context.useState(''); 
    const [imageURL, setImageUrl] = context.useState('emptyblock.png');
    const [description, setDescription] = context.useState('');  
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [currentBlock, setCurrentBlock] = useState({commentId: '', img: 'emptyblock.png', dsc: ''});
    const [blockArray, setBlockArray] = useState([
      { img: 'emptyblock.png', dsc: '', commentId: '' },
      { img: 'emptyblock.png', dsc: '', commentId: '' },
      { img: 'emptyblock.png', dsc: '', commentId: '' },
      { img: 'emptyblock.png', dsc: '', commentId: '' },
      { img: 'emptyblock.png', dsc: '', commentId: '' },
      { img: 'emptyblock.png', dsc: '', commentId: '' },
      { img: 'emptyblock.png', dsc: '', commentId: '' },
      { img: 'emptyblock.png', dsc: '', commentId: '' },
      { img: 'emptyblock.png', dsc: '', commentId: '' },
    ]);

    const [commentArray, setCommentArray] = useState([
      { commentId: '', text: ''},
      { commentId: '', text: ''},
      { commentId: '', text: ''},
      { commentId: '', text: '' },
    ]);
    //Four comments for each page

    const [] = useState(async() :Promise<void> =>{
      try{
        await Blocks(0);
    } catch (err) { console.error(`An error occurred: ${err}`); }
    }) 

    async function logZCard() {
      const result = await context.redis.zCard(set);
      return result;
    }

    //Takes page number
    //Gets the range using the page number
    //Updates states

    //Take in page number
    //Create a range variable
    //If page number  is 0, range is size-size+7
    //Else, range is size - size +7*page number


    async function Blocks(pagenum: number) {
      console.log("Running Blocks...");
      let setsize = (await logZCard());
      let itemsOnThePage = await context.redis.zRange(set, pagenum * 8, pagenum * 8 + 7, {
        reverse: true,
        by: 'rank',
      });
      /*
      page 0: 0-7
      page 1: 8-15
      page 2: 16-23
       */

      setBlockArray(itemsOnThePage.map(item => JSON.parse(item.member)));
      //console.log({blockArray});
    } //Successfully retrieves ID...

    async function loadComments(theBlock: Block){
      console.log({theBlock});
      // Check if theBlock.commentID is a sorted set
      const type = await context.redis.type(theBlock.commentId);
      const type2 = await context.redis.type(set);
      if (type !== 'zset') {
        console.error(`Expected a sorted set, but got ${type}`); //It's getting a "hash" for some reason?
        return;
      }
      const comments = await context.redis.zRange(theBlock.commentId, 0, 3);
      setCommentArray(comments.map(comment => JSON.parse(comment.member)));
    };

    async function incrementCurrentPage(){ 
      const newPageNumber = currentPageNumber + 1;
      setCurrentPageNumber(newPageNumber);
      await Blocks(newPageNumber);
    }
    
    async function decrementCurrentPage(){ 
      const newPageNumber = currentPageNumber - 1;
      setCurrentPageNumber(newPageNumber);
      await Blocks(newPageNumber);
    }
      
    async function redirectFunction(theObject: Block){
      //Also, add something to check if the blocks actually have a "post" in them
      if (theObject.img == 'emptyblock.png'){
        return;
      }else{
        setCurrentBlock(theObject);
        //setIdentify(theObject.commentID);
        //setImageUrl(theObject.img);
        //setDescription(theObject.dsc);
      setPage('viewing');
      }
    }

    async function deletePost(id: string){
      await context.redis.zRem(set, [id]);
      await Blocks(currentPageNumber);
    }

    async function upvoteComment(){ //Add 1 to the score of the comment, also connect the user ID to the value, so they can't upvote the same comment multiple times
       
    }

    async function removeUpvote(){ //Subtract 1 from the score of the comment

    }
    const imageForm = context.useForm({
      title: 'Upload an image!',
      fields: [
        {
          name: 'myImage',
          type: 'image',
          label: 'Upload image',
          required: true,
        },
        {
          type: 'paragraph',
          name: 'myDescription',
          label: 'Description',
          required: true,
        },
      ],
    }, async (values) => {
      try {
        const { redis, media, ui} = context;

        const response = await media.upload ({
          url: values.myImage,
          type: 'image',
        });   //Extract ID from image URL
        
        //Comment creation
        const submittedComment = await context.reddit.submitComment({
            id: context.postId!, 
            richtext: new RichTextBuilder()
              .image({ mediaId: response.mediaId })
              .codeBlock({}, (cb) => cb.rawText(values.myDescription)),
        });
        await redis.zAdd(set, {member: JSON.stringify({commentId: submittedComment.id, img: values.myImage, dsc: values.myDescription}), score: Date.now()}); //Use the postID as the name of the sorted set. This way, posts from other custom posts won't show.

        ui.showToast(`Post created!`);
        await Blocks(currentPageNumber); //Update the blocks
        setPage('ViewingPost'); //Set the page to the new post
      } catch (err) {
        throw new Error(`Error uploading media: ${err}`);
      }
    });

    const commentForm = context.useForm({
      title: 'Leave a comment!',
      fields: [
        {
          type: 'paragraph',
          name: 'myComment',
          label: 'Comment',
          required: true,
        }
      ]
      }, async (values) => {
        try {
          const { reddit, ui, redis } = context;
          const location = context.reddit.getCommentById(identify);
          const theReply = (await location).reply({text: `{newComment}`}); //Creating the reply to the post
          const theID = (await theReply).id;
          await redis.zAdd(currentBlock.commentId, {member: JSON.stringify({commentId: theID, comment: values.myComment}), score: 0}); //Add the comment to the zset with 0 upvotes at the start
          ui.showToast(`Comment submitted!`);
        } catch (err) {
          throw new Error(`Error submitting comment: ${err}`);
        }
    })     
    //Create a separate redis zset for the comments of each post, with the ID as the key   
    //<button onPress={async () => context.reddit.getCommentById(identify).reply({text: `{newComment}`})}> 
    
    let currentPage;
    switch (page) {
      case 'guide':
        currentPage = <Guide 
        imageForm={imageForm} 
        setPage={setPage}
        />; 
        break;
      case 'leaderboard':
        currentPage = <Leaderboard setPage={setPage} 
        />;
        break;
      case 'viewing':
        currentPage = <ViewingPost 
        image={imageURL}
        description={description}
        id={identify}
        currentBlock={currentBlock}
        commentForm={commentForm}
        setPage={setPage}
        loadComments={loadComments}
        />;
        break;
      case 'gallery':
        currentPage = <Gallery
        page={currentPageNumber}
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
        setPage={setPage}
        blocks={Blocks}
        redirect={redirectFunction}
        blockArray={blockArray}
        />;
        break;
      case 'comments':
        currentPage = <Comments 
        setPage={setPage}
        currentPost={identify}
        commentForm={commentForm}
        commentArray={commentArray}
        />;
        break;
      default:
        currentPage = <Gallery setPage={setPage} page={0} incrementCurrentPage={incrementCurrentPage} decrementCurrentPage={decrementCurrentPage} blocks={Blocks} redirect={redirectFunction} blockArray={blockArray}
        />;
    }

    return (
      <blocks>
        {currentPage}
      </blocks>
    )
  }
});

Devvit.addMenuItem({  
  location: 'subreddit',  
  label: 'Add woodID',  
  onPress: async (_, context) => {  
    const { reddit, ui } = context;  
    const currentSubreddit = await reddit.getCurrentSubreddit();  

    try {
      await reddit.submitPost({  
        title: 'woodID',  
        subredditName: `${currentSubreddit.name}`, 
        preview: (  
          <vstack>  
            <text>Loading...</text>  
          </vstack>  
        ),  
      });  
      ui.showToast(`Submitted woodID post to ${currentSubreddit.name}`);  
    } catch (error) {
      console.error(error);
      ui.showToast(`Failed to submit woodID post: ${(error as Error).message}`);}
  },  
});

export default Devvit;