import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey } from '@devvit/public-api';
import { Landing } from './PAGES/landing.js';
import { Guide } from './PAGES/guide.js';
import { ViewingPost } from './PAGES/viewingPost.js';
import { imageForm } from './OBJECTS/imageForm.js';

Devvit.configure({ media: true, redditAPI: true, redis: true,});

export type PageProps = {
  setPage: (page: string) => void;
}

export type GallerySquare = {
  identify: string; //Holds the post ID
}




Devvit.addCustomPostType({
  name: 'woodID',
  description: 'Identify types of wood',
  height: 'tall',

  render: context => {
    const { useState } = context;
    const [page, setPage] = useState('a');

    let currentPage;
    switch (page) {
      case 'a':
        currentPage = <Landing setPage={setPage}/>; 
        break;
      case 'b':
        currentPage = <Guide setPage={setPage}/>;
        break;
        case 'c':
          currentPage = <ViewingPost setPage={setPage}/>;
          break;
      default:
        currentPage = <Landing setPage={setPage}/>;
    }

    return (
      <blocks>
        {currentPage}
      </blocks>
  )
}
}
); //Could make this work with a useState variable 

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

 //Gallery states may have to be managed from here
//Run a function which returns the new image URL
//Or just manually update a variable and then enter it into the menuitem


export default Devvit;
