import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Context, StateSetter } from '@devvit/public-api';
import type { pages } from '../utils/pages.js';

interface galleryProps {
  setPage: (page: pages) => void;
  page: number;
  incrementCurrentPage: Function;
  decrementCurrentPage: Function;
  blocks: Function;
  block0: string;
  block1: string;
  block2: string;
  block3: string;
  block4: string;
  block5: string;
  block6: string;
  block7: string;
  block8: string;
  dsc1: string;
  dsc2: string;
  dsc3: string;
  dsc4: string;
  dsc5: string;
  dsc6: string;
  dsc7: string;
  dsc8: string;
  id1: string;
  id2: string;
  id3: string;
  id4: string;
  id5: string;
  id6: string;
  id7: string;
  id8: string;
  redirect: Function;
}

export const Gallery = (props: galleryProps, context: Context): JSX.Element => {
  const { ui } = context;
  const {
    setPage, 
    page,
    incrementCurrentPage, 
    decrementCurrentPage,
    blocks,
    block0,
    block1,
    block2,
    block3,
    block4,
    block5,
    block6,
    block7,
    block8,
    dsc1,
    dsc2,
    dsc3,
    dsc4,
    dsc5,
    dsc6,
    dsc7,
    dsc8,
    id1,
    id2,
    id3,
    id4,
    id5,
    id6,
    id7,
    id8,
    redirect,
  } = props;
  return(
 
  <vstack gap="small" alignment="middle center">
    //First stack of 3
    <hstack gap="small"> 
      <hstack onPress={() => setPage('guide')} backgroundColor="PureGray-250" height="70px" width="70px">
      <button size="large" disabled={true} appearance="plain" icon="camera" width="100%" height="100%"></button> </hstack>
      <hstack onPress={() => {redirect(block1, dsc1); setPage('viewingpost');}} backgroundColor="PureGray-250" height="70px" width="70px"> 
        <image
          url={block1}
        imageWidth={70}
        imageHeight={70}
        />
      </hstack>
      <hstack backgroundColor="PureGray-250" height="70px" width="70px">
        <image
          url={block2}
          imageWidth={70}
          imageHeight={70}
          />
      </hstack>
    </hstack>
    //Second stack
  <hstack gap="small">
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
        url={block3}
        imageWidth={70}
        imageHeight={70}
        />
    </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
        url={block4}
        imageWidth={70}
        imageHeight={70}
        />
    </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
        url={block5}
        imageWidth={70}
        imageHeight={70}
        />
    </hstack>
  </hstack>
  //Third stack
  <hstack gap="small">
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
        url={block6}
        imageWidth={70}
        imageHeight={70}
        />
    </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
        url={block7}
        imageWidth={70}
        imageHeight={70}
        />
    </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
        url={block8}
        imageWidth={70}
        imageHeight={70}
        />
    </hstack>
  </hstack>
  //Up and down buttons
  <hstack gap="small">
    <button onPress={() => {
              if (page != 0){
                decrementCurrentPage();
                blocks(page);
              }
            }}
        size="large" disabled={false} appearance="secondary" icon="caret-up" height="45px" width="125px">
    </button>
    <text alignment='center bottom' size="large" color="black">{page}</text>
    <button onPress={() => { setPage('gallery'); incrementCurrentPage(); blocks(page); }} size="large" disabled={false} appearance="secondary" icon="caret-down" height="45px" width="125px"></button>
  </hstack>
  </vstack>
  );
};

