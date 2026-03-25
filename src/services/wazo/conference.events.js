const useConferenceEvents = () => {

    // conference_participant_joined
    const onConferenceParticipantJoined = (data) => {
        console.log('conference_participant_joined', data)
    }

    // conference_participant_left
    const onConferenceParticipantLeft = (data) => {
        console.log('conference_participant_left', data)
    }

    // conference_participant_muted
    const onConferenceParticipantMuted = (data) => {
        console.log('conference_participant_muted', data)
    }

    // conference_participant_unmuted
    const onConferenceParticipantUnmuted = (data) => {
        console.log('conference_participant_unmuted', data)
    }

    // conference_participant_talk_started
    const onConferenceParticipantTalkStarted = (data) => {
        console.log('conference_participant_talk_started', data)
    }

    // conference_participant_talk_stopped
    const onConferenceParticipantTalkStopped = (data) => {
        console.log('conference_participant_talk_stopped', data)
    }

    // conference_record_started
    const onConferenceRecordStarted = (data) => {
        console.log('conference_record_started', data)
    }

    // conference_record_stopped
    const onConferenceRecordStopped = (data) => {
        console.log('conference_record_stopped', data)
    }

    // conference_user_participant_joined
    const onConferenceUserParticipantJoined = (data) => {
        console.log('conference_user_participant_joined', data)
    }

    // conference_user_participant_left
    const onConferenceUserParticipantLeft = (data) => {
        console.log('conference_user_participant_left', data)
    }

    // conference_user_participant_talk_started
    const onConferenceUserParticipantTalkStarted = (data) => {
        console.log('conference_user_participant_talk_started', data)
    }

    // conference_user_participant_talk_stopped
    const onConferenceUserParticipantTalkStopped = (data) => {
        console.log('conference_user_participant_talk_stopped', data)
    }


  return {
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
    onConferenceUserParticipantTalkStopped
  }
}

export default useConferenceEvents
