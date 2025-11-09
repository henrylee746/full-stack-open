import { useState, useEffect } from "react";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/name`;
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        if (!name) {
          setCountry({
            found: false,
          });
        }
        const response = await fetch(`${baseUrl}/${name}`);
        if (!response.ok) {
          throw new Error(
            `Response returned w status code error ${response.status}`
          );
        }
        const data = await response.json();
        console.log(data);
        setCountry({
          data,
          found: true,
        });
      } catch (e) {
        console.error(e.message);
        setCountry({ found: false });
      }
    };
    if (name) fetchCountry();
  }, [name]);

  return country;
};

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
