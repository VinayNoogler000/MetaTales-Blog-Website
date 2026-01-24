import React from 'react'
import { postService } from '../appwrite'
import { Container, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => { }, []);

    postService.getPosts().then(posts => {
        if (posts) {
            setPosts(posts.documents);
        }
    });

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts && posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts