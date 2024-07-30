import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Comment, ZRangeOptions } from '@devvit/public-api';
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
    const [imageURL, setImageUrl] = context.useState('emptyblock.png');
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

    const [Block1Dsc, setBlock1Dsc] = useState('');
    const [Block2Dsc, setBlock2Dsc] = useState('');
    const [Block3Dsc, setBlock3Dasc] = useState('');
    const [Block4Dsc, setBlock4Dsc] = useState('');
    const [Block5Dsc, setBlock5Dsc] = useState('');
    const [Block6Dsc, setBlock6Dsc] = useState('');
    const [Block7Dsc, setBlock7Dsc] = useState('');
    const [Block8Dsc, setBlock8Dsc] = useState('');
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
     await Blocks(currentPageNumber);
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

    async function Blocks(pagenum: number){
      console.log("RUNNING");
      let setsize = (await logZCard());
      let test = await context.redis.zRange(set, 0, -1);
      test = test.reverse();
      let parsed;
      let goal;

      if (pagenum == 0){
        goal = (7);
      }
      if (pagenum == 1){
        goal = 7 + ((7*pagenum)+pagenum);
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
          if (result){
          parsed = JSON.parse(test[range].member);
          if (range == goal-8){
            setBlock1(parsed.img);
            setBlock1Dsc(parsed.dsc);
          }
          else if (range == goal-7){
            setBlock2(parsed.img);
            setBlock2Dsc(parsed.dsc);
          }
          else if (range == goal-6){
            setBlock3(parsed.img);
            setBlock3Dasc(parsed.dsc);
          }
          else if (range == goal-5){
            setBlock4(parsed.img);
            setBlock4Dsc(parsed.dsc);
          }
          else if (range == goal-4){
            setBlock5(parsed.img);
            setBlock5Dsc(parsed.dsc);
          }
          else if (range == goal-3){
            setBlock6(parsed.img);
            setBlock6Dsc(parsed.dsc);
          }
          else if (range == goal-2){
            setBlock7(parsed.img);
            setBlock7Dsc(parsed.dsc);
          }
          else if (range == goal-1){
            setBlock8(parsed.img);
            setBlock8Dsc(parsed.dsc);
          }
        }
      }
    }
        else{
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
        //await Blocks(newPageNumber);
      }
      
      async function decrementCurrentPage(){ 
        const newPageNumber = currentPageNumber - 1;
        setCurrentPageNumber(newPageNumber);
        //console.log(newPageNumber);
        //await Blocks(newPageNumber);
      }
      
      async function redirectFunction(url: string, desc: string){
        //Add something to check if the blocks actually have a "post" in them
        setImageUrl(url);
        setDescription(desc);
        setPage('viewingPost');
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
        await Blocks(currentPageNumber); //Update the blocks
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
        dsc1={Block1Dsc}
        dsc2={Block2Dsc}
        dsc3={Block3Dsc}
        dsc4={Block4Dsc}
        dsc5={Block5Dsc}
        dsc6={Block6Dsc}
        dsc7={Block7Dsc}
        dsc8={Block8Dsc}
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
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
        setPage={setPage}
        blocks={Blocks}
        redirect={redirectFunction}
        />;
        break;
      default:
        currentPage = <Landing setPage={setPage} page={0} incrementCurrentPage={incrementCurrentPage} decrementCurrentPage={decrementCurrentPage} blocks={Blocks} block0={Block0} block1={Block1} block2={Block2} block3={Block3} block4={Block4} block5={Block5} block6={Block6} block7={Block7} block8={Block8} redirect={redirectFunction} dsc1={Block1Dsc} dsc2={Block2Dsc} dsc3={Block3Dsc} dsc4={Block4Dsc} dsc5={Block5Dsc} dsc6={Block6Dsc} dsc7={Block7Dsc} dsc8={Block8Dsc}
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