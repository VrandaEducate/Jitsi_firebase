// App.js
import React, { useState } from "react";
import Screen1 from "./Screen1.jsx";
import Screen2 from "./Screen2.jsx";
import {getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot} from "firebase/firestore";
import {app} from './firebase.js';


const FireBaseStore = getFirestore(app);



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
              onSnapshot(stateRef, (doc) => {
                  console.log(doc.data());
                  if(doc.data().state === 'OFF'){
                      console.log('Meeting ended by Screen 1');
                      console.log(api);
                      if(api){
                          console.log('End Call from everyone')
                          api.executeCommand('endConference');
                      }
                  }
              })
          }
      } else {
          // docSnap.data() will be undefined in this case
          console.log("Meeting not start Now");
      }
  };


  return (
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
        {first && <Screen1 />}
        {second && <Screen2 setAPI={setAPI} api={api} />
        }
    </div>
  );
};

export default App;
