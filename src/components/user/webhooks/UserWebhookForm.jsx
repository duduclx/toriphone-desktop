import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Dialog,
  Field,
  Flex,
  Tag,
  Text,
  Textarea,
  Combobox,
  createListCollection,
  Wrap,
} from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { ButtonAddUi, ButtonEditUi, CheckboxUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import useWebhooksHelper from "./webhooksHelper";

const UserWebhookForm = ({ open, onClose, webhook, setWebhook, submit, errors, edit = false }) => {
  // requirements
  const { t } = useTranslation();

  // helper
  const { webhooksService, webhooksContentTypeOptions, webhooksEventsOptions, webhooksMethodOptions } = useWebhooksHelper();

  // states
  const [searchValue, setSearchValue] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);

  // load events
  useEffect(() => {
    setSelectedEvents(webhook.events);
  }, [webhook]);

  // collection
  const filteredItems = useMemo(
    () => webhooksEventsOptions.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())),
    [searchValue]
  );

  const collection = useMemo(() => createListCollection({ items: filteredItems }), [filteredItems]);

  const handleValueChange = (details) => {
    setSelectedEvents(details.value);
    setWebhook((prev) => ({
      ...prev,
      events: details.value,
    }));
  };

  const removeEvents = (event) => {
    const updated = selectedEvents.filter((e) => e !== event);
    setSelectedEvents(updated);
    setWebhook((prev) => ({
      ...prev,
      events: updated,
    }));
  };

  // submit on key down
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="bgDefault">
          <Dialog.Header alignSelf="center">
            <Dialog.Title>{edit ? t("webhooks.title_edit") : t("webhooks.title_add")}</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            {errors && (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>{t("common.error")}</Alert.Title>
                <Alert.Description>{errors}</Alert.Description>
              </Alert.Root>
            )}
            <Flex flexDirection="column" gap="4">
              <Field.Root>
                <Field.Label>{t("webhooks.name")} :</Field.Label>
                <InputUi
                  required
                  placeholder={t("webhooks.name")}
                  value={webhook.name}
                  onChange={(e) => setWebhook({ ...webhook, name: e.target.value, metadata: { name: e.target.value } })}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>{t("webhooks.events")} :</Field.Label>
                <Combobox.Root
                  size="lg"
                  multiple
                  closeOnSelect
                  collection={collection}
                  positioning={{ strategy: "fixed", hideWhenDetached: true }}
                  value={selectedEvents}
                  onValueChange={handleValueChange}
                  onInputValueChange={(details) => setSearchValue(details.inputValue)}
                >
                  <Wrap gap="2">
                    {selectedEvents.map((event, index) => (
                      <Tag.Root key={index} size="sm" borderRadius="8px" p="2">
                        <Tag.Label>{event}</Tag.Label>
                        <Tag.EndElement>
                          <Tag.CloseTrigger onClick={() => removeEvents(event)} />
                        </Tag.EndElement>
                      </Tag.Root>
                    ))}
                  </Wrap>
                  <Combobox.Control bg="selectBg">
                    <Combobox.Input placeholder={t("webhooks.events")} />
                    <Combobox.IndicatorGroup>
                      <Combobox.Trigger />
                    </Combobox.IndicatorGroup>
                  </Combobox.Control>
                  <Combobox.Positioner>
                    <Combobox.Content bg="bgElevated">
                      <Combobox.Empty>{t("webhooks.none")}</Combobox.Empty>
                      {collection?.items?.map((item) => (
                        <Combobox.Item key={item.value} item={item}>
                          {item.label}
                          <Combobox.ItemIndicator />
                        </Combobox.Item>
                      ))}
                    </Combobox.Content>
                  </Combobox.Positioner>
                </Combobox.Root>
                <Field.HelperText>{t("webhooks.events_helper")}</Field.HelperText>
              </Field.Root>
              <Field.Root>
                <Field.Label>{t("webhooks.url")} :</Field.Label>
                <InputUi
                  required
                  placeholder={t("webhooks.url")}
                  value={webhook.config.url}
                  onChange={(e) => setWebhook({ ...webhook, config: { ...webhook.config, url: e.target.value } })}
                />
              </Field.Root>
              <Field.Root>
                <Text mb="2">{t("webhooks.service")} :</Text>
                <NativeSelectUi
                value={webhook.service}
                onChange={(e) => {
                  setWebhook({...webhook, service: e.target.value})
                }}>
                  {webhooksService.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </NativeSelectUi>
              </Field.Root>
              <Field.Root>
                <Text mb="2">{t("webhooks.method")} :</Text>
                <NativeSelectUi
                  value={webhook.config.method}
                  onChange={(e) => {
                    setWebhook({ ...webhook, config: { ...webhook.config, method: e.target.value } });
                  }}
                >
                  {webhooksMethodOptions.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
                </NativeSelectUi>
              </Field.Root>
              <Field.Root>
                <Field.Label>{t("webhooks.content_type")} :</Field.Label>
                <NativeSelectUi
                  value={webhook.config.content_type}
                  onChange={(e) => {
                    setWebhook({ ...webhook, config: { ...webhook.config, content_type: e.target.value } });
                  }}
                >
                  {webhooksContentTypeOptions.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </NativeSelectUi>
              </Field.Root>
              <CheckboxUi
                checked={webhook.config.verify_certificate === "true"}
                onCheckedChange={(e) =>
                  setWebhook({
                    ...webhook,
                    config: { ...webhook.config, verify_certificate: e.checked ? "true" : "false" },
                  })
                }
              >
                {t("webhooks.verify_certificate")}
              </CheckboxUi>
              <Field.Root>
                <Field.Label>{t("webhooks.body")}</Field.Label>
                <Textarea
                  bg="selectBg"
                  placeholder={t("webhooks.body_placeholder")}
                  value={webhook.config.body}
                  onChange={(e) =>
                    setWebhook({
                      ...webhook,
                      config: { ...webhook.config, body: e.target.value },
                    })
                  }
                />
              </Field.Root>
            </Flex>
          </Dialog.Body>
          <Dialog.Footer>
            {edit ? <ButtonEditUi onClick={() => submit()} /> : <ButtonAddUi onClick={() => submit()} />}
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default UserWebhookForm;
