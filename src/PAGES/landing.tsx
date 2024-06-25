import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey } from '@devvit/public-api';
import { generateID } from '../main.js';
import type { PageProps } from '../main.js';
  
export type plzwork = {
  ui: {
  showForm: (createForm: FormKey) => void;
  };
}
  
export type imageee = {
  link: (imageUrl: (string)) => void;
}

export const Landing = ({ setPage }: PageProps, {ui}:plzwork, {link}:imageee) => ( //HOME(gallery), IMAGE UPLOAD OPTIONS
  <vstack gap="small" alignment="middle center">
  //First stack of 3
  <hstack gap="small"> 
    <hstack onPress={() => setPage('b')} backgroundColor="PureGray-250" height="70px" width="70px">
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
    <hstack onPress={() => console.log('clicked')} 
    backgroundColor="PureGray-250" height="45px" width="125px"> <button size="large" disabled={true} appearance="plain" icon="caret-up" width="100%" height="100%"></button
    >
    </hstack>
    <hstack onPress={() => console.log('clicked')} 
    backgroundColor="PureGray-250" height="45px" width="125px"> <button size="large" disabled={true} appearance="plain" icon="caret-down" width="100%" height="100%"></button
    > 
    //Somehow...these up and down buttons have to lead to new pages
    //And somehow...new Landing pages have to be formed with new images...Somehow!
    //And somehow...We need to connect the user ID or username to their in-app posts...
    </hstack>
  </hstack>
  </vstack>
);

const imageForm = Devvit.createForm(
  {
    title: 'Upload an image!',
    fields: [
      { //Image field
        name: 'myImage',
        type: 'image', // This tells the form to expect an image
        label: 'Upload image',
        required: true,
      },

      { //Description field
        type: 'paragraph',
        name: 'description',
        label: 'Description',
      },
    ],
  },
    async (event, context) => {
    const imageUrl = event.values.myImage; //retrieves image URL
    const postDescription = event.values.paragraph; //retrieves post description
    const holder = await generateID(context.redis); //generates ID
    context.redis.set(holder, imageUrl, postDescription);
}
);