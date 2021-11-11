import style from "./header.module.scss";
import logo from "../../assets/images/logo.png";

export const Header = () => {
    return (
        <header className={style.header}>
            <div className="d-flex align-items-center">
            <img src={logo} alt="website logo" className={style.logo}/>
            <span className={style.name}>Movr Network</span>
            </div>
        </header>
    )
}