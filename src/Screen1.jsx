import {JitsiMeeting} from "@jitsi/react-sdk";
import React from "react";
import {getFirestore, doc, setDoc, updateDoc} from "firebase/firestore";
import {app} from './firebase.js';


const FireBaseStore = getFirestore(app);

const Screen1 = () => {

    const handleApiReady = (externalAPI) => {
        if(externalAPI){
            console.log(externalAPI);
            setDoc(doc(FireBaseStore, "rooms/bdjfbkerihuvhavdavd"), {
                state : 'ON'
            })
            externalAPI.addEventListener("participantLeft", (event) => {
                console.log("Participant left:", event);
                const stateRef = doc(FireBaseStore, "rooms/bdjfbkerihuvhavdavd");
                updateDoc(stateRef, {
                    state: 'OFF'
                })
            });
        }
    }

    return (
        <>
            <h1
                style={{
                    fontFamily: "sans-serif",
                    textAlign: "center",
                }}
            >
                Screen 1
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
export default Screen1;