import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";
import tablerIconCalendar from "@/public/logo/tablerIconCalendar.svg";
import Image from "next/image";
import styles from "@/styles/components/helpers/DateTimePicker.module.css";
import { format } from "date-fns";
import { useMediaQuery } from "react-responsive"; // Импорт из библиотеки react-responsive

registerLocale("uk", uk);

interface DateTimePickerProps {
  onDateTimeSelect: (selectedDate: string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onDateTimeSelect,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Определение, является ли устройство мобильным

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      const formattedDate = format(date, "dd MMMM yyyy HH:mm", { locale: uk });
      onDateTimeSelect(formattedDate);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const preventOverflowModifier = {
    name: "preventOverflow",
    options: {
      enabled: true,
      escapeWithReference: true,
      boundariesElement: "viewport",
    },
  };

  return (
    <div>
      {!showDatePicker ? (
        <button
          onClick={openDatePicker}
          className={styles.buttonDateTime}>
          <Image
            src={tablerIconCalendar}
            alt="calendar"
            width={24}
            height={24}
          />
        </button>
      ) : (
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          showTimeInput
          timeInputLabel="Час"
          timeFormat="HH:mm"
          timeIntervals={15}
          withPortal
          portalId="root-portal"
          dateFormat="dd MMMM yyyy HH:mm"
          locale="uk"
          // popperPlacement="top"
          popperModifiers={[preventOverflowModifier]}
          minDate={new Date()}
          className={styles.customDatePicker}
        />
      )}
    </div>
  );
};

export default DateTimePicker;
