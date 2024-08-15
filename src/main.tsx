import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Comment, ZRangeOptions } from '@devvit/public-api';
import { RenderContext } from '@devvit/public-api/devvit/internals/blocks/handler/RenderContext.js';
import { Guide } from './PAGES/guide.js';
import { Leaderboard } from './PAGES/leaderboard.js';
import { ViewingPost } from './PAGES/viewingPost.js';
import { Gallery } from './PAGES/gallery.js';
import { Comments } from './PAGES/comments.js';
import { Block } from './utils/block.js';
import { comment } from './utils/comment.js';
import type { T1ID } from  '/Users/darius.valere/devapps/woodtake/node_modules/@devvit/shared-types/tid.d.ts';
import type { T_PREFIX } from '/Users/darius.valere/devapps/woodtake/node_modules/@devvit/shared-types/tid.d.ts';
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
    const leaderboard = 'leaderboard_' + context.postId!;
    const [page, setPage] = useState('gallery');
    const [identify, setIdentify] = context.useState(''); 
    const [imageURL, setImageUrl] = context.useState('emptyblock.png');
    const [description, setDescription] = context.useState('');  
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [commentpagenum, setCommentPageNum] = useState(0);
    const [currentBlock, setCurrentBlock] = useState({commentId: '', img: 'emptyblock.png', dsc: ''});
    const [blockArray, setBlockArray] = useState([
      { img: 'emptyblock.png', dsc: '', commentId: ''},
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
      { commentId: '', comment: '', authorId: ''},
      { commentId: '', comment: '', authorId: ''},
      { commentId: '', comment: '', authorId: ''},
      { commentId: '', comment: '', authorId: ''},
    ]);

    const [upvoteArray, setUpvoteArray] = useState([
      0, 0, 0, 0
    ]);

    //Four comments for each page


    const [LeaderboardArray, setLeaderboardArray] = useState([
      '', '', '', '', '', '', '', '', '', '',  '', '', '', '', '', '', '', '', '', ''
    ]); //Top 20 usernames

    const [ScoreArray, setScoreArray] = useState([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);

    const [] = useState(async() :Promise<void> =>{
      try{
        await Blocks(0);
    } catch (err) { console.error(`An error occurred: ${err}`); }
    }) 


    async function logZCard() {
      const result = await context.redis.zCard(set);
      return result;
    }

    async function Blocks(pagenum: number) {
      //console.log("Running Blocks...");
      let setsize = (await logZCard());
      let itemsOnThePage = await context.redis.zRange(set, pagenum * 8, pagenum * 8 + 7, {
        reverse: true,
        by: 'rank',
      });
      setBlockArray(itemsOnThePage.map(item => JSON.parse(item.member)));
    } 

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

    async function loadComments(theBlock: Block){
      //console.log('loading comments')
      //console.log(await context.redis.hget(theBlock.commentId, context.userId!));
      const type = await context.redis.type(theBlock.commentId);
      if (type !== 'zset') {
        console.error(`Expected a sorted set, but got ${type}`); //It's getting a "hash" for some reason?
        return;
      }
      const comments = await context.redis.zRange(theBlock.commentId, commentpagenum * 4, commentpagenum * 4 + 3 );
      console.log({comments});
    
      setCommentArray(comments.map(comment => JSON.parse(comment.member)));
      setUpvoteArray(comments.map(comment => comment.score));
      //console.log({commentArray});
    };

    async function incrementCommentPage(){ 
      const newPageNumber = commentpagenum + 1;
      setCommentPageNum(newPageNumber);
      await loadComments(currentBlock);
    }
    
    async function decrementCommentPage(){ 
      const newPageNumber = commentpagenum - 1;
      setCommentPageNum(newPageNumber);
      await loadComments(currentBlock);
    }//Set the upvote numbers from here

    async function upvoteFunction(current: comment){ //Add 1 to the score of the comment, also connect the user ID to the value, so they can't upvote the same comment multiple times
      if (await context.redis.hget(current.commentId, context.userId!) == 'upvoted'){ //Hset which uses the comment ID as the key, and the user IDs of upvoters as values
        await context.redis.hdel(current.commentId, [context.userId!]); //If the person has upvoted, and they just clicked the upvote button again, then remove their upvote, and subtract 1 from the comment's upvotes
        await context.redis.zIncrBy((currentBlock.commentId), JSON.stringify({commentId: current.commentId, comment: current.comment, authorId: current.authorId}), -1);
        //await redis.zAdd(currentBlock.commentId, {member: JSON.stringify({commentId: theID, comment: values.myComment, authorId: context.userId}), score: 0}); //Add the comment to the zset with 0 upvotes at the start
      }
      else{ //Else, add their upvote to the hset, and add and 1 to the comments upvotes 
        await context.redis.hset(current.commentId, {[context.userId!]: 'upvoted'});
        await context.redis.zIncrBy((currentBlock.commentId), JSON.stringify({commentId: current.commentId, comment: current.comment, authorId: current.authorId}), 1);
      }
      console.log(`Upvotes: ${await context.redis.zScore((currentBlock.commentId), current.commentId)}`);
      await loadComments(currentBlock); 
    }
    
    async function loadLeaderboard(){
      try {
        //Returns top 20 users to an array
        let board = await context.redis.zRange(leaderboard, 0, 19);
        console.log(board);
        //console.log({board});
        let usernames = await Promise.all(board.map(spot => context.reddit.getUserById(spot.member)));
        //console.log({usernames});
        setLeaderboardArray(usernames.map(user => user.username));
        //console.log({LeaderboardArray});
        setPage('leaderboard');
      } catch (error) {
        console.error(error);
      }

      /*
          const location = await reddit.getCommentById(currentBlock.commentId);
          const theReply = await location.reply({text: `${values.myComment}`}); //Creating the reply to the post
          const theID = theReply.id;
          await redis.zAdd(currentBlock.commentId, {member: JSON.stringify({commentId: theID, comment: values.myComment, authorId: context.userId}), score: 0}); //Add the comment to the zset with 0 upvotes at the start
          await loadComments(currentBlock); //Update the comments
          **/
    }


    //When comment is submitted, submit their userID to the leaderboard zset
    //When a comment is upvoted or downvoted, access the score of the comment creator
    //User ID is gonna have to be added to the comment object
    //zset with overarching comment ID as the name
    //members have the "comment" IDs, upvoters and author ID, scores are the upvotes
    //When someone upvotes, their vote is added to a list of pairs. When they downvote, the number is removed.
    //i.e. context.redis.zAdd((currentBlock.commendId), {member: JSON.stringify({commentID: current.commentId, comment: current.comment, authorId: context.userId, upvoters: [user1, user2, user3]}), score: newScore});
    //If they click on the upvote button, it will check if their ID is in the upvoters array. If it is, it will remove it. If it isn't, it will add it.
  

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
          //console.log(currentBlock.commentId);
          //console.log(`comment: ${values.myComment}`);
          const location = await reddit.getCommentById(currentBlock.commentId);
          const theReply = await location.reply({text: `${values.myComment}`}); //Creating the reply to the post
          const theID = theReply.id;
          await redis.zAdd(currentBlock.commentId, {member: JSON.stringify({commentId: theID, comment: values.myComment, authorId: context.userId}), score: 0}); //Add the comment to the zset with 0 upvotes at the start
          await loadComments(currentBlock); //Update the comments
          //Check if the user is in the leaderboard
          let itExists = await redis.zScore(leaderboard, context.userId!);
          console.log({itExists});
          let thewhatever = await redis.zRange(leaderboard, 0, 0);
          if (thewhatever !== null){
            console.log('The member exists in the sorted set.');
            await context.redis.zRem(leaderboard, [context.userId!]);
            console.log(`amount of users in the leaderboard: ${await redis.zCard(leaderboard)}`);
          } else {
            console.log('The member does not exist in the sorted set.');
            await redis.zAdd(leaderboard, {member: context.userId!, score: 0});
            console.log(`this ran`);
          }
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
        currentPage = <Leaderboard 
        setPage={setPage}
        blocks={Blocks}
        currentpage={currentPageNumber}

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
        blocks={Blocks}
        currentpage={currentPageNumber}
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
        toLeaderboard={loadLeaderboard}
        />;
        break;
      case 'comments':
        currentPage = <Comments 
        setPage={setPage}
        currentPost={identify}
        commentForm={commentForm}
        commentArray={commentArray}
        incrementCommentPage={incrementCommentPage}
        decrementCommentPage={decrementCommentPage}
        commentPage={commentpagenum}
        upvoteFunction={upvoteFunction}
        upvoteArray={upvoteArray}
        />;
        break;
      default:
        currentPage = <Gallery setPage={setPage} page={0} incrementCurrentPage={incrementCurrentPage} decrementCurrentPage={decrementCurrentPage} blocks={Blocks} redirect={redirectFunction} blockArray={blockArray} toLeaderboard={loadLeaderboard}
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


//Make it so comments update when you switch posts....
//UPVOTE BUTTON BREAKS IT