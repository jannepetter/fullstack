import personService from "../services/personService"

const Persons=({persons,filter,handleDelete})=>{
    return(
      <>
        {persons.filter(p=>p.name.toLowerCase().includes(filter)).map(person=>
          <p 
          key={person.name}>{person.name} {person.number} 
          <button
            onClick={()=>handleDelete(person)}
          >delete</button>
          </p>
        )}
      </>
    )
  }

export default Persons