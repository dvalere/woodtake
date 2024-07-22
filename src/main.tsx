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

    //gallery image block variables 
    const [block1, setBlock1] = useState("emptyblock.png");
    const [block2, setBlock2] = useState("emptyblock.png");
    const [block3, setBlock3] = useState("emptyblock.png");
    const [block4, setBlock4] = useState("emptyblock.png");
    const [block5, setBlock5] = useState("emptyblock.png");
    const [block6, setBlock6] = useState("emptyblock.png");
    const [block7, setBlock7] = useState("emptyblock.png");
    const [block8, setBlock8] = useState("emptyblock.png");
    const [block9, setBlock9] = useState("emptyblock.png");
    const [rangenum, updateRange]= useState(8);
    const [currentSet, setSet] = useState('posts'); 
    const [] = useState(async() :Promise<void> =>{
      await Blocks(); //It's using 8 for the first 2 pages, and not allowing the user to see a third page, or anything after that
      //The 9th block on the 2nd page also doesn't work
    })

    function incrementRange(){
      updateRange(rangenum + 1);
    }

    function decrementRange(){
      updateRange(rangenum - 1);
    }
    //Rangenum has to reflect the accurate amount of posts
    async function Blocks(){
      const set = "posts";
      let holder = rangenum;
      let result = await context.redis.zRange(set, holder, holder);
      let ting = await context.redis.hget(result[0].member, 'img');

      if (currentPageNumber == 0){
        setBlock8(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock7(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock6(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock5(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock4(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock3(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock2(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock1(ting!);
      }
      else{
        setBlock9(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock8(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock7(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock6(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock5(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock4(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock3(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock2(ting!);
        holder--;
        result = await context.redis.zRange(set, holder, holder);
        ting = await context.redis.hget(result[0].member, 'img');
        setBlock1(ting!);
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
        setIdentify(submittedComment.id);
        setImageUrl(values.myImage);
        setDescription(values.myDescription);
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
        one={block1}
        two={block2}
        three={block3}
        four={block4}
        five={block5}
        six={block6}
        seven={block7}
        eight={block8}
        blocks={Blocks}
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
        one={block1}
        two={block2}
        three={block3}
        four={block4}
        five={block5}
        six={block6}
        seven={block7}
        eight={block8}
        nine={block9}
        incrementRange={incrementRange}
        decrementRange={decrementRange}
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
        setPage={setPage}
        blocks={Blocks}
        />;
        break;
      default:
        currentPage = <Landing setPage={setPage} page={0} incrementCurrentPage={incrementCurrentPage} decrementCurrentPage={decrementCurrentPage} blocks={Blocks}
        one={block1}
        two={block2}
        three={block3}
        four={block4}
        five={block5}
        six={block6}
        seven={block7}
        eight={block8}
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