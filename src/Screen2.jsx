import {JitsiMeeting} from "@jitsi/react-sdk";
import React from "react";
import {doc, getDoc, getFirestore, onSnapshot} from "firebase/firestore";
import {app} from './firebase.js';

const FireBaseStore = getFirestore(app);

const Screen2 = ({setSecond}) => {

    const handleApiReady = async (externalAPI) => {
        console.log(externalAPI);
        // setAPI(externalAPI);
        // console.log(api);
        const stateRef = doc(FireBaseStore, "rooms/bdjfbkerihuvhavdavd");
        const docSnap = await getDoc(stateRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
                onSnapshot(stateRef, (doc) => {
                    // console.log(doc.data());
                    if(doc.data().state === 'OFF'){
                        console.log("api", externalAPI);
                        // console.log('Meeting ended by Screen 1');

                        if(externalAPI){
                            // console.log('End Call from everyone')
                            externalAPI.executeCommand('hangup');
                            setSecond(false);
                        }
                    }
                })
        } else {
            console.log("Meeting not start Now");
        }
    }

    return (
        <>

            <JitsiMeeting
                roomName="bdjfbkerihuvhavdavd"
                domain="educateapp.live"
                configOverwrite={{
                    subject: "lalalala",
                    requireDisplayName: true,
                    startAudioOnly: true,
                    videoQuality: "480p",
                    disableReactions: true,
                    startWithVideoMuted: true,
                }}
                lang="en"
                onApiReady={(externalApi) => handleApiReady(externalApi)}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.width = "100vw";
                    iframeRef.style.height = "100vh";
                }}
            />

        </>
    )
}
export default Screen2;