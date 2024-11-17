'use client';
import { useState } from 'react';
import { amenities, Amenity } from '@/utils/amenities';
import { Checkbox } from '@/components/ui/checkbox';

function AmenitiesInput({ defaultValue }: { defaultValue?: Amenity[] }) {

  const amenitiesWithIcons = defaultValue?.map(({name, selected}) => {
    return {
      name,
      selected,
      icon:amenities.find((amenity)=> amenity.name === name)!.icon
    }
  })


  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    amenitiesWithIcons || amenities
  );

  // function to handle the change of the checkbox state
  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenity.name) {
          return { ...a, selected: !a.selected };
        }
        return a;
      });
    });
  };

  return (
    <section>
      {/* hidden input to store the amenities value */}
      <input
        type='hidden'
        name='amenities'
        value={JSON.stringify(selectedAmenities)}
      />
      {/* amenities list with amenities checkbox and label. 
      The state of the checkbox is saved to the database */}
      <div className='grid grid-cols-2 gap-4'>
        {/* map through the amenities and render the checkbox and label */}
        {selectedAmenities.map((amenity) => (
          <div key={amenity.name} className='flex items-center space-x-2'>
            <Checkbox
              id={amenity.name}
              checked={amenity.selected}
              onCheckedChange={() => handleChange(amenity)}
            />
            <label
              htmlFor={amenity.name}
              className='text-sm font-medium leading-none capitalize flex gap-x-2 items-center'
            >
              {amenity.name} <amenity.icon className='w-4 h-4' />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
export default AmenitiesInput;