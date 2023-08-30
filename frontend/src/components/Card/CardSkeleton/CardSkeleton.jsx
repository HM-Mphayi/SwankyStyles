import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./CardSkeleton.scss";

export default function CardSkeleton() {
  const arr = new Array(8).fill(0);
  return arr.map((_, index) => {
    return (
      <div key={index} className="card-skeleton">
        <Skeleton variant="rectangular" className="card-iamge-skeleton" />
        <Skeleton variant="rectangular" className="card-title-skeleton" />
        <Skeleton variant="rectangular" className="card-price-skeleton" />
      </div>
    );
  });
}
