import { useState } from "react";
import Stars from "./Stars";
import styles from "./Reviews.module.css";

const Reviews = ({  Reviews }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>REVIEWS</h1>
      {Reviews?.map((item) => {
        return (
          <div key={item.id} className={styles.review}>
            <div className={styles.starRating}>
              <Stars rating={item.rating} />
              {/* <span className={styles.starLabel}>{item.rating}</span> */}
            </div>
            <>
            <h2>{item.userName}</h2> 
            <p className={styles.comment}> <strong> Comment: </strong> <br /> {item.comment}</p>
            </>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
