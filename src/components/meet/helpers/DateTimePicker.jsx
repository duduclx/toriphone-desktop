import { HStack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

const dateToInputs = (date) => ({
  date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
  time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
});

const inputsToDate = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return null;

  const [y, m, d] = dateStr.split("-").map(Number);
  const [h, min] = timeStr.split(":").map(Number);

  return new Date(y, m - 1, d, h, min, 0, 0);
};

const normalizeDate = (value) => {
  if (!value) return null;

  if (value instanceof Date && !isNaN(value)) {
    return value;
  }

  if (typeof value === "string") {
    const d = new Date(value);
    return isNaN(d) ? null : d;
  }

  return null;
};

const DateTimePicker = ({ value, onChange }) => {
  // values
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const d = normalizeDate(value);

    if (d) {
      const v = dateToInputs(d);
      setDate(v.date);
      setTime(v.time);
    } else {
      setDate("");
      setTime("");
    }
  }, [value]);

  const update = (newDate, newTime) => {
    const d = inputsToDate(newDate, newTime);
    if (d) onChange(d);
  };

  return (
    <HStack align="stretch" spacing="2">
      <Input
        type="date"
        value={date}
        bg="selectBg"
        onChange={(e) => {
          setDate(e.target.value);
          update(e.target.value, time);
        }}
      />

      <Input
        type="time"
        step={300} // 5 minutes
        value={time}
        bg="selectBg"
        onChange={(e) => {
          setTime(e.target.value);
          update(date, e.target.value);
        }}
      />
    </HStack>
  );
};

export default DateTimePicker;
