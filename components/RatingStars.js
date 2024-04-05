import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function RatingStars({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starIcons = [];

  for (let i = 0; i < fullStars; i++) {
    starIcons.push(<FaStar key={i} style={{ color: "yellow" }}  />);
  }

  if (hasHalfStar) {
    starIcons.push(<FaStarHalfAlt key="half-star" style={{ color: "yellow" }} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    starIcons.push(<FaRegStar key={`empty-${i}`} style={{ color: "yellow" }} />);
  }

  return <div>{starIcons}</div>;
}

export default RatingStars;