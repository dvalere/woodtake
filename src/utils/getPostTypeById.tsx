import { postProp } from "./postProp.js";

export function getPost(auth: string, ID: string, URL: string, desc: string): postProp {
    const post: postProp = {
        author: auth,
        id: ID,
        imageUrl: URL,
        description: desc,
    };
    return post;
}

//Will return a post object with the given parameters, and will be used in viewingPage