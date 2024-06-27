import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, useState } from '@devvit/public-api';
import type { PageProps } from '../main.js';

export const ViewingPost = ({ setPage }: PageProps) => {  
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
      
      <image url={url} imageWidth={128} imageHeight={128} /> 
  
      <hstack alignment="top center" width="85%" height="15%" backgroundColor="PureGray-250">
          <button icon="comments" disabled={true} appearance="plain"></button>
      </hstack>
    </vstack>
  );
};