import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SocialCard.module.css";

export default function SocialCard({ medium, url, icon }) {
  return (
    <div className={styles.card_container}>
      <a
        href={url}
        className={styles.social_link}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={icon} className={styles.social_icon} />
        <p className={styles.social_text}>{medium}</p>
      </a>
    </div>
  );
}
