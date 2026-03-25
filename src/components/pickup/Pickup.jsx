import { useEffect, useRef } from "react";
import { toaster } from "../ui/toaster";
import { useTranslation } from "react-i18next";

import { useAuth } from "toriphone-auth";
import { useWazo } from "../../services/WazoProvider";

const Pickup = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { usersPresence, call, callSession } = useWazo();
  const { user } = useAuth();

  // sound
  const playSound = (src) => {
  const audio = new Audio(src);
  audio.play().catch((err) => {
    console.warn("Impossible de jouer le son :", err);
  });
};

  // 🔹 mémorise l’état précédent + ID du toaster
  const previousStates = useRef({});
  const activeToasters = useRef({});

  useEffect(() => {
    if (!usersPresence || !user?.profile?.callPickupTargetUsers) return;

    user.profile.callPickupTargetUsers.forEach((targetUser) => {
      const uuid = targetUser.uuid;
      const presence = usersPresence[uuid];
      const prevState = previousStates.current[uuid]?.lineState;

      if (!presence) return;

      // 👉 si l'état change, on met à jour la mémoire
      if (prevState !== presence.lineState) {
        previousStates.current[uuid] = { lineState: presence.lineState };
      }

      const becameRinging =
        prevState !== "ringing" && presence.lineState === "ringing";
      const stoppedRinging =
        prevState === "ringing" && presence.lineState !== "ringing";

      // 🟢 Création du toaster quand ça sonne
      if (becameRinging) {
        if (callSession?.number === `*8${presence.number}`) return;

        playSound("/sounds/signalNotification.mp3");

        // on garde l'id du toaster créé
        const id = toaster.create({
          type: "success",
          title: t("pickup.title"),
          description: `${presence.firstName} ${presence.lastName}`,
          closable: true,
          duration: 29000,
          action: {
            label: t("pickup.button"),
            onClick: () => call(`*8${presence.number}`),
          },
        });

        activeToasters.current[uuid] = id;
      }

      // 🔴 Fermeture automatique si la personne ne sonne plus
      if (stoppedRinging && activeToasters.current[uuid]) {
        toaster.dismiss(activeToasters.current[uuid]);
        delete activeToasters.current[uuid];
      }
    });
  }, [usersPresence, callSession, t, call, user]);

  return null;
};

export default Pickup;
