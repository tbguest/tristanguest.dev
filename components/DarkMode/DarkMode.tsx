import { useEffect, useRef, useState } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";

import styles from "./DarkMode.module.css";

const DarkMode = () => {
  const [darkTheme, setDarkTheme] = useState<boolean | undefined>(undefined);

  // Used to prevent the button animation on page load
  const isInitial = useRef(true);

  const handleToggle = () => {
    setDarkTheme(!darkTheme);
    isInitial.current = false;
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    setDarkTheme(initialColorValue === "dark");
  }, []);

  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        document.documentElement.setAttribute("data-theme", "dark");
        window.localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        window.localStorage.setItem("theme", "light");
      }
    }
  }, [darkTheme]);

  return (
    <div className={styles.theme_toggle_wrapper}>
      <button
        onClick={handleToggle}
        className={styles.button}
        aria-label={darkTheme ? "Activate light mode" : "Activate dark mode"}
      >
        <div
          className={
            isInitial.current
              ? styles.icon_wrapper_initial
              : styles.icon_wrapper
          }
        >
          {!darkTheme ? (
            <IoIosSunny className={styles.icon} />
          ) : (
            <IoIosMoon className={styles.icon} />
          )}
        </div>
      </button>
    </div>
  );
};

export default DarkMode;
