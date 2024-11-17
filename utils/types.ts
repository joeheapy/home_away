// The action function is used to handle the form data
export type actionFunction = (
    prevState: any,
    formData: FormData
    // The return type is a promise that resolves to an object 
    // with a message property of type string. 
  ) => Promise<{ message: string }>;

  // Property card props
  export type PropertyCardProps = {
    image: string;
    id: string;
    name: string;
    tagline: string;
    country: string;
    price: number;
  };

  export type DateRangeSelect = {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  
  export type Booking = {
    checkIn: Date;
    checkOut: Date;
  };