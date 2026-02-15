import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { imageService, postService } from '../appwrite';
import { Button, Container } from '../components';
import parse from "html-react-parser";
import { useSelector, useDispatch } from 'react-redux';
import { addPost, deletePost as delPostFromStore} from '../store/postSlice';
import { toast, Slide } from 'react-toastify';

export default function Post() {
    const [post, setPost] = React.useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const storedPosts = useSelector(state => state.post.posts);
    const dispatch = useDispatch();

    const isAuthor = post && userData && (post.userId === userData.$id);

    useEffect(() => {
        toast.info("If the Post details or Edit/Delete Buttons are Missing, then Please Refresh the Page Once!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
            toastId: "post-view-page-toast",
            delay: 1500
        });
        
        if (slug) {
            const postFound = storedPosts?.find(p => p.$id === slug);

            if (postFound) { // post exists in the Redux Store
                setPost(postFound);
                console.log("Post Fetched from Redux Store");
            }
            else { // means, Post not exists in Redux-Store then fetch post from Appwrite-DB
                postService.getPost(slug).then(p => {
                    if (p) {
                        console.log("post:", post);
                        setPost(p);
                        dispatch(addPost(p));
                        console.log("Post Fetched from Appwrite-DB");
                    }
                    else navigate('/');
                });
            }
        }
    }, [slug, navigate]);

    const deletePost = () => {
        dispatch(delPostFromStore({slug: post.$id}));
        
        postService.deletePost(post.$id).then((status) => {
            if (status) {
                console.log(`Post with ID:${post.$id} is deleted from Appwrite-DB`);
                imageService.deleteFile(post.featuredImage);
                console.log(`Image with ID: ${post.featuredImage} is deleted from Appwrite-Bucket`)
            }
        });

        navigate('/');
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="max-w-xl flex justify-center mx-auto mb-4 relative border rounded-xl p-2">
                    <img
                        src={imageService.getImagePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}