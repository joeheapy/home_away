import { findCountryByCode } from '@/utils/countries';

function CountryFlagAndName({ countryCode }: { countryCode: string }) {
  const validCountry = findCountryByCode(countryCode);
  // Limit the length of the country name to 20 characters.
  const countryName =
    validCountry!.name.length > 20
      ? `${validCountry!.name.substring(0, 20)}...`
      : validCountry!.name;
  return (
    <span className='flex justify-between items-center gap-2 text-sm '>
      {validCountry?.flag} {countryName}
    </span>
  );
}
export default CountryFlagAndName;