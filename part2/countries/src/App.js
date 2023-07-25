import {useEffect, useState} from "react";
import axios from "axios";
import CountryList from "./components/CountryList";
import CountryView from "./components/CountryView";

const App = () => {

    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);

    const filteredCountries = country ? countries.filter((c) => c.name.common.toLowerCase().includes(country.toLowerCase())) : [];

    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then((response) => setCountries(response.data));
    }, []);

    return <div>
        <label htmlFor=''>find countries</label> <input id='country-input' value={country}
                                                        onChange={(e) => setCountry(e.target.value)}/>
        {filteredCountries.length === 1 && <CountryView country={filteredCountries[0]}/>}
        {filteredCountries.length > 1 && filteredCountries.length < 11 && <CountryList countries={filteredCountries}/>}
        {filteredCountries.length > 10 && <div>Too many matches, specify another filter</div>}
    </div>
};

export default App;
