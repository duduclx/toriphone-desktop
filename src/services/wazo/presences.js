import { useState, useEffect, useRef } from "react";

const usePresences = ({ user, Wazo }) => {

  // value
  let dirdDefaultSource = {}

  /**
   * Dird default source Get
   * Appelé au chargement de l'application
   * sert à connaitre les status des autres users
   */
  const dirdDefaultSourceGet = async () => {
      await Wazo.dird.fetchWazoSource("default").then(async (response) => {
        dirdDefaultSource = response?.items?.[0];
      });
    };

  // Users Presence
  const [usersPresence, setUsersPresence] = useState({});
  const usersPresenceRef = useRef(usersPresence);
  const [processedUsersPresence, setProcessedUsersPresence] = useState(new Set());

  /**
   * Users Presence Get
   * @param {*} uuid 
   */
  const usersPresenceGet = async (uuid) => {
    // Vérifiez si les informations de l'utilisateur sont déjà enregistrées
    if (!usersPresence[uuid]) {
      // Si non, effectuez une requête pour obtenir les informations de l'utilisateur
      const userinfo = await Wazo.dird.fetchWazoContacts(dirdDefaultSource, { limit: 1, uuid: uuid });
      // obtenir les infos manquantes
      const userpresence = await Wazo.chatd.getContactStatusInfo(uuid);
      // mettre à jour les propriétés
      const updatedUserWithMethods = Object.assign(Object.create(Object.getPrototypeOf(userinfo[0])), {
        ...userinfo[0],
        connected: userpresence.connected,
        doNotDisturb: userpresence.do_not_disturb,
        email: userinfo[0].emails[0].email,
        lastActivity: userpresence.last_activity,
        lineState: userpresence.line_state,
        lines: userpresence.lines,
        mobile: userpresence.mobile,
        state: userpresence.state,
        status: userpresence.status,
      });
      setUsersPresence((prevState) => ({
        ...prevState,
        [uuid]: updatedUserWithMethods,
      }));
    }
  };

  /**
   * Users searchs, with presence
   * @param {*} term 
   * @param {*} user
   */
  const searchUsers = async (term, user) => {
    if (term.trim() === "") {
      return [];
    }
    try {
      const get = await Wazo.dird.search("default", term);
      if (get.length === 0) {
        return [];
      } else {
        const filteredResult = get.filter((item) => item.uuid !== user.uuid);
        // update usersPresence
        const userPromises = filteredResult.map(async (user) => {
          if (!processedUsersPresence.has(user.uuid)) {
            if (user.backend == "wazo") {
              await usersPresenceGet(user.uuid);
              processedUsersPresence.add(user.uuid);
            }
          }
        });
        await Promise.all(userPromises);
        return filteredResult
      }
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    usersPresenceRef.current = usersPresence;
  }, [usersPresence]);

  return {
    dirdDefaultSourceGet,
    usersPresence,
    setUsersPresence,
    usersPresenceRef,
    processedUsersPresence,
    setProcessedUsersPresence,
    usersPresenceGet,
    searchUsers,
  };
};

export default usePresences;
