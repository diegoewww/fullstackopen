import React from 'react'

const Filter = ({ handleChangeFilter, newFilter }) => {
  return (
    <div>
      filter shown with <input type="text" onChange={handleChangeFilter} value={newFilter} />
    </div>
  )
}

export default Filter