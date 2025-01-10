'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Hash, Bookmark, User, Plus } from 'lucide-react'
import styles from './Sidebar.module.css'

export function Sidebar() {
  const pathname = usePathname()
  
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
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`${styles.navItem} ${route.active ? styles.navItemActive : ''}`}
          >
            <route.icon />
            <span>{route.label}</span>
          </Link>
        ))}
      </nav>
      <button className={styles.newPostButton}>
        <Plus />
        <span>New Post</span>
      </button>
    </div>
  )
}
