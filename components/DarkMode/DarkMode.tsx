import { useTheme } from "next-themes";
import React, { useState, useEffect, useRef } from "react";
import { IoIosSunny } from "react-icons/io";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";

import styles from "./DarkMode.module.css";

const DarkMode = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const isInitial = useRef(true);

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    isInitial.current = false;
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={styles.theme_toggle_wrapper}>
      <button
        onClick={toggleTheme}
        className={styles.button}
        aria-label={
          theme === "light" ? "Switch to dark mode" : "Switch to light mode"
        }
      >
        {theme === "light" ? (
          <WiMoonAltWaningCrescent4
            className={isInitial.current ? styles.icon_initial : styles.icon}
          />
        ) : (
          <IoIosSunny
            className={isInitial.current ? styles.icon_initial : styles.icon}
          />
        )}
      </button>
    </div>
  );
};

export default DarkMode;
