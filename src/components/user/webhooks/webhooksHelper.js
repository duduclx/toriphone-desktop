import { useTranslation } from "react-i18next";

const useWebhooksHelper = () => {
  //requirements
  const { t } = useTranslation();

  const webhooksService = [
    "http",
    "mobile"
  ]

  const webhooksEventsOptions = [
    { label: t("webhooks.events_list.agent_paused"), value: "agent_paused" },
    { label: t("webhooks.events_list.agent_status_update"), value: "agent_status_update" },
    { label: t("webhooks.events_list.agent_unpaused"), value: "agent_unpaused" },
    { label: t("webhooks.events_list.call_answered"), value: "call_answered" },
    { label: t("webhooks.events_list.call_created"), value: "call_created" },
    { label: t("webhooks.events_list.call_dtmf_created"), value: "call_dtmf_created" },
    { label: t("webhooks.events_list.call_ended"), value: "call_ended" },
    { label: t("webhooks.events_list.call_held"), value: "call_held" },
    { label: t("webhooks.events_list.call_log_user_created"), value: "call_log_user_created" },
    { label: t("webhooks.events_list.call_resumed"), value: "call_resumed" },
    { label: t("webhooks.events_list.call_updated"), value: "call_updated" },
    { label: t("webhooks.events_list.chat_message_received"), value: "chat_message_received" },
    { label: t("webhooks.events_list.chat_message_sent"), value: "chat_message_sent" },
    { label: t("webhooks.events_list.chatd_presence_updated"), value: "chatd_presence_updated" },
    { label: t("webhooks.events_list.chatd_user_room_created"), value: "chatd_user_room_created" },
    { label: t("webhooks.events_list.chatd_user_room_message_created"), value: "chatd_user_room_message_created" },
    { label: t("webhooks.events_list.endpoint_status_update"), value: "endpoint_status_update" },
    { label: t("webhooks.events_list.favorite_added"), value: "favorite_added" },
    { label: t("webhooks.events_list.favorite_deleted"), value: "favorite_deleted" },
    { label: t("webhooks.events_list.relocate_initiated"), value: "relocate_initiated" },
    { label: t("webhooks.events_list.relocate_answered"), value: "relocate_answered" },
    { label: t("webhooks.events_list.relocate_complete"), value: "relocate_complete" },
    { label: t("webhooks.events_list.relocate_ended"), value: "relocate_ended" },
    { label: t("webhooks.events_list.user_status_update"), value: "user_status_update" },
    { label: t("webhooks.events_list.user_voicemail_message_created"), value: "user_voicemail_message_created" },
    { label: t("webhooks.events_list.user_voicemail_message_deleted"), value: "user_voicemail_message_deleted" },
    { label: t("webhooks.events_list.user_voicemail_message_updated"), value: "user_voicemail_message_updated" },
    { label: t("webhooks.events_list.users_forwards_busy_updated"), value: "users_forwards_busy_updated" },
    { label: t("webhooks.events_list.users_forwards_noanswer_updated"), value: "users_forwards_noanswer_updated" },
    { label: t("webhooks.events_list.users_forwards_unconditional_updated"), value: "users_forwards_unconditional_updated" },
    { label: t("webhooks.events_list.users_services_dnd_updated"), value: "users_services_dnd_updated" },
    { label: t("webhooks.events_list.users_services_incallfilter_updated"), value: "users_services_incallfilter_updated" },
  ];

  const webhooksMethodOptions = [
    { label: "POST", value: "post" },
    { label: "PUT", value: "put" },
    { label: "GET", value: "get" },
    { label: "DELETE", value: "delete" },
    { label: "HEAD", value: "head" },
  ];

  const webhooksContentTypeOptions = ["application/json", "text/plain", "text/javascript", "text/csv"];

  return {
    webhooksService,
    webhooksEventsOptions,
    webhooksMethodOptions,
    webhooksContentTypeOptions,
  };
};

export default useWebhooksHelper;
