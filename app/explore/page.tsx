import { MoreHorizontal, Search } from 'lucide-react'
import TrendingTopics  from './TrendingTopics'
import { Post } from "@/components/Post"
import styles from './page.module.css'

export default function Explore() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Explore</h1>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Ara"
            className={styles.searchInput}
          />
        </div>
      </div>

      <section className={styles.trendingSection}>
        <h2 className={styles.trendingHeader}>Türkiye konumunda Gündemde</h2>
        {TrendingTopics.map((topic) => (
          <div key={topic.id} className={styles.trendingItem}>
            <div className={styles.trendingInfo}>
              <span className={styles.category}>{topic.category}</span>
              <span className={styles.topic}>{topic.title}</span>
              <span className={styles.posts}>{topic.posts} gönderi</span>
            </div>
            <button className={styles.menuButton}>
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}
