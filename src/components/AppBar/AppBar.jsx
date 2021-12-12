import Navigation from "../../components/Navigation/Navigation";
import s from "./AppBar.module.css";
import NavNavigation from "../NavNavigation/NavNavigation";

export default function Appbar() {
  return (
    <>
      <header className={s.header}>
        <Navigation />
        <NavNavigation />
      </header>
    </>
  );
}
