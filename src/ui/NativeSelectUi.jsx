import { NativeSelect } from "@chakra-ui/react";

const NativeSelectUi = ({ children, ...props }) => {
  return (
    <NativeSelect.Root size="lg">
      <NativeSelect.Field
        bg="selectBg"
        borderColor="selectBorder"
        css={{
          "& > option": {
            background: "selectBg",
            padding: "0.5rem",
          },
          "& > option:hover": {
            background: "selectHover",
          },
        }}
        {...props}
      >
        {children}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
};

export default NativeSelectUi;
