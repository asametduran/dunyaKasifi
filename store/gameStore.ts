import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizResult {
  countryId: string;
  questionId: string;
  correct: boolean;
  timestamp: number;
}

interface GameState {
  playerName: string;
  avatar: string;
  score: number;
  visitedCountries: string[];
  quizResults: QuizResult[];
  setPlayerName: (name: string) => void;
  setAvatar: (avatar: string) => void;
  addScore: (points: number) => void;
  addQuizResult: (result: QuizResult) => void;
  visitCountry: (countryId: string) => void;
  resetProgress: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      playerName: 'Minik Gezgin',
      avatar: 'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=300',
      score: 0,
      visitedCountries: [],
      quizResults: [],
      setPlayerName: (name) => set({ playerName: name }),
      setAvatar: (avatar) => set({ avatar }),
      addScore: (points) => set((state) => ({ score: state.score + points })),
      addQuizResult: (result) =>
        set((state) => ({
          quizResults: [...state.quizResults, result],
          score: state.score + (result.correct ? 50 : 0),
        })),
      visitCountry: (countryId) =>
        set((state) => ({
          visitedCountries: [...state.visitedCountries, countryId],
        })),
      resetProgress: () =>
        set({ score: 0, visitedCountries: [], quizResults: [] }),
    }),
    {
      name: 'game-storage',
    }
  )
);