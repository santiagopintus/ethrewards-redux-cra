import { Block } from "../../model/model.interface";
import LinePlot from "./LinePlot";
import { render, screen } from "@testing-library/react";
import { useAppSelector } from "../../app/hooks";
import TestProvider from "../../test/TestProvider";

const mockData: Block[] = [
  { reward: 1000, date: { date: "2024-10-01" } },
  { reward: 1500, date: { date: "2024-10-14" } },
  { reward: 2000, date: { date: "2024-10-24" } },
];

test("LinePlot renders correctly with provided data in dark mode", () => {
  const initialState = useAppSelector((state) => state);

  const plotColor = initialState.theme.isDarkMode ? "#00ffff" : "black";
  const linesColor = initialState.theme.isDarkMode ? "#fff" : "#000";

  // Mock function to simulate the setFocusedData
  const mockSetFocusedData = jest.fn();

  render(
    <TestProvider testPopulated>
      <LinePlot
        data={mockData}
        onDataFocus={mockSetFocusedData}
        plotColor={plotColor}
        linesColor={linesColor}
      />
    </TestProvider>
  );

  /* Find svg plot and main line */
  expect(screen.getByTestId("linePlot")).toBeDefined();
  expect(screen.getByTestId("mainLine")).toBeDefined();
});
