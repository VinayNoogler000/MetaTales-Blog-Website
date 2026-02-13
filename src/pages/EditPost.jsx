import React from 'react';
import { Container, PostForm } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from "../store/postSlice";
import { postService } from '../appwrite';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Slide } from 'react-toastify';

export default function EditPost() {
    const [post, setPost] = React.useState(null);
    const {slug} = useParams();
    const allStoredPosts = useSelector((state) => state.post.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const activePosts = React.useMemo(() => {
        return allStoredPosts?.filter(p => p.status === "active") || [];
    }, [allStoredPosts]);

    React.useEffect(() => {
        toast.info("If the Post details are Missing, then Please Refresh the Page Once!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
            toastId: "post-edit-page-toast",
            delay: 1500
        });
        

        if (slug) {
            if (!post && activePosts?.length > 0) {
                setPost(() => activePosts.find(p => p.$id === slug));
                console.log("Edit Post Page loaded from Redux Store:");
            }
            else if (!post && activePosts?.length === 0) {
                postService.getPost(slug).then(post => {
                    if (post) {
                        setPost(post);
                        console.log("Edit Post Page loaded from Appwrite-DB:");
                        dispatch(addPost({post}));
                    }
                })
            }
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