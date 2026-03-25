import { useState } from "react";

const useWebhooks = ({ apiClient }) => {
  // states
  const [webhooksUser, setWebhooksUser] = useState({});
  const [webhookUser, setWebhookUser] = useState({
    name: "",
    service: "http",
    events: [],
    config: {
      method: "post",
      content_type: "application/json",
      verify_certificate: false,
      body: "",
    },
  });

  /**
   * Webhooks User Get
   * @returns
   */
  const webhooksUserGet = async () => {
    const res = await apiClient.client.get(`webhookd/1.0/users/me/subscriptions`);
    setWebhooksUser(res);
    return res;
  };

  /**
   * Webhook User Get
   * @param {*} subscription
   * @returns
   */
  const webhookUserGet = async (subscription) => {
    const res = await apiClient.client.get(`webhookd/1.0/users/me/subscriptions/${subscription.uuid}`);
    setWebhookUser(res);
    return res;
  };

  /**
   * Webhook User Add
   * @param {*} subscription
   * @returns
   */
  const webhookUserAdd = async (subscription) => {
    try {
      const res = await apiClient.client.post(`webhookd/1.0/users/me/subscriptions`, subscription);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   *  Webhook User Delete
   * @param {*} subscription
   * @returns
   */
  const webhookUserDelete = async (subscription) => {
    try {
      const res = await apiClient.client.delete(`webhookd/1.0/users/me/subscriptions/${subscription.uuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Webhook User Edit
   * @param {*} subscription
   * @returns
   */
  const webhookUserEdit = async (subscription) => {
    try {
      const res = await apiClient.client.put(`webhookd/1.0/users/me/subscriptions/${subscription.uuid}`, subscription);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Webhook User Log Get
   * @param {*} subscription 
   * @returns 
   */
  const webhookUserLogGet = async (subscription) => {
    try {
      const res = await apiClient.client.get(`webhookd/1.0/subscriptions/${subscription.uuid}/logs`);
      return res
    } catch (e) {
      return e
    }
  }

  return {
    webhooksUser,
    setWebhooksUser,
    webhookUser,
    setWebhookUser,
    webhooksUserGet,
    webhookUserGet,
    webhookUserAdd,
    webhookUserDelete,
    webhookUserEdit,
    webhookUserLogGet
  };
};

export default useWebhooks;
