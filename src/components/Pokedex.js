import React, {useState} from "react";
import api from "./api";
import '../App.css';

import img_pokeball from "../assets/pokeball.svg"

function Pokedex() {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);
    const [typedPokemon, setTypedPokemon] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isShine, setIsShine] = useState(false);
  
    const handleChange = (event) => {
      setTypedPokemon(event.target.value.toLowerCase());
    };
  
    // 👇️ if you only need to capitalize first letter
    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleSubmitShine = () => {
      //event.preventDefault();
      setIsShine(value => !value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!typedPokemon){
        return;
      }
      setIsLoading(true);
      try {
        const response = await api.get(`/pokemon/${typedPokemon}`);
        console.log(response.data)
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
      <div className= "container">
      <div className="pokedex">
        <h1>SEJA BEM VINDO A POKEDEX!</h1>
        <p>Digite o nome ou id do pokemon</p>
        <form onSubmit={handleSubmit} className="inputconfig">
          <input 
            placeholder="Nome ou Numero"
            value={typedPokemon}
            onChange={handleChange}
            className="inputstyle">
          </input>
          <button className="buttonconfig" type="submit" >
            {
              isLoading ? (
                <span>carregando...</span>
              ) : (
                <>
                Buscar<img src={img_pokeball} alt="pokeball" className="buttonimg"/>{' '}
                </>
              )
            }
          </button>
        </form>
        {error  &&<span>{error}</span>}
        {pokemon && (
          <>
            <div className="pokemondetails" key={pokemon.id}>
             <h2>{capitalizeFirst(pokemon.name)}</h2>
             {
              isShine ? (
                <img src={pokemon.sprites['front_shiny']} alt={pokemon.name} className="avatarimg"/>
              ) :(
                <img src={pokemon.sprites['front_default']} alt={pokemon.name} className="avatarimg"/>
              )
             }
             <button className="buttonconfig" type="submit" onClick={handleSubmitShine}>{
              isShine ? (
                <>Normal Version</>
              ) : (
                <>Shine Version</>
              )
             }</button>
           </div>
           <div className="pokemondetails">
               <span>
                  <strong>Altura: </strong> {pokemon.height * 10}cm
               </span>
               <span>
                  <strong>Peso: </strong> {pokemon.weight / 10} kg
               </span>
               <span>
                  <strong>Tipo Principal: </strong> {pokemon.types[0].type.name}
               </span>
               <span>
                  <strong>ID: </strong> {pokemon.id}
               </span>
            </div>
          </>  
        )}
          </div>
          </div>
    )
  }

export default Pokedex