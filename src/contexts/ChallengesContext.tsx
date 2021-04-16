import { LevelupModal } from '../components/LevelupModal'
import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";

// tipagem do objeto de desafios
interface Challenged {
  type: "body" | "eye";
  description: string;
  amount: number;
}

// tipagem dos dados compartilhados entre os componentes
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenged;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenged: () => void;
  resetChallenged: () => void;
  completedChallenged: () => void;
  closeLevelModal: () => void;
}

// tipagem do children da index
interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

// criando a funcao principal que recebe a index como parametro
export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);

  // caculo para o proximo nivel
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  // estado para aparecer o modal
  const [isLevelUpModalOpen, setiIsLevelUpModalOpen] = useState(false)


  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  // funcão para subir o nivel
  function levelUp() {
    setLevel(level + 1);
    setiIsLevelUpModalOpen(true)
  }

  function closeLevelModal() {
    setiIsLevelUpModalOpen(false)
  }

  // funcão para lançar um novo desafio.
  function startNewChallenged() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo Desafio! 🎉", {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  // Função para resetar caso falhe no desafio.
  function resetChallenged() {
    setActiveChallenge(null);
  }

  // funcao de completar desafio
  function completedChallenged() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    // deixando as informacoes globais para todos os componentes
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenged,
        resetChallenged,
        completedChallenged,
        closeLevelModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelupModal />} 
    </ChallengesContext.Provider>
  );
}
