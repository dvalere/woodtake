import { Devvit, RichTextBuilder } from '@devvit/public-api';

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

const PageA = ({ setPage }: PageProps) => ( //HOME, IMAGE UPLOAD OPTIONS, vstack = vertical, hstack = horizontal....Duh!
  <vstack
    width="100%"
    height="100%"
    alignment="middle center"
    gap="large"
    backgroundColor="lightblue"
  >
    <text size="xxlarge">Page A</text>
    <button onPress={() => setPage('b')}>Go to B</button>
  </vstack>
);

const PageB = ({ setPage }: PageProps) => (
  <vstack
    width="100%"
    height="100%"
    alignment="middle center"
    gap="large"
    backgroundColor="pink"
  >
    <text size="xxlarge">Page B</text>
    <button onPress={() => setPage('a')}>Go to A</button>
  </vstack>
);

/* This will stay as a comment until the pages are done, then I'll add the new names into the switch statement
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

*/

export default Devvit;
