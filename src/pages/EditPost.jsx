import React from 'react';
import { Container, PostForm } from '../components';
import { postService } from '../appwrite';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPost() {
    const [post, setPost] = React.useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (slug) {
            postService.getPost(slug).then(post => {
                if (post) {
                    setPost(post);
                }
            })
        }
        else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}