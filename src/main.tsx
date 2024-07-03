import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey } from '@devvit/public-api';
import { RenderContext } from '@devvit/public-api/devvit/internals/blocks/handler/RenderContext.js';
import { Landing } from './PAGES/landing.js';
import { Guide } from './PAGES/guide.js';
import { Leaderboard } from './PAGES/leaderboard.js';
import { ViewingPost } from './PAGES/viewingPost.js';
import { generateID } from './utils/utils.js';
Devvit.configure({ media: true, redditAPI: true, redis: true,});

export type PageProps = {
  setPage: (page: string) => void;
}



Devvit.addCustomPostType({
  name: 'woodID',
  description: 'Identify types of wood',
  height: 'tall',
  render: context => {
    const { useState } = context;
    const [page, setPage] = useState('landing');
    const [identify, setIdentify] = useState(''); 
    const [imageURL, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    
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
    }, async (event) => {
      const { redis, ui } = context;
      const newID = await generateID(redis);
      setIdentify(newID);
      setImageUrl(event.values.myImage);
      setDescription(event.values.myDescription);
      await redis.hset(identify, { url: event.values.myImage, desc: event.values.myDescription });
      ui.showToast('Image uploaded successfully!');
    });
 

    let currentPage;
    switch (page) {
      case 'landing':
        currentPage = <Landing 
        setPage={setPage} 
        setImageUrl={setImageUrl} 
        setDescription={setDescription}
        />; 
        break;
      case 'guide':
        currentPage = <Guide 
        imageForm={imageForm} 
        setPage={setPage}
        />; 
        break;
      case 'viewingpost':
        currentPage = <ViewingPost
          setPage={setPage}
          post={{ author: 'author', id: identify, imageUrl: imageURL, description: description }}
          username={"THIS IS JUST A PLACEHOLDER STRING UNTIL I MAKE THE USERNAME RETRIEVAL FUNCTION...The username retrieval function should get the username while they're submitting the post"}
          />;
        break;
      case 'leaderboard':
        currentPage = <Leaderboard setPage={setPage} 
        />;
        break;
      default:
        currentPage = <Landing setPage={setPage} setImageUrl={setImageUrl} setDescription={setDescription} />;
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