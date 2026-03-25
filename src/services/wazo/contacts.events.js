const useContactsEvents = ({contactsPersonal}) => {

    // favorite_added
    const onContactsFavoriteAdded = (data) => {
        // voir informations dans le TOTO.md
    // en attente d'une correction côté wazo
    //console.log("onFavoriteAdded", data)
    //console.log('personal', contactsPersonal)
    //console.log('phonebook', contactsPhonebook)

    if (data.data.source == "personal") {
        const contact = contactsPersonal.filter((person) => person.sourceId == data.data.source_entry_id);
        // vérifier si contact.favorited est true
        //contactsFavoritesAddedPersonal(contact)
      } else {
        // il manque l'info data.data.backend
        // il faut donc parcourir une première fois l'ensemble des tableaux
        // si ça match, on récupère le backend et le contact
        // on envoi sur la bonne fonction
      }
    }

    // favorite_deleted
    const onContactsFavoriteDeleted = (data) => {
        //console.log('favorite_deleted', data)
    }


  return { onContactsFavoriteAdded, onContactsFavoriteDeleted }
}

export default useContactsEvents
