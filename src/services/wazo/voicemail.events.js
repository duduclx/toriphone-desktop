const useVoicemailEvents = ({ setVoicemails, voicemailUrlGet, voicemailsGet }) => {

  // user_voicemail_message_created - application
  const onUserVoicemailMessageCreated = async (data) => {
    if (data.data.message) {
      const link = await voicemailUrlGet(data.data.message);
      const newVoicemail = {
        id: data.data.message.id,
        date: new Date(data.timestamp),
        duration: data.data.message.duration * 1000,
        caller: { name: data.data.message.caller_id_name, number: data.data.message.caller_id_num },
        unread: true,
        type: "Voicemail",
        link: link,
      };

      setVoicemails((prevVoicemails) => [newVoicemail, ...prevVoicemails]);
    }
  };

  // user_voicemail_message_deleted - application
  const onUserVoicemailMessageDeleted = (data) => {
    console.log("user_voicemail_message_deleted", data);
  };

  // user_voicemail_message_updated - application
  const onUserVoicemailMessageUpdated = (data) => {
    console.log("user_voicemail_message_updated", data);
  };

  // user_voicemail_associated - confd
  const onUserVoicemailAssociated = (data) => {
    // console.log("user_voicemail_associated", data);
    voicemailsGet();
  };

  // user_voicemail_dissociated - confd
  const onUserVoicemailDissociated = (data) => {
    // console.log("user_voicemail_dissociated", data);
    voicemailsGet();
  };

  // user_voicemail_edited - confd
  const onUserVoicemailEdited = (data) => {
    // console.log("user_voicemail_edited", data);
    voicemailsGet();
  };

  return {
    onUserVoicemailMessageCreated,
    onUserVoicemailMessageDeleted,
    onUserVoicemailMessageUpdated,
    onUserVoicemailAssociated,
    onUserVoicemailDissociated,
    onUserVoicemailEdited,
  };
};

export default useVoicemailEvents;
