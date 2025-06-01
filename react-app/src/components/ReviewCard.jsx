import React from "react";
import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import RateStars from "./RateStars";

const ReviewCard = ({ author, rating, review }) => {
  const [bioOverflow, setBioOverflow] = useState(false);
  const updatedRating = rating / 2;
  console.log("Rating:", updatedRating);
  return (
    <div>
      <div className="card mt-3" style={{ width: "100%" }}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="commentor d-flex align-items-center">
            <div
              className="rounded-circle bg-primary d-flex justify-content-center align-items-center text-white"
              style={{ width: "50px", height: "50px", fontWeight: "bold" }}
            >
              {author.charAt(0).toUpperCase()}
            </div>
            <h5 className="card-title mt-2 ms-3">{author}</h5>
          </div>
          <div className="rating d-flex">
            <p className="me-2 fw-bold">Rating:</p>
            <RateStars rating={updatedRating} />
          </div>
        </div>
        <div className={`card-body ${bioOverflow ? "expanded" : ""}`}>
          <p className={`movie-review ${bioOverflow ? "expanded" : ""}`}>
            {review}
          </p>
          <strong
            className={`float-end actor-details-read-more `}
            onClick={() => {
              setBioOverflow(!bioOverflow);
            }}
          >
            {`${bioOverflow ? "Daha Az Göster <" : "Daha Fazla Göster >"}`}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
