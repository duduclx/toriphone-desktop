import { useWazo } from "../../services/WazoProvider";

const getLabel = (destination) => {
  // requirements
  const { groups, conferences, queues } = useWazo();

  if (!destination) {
    return null;
  }

  /*
  bsfilter
  pas clair, car se limite à la liste des
  callfilters.items[].surrogates.users[].firstname / lastname / member_id
  mais il faut que ce soit un don je suis le patron, sinon, ça n'a pas de sens
  */

  /*
  pagings pas mis en place ?!!
  */

  /*
  en attente de la modification de confd pour ce passer des ressources servicesAll
  */

  switch (destination.type) {
    case "user":
      return {
        ...destination,
        label: `${destination.user_firstname} ${destination.user_lastname}`,
      };
    case "queue":
      const queue = queues.items.find((item) => item.id === destination.queue_id);
      return {
        ...destination,
        label: queue ? queue.name : "",
        value: destination.queue_id
      };
    case "group":
      return {
        ...destination,
        label: destination.group_label,
        value: destination.group_id,
      };
      /*
    case "groupmember":
      const group = groups.items.find((item) => item.id === destination.group_id);
      return {
        ...destination,
        label: group ? group.label : "LABEL NON TROUVÉ",
        value: destination.group_id,
      };
      */
    case "parking":
      return {
        ...destination,
        label: destination.parking_lot_name,
        value: destination.parking_lot_id,
      };
    case "park_position":
      return {
        ...destination,
        label: destination.parking_lot_name,
        value: destination.parking_lot_id,
      };
    case "conference":
      const conference = conferences.items.find((item) => item.id === destination.conference_id);
      return {
        ...destination,
        label: conference ? conference.name : "",
        value: destination.conference_id,
      };
    default:
      return destination;
  }
};

export default getLabel;
