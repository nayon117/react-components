import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({noOfStars=5}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (getCurrentIdx) =>{
    setRating(getCurrentIdx);
  }

  const handleMouseEnter = (getCurrentIdx) =>{
    setHover(getCurrentIdx);

  }
  const handleMouseLeave = (getCurrentIdx) =>{
    setHover(rating);

  }

  return (
    <div className='flex items-center justify-center'>
        {
        [...Array(noOfStars)].map((_,idx)=>{
          idx += 1;
          return <FaStar
          key={idx}
          style={{ color: idx <= (hover || rating) ? "#fff700" : "#000" }}
          onClick={()=>handleClick(idx)}
          onMouseMove={()=>handleMouseEnter(idx)}
          onMouseLeave={()=>handleMouseLeave(idx)}
          size={40}
          />
        })
        }
    </div>
  )
}
export default StarRating;
