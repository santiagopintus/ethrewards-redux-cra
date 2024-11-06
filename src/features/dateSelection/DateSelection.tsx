import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { getDateDaysAgoAsISO } from "../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DateSpan } from "../../model/model.interface";
import { setDateSpan } from "./dateSelectionSlice";
import { clearBlocks } from "../blocks/blocksSlice";
import DateSelectorBtn from "../../components/dateSelectorBtn/DateSelectorBtn";
/* Styles */
import s from "./dateSelection.module.scss";
import { useEffect } from "react";

/** This component renders the date selection options and date pickers
 */
const DateSelection = () => {
  const dispatch = useAppDispatch();
  const dates = useAppSelector((state) => state.dateSelection.value);

  const dateSelectionOptions = [
    { label: "1M", daysAgo: 31 },
    { label: "3M", daysAgo: 92 },
    { label: "6M", daysAgo: 184 },
    { label: "1Y", daysAgo: 366 },
  ];

  useEffect(() => {
    /* Clear current blocks on date change to trigger loading*/
    if (dates) {
      dispatch(clearBlocks());
    }
  }, [dates]);

  const setNewDate = (selectedDate: Date, type: keyof DateSpan) => {
    const newDateSpan = {
      ...dates,
      [type]: selectedDate.toISOString(),
    } as DateSpan;

    dispatch(setDateSpan(newDateSpan));
  };

  const onDateChange = (newDate: Dayjs | null, type: keyof DateSpan) => {
    if (newDate) {
      setNewDate(newDate.toDate(), type);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={s.dateSelectionOptions}>
        <div className={s.preselectedDateButtons}>
          {dateSelectionOptions.map((dateOption) => (
            <DateSelectorBtn
              key={dateOption.label}
              setDateSpan={(d) => dispatch(setDateSpan(d))}
              text={dateOption.label}
              since={getDateDaysAgoAsISO(dateOption.daysAgo)}
            />
          ))}
        </div>
        <div className={s.datePickersContainer}>
          {/* Since date */}
          <DatePicker
            maxDate={dayjs(new Date())}
            minDate={dayjs(new Date("2015-08-01"))}
            label="Desde"
            value={dayjs(dates?.since)}
            onChange={(d) => onDateChange(d, "since")}
            format="DD/MM/YYYY"
            sx={{ width: 150 }}
          />
          {/* Until date */}
          <DatePicker
            maxDate={dayjs(new Date())}
            minDate={dayjs(dates?.since)}
            label="Hasta"
            value={dayjs(dates?.till)}
            onChange={(d) => onDateChange(d, "till")}
            format="DD/MM/YYYY"
            sx={{ width: 150 }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default DateSelection;
