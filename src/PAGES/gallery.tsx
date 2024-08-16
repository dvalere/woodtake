import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Context, StateSetter } from '@devvit/public-api';
import type { pages } from '../utils/pages.js';
import type { Block } from '../utils/block.js';

interface galleryProps {
  setPage: (page: pages) => void;
  page: number;
  incrementCurrentPage: ()=>Promise<void>;
  decrementCurrentPage: ()=>Promise<void>;
  blocks: Function;
  redirect: Function;
  blockArray: Block[];
  loadLeaderboard: Function;
}

export const Gallery = (props: galleryProps, context: Context): JSX.Element => {
  const { ui } = context;
  const {
    setPage, 
    page,
    incrementCurrentPage, 
    decrementCurrentPage,
    blocks,
    redirect,
    blockArray = [],  // Provide a default empty array if blockArray is not set
    loadLeaderboard,
  } = props;

  return (
    <vstack gap="small" alignment="middle center">
      //First stack of 3
      <hstack gap="small"> 
        <hstack onPress={() => setPage('guide')} backgroundColor="PureGray-250" height="70px" width="70px">
          <button size="large" disabled={true} appearance="plain" icon="camera" width="100%" height="100%"></button>
        </hstack>
        <hstack onPress={async() => {await redirect(blockArray[0]); console.log(blockArray[0]);}} backgroundColor="PureGray-250" height="70px" width="70px"> 
          <image
            url={blockArray[0]?.img || 'emptyblock.png'}
            imageWidth={70}
            imageHeight={70}
          />
        </hstack>
        <hstack onPress={async() => {await redirect(blockArray[1]);}} backgroundColor="PureGray-250" height="70px" width="70px">
          <image
            url={blockArray[1]?.img || 'emptyblock.png'}
            imageWidth={70}
            imageHeight={70}
          />
        </hstack>
      </hstack>
      //Second stack
      <hstack gap="small">
        <hstack onPress={async() => {await redirect(blockArray[2]);}} backgroundColor="PureGray-250" height="70px" width="70px">
          <image
            url={blockArray[2]?.img || 'emptyblock.png'}
            imageWidth={70}
            imageHeight={70}
          />
        </hstack>
        <hstack onPress={async() => {await redirect(blockArray[3]);}} backgroundColor="PureGray-250" height="70px" width="70px">
          <image
            url={blockArray[3]?.img || 'emptyblock.png'}
            imageWidth={70}
            imageHeight={70}
          />
        </hstack>
        <hstack onPress={async() => {await redirect(blockArray[4]);}} backgroundColor="PureGray-250" height="70px" width="70px">
          <image
            url={blockArray[4]?.img || 'emptyblock.png'}
            imageWidth={70}
            imageHeight={70}
          />
        </hstack>
      </hstack>
      //Third stack
      <hstack gap="small">
        <hstack onPress={async() => {await redirect(blockArray[5]);}} backgroundColor="PureGray-250" height="70px" width="70px">
          <image
            url={blockArray[5]?.img || 'emptyblock.png'}
            imageWidth={70}
            imageHeight={70}
          />
        </hstack>
        <hstack onPress={async() => {await redirect(blockArray[6]);}} backgroundColor="PureGray-250" height="70px" width="70px">
          <image
            url={blockArray[6]?.img || 'emptyblock.png'}
            imageWidth={70}
            imageHeight={70}
          />
        </hstack>
        <hstack onPress={async() => {await redirect(blockArray[7]);}} backgroundColor="PureGray-250" height="70px" width="70px">
          <image
            url={blockArray[7]?.img || 'emptyblock.png'}
            imageWidth={70}
            imageHeight={70}
          />
        </hstack>
      </hstack>
      //Up and down buttons
      <hstack gap="small">
        <button onPress={async() => {
              if (page !== 0){
                await decrementCurrentPage();
              }
            }}
            size="large" disabled={false} appearance="secondary" icon="caret-up" height="45px" width="125px">
        </button>
        <button onPress={async() => { loadLeaderboard(0); setPage('leaderboard'); }} size="medium">Leaderboard</button>
        <button onPress={async() => { setPage('gallery'); await incrementCurrentPage();}} size="large" disabled={false} appearance="secondary" icon="caret-down" height="45px" width="125px"></button>
      </hstack>
    </vstack>
  );
};

//<text alignment='center bottom' size="large" color="black">{page}</text>
