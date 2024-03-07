import React, { useState} from "react";
import Screen1 from "./Screen1.jsx";
import Screen2 from "./Screen2.jsx";
import { doc, getDoc} from "firebase/firestore";
import {FireBaseStore} from './firebase.js';

const App = () => {
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
    const [api, setAPI] = useState(null);
  const handleFirstScreen = () => {
    setFirst(true);

  };
  const handleSecondScreen = async () => {
      const stateRef = doc(FireBaseStore, "rooms/bdjfbkerihuvhavdavd");
      const docSnap = await getDoc(stateRef);

      if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          if(docSnap.data().state === 'ON'){
              setSecond(true);
          }
      } else {
          console.log("Meeting not start Now");
      }
  };


  return (
    <div>
        { !first && !second &&
            <div>
                <button
            className="bg-red-400 m-2 text-white font-bold py-2 px-4 rounded"
            onClick={handleFirstScreen}
        >
            Screen 1
        </button>
            <button
            className="bg-red-400 m-2 text-white font-bold py-2 px-4 rounded"
            onClick={handleSecondScreen}
    >
        Screen 2
    </button>
            </div>
}
        {first && <Screen1 setFirst={setFirst} />}
        {second && <Screen2 setSecond={setSecond} />
        }
    </div>
  );
};

export default App;
