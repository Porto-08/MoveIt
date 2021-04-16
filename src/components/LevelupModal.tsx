import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/LevelupModal.module.css";

export function LevelupModal() {
  const {level, closeLevelModal} = useContext(ChallengesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Voce alcançou um novo level!</p>

        <button type='button' onClick={closeLevelModal}>
          Fechar
        </button>
      </div>
    </div>
  );
}
