import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, useState } from '@devvit/public-api';
import { generateID } from '../main.js';
import { PageProps } from '../main.js';
import { ViewingPost } from '../PAGES/viewingPost.js';
//import { setImageUrl, setDescription,setIdentify, imageUrl, description, identify } from '../PAGES/viewingPost.js';

export const imageForm = Devvit.createForm(
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
      //These, and the import line for them will be scrapped and a new method will be figured out tomorrow
     // setImageUrl(event.values.myImage); //retrieves image URL
     // setDescription(event.values.paragraph); //retrieves post description
     // setIdentify(await generateID(context.redis)); //generates and stores ID
     // context.redis.hset(identify, {url: imageUrl, desc: description}); 
    }
  );