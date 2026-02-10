import { createSlice } from "@reduxjs/toolkit";

const addPostLogic = (state, post) => {
    const { title, $id, content, featuredImage, status, userId } = post;

    if (post && (title && $id && content && featuredImage && status && userId)) {
        const existingPost = state.posts.find(p => p.$id === $id);

        if (!existingPost) { // post doesn't exists
            state.posts.push({title, $id, content, featuredImage, status, userId});
            console.log(`Post with Slug: ${$id} and Title: ${title} is SUCCESSFULLY ADDED to Global State (Redux Store)`);
            return true;
        }
        else {
            console.warn(`Post ${$id} already exists. Skipping...`);
        }
    }
    else {
        console.error("src/store/postSlice.js/addPostLogic() :: Invalid/Missing Post details/parameters ");
    }
    return false;
}

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [
            // {
            //     title: "example-title",
            //     $id: "example-slug",
            //     content: "example-content",
            //     featuredImage: "example-image-url",
            //     status: "example-status-active or inactive",
            //     userId: "example-user-id"
            // }
        ],
    },
    reducers: {
        addPost(state, action) {
            addPostLogic(state, action.payload.post);
        },

        addPosts(state, action) {
            const posts = action.payload.posts;

            if (posts?.length > 0){
                let allPostsAdded = true;

                for (const post of posts) {
                    if (!addPostLogic(state, post)) { // A Post wasn't stored due to invalid/missing Post details
                        allPostsAdded = false;
                    }
                }

                if (allPostsAdded) console.log("All Posts added successfully added and stored locally!");
                else console.warn("NOT All Posts were added and stored successfully!");
            }
            else {
                console.error("src/store/postSlice.js/addPosts() :: NO POSTS EXISTS in the Argument. Please pass at least one post");
            }
        },

        updatePost(state, action) {
            const post = action.payload.post;

            if (post && post.slug) {
                state.posts.forEach(p => {
                    if (p.slug === post.slug) {
                        p = {...post}
                        return;
                    }
                });
                console.log(`Post with Slug: ${post.slug} and Title: ${post.title} is SUCCESSFULLY UPDATED in Global State (Redux Store)`);
                return true;
            }
            else {
                console.error("src/store/postSlice.js/updatePost() :: Invalid/Missing Post details/parameters ");
                return false;
            }
        },

        deletePost(state, action) {
            const slug = action.payload.slug
            if (slug) {
                let deletedPost = undefined;
                state.posts = state.posts.filter(p => {
                    if (p.slug === slug) {
                        deletedPost = {...p};
                        return false;
                    }
                    return true;
                });
                console.log(`Post with Slug: ${deletedPost.slug} and Title: ${deletedPost.title} is SUCCESSFULLY DELETED from Global State (Redux Store)`);
                return deletedPost;
            }
            else {
                console.error("src/store/postSlice.js/deletePost() :: Invalid/Missing Post Slug");
                return false;
            }
        }
    }
})

export const {getAllPosts, getPost, addPost, addPosts, updatePost, deletePost} = postSlice.actions;
export default postSlice.reducer;