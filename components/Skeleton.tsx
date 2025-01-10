import styles from './Skeleton.module.css';

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image} />
      <div className={styles.text} />
    </div>
  );
};

export default Skeleton; 