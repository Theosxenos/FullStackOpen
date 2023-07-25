const CountryView = ({country}) => {
    const {name: {common: name}, capital, area, languages} = country;
    const {png: flagUrl, alt: flagAlt} = country.flags;

    const flagStyle = {
        height: 150,
        width: 150,
    }

    return <div>
        <h1>{name}</h1>
        <div>capital {capital[0]}</div>
        <div>area {area}</div>

        <h3>languages:</h3>
        <ul>
            {Object.keys(languages).map((languageKey) => <li key={languageKey}>{languages[languageKey]}</li>)}
        </ul>
        <img src={flagUrl} alt={flagAlt} style={flagStyle} />
    </div>
}

export default CountryView;