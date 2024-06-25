import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey } from '@devvit/public-api';
import type { PageProps } from '../main.js';
import { generateID } from '../main.js';

export type plzwork = {
  ui: {
  showForm: (createForm: FormKey) => void;
  };
}
  
export type imageee = {
  link: (imageUrl: (string)) => void;
}

export const Guide = ({ setPage }: PageProps, {ui}:plzwork, {link}:imageee) => (
    <vstack width = "100%" height = "100%" alignment="top" gap="medium" backgroundColor="white">
        <text size="large" weight="bold" wrap color = "black"> Submit wood for ID </text>
        <text size="small" wrap color ="black">1. Clean up the wood with a plane (or chisel for the end grain) so that we can see the grain clearly</text>
        <text size="small" wrap color ="black">2. Include a close-up picture of the end grain. Not blurry. Eng grain pore structure is one of the most useful bits of info for wood ID.</text>
        <text size="small" wrap color ="black">3. Note any non-visual distingushing characteristics. Does the wood feel particularly light or particularly dense? Does it have an odor when planned?</text>
        <text size="small" wrap color ="black">4.Include multiple pictures or text as sub-comments under the main picture, not as an avalanche of first-level comments. </text>
        <hstack alignment="middle center" gap="small">
        <hstack backgroundColor="PureGray-250" height="45px" width="125px">
            <text weight="bold" alignment="middle center" color="black">
              Continue
            </text>
          </hstack>
          <hstack onPress={() => { ui.showForm(imageForm) }} backgroundColor="PureGray-250" height="45px" width="125px">
            <text weight="bold" alignment="middle center" color="black">
            Continue
              </text>
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
