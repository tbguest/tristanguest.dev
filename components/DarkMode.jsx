import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { WiDaySunny } from "react-icons/wi";
import { WiMoonWaningCrescent3 } from "react-icons/wi";
import styles from "./DarkMode.module.css";

const DarkMode = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className={styles.theme_toggle_wrapper}>
      <div></div>
      {theme === "light" ? (
        <button onClick={toggleTheme} className={styles.button}>
          <WiMoonWaningCrescent3 className={styles.icon} />
        </button>
      ) : (
        <button onClick={toggleTheme} className={styles.button}>
          <WiDaySunny className={styles.icon} />
        </button>
      )}
    </div>
  );
};

export default DarkMode;
