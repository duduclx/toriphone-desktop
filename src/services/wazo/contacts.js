import { useState } from "react";

const useContacts = ({ usersPresenceGet, processedUsersPresence, Wazo, apiClient }) => {
  // values
  const [contactsFavorites, setContactsFavorites] = useState([]);
  const [contactsInternal, setContactsInternal] = useState([]);
  const [contactsPersonal, setContactsPersonal] = useState([]);
  const [contactsPhonebook, setContactsPhonebook] = useState([]);
  const [contactsGoogle, setContactsGoogle] = useState([]);
  const [contactsOffice, setContactsOffice] = useState([]);
  const [contactsLdap, setContactsLdap] = useState([]);

  /*
  const contactsFavoritesAddedPersonal = () => {};

  const contactsFavoritesRemovedPersonal = () => {};

  const contactsFavoritesAddedPhonebook = () => {};

  const contactsFavoritesRemovedPhonebook = () => {};

  const contactsFavoritesAddedWazo = () => {};

  const contactsFavoritesRemovedWazo = () => {};

  const contactsFavoritesAddedOffice = () => {};

  const contactsFavoritesRemovedOffice = () => {};

  const contactsFavoritesAddedGoogle = () => {};

  const contactsFavoritesRemovedGoogle = () => {};
  */

  /**
   * Contacts Favorites Get
   */
  const contactsFavoritesGet = async () => {
    const favorites = await Wazo.dird.listFavorites("default");
    // update usersPresence for wazo contact only
    const userPromises = favorites.map(async (user) => {
      if (user.backend === "wazo" && !processedUsersPresence.has(user.uuid)) {
        await usersPresenceGet(user.uuid);
        processedUsersPresence.add(user.uuid);
      }
    });
    await Promise.all(userPromises);
    setContactsFavorites(favorites);
  };

  /**
   * Contact Favorite Add
   * @param {*} contact
   */
  const contactsFavoritesAdd = async (contact) => {
    await Wazo.dird.markAsFavorite(contact.source, contact.sourceId);
    let updatedContactsFavorites = [...contactsFavorites];

    if (contact.backend === "personal") {
      const contactWithFavorite = Object.assign(Object.create(Object.getPrototypeOf(contact)), contact, {
        favorited: true,
      });
      updatedContactsFavorites.push(contactWithFavorite);
      setContactsFavorites(updatedContactsFavorites);

      setContactsPersonal((prevContacts) =>
        prevContacts.map((person) => (person.sourceId === contact.sourceId ? contactWithFavorite : person))
      );
    } else if (contact.backend === "phonebook") {
      contactsFavoritesGet();
      setContactsPhonebook((prevContacts) =>
        prevContacts.map((person) =>
          person.sourceId === contact.sourceId
            ? Object.assign(Object.create(Object.getPrototypeOf(person)), person, {
                favorited: true,
              })
            : person
        )
      );
    } else if (contact.backend === "office") {
    } else if (contact.backend === "google") {
    } else {
      await usersPresenceGet(contact.uuid);
      const userData = await getUserInfos(contact);
      const combinedContact = Object.assign(Object.create(Object.getPrototypeOf(contact)), userData);
      updatedContactsFavorites.push(combinedContact);
      setContactsFavorites(updatedContactsFavorites);
    }
  };

  /**
   * Contact Favorite Remove
   * @param {*} contact
   */
  const contactsFavoritesRemove = async (contact) => {
    await Wazo.dird.removeFavorite(contact.source, contact.sourceId);
    let updatedContactsFavorites = [...contactsFavorites];

    if (contact.backend === "personal") {
      const indexToRemove = updatedContactsFavorites.findIndex((user) => user.sourceId === contact.sourceId);
      if (indexToRemove !== -1) {
        updatedContactsFavorites.splice(indexToRemove, 1);
        setContactsFavorites(updatedContactsFavorites);
      }
      setContactsPersonal((prevContacts) =>
        prevContacts.map((person) =>
          person.sourceId === contact.sourceId
            ? Object.assign(Object.create(Object.getPrototypeOf(person)), person, {
                ...person,
                favorited: false,
              })
            : person
        )
      );
    } else if (contact.backend === "phonebook") {
      const indexToRemove = updatedContactsFavorites.findIndex((user) => user.sourceId === contact.sourceId);
      if (indexToRemove !== -1) {
        updatedContactsFavorites.splice(indexToRemove, 1);
        setContactsFavorites(updatedContactsFavorites);
      }
      setContactsPhonebook((prevContacts) =>
        prevContacts.map((person) =>
          person.sourceId === contact.sourceId
            ? Object.assign(Object.create(Object.getPrototypeOf(person)), person, {
                ...person,
                favorited: false,
              })
            : person
        )
      );
    } else if (contact.backend === "office") {
    } else if (contact.backend === "google") {
    } else {
      //contact backend === "wazo"
      const indexToRemove = updatedContactsFavorites.findIndex((user) => user.uuid === contact.uuid);
      if (indexToRemove !== -1) {
        updatedContactsFavorites.splice(indexToRemove, 1);
        setContactsFavorites(updatedContactsFavorites);
      }
    }
  };

  /**
   * Contacts Phonebooks Get
   */
  const contactsPhonebooksGet = async () => {
    const phonebookSources = await Wazo.dird.fetchSourcesFor("default");
    const filteredPhonebookSources = phonebookSources.items.filter(
      (source) => source.backend === "phonebook" && source.uuid
    );

    const results = await Promise.all(
      filteredPhonebookSources.map(async (source) => {
        const phonebookContacts = await Wazo.dird.fetchPhonebookContacts(source);
        const itemsWithSource = phonebookContacts.items.map((item) => ({
          ...item,
          backend: source.backend,
          source: source.name,
          sourceId: item.id,
          name: item.firstname + " " + item.lastname,
          favorited: contactsFavorites.some((favorite) => favorite.sourceId === item.id),
        }));
        return { source, phonebookContacts: { ...phonebookContacts, items: itemsWithSource } };
      })
    );
    const allItems = results.reduce((accumulator, currentItem) => {
      accumulator.push(...currentItem.phonebookContacts.items);
      return accumulator;
    }, []);
    setContactsPhonebook(allItems);
  };

  /**
   * Contacts Internal Get
   */
  const contactsInternalGet = async () => {
    const wazoSources = await Wazo.dird.fetchWazoSource("default");
    try {
      const internalPromises = wazoSources.items.map(async (source) => {
        try {
          const internal = await Wazo.dird.fetchWazoContacts(source);
          return internal;
        } catch (e) {
          return [];
        }
      });

      const internalResults = await Promise.all(internalPromises);
      const allInternalContacts = internalResults.reduce((accumulator, internal) => {
        accumulator.push(...internal);
        return accumulator;
      }, []);
      setContactsInternal(allInternalContacts);

      const userPromises = allInternalContacts.map(async (user) => {
        if (!processedUsersPresence.has(user.uuid)) {
          await usersPresenceGet(user.uuid);
          processedUsersPresence.add(user.uuid);
        }
      });
      await Promise.all(userPromises);
    } catch (e) {
      setContactsInternal([]);
    }
  };

  /**
   * Contacts Personal Get
   */
  const contactsPersonalGet = async () => {
    const personals = await Wazo.dird.listPersonalContacts();
    setContactsPersonal(personals);
  };

  /**
   * Contacts Personal Page Get
   * @param {*} search // search don't exist in the API !!
   * @param {*} offset 
   * @param {*} limit 
   * @returns 
   */
  const contactsPersonalPageGet = async (search = null, offset = 0, limit = 10) => {
    if (search) {
      const res = await apiClient.client.get(
        `dird/0.1/personal?format=application%2Fjson&limit=${limit}&offset=${offset}&search=${search}`
      );
      setBlocklists(res);
      return res;
    } else {
      const res = await apiClient.client.get(`dird/0.1/personal?format=application%2Fjson&limit=${limit}&offset=${offset}`);
      setBlocklists(res);
      return res;
    }
  };

  /**
   * Contacts Personal Add
   * @param {*} contact
   * @returns
   */
  const contactsPersonalAdd = async (contact) => {
    try {
      const newContact = await Wazo.dird.addContact(contact);
      let updatedContactsPersonal = [...contactsPersonal];
      updatedContactsPersonal.push(newContact);
      setContactsPersonal(updatedContactsPersonal);
      return newContact;
    } catch (e) {
      return e;
    }
  };

  /**
   * Contacts Personal Edit
   * @param {*} contact
   */
  const contactsPersonalEdit = async (contact) => {
    const editedContact = await Wazo.dird.editContact(contact);
    const updatedEditedContact = Object.assign(Object.create(Object.getPrototypeOf(editedContact)), editedContact, {
      favorited: contact.favorited,
    });
    setContactsPersonal((prevContacts) =>
      prevContacts.map((person) => (person.sourceId === updatedEditedContact.sourceId ? updatedEditedContact : person))
    );
    // mettre à jour dans le tableau contactsFavorites
    setContactsFavorites((prevFavorites) =>
      prevFavorites.map((favorite) =>
        favorite.sourceId === updatedEditedContact.sourceId ? updatedEditedContact : favorite
      )
    );
  };

  /**
   * Contacts Personal Delete
   * @param {*} contact
   */
  const contactsPersonalRemove = (contact) => {
    if (contact.favorited) {
      contactsFavoritesRemove(contact);
    }
    const updatedContacts = contactsPersonal.filter((item) => item.sourceId !== contact.sourceId);
    setContactsPersonal(updatedContacts);
    Wazo.dird.deleteContact(contact.sourceId);
  };

  /**
   * Contacts Office Get
   */
  const contactsOfficeGet = async () => {
    // sources
    const officeSource = await Wazo.dird.fetchOffice365Source("default");
    try {
      const officePromises = officeSource.items.map(async (source) => {
        try {
          const office = await Wazo.dird.fetchOffice365Contacts(source);
          return office;
        } catch (e) {
          return [];
        }
      });

      const officeResults = await Promise.all(officePromises);
      const allOfficeContacts = officeResults.reduce((accumulator, office) => {
        accumulator.push(...office);
        return accumulator;
      }, []);

      setContactsOffice(allOfficeContacts);
    } catch (e) {
      setContactsOffice([]);
    }
  };

  /**
   * Contacts Google Get
   */
  const contactsGoogleGet = async () => {
    // sources
    const googleSource = await Wazo.dird.fetchGoogleSource("default");
    // const office = Wazo.dird.fetchGoogleContacts(source, queryParams)
    try {
      const google = await Wazo.dird.fetchGoogleContacts(googleSource.items[0]);
      setContactsGoogle(google);
    } catch (e) {
      setContactsGoogle([]);
    }
  };

  /**
   * Contacts Ldap Get
   */
  const contactsLdapGet = async () => {
    // todo
    const sources = await Wazo.dird.fetchSourcesFor("default", "ldap");
    setContactsLdap(sources)
    return sources
    //console.log('ldap', sources)
    // pas de requête possible pour les obtenir !!
  };

  /**
   * Contact User Infos Get
   * @param {*} user
   * @returns
   */
  const getUserInfos = async (user) => {
    let defaultSource = "";
    await Wazo.dird.fetchWazoSource("default").then(async (response) => {
      //console.log('response :', response)
      defaultSource = response?.items?.[0];
    });
    const userinfo = await Wazo.dird.fetchWazoContacts(defaultSource, { limit: 1, uuid: user.uuid });
    const userpresence = await Wazo.chatd.getContactStatusInfo(user.uuid);
    const updatedUser = {
      ...user,
      connected: userpresence.connected,
      doNotDisturb: userpresence.do_not_disturb,
      email: userinfo[0].emails[0].email,
      lastActivity: userpresence.last_activity,
      lineState: userpresence.line_state,
      lines: userpresence.lines,
      mobile: userpresence.mobile,
      state: userpresence.state,
      status: userpresence.status,
    };

    return updatedUser;
  };

  return {
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
  };
};

export default useContacts;
