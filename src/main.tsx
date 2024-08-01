import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Comment, ZRangeOptions } from '@devvit/public-api';
import { RenderContext } from '@devvit/public-api/devvit/internals/blocks/handler/RenderContext.js';
import { Landing } from './PAGES/landing.js';
import { Guide } from './PAGES/guide.js';
import { Leaderboard } from './PAGES/leaderboard.js';
import { ViewingPost } from './PAGES/viewingPost.js';
import { Gallery } from './PAGES/gallery.js';
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
    const [actualrange, setActualRange] = useState(9);

    const [Block0, setBlock0] = useState('emptyblock.png');
    const [Block1, setBlock1] = useState('emptyblock.png');
    const [Block2, setBlock2] = useState('emptyblock.png');
    const [Block3, setBlock3] = useState('emptyblock.png');
    const [Block4, setBlock4] = useState('emptyblock.png');
    const [Block5, setBlock5] = useState('emptyblock.png');
    const [Block6, setBlock6] = useState('emptyblock.png');
    const [Block7, setBlock7] = useState('emptyblock.png');
    const [Block8, setBlock8] = useState('emptyblock.png');
    
    const [Block1Dsc, setBlock1Dsc] = useState('');
    const [Block2Dsc, setBlock2Dsc] = useState('');
    const [Block3Dsc, setBlock3Dasc] = useState('');
    const [Block4Dsc, setBlock4Dsc] = useState('');
    const [Block5Dsc, setBlock5Dsc] = useState('');
    const [Block6Dsc, setBlock6Dsc] = useState('');
    const [Block7Dsc, setBlock7Dsc] = useState('');
    const [Block8Dsc, setBlock8Dsc] = useState(''); 

    const [Block1ID, setBlock1ID] = useState('');
    const [Block2ID, setBlock2ID] = useState('');
    const [Block3ID, setBlock3ID] = useState('');
    const [Block4ID, setBlock4ID] = useState('');
    const [Block5ID, setBlock5ID] = useState('');
    const [Block6ID, setBlock6ID] = useState('');
    const [Block7ID, setBlock7ID] = useState('');
    const [Block8ID, setBlock8ID] = useState('');

    //All these block variables will definitely be condensed into an array for each block later
    const [blockArray, setBlocks] = useState([
      { img: 'emptyblock.png', dsc: '', id: '' },
      { img: 'emptyblock.png', dsc: '', id: '' },
      { img: 'emptyblock.png', dsc: '', id: '' },
      { img: 'emptyblock.png', dsc: '', id: '' },
      { img: 'emptyblock.png', dsc: '', id: '' },
      { img: 'emptyblock.png', dsc: '', id: '' },
      { img: 'emptyblock.png', dsc: '', id: '' },
      { img: 'emptyblock.png', dsc: '', id: '' },
      { img: 'emptyblock.png', dsc: '', id: '' },
    ]);

    async function logZCard() {
      const result = await context.redis.zCard(set);
      return result;
    }
    //Ignoring this array for now, it was causing too many issues
    const [arr, setArr] = context.useState(["emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png"]); //Array of image variables


    const [] = useState(async() :Promise<void> =>{
      try{
     await Blocks(currentPageNumber);
    } catch (err) { console.error(`An error occurred: ${err}`); }
    }) 

    async function Blocks(pagenum: number){
      console.log("Running Blocks...");
      let setsize = (await logZCard());
      let test = await context.redis.zRange(set, 0, -1);
      test = test.reverse();
      let parsed;
      let goal;

      if (pagenum == 0){
        goal = (7);
      }
      if (pagenum == 1){
        goal = 7 + ((7*pagenum)+1); // change the second pagenums to 1 and it'll work...
      }
      else{
        goal = 7 + ((7*pagenum)+pagenum);
      }
      let range = goal-8;
      
      try{ //Images still don't update with the page number...
        for (range; range < (goal); range++){
          if (goal < setsize){
            if (await context.redis.zRange(set, range, range)){
              let result = await context.redis.zRange(set, range, range);
              if (test){ //For some reason,it's accessing the same numbers
                parsed = JSON.parse(test[range].member);
                if (range == goal-8){
                  //let cloneArray = [...blockArray]; 
                  //cloneArray[1] = { img: parsed.img, dsc: parsed.dsc, id: parsed.commendId}; 
                  //setBlocks(cloneArray);
                  //This doesn't work...^ Put aside for now
                  setBlock1(parsed.img);
                  setBlock1Dsc(parsed.dsc);
                  setBlock1ID(parsed.commentId);
                  console.log(`Block 1: ${parsed.img}, ${parsed.dsc}, ${parsed.commentId}`);
                }
                else if (range == goal-7){
                  setBlock2(parsed.img);
                  setBlock2Dsc(parsed.dsc);
                  setBlock2ID(parsed.commentId);
                  console.log(`Block 2: ${parsed.img}, ${parsed.dsc}, ${parsed.commentId}`);
                }
                else if (range == goal-6){
                  setBlock3(parsed.img);
                  setBlock3Dasc(parsed.dsc);
                  setBlock3ID(parsed.commentId);
                  console.log(`Block 3: ${parsed.img}, ${parsed.dsc}, ${parsed.commentId}`);
                }
                else if (range == goal-5){
                  setBlock4(parsed.img);
                  setBlock4Dsc(parsed.dsc);
                  setBlock4ID(parsed.commentId);
                  console.log(`Block 4: ${parsed.img}, ${parsed.dsc}, ${parsed.commentId}`);
                }
                else if (range == goal-4){
                  setBlock5(parsed.img);
                  setBlock5Dsc(parsed.dsc);
                  setBlock5ID(parsed.commentId);
                  console.log(`Block 5: ${parsed.img}, ${parsed.dsc}, ${parsed.commentId}`);
                }
                else if (range == goal-3){
                  setBlock6(parsed.img);
                  setBlock6Dsc(parsed.dsc);
                  setBlock6ID(parsed.commentId);
                  console.log(`Block 6: ${parsed.img}, ${parsed.dsc}, ${parsed.commentId}`);
                }
                else if (range == goal-2){
                  setBlock7(parsed.img);
                  setBlock7Dsc(parsed.dsc);
                  setBlock7ID(parsed.comment);
                  console.log(`Block 7: ${parsed.img}, ${parsed.dsc}, ${parsed.commentId}`);
                }
                else if (range == goal-1){
                  setBlock8(parsed.img);
                  setBlock8Dsc(parsed.dsc);
                  setBlock8ID(parsed.commentId);
                  console.log(`Block 8: ${parsed.img}, ${parsed.dsc}, ${parsed.commentId}`);
                }
              }
            }
          } else{
              console.log('No image found');
          }
        }
      } catch (err) { console.error(`An error occurred: ${err}`); }
      const debug = await context.redis.zRange(set, 0, 30);
      //console.log({debug});
    }
    //Takes page number
    //Gets the range using the page number
    //Updates states

    async function incrementCurrentPage(){ 
      const newPageNumber = currentPageNumber + 1;
      setCurrentPageNumber(newPageNumber);
      //console.log(newPageNumber);
      await Blocks(newPageNumber);
    }
    
    async function decrementCurrentPage(){ 
      const newPageNumber = currentPageNumber - 1;
      setCurrentPageNumber(newPageNumber);
      //console.log(newPageNumber);
      await Blocks(newPageNumber);
    }
      
    async function redirectFunction(id: string, url: string, desc: string){
      //Also, add something to check if the blocks actually have a "post" in them
      setIdentify(id);
      setImageUrl(url);
      setDescription(desc);
    }

    async function deletePost(id: string){
      await context.redis.zRem(set, [id]);
      await Blocks(currentPageNumber);
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
          await redis.zAdd(identify, {member: JSON.stringify({commentID: theID, comment: values.myComment}), score: 0}); //Add the comment to the zset with 0 upvotes at the start
          ui.showToast(`Comment submitted!`);
        } catch (err) {
          throw new Error(`Error submitting comment: ${err}`);
        }
    })     
    //Create a separate redis zset for the comments of each post, with the ID as the key   
    //<button onPress={async () => context.reddit.getCommentById(identify).reply({text: `{newComment}`})}> 
    
    let currentPage;
    switch (page) {
      case 'landing':
        currentPage = <Landing 
        setPage={setPage} 
        page={currentPageNumber}
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
        blockArray={blockArray}
        blocks={Blocks}
        block0={Block0}
        block1={Block1}
        block2={Block2}
        block3={Block3}
        block4={Block4}
        block5={Block5}
        block6={Block6}
        block7={Block7}
        block8={Block8}
        dsc1={Block1Dsc}
        dsc2={Block2Dsc}
        dsc3={Block3Dsc}
        dsc4={Block4Dsc}
        dsc5={Block5Dsc}
        dsc6={Block6Dsc}
        dsc7={Block7Dsc}
        dsc8={Block8Dsc}
        id1={Block1ID}
        id2={Block2ID}
        id3={Block3ID}
        id4={Block4ID}
        id5={Block5ID}
        id6={Block6ID}
        id7={Block7ID}
        id8={Block8ID}
        redirect={redirectFunction}
        />; 
        break;
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
      case 'viewingpost':
        currentPage = <ViewingPost 
        image={imageURL}
        description={description}
        id={identify}
        commentForm={commentForm}
        setPage={setPage}
        />;
      case 'gallery':
        currentPage = <Gallery
        page={currentPageNumber}
        block0={Block0}
        block1={Block1}
        block2={Block2}
        block3={Block3}
        block4={Block4}
        block5={Block5}
        block6={Block6}
        block7={Block7}
        block8={Block8}
        dsc1={Block1Dsc}
        dsc2={Block2Dsc}
        dsc3={Block3Dsc}
        dsc4={Block4Dsc}
        dsc5={Block5Dsc}
        dsc6={Block6Dsc}
        dsc7={Block7Dsc}
        dsc8={Block8Dsc}
        id1={Block1ID}
        id2={Block2ID}
        id3={Block3ID}
        id4={Block4ID}
        id5={Block5ID}
        id6={Block6ID}
        id7={Block7ID}
        id8={Block8ID}
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
        setPage={setPage}
        blocks={Blocks}
        redirect={redirectFunction}
        />;
        break;
      default:
        currentPage = <Gallery setPage={setPage} page={0} incrementCurrentPage={incrementCurrentPage} decrementCurrentPage={decrementCurrentPage} blocks={Blocks} block0={Block0} block1={Block1} block2={Block2} block3={Block3} block4={Block4} block5={Block5} block6={Block6} block7={Block7} block8={Block8} redirect={redirectFunction} dsc1={Block1Dsc} dsc2={Block2Dsc} dsc3={Block3Dsc} dsc4={Block4Dsc} dsc5={Block5Dsc} dsc6={Block6Dsc} dsc7={Block7Dsc} dsc8={Block8Dsc} id1={Block1ID} id2={Block2ID} id3={Block3ID} id4={Block4ID} id5={Block5ID} id6={Block6ID} id7={Block7ID} id8={Block8ID}
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