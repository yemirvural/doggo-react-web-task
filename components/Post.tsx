'use client'

import { MessageCircle, Repeat2, Heart, Share, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react'
import Image from "next/image"
import styles from './Post.module.css'
import { useEffect, useState } from 'react'
import { Highlighter } from './Highlighter'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLike, toggleBookmark } from '@/app/store/features/postsSlice'
import { RootState } from '@/app/store/store'
import { format } from "date-fns";
import Skeleton from './Skeleton';

export interface Comment {
  username: string
  content: string
  timestamp: string
}

export interface Post {
  id: number
  username: string
  handle: string
  content: string
  timestamp: string
  likes: number
  reposts: number
  tags: string[];
  images: string[];
  comments: Comment[]
}

interface PostProps {
  readonly post: Post
  searchTerm?: string
}

export async function getPosts(page: number = 1, limit: number = 5) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/posts?_page=${page}&_limit=${limit}&_sort=-timestamp`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

async function getUnsplashImage(query: string) {
  const res = await fetch(
    `https://api.unsplash.com/photos/random/?query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch image')
  const data = await res.json()
  return data.urls.regular
}

function extractQueryParam(url: string): string {
  const queryMatch = url.split('?')[1]
  if (!queryMatch) return '' // TODO: Handle when queryMatch is not found.
  return queryMatch
}

export function Post({ post, searchTerm = '' }: PostProps & { searchTerm?: string }) {
  const { username, content, timestamp, images, likes, reposts, comments, tags } = post
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showComments, setShowComments] = useState(false)
  const dispatch = useDispatch()
  const likedPostIds = useSelector((state: RootState) => state.posts.likedPostIds)
  const bookmarkedPostIds = useSelector((state: RootState) => state.posts.bookmarkedPostIds)
  const [hasError, setHasError] = useState(false);

  const isLiked = likedPostIds.includes(post.id)
  const isBookmarked = bookmarkedPostIds.includes(post.id)

  useEffect(() => {
    const fetchImages = async () => {
      if (!images?.length) return

      try {
        const urls = await Promise.all(
          images.map(async (image) => {
            const query = extractQueryParam(image)
            if (!query) return null
            return await getUnsplashImage(query)
          })
        )
        setImageUrls(urls.filter(Boolean) as string[])
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [images])

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === imageUrls.length - 1 ? 0 : prev + 1
    )
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1
    )
  }

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const handlePostClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const isActionButton = target.closest('.actionButton')
    const isCarouselControl = target.closest('.carouselButton, .indicator')

    if (isActionButton && !isCarouselControl) {
      toggleComments()
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Mevcut beğeni durumu
    const updatedLikes = isLiked ? post.likes - 1 : post.likes + 1;

    // Redux aksiyonunu çağır
    dispatch(toggleLike(post.id));
    
    // Sunucuya PATCH isteği gönder
    fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Beğeni durumu güncellenemedi");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Post başarıyla güncellendi:", data);
      })
      .catch((error) => {
        console.error("Beğeni güncelleme hatası:", error);
      });
  };


  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(toggleBookmark(post.id))
  }

  const formattedTimestamp = format(new Date(timestamp), "yyyy-MM-dd HH:mm"); // Tarih ve saati formatlar
  return (
    <div className={styles.postContainer}>
      <div className={styles.post} onClick={handlePostClick}>
        <div className={styles.content}>
          <div className={styles.avatar}>
            <img src={`https://i.pravatar.cc/150?u=${username}`} alt={username} />
          </div>
          <div className={styles.body}>
            <div className={styles.header}>
              <span className={styles.username}>@{username}</span>
              <span className={styles.timestamp}>{formattedTimestamp}</span>
            </div>
            <p className={styles.text}>
              <Highlighter text={content} searchTerm={searchTerm} />
            </p>
            {images?.length > 0 && imageUrls?.length < 1 ? (
              <Skeleton />
            ) : (
              imageUrls?.length > 0 && (
                <div className={styles.imageCarousel}>
                  <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={imageUrls[currentImageIndex]}
                        alt={`Post image ${currentImageIndex + 1}`}
                        fill
                        className={styles.carouselImage}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={currentImageIndex === 0}
                        quality={90}
                        onError={() => setHasError(true)} // Hata olduğunda state'i güncelle
                      />
                    </div>
                    {imageUrls.length > 1 && (
                      <>
                        <button
                          className={`${styles.carouselButton} ${styles.prevButton}`}
                          onClick={previousImage}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          className={`${styles.carouselButton} ${styles.nextButton}`}
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                        <div className={styles.indicators}>
                          {imageUrls.map((_, index) => (
                            <button
                              key={index}
                              className={`${styles.indicator} ${index === currentImageIndex ? styles.activeIndicator : ''
                                }`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            )}
            <div className={styles.tags}>
              {tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.actions}>
              <button
                className={`${styles.actionButton} actionButton ${showComments ? styles.activeAction : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleComments()
                }}
              >
                <MessageCircle size={20} />
                <span className={styles.actionText}>{comments?.length || 0}</span>
              </button>
              <button className={`${styles.actionButton} actionButton`}>
                <Repeat2 size={20}/>
                <span className={styles.actionText}>{reposts}</span>
              </button>
              <button
                className={`${styles.actionButton} ${isLiked ? styles.activeAction : ''}`}
                onClick={handleLike}
              >
                <Heart size={20} className={isLiked ? "fill-current" : ""} />
                <span className={styles.actionText}>{likes}</span>
              </button>
              <button
                className={`${styles.actionButton} ${isBookmarked ? styles.activeAction : ''}`}
                onClick={handleBookmark}
              >
                <Bookmark size={20} className={isBookmarked ? "fill-current" : ""} />
              </button>
              <button className={`${styles.actionButton} actionButton`}>
                <Share size={20} className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showComments && (
        <div className={styles.commentsSection}>
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className={styles.commentItem}>
                <div className={styles.commentAvatar}>
                  <img src="/placeholder.svg" alt={comment.username} />
                </div>
                <div className={styles.commentBody}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentUsername}>{comment.username}</span>
                    <span className={styles.commentTimestamp}>{comment.timestamp}</span>
                  </div>
                  <p className={styles.commentText}>{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noComments}>No comments yet</div>
          )}
        </div>
      )}
    </div>
  )
}