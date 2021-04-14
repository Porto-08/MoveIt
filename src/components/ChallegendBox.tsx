import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/ChallegendBox.module.css";

export function ChallegendBox() {
  const { activeChallenge, resetChallenged, completedChallenged } = useContext(ChallengesContext);
  const {resetCountdown} = useContext(CountdownContext)

  function handleChallengeSucceeded() {
    completedChallenged()
    resetCountdown()
  }

  function handleChallengeFailed() {
    resetChallenged()
    resetCountdown()
  }

  return (
    <div className={styles.challegendBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challegendActive}>
          <header>Ganhe {activeChallenge.amount}xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.png`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
            <footer>
              <button 
                type="button" 
                className={styles.challegendFailedButton}
                onClick={handleChallengeFailed}
              >  
                Falhei
              </button>
              <button
                type="button"
                className={styles.challegendSucceededButton}
                onClick={handleChallengeSucceeded}
              >
                Completei
              </button>
            </footer>
          </main>
        </div>
      ) : (
        <div className={styles.challegendNotActive}>
          <strong>
            Finalize um ciclo para receber desafios a serem completados
          </strong>
          <p>
            <img src="icons/rocket-gif.gif" alt="Level Up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
