import { useState, useEffect } from "react";
import { IconButton, Menu } from "@chakra-ui/react";
import { MdHeadphones, MdLogin, MdLogout, MdPause, MdPlayArrow } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { useAuth } from "toriphone-auth";
import { useWazo } from "../../services/WazoProvider";

const UserAgent = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();
  const { agentGetStatus, agentLogin, agentLogout, agentPause, agentResume } = useWazo();

  // states
  const [connected, setConnected] = useState({});

  useEffect(() => {
    // Vérifiez d'abord si user.profile.agent est non null
    if (user.profile.agent) {
      // Fonction asynchrone pour vérifier si l'utilisateur est un agent
      const isAgent = async () => {
        try {
          const status = await agentGetStatus();
          // Déterminez la valeur de color en fonction de logged et paused
          let color = "secondary";
          if (!status.logged) {
            color = "danger";
          } else if (status.paused) {
            color = "primary";
          }

          // Ajoutez la propriété color à l'objet status
          status.color = color;

          return status;
        } catch (error) {
          // console.error("Erreur lors de la récupération du statut de l'agent :", error);
          return false; // En cas d'erreur, considérez que l'utilisateur n'est pas un agent
        }
      };

      // Mettez à jour la valeur de connected une fois que les données asynchrones sont disponibles
      isAgent().then((result) => {
        setConnected(result);
      });
    }
  }, [user.profile.agent]); // Ajoutez user.profile.agent comme dépendance

  const Login = async () => {
    await agentLogin(user);
    setConnected({ ...connected, logged: true, color: "secondary" });
  };

  const Logout = async () => {
    await agentLogout();
    setConnected({ ...connected, logged: false, color: "danger" });
  };

  const Pause = async () => {
    await agentPause();
    setConnected({ ...connected, paused: true, color: "primary" });
  };

  const Resume = async () => {
    await agentResume();
    setConnected({ ...connected, paused: false, color: "secondary" });
  };

  return user.profile.agent ? (
    <Menu.Root positioning={{ placement: "right-start" }}>
      <Menu.Trigger asChild>
        <IconButton variant="ghost" colorPalette={connected.color}>
          <MdHeadphones />
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content bg="bgSecondary">
          <Menu.ItemGroup>
            {connected.logged ? (
              <>
                <Menu.Item icon={<MdLogout size={20} />} bg="bgSecondary" onClick={() => Logout()}>
                  {t("agent.disconnect")}
                </Menu.Item>
                {connected.paused ? (
                  <Menu.Item icon={<MdPlayArrow size={20} />} bg="bgSecondary" onClick={() => Resume()}>
                    {t("agent.resume")}
                  </Menu.Item>
                ) : (
                  <Menu.Item icon={<MdPause size={20} />} bg="bgSecondary" onClick={() => Pause()}>
                    {t("agent.pause")}
                  </Menu.Item>
                )}
              </>
            ) : (
              <Menu.Item icon={<MdLogin size={20} />} bg="bgSecondary" onClick={() => Login()}>
                {t("agent.connect")}
              </Menu.Item>
            )}
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  ) : null;
};

export default UserAgent;
