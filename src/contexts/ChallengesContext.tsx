import { createContext, useState, ReactNode } from "react";
import challenges from '../../challenges.json'

// tipagem do objeto de desafios
interface Challenged {
  type: 'body' | 'eye'; 
  description: string, 
  amount: number, 
}

// tipagem dos dados compartilhados entre os componentes
interface ChallengesContextData {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  activeChallenge: Challenged,
  experienceToNextLevel: number,
  levelUp: () => void,
  startNewChallenged: () => void,
  resetChallenged: () => void,
  completedChallenged: () => void,
}

// tipagem do children da index
interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

// criando a funcao principal que recebe a index como parametro
export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null)

  // caculo para o proximo nivel
  const experienceToNextLevel = Math.pow((level + 1) * 4 ,2)

  // funcão para subir o nivel
  function levelUp() {
    setLevel(level + 1);
  }

  // funcão para lançar um novo desafio. 
  function startNewChallenged() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
  
    setActiveChallenge(challenge)
  }

  // Função para resetar caso falhe no desafio.
  function resetChallenged() {
    setActiveChallenge(null)
  }

  // funcao de completar desafio
  function completedChallenged() {
    if(!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount; 
    
    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp(); 
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
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
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
