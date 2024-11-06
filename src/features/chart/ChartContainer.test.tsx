import { render, screen } from "@testing-library/react";
import ChartContainer from "./ChartContainer";
import { expect, test } from "vitest";
import TestProvider from "../../test/TestProvider";

test("ChartContainer: renders a Skeleton when data is null", () => {
  const { container } = render(
    <TestProvider testPopulated={false}>
      <ChartContainer />
    </TestProvider>
  );

  // /* Look for one spinner */
  expect(
    container.getElementsByClassName("MuiCircularProgress-svg").length
  ).toBe(1);

  // Expect linePlot and mainLine to be absent
  expect(screen.queryByTestId("linePlot")).toBeNull();
  expect(screen.queryByTestId("mainLine")).toBeNull();
});

test("ChartContainer; renders chart when data is provided", () => {
  render(
    <TestProvider testPopulated>
      <ChartContainer />
    </TestProvider>
  );

  expect(screen.getByTestId("linePlot")).toBeDefined();
  expect(screen.getByTestId("mainLine")).toBeDefined();
});
