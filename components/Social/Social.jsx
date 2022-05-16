import styles from "./Social.module.css";

import {
  SiHashnode,
  SiTwitter,
  SiResearchgate,
  SiLinkedin,
  SiGithub,
} from "react-icons/si";

export default function Social() {
  return (
    <div className={styles.social_list}>
      {/* {socialNetworks.map(({ medium, url, icon }) => (
        <SocialCard medium={medium} url={url} icon={icon} key={medium} />
      ))} */}
      <div className={styles.card_container}>
        <a
          href={"https://tristanguest.hashnode.dev/"}
          className={styles.social_link}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.icon_container}>
            <SiHashnode className={styles.social_icon} />
          </div>
          <p className={styles.social_text}>{"Blog"}</p>
        </a>
      </div>
      <div className={styles.card_container}>
        <a
          href={"https://www.linkedin.com/in/tristanguest"}
          className={styles.social_link}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.icon_container}>
            <SiLinkedin className={styles.social_icon} />
          </div>
          <p className={styles.social_text}>{"LinkedIn"}</p>
        </a>
      </div>
      <div className={styles.card_container}>
        <a
          href={"https://twitter.com/tristan_guest"}
          className={styles.social_link}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.icon_container}>
            <SiTwitter className={styles.social_icon} />
          </div>
          <p className={styles.social_text}>{"Twitter"}</p>
        </a>
      </div>
      <div className={styles.card_container}>
        <a
          href={"https://github.com/tbguest"}
          className={styles.social_link}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.icon_container}>
            <SiGithub className={styles.social_icon} />
          </div>
          <p className={styles.social_text}>{"GitHub"}</p>
        </a>
      </div>
      <div className={styles.card_container}>
        <a
          href={"https://www.researchgate.net/profile/Tristan-Guest"}
          className={styles.social_link}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.icon_container}>
            <SiResearchgate className={styles.social_icon} />
          </div>
          <p className={styles.social_text}>{"ResearchGate"}</p>
        </a>
      </div>
    </div>
  );
}
