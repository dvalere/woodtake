import { Context, Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, useState } from '@devvit/public-api';
import type { PageProps } from '../main.js';
import type { postProp } from '../utils/postProp.js';
import type { pages } from '../utils/pages.js';

interface ViewingPostProps {
  setPage: (page: pages) => void;
  image: string;
  description: string;
  id: string;
  commentForm: FormKey;
}


export const ViewingPost = (props: ViewingPostProps, context: Context,): JSX.Element => {  
  const { ui } = context;
  const { 
    setPage,
    image,
    description,
    id,
    commentForm,
  } = props;

  return (
    <vstack width="100%" height="100%" alignment="top center" backgroundColor="white" gap="medium">
      <hstack width="85%" height="20%" alignment="top center"gap="large"> 
          <button onPress={() => setPage('gallery')} icon="back" disabled={false} appearance="secondary"></button>
          <text alignment="bottom center" weight="bold" color="black" > What is this? </text>
          <button icon='delete' appearance='secondary'></button>
      </hstack>
      <vstack width="150px" height="175px" alignment="top center" gap="small"> 
        <image url={image} imageWidth={128} imageHeight={128}/> 
        <text size="medium" color="black"> {description}</text>
      </vstack>
      <hstack  alignment="bottom center" width="85%" height="15%">
          <button onPress={() => setPage('comments')} icon="comments" disabled={false} appearance="secondary" height="100%" width="100%" ></button>
      </hstack>
    </vstack>
  );
};

