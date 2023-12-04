import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk"; // Импорт украинской локализации
import tablerIconCalendar from "@/public/logo/tablerIconCalendar.svg";
import Image from "next/image";
import styles from "@/styles/components/helpers/DateTimePicker.module.css";
import { format } from "date-fns";

// Регистрация украинской локализации
registerLocale("uk", uk);

interface DateTimePickerProps {
  onDateTimeSelect: (selectedDate: string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onDateTimeSelect,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      const formattedDate = format(date, "dd MMMM yyyy HH:mm", { locale: uk }); // Форматирование даты
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
      escapeWithReference: false,
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
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd MMMM yyyy HH:mm"
          timeCaption="Час"
          locale="uk" // Применение украинской локализации
          popperPlacement="bottom-start"
          popperModifiers={[preventOverflowModifier]}
          minDate={new Date()}
          className={styles.customDatePicker}
        />
      )}
    </div>
  );
};

export default DateTimePicker;
