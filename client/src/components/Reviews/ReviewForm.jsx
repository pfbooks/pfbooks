import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./ReviewForm.module.css";
import { createReview } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Stars from "./Stars";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { bookById } from "../../redux/actions/actions";


const ReviewForm = () => {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const book = useSelector(state => state.detail)
  const user = JSON.parse(localStorage.getItem("user"));
  const { bookId } = useParams()
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
  useEffect(() => {
    dispatch(bookById(bookId));
  }, [dispatch, bookId]);

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
      return alert('Thanks for you review!')
    }
    else return alert('Select a rating star')
  };

  return (
    <>
      <div className={styles.centeredContainer}>
      <h3 className={styles.titleHeading2}>{book.title}</h3>
      <img className={styles.bookImage} src={book.image} alt={book.id}/>
      </div>
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
    </>
  );
};

export default ReviewForm;
