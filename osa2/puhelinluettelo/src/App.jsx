import { useEffect, useState } from 'react'
import AddPersonForm from './components/AddPersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const msgDuration = 3000

  useEffect(()=>{
    personService.getAll()
    .then(response=>{
      setPersons(response.data)
    })
  },[])

  const notifyUser=(message,type='success')=>{

    if (type === 'success'){
      setSuccess(message)
      setTimeout(()=>{
        setSuccess(null)
      },msgDuration)
    }else{
      setError(message)
      setTimeout(()=>{
        setError(null)
      },msgDuration)
    }
  }

  const handleSubmit=(event)=>{
    event.preventDefault()
    const newPerson = {
      name:newName,
      number:phone
    }
    const existingPerson = persons.find(p=>p.name === newName)
    if (existingPerson){
      const msg = `${newName} already added to phonebook, replace the old number with a new one?`
      const confirm = window.confirm(msg)
      if (confirm){
        newPerson.id = existingPerson.id
        personService.updatePerson(newPerson)
        .then(response=>{
            const filteredPersons = persons.filter(p=>p.id !== newPerson.id)
            setPersons(filteredPersons.concat(response.data))
            setNewName('')
            setPhone('')
            notifyUser(`Updated ${response.data.name}`)
        }).catch(error=>{
          if (error?.response?.data[0].name === 'ValidatorError'){
            notifyUser(`Person validation failed:${error.response.data[0]['field']}: ${error.response.data[0]['msg']}`,'error')
          }else{
            notifyUser('Could not update user. Something happened','error')
          }
        })
      }
    }else{
      personService.create(newPerson)
      .then(response=>{
          setPersons(persons.concat(response.data))
          setNewName('')
          setPhone('')
          notifyUser(`Added ${response.data.name}`)
      }).catch(error=>{
        if (error?.response?.data[0].name === 'ValidatorError'){
          notifyUser(`Person validation failed:${error.response.data[0]['field']}: ${error.response.data[0]['msg']}`,'error')
        }else{
          notifyUser('Could not add user. Something happened','error')
        }
      })
    }
  }
  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }

  const handlePhoneChange=(event)=>{
    setPhone(event.target.value)
  }
  const handleFilterChange=(event)=>{
    setFilter(event.target.value)
  }

  const handleDelete=(person)=>{
    const confirm = window.confirm(`Delete ${person.name} ?`)
    if (confirm){
      personService.deletePerson(person.id)
      .then(response=>{
        const newPersonlist = persons.filter(p=>p.id !== person.id)
        setPersons(newPersonlist)
        notifyUser(`Person ${person.name} deleted from server`)
      }).catch(error=>{
        notifyUser(`Could not delete ${person.name}. Something happened`,'error')
      }
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={success}
        errorMsg={error}
      ></Notification>
      <Filter 
        handleFilterChange={handleFilterChange} 
        filter={filter}
        ></Filter>
      <h2>add a new</h2>
      <AddPersonForm
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        newName={newName}
        phone={phone}
      ></AddPersonForm>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      ></Persons>
    </div>
  )

}

export default App
