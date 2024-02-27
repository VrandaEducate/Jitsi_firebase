import {JitsiMeeting} from "@jitsi/react-sdk";
import React, {useState} from "react";
import {getFirestore, addDoc, collection, doc, setDoc, updateDoc} from "firebase/firestore";
import {app} from './firebase.js';


const FireBaseStore = getFirestore(app);

const Screen2 = ({setAPI, api}) => {



    const handleApiReady = (externalAPI) => {
        console.log(externalAPI);
        setAPI(externalAPI);
        console.log(api);
    }




    return (
        <>
            <h1
                style={{
                    fontFamily: "sans-serif",
                    textAlign: "center",
                }}
            >
                Screen 2
            </h1>

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

        </>
    )
}
export default Screen2;