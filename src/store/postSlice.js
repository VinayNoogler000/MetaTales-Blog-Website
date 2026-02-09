import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [
            // {
            //     title: "example-title",
            //     slug: "example-slug",
            //     content: "example-content",
            //     featuredImage: "example-image-url",
            //     status: "example-status-active or inactive",
            //     userId: "example-user-id"
            // }
        ],
    },
    reducers: {
        getAllPosts(state, action) {
            const query = action.payload.query;

            if (!query) { // No Queries for filtering out Posts, hence returns all posts.
                return state.posts;
            }
            else { // Queries exist for filtering out posts, so send filtered posts based on queries
                let filteredPosts = [...state.posts];
                const queryKeys = Object.keys(query);

                if (queryKeys.length > 0) {
                    for (const qKey of queryKeys) {
                        filteredPosts = filteredPosts.filter((p) => (Object.hasOwn(p, qKey) && p[qKey] === query[qKey]))
                    }
                }
                return filteredPosts; // even if the queries length is 0, then all the posts will be returned as "filteredPosts".
            }
        },
        
        getPost(state, action) {
            const slug = action.payload.slug;
            if (slug) return state.posts.find((p) => p.slug === slug);
            else {
                console.error("src/store/postSlice.js/getPost() :: Invalid/Missing Post Slug");
                return null;
            }
        },

        addPost(state, action) {
            const { title, slug, content, featuredImage, status, userId } = action.payload.post;
            if (title && slug && content && featuredImage && status && userId) {
                state.posts.push(action.payload.post);
                console.log(`Post with Slug: ${slug} and Title: ${title} is SUCCESSFULLY ADDED to Global State (Redux Store)`);
                return true;
            }
            else {
                console.error("src/store/postSlice.js/addPost() :: Invalid/Missing Post details/parameters ");
                return false;
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

export const {getPost, addPost, updatePost, deletePost} = postSlice.actions;
export default postSlice.reducer;