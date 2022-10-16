import { type } from "@testing-library/user-event/dist/type";
import React, {useState} from "react";
import api from "./components/api";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [typedPokemon, setTypedPokemon] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    setTypedPokemon(event.target.value.toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!typedPokemon){
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.get(`/pokemon/${typedPokemon}`);
      setPokemon(response.data);
      setError(null)
      setIsLoading(false);
    } catch(error){
      setError("Pokemon nao encontrado")
      setIsLoading(false);
      setPokemon(null);
    }
  };

   return (
    <div>
      <h1>SEJA BEM BINDO A POKEDEX!</h1>
      <p>Digite o nome ou id do pokemon</p>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Numero ou Nome do pokemon"
          value={typedPokemon}
          onChange={handleChange}>
        </input>
        <button type="submit">
          {
            isLoading ? (
              <span>carregando...</span>
            ) : (
              <>
              Buscar
              </>
            )
          }
        </button>
      </form>
      {pokemon && (
        <div>
          <h2>HELLO</h2> 
          <h3>{pokemon.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
