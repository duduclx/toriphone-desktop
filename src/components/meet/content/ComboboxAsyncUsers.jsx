import { useState } from "react";
import { Combobox, useListCollection, Tag, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const ComboboxAsyncUsers = ({ owners, setOwners, setOwnersUuid }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { userSearch } = useWazo();
  const { user } = useAuth();

  // states
  const [selectedUsers, setSelectedUsers] = useState(owners);

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
    const items = (await userSearch(term)) ?? [];
    const merged = [...selectedUsers, ...items.filter((i) => !selectedUsers.some((s) => s.uuid === i.uuid))];
    set(merged);
  };

  const removeUser = (uuid) => {
    const updated = selectedUsers.filter((u) => u.uuid !== uuid);
    setSelectedUsers(updated);
    setOwners(updated);
    setOwnersUuid(updated.map((u) => u.uuid));
  };

  return (
    <>
      <Wrap gap="2">
        {selectedUsers.map((u) => (
          <Tag.Root key={u.uuid} size="sm" borderRadius="8px" p="2" colorPalette={u.uuid !== user.uuid  ? "cyan" : "gray"}>
            <Tag.Label>{u.name}</Tag.Label>
            <Tag.EndElement>
              {u.uuid !== user.uuid && <Tag.CloseTrigger onClick={() => removeUser(u.uuid)} />}
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
          setOwners(selected);
          setOwnersUuid(selected.map((u) => u.uuid));
        }}
      >
        <Combobox.Control bg="selectBg">
          <Combobox.Input placeholder={t("meetings.admins_add")} onChange={(e) => handleSearch(e.target.value)} />
          <Combobox.IndicatorGroup>
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content bg="bgElevated">
            <Combobox.Empty>{t("meetings.admins_none")}</Combobox.Empty>
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
