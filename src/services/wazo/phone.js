import { useState, useEffect, useRef } from "react";
import { useAuth } from "toriphone-auth";

const usePhone = ({ setShowSidebar, setCallLogLength }) => {
  // api
  const { storagePrefsGet, Wazo } = useAuth();

  // phone Screen
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [toggleChat, setToggleChat] = useState(false);
  const [toggleMerge, setToggleMerge] = useState(false);
  const [toggleConference, setToggleConference] = useState(false);

  // phone sounds && user preferences
  const audioRef = useRef(null);
  const [audioVolume, setAudioVolume] = useState(100);
  const [audioDevice, setAudioDevice] = useState("");
  const [ringtone, setRingtone] = useState("./sounds/RingtoneIphone.mp3");
  const [ringVolume, setRingVolume] = useState(100);
  const [ringDevice, setRingDevice] = useState("");
  const [cameraDevice, setCameraDevice] = useState("");
  const [microDevice, setMicroDevice] = useState("");
  let audioTune;
  const callingRef = useRef(null);
  const [callTone, setCallTone] = useState("./sounds/Calling.mp3");
  // phone dialer
  const [number, setNumber] = useState("");
  const [incomingCall, setIncomingCall] = useState(false);
  const [callSession, setCallSession] = useState({});
  const [callSessions, setCallSessions] = useState({});
  const [conferenceAdhoc, setConferenceAdhoc] = useState(null);
  const [callChatMessages, setCallChatMessages] = useState([]);
  const [chatSignal, setChatSignal] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [localShareStream, setLocalShareStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const PlaySound = (event) => {
    // Si une instance audio précédente existe, arrêtez-la
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }

    if (callingRef.current) {
      callingRef.current.pause();
      callingRef.current.load();
    }

    switch (event) {
      case "playRingingSound":
        audioRef.current.play();
        break;
      case "playProgressSound":
        callingRef.current.play();
        break;
      case "playHangupSound":
        audioTune = new Audio("./sounds/HangUp.mp3");
        audioTune.play();
        break;
      case "terminateSound":
        // déjà arrété
        break;
      default:
        // console.log(event);
        break;
    }
  };

  // load user preference from localStorage
  const userPreferences = () => {
    const preferences = storagePrefsGet();
    if (preferences && preferences.audiovolume !== undefined) {
      setAudioVolume(preferences.audioVolume);
    }
    if (preferences && preferences.audioDevice !== undefined) {
      setAudioDevice(preferences.audioDevice);
    }
    if (preferences && preferences.ringtone !== undefined) {
      setRingtone(preferences.ringtone);
    }
    if (preferences && preferences.ringDevice !== undefined) {
      setRingDevice(preferences.ringDevice);
    }
    if (preferences && preferences.ringVolume !== undefined) {
      setRingVolume(preferences.ringVolume);
    }
    if (preferences && preferences.cameraDevice !== undefined) {
      setCameraDevice(preferences.cameraDevice);
    }
    if (preferences && preferences.microDevice !== undefined) {
      setMicroDevice(preferences.microDevice);
    }
    if (preferences && preferences.callsLength !== undefined) {
      setCallLogLength(preferences.callsLength);
    }
  };

  const audioInputDeviceChange = async (e) => {
    Wazo.Phone.phone.changeAudioInputDevice(e.target.value);
  };

  const audioDeviceChange = async (e) => {
    Wazo.Phone.phone.changeAudioDevice(e.target.value);
  };

  const videoInputChange = async (e) => {
    Wazo.Phone.phone.changeVideoInputDevice(e.target.value);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume / 100;
    }
  }, [audioVolume]);

  const switchCall = async (newCallSession) => {
    // vérifier si déjà la callSession
    if (newCallSession.is(callSession)) {
      return;
    }
    unhold(newCallSession);
    // l'enregistré dans callSession
    setCallSession(callSessions[newCallSession.getId()]);
    //  obtenir le flux video
    const localStream = await Wazo.Phone.getLocalVideoStream(callSession);
    setLocalStream(localStream);
    const remoteStream = await Wazo.Phone.getRemoteVideoStream(callSession);
    setRemoteStream(remoteStream);
  };

  const acceptIncomingCall = async (callSession, withVideo) => {
    // hide incomingCall box
    setIncomingCall(false);
    // accept call
    await Wazo.Phone.accept(callSession, withVideo);
    // update callSessions
    setCallSessions((prevCallSessions) => {
      const newCallSessions = { ...prevCallSessions };
      const sessionId = callSession.getId();
      // Parcourez tous les autres objets et mettez leur propriété "pause" à true
      Object.keys(newCallSessions).forEach((key) => {
        if (key !== sessionId) {
          newCallSessions[key].paused = true;
        }
      });

      return {
        ...prevCallSessions,
        [sessionId]: callSession,
      };
    });
  };

  const rejectIncomingCall = (callSession) => {
    // hide incommingCall box
    setIncomingCall(false);
    // reject call
    Wazo.Phone.reject(callSession);
  };

  const call = async (number, video = false) => {
    const callSession = await Wazo.Phone.call(number, video);
    // mettre à jour callSessions
    setCallSessions((prevCallSessions) => {
      const newCallSessions = { ...prevCallSessions };
      const sessionId = callSession.getId();
      // Parcourez tous les autres objets et mettez leur propriété "pause" à true
      Object.keys(newCallSessions).forEach((key) => {
        if (key !== sessionId) {
          newCallSessions[key].paused = true;
        }
      });
      return newCallSessions;
    });
    // mettre à jour callSession
    setCallSession(callSession);
  };

  const hangUpCall = async (callSession) => {
    // vérifier si en conférence
    if (conferenceAdhoc) {
      const isConference = conferenceAdhoc.host.callId === callSession.callId;
      isConference && setConferenceAdhoc(null);
      await Wazo.Phone.hangup(callSession);
    } else {
      await Wazo.Phone.hangup(callSession);
    }
  };

  const unhold = async (callSession) => {
    setCallSessions((prevCallSessions) => {
      const newCallSessions = { ...prevCallSessions };
      const sessionId = callSession.getId();
      newCallSessions[sessionId].paused = false;
      // Parcourez tous les autres objets et mettez leur propriété "pause" à true
      Object.keys(newCallSessions).forEach((key) => {
        if (key !== sessionId) {
          newCallSessions[key].paused = true;
        }
      });

      return newCallSessions;
    });
    await Wazo.Phone.resume(callSession);
  };

  const hold = async (callSession) => {
    setCallSessions((prevCallSessions) => {
      const newCallSessions = { ...prevCallSessions };
      newCallSessions[callSession.getId()].paused = true;
      Object.keys(newCallSessions).forEach((key) => {
        if (key !== callSession.getId()) {
          newCallSessions[key].paused = false;
        }
      });
      return newCallSessions;
    });
    Wazo.Phone.hold(callSession);
  };

  const mute = (callSession) => {
    setCallSession((prevCallSession) => {
        const updatedCallsession = Object.assign(
          Object.create(Object.getPrototypeOf(prevCallSession)),
          prevCallSession,
          {
            ...prevCallSession,
            muted: true,
          }
        );

        // mettre à jour dans l'objet callSessions qui contient tous les appels en cours
        setCallSessions((prevCallSessions) => {
          const updatedCallSessions = { ...prevCallSessions };
          if (typeof updatedCallsession.getId === "function") {
            updatedCallSessions[updatedCallsession.getId()] = updatedCallsession;
          } else {
            //callsession à été détruit lors du merge2calls
          }
          return updatedCallSessions;
        });

        return updatedCallsession;
      });
    Wazo.Phone.mute(callSession);
  };

  const unmute = (callSession) => {
    setCallSession((prevCallSession) => {
        const updatedCallsession = Object.assign(
          Object.create(Object.getPrototypeOf(prevCallSession)),
          prevCallSession,
          {
            ...prevCallSession,
            muted: false,
          }
        );

        // mettre à jour dans l'objet callSessions qui contient tous les appels en cours
        setCallSessions((prevCallSessions) => {
          const updatedCallSessions = { ...prevCallSessions };
          if (typeof updatedCallsession.getId === "function") {
            updatedCallSessions[updatedCallsession.getId()] = updatedCallsession;
          } else {
            //callsession à été détruit lors du merge2calls
          }
          return updatedCallSessions;
        });

        return updatedCallsession;
      });
    Wazo.Phone.unmute(callSession);
  };

  const turnCameraOff = (callSession) => {
    setCallSession((prevCallSession) => {
        const updatedCallsession = Object.assign(
          Object.create(Object.getPrototypeOf(prevCallSession)),
          prevCallSession,
          {
            ...prevCallSession,
            videoMuted: true,
          }
        );

        // mettre à jour dans l'objet callSessions qui contient tous les appels en cours
        setCallSessions((prevCallSessions) => {
          const updatedCallSessions = { ...prevCallSessions };
          if (typeof updatedCallsession.getId === "function") {
            updatedCallSessions[updatedCallsession.getId()] = updatedCallsession;
          } else {
            //callsession à été détruit lors du merge2calls
          }
          return updatedCallSessions;
        });

        return updatedCallsession;
      });
    Wazo.Phone.turnCameraOff(callSession);
  };

  const turnCameraOn = (callSession) => {
    setCallSession((prevCallSession) => {
        const updatedCallsession = Object.assign(
          Object.create(Object.getPrototypeOf(prevCallSession)),
          prevCallSession,
          {
            ...prevCallSession,
            videoMuted: false,
          }
        );

        // mettre à jour dans l'objet callSessions qui contient tous les appels en cours
        setCallSessions((prevCallSessions) => {
          const updatedCallSessions = { ...prevCallSessions };
          if (typeof updatedCallsession.getId === "function") {
            updatedCallSessions[updatedCallsession.getId()] = updatedCallsession;
          } else {
            //callsession à été détruit lors du merge2calls
          }
          return updatedCallSessions;
        });

        return updatedCallsession;
      });
    Wazo.Phone.turnCameraOn(callSession);
  };

  const callToggle = async (callSession, enableVideo) => {
    await Wazo.Phone.reinvite(callSession, { audio: true, video: enableVideo }, false);
    setCallSession((prevCallSession) => {
        const updatedCallsession = Object.assign(
          Object.create(Object.getPrototypeOf(prevCallSession)),
          prevCallSession,
          {
            ...prevCallSession,
            cameraEnabled: enableVideo,
            videoMuted: false,
          }
        );

        // mettre à jour dans l'objet callSessions qui contient tous les appels en cours
        setCallSessions((prevCallSessions) => {
          const updatedCallSessions = { ...prevCallSessions };
          if (typeof updatedCallsession.getId === "function") {
            updatedCallSessions[updatedCallsession.getId()] = updatedCallsession;
          } else {
            //callsession à été détruit lors du merge2calls
          }
          return updatedCallSessions;
        });

        return updatedCallsession;
      });

      if(enableVideo) {
        const localStream = await Wazo.Phone.getLocalVideoStream(callSession);
        setLocalStream(localStream);
        const remoteStream = await Wazo.Phone.getRemoteVideoStream(callSession);
        setRemoteStream(remoteStream);
      }
        
  };

  const addScreenTrack = async (callSession) => {
    const session = Wazo.Phone.phone.currentSipSession;
    const newStream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "always" }, audio: false });
    const videoTracks = newStream.getVideoTracks();
    const pc = session.sessionDescriptionHandler.peerConnection;

    setLocalShareStream(newStream);
    pc.addTrack(videoTracks[0], newStream);

    //await Wazo.Phone.reinvite(callSession, { audio: true, video: true }, false);
    session.sessionDescriptionHandler.peerConnection.getSenders()[1].replaceTrack(videoTracks[0]);
  };

  const startScreenSharing = async (callSession) => {
    await Wazo.Phone.startScreenSharing({ audio: true, video: true }, callSession);
    await addScreenTrack(callSession);
  };

  const stopScreenSharing = async (callSession) => {
    const stop = await Wazo.Phone.stopScreenSharing(callSession);
    setLocalShareStream(null);
    const local = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    setLocalStream(local);
  };

  const fullScreenStart = () => {
    setIsFullScreen(true);
    setShowSidebar(false);
    setToggleChat(false);
    setToggleConference(false);
    setToggleMerge(false);
  };

  const fullScreenStop = () => {
    setIsFullScreen(false);
    setShowSidebar(true);
  };

  const fullScreenToggle = () => {
    isFullScreen ? fullScreenStop() : fullScreenStart();
  };

  const handleToggleChat = () => {
    setToggleMerge(false);
    setToggleConference(false);
    setToggleChat(!toggleChat);
  };

  const handleToggleMerge = () => {
    setToggleChat(false);
    setToggleMerge(!toggleMerge);
  };

  const handleToggleConference = () => {
    setToggleChat(false);
    setToggleConference(!toggleConference);
  };

  const directTransfer = (callSession, target) => {
    Wazo.Phone.transfer(callSession, target);
    setCallSessions((prevCallSessions) => {
      const newCallSessions = { ...prevCallSessions };
      delete newCallSessions[callSession.getId()];
      return newCallSessions;
    });
  };

  const indirectTransfer = (callSession) => {
    const currentAtxfer = Wazo.Phone.atxfer(callSession);
    return currentAtxfer;
  };

  const indirectTransferEnd = () => {
    // hide call box
    setIncomingCall(false);
    // remove callSession
    setCallSessions((prevCallSessions) => {
      const newCallSessions = { ...prevCallSessions };
      delete newCallSessions[callSession.getId()];
      return newCallSessions;
    });
    setCallSession({});
  };

  const callRecordStart = async (callSession) => {
    await Wazo.calld.startRecording(callSession.callId);
    setCallSessions((prevCallSessions) => {
      const newCallSessions = { ...prevCallSessions };
      newCallSessions[callSession.getId()].recording = true;
      return newCallSessions;
    });
  };

  const callRecordPause = async (callSession) => {
    await Wazo.calld.pauseRecording(callSession.callId);
    setCallSessions((prevCallSessions) => {
      const newCallSessions = { ...prevCallSessions };
      newCallSessions[callSession.getId()].recordingPaused = true;
      return newCallSessions;
    });
  };

  const callRecordResume = async (callSession) => {
    await Wazo.calld.resumeRecording(callSession.callId);
    setCallSessions((prevCallSessions) => {
      const newCallSessions = { ...prevCallSessions };
      newCallSessions[callSession.getId()].recordingPaused = false;
      return newCallSessions;
    });
  };

  const callRecordStop = async (callSession) => {
    await Wazo.calld.stopRecording(callSession.callId);
    setCallSessions((prevCallSessions) => {
      const newCallSessions = { ...prevCallSessions };
      newCallSessions[callSession.getId()].recording = false;
      return newCallSessions;
    });
  };

  const sendDTMF = (tone, callSession) => {
    Wazo.Phone.sendDTMF(tone, callSession);
  };

  const sendChat = (message) => {
    setCallChatMessages((prevMessages) => [...prevMessages, message]);
    Wazo.Phone.sendChat(message);
  };

  const sendSignal = (message) => {
    Wazo.Phone.sendSignal(message);
  };

  const conferenceAdhocStart = async (participants) => {
    let adHocConference;
    adHocConference = await Wazo.Phone.startConference(callSession, participants);
    if (adHocConference) {
      setCallSession(adHocConference.host);
      setConferenceAdhoc(adHocConference);
    }
  };

  const conferenceAdhocAddParticipant = async (participants) => {
    participants.map(async (participant) => {
      const updateConference = await conferenceAdhoc.addParticipant(participant);
      setCallSession(updateConference.host);
      setConferenceAdhoc(updateConference);
    });
  };

  const conferenceAdhocRemoveParticipant = async (participant) => {
    const updateConference = await conferenceAdhoc.removeParticipant(participant);
    if(updateConference.finished) {
      // la conférence est terminée
      setConferenceAdhoc(null);
      setCallSession(null);
    } else {
      // mettre à jour la conférence
      setConferenceAdhoc(updateConference);
      setCallSession(updateConference.host);
    }
  };

  return {
    isFullScreen,
    setIsFullScreen,
    toggleChat,
    setToggleChat,
    toggleMerge,
    setToggleMerge,
    toggleConference,
    setToggleConference,
    audioRef,
    audioVolume,
    setAudioVolume,
    audioDevice,
    setAudioDevice,
    ringtone,
    setRingtone,
    ringVolume,
    setRingVolume,
    ringDevice,
    setRingDevice,
    cameraDevice,
    setCameraDevice,
    microDevice,
    setMicroDevice,
    callingRef,
    callTone,
    setCallTone,
    number,
    setNumber,
    incomingCall,
    setIncomingCall,
    callSession,
    setCallSession,
    callSessions,
    setCallSessions,
    callChatMessages,
    setCallChatMessages,
    chatSignal,
    setChatSignal,
    conferenceAdhoc,
    setConferenceAdhoc,
    localStream,
    setLocalStream,
    localShareStream,
    setLocalShareStream,
    remoteStream,
    setRemoteStream,
    PlaySound,
    userPreferences,
    addScreenTrack,
    fullScreenStart,
    fullScreenStop,
    fullScreenToggle,
    handleToggleChat,
    handleToggleMerge,
    handleToggleConference,
    audioDeviceChange,
    videoInputChange,
    audioInputDeviceChange,
    conferenceAdhocStart,
    conferenceAdhocAddParticipant,
    conferenceAdhocRemoveParticipant,
    callRecordStart,
    callRecordPause,
    callRecordResume,
    callRecordStop,
    switchCall,
    call,
    hangUpCall,
    unhold,
    hold,
    mute,
    unmute,
    turnCameraOff,
    turnCameraOn,
    callToggle,
    startScreenSharing,
    stopScreenSharing,
    acceptIncomingCall,
    rejectIncomingCall,
    directTransfer,
    indirectTransfer,
    indirectTransferEnd,
    sendDTMF,
    sendChat,
    sendSignal
  };
};

export default usePhone;