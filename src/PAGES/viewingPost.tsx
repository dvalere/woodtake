import { Context, Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, useState } from '@devvit/public-api';
import type { PageProps } from '../main.js';
import type { postProp } from '../utils/utils.js';
import type { pages } from '../utils/pages.js';

interface ViewingPostProps {
  setPage: (page: pages) => void;
  post: postProp;
  username: string | null
}


export const ViewingPost = (props:ViewingPostProps, context: Context): JSX.Element => {  
  const {
    setPage,
    post,
    username,
  } = props;
  const { ui } = context;
  const { author, id, imageUrl, description }:postProp = post;

  return (
    <vstack
    width="100%"
    height="100%"
    alignment="top center"
    backgroundColor="white"
    gap="small"
    >
      <hstack  width="85%" height="25%" alignment="middle start"
      gap="large"
      > //Back button
        <hstack
        onPress={() => setPage('landing')}
        backgroundColor="PureGray-250" width="35px" height="35px"
        >
            <button icon="back" disabled={true} appearance="plain">
          </button>
        </hstack>
        <hstack width="45%" height="12%" alignment="middle end">
        <text weight="bold" alignment="top center" color="black" > What is this? </text>
        </hstack>
      </hstack>
      <image url={imageUrl} imageWidth={128} imageHeight={128} /> 
      <text size="medium" color="black"> {description} </text>
      <hstack alignment="top center" width="85%" height="15%" backgroundColor="PureGray-250">
          <button icon="comments" disabled={true} appearance="plain"></button>
      </hstack>
    </vstack>
  );
};