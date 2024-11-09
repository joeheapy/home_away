import { FaStar, FaRegStar } from 'react-icons/fa';

function Rating({ rating }: { rating: number }) {
  /**
   * Renders a 5-star rating component based on the rating prop (1-5)
   * Logic:
   * 1. Creates an array of 5 boolean values using Array.from()
   * 2. Each boolean indicates whether that position should be a filled star
   * 3. For each position (i+1), checks if it's less than or equal to the rating
   * 4. Maps the boolean array to either filled (FaStar) or outline (FaRegStar) star icons
   * 5. Applies primary color to filled stars, gray to empty stars
   * eg. if the review rating is 3, the stars array will be [true, true, true, false, false]
   * the return logic returns a div containing the array and puts a filled 
   * star for the first 3 positions and an empty star for the remaining 2.
   */
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

  return (
    <div className='flex items-center gap-x-1'>
      {stars.map((isFilled, i) => {
        const className = `w-3 h-3 ${
          isFilled ? 'text-primary' : 'text-gray-400'
        }`;
        return isFilled ? (
          <FaStar className={className} key={i} />
        ) : (
          <FaRegStar className={className} key={i} />
        );
      })}
    </div>
  );
}

export default Rating;