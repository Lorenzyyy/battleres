// import React, { useEffect, useState } from 'react';
// import { useLocation, Navigate } from 'react-router-dom';

// const Search: React.FC = () => {
//   const location = useLocation();

//   const { pokemonName } = location.state || {}; // Use optional chaining

//   const [pokemonData, setPokemonData] = useState<any>(null); // Adjust the type as needed
//   const [loading, setLoading] = useState(true);
//   console.log(pokemonName)
  
//   if (!pokemonName) {
//     return <Navigate to="/tambay" />;
//   }

//   useEffect(() => {
//     const fetchPokemonData = async () => {
//       try {
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
//         const data = await response.json();
//         setPokemonData(data);
//       } catch (error) {
//         console.error('Error fetching Pokémon data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPokemonData();
//   }, [pokemonName]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold">Battle Time!</h1>
//       <h2 className="mt-4 text-xl">You selected:</h2>
//       <div className="mt-2">
//         <img
//           src={pokemonData.sprites.front_default}
//           alt={pokemonData.name}
//           className="w-32 h-32"
//         />
//         <p className="text-lg">{pokemonData.name}</p>
//         {/* Additional Pokémon info can be displayed here */}
//       </div>
//       {/* Additional battle logic can go here */}
//     </div>  
//   );
// };

// export default Search ;
// src/starterPoke.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StarterPoke: React.FC = () => {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
  const [wildPokemon, setWildPokemon] = useState<any | null>(null);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      const randomPokemon: any[] = [];
      for (let i = 0; i < 3; i++) {
        const randomId = Math.floor(Math.random() * 898) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (response.ok) {
          const data = await response.json();
          const pokemonData = {
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default,
            hp: data.stats.find(stat => stat.stat.name === 'hp')?.base_stat,
            moves: data.moves.map(move => ({
              name: move.move.name,
              power: move.version_group_details[0]?.move_learn_method.name === 'tm'
                ? move.version_group_details[0]?.power
                : null,
            })).slice(0, 4)
          };
          randomPokemon.push(pokemonData);
        }
      }
      setPokemon(randomPokemon);
    };

    fetchRandomPokemon();
  }, []);

  const handleWildPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    if (response.ok) {
      const data = await response.json();
      const wildPokemonData = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        hp: data.stats.find(stat => stat.stat.name === 'hp')?.base_stat,
        moves: data.moves.map(move => ({
          name: move.move.name,
          power: move.version_group_details[0]?.move_learn_method.name === 'tm'
            ? move.version_group_details[0]?.power
            : null,
        })).slice(0, 4)
      };
      setWildPokemon(wildPokemonData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <h1 className="text-4xl font-bold text-white mb-4">Select Your Pokémon</h1>
      
      <div className="flex space-x-4 mb-4">
        {pokemon.map((poke) => (
          <div 
            key={poke.id} 
            className="cursor-pointer bg-white rounded-lg p-2"
            onClick={() => setSelectedPokemon(poke)}
          >
            <img src={poke.sprite} alt={poke.name} className="w-24 h-24" />
            <p className="text-black">{poke.name}</p>
            <p className="text-black">HP: {poke.hp}</p>
            {poke.moves.map(move => (
              <p key={move.name} className="text-black">{move.name} (Power: {move.power ?? 'N/A'})</p>
            ))}
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <div className="mt-4">
          <button 
            onClick={handleWildPokemon}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Encounter Wild Pokémon
          </button>
        </div>
      )}

      {wildPokemon && (
        <div className="mt-4 text-white text-center">
          <p>A wild {wildPokemon.name} appeared!</p>
          <img src={wildPokemon.sprite} alt={wildPokemon.name} className="w-32 h-32" />
          <Link to="/battle" state={{ selectedPokemon, wildPokemon }}>
            <button className="mt-4 bg-blue-500 py-2 px-4 rounded">
              Start Battle
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default StarterPoke;
