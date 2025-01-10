import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Post } from '../../../components/Post'

interface PostsState {
  likedPostIds: number[]
  bookmarkedPostIds: number[]
  createdPosts: Post[]
}

const initialState: PostsState = {
  likedPostIds: [],
  bookmarkedPostIds: [],
  createdPosts: []
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const postId = action.payload
      const index = state.likedPostIds.indexOf(postId)
      if (index === -1) {
        state.likedPostIds.push(postId)
      } else {
        state.likedPostIds.splice(index, 1)
      }
    },
    toggleBookmark: (state, action: PayloadAction<number>) => {
      const postId = action.payload
      const index = state.bookmarkedPostIds.indexOf(postId)
      if (index === -1) {
        state.bookmarkedPostIds.push(postId)
      } else {
        state.bookmarkedPostIds.splice(index, 1)
      }
    },
    createPost: (state, action: PayloadAction<Post>) => {
      state.createdPosts.unshift(action.payload)
    }
  }
})

export const { toggleLike, toggleBookmark, createPost } = postsSlice.actions
export default postsSlice.reducer 