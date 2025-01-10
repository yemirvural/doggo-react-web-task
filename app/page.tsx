'use client'

import { Search } from 'lucide-react'
import { PostCreator } from "../components/PostCreator"
import { Post, type Post as PostType } from "../components/Post"
import styles from './page.module.css'
import Loading from './loading'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import RootState from './store/features/postsSlice' // store dosyanızın yolunu belirtin

async function fetchPosts(page: number = 1, searchTerm: string = '') {
  const baseUrl = `${process.env.NEXT_PUBLIC_DB_HOST}/posts`
  const params = new URLSearchParams({
    _page: page.toString(),
    _limit: '5',
    _sort: 'timestamp',
    _order: 'desc'
  })

  if (searchTerm) {
    params.append('content_like', searchTerm)
  }

  const res = await fetch(`${baseUrl}?${params}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

function PostList({ searchTerm }: { searchTerm: string }) {
  const [posts, setPosts] = useState<PostType[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerTarget = useRef(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    const loadPosts = async () => {
      setLoading(true)
      try {
        const results = await fetchPosts(1, searchTerm)
        setPosts(results)
        setHasMore(results.length === 5)
        setPage(1)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    if (!searchTerm.trim()) {
      loadPosts()
    } else {
      searchTimeoutRef.current = setTimeout(loadPosts, 1500)
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchTerm])

  useEffect(() => {
    if (page > 1) {
      const loadMorePosts = async () => {
        if (loading || !hasMore) return

        setLoading(true)
        try {
          const newPosts = await fetchPosts(page, searchTerm)
          if (newPosts.length < 5) {
            setHasMore(false)
          }
          setPosts(prev => [...prev, ...newPosts])
        } catch (error) {
          console.error('Failed to fetch posts:', error)
        } finally {
          setLoading(false)
        }
      }

      loadMorePosts()
    }
  }, [page, searchTerm])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 1.0 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading])

  return (
    <>
      {posts.map((post: PostType) => (
        <Post key={post.id} post={post} searchTerm={searchTerm} />
      ))}
      <div ref={observerTarget} style={{ height: '20px' }}>
        {loading && <Loading />}
      </div>
    </>
  )
}

export default function Home() {
  const [searchState, setSearchState] = useState({
    term: '',
    isSearching: false
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value
    setSearchState(prev => ({
      ...prev,
      term: newTerm
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Home</h1>
          <button className={styles.searchButton}>
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className={styles.searchInput}>
          <input
            type="text"
            placeholder="Search Posts"
            className={styles.input}
            value={searchState.term}
            onChange={handleSearch}
          />
        </div>
      </div>
      <PostCreator />
      <PostList searchTerm={searchState.term} />
    </div>
  )
}

