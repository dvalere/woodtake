import { Context, Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, useState } from '@devvit/public-api';
import type { PageProps } from '../main.js';
import type { postProp } from '../utils/postProp.js';
import type { pages } from '../utils/pages.js';
import type { comment } from '../utils/comment.js';

interface CommentProps {
  setPage: (page: pages) => void;
  currentPost: string; //post ID
  commentForm: FormKey;
  commentArray: comment[];
  incrementCommentPage: ()=>Promise<void>;
  decrementCommentPage: ()=>Promise<void>;
  commentPage: number;
}

export const Comments = (props: CommentProps, context: Context,): JSX.Element => {  
  const { ui } = context;
  const { 
    setPage,
    currentPost,
    commentForm,
    commentArray,
    incrementCommentPage,
    decrementCommentPage,
    commentPage,
  } = props;

  return (
    <vstack width="100%" height="100%" alignment="top center" backgroundColor="white" gap="medium">
        <hstack width="85%" height="20%" alignment="top start"gap="large"> 
            <hstack alignment="top start">
                <button onPress={() => setPage('gallery')} icon="back" disabled={false} appearance="secondary"></button>
            </hstack>
            <hstack alignment="middle center" width="82%" height="100%">
                <text weight="bold" color="black">Comments</text>
            </hstack>
        </hstack>
        <vstack width="150px" height="175px" alignment="top center" gap="small"> 
            <text size="medium" color="black">{commentArray[0]?.comment}</text>
            <text size="medium" color="black">{commentArray[1]?.comment}</text>
            <text size="medium" color="black">{commentArray[2]?.comment}</text>
            <text size="medium" color="black">{commentArray[3]?.comment}</text>
        </vstack>
        <hstack  alignment="bottom center" width="85%" height="15%">
            <button onPress={async() => {
                                            if (commentPage !== 0){
                                                await decrementCommentPage();
                                            }}}
                icon="caret-up" disabled={false} appearance="secondary" height="100%" width="30%"></button>
            <button onPress={() => ui.showForm(commentForm)} disabled={false} appearance="secondary" height="100%" width="30%">Leave a comment!</button>
            <button onPress={async() => { await incrementCommentPage();}} icon="caret-down" disabled={false} appearance="secondary" height="100%" width="30%"></button>
        </hstack>
    </vstack>
  );
};