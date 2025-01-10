'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Post, type Post as PostType } from '../../components/Post'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

export default function Profile() {
  const [posts, setPosts] = useState<PostType[]>([])
  const createdPosts = useSelector((state: RootState) => state.posts.createdPosts)

  /* useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/posts`)
        if (!res.ok) throw new Error('Failed to fetch posts')
        const allPosts = await res.json()
        setPosts(allPosts.slice(0, 5))
      } catch (error) {
        console.error('Error fetching user posts:', error)
      }
    }

    if (createdPosts.length === 0) {
      fetchUserPosts()
    } else {
      setPosts(createdPosts)
    }
  }, [createdPosts]) */

  console.log(createdPosts)
  return (
    <div className={styles.container}>
      <div className={styles.banner} />
      <div className={styles.profileInfo}>
        <div className={styles.avatar}>
          <img src={`https://i.pravatar.cc/150?u=me`} alt="Avatar" />
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

