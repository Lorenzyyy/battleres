
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import fields from '../assets/1stpage.png'

// const Sinnoh: React.FC = () => {
//   const navigate = useNavigate();

//   const goToStarter = () => {
//     navigate('starterPoke');
//   };

//   return (
//            <div>
//         <button
//           onClick={goToStarter}
//           className="mt-4 px-6 py-2 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition"
//         >
//           Do you want to Start The Game?
//         </button>
//       </div>
//   );
// };

// export default Sinnoh;

import React from 'react';

const Sinnoh: React.FC = () => {
    const handleStart = () => {
        window.location.href = '/starterPoke';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('https://giphy.com/embed/rKtwRUY7Jq4SzNG2CC')] bg-cover bg-center">
            <div style={{ width: '100%', height: '0', paddingBottom: '100%', position: 'relative' }}>
                <iframe
                    src="https://giphy.com/embed/rKtwRUY7Jq4SzNG2CC"
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute' }}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleStart}>
                Click Here to Start
            </button>
        </div>
    );
};

export default Sinnoh;
