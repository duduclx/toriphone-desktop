import { useState, useEffect } from "react";

const useVoicemail = ({ user, Wazo, apiClient }) => {

  // states
  const [voicemailUser, setVoicemailUser] = useState(null);
  const [voicemails, setVoicemails] = useState([]);
  const [voicemailsFolder, setVoicemailsFolder] = useState("all");
  const [voicemailsUnread, setVoicemailsUnread] = useState(0);
  const [voicemailGreetingUnavailable, setVoicemailGreetingUnavailable] = useState(null);
  const [voicemailGreetingBusy, setVoicemailGreetingBusy] = useState(null);
  const [voicemailGreetingName, setVoicemailGreetingName] = useState(null);

  /**
   * Voicemail User Get
   * @returns 
   */
  const voicemailUserGet = async () => {
    const userUuid = user.uuid
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userUuid}/voicemails`);
      setVoicemailUser(res.items[0]);
      return res
    } catch (e) {
      return e
    }
  }

  /**
   * Voicemail User Edit
   * @param {*} voicemail 
   * @returns 
   */
  const voicemailUserEdit = async (voicemail) => {
    const voicemailId = voicemail.id
    try {
      const res = await apiClient.client.put(`confd/1.1/voicemails/${voicemailId}`, voicemail);
      return res
    } catch (e) {
      return e
    }
  }

  /**
   * Voicemails Get
   */
  const voicemailsGet = async () => {
    if (user.profile.voicemail) {
      if(voicemailsFolder == "all") {
        try {
          const voiceMails = await Wazo.calld.listVoicemails();
          const voiceMailsWithLinks = await Promise.all(
            voiceMails.map(async (voicemail) => {
              const url = await voicemailUrlGet(voicemail);
              voicemail.link = url;
              return voicemail;
            })
          );
          setVoicemails(voiceMailsWithLinks);
        } catch (error) {
          // Vérifiez si l'erreur a le message "No such user voicemail"
          if (error.message === "No such user voicemail") {
            setVoicemails([]);
          } else {
            // Gérez d'autres erreurs ici si nécessaire
            console.error("Erreur lors de la récupération des messages vocaux :", error);
          }
        }
      } else if (voicemailsFolder == "new") {
        const res = await voicemailFolderGet("new");
        const voiceMailsWithLinks = await Promise.all(
          res.messages.map(async (voicemail) => {
            const url = await voicemailUrlGet(voicemail);
            voicemail.link = url;
            voicemail.caller = {
              name: voicemail.caller_id_name,
              number: voicemail.caller_id_num
            }
            voicemail.type =  "Voicemail";
            voicemail.unread = true
            // convertir voicemail.timestamp
            voicemail.date = new Date(voicemail.timestamp * 1000)
            return voicemail;
          })
        );
        setVoicemails(voiceMailsWithLinks);
      } else if (voicemailsFolder == "old") {
        const res = await voicemailFolderGet("old");
        const voiceMailsWithLinks = await Promise.all(
          res.messages.map(async (voicemail) => {
            const url = await voicemailUrlGet(voicemail);
            voicemail.link = url;
            voicemail.caller = {
              name: voicemail.caller_id_name,
              number: voicemail.caller_id_num
            }
            voicemail.type =  "Voicemail";
            voicemail.unread = false
            // convertir voicemail.timestamp
            voicemail.date = new Date(voicemail.timestamp * 1000)
            return voicemail;
          })
        );
        setVoicemails(voiceMailsWithLinks);
      }
    } else {
      // l'utilisateur n'a pas de messagerie d'activée
      setVoicemails(null);
    }
  };

  /**
   * Voicemail Url Get
   * @param {*} voiceMail 
   * @returns 
   */
  const voicemailUrlGet = async (voiceMail) => {
    const url = await Wazo.calld.getVoicemailUrl(voiceMail);
    return url;
  };

  /**
   * Voicemail Delete
   * @param {*} voicemailId 
   * @returns 
   */
  const voicemailDelete = async (voicemailId) => {
    const delVoicemail = await Wazo.calld.deleteVoicemail(voicemailId);
    // mise à jour du tableau voicemails
    const updatedVoicemails = voicemails.filter((voicemail) => voicemail.id !== voicemailId);
    setVoicemails(updatedVoicemails);
    return delVoicemail;
  };

  /**
   * Voicemail Folder Get
   * @param {*} folder 
   * @returns 
   */
  const voicemailFolderGet = async (folder) => {
    // Mappage des noms de dossiers vers leurs IDs
    const folderMap = {
      new: 1,
      old: 2,
      urgent: 3,
      other: 4,
    };

    // Vérifiez si le folder est valide
    const folderId = folderMap[folder];
    if (!folderId) {
      throw new Error(`Invalid folder name: ${folder}`);
    }

    // Effectuez l'appel API
    try {
      const res = await apiClient.client.get(`calld/1.0/users/me/voicemails/folders/${folderId}`);
      return res;
    } catch (error) {
      return error;
    }
  };

  /**
   * Voicemail Folder Update
   * @param {*} voicemail 
   * @param {*} folder 
   */
  const voicemailFolderUpdate = async (voicemail, folder) => {
    await Wazo.calld.updateVoicemailFolder(voicemail, folder)
    setVoicemailsUnread((prevUnread) =>
      folder === "new" ? prevUnread + 1 : prevUnread - 1
    )
  }

  /**
   * Voicemail GreetingExist
   * @param {*} greetingType 
   * @returns 
   */
  const voicemailGreetingExist = async (greetingType) => {
    const res = await apiClient.client.head(`calld/1.0/users/me/voicemails/greetings/${greetingType}`);
    return res
  }

  /**
   * Voicemail Greetings Get
   */
  const voicemailGreetingsGet = async () => {
    const unavailable = await voicemailGreetingExist("unavailable");
      setVoicemailGreetingUnavailable(unavailable);
    const busy = await voicemailGreetingExist("busy");
      setVoicemailGreetingBusy(busy);
    const name = await voicemailGreetingExist("name");
      setVoicemailGreetingName(name);
  }

  /**
   * Voicemail Greeting Get
   * @param {*} greetingType 
   * @returns 
   */
  const voicemailGreetingGet = async (greetingType) => {
    // get audio file
    const response = await fetch(
      `https://${apiClient.client.server}/api/calld/1.0/users/me/voicemails/greetings/${greetingType}`,
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
   * Voicemail Greeting Add
   * @param {*} greeting 
   * @param {*} greetingType 
   * @returns 
   */
  const voicemailGreetingsAdd = async (greeting, greetingType) => {
    // upload audio file
    const response = await fetch(
      `https://${apiClient.client.server}/api/calld/1.0/users/me/voicemails/greetings/${greetingType}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "audio/wav",
          "Accept": "application/json",
          "Wazo-Tenant": Wazo.Auth.session.tenantUuid,
          "X-Auth-Token": apiClient.client.token,
        },
        body: greeting,
      }
    );

    return response;
  };

  /**
   * Voicemail Greeting Delete
   * @param {*} greetingType 
   * @returns 
   */
  const voicemailGreetingDelete = async (greetingType) => {
    const res = await apiClient.client.delete(`calld/1.0/users/me/voicemails/greetings/${greetingType}`);
    return res;
  };

  /**
   * Voicemail Greeting Copy
   * @param {*} greetingTypeSource 
   * @param {*} greetingTypeDestination 
   * @returns 
   */
  const voicemailGreetingCopy = async (greetingTypeSource, greetingTypeDestination) => {
    const dest = {
      dest_greeting: greetingTypeDestination,
    };
    const res = await apiClient.client.post(`calld/1.0/users/me/voicemails/greetings/${greetingTypeSource}/copy`, dest);
    return res;
  };

  /**
   * update voicemails when selecting a folder / filter
   */
  useEffect(() => {
    if(user) {
      voicemailsGet();
    }
  }, [voicemailsFolder])

  /**
   * update unread count
   */
  useEffect(() => {
    const fetchVoicemailFolderNew = async () => {
      const res = await voicemailFolderGet("new");
      setVoicemailsUnread(res.messages.length)
    }
    if(user) {
      fetchVoicemailFolderNew();
    }
  }, [])

  return {
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
  };
};

export default useVoicemail;
