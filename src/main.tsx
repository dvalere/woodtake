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

    function incrementCurrentPage(){ //For when someone clicks up in gallery
      setCurrentPageNumber(currentPageNumber + 1);
      console.log(currentPageNumber);
    }
    
    function decrementCurrentPage(){ //For when someone clicks down in gallery
      setCurrentPageNumber(currentPageNumber - 1);
      console.log(currentPageNumber);
    }  

    let availablePage = 0;
    let availableBlocksLanding = 8; //For the landing page, which has 8 blocks instead of 9
    let availableBlocks = 9;
    function incrementAvailablePage(){
      if (availablePage == 0) {
        if (availableBlocksLanding > 0 ){
          availableBlocksLanding--;
        }
        else { 
          availablePage++; 
        }
      }
      else { 
        if (availableBlocks > 0){
          availableBlocks--;
        }
        else { 
          availablePage++; 
          availableBlocks = 9; 
        }
      }
    } //Should be ran AFTER the availablePage variable is used
    
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
        const { redis, ui, media } = context;
        console.log(values.myImage);

        const response = await media.upload ({
          url: values.myImage,
          type: 'image',
        });   //Extract ID from image URL

        console.log(response);
        
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
        await redis.hset(submittedComment.id, {pagenum: JSON.stringify(availablePage), img: values.myImage, dsc: values.myDescription});
        incrementAvailablePage();
        //Use Number() on pagenum when retrieving, since it had to be turned into a string to be stored into redis
      } catch (err) {
        throw new Error(`Error uploading media: ${err}`);
      }
    });
    //For gallery blocks, the data will be loaded through the submittedComment id
    //Comments could be submitted through forms?
    

    let currentPage;
    switch (page) {
      case 'landing':
        currentPage = <Landing 
        setPage={setPage} 
        page={currentPageNumber}
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
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
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
        setPage={setPage}
        />;
        break;
      default:
        currentPage = <Landing setPage={setPage} page={0} incrementCurrentPage={incrementCurrentPage} decrementCurrentPage={decrementCurrentPage}/>;
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