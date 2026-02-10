import React from 'react'
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../store/postSlice';
import { postService } from '../appwrite'
import { Container, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = React.useState([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const storedPosts = dispatch(getAllPosts( {query: {status: "active"}} ));
        if (storedPosts && storedPosts.length > 0) {
            setPosts(storedPosts);
        }
        else {
            postService.getPosts().then(posts => {
                if (posts) {
                    setPosts(posts.rows);
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