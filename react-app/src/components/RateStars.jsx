import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
const RateStars = ({ rating }) => {
  return (
    <div>
      <Stack spacing={1}>
        <Rating
          name="half-rating-read"
          defaultValue={rating}
          precision={0.5}
          readOnly
        />
      </Stack>
    </div>
  );
};

export default RateStars;
