import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/Porto-08.png" alt="Samuel Porto" />

      <div>
        <strong>Samuel Porto</strong>
        <p>
          <img src="icons/level.png" alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
