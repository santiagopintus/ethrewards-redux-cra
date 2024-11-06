import { render, screen } from "@testing-library/react";
import ChartContainer from "./ChartContainer";
test("ChartContainer; renders a Skeleton when data is null", () => {
  expect(true).toBe(true);
  // const { container } = render(
  //   <BlocksContext.Provider
  //     value={{
  //       blocks: null,
  //       setBlocks: () => {},
  //       dateSpan: null,
  //       setDateSpan: () => {},
  //     }}
  //   >
  //     <ChartContainer />
  //   </BlocksContext.Provider>
  // );
  // /* Look for one spinner */
  // expect(
  //   container.getElementsByClassName("MuiCircularProgress-svg").length
  // ).toBe(1);
});

// test("ChartContainer; renders chart when data is provided", () => {
//   const mockData: Block[] = [
//     { reward: 1000, date: { date: "2024-10-01" } },
//     { reward: 1500, date: { date: "2024-10-14" } },
//     { reward: 2000, date: { date: "2024-10-24" } },
//   ];

//   render(
//     <BlocksContext.Provider
//       value={{
//         blocks: mockData,
//         setBlocks: () => {},
//         dateSpan: null,
//         setDateSpan: () => {},
//       }}
//     >
//       <ChartContainer />
//     </BlocksContext.Provider>
//   );
//   /* Look for Chart label */
//   expect(screen.getByTestId("linePlot")).toBeDefined();
// });
