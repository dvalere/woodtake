import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Context } from '@devvit/public-api';
import type { pages } from '../utils/pages.js';

interface landingProps {
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
}

export const Landing = (props: landingProps, context: Context): JSX.Element => {
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
  } = props;
  return(
  //HOME(gallery), IMAGE UPLOAD OPTIONS
  <vstack gap="small" alignment="middle center">
  //First stack of 3
  <hstack gap="small"> 
    <hstack onPress={() => setPage('guide')} backgroundColor="PureGray-250" height="70px" width="70px">
    <button size="large" disabled={true} appearance="plain" icon="camera" width="100%" height="100%"></button> </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px"> 
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
    <hstack backgroundColor="PureGray-250" height="45px" width="125px"> <button size="large" disabled={true} appearance="plain" icon="caret-up" width="100%" height="100%"></button>
    </hstack>
    <hstack onPress={() => { setPage('gallery'); incrementCurrentPage(); }} 
    backgroundColor="PureGray-250" height="45px" width="125px"> <button size="large" disabled={true} appearance="plain" icon="caret-down" width="100%" height="100%"></button
    > 
    //Somehow...these up and down buttons have to lead to new pages
    //And somehow...new Landing pages have to be formed with new images...Somehow!
    //And somehow...We need to connect the user ID or username to their in-app posts...
    </hstack>
  </hstack>
  </vstack>
  );
};

//Create 9 useState variables
//Put them in each image URL option
//Have the variables updated in the