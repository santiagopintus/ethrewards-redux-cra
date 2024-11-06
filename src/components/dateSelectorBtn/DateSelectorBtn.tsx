import { Button } from "@mui/material";
import { DateSpan } from "../../model/model.interface";

type DateSelectorBtnProps = {
  setDateSpan: (dates: DateSpan) => void;
  text: string;
  since: string;
};

/** Returns a generic date button that sets the date span to the given date
 * @param setDateSpan - The function to set the date span
 * @param text - The text of the button
 * @param since - The date to set as the since date
 */
const DateSelectorBtn = ({
  setDateSpan,
  text,
  since,
}: DateSelectorBtnProps) => {
  // till //TODAY AS ISO
  return (
    <Button
      sx={{ fontWeight: 700, height: "100%" }}
      variant="contained"
      onClick={() => setDateSpan({ since, till: new Date().toISOString() })}
    >
      {text}
    </Button>
  );
};

export default DateSelectorBtn;
