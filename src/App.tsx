import Hero from "./components/hero/Hero";
import { ThemeContextProvider } from "./context/ThemeContext";
import AdditionalInfo from "./features/additionalInfo/AdditionalInfo";
import ChartContainer from "./features/chart/ChartContainer";
import DateSelection from "./features/dateSelection/DateSelection";
import "./styles/main.scss";

const Home = () => {
  return (
    <>
      <ThemeContextProvider>
        <Hero />
        <div className="container">
          <DateSelection />
          <ChartContainer />
          <AdditionalInfo />
        </div>
      </ThemeContextProvider>
    </>
  );
};

export default Home;
