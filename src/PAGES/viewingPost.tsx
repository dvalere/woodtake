import { Context, Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, useState } from '@devvit/public-api';
import type { PageProps } from '../main.js';
import type { postProp } from '../utils/postProp.js';
import type { Block } from '../utils/block.js';
import type { pages } from '../utils/pages.js';

interface ViewingPostProps {
  setPage: (page: pages) => void;
  image: string;
  description: string;
  id: string;
  currentBlock: Block;
  commentForm: FormKey;
  loadComments: Function;
}


export const ViewingPost = (props: ViewingPostProps, context: Context,): JSX.Element => {  
  const { ui } = context;
  const { 
    setPage,
    image,
    description,
    id,
    currentBlock,
    commentForm,
    loadComments,
  } = props;

  return (
    <vstack width = "100%" height = "100%" alignment = "center middle" gap = "medium" backgroundColor = "white" padding="xsmall">
      <hstack width="100%">
        <button icon="back" disabled={false} appearance="secondary"></button>     
        <hstack width="100%" alignment="center middle">
          <text color="black" size="large" style="heading" > Leaderboard </text>
        </hstack>     
      </hstack>

    <vstack width="100%" gap="small" alignment= "start middle">
      <hstack>
        <text size="xxlarge" color = "black">1.</text>
        <text color="black">Username</text>
        <text color="black">Score</text>
      </hstack>
      <hstack>
        <text size="xxlarge" color = "black">2.</text>
        <text color="black">Username</text>
        <text color="black">Score</text>
      </hstack>
      <hstack>
        <text size="xxlarge" color = "black">3.</text>
        <text color="black">Username</text>
        <text color="black">Score</text>
      </hstack>
      <hstack>
        <text size="xxlarge" color = "black">4.</text>
        <text color="black">Username</text>
        <text color="black">Score</text>
      </hstack>
      <hstack>
        <text size="xxlarge" color = "black">5.</text>
        <text color="black">Username</text>
        <text color="black">Score</text>
      </hstack>
    </vstack>

    
    <hstack gap="small">
      <button size="large" disabled={false} appearance="secondary" icon="caret-up" height="45px" width="125px"></button>
      <text alignment='center bottom' size="large" color="black">{0}</text>
      <button size="large" disabled={false} appearance="secondary" icon="caret-down" height="45px" width="125px"></button>
    </hstack>
  </vstack>
  );
};

//Problem is; ID isn't there....
