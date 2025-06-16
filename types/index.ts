export interface Country {
  id: string;
  name: string;
  capital: string;
  flagUrl: string;
  region: string;
  population: number;
  mapPosition: {
    x: number;
    y: number;
  };
  description: string;
  details: {
    language: string;
    currency: string;
    food: string[];
    music: string[];
    landmarks: string[];
  };
  quiz: {
    multipleChoice: Question[];
    trueFalse: Question[];
    matching: MatchingQuestion[];
  };
  visited: boolean;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface MatchingQuestion {
  id: string;
  pairs: {
    item: string;
    match: string;
  }[];
}

export interface UserProgress {
  visitedCountries: string[];
  completedQuizzes: string[];
  stamps: string[];
}