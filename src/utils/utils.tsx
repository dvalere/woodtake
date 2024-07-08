import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey } from '@devvit/public-api';
import { ViewingPost } from '../PAGES/viewingPost.js';
import { PageProps } from '../main.js';

export async function generateID(redis: RedisClient): Promise<string> { 
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    let ID = '';
    const length = 6 + Math.floor(Math.random() * 2); //Randomly choose between 6 or 7
    ID = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      ID += chars[randomIndex];
    }
    const exists = await redis.get(ID); //Uses get to check if the key exists already
    if (exists != null) {  //If get does not return null, that means a key with that ID exists already, so call the function again and generate a new key
      return generateID(redis);
    }
     //If the key didn't exist, then return ID
    return ID;
  }