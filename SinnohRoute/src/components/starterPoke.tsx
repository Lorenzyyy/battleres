import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface Pokemon {
  name: string;
  sprite: string;
}

const starterPoke: React.FC = () => {
  const navigate = useNavigate();

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const fetchRandomPokemon = async () => {
    const promises = Array.from({ length: 3 }, async () => {
      const randomId = Math.floor(Math.random() * 898) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      return {
        name: data.name,
        sprite: data.sprites.front_default,
      };
    });
    const pokemons = await Promise.all(promises);
    setPokemonList(pokemons);
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    alert(`You have chosen ${pokemon.name}`); // Alert the chosen Pokémon's name
  };

  const handleStartAdventure = () => {
    if (selectedPokemon) {
      navigate('/Explore', { state: { pokemonName: selectedPokemon.name } });
    }
  };

  console.log(selectedPokemon)
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 bg-cover bg-center" style={{ background: 'url("https://giphy.com/embed/xVn3ZmKrKIOLS")' }}>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-8">Select Your Pokémon</h1>
        <div className="flex space-x-4 mb-8">
          {pokemonList.map((pokemon) => (
            <div key={pokemon.name} onClick={() => handlePokemonSelect(pokemon)} className="cursor-pointer">
              <img src={pokemon.sprite} alt={pokemon.name} className="w-24 h-24" />
              <p className="text-white text-center">{pokemon.name}</p>
            </div>
          ))}
        </div>
        <button
          onClick={handleStartAdventure}
          className={`px-8 py-4 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition ${
            !selectedPokemon ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!selectedPokemon}
        >
          Let's Start Adventure
        </button>
      </div>
    </div>
  );
};


export default starterPoke;