import React, {useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addPosts } from "../store/postSlice";
import { postService } from '../appwrite';
import { Container, PostCard } from '../components';
import { toast, Slide } from 'react-toastify';

function AllPosts() {
    const [posts, setPosts] = React.useState([]);
    const allStoredPosts = useSelector((state) => state.post.posts);
    const dispatch = useDispatch();
    const toastDisplayed = useRef(false);

    React.useEffect(() => {     
        if (!toastDisplayed.current) {
            toast.info("If All the Posts (Active + Inactive) are Not Rendered, then kindly Refresh the page, once!", 
            {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
                delay: 1500
            });
            
            toastDisplayed.current = true;
        }
        
        if (posts.length === 0 && allStoredPosts?.length > 0) {
            setPosts(allStoredPosts);
            console.log("Posts loaded from Redux Store:", allStoredPosts);
        }
        else if (posts.length === 0 && allStoredPosts?.length === 0) {
            postService.getPosts([]).then(posts => {
                if (posts) {
                    setPosts(posts.rows);
                    console.log("Posts loaded from AppwriteDB: ", posts.rows);
                    dispatch(addPosts({posts: posts.rows}));
                }
            })
        }
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-col items-center gap-5'>
                    {posts && posts.map((post) => (
                        <div key={post.$id} className='p-2 min-w-3xs max-w-md'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts