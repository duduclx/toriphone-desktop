import { NativeSelectUi } from "../../ui";
import { useWazo } from "../../services/WazoProvider";

const Conference = ({ destination, setDestination }) => {
  // api
  const { conferences } = useWazo();

  // edit
  const change = (item) => {
    const matched = conferences.items.find((conf) => conf.id == item);
    setDestination({
      conference_id: matched.id || "",
      conference_name: matched.name || "",
      label: matched.name || "",
      value: item,
      type: "conference",
    });
  };

  return (
    <NativeSelectUi value={destination.value} onChange={(item) => change(item.target.value)}>
      <option value={""}>Select</option>
      {conferences.items.map((item, index) => (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      ))}
    </NativeSelectUi>
  );
};

export default Conference;
