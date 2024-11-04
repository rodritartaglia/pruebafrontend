import { Link } from "react-router-dom";
import { Character } from "../types";
import { useState } from "react";

type Props = {
  character: Character;
  handleDelete: (id: number) => void
};

function CharacterCard({ character, handleDelete }: Props) {

    const [modal, setModal] = useState<boolean>(false) 

const handleModal = (event) => {
    setModal(true)
    event.preventDefault()
  };

const handleDeleteClick = (event) => {
    setModal(false)
    handleDelete(character.id)
    event.preventDefault()
}

  return (
    <div>
        <Link to={character.id.toString()}>
            <div className="flex flex-col items-center justify-center hover:scale-105 transition-all">
                <span>{character.name}</span>
                <div className="relative">
                    <img src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`} alt="" className="h-48 w-48 object-cover" />
                    <svg className="absolute top-0 right-0 z-10 hover:text-red-500" onClick={handleModal} xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </div>
            </div>
        </Link>
        {modal && 
            <div className="absolute w-screen h-screen bg-[rgba(0,0,0,.5)] top-0 left-0 flex z-50">
                <div className="bg-gray-100 rounded-lg m-auto h-52 w-96 flex flex-col items-center justify-evenly">
                    <span className="text-gray-600 font-semibold text-lg">¿Esta seguro que quiere eliminarlo?</span>
                    <div className="flex justify-evenly w-full">
                        <button onClick={() => setModal(false)} className="bg-red-700 px-6 py-2 rounded-md hover:bg-red-500">Cancelar</button>
                        <button onClick={handleDeleteClick} className="bg-green-700 px-6 py-2 rounded-md hover:bg-green-500">Aceptar</button>
                    </div>
                </div>
            </div>
        }
    </div>
  );
}

export default CharacterCard;
