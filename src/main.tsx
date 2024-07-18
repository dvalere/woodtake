import { Devvit, RichTextBuilder, useForm, Form, RedisClient, FormKey, Comment } from '@devvit/public-api';
import { RenderContext } from '@devvit/public-api/devvit/internals/blocks/handler/RenderContext.js';
import { Landing } from './PAGES/landing.js';
import { Guide } from './PAGES/guide.js';
import { Leaderboard } from './PAGES/leaderboard.js';
import { ViewingPost } from './PAGES/viewingPost.js';
import { generateID } from './utils/utils.js';
import { getPost } from './utils/getPostTypeById.js';
import { Gallery } from './PAGES/gallery.js';
import type { T1ID } from  '/Users/darius.valere/devapps/woodtake/node_modules/@devvit/shared-types/tid.d.ts';
Devvit.configure({ media: true, redditAPI: true, redis: true,});

export type PageProps = {
  setPage: (page: string) => void;
}

Devvit.addCustomPostType({
  name: 'woodID',
  description: 'Identify types of wood',
  height: 'regular',
  render: context => {
    const { useState } = context;
    const [page, setPage] = useState('landing');
    const [identify, setIdentify] = context.useState(''); 
    const [imageURL, setImageUrl] = context.useState('');
    const [description, setDescription] = context.useState('');  
    const [currentPageNumber, setCurrentPageNumber] = useState(0);

    //gallery image block variables 
    const [block1, setBlock1] = useState("emptyblock.png");
    const [block2, setBlock2] = useState("emptyblock.png");
    const [block3, setBlock3] = useState("emptyblock.png");
    const [block4, setBlock4] = useState("emptyblock.png");
    const [block5, setBlock5] = useState("emptyblock.png");
    const [block6, setBlock6] = useState("emptyblock.png");
    const [block7, setBlock7] = useState("emptyblock.png");
    const [block8, setBlock8] = useState("emptyblock.png");
    const [block9, setBlock9] = useState("emptyblock.png");
    const [rangenum, addToRange]= useState(8);
    
    function incrementRange(){
      addToRange(rangenum + 9);
    }

    function decrementRange(){
      addToRange(rangenum - 9);
    }

    function incrementCurrentPage(){ //For when someone clicks up in gallery
      setCurrentPageNumber(currentPageNumber + 1);
      console.log(currentPageNumber);
    }
    
    function decrementCurrentPage(){ //For when someone clicks down in gallery
      setCurrentPageNumber(currentPageNumber - 1);
      console.log(currentPageNumber);
    }  

    function loadToGallery(){

    }
    //Create a new hash set: redis.hset(holder, {key: "empty string that will be disregarded, only thing we need is the key "})
    //Iterate through that hash set, and then on every index within it, refer back to the redis database, which will have another hash set referring to each key, with the post values

    let availablePage = 0;
    let availableBlocksLanding = 8; //For the landing page, which has 8 blocks instead of 9
    let availableBlocks = 9;
    function incrementAvailability(){
      if (availablePage == 0) {
        if (availableBlocksLanding > 0 ){
          availableBlocksLanding--;
        }
        else { 
          availablePage++; 
        }
      }
      else { 
        if (availableBlocks > 0){
          availableBlocks--;
        }
        else { 
          availablePage++; 
          availableBlocks = 9; 
        }
      }
    } //Should be ran AFTER the availablePage variable is used

    function findAvailableBlock(){
      if (availablePage == 0){
        if (availableBlocksLanding > 0){
          return availableBlocksLanding;
        }
        else {
          return availableBlocks;
        }
      }
    }

    function assignBlock(){
      if (currentPageNumber == 0){
        for (let test = rangenum; test > (rangenum-8); test--){
          if (test == (rangenum)){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock8(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-1){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock7(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-2){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock6(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-3){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock5(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-4){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock4(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-5){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock3(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-6){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock2(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-7){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock1(result!);
                  }
                });
                setBlock1(firstHolder.member);
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
        }
      }
      else{
        for (let test = rangenum; test > (rangenum-9); test--){
          if (test == (rangenum)){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock9(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-1){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock8(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-2){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock7(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-3){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock6(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-4){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock5(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-5){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock4(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-6){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock3(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-7){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock2(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
          else if (test == rangenum-8){
            context.redis.zRange('posts', test, test)
            .then(holder => {{
              // holder is an array, get the first element
              const firstHolder = holder[0];
              if (firstHolder) {{
                context.redis.hget(firstHolder.member, 'img').then(result => {
                  console.log(result);
                  if (result) {
                    setBlock1(result!);
                  }
                });
              }} else {{
                console.error('No member found');
              }}
            }})
            .catch(error => {{
              console.error(error);
            }});
          }
        }
      }
    }
    //If available page == 0, 

    //Else, for i = 0, while i < 9, i++, assign each redis hset to an image by referring to the sorted set, i++


    //create a separate redis set that holds the key of every hset 
    //Have the key set as the parameter
    
    const imageForm = context.useForm({
      title: 'Upload an image!',
      fields: [
        {
          name: 'myImage',
          type: 'image',
          label: 'Upload image',
          required: true,
        },
        {
          type: 'paragraph',
          name: 'myDescription',
          label: 'Description',
        },
      ],
    }, async (values) => {
      try {
        const { redis, ui, media } = context;

        const response = await media.upload ({
          url: values.myImage,
          type: 'image',
        });   //Extract ID from image URL
        
        //Comment creation
        const submittedComment = await context.reddit.submitComment({
            id: context.postId!, 
            richtext: new RichTextBuilder()
              .image({ mediaId: response.mediaId })
              .codeBlock({}, (cb) => cb.rawText(values.myDescription)),
        });
        setIdentify(submittedComment.id);
        setImageUrl(values.myImage);
        setDescription(values.myDescription);
        await redis.hset(submittedComment.id, {img: values.myImage, dsc: values.myDescription});
        await redis.zAdd('posts', {member: submittedComment.id, score: Date.now()});
        incrementAvailability();
        assignBlock();
        //await redis.zAdd('sortedset', 'commentID', 'timecreated');
        //Sorted sets start at index 0
        //Still have to track page since the camera icon changes the number....orrrr I could just move it

        //Use Number() on pagenum when retrieving, since it had to be turned into a string to be stored into redis
      } catch (err) {
        throw new Error(`Error uploading media: ${err}`);
      }
    });
    //For gallery blocks, the data will be loaded through the submittedComment id
    //Comments could be submitted through forms?
    

    let currentPage;
    switch (page) {
      case 'landing':
        currentPage = <Landing 
        setPage={setPage} 
        page={currentPageNumber}
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
        one={block1}
        two={block2}
        three={block3}
        four={block4}
        five={block5}
        six={block6}
        seven={block7}
        eight={block8}
        />; 
        break;
      case 'guide':
        currentPage = <Guide 
        imageForm={imageForm} 
        setPage={setPage}
        />; 
        break;
      case 'leaderboard':
        currentPage = <Leaderboard setPage={setPage} 
        />;
        break;
      case 'viewingpost':
        currentPage = <ViewingPost 
        post={getPost("author", identify, imageURL, description)}
        setPage={setPage}
        />;
      case 'gallery':
        currentPage = <Gallery
        page={currentPageNumber}
        one={block1}
        two={block2}
        three={block3}
        four={block4}
        five={block5}
        six={block6}
        seven={block7}
        eight={block8}
        nine={block9}
        incrementRange={incrementRange}
        decrementRange={decrementRange}
        incrementCurrentPage={incrementCurrentPage}
        decrementCurrentPage={decrementCurrentPage}
        setPage={setPage}
        />;
        break;
      default:
        currentPage = <Landing setPage={setPage} page={0} incrementCurrentPage={incrementCurrentPage} decrementCurrentPage={decrementCurrentPage}
        one={block1}
        two={block2}
        three={block3}
        four={block4}
        five={block5}
        six={block6}
        seven={block7}
        eight={block8}
        />;
    }

    return (
      <blocks>
        {currentPage}
      </blocks>
    )
  }
});

Devvit.addMenuItem({  
  location: 'subreddit',  
  label: 'Add woodID',  
  onPress: async (_, context) => {  
    const { reddit, ui } = context;  
    const currentSubreddit = await reddit.getCurrentSubreddit();  

    try {
      await reddit.submitPost({  
        title: 'woodID',  
        subredditName: 'chippitychop', 
        preview: (  
          <vstack>  
            <text>Loading...</text>  
          </vstack>  
        ),  
      });  
      ui.showToast(`Submitted woodID post to ${currentSubreddit.name}`);  
    } catch (error) {
      console.error(error);
      ui.showToast(`Failed to submit woodID post: ${(error as Error).message}`);}
  },  
});

export default Devvit;