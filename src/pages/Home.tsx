import { useEffect, useState } from "react"
import '../services/charactersService'
import service from "../services/charactersService"
import { Character } from "../types"
import CharacterCard from "../components/CharacterCard"

function Home() {

const [characters, setCharacters] = useState<Character[]>([])
const [status, setStatus] = useState<'pending' | 'resolved' | 'finished'>('pending')
const [modal, setModal] = useState<boolean>(false)

const handleDelete = (id: number) => {
  setCharacters(characters.filter(character => character.id !== id))
  // actualizarlo en la API
}

const handleAdd = (event) => {
  const newCharacter = {
    id: Date.now(),
    name: event.target.name.value,
    description: event.target.description.value,
    thumbnail: {
      path: 'https://png.pngtree.com/png-vector/20190929/ourmid/pngtree-superhero-standing-with-hands-on-hips-silhouette-png-image_1767930',
      extension: 'jpg'
    }
    // demas valores
  }
  setModal(false)
  event.preventDefault()
  setCharacters([newCharacter, ...characters])
  localStorage.setItem("newCharacter", JSON.stringify(newCharacter))   // en vez de esto, se mandaria el objeto nuevo al endpoint del POST

};

useEffect(() => {
    service.getData()
    .then((data) => {
      setCharacters(data)
      setStatus('resolved')
      localStorage.clear()
    })
    .catch(() => setStatus("finished"))
},[])

  if (status == 'pending') {
   return <span className="flex justify-center items-center h-screen text-2xl">Cargando...</span>
  }

  if(status == 'finished') {
    return <span className="flex justify-center items-center h-screen text-2xl">Ha ocurrido un error</span>
  }
    

  return (
    <div className="flex gap-12 flex-wrap justify-center p-24">
      <span className="h-48 w-48 bg-[rgba(255,255,255,.25)] self-end hover:scale-105 transition-all cursor-pointer text-center items-center flex justify-center text-5xl" onClick={() => setModal(true)}>
        +
      </span>
      {characters.map((character) =>
        <CharacterCard key={character.id} character={character} handleDelete={handleDelete}/>
        )}
      {modal && 
        <div className="absolute w-screen h-screen bg-[rgba(0,0,0,.5)] top-0 left-0 flex z-50">
          <form onSubmit={handleAdd} className="m-auto text-black bg-gray-100 shadow-lg rounded-xl p-8 flex flex-col items-center justify-evenly">
                  <h2 className="text-gray-600 font-semibold text-lg px-24 py-10">Agregar Personaje</h2>
                  <div className="flex flex-col mb-4 w-[80%]">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-600 mb-2">Nombre</label>
                    <input type="text" id="name" className="p-2 rounded-md" placeholder="Ingrese el nombre del personaje"/>
                  </div>
                  <div className="flex flex-col mb-6 w-[80%]">
                    <label htmlFor="description" className="text-sm font-semibold text-gray-600 mb-2">Descripcion</label>
                    <textarea id="description" className="rounded-md p-2 h-24 resize-none" placeholder="Ingrese la descripcion del personaje"></textarea>
                  </div>
                <div className="flex justify-evenly w-full p-12 text-white">
                    <button onClick={() => setModal(false)} className="bg-red-700 px-6 py-2 rounded-md hover:bg-red-500">Cancelar</button>
                    <button type="submit" className="bg-green-700 px-6 py-2 rounded-md hover:bg-green-500">Aceptar</button>
                </div>
          </form>
        </div>
      }
    </div>
  )
}

export default Home