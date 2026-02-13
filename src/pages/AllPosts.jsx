import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addPosts } from "../store/postSlice";
import { postService } from '../appwrite'
import { Container, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = React.useState([]);
    const allStoredPosts = useSelector((state) => state.post.posts);
    const dispatch = useDispatch();
    
    // const activePosts = React.useMemo(() => {
    //     return allStoredPosts?.filter(p => p.status === "active") || [];
    // }, [allStoredPosts]);

    React.useEffect(() => {        
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
                <div className='flex flex-wrap'>
                    {posts && posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts