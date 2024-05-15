const AddPersonForm=({onSubmit,onNameChange,onPhoneChange,newName,phone})=>{
    return(
      <>
        <form
          onSubmit={onSubmit}
        >
          <div>
            name: <input onChange={onNameChange} value={newName}/>
          </div>
          <div>
            number: <input onChange={onPhoneChange} value={phone}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    )
  }

export default AddPersonForm