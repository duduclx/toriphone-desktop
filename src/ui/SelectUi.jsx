import { Select, Portal } from "@chakra-ui/react";

const SelectUi = ({ items, extraOptions = null, ...props }) => {

  return (
    <Select.Root {...props}>
      <Select.Control>
        <Select.Trigger bg="bgDefault">
          <Select.ValueText />
        </Select.Trigger>
        <Select.Indicator />
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content bg="bgDefault">
            {extraOptions && (
              <Select.Item key="extra" value="">
                {extraOptions}
                <Select.ItemIndicator />
              </Select.Item>
            )}
            {items.map((item) => (
              <Select.Item key={item.value} item={item}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SelectUi;
