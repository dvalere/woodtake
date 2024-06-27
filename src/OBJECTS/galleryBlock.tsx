import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, useState } from '@devvit/public-api';
import { PageProps } from '../main.js';
import { ViewingPost } from '../PAGES/viewingPost.js';

export const galleryBlock = ({setPage}: PageProps) => {
    <hstack onPress={() => setPage('c')} backgroundColor="PureGray-250" height="70px" width="70px">
    </hstack> //When clicked, it'll set the page to 'c' which is the ViewingPost page
    //I can add a useState variable to hold the image URL and description in this object
    //Then, I can modify the viewingPost object to require 3 string parameters, which will load the info from the useState

    //Need to find a way to redirect it to the viewingPost with the same redis ID
};
//onpress function that changes global variables which the viewingPost relies on