import React from 'react'

export const ShopCard = () => {
  return (
    <li key={b.id} className={styles.bookItem}>
    <div className={styles.bookItemContainer}>
      <div className={styles.bookImageContainer}>
        <Link to={`/addReview/${b.id}`}>
          <img
            src={b.image}
            alt={b.id}
            className={styles.bookImage}
          />
        </Link>
      </div>
      <div className={styles.bookInfo}>
        <p className={styles.bookTitle}>{b.title}</p>
        <p>{b.quantity}</p>
        <p className={styles.price}>$ {b.price}</p>
      </div>
    </div>
  </li>
  )
}
