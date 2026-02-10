import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addPosts } from "../store/postSlice";
import { postService } from '../appwrite';
import { Container, PostCard } from '../components';

export default function Home() {
    const [posts, setPosts] = React.useState([]);
    const allStoredPosts = useSelector(state => state.post.posts);
    const isLoggedin = useSelector(state => state.auth.status);
    const dispatch = useDispatch();

    const activePosts = React.useMemo(() => allStoredPosts.filter(p => p.status === "active"), [allStoredPosts]);

    React.useEffect(() => {
        if (posts.length === 0 && activePosts?.length > 0) {
            setPosts(activePosts);
            console.log("Posts loaded from Redux Store:", activePosts);
        }
        else if (posts.length === 0 && activePosts?.length === 0) {
            postService.getPosts().then(posts => {
                if (posts) {
                    setPosts(posts.rows);
                    console.log("Posts loaded from AppwriteDB: ", posts.rows);
                    dispatch(addPosts({posts: posts.rows}));
                }
            });
        }
        
    }, []);

    if (posts && posts.length === 0) {
        return (
            <div className='w-full py-8 mt-8 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <h1 className='text-2xl font-bold hover:text-gray-500 w-full'>
                            { isLoggedin ? "Create New Posts and Become the 1st Person!" : "Log-in to Create/Read Posts" }
                        </h1>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts && posts.map(post => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}