import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, useState } from '@devvit/public-api';
import type { PageProps } from '../main.js';

export type PostProps = {
  identify: string; //ID, from redis?
  image: string; //imageUrl, from redis?
  description: string; //Description, from redis?
  pageSetup: PageProps; //the actual page
}

export const ViewingPost = ({ setPage }: PageProps ) => {  
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState(''); 
  const [identify, setIdentify] = useState(''); 

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
      
      //This stack is for the image...it should be replaced
      <image url={imageUrl} imageWidth={128} imageHeight={128} /> //Usestate may have to be updated using a function?
  
      //This stack is the button at the bottom
      //Don't forget to add text that updates based on every comment added
      <hstack alignment="top center" width="85%" height="15%" backgroundColor="PureGray-250">
          <button icon="comments" disabled={true} appearance="plain"></button>
      </hstack>
    </vstack>
  );
};