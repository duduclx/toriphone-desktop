import { NativeSelectUi } from "../../ui";
import { useWazo } from "../../services/WazoProvider";

const Queue = ({ destination, setDestination }) => {

  // api
  const { queues } = useWazo();

  // edit
  const change = (value) => {
    const matched = queues.items.find((item) => item.id == value);
    setDestination({
      queue_id: matched.id || "",
      queue_label: matched.name || "",
      label: matched.name || "",
      value: value,
      type: "queue",
    });
  };

  return (
    <NativeSelectUi value={destination.value} onChange={(item) => change(item.target.value)}>
      <option>Select</option>
      {queues.items.map((item, index) => (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      ))}
    </NativeSelectUi>
  );
}

export default Queue

/*
const newDest = {
      skill_rule_id: destination?.skill_rule_id ? destination.skill_rule_id : null,
      skill_rule: destination?.skill_rule ? destination.skill_rule : null,
      queue_id: item.value,
      queue_label: item.label,
      type: "queue",
      label: item.label,
    };
*/