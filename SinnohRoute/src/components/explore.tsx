import React, { useState } from 'react';
import { useEffect } from 'react';

interface Pokemon {
  name: string;
  sprite: string;
}

const Explore: React.FC = () => {
  const [encounteredPokemon, setEncounteredPokemon] = useState<Pokemon | null>(null);
  const [wildPokemon, setWildPokemon] = useState<Pokemon | null>(null);
  const [battleAlert, setBattleAlert] = useState<boolean>(false);

  const backgroundImage = 'url("https://example.com/your-background-image.jpg")'; // Replace with your background image URL

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon API has 898 Pokémon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    return {
      name: data.name,
      sprite: data.sprites.front_default,
    };
  };

  const handleEncounter = async () => {
    const encountered = await fetchRandomPokemon();
    const wild = await fetchRandomPokemon();
    setEncounteredPokemon(encountered);
    setWildPokemon(wild);
    setBattleAlert(true);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4">Route 218 Western Sinnoh</h1>
        <button
          onClick={handleEncounter}
          className="px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition"
        >
          Search Pokémon
        </button>

        {battleAlert && (
          <div className="mt-4 text-white">
            <p className="text-xl">A wild {wildPokemon?.name} appeared!</p>
            <img src={wildPokemon?.sprite} alt={wildPokemon?.name} className="w-32 h-32" />
            <p className="text-xl">You encountered {encounteredPokemon?.name}!</p>
            <img src={encounteredPokemon?.sprite} alt={encounteredPokemon?.name} className="w-32 h-32" />
            <div className="mt-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition mr-2">
                Attack
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                Capture
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;