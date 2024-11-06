import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Hero from "./Hero";

test("Hero: to contain image and text", () => {
  render(<Hero />);

  // Check if the logo image is present with the correct alt text
  const logoImage = screen.getByAltText("EthRewards Logo");
  expect(logoImage).toBeDefined();

  // Check if the descriptive paragraph text is rendered
  const descriptionText = screen.getByText(
    "Sigue las recompensas de bloques de Ethereum en USD a lo largo del tiempo. Gráficos interactivos y análisis de tendencias al alcance de tu mano."
  );
  expect(descriptionText).toBeDefined();
});
