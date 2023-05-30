import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./ReviewForm.module.css";
import { createReview } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import Stars from "./Stars";

const ReviewForm = ({ bookId, user, setBookId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleStarHover = (star) => {
    const rat = star !== 0 ? star : 0; // Si star es 0, establece el rating en 0, de lo contrario, usa el valor de star
    const stars = document.getElementsByClassName(styles["star-icon"]);
  
    for (let i = 0; i < stars.length; i++) {
      if (i < rat) {
        stars[i].classList.add(styles["star-icon-filled"]);
      } else {
        stars[i].classList.remove(styles["star-icon-filled"]);
      }
    }
  };

  const handleStarClick = (star) => {
    setRating(star);
    console.log("Rating", star)
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(rating)
    const reviewData = {
      bookId: bookId,
      rating: rating,
      comment: comment,
      userName: user.name,
    };
     console.log(reviewData)
    if( rating !== 0 ){

      dispatch(createReview(reviewData));
      setRating(0)
      setComment('')
      setBookId('')
      return alert('Thanks for you review!')
    }
    else return alert('Select a rating star')
  };

  return (
    <form className={styles["review-form"]} onSubmit={handleSubmit}>
      <h2 className={styles["form-title"]}>Leave your review</h2>

        <span> Select a rating</span>
      <div className={styles["rating-section"]}>
        {[1, 2, 3, 4, 5].map((star, index) => (
          <FaStar
            key={index}
            className={
              star <= rating ? styles["star-icon-filled"] : styles["star-icon"]
            }
            value={star}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={() => handleStarHover(0)}
            onClick={() => handleStarClick(star)}
          />
        ))}
      
      </div>

      <div className={styles["comment-section"]}>
        <input
          type="text"
          className={styles["form-input"]}
          placeholder="Ingrese su comentario"
          value={comment}
          onChange={handleCommentChange}
        />
      </div>

      <button type="submit" className={styles["submit-button"]}>
        Enviar
      </button>
    </form>
  );
};

export default ReviewForm;
