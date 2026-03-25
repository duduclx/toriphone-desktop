import { useTranslation } from "react-i18next";

const useForward = ({ user, Wazo }) => {
  // requirements
  const { t } = useTranslation();

  /**
   * Forwards Update
   * @param {*} destinations 
   * @param {*} checkedItems 
   * @returns 
   */
  const forwardsUpdate = async (destinations, checkedItems) => {
    const options = {
      "busy": {
        "destination": destinations[2],
        "enabled": checkedItems[2]
      },
      "noanswer": {
        "destination": destinations[1],
        "enabled": checkedItems[1]
      },
      "unconditional": {
        "destination": destinations[0],
        "enabled": checkedItems[0]
      }
    }
    try {
      /*
      await Wazo.confd.updateForwardOption(user.uuid, "busy", destinations[2], checkedItems[2]);
      await Wazo.confd.updateForwardOption(user.uuid, "noanswer", destinations[1], checkedItems[1]);
      await Wazo.confd.updateForwardOption(user.uuid, "unconditional", destinations[0], checkedItems[0]);
      */
     await Wazo.confd.updateForwardOptions(user.uuid, options)
      return {
        status: "success",
        title: t("forwards.update_forwards_event"),
        description: t("forwards.update_forwards_event_true"),
        duration: 5000,
      };
    } catch (e) {
      return {
        status: "error",
        title: t("forwards.update_forwards_event"),
        description: t("forwards.update_forwards_event_false"),
        duration: 5000,
      };
    }
  };

  return { forwardsUpdate };
};

export default useForward;
