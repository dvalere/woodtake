import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey } from '@devvit/public-api';
import type { PageProps } from '../main.js';

export const ViewingPost = ({ setPage}: PageProps ) => (
    <vstack
    width="100%"
    height="100%"
    alignment="top center"
    backgroundColor="white"
    gap="small"
    >
      //Line with the back button and "what is this"
      <hstack  width="85%" height="25%" alignment="middle start"
      gap="large"
      > //Back button
        <hstack
        onPress={() => console.log('clicked')}
        backgroundColor="PureGray-250" width="35px" height="35px"
        >
            <button icon="back" disabled={true} appearance="plain">
          </button>
        </hstack>
        <hstack width="45%" height="12%" alignment="middle end">
        <text weight="bold" alignment="top center" color="black" > What is this? </text>
        </hstack>
      </hstack>
      
      //This stack is for the image...it should be replaced
      <hstack alignment="top center" width="85%" height="55%" backgroundColor="PureGray-250">
      </hstack>
  
      //This stack is the button at the bottom
      //Don't forget to add text that updates based on every comment added
      <hstack alignment="top center" width="85%" height="15%" backgroundColor="PureGray-250">
          <button icon="comments" disabled={true} appearance="plain"></button>
      </hstack>
    </vstack>
  );