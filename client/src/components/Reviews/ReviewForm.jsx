import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./ReviewForm.module.css";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleStarHover = (star) => {
    setRating(star);
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar la review al servidor
    // Aquí puedes utilizar el estado 'rating' y 'comment' para enviar los datos correspondientes
  };

  return (
    <form className={styles["review-form"]} onSubmit={handleSubmit}>
      <h2 className={styles["form-title"]}>Deja tu review</h2>

      <div className={styles["rating-section"]}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={
              star <= rating
                ? styles["star-icon-filled"]
                : styles["star-icon"]
            }
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
