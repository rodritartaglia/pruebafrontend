import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Character } from "../types"
import service from "../services/charactersService"

function CharacterDetail() {
const [character, setCharacter] = useState<Character>()
const [status, setStatus] = useState<'pending' | 'resolved' | 'finished'>('pending')
const [modal, setModal] = useState<boolean>(false)

const {id} = useParams()

const mapCharacterData = (data: any): Character => ({
        id: data.id,
        name: data.name,
        description: data.description,
        comics: data.comics.available,
        events: data.events.available,
        series: data.series.items.map((item: any) => item.name),
        stories: data.stories.available,
        thumbnail: `${data.thumbnail.path}.${data.thumbnail.extension}`,
        urls: data.urls.map((url: any) => url.url)
})

const mapNewCharacterData = (data: any): Character => ({
    id: data.id,
    name: data.name,
    description: data.description,
    comics: 0,
    events: 0,
    series: [],
    stories: 0,
    thumbnail: `${data.thumbnail.path}.${data.thumbnail.extension}`,
    urls: []
})

const handleModal = (event) => {
    setModal(true)
    event.preventDefault()
  };

const handleEdit = (event) => {
    event.preventDefault()
    character.name = event.target.name.value
    character.description = event.target.description.value
    setModal(false)
    // aca se mandaria el objeto editado al endpoint
}

  useEffect(() => {
    if (id != undefined) {
        service.getCharacter(id)
            .then((data) => setCharacter(mapCharacterData(data)))
            .then(() => setStatus("resolved"))
            .catch(() => {
                const newCharacterLocal = JSON.parse(localStorage.getItem("newCharacter"))
                if(newCharacterLocal) {
                    const mappedNewCharacter = mapNewCharacterData(newCharacterLocal)
                    setCharacter(mappedNewCharacter)
                    setStatus("resolved")
                }
                else {
                    setStatus("finished")
                }
            })
    }
  },[])

  if (status == 'pending') {
   return <span className="flex justify-center items-center h-screen text-2xl">Cargando...</span>
  }

  if(status == 'finished') {
    return <span className="flex justify-center items-center h-screen text-2xl">Ha ocurrido un error</span>
  }

  return (
    <div className="w-screen h-screen p-20 flex items-center justify-center">
        <div className="flex bg-gray-800 w-full max-w-5xl h-full rounded-xl shadow-lg text-pretty">
            <div className="flex flex-col justify-between items-start w-1/2 p-10 space-y-4 overflow-y-scroll overflow-x-hidden">
                <div className="flex gap-4">
                    <h1 className="text-4xl w-full font-bold mb-6 border-b-2 border-indigo-500 pb-2">Detalles del Personaje</h1>
                    <svg className="w-8 h-8 hover:text-green-400 hover:cursor-pointer" onClick={handleModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                </div>
                <span className="text-3xl font-semibold">{character?.name}</span>
                <p>{character?.description}</p>
                <span className="text-lg font-semibold">Comics: {character?.comics}</span>
                <span className="text-lg font-semibold">Eventos: {character?.events}</span>
                <div>
                    <span className="text-lg font-semibold">Series: </span>
                    <ul className="list-disc list-inside">
                        {character?.series?.map((serie, index) => (
                            <li key={index} className="text-sm">{serie}</li>
                        ))}
                    </ul>

                </div>
                <span className="text-lg font-semibold">Stories: {character?.stories}</span>
                <div>
                <span className="text-lg font-semibold">Urls: </span>
                    <ul className="list-disc list-inside">
                        {character?.urls?.map((url, index) => (
                            <li key={index} className="text-sm break-all">
                              <a href={url} target="_blank" className="text-indigo-400 break-words hover:underline">
                                  {url}
                              </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-1/2 object-cover h-full">
                <img src={character?.thumbnail} alt="" className="w-full h-full object-cover"/>
            </div>
        </div>
        {modal && 
        <div className="absolute w-screen h-screen bg-[rgba(0,0,0,.5)] top-0 left-0 flex z-50">
          <form onSubmit={handleEdit} className="m-auto text-black bg-gray-100 shadow-lg rounded-xl p-8 flex flex-col items-center justify-evenly">
                <span className="text-gray-600 font-semibold text-lg px-24 py-10">Editar Personaje</span>
                  <div className="flex flex-col mb-4 w-[80%]">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-600 mb-2">Nombre</label>
                    <input type="text" id="name" className="p-2 rounded-md" defaultValue={character?.name}/>
                  </div>
                  <div className="flex flex-col mb-6 w-[80%]">
                    <label htmlFor="description" className="text-sm font-semibold text-gray-600 mb-2">Descripcion</label>
                    <textarea id="description" className="rounded-md p-2 h-24 resize-none" defaultValue={character?.description}></textarea>
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

export default CharacterDetail