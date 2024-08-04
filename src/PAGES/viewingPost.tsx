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
    <vstack
    width="100%"
    height="100%"
    alignment="top center"
    backgroundColor="white"
    gap="small"
    >
      <hstack  width="85%" height="25%" alignment="middle start"
      gap="large"
      > 
        <hstack
        onPress={() => setPage('gallery')}
        backgroundColor="PureGray-250" width="35px" height="35px"
        >
            <button icon="back" disabled={true} appearance="plain">
          </button>

          <button icon='delete' appearance='secondary' width="35px" height="35px" >  </button>
        </hstack>
        <hstack width="45%" height="15%" alignment="middle end">
        <text weight="bold" alignment="top center" color="black" > What is this? </text>
        </hstack>
      </hstack>
      <image url={image} imageWidth={128} imageHeight={128}/> 
      <text size="medium" color="black"> {description} </text>
      <hstack  alignment="top center" width="85%" height="15%" >
          <button onPress={() => ui.showForm(commentForm)} icon="comments" disabled={false} appearance="secondary" height="100%" width="100%" ></button>
      </hstack>
    </vstack>
  );
};

//redirect(id, image, description)