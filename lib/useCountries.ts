import countries from "world-countries";

interface Country {
  name: {
    common: string;
  };
  flag: string;
  latlng: [number, number];
  region: string;
}

const formattedCountries = countries.map((country: Country) => ({
  value: country.name.common,
  label: `${country.name.common} ${country.flag}`,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
