import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import Rating from "./RateStars";
import RateStars from "./RateStars";
import ReviewCard from "./ReviewCard";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "64b7db714e0ab0379c4f50f7b4ecb2f7";

const language = "en-EN";
const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/movie/${movieId}/reviews?api_key=${api_key}&language=${language}`
      );
      if (response.status === 404) {
        throw new Error(
          "404 Not Found: The requested resource could not be found."
        );
      }
      if (response.status === 500) {
        throw new Error(
          "500 Internal Server Error: The server encountered an error."
        );
      }
      if (response.status === 401) {
        throw new Error(
          "401 Unauthorized: Access is denied due to invalid credentials."
        );
      }
      if (response.status === 403) {
        throw new Error(
          "403 Forbidden: The server understood the request, but it refuses to authorize it."
        );
      }
      if (response.status === 408) {
        throw new Error(
          "408 Request Timeout: The server timed out waiting for the request."
        );
      }

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      if (data.results.length != 0) {
        setReviews(data.results);
      }

      setError("");
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [movieId]);

  useEffect(() => {
    callbackReviews();
  }, [callbackReviews]);

  console.log(reviews);
  return (
    <div className="mt-3">
      {reviews?.length != 0 ? (
        reviews?.map((review) => (
          <ReviewCard
            key={review.id}
            author={review.author}
            rating={review.author_details.rating}
            review={review.content}
          />
        ))
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 2 }}>
          No reviews available for this movie.
        </Typography>
      )}
    </div>
  );
};

export default MovieReviews;
