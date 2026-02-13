import { createSlice } from "@reduxjs/toolkit";

const addPostLogic = (state, post) => {
    console.log("Post inside addPostLogic(): ", post);
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
            const newPost = action.payload.post;

            if (newPost?.$id) {
                let isUpdated = false;
                state.posts.forEach(p => {
                    if (p.$id === newPost.$id) {
                        p = newPost;
                        isUpdated = true;
                        return;
                    }
                });

                if(isUpdated) { // Post found and Updated
                    console.log(`Post with Slug: ${newPost.$id} and Title: ${newPost.title} is SUCCESSFULLY UPDATED in Global State (Redux Store)`);
                }
                else { //Cannot Find Post, so add it as a new Post
                    addPostLogic(state, newPost);
                }
            }
            else {
                console.error("src/store/postSlice.js/updatePost() :: Invalid/Missing Post details/parameters ");
            }
        },

        deletePost(state, action) {
            const slug = action.payload.slug

            if (slug) {
                state.posts = state.posts.filter(p => (p.slug !== slug));
                console.log(`Post with Slug: ${slug} is Successfully Deleted from Global State (Redux Store)`);
            }
            else {
                console.error("src/store/postSlice.js/deletePost() :: Invalid/Missing Post Slug");
            }
        }
    }
})

export const {getAllPosts, getPost, addPost, addPosts, updatePost, deletePost} = postSlice.actions;
export default postSlice.reducer;