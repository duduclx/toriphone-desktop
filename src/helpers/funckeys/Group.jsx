import { NativeSelectUi } from "../../ui";
import { useWazo } from "../../services/WazoProvider";

const Group = ({ destination, setDestination }) => {
   // api
  const { groups } = useWazo();
  console.log("grops", groups)

  // edit
  const change = (item) => {
    const matched = groups.items.find((gr) => gr.id == item);
    setDestination({
      group_id: matched.id || "",
      group_name: matched.name || "",
      label: matched.label || "",
      value: item,
      type: "group",
    });
  };

  return (
    <NativeSelectUi value={destination.value} onChange={(item) => change(item.target.value)}>
      <option value={""}>Select</option>
      {groups.items.map((item, index) => (
        <option key={index} value={item.id}>
          {item.label}
        </option>
      ))}
    </NativeSelectUi>
  );
}

export default Group
