import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, useState } from '@devvit/public-api';
import { generateID } from '../utils/utils.js';
import { PageProps } from '../main.js';
import { ViewingPost } from '../PAGES/viewingPost.js';
//import { setImageUrl, setDescription,setIdentify, imageUrl, description, identify } from '../PAGES/viewingPost.js';
  
export var global1 = '';
export var global2 = '';
export var global3 = '';

export const imageForm = Devvit.createForm(
  {
    title: 'Upload an image!',
    fields: [
      {
        name: 'myImage',
        type: 'image',
        label: 'Upload image',
        required: true,
      },
      {
        type: 'paragraph',
        name: 'description',
        label: 'Description',
      },
    ],
  },
  async (event, context) => {
    const { redis, ui } = context;
    const imageUrl = event.values.myImage;
    const description = event.values.description;
    const identify = await generateID(redis);
    global2 = imageUrl;
    global3 = description;
    
    await redis.hset(identify, { url: imageUrl, desc: description });
    ui.showToast('Image uploaded successfully!');
  }
);

