import {JitsiMeeting} from "@jitsi/react-sdk";
import React, {useState} from "react";
import { doc, setDoc, updateDoc} from "firebase/firestore";
import { FireBaseStore} from './firebase.js';
import "./App.css";

const Screen1 = ({setFirst}) => {

    const [api, setAPI] = useState();


    const handleApiReady =  (externalAPI) => {
        setAPI(externalAPI);
        if(externalAPI){
            console.log(externalAPI);
            setDoc(doc(FireBaseStore, "rooms/bdjfbkerihuvhavdavd"), {
                state : 'ON'
            })
            externalAPI.addEventListener("participantLeft", async (event) => {
                // alert('Save recording Locally!!');
                console.log("Participant left:", event);
                const stateRef = doc(FireBaseStore, "rooms/bdjfbkerihuvhavdavd");
                updateDoc(stateRef, {
                    state: 'OFF'
                })
                setFirst(false);
            });

            externalAPI.addEventListener('participantJoined',  (event) => {
                const muted =   externalAPI.isAudioMuted();
                muted.then((res) => {
                    if(res){
                        // externalAPI.executeCommand('toggleAudio');
                    }
                    externalAPI.executeCommand('startRecording', {mode: 'stream',
                        youtubeStreamKey: '8xzz-w13b-pc9h-qw6t-7ghz',
                        // dropboxToken: 'sl.Bwmdwg7Qhw3FgUP5qQ2JuLkmUicK5NIcdKc4pLr3RimaEsDAcu8DIEsp8UK9V8hn9tmMunfvtzbWtRrRY12zA-4iHbJt1OJKWQTEJ_lDMsJk73ViyKd890SAhwJHxfRmCjp_6-eQ-w15',
                     });
                });
            });
        }
    }


    return (
        <div id="screen1">

            <JitsiMeeting
                roomName="bdjfbkerihuvhavdavd"
                domain="educateapp.live"
                configOverwrite={{
                    subject: "lalalala",
                    requireDisplayName: true,
                    startVideoMuted: 2,
                    disablePolls: true,
                    disableReactions: true,
                    startWithAudioMuted: false,
                    startWithVideoMuted: true,
                    // dropbox: {
                    //     appKey:
                    //         'rylbm8x1ag5n7ft',
                    //     redirectURI: 'educateapp.live'
                    // },
                    recordingService: {
                        enabled: true
                    }
                }}
                lang="en"
                onApiReady={(externalApi) => handleApiReady(externalApi)}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.width = "100vw";
                    iframeRef.style.height = "100vh";
                }}

            />
            {/*<button className="bg-green-200 m-2 text-white font-bold py-2 px-4 rounded" onClick={() => executeCommandAndLog('startRecording', {mode: 'local'})}>Start Recording</button>*/}
            {/*<button className="bg-green-200 m-2 text-white font-bold py-2 px-4 rounded" onClick={() => executeCommandAndLog('stopRecording', {mode: 'local'})}>Stop recording</button>*/}

        </div>
    )
}
export default Screen1;