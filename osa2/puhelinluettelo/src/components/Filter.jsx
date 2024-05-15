const Filter=({handleFilterChange, filter})=>{
    return(
      <>
      filter: <input onChange={handleFilterChange} value={filter}/>
      </>
    )
  }

export default Filter