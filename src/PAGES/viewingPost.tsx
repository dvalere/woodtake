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
  blocks: Function;
  currentpage: number;
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
    blocks,
    currentpage,
  } = props;

  return (
    <vstack width="100%" height="100%" alignment="top center" backgroundColor="white" gap="medium">
      <spacer height="1px" ></spacer>
      <hstack width="85%" height="20%" alignment="top center"gap="large"> 
          <button onPress={async() => { setPage('gallery'); blocks(currentpage); }} icon="back" disabled={false} appearance="secondary"></button>
          <text alignment="bottom center" weight="bold" color="black" > What is this? </text>
          <button icon='delete' appearance='secondary'></button>
      </hstack>
      <vstack width="150px" height="175px" alignment="top center" gap="small"> 
        <image url={currentBlock.img} imageWidth={128} imageHeight={128}/> 
        <text size="medium" color="black"> {currentBlock.dsc}</text>
      </vstack>
      <hstack  alignment="bottom center" width="85%" height="15%">
          <button onPress={async() => {await loadComments(currentBlock); setPage('comments');}} icon="comments" disabled={false} appearance="secondary" height="100%" width="100%" ></button>
      </hstack>
    </vstack>
  );
};

