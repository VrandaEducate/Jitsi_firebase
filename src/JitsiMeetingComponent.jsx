import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useRef, useState } from "react";

const JitsiMeetingComponent = () => {
  const [api, setAPI] = useState(null);

  const [participantId, setParticipantId] = useState("");

  const handleApiReady = (externalAPI) => {
    console.log(externalAPI);
    // Add event listeners
    setAPI(externalAPI);
    externalAPI.addEventListener("audioMuteStatusChanged", (event) => {
      console.log("audioMuteStatusChanged", event);
    });

    externalAPI.addEventListener("participantJoined", (event) => {
      console.log("participantJoined", event);
    });

    externalAPI.addEventListener("mouseEnter", (event) => {
      console.log("mouseEnter", event);
    });

    externalAPI.addEventListener("notificationTriggered", (event) => {
      console.log("notificationTriggered", event);
    });

    externalAPI.addEventListener("videoMuteStatusChanged", (event) => {
      console.log("videoMuteStatusChanged", event);
    });
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
  const getContentSharingParticipants = () => {
    if (api) {
      const numParticipants = api.getContentSharingParticipants();
      numParticipants.then((res) =>
        console.log(`Number of participants:`, res.sharingParticipantIds)
      );
    } else {
      console.error("JitsiMeet API is not ready.");
    }
  };

  const getVideoQuality = () => {
    if (api) {
      const displayName = api.getVideoQuality();
      console.log(`Video Quality ${displayName}`);
    } else {
      console.error("JitsiMeet API is not ready.");
    }
  };

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
      <JitsiMeeting
        roomName="bdjfbkerihuvhavdavd"
        domain="educateapp.live"
        configOverwrite={{
          videoQuality: "480p",
          enableNoAudioDetection: true,
          enableTileView: true,
          startAudioOnly: true,
          enableWhiteboard: false,
        }}
        lang="en"
        onApiReady={(externalApi) => handleApiReady(externalApi)}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "400px";
        }}
      />

      <button
        className="bg-green-200 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={() => executeCommandAndLog("muteEveryone", "audio")}
      >
        Mute Everyone
      </button>
      <button
        className="bg-purple-400 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={() => executeCommandAndLog("displayName", "New Name")}
      >
        Change Display Name
      </button>
      <input
        type="text"
        value={participantId}
        onChange={(e) => setParticipantId(e.target.value)}
        placeholder="Participant ID"
      />
      <button
        className="bg-orange-200 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={() => executeCommandAndLog("setVideoQuality", 720)}
      >
        Set Video Quality
      </button>

      <button
        className="bg-blue-300 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={getContentSharingParticipants}
      >
        getContentSharingParticipants
      </button>
      <button
        className="bg-pink-400 m-2 text-white font-bold py-2 px-4 rounded"
        onClick={getVideoQuality}
      >
        getVideoQuality
      </button>
    </>
  );
};

export default JitsiMeetingComponent;
