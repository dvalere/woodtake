import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Comment } from '@devvit/public-api';
import { RenderContext } from '@devvit/public-api/devvit/internals/blocks/handler/RenderContext.js';
import { Landing } from './PAGES/landing.js';
import { Guide } from './PAGES/guide.js';
import { Leaderboard } from './PAGES/leaderboard.js';
import { ViewingPost } from './PAGES/viewingPost.js';
import { generateID } from './utils/utils.js';
import { getPost } from './utils/getPostTypeById.js';
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
    const [page, setPage] = useState('landing');
    const [identify, setIdentify] = context.useState(''); 
    const [imageURL, setImageUrl] = context.useState('');
    const [description, setDescription] = context.useState('');  
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [Block0, setBlock0] = useState('emptyblock.png');
    const [Block1, setBlock1] = useState('emptyblock.png');
    const [Block2, setBlock2] = useState('emptyblock.png');
    const [Block3, setBlock3] = useState('emptyblock.png');
    const [Block4, setBlock4] = useState('emptyblock.png');
    const [Block5, setBlock5] = useState('emptyblock.png');
    const [Block6, setBlock6] = useState('emptyblock.png');
    const [Block7, setBlock7] = useState('emptyblock.png');
    const [Block8, setBlock8] = useState('emptyblock.png');
    async function logZCard() {
      const result = await context.redis.zCard(set);
      return result;
    }
    const [actualrange, setActualRange] = useState(9);
    //Ignoring this array for now, it was causing too many issues
    const [arr, setArr] = context.useState(["emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png"]); //Array of image variables

    //gallery image block variables 

    let rangenum: number; //This is what's causing only 8 blocks to show up
    const [currentSet, setSet] = useState('posts'); 

    const [] = useState(async() :Promise<void> =>{
      try{
     await Blocks();
    } catch (err) { console.error(`An error occurred: ${err}`); }
    //The setBlock() lines break it for some reason?
    //The app doesn't load because of the await at the start, if I remove await, it works, so something in the function must be causing the app to freeze
     //App doesn't load when this function is called at the start...
       //It's using 8 for the first 2 pages, and not allowing the user to see a third page, or anything after that
      //The 9th block on the 2nd page also doesn't work
    }) 


    function incrementRange(){
      //setActualRange(actualrange + 9);
    }

    function decrementRange(){
      //setActualRange(actualrange - 9);
    }
    //Rangenum has to reflect the accurate amount of posts

    //Make rangenum a simple number that starts at 8
    //Add and subtract 9 from it with every click using inc and dec range
    const [rng, setRange] = useState(8);

    async function Blocks(){
      let setsize = (await logZCard());
      let parsed;
      let goal;

      if (currentPageNumber == 0){
        goal = (setsize-setsize) + (7);
      }
      if (currentPageNumber == 1){
        goal = 7 + (setsize-setsize) + ((7*currentPageNumber)+1);
      }
      else{
        goal = 7 + (setsize-setsize) + ((7*currentPageNumber)+1);
      }
      let range = goal-8;

      try{
          for (range; range < (goal); range++){
            if (range == goal-8){
              let result = await context.redis.zRange(set, range, range);
              parsed = JSON.parse(result[0].member);
              setBlock1(parsed.img);
              console.log(`8: ${range}`); console.log({Block8});     range++; 
            }
            if (range == goal-7){
              let result = await context.redis.zRange(set, range, range);
              parsed = JSON.parse(result[0].member);
              setBlock2(parsed.img);
              console.log(`8: ${range}`); console.log({Block8});     range++; 
            }
            if (range == goal-6){
              let result = await context.redis.zRange(set, range, range);
              parsed = JSON.parse(result[0].member);
              setBlock3(parsed.img);
              console.log(`8: ${range}`); console.log({Block8});     range++; 
            }
            if (range == goal-5){
              let result = await context.redis.zRange(set, range, range);
              parsed = JSON.parse(result[0].member);
              setBlock4(parsed.img);
              console.log(`8: ${range}`); console.log({Block8});     range++; 
            }
            if (range == goal-4){
              let result = await context.redis.zRange(set, range, range);
              parsed = JSON.parse(result[0].member);
              setBlock5(parsed.img);
              console.log(`8: ${range}`); console.log({Block8});     range++; 
            }
            if (range == goal-3){
              let result = await context.redis.zRange(set, range, range);
              parsed = JSON.parse(result[0].member);
              setBlock6(parsed.img);
              console.log(`8: ${range}`); console.log({Block8});     range++; 
            }
            if (range == goal-2){
              let result = await context.redis.zRange(set, range, range);
              parsed = JSON.parse(result[0].member);
              setBlock7(parsed.img);
              console.log(`8: ${range}`); console.log({Block8});     range++; 
            }
            if (range == goal-1){
              let result = await context.redis.zRange(set, range, range);
              parsed = JSON.parse(result[0].member);
              setBlock8(parsed.img);
              console.log(`8: ${range}`); console.log({Block8});     range++; 
            }
          }
      } catch (err) { console.error(`An error occurred: ${err}`); }
    }
    //Takes page number
    //Gets the range using the page number
    //Updates states
    

    async function BlocksRETIRED(){  //The original blocks function..which doesn't work, so I created a new one
      let holder = (await logZCard());
      let range;
      let parsed;

      if (currentPageNumber == 0){
        range = (holder-holder) + (7);
      }
      if (currentPageNumber == 1){
        range = 7 + (holder-holder) + ((7*currentPageNumber)+1);
      }
      else{
        range = 7 + (holder-holder) + ((7*currentPageNumber)+1);
      }
      let result; 
      let ting8 = 'emptyblock.png', ting7 = 'emptyblock.png', ting6 = 'emptyblock.png', ting5 = 'emptyblock.png', ting4 = 'emptyblock.png', ting3 = 'emptyblock.png', ting2 = 'emptyblock.png', ting1 = 'emptyblock.png', ting0 = 'emptyblock.png';
      try{
        result = await context.redis.zRange(set, range, range);
        if (result[0] && result[0].member) {
          parsed = JSON.parse(result[0].member);
          setBlock8(parsed.img);
          console.log(`8: ${range}`); console.log({Block8});     range--; 
        }
        else if (result[0] && result[0].member) {
          result = await context.redis.zRange(set, range, range);
          parsed = JSON.parse(result[0].member);
          setBlock7(parsed.img);
          console.log(`7: ${range}`);  console.log({Block7});    range--; 
        }
        else if (result[0] && result[0].member) {
          result = await context.redis.zRange(set, range, range);
          parsed = JSON.parse(result[0].member);
          setBlock6(parsed.img);
          console.log(`6: ${range}`);  console.log({Block6});   range--;  
        }
        else if (result[0] && result[0].member) {
          result = await context.redis.zRange(set, range, range);
          parsed = JSON.parse(result[0].member);
          setBlock5(parsed.img);
          console.log(`5: ${range}`);  console.log({Block5});  range--;  
        }
        else if (result[0] && result[0].member) {
          result = await context.redis.zRange(set, range, range);
          parsed = JSON.parse(result[0].member);
          setBlock4(parsed.img);
          console.log(`4: ${range}`);  console.log({Block4});    range--; 
        }
        else if (result[0] && result[0].member) {
          result = await context.redis.zRange(set, range, range);
          parsed = JSON.parse(result[0].member);
          setBlock3(parsed.img);
          console.log(`3: ${range}`);  console.log({Block3});   range--;  
        }
        else if (result[0] && result[0].member) {
          result = await context.redis.zRange(set, range, range);
          parsed = JSON.parse(result[0].member);
          setBlock2(parsed.img);
          console.log(`2: ${range}`);  console.log({Block2});   range--;  
        }
        else if (result[0] && result[0].member) {
          result = await context.redis.zRange(set, range, range);

          parsed = JSON.parse(result[0].member);
          setBlock1(parsed.img);
          console.log(`1: ${range}`);  console.log({Block1});
        }
      } catch (err) { console.error(`An error occurred: ${err}`); }
        //setBlock1(ting1!); setBlock2(ting2!); setBlock3(ting3!); setBlock4(ting4!); setBlock5(ting5!); setBlock6(ting6!); setBlock7(ting7!); setBlock8(ting8!);
        //console.log(`${Block1}, ${Block2}, ${Block3}, ${Block4}, ${Block5}, ${Block6}, ${Block7}, ${Block8}`);
        const debug = await context.redis.zRange(set, 0, 30);
       // console.log({debug}, {ting1});
      };

      
      async function incrementCurrentPage(){ 
        const newPageNumber = currentPageNumber + 1;
        setCurrentPageNumber(newPageNumber);
        console.log(newPageNumber);
        await Blocks();
      }
      
      async function decrementCurrentPage(){ 
        const newPageNumber = currentPageNumber - 1;
        setCurrentPageNumber(newPageNumber);
        console.log(newPageNumber);
        await Blocks();
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

        ui.showToast(`Uploaded!`);
        await Blocks(); //Update the blocks
        setPage('ViewingPost'); //Set the page to the new post
      } catch (err) {
        throw new Error(`Error uploading media: ${err}`);
      }
    });

    
    let currentPage;
    switch (page) {
      case 'landing':
        currentPage = <Landing 
        setPage={setPage} 
        page={currentPageNumber}
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
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
        post={getPost("author", identify, imageURL, description)}
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
        incrementRange={incrementRange}
        decrementRange={decrementRange}
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
        setPage={setPage}
        blocks={Blocks}
        />;
        break;
      default:
        currentPage = <Landing setPage={setPage} page={0} incrementCurrentPage={incrementCurrentPage} decrementCurrentPage={decrementCurrentPage} blocks={Blocks} block0={Block0} block1={Block1} block2={Block2} block3={Block3} block4={Block4} block5={Block5} block6={Block6} block7={Block7} block8={Block8}
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