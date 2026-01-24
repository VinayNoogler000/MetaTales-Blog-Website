import React from 'react'
import { postService } from '../appwrite';
import { Container, PostCard } from '../components';

export default function Home() {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        postService.getPosts().then(posts => {
            if (posts) {
                setPosts(posts.rows);
            }
        });
    }, []);

    if (posts && posts.length === 0) {
        return (
            <div className='w-full py-8 mt-8 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <h1 className='text-2xl font-bold hover:text-gray-500 w-full'>
                            Login to read posts
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