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
  upvoteFunction: Function
  upvoteArray: number[];
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
    upvoteFunction,
    upvoteArray,
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
        <vstack width="90%" height="175px" alignment="top center" gap="small"> 
            <hstack>
              <text size="medium" color="black">{commentArray[0]?.comment}</text>
              <button onPress={(async) => upvoteFunction(commentArray[0])}  icon='caret-up' appearance='secondary' height="10px" width="10px"></button>
              <text size="medium" color="black"> Upvotes: {JSON.stringify(upvoteArray ? upvoteArray[0] : 0)}</text>
            </hstack>
            <hstack>
              <text size="medium" color="black"> Upvotes: {commentArray[1]?.comment}</text>
              <button onPress={(async) => upvoteFunction(commentArray[1])} icon='caret-up' appearance='secondary' height="10px" width="10px"></button>
              <text size="medium" color="black"> Upvotes: {JSON.stringify(upvoteArray ? upvoteArray[1] : 0)}</text>
            </hstack>
            <hstack>
              <text size="medium" color="black"> Upvotes: {commentArray[2]?.comment}</text>
              <button onPress={(async) => upvoteFunction(commentArray[2])} icon='caret-up' appearance='secondary' height="10px" width="10px"></button>
              <text size="medium" color="black"> Upvotes: {JSON.stringify(upvoteArray ? upvoteArray[2] : 0)}</text>
            </hstack>
            <hstack>
              <text size="medium" color="black"> Upvotes: {commentArray[3]?.comment}</text>
              <button onPress={(async) => upvoteFunction(commentArray[3])} icon='caret-up' appearance='secondary' height="10px" width="10px"></button>
              <text size="medium" color="black"> Upvotes: {JSON.stringify(upvoteArray ? upvoteArray[3] : 0)}</text>
            </hstack>
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

