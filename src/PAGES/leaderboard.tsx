import { Devvit, Context, RichTextBuilder, useForm, Form, RedisClient, FormKey } from '@devvit/public-api';
import type { PageProps } from '../main.js';
import type { postProp } from '../utils/postProp.js';
import type { Block } from '../utils/block.js';
import type { pages } from '../utils/pages.js';

interface LeaderboardProps {
  setPage: (page: pages) => void;
  blocks: Function;
  currentpage: number;
  leaderboardArray: string[];
  scoreArray: number[];
  increment: Function;
  decrement: Function;
  avatars: string[];
  pagenum: number;
  //Create a leaderboard spot interface, array, and function
}

export const Leaderboard = (props: LeaderboardProps, context: Context): JSX.Element => {
  const { ui } = context;
  const {
    setPage,
    blocks,
    currentpage,
    leaderboardArray,
    scoreArray,
    increment,
    decrement,
    pagenum,
    avatars,
  } = props;

  return(
    <vstack width = "100%" height = "100%" alignment = "center middle" gap = "medium" backgroundColor = "white" padding="xsmall">
    <hstack width="100%">
      <button onPress={async() => { setPage('gallery'); blocks(currentpage); }} icon="back" disabled={false} appearance="secondary"></button> 
      <spacer width='36%' ></spacer>    
        <text color="black" size="large" style="heading" > Leaderboard </text>
    </hstack>

    <vstack width="100%" gap="small" alignment= "start middle">
      <hstack>
        <text size="xxlarge" color = "black">1.</text>
        <image url={avatars[0]!} imageHeight="35px" imageWidth="35px"/>
        <text size='xxlarge' color="black">{leaderboardArray[0]}</text>
        <spacer width='35px'></spacer>
        <text size='xlarge' color="black">{scoreArray[0]}</text>
      </hstack>
      <hstack>
        <text size="xxlarge" color = "black">2.</text>
        //No image url for these other spots for now since I'll need to add an plain image for the url when there's nothing in it
        <text size="xxlarge" color="black">{leaderboardArray[1]}</text>
        <spacer width='35px'></spacer>
        <text size='xlarge' color="black">{scoreArray[1]}</text>
      </hstack>
      <hstack>
      <text size="xxlarge" color = "black">3.</text>
        <text size="xxlarge" color="black">{leaderboardArray[2]}</text>
        <spacer width='35px'></spacer>
        <text size='xlarge' color="black">{scoreArray[2]}</text>
      </hstack>
      <hstack>
      <text size="xxlarge" color = "black">4.</text>
        <text size="xxlarge" color="black">{leaderboardArray[3]}</text>
        <spacer width='35px'></spacer>
        <text size='xlarge' color="black">{scoreArray[3]}</text>
      </hstack>
      <hstack>
      <text size="xxlarge" color = "black">5.</text>
        <text size="xxlarge" color="black">{leaderboardArray[4]}</text>
        <spacer width='35px'></spacer>
        <text size='xlarge' color="black">{scoreArray[4]}</text>
      </hstack>
    </vstack>


    <hstack gap="small">
      <button onPress={async() => {await increment(pagenum);}} size="large" disabled={false} appearance="secondary" icon="caret-up" height="45px" width="125px"></button>
      <button onPress={async() => {await decrement(pagenum);}} size="large" disabled={false} appearance="secondary" icon="caret-down" height="45px" width="125px"></button>
    </hstack>
    </vstack>
  )
};
