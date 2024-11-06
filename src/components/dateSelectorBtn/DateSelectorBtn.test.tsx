import { render, screen, fireEvent } from "@testing-library/react";
import DateSelectorBtn from "./DateSelectorBtn";
import { expect, test, vi } from "vitest";

test("DateSelectorBtn calls setDateSpan with correct dates when clicked", () => {
  const mockSetDateSpan = vi.fn();
  const sinceDate = "2023-10-01";

  render(
    <DateSelectorBtn
      setDateSpan={mockSetDateSpan}
      text="Last Month"
      since={sinceDate}
    />
  );

  const button = screen.getByText("Last Month");
  fireEvent.click(button);

  const tillDate = mockSetDateSpan.mock.calls[0][0].till;
  const parsedTillDate =
    typeof tillDate === "string" ? new Date(tillDate) : tillDate;

  expect(mockSetDateSpan).toHaveBeenCalledWith({
    since: sinceDate,
    till: tillDate,
  });

  expect(parsedTillDate).toBeInstanceOf(Date);
  expect(mockSetDateSpan).toHaveBeenCalledTimes(1);
});
