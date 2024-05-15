import { useEffect } from 'react'
import { useState } from 'react'
import countryService from './services/countryService'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')
  const [showDetail,setShowDetail] = useState(null)

  
  useEffect(()=>{
    countryService.getAll()
    .then(response=>{
      setCountries(response.data)
    })
  },[])

  const filteredCountries = filter ? countries.filter(c=>c.name.common.toLowerCase().includes(filter.toLowerCase())):countries
  
  if (!countries){
    return null
  }
  const handleFilter=(event)=>{
    if (showDetail){
      setShowDetail(null)
    }
    setFilter(event.target.value)
  }

  return (
    <>
    <Filter handleChange={handleFilter} filter={filter}></Filter>
    <Countries 
      countries={filteredCountries}
      handleShowDetail={setShowDetail}
      showDetail={showDetail}
    ></Countries>
    </>
  )
}

export default App
