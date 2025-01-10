'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Post, type Post as PostType } from '../../components/Post'
import { useEffect, useState } from 'react'

async function fetchPosts(page: number = 1, searchTerm: string = '') {
  const baseUrl = 'http://localhost:3001/posts'
  const params = new URLSearchParams({
    _sort: 'timestamp',
    _order: 'desc'
  })

  const res = await fetch(`${baseUrl}?${params}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export default function Bookmarks() {
  const [posts, setPosts] = useState<PostType[]>([])
  const bookmarkedPostIds = useSelector((state: RootState) => state.posts.bookmarkedPostIds)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts()
        setPosts(fetchedPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    loadPosts()
  }, [])

  // Filter bookmarked posts
  const bookmarkedPosts = posts.filter(post => bookmarkedPostIds.includes(post.id))

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">Bookmarks</h1>
        </div>
      </div>
      {bookmarkedPosts.length > 0 ? (
        bookmarkedPosts.map(post => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">
          No bookmarked posts yet
        </div>
      )}
    </div>
  )
}

