import { CloseButton, InputGroup } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

const ContactsFilter = ({ searchText, setSearchText }) => {
  // requirements
  const { t } = useTranslation();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <InputGroup
      width="250px"
      endElement={
        <CloseButton
          size="md"
          onClick={() => {
            setSearchText("");
          }}
          me="-2"
        />
      }
    >
      <InputUi
        type="text"
        value={searchText}
        placeholder={t("contacts.filter_placeholder")}
        onChange={handleSearchChange}
      />
    </InputGroup>
  );
};

export default ContactsFilter;
