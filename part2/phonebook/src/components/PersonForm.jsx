import React from 'react'

const PersonForm = ({ handleSubmit, handleChangeName, newName, handleChangeNumber, newNumber }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChangeName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleChangeNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm 