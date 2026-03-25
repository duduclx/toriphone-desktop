import { useState } from "react";
import { CloseButton, InputGroup } from "@chakra-ui/react";
import { InputUi } from "../ui";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

const TemplateSearchForm = ({ setSearch }) => {
  // requirements
  const { t } = useTranslation();

  // State local pour l'input
  const [query, setQuery] = useState("");

  // Fonction pour déclencher la recherche
  const handleSearch = () => {
    // si query commence par le caractère +, il faut le retirer
    const cleaned = query.replace(/^\++/, "");
    setSearch(cleaned);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InputGroup
      startElement={<FaSearch />}
      endElement={
        <CloseButton
          onClick={() => {
            setQuery("");
            setSearch("");
          }}
          me="-2"
        />
      }
    >
      <InputUi
        flex="1"
        placeholder={t("common.search")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
};

export default TemplateSearchForm;
