import { useState } from "react";

const useCallLog = ({ storagePrefsGet, Wazo, apiClient }) => {
  // values
  const [callLog, setCallLog] = useState([]);
  const [callLogLength, setCallLogLength] = useState("5");
  const [callLogFiltered, setCallLogFiltered] = useState([]);
  const [callLogBadge, setCallLogBadge] = useState(0);
  const [callLogRecord, setCallLogRecord] = useState({});

   /**
   * CallLog Get
   */
   const callLogGet = async () => {
    const preferences = storagePrefsGet();
    let length;
    if (preferences && preferences.callsLength !== undefined) {
      length = preferences.callsLength;
    } else {
      length = 5;
    }
    const callLogs = await Wazo.callLogd.listCallLogs("", length);

    setCallLog(callLogs);
    return callLogs
  };

  /**
   * CallLog Distinct Get
   */
  const callLogDistinctGet = async () => {
    const callLogResult = await Wazo.callLogd.listDistinctCallLogs(10, 5, "peer_exten");
    setCallLogFiltered(callLogResult);
  };

  /**
   * CallLog From Date Get
   * @param {*} date 
   * @param {*} number 
   */
  const callLogFromDateGet = async (date, number) => {
    const callLogResult = await Wazo.callLogd.listCallLogsFromDate(date, number);
    if (callLogResult.length === 0) {
      callLogResult.message = "no result";
    }
    setCallLogFiltered(callLogResult);
  };

  /**
   * CallLog Search
   * @param {*} term 
   * @param {*} limit 
   */
  const callLogSearch = async (term, limit) => {
    const callLogResult = await Wazo.callLogd.search(term, limit || 5);
    if (callLogResult.length === 0) {
      callLogResult.message = "no result";
    }
    setCallLogFiltered(callLogResult);
  };

  /**
   * CallLog Search By
   * @param {*} field 
   * @param {*} value 
   * @param {*} limit 
   */
  const callLogSearchBy = async (field, value, limit) => {
    const callLogResult = await Wazo.callLogd.searchBy(field, value, limit);
    if (callLogResult.length === 0) {
      callLogResult.message = "no result";
    }
    setCallLogFiltered(callLogResult);
  };

  /**
   * CallLog Record Get
   * @param {*} crd_id 
   * @param {*} recording_uuid 
   * @returns 
   */
  const callLogRecordGet = async (crd_id, recording_uuid) => {
    const response = await fetch(
      `https://${apiClient.client.server}/api/call-logd/1.0/cdr/${crd_id}/recordings/${recording_uuid}/media`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
          "Wazo-Tenant": Wazo.Auth.session.tenantUuid,
          "X-Auth-Token": apiClient.client.token,
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch audio file");
    }
  
    const blob = await response.blob();
    return blob;
  };

  /**
   * CallLog Record Delete
   * @param {*} crd_id 
   * @param {*} recording_uuid 
   * @returns 
   */
  const callLogRecordDelete = async (crd_id, recording_uuid) => {
    try {
      const res = await apiClient.client.delete(`call-logd/1.0/cdr/${crd_id}/recordings/${recording_uuid}/media`);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * CallLog Badge Reset
   */
  const callLogBadgeReset = () => {
    setCallLogBadge(0);
  };
 
  /**
   * CallLog Filter Reset
   */
  const callLogFilterReset = () => {
    setCallLogFiltered([]);
  };

  return {
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
  };
};

export default useCallLog;
