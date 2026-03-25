import { useState } from "react";
import { Button, Combobox, Dialog, Field, HStack, useListCollection } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const PhoneCallTransfer = ({ initialRef, open, onOpenChange, callSession }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { directTransfer, indirectTransfer, indirectTransferEnd, searchUsers } = useWazo();
  const { user } = useAuth();

  // states
  const [target, setTarget] = useState("");
  const [currentAtxfer, setCurrentAtxfer] = useState({});
  const [openAtxFer, setOpenAtxFer] = useState(false);

  // collection
  const { collection, set } = useListCollection({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.number,
  });

  // Fonction de recherche
  const handleSearch = async (term) => {
    if (!term) {
      set([]);
      return;
    }
    const items = await searchUsers(term, user);;
    set(items);
  };

  const onAtxfer = (callSession, target) => {
    const Atxfer = indirectTransfer(callSession);
    Atxfer.init(target);
    setOpenAtxFer(true);
    setCurrentAtxfer(Atxfer);
  };

  const cancelAtxfer = () => {
    currentAtxfer.cancel();
    setCurrentAtxfer(null);
    setOpenAtxFer(false);
    onClose();
  };

  const completeAtxfer = () => {
    currentAtxfer.complete();
    indirectTransferEnd(callSession);
    setCurrentAtxfer(null);
    setOpenAtxFer(false);
    onClose();
  };

  return (
    <Dialog.Root initialFocusEl={initialRef} open={open} onOpenChange={onOpenChange}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="bgDefault">
          <Dialog.Header alignSelf="center">
            <Dialog.Title>{t("phone.lines_transfer_title")}</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            <Field.Root>
              <Field.Label>{t("phone.lines_transfer_destination")}</Field.Label>
              <Combobox.Root
                size="lg"
                positioning={{ strategy: "fixed", hideWhenDetached: true }}
                collection={collection}
                onValueChange={(e) => setTarget(e.value[0])}
              >
                <Combobox.Control bg="selectBg">
                  <Combobox.Input
                    placeholder={t("chat.menu_add_chat_placeholder")}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <Combobox.IndicatorGroup>
                    <Combobox.ClearTrigger />
                    <Combobox.Trigger />
                  </Combobox.IndicatorGroup>
                </Combobox.Control>
                <Combobox.Positioner>
                  <Combobox.Content bg="bgElevated">
                    <Combobox.Empty>{t("chat.menu_add_empty")}</Combobox.Empty>
                    {collection?.items?.map((item) => (
                      <Combobox.Item key={item?.number} item={item}>
                        {item?.name}
                        <Combobox.ItemIndicator />
                      </Combobox.Item>
                    ))}
                  </Combobox.Content>
                </Combobox.Positioner>
              </Combobox.Root>
            </Field.Root>
          </Dialog.Body>
          <Dialog.Footer>
            {openAtxFer ? (
              <HStack>
                {currentAtxfer.newSession._state == "Established" && (
                  <Button colorPalette="secondary" onClick={() => completeAtxfer()}>
                    {t("phone.lines_transfer_confirm")}
                  </Button>
                )}
                <Button colorPalette="danger" onClick={() => cancelAtxfer()}>
                  {t("phone.lines_transfer_cancel")}
                </Button>
              </HStack>
            ) : (
              <HStack gap="4">
                <Button colorPalette="primary" onClick={() => directTransfer(callSession, target)}>
                  {t("phone.lines_transfer_direct")}
                </Button>
                <Button colorPalette="secondary" onClick={() => onAtxfer(callSession, target)}>
                  {t("phone.lines_transfer_indirect")}
                </Button>
              </HStack>
            )}
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default PhoneCallTransfer;
