import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey } from '@devvit/public-api';
import { RenderContext } from '@devvit/public-api/devvit/internals/blocks/handler/RenderContext.js';

//Disregard
// Docs: https://developers.reddit.com/docs/media_uploads
Devvit.configure({ media: true, redditAPI: true, redis: true,});

// Use Case: Create Rich-Text Comments with Media


/*
Devvit.addMenuItem({
  location: 'subreddit',
  label: 'WoodID',
  forUserType: 'member', //Temporarily for members, while testing
  onPress: async (event, context) => {
  }
});
*/

//PAGES ---------------------------------------------------------------------------------------

type PageProps = {
  setPage: (page: string) => void;
}

type plzwork = {
  ui: {
    showForm: (createForm: FormKey) => void;
  };
}

const Landing = ({ setPage }: PageProps, {ui}:plzwork) => ( //HOME(gallery), IMAGE UPLOAD OPTIONS
  <vstack gap="small" alignment="middle center">
  //First stack of 3
  <hstack gap="small">
    //Post option
    <hstack onPress={() => { ui.showForm(imageForm) }} backgroundColor="PureGray-250" height="70px" width="70px"
    //Stack opens the submission form when clicked
    >
    <button size="large" disabled={true} appearance="plain" icon="camera" width="100%" height="100%"></button> </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px"></hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px"></hstack>
  </hstack>
  //Second stack
  <hstack gap="small">
    <hstack backgroundColor="PureGray-250" height="70px" width="70px"></hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px"></hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px"></hstack>
  </hstack>
  //Third stack
  <hstack gap="small">
    <hstack backgroundColor="PureGray-250" height="70px" width="70px"></hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px"></hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px"></hstack>
  </hstack>
  //Up and down buttons
  <hstack gap="small">
    <hstack onPress={() => console.log('clicked')} 
    backgroundColor="PureGray-250" height="45px" width="125px"> <button size="large" disabled={true} appearance="plain" icon="caret-up" width="100%" height="100%"></button
    >
    </hstack>
    <hstack onPress={() => console.log('clicked')} 
    backgroundColor="PureGray-250" height="45px" width="125px"> <button size="large" disabled={true} appearance="plain" icon="caret-down" width="100%" height="100%"></button
    >
    </hstack>
  </hstack>
  </vstack>
);

const SubmissionGuide = ({ setPage }: PageProps) => (
  <vstack width = "100%" height = "100%" alignment="top" gap="medium" backgroundColor="white">
      <text size="large" weight="bold" wrap color = "black"> Submit wood for ID </text>
      <text size="small" wrap color ="black">1. Clean up the wood with a plane (or chisel for the end grain) so that we can see the grain clearly</text>
      <text size="small" wrap color ="black">2. Include a close-up picture of the end grain. Not blurry. Eng grain pore structure is one of the most useful bits of info for wood ID.</text>
      <text size="small" wrap color ="black">3. Note any non-visual distingushing characteristics. Does the wood feel particularly light or particularly dense? Does it have an odor when planned?</text>
      <text size="small" wrap color ="black">4.Include multiple pictures or text as sub-comments under the main picture, not as an avalanche of first-level comments. </text>
      <hstack alignment="middle center" gap="small">
      <hstack backgroundColor="PureGray-250" height="45px" width="125px">
          <text weight="bold" alignment="middle center" color="black">
            Continue
          </text>
        </hstack>
        <hstack backgroundColor="PureGray-250" height="45px" width="125px">
          <text weight="bold" alignment="middle center" color="black">
          Continue
            </text>
        </hstack>
      </hstack>
    </vstack>
);

const Leaderboard1 = ({ setPage }: PageProps) => (
  <vstack
    width = "100%"
    height = "100%"
    alignment = "top"
    gap = "medium"
    backgroundColor = "white"
  >
    <text size="medium" color = "black">1.</text>
    //username stuff goes here
    <text size="medium" color = "black">2.</text>
    //username stuff goes here
    <text size="medium" color = "black">3.</text>
    //username stuff goes here
    <text size="medium" color = "black">4.</text>
    //username stuff goes here

    //There's DEFINITELY a more precise way to add the ranks, but this will be a placeholder for now. The leaderboard will go up to the top 10-20
    //The "YardMarkers" on the Football Field example can be a great start
  </vstack>
);

