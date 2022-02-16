import styles from "./DarkMode.module.css";
import { WiDaySunny } from "react-icons/wi";
import { WiMoonWaningCrescent3 } from "react-icons/wi";

// 1
const setDark = () => {
  // 2
  localStorage.setItem("theme", "dark");

  // 3
  document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
};

// 4
const storedTheme = localStorage.getItem("theme");

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
  storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}

// 5
const toggleTheme = (e) => {
  if (e.target.checked) {
    setDark();
  } else {
    setLight();
  }
};

const DarkMode = () => {
  return (
    <div className={styles.toggle_theme_wrapper}>
      <WiDaySunny className={styles.icon} />
      <label className={styles.toggle_theme} htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          // 6
          onChange={toggleTheme}
          defaultChecked={defaultDark}
        />
        <div className={styles.slider_round}></div>
      </label>
      <WiMoonWaningCrescent3 className={styles.icon} />
    </div>
  );
};

export default DarkMode;
