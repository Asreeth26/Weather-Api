import { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import { GEO_API_URL,geoApi } from "../../api";

const Search = ({onSearchChange}) => {
    const [search,setSearch] = useState(null);

    const handleChange = (searchData)=>{
        setSearch(searchData)
        onSearchChange(searchData)
    }

    const loadOptions = (inputValue) => {
        return fetch(
          `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
          geoApi
        )
          .then((response) => response.json())
          .then((response) => {
            return {
              options: response.data.map((city) => {
                return {
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.countryCode}`,
                };
              }),
            };
          });
      };
    return (
        <AsyncPaginate
        placeholder="Search For City"
        debounceTimeout={600}
        value={search}
        onChange={handleChange}
        loadOptions={loadOptions}
        />
    )
}

export default Search

