'use client'

import { Post, type Post as PostType } from '../../components/Post'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

export default function Profile() {
  const [posts, setPosts] = useState<PostType[]>([])

  async function fetchPosts() {
    const baseUrl = `${process.env.NEXT_PUBLIC_DB_HOST}/posts`
    const params = new URLSearchParams({
      _sort: 'timestamp',
      _order: 'desc'
    })
  
    const res = await fetch(`${baseUrl}?${params}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
  }

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

  const createdPosts = posts.filter(post => post.username === "yemirvural")


  return (
    <div className={styles.container}>
      <div className={styles.banner} />
      <div className={styles.profileInfo}>
        <div className={styles.avatar}>
          <img src={`https://i.pravatar.cc/150?u=yemirvural`} alt="Avatar" />
        </div>
        <div className={styles.userInfo}>
          <h2 className={styles.name}>Yusuf Emir Vural</h2>
          <p className={styles.handle}>@yemirvural</p>
        </div>
      </div>
      <div className={styles.posts}>
        {createdPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
        {createdPosts.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No posts yet
          </div>
        )}
      </div>
    </div>
  )
}