const viewingPost = ({ setPage}: PageProps ) => (
  <vstack
  width="100%"
  height="100%"
  alignment="top center"
  backgroundColor="white"
  gap="small"
  >
    //Line with the back button and "what is this"
    <hstack  width="85%" height="25%" alignment="middle start"
    gap="large"
    > //Back button
      <hstack
      onPress={() => console.log('clicked')}
      backgroundColor="PureGray-250" width="35px" height="35px"
      >
          <button icon="back" disabled={true} appearance="plain">
        </button>
      </hstack>
      <hstack width="45%" height="12%" alignment="middle end">
      <text weight="bold" alignment="top center" color="black" > What is this? </text>
      </hstack>
    </hstack>
    
    //This stack is for the image...it should be replaced
    <hstack alignment="top center" width="85%" height="55%" backgroundColor="PureGray-250">
    </hstack>

    //This stack is the button at the bottom
    //Don't forget to add text that updates based on every comment added
    <hstack alignment="top center" width="85%" height="15%" backgroundColor="PureGray-250">
        <button icon="comments" disabled={true} appearance="plain"></button>
    </hstack>
  </vstack>
);



//So far, I haven't found a way to remove the rounded edges from buttons, so I'll probably just have to replace them with stacks once I'm done typing and organizing everything on each page

//This will stay as a comment until the pages are done, then I'll add the new pages and buttons into the switch statement



Devvit.addMenuItem({  
  location: 'subreddit',  
  label: 'Add a HELLO!? post',  
  onPress: async (_, context) => {  
    const { reddit, ui } = context;  
    const currentSubreddit = await reddit.getCurrentSubreddit();  
    await reddit.submitPost({  
      title: 'My HELLO!? post',  
      subredditName: 'chippitychop', 
        
      preview: (  
        <vstack>  
          <text>Loading...</text>  
        </vstack>  
      ),  
    });  
    ui.showToast(`Submitted HELLO!? post to ${currentSubreddit.name}`);  
  },  
});



//Run redis function in here
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
  (event, context) => {
    const imageUrl = event.values.myImage; //retrieves image URL
    const postDescription = event.values.paragraph; //retrieves post description
    const holder = generateID(context.redis); //generates ID
    context.redis.set(holder, imageUrl, postDescription)

    // Use the mediaUrl to store in redis and display it in an <image> block, or send to external service to modify
  } //The mediaUrl should be retrievable now
);

Devvit.addCustomPostType({
  name: 'HELLO!?',
  description: 'Identify types of wood',
  height: 'tall',

  render: context => {
    const { useState } = context;
    const [page, setPage] = useState('a');


    let currentPage;
    let breh;
    switch (page) {
      case 'a':
        currentPage = <Landing setPage={setPage}/>;
        break;
      case 'b':
        currentPage = <Landing setPage={setPage}/>;
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
)

//POST ID GENERATION FUNCTION
function generateID(redis: RedisClient): string { // Specify the type here
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  let ID = '';

  while (true) {
    const length = 6 + Math.floor(Math.random() * 2); //Randomly choose between 6 or 7
    ID = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      ID += chars[randomIndex];
    }
    const exists = redis.get(ID); //Uses get to check if the key exists already
    if (exists != null) {  //If get does not return null, that means a key with that ID exists already, so call the function again and generate a new key
      generateID(redis);
    }
  } //If the key didn't exist, then return ID
  return ID;
}



//DISREGARD THIS TOO
/*
Devvit.addMenuItem({
  location: 'subreddit',
  label: '..BRUH',
  onPress: async (event, { redis }) => {
    const key = 'hello';
    await redis.set(key, '');
    const value = await redis.get(key);
    console.log(`${key}: ${value}`);
  },
});
*/


//Menu item for
//ACTUALLY DISREGARD....
/*
Devvit.addMenuItem({
  location: 'subreddit',
  label: 'Generate Post ID',
  //These will be used within the code in the landing page
  onPress: async (event, { redis }) => {
    const ID = await generateID(redis);
    console.log(`Generated ID: ${ID}`);
  },
  onPress: async (event, context) =>{
    context.ui.showForm(imageForm);
  },
});
*/

export default Devvit;