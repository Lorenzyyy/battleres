const getRandomPokemon = async (count: number = 3): Promise<any[]> => {
  const randomPokemon: any[] = [];

  for (let i = 0; i < count; i++) {
    const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon ID ranges from 1 to 898
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
            : null, // Set to null if not a TM move
        })).slice(0, 4) // Limit to first 4 moves
      };

      randomPokemon.push(pokemonData);
    } else {
      console.error(`Failed to fetch Pokémon with ID ${randomId}`);
    }
  }

  return randomPokemon;
};

export default getRandomPokemon;
