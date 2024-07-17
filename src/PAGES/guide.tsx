import { Devvit, FormKey, Context } from '@devvit/public-api';
import type { PageProps } from '../main.js';
import type { pages } from '../utils/pages.js';

export interface uiType{
  ui: {
  showForm: (createForm: FormKey) => void;
  };
} //May not need

interface GuideProps {
  setPage: (PageProps: pages) => void;
  imageForm: FormKey;
}

export const Guide = (props: GuideProps, context:Context): JSX.Element => {
  const { 
    setPage,
    imageForm,
  } = props;

  const { ui } = context;
  return (  
    <vstack width = "100%" height = "100%" alignment="top" gap="medium" backgroundColor="white">
    <text size="large" weight="bold" wrap color = "black"> Submit wood for ID </text>
    <text size="small" wrap color ="black">1. Clean up the wood with a plane (or chisel for the end grain) so that we can see the grain clearly</text>
    <text size="small" wrap color ="black">2. Include a close-up picture of the end grain. Not blurry. Eng grain pore structure is one of the most useful bits of info for wood ID.</text>
    <text size="small" wrap color ="black">3. Note any non-visual distingushing characteristics. Does the wood feel particularly light or particularly dense? Does it have an odor when planned?</text>
    <text size="small" wrap color ="black">4.Include multiple pictures or text as sub-comments under the main picture, not as an avalanche of first-level comments. </text>
    <hstack alignment="middle center" gap="small">
    <hstack backgroundColor="PureGray-250" height="45px" width="125px">
        <text weight="bold" alignment="middle center" color="black">
          Cancel
        </text>
      </hstack>
      <hstack onPress={() => { ui.showForm(imageForm), setPage('landing')}} backgroundColor="PureGray-250" height="45px" width="125px">
        <text weight="bold" alignment="middle center" color="black">
        Continue
          </text>
      </hstack>
    </hstack>
  </vstack>
  );
}

