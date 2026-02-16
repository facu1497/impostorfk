export type Role = 'impostor' | 'citizen';

export interface Player {
  id: string;
  name: string;
  role: Role;
  isAlive: boolean;
  votesReceived: number;
}

export interface Category {
  id: string;
  name: string;
  words: string[];
}

export type GamePhase =
  | 'SETUP'
  | 'ROLE_REVEAL'
  | 'ROUND_IN_PROGRESS'
  | 'VOTING'
  | 'ROUND_RESULTS'
  | 'RESULTS';

export interface GameState {
  phase: GamePhase;
  players: Player[];
  impostorCount: number;
  currentCategory: Category | null; // Can be null if custom
  secretWord: string;
  roundDuration: number; // in seconds, default maybe 300 (5 mins)
  revealIndex: number; // For pass-and-play logic
  lastVotedPlayer?: Player;
}

export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export type GameAction =
  | { type: 'ADD_PLAYER'; payload: string }
  | { type: 'REMOVE_PLAYER'; payload: string }
  | { type: 'SET_IMPOSTOR_COUNT'; payload: number }
  | { type: 'START_GAME'; payload: { categoryId: string; customWord?: string } }
  | { type: 'NEXT_REVEAL' }
  | { type: 'START_ROUND' }
  | { type: 'END_ROUND' } // Go to voting
  | { type: 'VOTE_PLAYER'; payload: string }
  | { type: 'NEW_ROUND' }
  | { type: 'CALCULATE_RESULTS' }
  | { type: 'RESET_GAME' };
