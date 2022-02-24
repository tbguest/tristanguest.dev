import {
  faResearchgate,
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./Social.module.css";
import SocialCard from "./SocialCard";

const socialNetworks = [
  { medium: "Github", url: "https://github.com/tbguest", icon: faGithub },
  {
    medium: "LinkedIn",
    url: "https://www.linkedin.com/in/tristanguest",
    icon: faLinkedin,
  },
  {
    medium: "Twitter",
    url: "https://twitter.com/tristan_guest",
    icon: faTwitter,
  },
  {
    medium: "ResearchGate",
    url: "https://www.researchgate.net/profile/Tristan-Guest",
    icon: faResearchgate,
  },
];

export default function Social() {
  return (
    <div className={styles.social_list}>
      {socialNetworks.map(({ medium, url, icon }) => (
        <SocialCard medium={medium} url={url} icon={icon} key={medium} />
      ))}
    </div>
  );
}
