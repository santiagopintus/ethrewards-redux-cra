import s from "./hero.module.scss";
import logo from "../../eth-logo.svg";

/** Renders the logo and a brief description of the project */
const Hero = () => {
  return (
    <div className={s.heroContainer}>
      <div className="container">
        <a href="/" className={s.logoContainer}>
          <img
            className={s.logo}
            src={logo}
            alt="EthRewards Logo"
            width={324}
            height={62}
          />
        </a>
        <p>
          Sigue las recompensas de bloques de Ethereum en USD a lo largo del
          tiempo. Gráficos interactivos y análisis de tendencias al alcance de
          tu mano.
        </p>
      </div>
    </div>
  );
};

export default Hero;
