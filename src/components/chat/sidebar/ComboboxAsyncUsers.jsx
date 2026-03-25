import { useState } from "react";
import { Combobox, useListCollection, Tag, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const ComboboxAsyncUsers = ({ chatRoomUserSearch, setRoomUsersUuid, user }) => {
  // requirements
  const { t } = useTranslation();

  // states
  const [selectedUsers, setSelectedUsers] = useState([]);

  // collection
  const { collection, set } = useListCollection({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.uuid,
  });

  const handleSearch = async (term) => {
    if (!term) {
      return;
    }
    const items = (await chatRoomUserSearch(term, user)) ?? [];
    const merged = [...selectedUsers, ...items.filter((i) => !selectedUsers.some((s) => s.uuid === i.uuid))];
    set(merged);
  };

  const removeUser = (uuid) => {
    const updated = selectedUsers.filter((u) => u.uuid !== uuid);
    setSelectedUsers(updated);
    setRoomUsersUuid(updated);
  };

  return (
    <>
    <Wrap gap="2">
      {selectedUsers.map((user) => (
        <Tag.Root key={user.uuid} size="sm" borderRadius="8px" p="2">
          <Tag.Label>{user.name}</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger onClick={() => removeUser(user.uuid)} />
          </Tag.EndElement>
        </Tag.Root>
      ))}
    </Wrap>
      <Combobox.Root
        size="lg"
        multiple
        collection={collection}
        positioning={{ strategy: "fixed", hideWhenDetached: true }}
        value={selectedUsers.map((u) => u.uuid)}
        onValueChange={({ value }) => {
          const selected = collection.items.filter((item) => value.includes(item.uuid));
          setSelectedUsers(selected);
          setRoomUsersUuid(selected.map((u) => ({ uuid: u.uuid })));
        }}
      >
        <Combobox.Control bg="selectBg">
          <Combobox.Input
            placeholder={t("chat.menu_add_group_placeholder")}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Combobox.IndicatorGroup>
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
    </>
  );
};

export default ComboboxAsyncUsers;
