import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey } from '@devvit/public-api';
import type { PageProps } from '../main.js';

//Side note; the names of custom components must always be capitalized

export const Leaderboard = ({ setPage }: PageProps) => (
    <vstack
      width = "100%"
      height = "100%"
      alignment = "top"
      gap = "medium"
      backgroundColor = "white"
    >
      <text size="medium" color = "black">1.</text>
      //username stuff goes here
      <text size="medium" color = "black">2.</text>
      //username stuff goes here
      <text size="medium" color = "black">3.</text>
      //username stuff goes here
      <text size="medium" color = "black">4.</text>
      //username stuff goes here
  
    </vstack>
  );

  //Very outdated, will be updated soon