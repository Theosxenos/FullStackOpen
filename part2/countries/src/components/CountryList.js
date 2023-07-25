import CountryView from "./CountryView";

const CountryList = ({countries, onShowClick}) => countries.map((country) =>
    <div key={country.cca3}>
        {country.name.common} <button onClick={() => onShowClick(country.name.common)}>show</button>
    </div>)

export default CountryList;