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
    const [arr, setArr] = useState(["emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png", "emptyblock.png"]); //Array of image variables

    //gallery image block variables 

    let actualrange = 0; //THis makes it not load because for some reason it's attempting to access nonexistent urls?
    let rangenum: number; //This is what's causing only 8 blocks to show up
    const [currentSet, setSet] = useState('posts'); 

    const [] = useState(async() :Promise<void> =>{
      await Blocks(); //It's using 8 for the first 2 pages, and not allowing the user to see a third page, or anything after that
      //The 9th block on the 2nd page also doesn't work
    })

    //Holder usestate array: has 8 indexes, represents the numbered blocks
    //Blocks(): 
    //actualrange: Doesn't work but I'll try again I guess

    function incrementRange(){
      actualrange += 9;
    }

    function decrementRange(){
      actualrange -= 9;
    }
    //Rangenum has to reflect the accurate amount of posts

    //Make rangenum a simple number that starts at 8
    //Add and subtract 9 from it with every click using inc and dec range

    async function Blocks(){
      console.log(actualrange);
      const set = "posts";
      let holder = actualrange;
      let result = await context.redis.zRange(set, holder, holder);
      //The problem is, holder ALWAYS stays the same, since the function is re-called every time a new page is loaded
      //Anddddd now the landing page down button doesn't change the page to gallery
      if (currentPageNumber == 0){
        let ting0 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting1 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting2 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting3 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting4 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting5 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting6 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting7 = await context.redis.hget(result[0].member, 'img');
        setArr([ting0!, ting1!, ting2!, ting3!, ting4!, ting5!, ting6!, ting7!]);
      }
      else{
        let ting0 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting1 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting2 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting3 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting4 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting5 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting6 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting7 = await context.redis.hget(result[0].member, 'img');
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        let ting8 = await context.redis.hget(result[0].member, 'img');
        setArr([ting0!, ting1!, ting2!, ting3!, ting4!, ting5!, ting6!, ting7!, ting8!]);
      }
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
        incrementRange();
        await Blocks();
        
      } catch (err) {
        throw new Error(`Error uploading media: ${err}`);
      }
    });

    //Maybe add a higher and lower range?
    //Should be ran everytime the page is changed just like the other functions
    //Could be ran inside incrementRange?


    //Takes in sorted set as paramter
    //uses zRange on set
    //
    
    let currentPage;
    switch (page) {
      case 'landing':
        currentPage = <Landing 
        setPage={setPage} 
        page={currentPageNumber}
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
        blocks={Blocks}
        arr={arr}
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
        arr={arr}
        incrementRange={incrementRange}
        decrementRange={decrementRange}
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
        setPage={setPage}
        blocks={Blocks}
        />;
        break;
      default:
        currentPage = <Landing setPage={setPage} page={0} incrementCurrentPage={incrementCurrentPage} decrementCurrentPage={decrementCurrentPage} blocks={Blocks} arr={arr}
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
        subredditName: 'chippitychop', 
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