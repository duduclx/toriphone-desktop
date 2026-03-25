const useMeetingEvents = ({ setMeetings, setMeeting, setMeetingNotification }) => {

    // meeting_participant_joined - calld
    const onMeetingParticipantJoined = (data) => {
        console.log('meeting_participant_joined', data)
    }

    // meeting_participant_left - calld
    const onMeetingParticipantLeft = (data) => {
        console.log('meeting_participant_left', data)
    }

    // meeting_user_participant_joined - calld
    const onMeetingUserParticipantJoined = (data) => {
        console.log('meeting_user_participant_joined', data)
    }

    // meeting_user_participant_left - calld
    const onMeetingUserParticipantLeft = (data) => {
        console.log('meeting_user_participant_left', data)
    }

    // meeting_created - confd
    const onMeetingCreated = (data) => {
        console.log("meeting_created", data)
    }

    // meeting_deleted - confd
    const onMeetingDeleted = (data) => {
        console.log("meeting_deleted", data)
    }

    // meeting_progress - confd
    const onMeetingProgress = (data) => {
        console.log("meeting_progress", data)
    }

    // meeting_updated - confd
    const onMeetingUpdated = (data) => {
        console.log("meeting_updated", data)
    }

    // meeting_guest_authorization_created - confd
    const onMeetingGuestAuthorizationCreated = (data) => {
        console.log("meeting_guest_authorization_created", data)
    }

    // meeting_guest_authorization_deleted - confd
    const onMeetingGuestAuthorizationDeleted = (data) => {
        console.log("meeting_guest_authorization_deleted", data)
    }

    // meeting_guest_authorization_updated - confd
    const onMeetingGuestAuthorizationUpdated = (data) => {
        console.log("meeting_guest_authorization_updated", data)
    }

    // meeting_user_guest_authorization_created - confd
    const onMeetingUserGuestAuthorizationCreated = (data) => {
        // console.log("meeting_user_guest_authorization_created", data)
        /* data.data = {
        creation_time: "2025-12-08T07:39:17.221168+00:00"
        guest_name: "ftd"
        guest_uuid: "68ed9339-c351-43a5-a4ee-d3e933a3a39c"
        meeting_uuid: "bc7b33d1-b9d1-4265-898a-14495fb4eeda"
        status: "pending"
        user_uuid: "eed24e56-5ab0-4daf-ab53-e37519ccc547"
        uuid: "e34abbd4-c579-4240-96f8-6b13aeea4d1e"
        }
        */

        setMeetings((prev) =>
            prev.map((m) => {
                if (m.uuid !== data.data.meeting_uuid) return m;

                const existing = m.pendingAuthorizations ?? [];

                // vérifier si un élément avec le même guest_uuid existe déjà
                const alreadyExists = existing.some(
                (auth) => auth.guest_uuid === data.data.guest_uuid
                );

                return {
                ...m,
                pendingAuthorizations: alreadyExists
                    ? existing // ne rien ajouter
                    : [...existing, data.data], // ajouter si nouveau
                };
            })
        );

        // Mise à jour du meeting courant
        setMeeting((prev) => {
            // si l'objet meeting n'est pas encore chargé → ne rien modifier
            if (!prev || prev.uuid !== data.data.meeting_uuid) {
                return prev;
            }

            const existing = prev.pendingAuthorizations ?? [];

            // vérifier si déjà présent
            const alreadyExists = existing.some(
                (auth) => auth.guest_uuid === data.data.guest_uuid
            );

            return {
                ...prev,
                pendingAuthorizations: alreadyExists
                ? existing
                : [...existing, data.data],
            };
            });
        
        // notification de la demande d'autorisation
        setMeetingNotification(data.data);
    }

    // meeting_user_guest_authorization_deleted - confd
    const onMeetingUserGuestAuthorizationDeleted = (data) => {
        console.log("meeting_user_guest_authorization_deleted", data)
    }

    // meeting_user_guest_authorization_updated - confd
    const onMeetingUserGuestAuthorizationUpdated = (data) => {
        console.log("meeting_user_guest_authorization_updated", data)
    }

    // meeting_user_progress - confd
    const onMeetingUserProgress = (data) => {
        console.log("meeting_user_progress", data)
    }

  return {
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
  }
}

export default useMeetingEvents
