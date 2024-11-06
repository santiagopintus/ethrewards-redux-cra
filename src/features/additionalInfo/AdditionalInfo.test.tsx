import { render, screen } from "@testing-library/react";
import AdditionalInfo from "./AdditionalInfo";
import { Block } from "../../model/model.interface";
import TestProvider from "../../test/TestProvider";
import { expect, test } from "vitest";

test("AdditionalInfo; displays skeletons when data is null", () => {
  const { container } = render(
    <TestProvider testPopulated={false}>
      <AdditionalInfo />
    </TestProvider>
  );
  container.getElementsByClassName("MuiSkeleton-root");
  expect(
    container.getElementsByClassName("MuiSkeleton-root").length
  ).toBeGreaterThan(3);
  container.remove();
});

test("AdditionalInfo; displays stats correctly when data is provided", () => {
  render(
    <TestProvider testPopulated>
      <AdditionalInfo />
    </TestProvider>
  );

  expect(screen.getAllByText("Estadísticas adicionales:")).toBeDefined();
  expect(screen.getByText("3")).toBeDefined();
  expect(screen.getByText("$1,500")).toBeDefined();
  expect(screen.getByText("$1,000")).toBeDefined();
  expect(screen.getByText("$2,000")).toBeDefined();
});
