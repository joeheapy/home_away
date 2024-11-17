'use client';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DateRange } from 'react-day-picker';
import { useProperty } from '@/utils/store';

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from '@/utils/calendar';

function BookingCalendar() {
  const currentDate = new Date();
  // State for the date range
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const bookings = useProperty((state) => state.bookings);
  const {toast} = useToast();

  // Generate blocked periods
  const blockedPeriods = generateBlockedPeriods({
    bookings, 
    today: currentDate});

  const unavailableDates = generateDisabledDates(blockedPeriods)


  // Set the range state in the global store    
  useEffect(() => {

    const selectedRange = generateDateRange(range);
      const isDisabledDateIncluded = selectedRange.some((date) => {
        if(unavailableDates[date]){
          setRange(defaultSelected)
          toast({
            description: 'Some of these dates are not available',
          })
        }
      })

    useProperty.setState({ range });
  }, [range]);

  return (
    <Calendar
      mode='range'
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className='mb-4'
      disabled={blockedPeriods}
    />
  );
}

export default BookingCalendar;