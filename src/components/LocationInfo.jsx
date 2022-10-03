import React from 'react'

const LocationInfo = ({location}) => {

  return (
    <article className='location__container'>
        <h2 className='location__name'>{location?.name}</h2>
        <ul className='location__list'>
            <li className='location__item'><span className='location__span'>Types: </span>{location?.type}</li>
            <li className='location__item'><span className='location__span'>Dimension: </span>{location?.dimension}</li>
            <li className='location__item'><span className='location__span'>Population: </span>{location?.residents.length}</li>
        </ul>
    </article>
  )
}

export default LocationInfo