import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey } from '@devvit/public-api';
import { RenderContext } from '@devvit/public-api/devvit/internals/blocks/handler/RenderContext.js';
import { Landing } from './PAGES/landing.js';
import { Guide } from './PAGES/guide.js';
import { Leaderboard } from './PAGES/leaderboard.js';
import { ViewingPost } from './PAGES/viewingPost.js';
import { global2, global3 } from './OBJECTS/imageForm.js';

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
    const [page, setPage] = useState('a');
    const [imageUrl, setImageUrl] = useState(global2);
    const [description, setDescription] = useState(global3);

    let currentPage;
    switch (page) {
      case 'a':
        currentPage = <Landing setPage={setPage} setImageUrl={setImageUrl} setDescription={setDescription} />; 
        break;
      case 'b':
        currentPage = <Guide setPage={setPage} />; 
        break;
      case 'c':
        currentPage = <ViewingPost setPage={setPage} imageUrl={imageUrl} description={description} />;
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