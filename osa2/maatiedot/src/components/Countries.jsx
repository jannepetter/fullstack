
const Country=({country,handleShowDetail})=>{

    return(
        <>
        <p>{country.name.common} <button onClick={()=>handleShowDetail(country)}>show</button></p>
        </>
    )
}

const CountryDetail=({country})=>{
    
    const languages = []
    for (const lang in country.languages) {
        languages.push(country.languages[lang])
    }
    return(
        <>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <b>languages:</b>
        <ul>{languages.map(language=>
            <li>{language}</li>)}</ul>
        <img
            src={country.flags.png}
            alt={country.flags.alt}
        ></img>
        </>
    )
}

const Countries=({countries,handleShowDetail,showDetail})=>{


    if (countries.length === 1 || showDetail){
        return(
            <>
            <CountryDetail country={showDetail?showDetail:countries[0]}></CountryDetail>
            </>
        )
    }else if (countries.length >10){
        return(
            <>
            Too many matches, specify another filter
            </>
        )
    }else if (countries.length <=10){
        return(
            <>
            {countries.map(country=>
                <Country country={country} handleShowDetail={handleShowDetail}></Country>
                )}
            </>
        )
    }
}

export default Countries