import styles from './page.module.css'

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loadingPost}>
        <div className={styles.loadingAvatar}></div>
        <div className={styles.loadingContent}>
          <div className={styles.loadingLine}></div>
          <div className={styles.loadingLine}></div>
        </div>
      </div>
    </div>
  )
} 