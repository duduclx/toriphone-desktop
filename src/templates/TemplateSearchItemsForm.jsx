import { useState } from "react";
import { InputGroup, IconButton } from "@chakra-ui/react";
import { InputUi } from "../ui";
import { FaListOl } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

import { useWazo } from "../services/WazoProvider";

const TemplateSearchItemsForm = () => {
  // api
  const { appItemsPerPage, setAppItemsPerPage } = useWazo();

  // value
  const [items, setItems] = useState(appItemsPerPage);

  const submit = () => {
    const parsedItems = parseInt(items, 10);
    if (!isNaN(parsedItems) && parsedItems > 0) {
      setAppItemsPerPage(parsedItems);
    } else {
      setItems(appItemsPerPage.toString()); // Remet l'ancienne valeur en cas d'erreur
    }
  };

  return (
    <InputGroup
      startElement={<FaListOl />}
      endElement={
        <IconButton variant="ghost" me="-2" onClick={submit}>
          <FaSave />
        </IconButton>
      }
    >
      <InputUi
        type="number"
        min="1"
        value={items}
        onChange={(e) => setItems(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
    </InputGroup>
  );
};

export default TemplateSearchItemsForm;
