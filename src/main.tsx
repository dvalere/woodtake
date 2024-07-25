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
      const result = await context.redis.zCard('posts');
      return result;
    }
    const [actualrange, setActualRange] = useState(9);
    //Ignoring this array for now, it was causing too many issues
    const [arr, setArr] = context.useState(["emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png"]); //Array of image variables

    //gallery image block variables 

    let rangenum: number; //This is what's causing only 8 blocks to show up
    const [currentSet, setSet] = useState('posts'); 

    const [] = useState(async() :Promise<void> =>{
      await Blocks();
       //It's using 8 for the first 2 pages, and not allowing the user to see a third page, or anything after that
      //The 9th block on the 2nd page also doesn't work
    })

    //Holder usestate array: has 8 indexes, represents the numbered blocks
    //Blocks(): 
    //actualrange: Doesn't work but I'll try again I guess

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
    async function Blocks(){ //Need a global variable that keeps the range, because the range edits within this function are remade everytime it's re-ran
      const set = "posts";
      let holder = (await logZCard());
      let range;

      if (currentPageNumber == 0) {
        range = (holder-holder) + (7);
      }
      else{
        range = (holder-holder) + (7*currentPageNumber);
      }
      let result; 
      let ting8, ting7, ting6, ting5, ting4, ting3, ting2, ting1, ting0;

        result = await context.redis.zRange(set, range, range);
        if (result[0] && result[0].member) {
          ting8 = await context.redis.hget(result[0].member, 'img');
          } console.log(`8: ${range}`);      range--; 
        result = await context.redis.zRange(set, range, range);
        if (result[0] && result[0].member) {
          ting7 = await context.redis.hget(result[0].member, 'img');
          } console.log(`7: ${range}`);      range--; 
        result = await context.redis.zRange(set, range, range);
        if (result[0] && result[0].member) {
          ting6 = await context.redis.hget(result[0].member, 'img');
          }  console.log(`6: ${range}`);     range--;  
        result = await context.redis.zRange(set, range, range);
        if (result[0] && result[0].member) {
          ting5 = await context.redis.hget(result[0].member, 'img');
          }  console.log(`5: ${range}`);     range--;  
        result = await context.redis.zRange(set, range, range);
        if (result[0] && result[0].member) {
          ting4 = await context.redis.hget(result[0].member, 'img');
          }  console.log(`4: ${range}`);      range--; 
        result = await context.redis.zRange(set, range, range);
        if (result[0] && result[0].member) {
          ting3 = await context.redis.hget(result[0].member, 'img');
          }  console.log(`3: ${range}`);     range--;  
        result = await context.redis.zRange(set, range, range);
        if (result[0] && result[0].member) {
          ting2 = await context.redis.hget(result[0].member, 'img');
          }  console.log(`2: ${range}`);     range--;  
        if (result[0] && result[0].member) {
          ting1 = await context.redis.hget(result[0].member, 'img');
          }  console.log(`1: ${range}`);      
        setBlock1(ting1!); setBlock2(ting2!); setBlock3(ting3!); setBlock4(ting4!); setBlock5(ting5!); setBlock6(ting6!); setBlock7(ting7!); setBlock8(ting8!);
          logZCard();
      };

    async function incrementCurrentPage(){ //For when someone clicks up in gallery
      setCurrentPageNumber(currentPageNumber + 1);
      console.log(currentPageNumber);
        await Blocks();
    }
    
    async function decrementCurrentPage(){ //For when someone clicks down in gallery
      setCurrentPageNumber(currentPageNumber - 1);
      console.log(currentPageNumber);
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
        await redis.hset(submittedComment.id, {img: values.myImage, dsc: values.myDescription});
        await redis.zAdd('posts', {member: submittedComment.id, score: Date.now()});
        ui.showToast(`Uploaded!`);

        setPage('ViewingPost');
        await Blocks();
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