import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Context } from '@devvit/public-api';
import type { pages } from '../utils/pages.js';

interface galleryProps {
  setPage: (page: pages) => void;
  page: number;
  incrementCurrentPage: Function;
  decrementCurrentPage: Function;
}

export const Gallery = (props: galleryProps, context: Context): JSX.Element => {
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
    <hstack backgroundColor="PureGray-250" height="70px" width="70px">
    </hstack>
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
    <hstack onPress={() => {
            if (page == 1){
                decrementCurrentPage();
                setPage('landing');
            }
            else{
                decrementCurrentPage();
            }
            }}
            
    backgroundColor="PureGray-250" height="45px" width="125px"> <button size="large" disabled={true} appearance="plain" icon="caret-up" width="100%" height="100%"></button
    >
    </hstack>
    <hstack onPress={() => incrementCurrentPage()} 
    backgroundColor="PureGray-250" height="45px" width="125px"> <button size="large" disabled={true} appearance="plain" icon="caret-down" width="100%" height="100%"></button
    > 
    //Add something to check if the page number is 1 on the up button, because if it's 1, then we have to go back to the "landing" page with the camera button
    //Somehow...these up and down buttons have to lead to new pages
    //And somehow...new Landing pages have to be formed with new images...Somehow!
    //And somehow...We need to connect the user ID or username to their in-app posts...
    </hstack>
  </hstack>
  </vstack>
  );
};