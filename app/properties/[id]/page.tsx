import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import ImageContainer from "@/components/properties/ImageContainer";
import ShareButton from "@/components/properties/ShareButton";
import { fetchPropertyDetails, findExistingReview } from "@/utils/actions";
import { redirect } from "next/navigation";
import PropertyDetails from "@/components/properties/PropertyDetails";
import UserInfo from "@/components/properties/UserInfo";
import Description from "@/components/properties/Description";
import { Separator } from "@/components/ui/separator";
import Amenities from "@/components/properties/Amenities";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitReview from "@/components/reviews/SubmitReview";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import { auth } from "@clerk/nextjs/server";
import BookingWrapper from "@/components/booking/BookingWrapper";

// Dynamic import of PropertyMap to prevent server-side rendering
const DynamicMap = dynamic(
  () => import('@/components/properties/PropertyMap'),
  {
    ssr: false,
    loading: () => <Skeleton className='h-[400px] w-full' />,
  }
);
// Dynamic import of BookingWrapper to prevent server-side rendering
const DynamicBookingWrapper = dynamic(
  () => import('@/components/booking/BookingWrapper'),
  {
    ssr: false,
    loading: () => <Skeleton className='h-[200px] w-full' />,
  }
);

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  // fetch property details
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect('/');
  // destructure property details
  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
  const firstName = property.profile.firstName;
  // destructure profile image
  const profileImage = property.profile.profileImage;

  // Determine whether to show the submit review form on the property page.
  // The user must be logged in, not the owner of the property, and the review must not exist.
  // Check if user is logged in
  const { userId } = auth();
  // Check if user is not the owner of the property
  const isNotOwner = property.profile.clerkId !== userId;
  // Check if review does not exist.
  // If true, then we show the submit review button.
  const reviewDoesNotExist =
    userId && isNotOwner && !(await findExistingReview(userId, property.id));


  return (
    <section>
      <BreadCrumbs name={property.name} />
        <header className='flex justify-between items-center mt-4'>
          <h1 className='text-4xl font-bold '>{property.tagline}</h1>
          <div className='flex items-center gap-x-4'>
          <ShareButton name={property.name} propertyId={property.id} />
          <FavoriteToggleButton propertyId={property.id} />
          </div>
        </header>

        <ImageContainer mainImage={property.image} name={property.name} />

        <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
          <div className='lg:col-span-8'>
            <div className='flex gap-x-4 items-centre'>
              <h1 className='text-xl font-bold'>{property.name}</h1>
              <PropertyRating inPage propertyId={property.id} />
            </div>
            <PropertyDetails details={details} />
            <UserInfo profile={{ firstName, profileImage }} />
            <Separator className='my-4' />
            <Description description={property.description} />
            <Amenities amenities={property.amenities} />
            <DynamicMap countryCode={property.country} />
          </div>
          <div className='lg:col-span-4 flex flex-col items-centre'>
            <BookingWrapper propertyId={property.id} price={property.price} bookings={property.bookings} />
          </div>
        </section>
        {/* Conditional rendering of submit review form */}
        {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
        <PropertyReviews propertyId={property.id} />
    </section>
  );
}

export default PropertyDetailsPage;
