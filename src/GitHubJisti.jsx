import { JitsiMeeting } from "@jitsi/react-sdk";
import React, {useEffect, useRef, useState} from "react";
import { getFirestore, collection, doc, setDoc, getDoc , onSnapshot} from "firebase/firestore";
import {app} from './firebase.js';


const FireBaseStore = getFirestore(app);

const GitHubJisti = () => {
  const [api, setAPI] = useState(null);

  const [participantId, setParticipantId] = useState("");
  const [others, setOthers] = useState();
  let users = [];

    useEffect(() => {
        // console.log('useEffect called');
        // console.log(api);
        if(api){
            api.addEventListener("participantJoined", (event) => {
                getRoomsInfo(event);
            })
            const roomId = "bdjfbkerihuvhavdavd";

            // Set up listener for changes in the room document
            const roomRef = doc(FireBaseStore, "rooms", roomId);
            const unsubscribe = onSnapshot(roomRef, (doc) => {
                const roomData = doc.data();
                // Handle status change of moderator
                const { users } = roomData;
                if(users[0].state === false){
                    const participants = users.slice(1);
                    setOthers(participants);
                    console.log(others);
                }
            });

            // Clean up the listener when the component unmounts
            return () => unsubscribe();
        }
    }, [api]);

    const getParticipantInfoSpecificTotheRoom = async () => {
        console.log("button clicked");
        const roomRef = doc(FireBaseStore, "rooms/bdjfbkerihuvhavdavd"); // Use collection instead of doc
        const snapShot = await getDoc(roomRef);
        const allUsers = snapShot.data();
        // console.log(allUsers);
        const participants = allUsers.users.filter((user) => user.role === 'participant');
        console.log(participants);
    }

  const handleApiReady = (externalAPI) => {
    console.log(externalAPI);
    // Add event listeners
    setAPI(externalAPI);
    externalAPI.addEventListener("participantJoined",   (event) => {
      console.log("Participant joined:", event)
    });

    externalAPI.addEventListener("participantLeft", (event) => {
      console.log("Participant left:", event);
    });

    externalAPI.addEventListener("screenSharingStatusChanged", (event) => {
      console.log("Screen sharing status changed:", event);
    });

    externalAPI.addEventListener("incomingMessage", (event) => {
      console.log("Chat Box Updated", event);
    });

    externalAPI.addEventListener("outgoingMessage", (event) => {
      console.log("OutGoing Message", event);
    });
    externalAPI.addEventListener("recordingStatusChanged", (event) => {
        console.log("recordingStatusChanged", event);
    })
  };
  const executeCommandAndLog = (command, ...args) => {
    console.log(api);
    console.log(participantId);
    if (api) {
      api.executeCommand(command, ...args);
      console.log(`Executed command: ${command}`);
    } else {
      console.error("JitsiMeet API is not ready. Command execution aborted.");
    }
  };
  const getNumberOfParticipants = () => {
    if (api) {
      const numParticipants = api.getNumberOfParticipants();
      console.log(`Number of participants: ${numParticipants}`);
    } else {
      console.error("JitsiMeet API is not ready.");
    }
  };

  const getDisplayName = (participantId) => {
    if (api) {
      const displayName = api.getDisplayName(participantId);
      console.log(`Display name: ${displayName}`);
    } else {
      console.error("JitsiMeet API is not ready.");
    }
  };

  const isAudioMuted = () => {
    if (api) {
      const muted = api.isAudioMuted();
      muted.then((res) => console.log("Audio Muted:", res));
    } else {
      console.error("JitsiMeet API is not ready.");
    }
  };

  const getRoomsInfo =  (event) => {
    if (api) {

        const roomsInfo = api.getRoomsInfo();
      roomsInfo.then((res) => {
          console.log(res);
          if(res.rooms[0].participants.length === 2){
              users = res.rooms[0].participants;
          }else{
              users = [...users, res.rooms[0].participants[res.rooms[0].participants.length-1]];
          }

          updateUsers();


      });
    } else {
      console.error("JitsiMeet API is not ready.");
    }
  };
    const updateUsers = async () => {
        const roomRef = collection(FireBaseStore, "rooms");
        await setDoc(doc(roomRef, "bdjfbkerihuvhavdavd"), {
            users });
    }

  return (
    <>
      <h1
        style={{
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        JitsiMeeting Demo App
      </h1>
        {
            others ? <div>Meeting  ended</div> :

        <div>
      <JitsiMeeting
        roomName="bdjfbkerihuvhavdavd"
          domain="educateapp.live"
          configOverwrite={{
          subject: "lalalala",
          requireDisplayName: true,
          startVideoMuted: 2,
          disablePolls: true,
          disableReactions: true,
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        }}
        lang="en"
        onApiReady={(externalApi) => handleApiReady(externalApi)}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "400px";
        }}
      />
      <button
        className="bg-yellow-500 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={() => executeCommandAndLog("toggleRaiseHand")}
      >
        Raise Hand
      </button>
      <button
        className="bg-green-200 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={() => executeCommandAndLog("startRecording")}
      >
        Start Recording
      </button>
      <button
        className="bg-purple-400 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={() => executeCommandAndLog("stopRecording")}
      >
        Stop Recording
      </button>
            {/*<button onClick={() => }>recordingLinkAvailable</button>*/}
      <input
        type="text"
        value={participantId}
        onChange={(e) => setParticipantId(e.target.value)}
        placeholder="Participant ID"
      />
      <button
        className="bg-orange-200 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={() => executeCommandAndLog("kickParticipant", participantId)}
      >
        Kick Participant
      </button>
      <button
        className="bg-red-300 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={() => executeCommandAndLog("pinParticipant", participantId)}
      >
        Pin Participant with ID
      </button>
      <button
        className="bg-blue-300 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={getNumberOfParticipants}
      >
        Get Number of Participants
      </button>
      <button
        className="bg-pink-400 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={() => getDisplayName(participantId)}
      >
        Get Display Name
      </button>
      <button
        className="bg-teal-600 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={isAudioMuted}
      >
        Check if Audio is Muted
      </button>
      <button
        className="bg-orange-600 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={getRoomsInfo}
      >
        Get Rooms Info
      </button>
        <button className="bg-slate-600 m-2 text-white font-bold py-2 px-4 rounded"
                onClick={getParticipantInfoSpecificTotheRoom}>getParticipantInfoSpecificTotheRoom</button>
        </div>
        }
    </>
  );
};

export default GitHubJisti;
