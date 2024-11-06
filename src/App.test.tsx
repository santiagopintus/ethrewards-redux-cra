import { render } from "@testing-library/react";
import TestProvider from "./test/TestProvider";
import App from "./App";

test("Renders Hero component", () => {
  const { getByText } = render(
    <TestProvider testPopulated>
      <App />
    </TestProvider>
  );

  expect(
    getByText(
      /Sigue las recompensas de bloques de Ethereum en USD a lo largo del tiempo./i
    )
  ).toBeInTheDocument();
});
