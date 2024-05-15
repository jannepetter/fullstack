
const Filter=({handleChange,filter})=>{

    return(
        <>
        find countries
        <input
        onChange={handleChange}
        value={filter}
        ></input>
        <br></br>
        </>
    )
}

export default Filter