import { useState } from "react";
import { Flex, Text, Button, Spacer, Box } from "@chakra-ui/react";
import { CheckboxUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import CallLogFilteredLimit from "./CallLogFilteredLimit";

const CallLogFilter = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { callLogFromDateGet, callLogFilterReset, callLogSearchBy, callLogSearch, setAppCurrentPage } = useWazo();

  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(5);
  const [dateFrom, setDateFrom] = useState("");
  const [dateNumber, setDateNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([false, false, false, false]);
  const [field, setField] = useState("");
  const [value, setValue] = useState("");

  const handleChangeLimit = (e) => {
    setLimit(e.target.value);
  };

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleChangeDateFrom = (e) => {
    setDateFrom(e.target.value);
  };

  const handleChangeDateNumber = (e) => {
    setDateNumber(e.target.value);
  };

  const handleChangeTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeCheckbox = (internal, inbound, outbound, recorded) => {
    setSelectedItems([internal, inbound, outbound, recorded]);
    switch (true) {
      case internal:
        setField("call_direction");
        setValue("internal");
        break;
      case inbound:
        setField("call_direction");
        setValue("inbound");
        break;
      case outbound:
        setField("call_direction");
        setValue("outbound");
        break;
      case recorded:
        setField("recorded");
        setValue("true");
        break;
      default:
        setField("");
        setValue("");
        break;
    }
  };

  const handleByDate = () => {
    callLogFromDateGet(new Date(dateFrom), dateNumber);
  };

  const handleBySearch = () => {
    callLogSearch(searchTerm, limit);
  };

  const handleByField = () => {
    callLogSearchBy(field, value, limit);
  };

  const handleReset = () => {
    setLimit(5);
    setDateFrom("");
    setDateNumber("");
    setSearchTerm("");
    handleChangeCheckbox(false, false, false, false);
    callLogFilterReset();
  };

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return (
    <Flex flexDirection="column" flex="1" justifyContent="flex-start" alignContent="center">
      <NativeSelectUi
        placeholder={t("callLog.filter_placeholder")}
        value={filter}
        onChange={(e) => handleChangeFilter(e)}
      >
        <option value="byDate">{t("callLog.filter_by_date")}</option>
        <option value="bySearch">{t("callLog.filter_by_name")}</option>
        <option value="byType">{t("callLog.filter_by_type")}</option>
      </NativeSelectUi>
      <Spacer />
      {filter === "byDate" && (
        <Flex flexDirection="column" gap="4">
          <Box mt="4">
            <Text mb="2">{t("callLog.filter_date")}</Text>
            <InputUi
              type="date"
              value={dateFrom}
              max={formattedDate}
              onChange={(e) => handleChangeDateFrom(e)}
            />
          </Box>
          <Flex flexDirection="row" flex="1" justifyContent="space-between" alignItems="center">
            <Box>
              <Text>{t("callLog.filter_date_number")}</Text>
            </Box>
            <Box width="150px">
              <InputUi
                variant="filled"
                placeholder="ex : 0123456789"
                value={dateNumber}
                onChange={(e) => handleChangeDateNumber(e)}
              />
            </Box>
          </Flex>
          <Box>
            <Button width="100%" colorPalette="primary" onClick={() => {
              setAppCurrentPage("callLog");
              handleByDate()}}>
              {t("callLog.filter_date_button")}
            </Button>
          </Box>
        </Flex>
      )}
      {filter === "bySearch" && (
        <Flex flexDirection="column" gap="4">
          <Box mt="4">
            <Text mb="2">{t("callLog.filter_name")}</Text>
            <InputUi
              placeholder={t("callLog.filter_name_placeholder")}
              value={searchTerm}
              onChange={(e) => handleChangeTerm(e)}
            />
          </Box>
          <CallLogFilteredLimit action={handleChangeLimit} value={limit} />
          <Box>
            <Button width="100%" colorPalette="primary" onClick={() => {
              setAppCurrentPage("callLog");
              handleBySearch()}}>
              {t("callLog.filter_name_button")}
            </Button>
          </Box>
        </Flex>
      )}
      {filter === "byType" && (
        <Flex flexDirection="column" gap="4">
          <Box mt="4">
            <Flex justifyContent="space-between" px="4" flex={1}>
              <Box w="100%">
                <CheckboxUi
                  value="internal"
                  checked={selectedItems[0]}
                  onCheckedChange={() => handleChangeCheckbox(true, false, false, false)}
                >
                  {t("callLog.filter_type_internal")}
                </CheckboxUi>
              </Box>
              <Box w="100%">
                <CheckboxUi
                  value="inbound"
                  checked={selectedItems[1]}
                  onCheckedChange={() => handleChangeCheckbox(false, true, false, false)}
                >
                  {t("callLog.filter_type_inbound")}
                </CheckboxUi>
              </Box>
            </Flex>
            <Flex justifyContent="space-between" px="4" flex={1}>
              <Box w="100%">
                <CheckboxUi
                  value="outbound"
                  checked={selectedItems[2]}
                  onCheckedChange={() => handleChangeCheckbox(false, false, true, false)}
                >
                  {t("callLog.filter_type_outbound")}
                </CheckboxUi>
              </Box>
              <Box w="100%">
                <CheckboxUi
                  value="recorded"
                  checked={selectedItems[3]}
                  onCheckedChange={() => handleChangeCheckbox(false, false, false, true)}
                >
                  {t("callLog.filter_type_recorded")}
                </CheckboxUi>
              </Box>
            </Flex>
          </Box>
          <CallLogFilteredLimit action={handleChangeLimit} value={limit} />
          <Box>
            <Button width="100%" colorPalette="primary" onClick={() => {
              setAppCurrentPage("callLog");
              handleByField()}}>
              {t("callLog.filter_type_button")}
            </Button>
          </Box>
        </Flex>
      )}

      <Spacer />
      <Box my="4">
        <Button width="100%" colorPalette="danger" onClick={() => {
          setAppCurrentPage("callLog");
          handleReset()}}>
          {t("callLog.filter_reset")}
        </Button>
      </Box>
    </Flex>
  );
};

export default CallLogFilter;
