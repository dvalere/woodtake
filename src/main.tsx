import { Devvit, RichTextBuilder } from '@devvit/public-api';

//Disregard
// Docs: https://developers.reddit.com/docs/media_uploads
Devvit.configure({ media: true, redditAPI: true });

// Use Case: Create Rich-Text Comments with Media
Devvit.addMenuItem({
  location: 'comment',
  label: 'Reply with GIF',
  onPress: async (event, context) => {
    console.log(`Invoked action on comment ${event.targetId}`);
    try {
      // Upload external media
      const response = await context.media.upload({
        url: 'https://media2.giphy.com/media/xTiN0CNHgoRf1Ha7CM/giphy.gif',
        type: 'gif',
      });

      // Create a comment with media
      await context.reddit.submitComment({
        id: event.targetId, // where context menu action was invoked
        text: 'Hello World with Media',
        richtext: new RichTextBuilder()
          .image({ mediaId: response.mediaId })
          .codeBlock({}, (cb) => cb.rawText('This comment was created from a Devvit App')),
      });
    } catch (err) {
      throw new Error(`Error uploading media: ${err}`);
    }
  },
});

// Use Case: Create Rich-Text Posts with Media
Devvit.addMenuItem({
  location: 'subreddit',
  label: 'Post with GIF',
  onPress: async (event, context) => {
    try {
      // Upload external media
      const response = await context.media.upload({
        url: 'https://media2.giphy.com/media/xTiN0CNHgoRf1Ha7CM/giphy.gif',
        type: 'gif',
      });

      // Get Subreddit
      const subreddit = await context.reddit.getSubredditById(event.targetId);

      // Create a post with media
      await context.reddit.submitPost({
        subredditName: subreddit.name,
        title: 'Hello World with Media',
        richtext: new RichTextBuilder().image({ mediaId: response.mediaId }),
      });
    } catch (err) {
      throw new Error(`Error uploading media: ${err}`);
    }
  },
});

// Use Case: Create Native Image Posts in Reddit
Devvit.addMenuItem({
  location: 'subreddit',
  label: 'Post/Comment with Image',
  onPress: async (event, context) => {
    console.log(`Invoked action on subreddit ${event.targetId}`);
    try {
      const subreddit = await context.reddit.getSubredditById(event.targetId);
      const response = await context.media.upload({
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Boulevard_du_Temple_by_Daguerre.jpg',
        type: 'image',
      });

      // In the future, we will support video and videogif types
      // Similar to https://www.reddit.com/dev/api/#POST_api_submit
      await context.reddit.submitPost({
        subredditName: subreddit.name,
        title: 'Hello World with Media',
        kind: 'image',
        url: response.mediaUrl,
      });
    } catch (err) {
      throw new Error(`Error uploading media: ${err}`);
    }
  },
});



//PAGES ---------------------------------------------------------------------------------------

type PageProps = {
  setPage: (page: string) => void;
}

const Landing = ({ setPage }: PageProps) => ( //HOME(gallery), IMAGE UPLOAD OPTIONS
<vstack gap="small" alignment="middle center">
  //First stack of 3
  <hstack gap="small">
    //Post option
    <hstack backgroundColor="PureGray-250" height="70px" width="70px"
    onPress={() => console.log('clicked')}
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
        <button icon="comments" disabled={true} appearance="plain"
    </hstack>
  </vstack>
);



//So far, I haven't found a way to remove the rounded edges from buttons, so I'll probably just have to replace them with stacks once I'm done typing and organizing everything on each page

//This will stay as a comment until the pages are done, then I'll add the new pages and buttons into the switch statement
Devvit.addCustomPostType({
  name: 'Name',
  render: context => {
    const { useState } = context;
    const [page, setPage] = useState('a');

    let currentPage;
    switch (page) {
      case 'a':
        currentPage = <PageA setPage={setPage} />;
        break;
      case 'b':
        currentPage = <PageB setPage={setPage} />;
        break;
      default:
        currentPage = <PageA setPage={setPage} />;
    }

    return (
      <blocks>
        {currentPage}
      </blocks>
    )
  }
})

const form = Devvit.createForm(
  {
    title: 'Upload an image!',
    fields: [
      {
        name: 'myImage',
        type: 'image', // This tells the form to expect an image
        label: 'Image goes here',
        required: true,
      },
    ],
  },
  (event, context) => {
    const imageUrl = event.values.myImage;
    // Use the mediaUrl to store in redis and display it in an <image> block, or send to external service to modify
  }
);

type post = {
  <post_id>: { imageUrl: 'i.redd.it/my.jpg', note: 'blah' }
}

const onSubmitHandler = (event, context) => {
//Make it so the image uploaded goes into the database and then is put into a "post" object which shows the image and comments under it
};

const openForm = (_, context) => {
  context.ui.showForm(form);
};

//Opens the image form, then stores the image into a post after it's entered
function openImageForm(){

} 




export default Devvit;


