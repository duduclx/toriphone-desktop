const useCallLogEvents = ({ user, setCallLog, setCallLogBadge }) => {

  // call_log_created
  const onCallLogCreated = (data) => {
    console.log("call_log_created", data);
  };

  // call_log_user_created
  const onCallLogUserCreated = (data) => {
    if (user.uuid == data.data.destination_user_uuid) {
      return;
    }
    const newCallLog = {
      answer: new Date(data.data.answer),
      answered: data.data.answered,
      callDirection: data.data.call_direction,
      destination: {
        extension: data.data.destination_extension,
        name: data.data.destination_name,
        uuid: data.data.destination_user_uuid,
      },
      source: {
        extension: data.data.source_extension,
        name: data.data.source_internal_name,
        uuid: data.data.source_user_uuid,
      },
      id: data.data.id,
      duration: data.data.duration * 1000,
      start: new Date(data.data.start),
      end: new Date(data.data.end),
      recordings: data.recordings || [],
      type: "CallLog",
    };
    setCallLog((prevCallLog) => [newCallLog, ...prevCallLog]);
    if (user.uuid === data.data.destination_user_uuid && data.data.answered === false) {
      setCallLogBadge((prevBadge) => prevBadge + 1);
    }
  };

  // call_logd_export_created
  const onCallLogdExportCreated = (data) => {
    console.log("call_logd_export_created", data);
  };

  // call_logd_export_updated
  const onCallLogdExportUpdated = (data) => {
    console.log("call_logd_export_updated", data);
  };

  // call_logd_retention_updated
  const onCallLogdRetentionUpdated = (data) => {
    console.log("call_logd_retention_updated", data);
  };

  return {
    onCallLogCreated,
    onCallLogUserCreated,
    onCallLogdExportCreated,
    onCallLogdExportUpdated,
    onCallLogdRetentionUpdated,
  };
};

export default useCallLogEvents;
