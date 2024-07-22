import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Context } from '@devvit/public-api';
import type { pages } from '../utils/pages.js';

interface landingProps {
  setPage: (page: pages) => void;
  page: number;
  incrementCurrentPage: Function;
  decrementCurrentPage: Function;
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
  seven: string;
  eight: string;
  blocks: Function;
}

export const Landing = (props: landingProps, context: Context): JSX.Element => {
  const { ui } = context;
  const {
    setPage, 
    page,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    incrementCurrentPage, 
    decrementCurrentPage,
    blocks,
  } = props;
  console.log(one, two, three, four, five, six, seven, eight);
  return(
  //HOME(gallery), IMAGE UPLOAD OPTIONS
  <vstack gap="small" alignment="middle center">
  //First stack of 3
  <hstack gap="small"> 
    <hstack onPress={() => setPage('guide')} backgroundColor="PureGray-250" height="70px" width="70px">
    <button size="large" disabled={true} appearance="plain" icon="camera" width="100%" height="100%"></button> </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px"> 
      <image
        url={one}
      imageWidth={70}
      imageHeight={70}
      />
    </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
        url={two}
        imageWidth={70}
        imageHeight={70}
        />
    </hstack>
  </hstack>
  //Second stack
  <hstack gap="small">
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
        url={three}
        imageWidth={70}
        imageHeight={70}
        />
    </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
        url={four}
        imageWidth={70}
        imageHeight={70}
        />
    </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
        url={five}
        imageWidth={70}
        imageHeight={70}
        />
    </hstack>
  </hstack>
  //Third stack
  <hstack gap="small">
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
          url={six}
          imageWidth={70}
          imageHeight={70}
          />
    </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
          url={seven}
          imageWidth={70}
          imageHeight={70}
          />
    </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
      <image
          url={eight}
          imageWidth={70}
          imageHeight={70}
          />
    </hstack>
  </hstack>
  //Up and down buttons
  <hstack gap="small">
    <hstack backgroundColor="PureGray-250" height="45px" width="125px"> <button size="large" disabled={true} appearance="plain" icon="caret-up" width="100%" height="100%"></button>
    </hstack>
    <hstack onPress={() => { incrementCurrentPage(); setPage('gallery'); }} 
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