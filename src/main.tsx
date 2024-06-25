import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey } from '@devvit/public-api';
import { Landing } from './PAGES/landing.js';
import { Guide } from './PAGES/guide.js';
import { ViewingPost } from './PAGES/viewingPost.js';

Devvit.configure({ media: true, redditAPI: true, redis: true,});

export type PageProps = {
  setPage: (page: string) => void;
}

export type GallerySquare = {
  identify: string; //Holds the post ID
}

//Comments and post deletion will be figured out later on
//All this info is already stored in redis so...
//Might have to just do a manual function in the onPress event
//That adds the info into the viewing post page
//And then also adds the image to the gallery, and then makes the image clickable and open the post with the same key when clicked

//Maybe make every imagesquare in gallery a type which holds the key and imageurl, and then run a function when pressed which locates the post with the same key and url

const imageForm = Devvit.createForm(
  {
    title: 'Upload an image!',
    fields: [
      { //Image field
        name: 'myImage',
        type: 'image', // This tells the form to expect an image
        label: 'Upload image',
        required: true,
      },

      { //Description field
        type: 'paragraph',
        name: 'description',
        label: 'Description',
      },
    ],
  },
  async (event, context) => {
    const imageUrl = event.values.myImage; //retrieves image URL
    const postDescription = event.values.paragraph; //retrieves post description
    const holder = await generateID(context.redis); //generates ID
    context.redis.set(holder, imageUrl, postDescription);
  }
);

//POST ID GENERATION FUNCTION, EXPORTED TO GALLERY.TSX
export async function generateID(redis: RedisClient): Promise<string> { 
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  let ID = '';
  const length = 6 + Math.floor(Math.random() * 2); //Randomly choose between 6 or 7
  ID = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    ID += chars[randomIndex];
  }
  const exists = await redis.get(ID); //Uses get to check if the key exists already
  if (exists != null) {  //If get does not return null, that means a key with that ID exists already, so call the function again and generate a new key
    return generateID(redis);
  }
   //If the key didn't exist, then return ID
  return ID;
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
);


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
