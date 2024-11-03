import { FaStar } from "react-icons/fa";


function PropertyRating({ 
    inPage, 
}: { 
    propertyId: string;
    inPage: boolean;
}) {

  // temp hard coding of these values.
  const rating = 4.5;
  const count = 100;

  const className = `flex gap-1 items-center ${inPage ? 'text-md' : 'text-xs'}`;
  const countText = count > 1 ? "reviews" : "review";
  const countValue = `(${count}) ${inPage ? countText : ''}`;

  return (
    <span className={className}>
      <FaStar className='w-3 h-3' />
      {rating} {countValue}
    </span>
  );
}

export default PropertyRating;
