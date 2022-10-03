import { useEffect, useState } from 'react'
import './App.css'
import getRandomNumber from './utils/getRandomNumber'
import axios from 'axios'
import LocationInfo from './components/LocationInfo'
import CardResident from './components/CardResident'
import FilterList from './components/FilterList'
import Error from './components/Error'
import background from './assets/backgroundWall.webp'

function App() {

  getRandomNumber() //Retorna numero randoms (1-126)

  const [location, setLocation] = useState() //Guarda una Location
  const [searchInput, setSearchInput] = useState('') //useState para el input de  onSubmit y hacer la peticion 
  const [suggestedList, setSuggestedList] = useState() //useState para guardar y cambiar el valor del onChange 
  // Estado para almacenar el error e indicar si hay o no error
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let id = getRandomNumber()
    if(searchInput){//En esta logica indica que se muetras un numero random o el valor del input
      id = searchInput
    }

    const URL = `https://rickandmortyapi.com/api/location/${id}`
      
    axios.get(URL)
        .then(res => {
          setHasError(false)
          setLocation(res.data)
        })
        .catch(err => setHasError(true))
  }, [searchInput])

  const handleSubmit = event =>{
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)//Aca se captura la informacion del input en el Set
  }
  //metodo onChange para al momento de ingresar valores al input sugiera datos
  const handleChange = event => {
    //Este if lo que hace es validar de que si el input esta vacio no se ejecute y si esta lleno que ejecute url y axios
    if(event.target.value == ' '){
      setSuggestedList()
      
     } else{
    const URL  = `https://rickandmortyapi.com/api/location?name=${event.target.value}`
    axios.get(URL)
      .then(res => setSuggestedList(res.data.results))//Trae la informacion que se necesita de la Api
      .catch(err => console.log(err))
     }  
  }
  return (
    <div className="App">
      <img src={background} alt="" className='banner__img'/>
      <h1 className='title'>Rick And Morty Api</h1>
      
      <form  onSubmit={handleSubmit}>
        <input 
        id='idLocation'
        type="text"
        onChange={handleChange}
        placeholder='Enter number from 1 to 126 '/>
        <button>Search</button>
        <section className='section__filter'>
        <FilterList
        // Se envia props con datos para el componente suggestedList
        suggestedList = {suggestedList} 
        setSearchInput={setSearchInput}/>
        </section>
      </form>
      {
        hasError ?
          <Error />
         :
         //se usa solo en casos especiales, es un fragment jsx
         <> 
         <LocationInfo location={location} />
          <div className='card-container'>
            {
              location?.residents.map(url => (
                <CardResident
                key = {url}
                url = {url}
                />
              ))
            }
          </div>
          </>  //Se ocupa para expresar una funcion jsx 
      }
    </div>
  )
}

export default App
