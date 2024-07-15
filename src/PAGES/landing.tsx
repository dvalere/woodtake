import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Context } from '@devvit/public-api';
import { generateID } from '../utils/utils.js';
import type { PageProps } from '../main.js';
import type { pages } from '../utils/pages.js';

interface galleryProps {
  setPage: (page: pages) => void;
  page: number;
  incrementCurrentPage: Function;
  decrementCurrentPage: Function;
}

export const Landing = (props: galleryProps, context: Context): JSX.Element => {
  const { ui } = context;
  const {
    setPage, 
    page,
    incrementCurrentPage, 
    decrementCurrentPage,
  } = props;
  return(
  //HOME(gallery), IMAGE UPLOAD OPTIONS
  <vstack gap="small" alignment="middle center">
  //First stack of 3
  <hstack gap="small"> 
    <hstack onPress={() => setPage('guide')} backgroundColor="PureGray-250" height="70px" width="70px">
    <button size="large" disabled={true} appearance="plain" icon="camera" width="100%" height="100%"></button> </hstack>
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
    </hstack>
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
    <hstack onPress={() => incrementCurrentPage() } 
    backgroundColor="PureGray-250" height="45px" width="125px"> <button size="large" disabled={true} appearance="plain" icon="caret-up" width="100%" height="100%"></button
    >
    </hstack>
    <hstack onPress={() => decrementCurrentPage() } 
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