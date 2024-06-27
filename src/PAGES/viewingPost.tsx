import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, useState } from '@devvit/public-api';
import type { PageProps } from '../main.js';
import { global1, global2, global3 } from '../OBJECTS/imageForm.js';

export const ViewingPost = ({ setPage, imageUrl, description }: PageProps & { imageUrl: string; description: string; }) => {  
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
        onPress={() => setPage('gallery')}
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
      <text size="medium" color="black"> {global3} </text>
      <hstack alignment="top center" width="85%" height="15%" backgroundColor="PureGray-250">
          <button icon="comments" disabled={true} appearance="plain"></button>
      </hstack>
    </vstack>
  );
};