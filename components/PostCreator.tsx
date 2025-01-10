'use client'

import { useState } from "react"
import { ImageIcon, FileImageIcon as FileGif, ListFilter, Smile, VoteIcon as Poll } from 'lucide-react'
import styles from './PostCreator.module.css'
import { useDispatch } from 'react-redux'
import { createPost } from "@/app/store/features/postsSlice"
import { v4 as uuidv4 } from "uuid";

interface PostCreatorProps {
  onClose?: () => void
}

export function PostCreator({ onClose }: PostCreatorProps) {
  const [content, setContent] = useState("")
  const dispatch = useDispatch()

  const handleCreatePost = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Create a new post object
    const newPost = {
      id: uuidv4(),
      username: "me",
      avatar: "",
      handle: "handle",
      content: content,
      timestamp: new Date().toISOString(),
      likes: 0,
      reposts: 0,
      tags: [],
      images: [],
      comments: []
    }
    
    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Yeni post başarıyla eklendi:", data);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });

    // Dispatch the createPost action with the new post
    dispatch(createPost(newPost))
    
    // Clear the input
    setContent("")
    
    // Close the creator if onClose is provided
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <img src={`https://i.pravatar.cc/150?u=me`} alt="Avatar" />
        </div>
        <div className={styles.inputArea}>
          <textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
          />
          <div className={styles.actions}>
            <div className={styles.attachments}>
              <button className={styles.attachmentButton}>
                <ImageIcon className="h-4 w-4" />
              </button>
              <button className={styles.attachmentButton}>
                <FileGif className="h-4 w-4" />
              </button>
              <button className={styles.attachmentButton}>
                <ListFilter className="h-4 w-4" />
              </button>
              <button className={styles.attachmentButton}>
                <Smile className="h-4 w-4" />
              </button>
              <button className={styles.attachmentButton}>
                <Poll className="h-4 w-4" />
              </button>
            </div>
            <button 
              onClick={handleCreatePost} 
              className={styles.postButton}
              disabled={!content.trim()} // Disable button if content is empty
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}