'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Hash, Bookmark, User, Plus } from 'lucide-react'
import { useState } from "react"
import { PostCreator } from "./PostCreator"
import styles from './MobileNav.module.css'

export function MobileNav() {
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const routes = [
    {
      label: 'Home',
      icon: Home,
      href: '/',
      active: pathname === '/',
    },
    {
      label: 'Explore',
      icon: Hash,
      href: '/explore',
      active: pathname === '/explore',
    },
    {
      label: 'Bookmarks',
      icon: Bookmark,
      href: '/bookmarks',
      active: pathname === '/bookmarks',
    },
    {
      label: 'Profile',
      icon: User,
      href: '/profile',
      active: pathname === '/profile',
    },
  ]

  return (
    <>
      <nav className={styles.nav}>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`${styles.navItem} ${route.active ? styles.navItemActive : ''}`}
          >
            <route.icon />
          </Link>
        ))}
      </nav>
      <button 
        onClick={() => setIsModalOpen(true)}
        className={styles.newPostButton}
      >
        <Plus />
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>New Post</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className={styles.closeButton}
              >
                ✕
              </button>
            </div>
            <PostCreator onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}