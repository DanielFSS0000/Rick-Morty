import React from 'react'

// aca se debe destructurar la props que se trae de app.jsx
const FilterList = ({suggestedList,setSearchInput}) => {

    const handleClick = id => setSearchInput(id)

  return (
    <ul className='filter__list'>
    {
        suggestedList?.map(location => (
            // para enviar un parametro, hacemos primero la funcion() y el parametro que recibe es un id
            //location.id es importante ya que almacena el id del elemento y se envia a setSearchInput para cambiarlo
            <li className='filter__item' onClick={() => handleClick(location.id)} 
            key={location.id}>{location.name}</li>
        ))
    }
    </ul>
  )
}

export default FilterList