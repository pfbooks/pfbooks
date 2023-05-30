import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const StyledFaStar = styled(FaStar)`
  color: goldenrod;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid black;
  }
`;

const Stars = ({ rating }) => {
  const ratingStars = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <StyledFaStar />
        ) : rating >= number ? (
          <FaStarHalfAlt style={{ color: "goldenrod" }} />
        ) : (
          <AiOutlineStar style={{ color: "#04ab77" }} />
        )}
      </span>
    );
  });
  return <div>{ratingStars}</div>;
};

export default Stars;
