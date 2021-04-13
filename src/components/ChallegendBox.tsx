import styles from "../styles/components/ChallegendBox.module.css";

export function ChallegendBox() {
  const hasActiveChallegend = true;

  return (
    <div className={styles.challegendBoxContainer}>
      {hasActiveChallegend ? (
        <div className={styles.challegendActive}>
          <header>Ganhe 400xp</header>
          <main>
            <img src="icons/body.png" alt=""/>
            <strong>Novo desafio</strong>
            <p>Levante e faça uma caminha de 3 minutos</p>
            <footer>
              <button 
                type="button"
                className={styles.challegendFailedButton}
              >
                Falhei
              </button>
              <button 
                type="button"
                className={styles.challegendSucceededButton}
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
