import { Combobox, useListCollection } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const ComboboxAsyncUser = ({ chatRoomUserSearch, setRoomUsersUuid, user }) => {
  // requirements
  const { t } = useTranslation();

  // collection
  const { collection, set } = useListCollection({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.uuid,
  });

  // Fonction de recherche
  const handleSearch = async (term) => {
    if (!term) {
      set([]);
      return;
    }
    const items = await chatRoomUserSearch(term, user);
    set(items);
  };

  return (
    <Combobox.Root
      size="lg"
      positioning={{ strategy: "fixed", hideWhenDetached: true }}
      collection={collection}
      onValueChange={(e) => setRoomUsersUuid([{ uuid: e.value[0] }])}
    >
      <Combobox.Control bg="selectBg">
        <Combobox.Input placeholder={t("chat.menu_add_chat_placeholder")} onChange={(e) => handleSearch(e.target.value)} />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content bg="bgElevated">
          <Combobox.Empty>{t("chat.menu_add_empty")}</Combobox.Empty>
          {collection?.items?.map((item) => (
            <Combobox.Item key={item?.uuid} item={item}>
              {item?.name}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};

export default ComboboxAsyncUser;
