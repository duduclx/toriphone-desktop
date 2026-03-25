import { useContext, createContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "toriphone-auth";

import AppLoader from "../pages/AppLoader";

import useConfig from "./wazo/config";

import useAgent from "./wazo/agent";
import useAgentEvents from "./wazo/agent.events";
import useAppStates from "./wazo/appStates";
import useBlocklist from "./wazo/blocklist";
import useCallLog from "./wazo/callLog";
import useCallLogEvents from "./wazo/callLog.events";
import useCallEvents from "./wazo/call.events";
import useChat from "./wazo/chat";
import useChatEvents from "./wazo/chat.events";
import useConference from "./wazo/conference";
import useConferenceEvents from "./wazo/conference.events";
import useContacts from "./wazo/contacts";
import useContactsEvents from "./wazo/contacts.events";
import useDnd from "./wazo/dnd";
import useServicesEvents from "./wazo/services.events";
import useExternalApps from "./wazo/externalApps";
import useExternalAppsEvents from "./wazo/externalApps.events";
import useFax from "./wazo/fax";
import useFaxEvents from "./wazo/fax.events";
import useForward from "./wazo/forward";
import useForwardEvents from "./wazo/forward.events";
import useFunckeys from "./wazo/funckeys";
import useGroups from "./wazo/groups";
import useGuests from "./wazo/guests";
import useMeeting from "./wazo/meeting";
import useMeetingEvents from "./wazo/meeting.events";
import usePhone from "./wazo/phone";
import usePresences from "./wazo/presences";
import useQueues from "./wazo/queues";
import useUser from "./wazo/user";
import useUserEvents from "./wazo/user.events";
import useUserState from "./wazo/userState";
import useUsers from "./wazo/users";
import useVoicemail from "./wazo/voicemail";
import useVoicemailEvents from "./wazo/voicemail.events";
import useWebhooks from "./wazo/webhooks";

const WazoContext = createContext();

export const useWazo = () => {
  return useContext(WazoContext);
};

export const WazoProvider = ({ children }) => {
  // requirements
  const { t } = useTranslation();

  // useAuth
  const { storagePrefsGet, apiClient, Wazo, user, setUser, userLogout, setAuthErrorMessage } = useAuth();

  // config
  const {
    configWeb,
    setConfigWeb,
    configWebGet,
    configSubscription,
    setConfigSubscription,
    configSubscriptionGet,
    configMeetingCalendar,
    setConfigMeetingCalendar,
    configMeetingCalendarGet,
    configMeetingCalendarUpdate
  } = useConfig({ apiClient });

  // appStates
  const {
    appIsLoading,
    setAppIsLoading,
    appCurrentPage,
    setAppCurrentPage,
    appCurrentPageRef,
    appContactsComponent,
    setAppContactsComponent,
    appUserComponent,
    setAppUserComponent,
    showSidebar,
    setShowSidebar,
    appLarge,
    appItemsPerPage,
    setAppItemsPerPage,
  } = useAppStates();

  // blocklist
  const {
    blocklists,
    setBlocklists,
    blocklist,
    setBlocklist,
    blocklistsGet,
    blocklistsPageGet,
    blocklistGet,
    blocklistAdd,
    blocklistUpdate,
    blocklistDelete,
  } = useBlocklist({ Wazo, apiClient });

  // call Log
  const {
    callLog,
    setCallLog,
    callLogLength,
    setCallLogLength,
    callLogFiltered,
    setCallLogFiltered,
    callLogBadge,
    setCallLogBadge,
    callLogRecord,
    setCallLogRecord,
    callLogGet,
    callLogFromDateGet,
    callLogDistinctGet,
    callLogSearch,
    callLogSearchBy,
    callLogRecordGet,
    callLogRecordDelete,
    callLogBadgeReset,
    callLogFilterReset,
  } = useCallLog({ storagePrefsGet, Wazo, apiClient });

  // call Log Events
  const { onCallLogUserCreated } = useCallLogEvents({ user, setCallLog, setCallLogBadge });

  // presences
  const {
    dirdDefaultSourceGet,
    usersPresence,
    setUsersPresence,
    usersPresenceRef,
    processedUsersPresence,
    setProcessedUsersPresence,
    usersPresenceGet,
    searchUsers,
  } = usePresences({ user, Wazo });

  // user State
  const {
    userState,
    setUserState,
    userStateGet,
    userStateUpdate,
    userStatusUpdate
  } = useUserState({
    user,
    setUser,
    Wazo,
  });

  // users
  const { 
    userGetByUuid,
    userSearch
  } = useUsers({ apiClient });

  // user
  const {
    userCallerIds,
    setUserCallerIds,
    userCallerId,
    setUserCallerId,
    userOutgoingCallerId,
    setUserOutgoingCallerId,
    userOutgoingCallerIdsGet,
    userOutgoingCallerIdGet,
    userOutgoingCallerIdUpdate,
  } = useUser({ user, apiClient });

  // chat
  const {
    chatRooms,
    setChatRooms,
    chatRoom,
    setChatRoom,
    chatRoomLastMessages,
    setChatRoomLastMessages,
    chatRoomsWithLastMessage,
    setChatRoomsWithLastMessage,
    chatMessages,
    setChatMessages,
    chatMessageUnread,
    setChatMessageUnread,
    chatRoomRef,
    chatMessagesRef,
    chatRoomCreate,
    chatRoomsGet,
    chatRoomLabelGet,
    chatRoomMessagesGet,
    chatRoomMessageLastGet,
    chatRoomsWithLastMessageGet,
    chatRoomsSortByDate,
    chatRoomMessageSend,
    chatRoomUserSearch,
    chatRoomsGetFull,
  } = useChat({
    usersPresence,
    usersPresenceGet,
    processedUsersPresence,
    setProcessedUsersPresence,
    user,
    Wazo,
  });

  // chat events
  const { onChatPresenceUpdated, onChatUserRoomCreated, onChatUserRoomMessageCreated } = useChatEvents({
    user,
    usersPresenceRef,
    setUsersPresence,
    chatRoomRef,
    chatMessagesRef,
    setChatMessages,
    setChatMessageUnread,
    setChatRoomsWithLastMessage,
    chatRoomsSortByDate,
    appCurrentPageRef,
    chatRoomsGetFull,
  });

  // conference
  const { 
    conferences,
    setConferences,
    conference,
    setConference,
    conferenceRoom,
    setConferenceRoom,
    conferencesGet,
    conferenceGet,
    conferenceAdd,
    conferenceUpdate,
    conferenceDelete,
    conferenceAssociateExtension,
    conferenceDissociateExtension,
    conferenceParticipantsGet,
    conferenceParticipantKick,
    conferenceParticipantMute,
    conferenceParticipantUnmute,
    conferenceRecordStart,
    conferenceRecordStop
   } = useConference({ apiClient });

  // conference events
  const {
    onConferenceParticipantJoined,
    onConferenceParticipantLeft,
    onConferenceParticipantMuted,
    onConferenceParticipantUnmuted,
    onConferenceParticipantTalkStarted,
    onConferenceParticipantTalkStopped,
    onConferenceRecordStarted,
    onConferenceRecordStopped,
    onConferenceUserParticipantJoined,
    onConferenceUserParticipantLeft,
    onConferenceUserParticipantTalkStarted,
    onConferenceUserParticipantTalkStopped,
  } = useConferenceEvents();

  // contacts
  const {
    contactsFavorites,
    setContactsFavorites,
    contactsFavoritesGet,
    contactsFavoritesAdd,
    contactsFavoritesRemove,
    contactsGoogle,
    contactsGoogleGet,
    contactsInternal,
    setContactsInternal,
    contactsInternalGet,
    contactsOffice,
    contactsOfficeGet,
    contactsPhonebook,
    contactsPhonebooksGet,
    contactsLdap,
    contactsLdapGet,
    contactsPersonal,
    contactsPersonalGet,
    contactsPersonalAdd,
    contactsPersonalEdit,
    contactsPersonalRemove,
  } = useContacts({ usersPresenceGet, processedUsersPresence, Wazo, apiClient });

  // contacts Events
  const { onContactsFavoriteAdded, onContactsFavoriteDeleted } = useContactsEvents({ contactsPersonal });

  // dnd (services)
  const { doNotDisturbToggle } = useDnd({ Wazo });

  // services events
  const { onUserServicesDndUpdated } = useServicesEvents({ setUser });

  // externalApps
  const {
    externalApps,
    setExternalApps,
    externalApp,
    setExternalApp,
    externalAppsUser,
    setExternalAppsUser,
    externalAppUser,
    setExternalAppUser,
    externalAppsGet,
    externalAppGet,
    externalAppUpdate,
    externalAppsUserGet,
    externalAppsUserPageGet,
    externalAppUserGet,
    externalAppUserCreate,
    externalAppUserUpdate,
    externalAppUserDelete
  } = useExternalApps({ user, apiClient, Wazo });

  // external Apps Events
  const {
    OnExternalAppCreated,
    OnExternalAppDeleted,
    OnExternalAppEdited,
    OnUserExternalAppCreated,
    OnUserExternalAppDeleted,
    OnUserExternalAppEdited,
  } = useExternalAppsEvents({ setConfigSubscription, configSubscriptionGet, setConfigMeetingCalendar, configMeetingCalendarGet });

  // fax
  const { faxSend } = useFax({ Wazo });

  // fax events
  const {
    onFaxOutboundCreated,
    onFaxOutboundFailed,
    onFaxOutboundSucceeded,
    onFaxOutboundUserCreated,
    onFaxOutboundUserFailed,
    onFaxOutboundUserSucceeded,
  } = useFaxEvents();

  // forward
  const { forwardsUpdate } = useForward({ user, Wazo });

  // forward events
  const { 
    onUsersForwardsBusyUpdated,
    onUsersForwardsNoanswerUpdated,
    onUsersForwardsUnconditionalUpdated
  } = useForwardEvents();

  // funckeys
  const {
    funckeys,
    setFunckeys,
    funckey,
    setFunckey,
    funckeysGet, 
    funckeysUpdate, 
    funckeyGet, 
    funckeyUpdate, 
    funckeyDelete
  } = useFunckeys({ user, apiClient });

  // groups
  const {
    groups,
    setGroups,
    groupsGet,
  } = useGroups({ apiClient });

  // phone
  const {
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
    sendSignal,
  } = usePhone({ setShowSidebar, setCallLogLength });

  // meeting
  const {
    meetings,
    setMeetings,
    meeting,
    setMeeting,
    meetingRoom,
    setMeetingRoom,
    meetingNotification,
    setMeetingNotification,
    meetingRoute,
    setMeetingRoute,
    meetingChatMessages,
    setMeetingChatMessages,
    meetingViewMode,
    setMeetingViewMode,
    meetingHideMe,
    setMeetingHideMe,
    meetingSidebarContent,
    setMeetingSidebarContent,
    meetingsGet,
    meetingGet,
    meetingCreate,
    meetingUpdate,
    meetingDelete,
    meetingConnect,
    meetingDisconnect,
    meetingParticipantsGet,
    meetingParticipantKick,
    meetingStatusGet,
    meetingAuthorizationsGet,
    meetingAuthorizationGet,
    meetingAuthorizationAccept,
    meetingAuthorizationReject,
    meetingAuthorizationDelete
  } = useMeeting({ Wazo, apiClient });

  // guests
  const {
    guestMeetingGet,
    guestMeetingAuthorizationRequest,
    guestMeetingAuthorizationGet,
    guestMeetingConnect
  } = useGuests({ Wazo, setMeetingRoom });

  // meeting events
  const {
    onMeetingParticipantJoined,
    onMeetingParticipantLeft,
    onMeetingUserParticipantJoined,
    onMeetingUserParticipantLeft,
    onMeetingCreated,
    onMeetingDeleted,
    onMeetingProgress,
    onMeetingUpdated,
    onMeetingGuestAuthorizationCreated,
    onMeetingGuestAuthorizationDeleted,
    onMeetingGuestAuthorizationUpdated,
    onMeetingUserGuestAuthorizationCreated,
    onMeetingUserGuestAuthorizationDeleted,
    onMeetingUserGuestAuthorizationUpdated,
    onMeetingUserProgress
  } = useMeetingEvents({ setMeetings, setMeeting, setMeetingNotification });

  // voicemail
  const {
    voicemailUser,
    setVoicemailUser,
    voicemails,
    setVoicemails,
    voicemailsFolder,
    setVoicemailsFolder,
    voicemailsUnread,
    setVoicemailsUnread,
    voicemailGreetingUnavailable,
    setVoicemailGreetingUnavailable,
    voicemailGreetingBusy,
    setVoicemailGreetingBusy,
    voicemailGreetingName,
    setVoicemailGreetingName,
    voicemailUserGet,
    voicemailUserEdit,
    voicemailsGet,
    voicemailUrlGet,
    voicemailDelete,
    voicemailFolderGet,
    voicemailFolderUpdate,
    voicemailGreetingsGet,
    voicemailGreetingGet,
    voicemailGreetingsAdd,
    voicemailGreetingDelete,
    voicemailGreetingCopy,
  } = useVoicemail({ user, Wazo, apiClient });

  // voicemail events
  const {
    onUserVoicemailMessageCreated,
    onUserVoicemailMessageDeleted,
    onUserVoicemailMessageUpdated,
    onUserVoicemailAssociated,
    onUserVoicemailDissociated,
    onUserVoicemailEdited,
  } = useVoicemailEvents({ setVoicemails, voicemailUrlGet, voicemailsGet });

  // user events
  const {
    onUserCallpermissionAssociated,
    onUserCallpermissionDissociated,
    onUserCreated,
    onUserDeleted,
    onUserEdited,
    onUserExternalappCreated,
    onUserExternalappDeleted,
    onUserExternalappEdited,
    onUserFallbackEdited,
    onUserGroupsAssociated,
    onUserLineAssociated,
    onUserLineDissociated,
    onUserLineExtensionCreated,
    onUserLineExtensionDeleted,
    onUserLineExtensionEdited,
    onUserScheduleAssociated,
    onUserScheduleDissociated,
    onUserAuthSessionDeleted
  } = useUserEvents({ contactsInternalGet, contactsFavoritesGet });

  // agent
  const {
    switchboards,
    setSwitchboards,
    agentGetStatus,
    agentLogin,
    agentLogout,
    agentPause,
    agentResume,
    switchboardsCallsGet,
    switchboardCallsQueuedGet,
    switchboardCallsHeldGet,
    switchboardCallAnswer,
    switchboardCallPause,
    switchboardCallResume,
  } = useAgent({ Wazo, setCallSession, setCallSessions });

  // agent events
  const {
    onAgentStatusUpdate,
    onAgentPaused,
    onAgentUnpaused,
    onAgentAssociated,
    onAgentDissociated,
    onSwitchBoardHeldCallAnswered,
    onSwitchboardHeldCallsUpdated,
    onSwitchBoardQueuedCallAnswered,
    onSwitchboardQueuedCallsUpdated,
    onUserAgentAssociated,
    onUserAgentDissociated,
    onSwitchboardCreated,
    onSwitchboardDeleted,
    onSwitchboardEdited,
    onSwitchboardFallbackEdited,
    onSwitchboardMemberUserAssociated
  } = useAgentEvents({ setSwitchboards, callSession, setCallSession, setCallSessions, Wazo });

  // webhooks
  const {
    webhooksUser,
    setWebhooksUser,
    webhookUser,
    setWebhookUser,
    webhooksUserGet,
    webhookUserGet,
    webhookUserAdd,
    webhookUserDelete,
    webhookUserEdit,
    webhookUserLogGet
  } = useWebhooks({ apiClient });

  // queues
  const {
    queues,
    setQueues,
    queuesGet
  } = useQueues({ apiClient });

  // call events
  const {
    onCallAccepted,
    onCallAnswered,
    onCallCanceled,
    onCallCreated,
    onCallUpdated,
    onCallEnded,
    onCallRejected,
    onCallDtmfCreated,
    onCallIncoming,
    onCallOutgoing,
    onCallHeld,
    onCallResumed,
    onCallMuted,
    onCallUnmuted,
    onCallCameraDisabled,
    onCallCameraResumed,
    onCallChat,
    onCallSignal,
    onCallShareScreenStarted,
    onCallShareScreenEnded,
    onCallUserMissedCall,
    onCallRecordingPaused,
    onCallRecordingResumed,
    onCallRecordingStarted,
    onCallRecordingStopped,
    onCallTransferAbandoned,
    onCallTransferAnswered,
    onCallTransferCanceled,
    onCallTransferCompleted,
    onCallTransferCreated,
    onCallTransferEnded,
    onCallTransferUpdated,
    onCallParked,
    onCallUnparked,
    onCallParkedCallHungup,
    onCallParkedCallTimeout,
    onCallPushNotification,
    onCallCancelPushNotification,
    onCallRelocateAnswered,
    onCallRelocateCompleted,
    onCallRelocateEnded,
    onCallRelocateInitiated,
    onConferenceAdhocCreated,
    onConferenceAdhocDeleted,
    onConferenceAdhocParticipantJoined,
    onConferenceAdhocParticipantLeft,
    onReinvite,
    onVideoStream,
    onVideoInputChange
  } = useCallEvents({
    Wazo,
    user,
    localStream,
    setLocalStream,
    setRemoteStream,
    setIncomingCall,
    setIsFullScreen,
    setShowSidebar,
    setToggleChat,
    setToggleConference,
    setToggleMerge,
    callLogGet,
    setCallChatMessages,
    setChatSignal,
    turnCameraOff,
    callSession,
    setCallSession,
    callSessions,
    setCallSessions,
    conferenceAdhoc,
    setConferenceAdhoc,
    callingRef,
    acceptIncomingCall,
    switchboards
  });

  // initialise webrtc
  const initializeWebRtc = async () => {
    // look for stun configuration in config
    const configWebStun = await configWebGet();

    if (configWebStun.configuration.stun_web_hostname) {
      await Wazo.Phone.connect({
        media: {
          audio: true,
          video: true,
        },
        uaConfigOverrides: {
          peerConnectionOptions: {
            iceServers: [
              { urls: "stun:" + configWebStun.configuration.stun_web_hostname + ":" + configWebStun.configuration.stun_web_port },
            ],
          },
        },
      });
    } else {
      await Wazo.Phone.connect({ audio: true, video: true });
      /*
      await Wazo.Phone.connect({
        media: {
          audio: true,
          video: true,
        },
        uaConfigOverrides: {
          peerConnectionOptions: {
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
            ],
          },
        },
      });
      */
    }

    // phone
    Wazo.Phone.on(Wazo.Phone.ON_CALL_INCOMING, onCallIncoming);
    Wazo.Phone.on(Wazo.Phone.ON_CALL_OUTGOING, onCallOutgoing);
    Wazo.Phone.on(Wazo.Phone.ON_CALL_ACCEPTED, onCallAccepted);
    //Wazo.Phone.on(Wazo.Phone.ON_CALL_ANSWERED, (data) => onCallAnswered(data));
    Wazo.Phone.on(Wazo.Phone.ON_CALL_CANCELED, onCallCanceled);
    //Wazo.Phone.on("call_created", (data) => onCallCreated(data));
    Wazo.Phone.on(Wazo.Phone.ON_CALL_ENDED, (data) => onCallEnded(data));
    //Wazo.Phone.on("call_updated", (data) => onCallUpdated(data));
    Wazo.Phone.on(Wazo.Phone.ON_CALL_REJECTED, (data) => onCallRejected(data));

    // calls sessions
    Wazo.Websocket.on("call_created", (data) => onCallCreated(data));
    Wazo.Websocket.on("call_updated", (data) => onCallUpdated(data));
    Wazo.Websocket.on("call_answered", (data) => onCallAnswered(data));

    Wazo.Phone.on(Wazo.Phone.ON_CALL_HELD, (data) => onCallHeld(data));
    Wazo.Phone.on(Wazo.Phone.ON_CALL_RESUMED, (data) => onCallResumed(data));
    Wazo.Phone.on(Wazo.Phone.ON_CALL_MUTED, (data) => onCallMuted(data));
    Wazo.Phone.on(Wazo.Phone.ON_CALL_UNMUTED, (data) => onCallUnmuted(data));

    Wazo.Phone.on(Wazo.Phone.ON_CAMERA_DISABLED, (data) => onCallCameraDisabled(data));
    Wazo.Phone.on(Wazo.Phone.ON_CAMERA_RESUMED, (data) => onCallCameraResumed(data));

    Wazo.Phone.on(Wazo.Phone.ON_SHARE_SCREEN_STARTED, (data) => onCallShareScreenStarted(data));
    Wazo.Phone.on(Wazo.Phone.ON_SHARE_SCREEN_ENDED, (data) => onCallShareScreenEnded(data));
    //Wazo.Phone.on(Wazo.Phone.ON_VIDEO_INPUT_CHANGE, (data) => onVideoInputChange(data)); // call A FAIRE
    //Wazo.Phone.on(Wazo.Phone.ON_VIDEO_STREAM, (data) => onVideoStream(data)); // call A FAIRE
    Wazo.Phone.on(Wazo.Phone.ON_REINVITE, (data) => onReinvite(data)); // call A FAIRE
    //Wazo.Phone.on("call_parked", (data) => test(data));
    //Wazo.Phone.on("call_unparked", (data) => test(data));

    // conference adhoc
    Wazo.Websocket.on("conference_adhoc_created", (data) => onConferenceAdhocCreated(data)); // pas d'event
    Wazo.Websocket.on("conference_adhoc_deleted", (data) => onConferenceAdhocDeleted(data));
    Wazo.Websocket.on("conference_adhoc_participant_joined", (data) => onConferenceAdhocParticipantJoined(data)); // pas d'event
    Wazo.Websocket.on("conference_adhoc_participant_left", (data) => onConferenceAdhocParticipantLeft(data));

    // phone chat events
    Wazo.Phone.on(Wazo.Phone.ON_CHAT, (data) => onCallChat(data));
    Wazo.Phone.on(Wazo.Phone.ON_SIGNAL, (data) => onCallSignal(data));

    // Sound handling
    const soundEvents = [
      Wazo.Phone.ON_TERMINATE_SOUND,
      Wazo.Phone.ON_PLAY_RING_SOUND,
      Wazo.Phone.ON_PLAY_INBOUND_CALL_SIGNAL_SOUND,
      //Wazo.Phone.ON_PLAY_HANGUP_SOUND,
      Wazo.Phone.ON_PLAY_PROGRESS_SOUND,
    ];
    soundEvents.forEach((event) => Wazo.Phone.on(event, () => PlaySound(event)));

    // call log
    Wazo.Websocket.on("call_log_user_created", (data) => onCallLogUserCreated(data));

    // chatd
    Wazo.Websocket.on("chatd_user_room_message_created", (data) => onChatUserRoomMessageCreated(data));
    Wazo.Websocket.on("chatd_user_room_created", onChatUserRoomCreated);

    // contacts
    Wazo.Websocket.on("favorite_added", onContactsFavoriteAdded);
    Wazo.Websocket.on("favorite_deleted", onContactsFavoriteDeleted);

    // status
    Wazo.Websocket.on("chatd_presence_updated", (data) => onChatPresenceUpdated(data));

    // voicemail
    Wazo.Websocket.on("user_voicemail_message_created", (data) => onUserVoicemailMessageCreated(data));
    //Wazo.Websocket.on("user_voicemail_message_deleted", (data) => onUserVoicemailMessageDeleted(data));
    //Wazo.Websocket.on("user_voicemail_message_updated", (data) => onUserVoicemailMessageUpdated(data));
    Wazo.Websocket.on("user_voicemail_associated", (data) => onUserVoicemailAssociated(data));
    Wazo.Websocket.on("user_voicemail_dissociated", (data) => onUserVoicemailDissociated(data));
    Wazo.Websocket.on("user_voicemail_edited", (data) => onUserVoicemailEdited(data));

    // services
    Wazo.Websocket.on("users_services_dnd_updated", (data) => onUserServicesDndUpdated(data));

    // agent

    // switchboard
    Wazo.Websocket.on("switchboard_held_call_answered", (data) => onSwitchBoardHeldCallAnswered(data));
    Wazo.Websocket.on("switchboard_held_calls_updated", (data) => onSwitchboardHeldCallsUpdated(data));
    Wazo.Websocket.on("switchboard_queued_call_answered", (data) => onSwitchBoardQueuedCallAnswered(data));
    Wazo.Websocket.on("switchboard_queued_calls_updated", (data) => onSwitchboardQueuedCallsUpdated(data));
    Wazo.Websocket.on("switchboard_created", (data) => onSwitchboardCreated(data));
    Wazo.Websocket.on("switchboard_deleted", (data) => onSwitchboardDeleted(data));
    Wazo.Websocket.on("switchboard_edited", (data) => onSwitchboardEdited(data));
    Wazo.Websocket.on("switchboard_fallback_edited", (data) => onSwitchboardFallbackEdited(data));
    Wazo.Websocket.on("switchboard_member_user_associated", (data) => onSwitchboardMemberUserAssociated(data));

    // user
    Wazo.Websocket.ws.on("user_created", (data) => onUserCreated(data));
    Wazo.Websocket.ws.on("user_deleted", (data) => onUserDeleted(data));
    Wazo.Websocket.ws.on("user_edited", (data) => onUserEdited(data));
    //Wazo.Websocket.on("auth_session_deleted", (data) => onUserAuthSessionDeleted(data)); ne match pas et n'interdit pas l'appel

    // external app
    Wazo.Websocket.ws.on("external_app_created", (data) => OnExternalAppCreated(data));
    Wazo.Websocket.ws.on("external_app_deleted", (data) => OnExternalAppDeleted(data));
    Wazo.Websocket.ws.on("external_app_edited", (data) => OnExternalAppEdited(data));

    // user external app
    Wazo.Websocket.on("user_external_app_created", (data) => OnUserExternalAppCreated(data));
    Wazo.Websocket.on("user_external_app_deleted", (data) => OnUserExternalAppDeleted(data));
    Wazo.Websocket.on("user_external_app_edited", (data) => OnUserExternalAppEdited(data));

    // meeting guest
    Wazo.Websocket.on("meeting_guest_authorization_created", (data) => onMeetingGuestAuthorizationCreated(data));
    Wazo.Websocket.on("meeting_guest_authorization_deleted", (data) => onMeetingGuestAuthorizationDeleted(data));
    Wazo.Websocket.on("meeting_guest_authorization_updated", (data) => onMeetingGuestAuthorizationUpdated(data));

    // meeting user
    Wazo.Websocket.on("meeting_user_guest_authorization_created", (data) => onMeetingUserGuestAuthorizationCreated(data));
    Wazo.Websocket.on("meeting_user_guest_authorization_deleted", (data) => onMeetingUserGuestAuthorizationDeleted(data));
    Wazo.Websocket.on("meeting_user_guest_authorization_updated", (data) => onMeetingUserGuestAuthorizationUpdated(data));
    Wazo.Websocket.on("meeting_user_progress", (data) => onMeetingUserProgress(data));

  };

  /**
   * provider
   */
  const value = {
    appCurrentPage,
    setAppCurrentPage,
    appContactsComponent,
    setAppContactsComponent,
    appUserComponent,
    setAppUserComponent,
    showSidebar,
    setShowSidebar,
    appLarge,
    appItemsPerPage,
    setAppItemsPerPage,
    isFullScreen,
    setIsFullScreen,
    fullScreenToggle,
    toggleChat,
    setToggleChat,
    handleToggleChat,
    toggleMerge,
    handleToggleMerge,
    handleToggleConference,
    toggleConference,
    setToggleConference,
    doNotDisturbToggle,
    usersPresence,
    setUsersPresence,
    processedUsersPresence,
    setProcessedUsersPresence,
    usersPresenceGet,
    searchUsers,
    forwardsUpdate,
    funckeys,
    setFunckeys,
    funckey,
    setFunckey,
    funckeysGet, 
    funckeysUpdate, 
    funckeyGet, 
    funckeyUpdate, 
    funckeyDelete,
    blocklists,
    setBlocklists,
    blocklist,
    setBlocklist,
    blocklistsGet,
    blocklistsPageGet,
    blocklistGet,
    blocklistAdd,
    blocklistUpdate,
    blocklistDelete,
    configWeb,
    setConfigWeb,
    configWebGet,
    configSubscription,
    setConfigSubscription,
    configSubscriptionGet,
    configMeetingCalendar,
    setConfigMeetingCalendar,
    configMeetingCalendarGet,
    configMeetingCalendarUpdate,
    contactsFavorites,
    contactsFavoritesGet,
    contactsFavoritesAdd,
    contactsFavoritesRemove,
    contactsGoogle,
    contactsInternal,
    contactsOffice,
    contactsPhonebook,
    contactsLdap,
    contactsLdapGet,
    contactsPersonal,
    contactsPersonalGet,
    contactsPersonalAdd,
    contactsPersonalEdit,
    contactsPersonalRemove,
    callLog,
    setCallLog,
    callLogLength,
    setCallLogLength,
    callLogFiltered,
    setCallLogFiltered,
    callLogBadge,
    setCallLogBadge,
    callLogRecord,
    setCallLogRecord,
    callLogGet,
    callLogFromDateGet,
    callLogDistinctGet,
    callLogSearch,
    callLogSearchBy,
    callLogRecordGet,
    callLogRecordDelete,
    callLogBadgeReset,
    callLogFilterReset,
    externalApps,
    setExternalApps,
    externalApp,
    setExternalApp,
    externalAppsUser,
    setExternalAppsUser,
    externalAppUser,
    setExternalAppUser,
    externalAppsGet,
    externalAppGet,
    externalAppUpdate,
    externalAppsUserGet,
    externalAppsUserPageGet,
    externalAppUserGet,
    externalAppUserCreate,
    externalAppUserUpdate,
    externalAppUserDelete,
    faxSend,
    audioVolume,
    setAudioVolume,
    audioDevice,
    setAudioDevice,
    audioDeviceChange,
    audioRef,
    ringtone,
    setRingtone,
    ringVolume,
    setRingVolume,
    ringDevice,
    setRingDevice,
    cameraDevice,
    setCameraDevice,
    videoInputChange,
    microDevice,
    setMicroDevice,
    audioInputDeviceChange,
    callingRef,
    callTone,
    incomingCall,
    callSession,
    setCallSession,
    callSessions,
    setCallSessions,
    conferenceAdhoc,
    setConferenceAdhoc,
    conferenceAdhocStart,
    conferenceAdhocAddParticipant,
    conferenceAdhocRemoveParticipant,
    callRecordStart,
    callRecordPause,
    callRecordResume,
    callRecordStop,
    userState,
    setUserState,
    userStateGet,
    userStateUpdate,
    userStatusUpdate,
    userGetByUuid,
    userSearch,
    userCallerIds,
    setUserCallerIds,
    userCallerId,
    setUserCallerId,
    userOutgoingCallerId,
    setUserOutgoingCallerId,
    userOutgoingCallerIdsGet,
    userOutgoingCallerIdGet,
    userOutgoingCallerIdUpdate,
    voicemailUser,
    setVoicemailUser,
    voicemails,
    setVoicemails,
    voicemailsFolder,
    setVoicemailsFolder,
    voicemailsUnread,
    setVoicemailsUnread,
    voicemailGreetingUnavailable,
    setVoicemailGreetingUnavailable,
    voicemailGreetingBusy,
    setVoicemailGreetingBusy,
    voicemailGreetingName,
    setVoicemailGreetingName,
    voicemailUserGet,
    voicemailUserEdit,
    voicemailDelete,
    voicemailFolderGet,
    voicemailFolderUpdate,
    voicemailGreetingsGet,
    voicemailGreetingGet,
    voicemailGreetingsAdd,
    voicemailGreetingDelete,
    voicemailGreetingCopy,
    number,
    setNumber,
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
    onCallEnded,
    directTransfer,
    indirectTransfer,
    indirectTransferEnd,
    sendDTMF,
    sendChat,
    callChatMessages,
    setCallChatMessages,
    chatSignal,
    setChatSignal,
    sendSignal,
    localStream,
    localShareStream,
    remoteStream,
    chatRooms,
    chatRoomLastMessages,
    chatRoomsWithLastMessage,
    chatRoom,
    setChatRoom,
    chatRoomMessageSend,
    chatRoomUserSearch,
    chatRoomCreate,
    chatMessages,
    chatRoomMessagesGet,
    chatRoomLabelGet,
    chatMessageUnread,
    setChatMessageUnread,
    guestMeetingGet,
    guestMeetingAuthorizationRequest,
    guestMeetingAuthorizationGet,
    guestMeetingConnect,
    meetings,
    setMeetings,
    meeting,
    setMeeting,
    meetingRoom,
    setMeetingRoom,
    meetingNotification,
    setMeetingNotification,
    meetingRoute,
    setMeetingRoute,
    meetingChatMessages,
    setMeetingChatMessages,
    meetingViewMode,
    setMeetingViewMode,
    meetingHideMe,
    setMeetingHideMe,
    meetingSidebarContent,
    setMeetingSidebarContent,
    meetingsGet,
    meetingGet,
    meetingCreate,
    meetingUpdate,
    meetingDelete,
    meetingConnect,
    meetingDisconnect,
    meetingParticipantsGet,
    meetingParticipantKick,
    meetingStatusGet,
    meetingAuthorizationsGet,
    meetingAuthorizationGet,
    meetingAuthorizationAccept,
    meetingAuthorizationReject,
    meetingAuthorizationDelete,
    onMeetingUserGuestAuthorizationCreated,
    onMeetingUserGuestAuthorizationDeleted,
    onMeetingUserGuestAuthorizationUpdated,
    onMeetingUserProgress,
    conferences, // funckeys requirements
    setConferences, // funckeys requirements
    conference,
    setConference,
    conferenceRoom,
    setConferenceRoom,
    conferencesGet, // funckeys requirements
    conferenceGet,
    conferenceAdd,
    conferenceUpdate,
    conferenceDelete,
    conferenceAssociateExtension,
    conferenceDissociateExtension,
    conferenceParticipantsGet,
    conferenceParticipantKick,
    conferenceParticipantMute,
    conferenceParticipantUnmute,
    conferenceRecordStart,
    conferenceRecordStop,
    switchboards,
    setSwitchboards,
    agentGetStatus,
    agentLogin,
    agentLogout,
    agentPause,
    agentResume,
    switchboardsCallsGet,
    switchboardCallsQueuedGet,
    switchboardCallsHeldGet,
    switchboardCallAnswer,
    switchboardCallPause,
    switchboardCallResume,
    webhooksUser,
    setWebhooksUser,
    webhookUser,
    setWebhookUser,
    webhooksUserGet,
    webhookUserGet,
    webhookUserAdd,
    webhookUserDelete,
    webhookUserEdit,
    webhookUserLogGet,
    // funckeys requirements
    groups,
    setGroups,
    groupsGet,
    queues,
    setQueues,
    queuesGet,
  };

  useEffect(() => {

    const forceLogout = async () => {
      await userLogout(user.token);
    }

    const fetchData = async () => {
      // config subscription
      const subscription = await configSubscriptionGet();

      if(subscription.configuration.subscription && user.profile.subscriptionType == 0) {
      forceLogout();
      setAuthErrorMessage(t("login.subscription"));
      return;
      }

      // config meetingCalendar
      await configMeetingCalendarGet();

      // init listeners
      initializeWebRtc();

      // get app state
      await dirdDefaultSourceGet();
      await userStateGet();
      await contactsFavoritesGet();
      await contactsPhonebooksGet();
      await contactsPersonalGet();
      await contactsInternalGet();
      await contactsOfficeGet();
      await contactsGoogleGet();
      // await contactsLdapGet();

      await userOutgoingCallerIdGet();

      // ChatRooms
      await chatRoomsGetFull();

      // voicemails
      await voicemailsGet();

      // load preferences
      userPreferences();

      // meetings
      await meetingsGet();

      // utiliser dans funckeys
      /*
      await conferencesGet();
      await groupsGet(); 
      await queuesGet();
      */

      // externalApps
      await externalAppsGet();

      // initialize switchboards
      if (user.profile.switchboards.length > 0) {
        const updatedSwitchboards = user.profile.switchboards.map((sb) => {
          const { links, ...rest } = sb;
          return { ...rest, queued: [], hold: [] };
        });
        //setSwitchboards(updatedSwitchboards);
        await switchboardsCallsGet(updatedSwitchboards);
      }

      // end loading screen
      setAppIsLoading(false);
    };
    // si user existe
    if(user) {
      fetchData();
    } else {
      setAppIsLoading(false);
    }
  }, []);

  // raccrocher les appels lors de la fermeture
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      userLogout();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (appIsLoading) {
    return <AppLoader />;
  }

  return <WazoContext.Provider value={value}>{children}</WazoContext.Provider>;
};
