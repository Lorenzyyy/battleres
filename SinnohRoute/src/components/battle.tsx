// import React from 'react';
// import { useLocation, Navigate } from 'react-router-dom';

// const Battle: React.FC = () => {
//   const location = useLocation();
//   const { starter, wild } = location.state || { starter: null, wild: null };

//   if (!starter || !wild) {
//     return <Navigate to="/explore" />;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold">Battle Time!</h1>
//       <div className="mt-4">
//         <p>Your Pokémon: {starter.name}</p>
//         <img src={starter.sprite} alt={starter.name} className="w-32 h-32" />
//       </div>
//       <div className="mt-4">
//         <p>Wild Pokémon: {wild.name}</p>
//         <img src={wild.sprite} alt={wild.name} className="w-32 h-32" />
//       </div>
//       {/* Additional battle logic can go here */}
//     </div>
//   );
// };

// export default Battle;
// src/Battle.tsx
// src/Battle.tsx
// src/Battle.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Battle: React.FC = () => {
  const location = useLocation();
  const { selectedPokemon, wildPokemon } = location.state;

  const [playerPokemon, setPlayerPokemon] = useState(selectedPokemon);
  const [enemyPokemon, setEnemyPokemon] = useState(wildPokemon);
  const [message, setMessage] = useState<string>('');
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);

  // Function to handle player attack
  const handleAttack = (moveIndex: number) => {
    if (!playerTurn) return;

    const move = playerPokemon.moves[moveIndex];
    if (!move || move.power === null) return; // Check if move is valid

    const playerDamage = move.power;
    const newEnemyHP = Math.max(0, enemyPokemon.hp - playerDamage);

    setEnemyPokemon(prev => ({ ...prev, hp: newEnemyHP }));
    setMessage(`You used ${move.name}! It dealt ${playerDamage} damage! Wild ${enemyPokemon.name} now has ${newEnemyHP} HP.`);
    
    setPlayerTurn(false);
  };

  // Function for enemy attack
  const enemyAttack = () => {
    const enemyMoveIndex = Math.floor(Math.random() * enemyPokemon.moves.length);
    const enemyMove = enemyPokemon.moves[enemyMoveIndex];
    
    if (!enemyMove || enemyMove.power === null) return; // Check if move is valid

    const enemyDamage = enemyMove.power;
    const newPlayerHP = Math.max(0, playerPokemon.hp - enemyDamage);

    setPlayerPokemon(prev => ({ ...prev, hp: newPlayerHP }));
    setMessage(`Wild ${enemyPokemon.name} used ${enemyMove.name}! It dealt ${enemyDamage} damage! Your ${playerPokemon.name} now has ${newPlayerHP} HP.`);
    
    setPlayerTurn(true);
  };

  useEffect(() => {
    if (!playerTurn) {
      enemyAttack();
    }
  }, [playerTurn]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-2xl mb-4">Battle!</h1>
      <div className="flex space-x-10 mb-4">
        <div className="text-center">
          <img src={playerPokemon.sprite} alt={playerPokemon.name} className="w-32 h-32" />
          <p>{playerPokemon.name} (HP: {playerPokemon.hp})</p>
        </div>
        <div className="text-center">
          <img src={enemyPokemon.sprite} alt={enemyPokemon.name} className="w-32 h-32" />
          <p>{enemyPokemon.name} (HP: {enemyPokemon.hp})</p>
        </div>
      </div>
      <p className="mb-4">{message}</p>
      {playerPokemon.hp > 0 && enemyPokemon.hp > 0 && (
        <div className="flex flex-col space-y-2">
          {playerPokemon.moves.map((move, index) => (
            <button 
              key={move.name} 
              onClick={() => handleAttack(index)} 
              className="bg-blue-500 py-2 px-4 rounded"
            >
              {move.name} (Power: {move.power})
            </button>
          ))}
        </div>
      )}
      {playerPokemon.hp <= 0 && <p>Your Pokémon fainted!</p>}
      {enemyPokemon.hp <= 0 && <p>You defeated the wild {enemyPokemon.name}!</p>}
    </div>
  );
};

export default Battle;
