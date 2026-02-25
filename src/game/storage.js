import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../services/firebase";

const STORAGE_KEY = 'sudoku_save';

export async function saveGame(gameState, timerElapsed) {
  const data = {
    board: gameState.board,
    solution: gameState.solution,
    initial: gameState.initial,
    notes: gameState.notes,
    history: gameState.history,
    mistakes: gameState.mistakes,
    score: gameState.score,
    hintsRemaining: gameState.hintsRemaining,
    difficulty: gameState.difficulty,
    selectedCell: gameState.selectedCell,
    isNotesMode: gameState.isNotesMode,
    timerElapsed,
    timestamp: Date.now()
  };

  try {
    // 1. Local Save (Always)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // 2. Cloud Save (If Logged In)
    const user = auth.currentUser;
    if (user) {
      // Firestore does not support nested arrays (like board[9][9]).
      // We stringify the data to store it as a single string field.
      await setDoc(doc(db, "users", user.uid), { 
        game_data_json: JSON.stringify(data),
        updated_at: Date.now()
      }, { merge: true });
    }
    
    return true;
  } catch (e) {
    console.warn('Failed to save game:', e);
    return false;
  }
}

export async function loadGame() {
  try {
    // 1. Try Cloud Load first if logged in
    const user = auth.currentUser;
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        if (cloudData.game_data_json) {
          return normalizeGameData(JSON.parse(cloudData.game_data_json));
        }
      }
    }

    // 2. Fallback to Local Load
    const localData = localStorage.getItem(STORAGE_KEY);
    if (!localData) return null;
    return normalizeGameData(JSON.parse(localData));

  } catch (e) {
    console.warn('Failed to load game:', e);
    return null;
  }
}

function normalizeGameData(parsed) {
  if (!parsed.board || !parsed.solution || !parsed.difficulty) {
    return null;
  }
  
  return {
    board: parsed.board,
    solution: parsed.solution,
    initial: parsed.initial,
    notes: parsed.notes,
    history: parsed.history || [],
    mistakes: parsed.mistakes || 0,
    score: parsed.score || 0,
    hintsRemaining: parsed.hintsRemaining,
    difficulty: parsed.difficulty,
    selectedCell: parsed.selectedCell,
    isNotesMode: parsed.isNotesMode,
    timerElapsed: parsed.timerElapsed || 0,
    timestamp: parsed.timestamp
  };
}

export function hasSavedGame() {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export async function clearSave() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    const user = auth.currentUser;
    if (user) {
      // We don't necessarily want to delete the cloud document, 
      // just clear the current game data
      await setDoc(doc(db, "users", user.uid), { current_game: null }, { merge: true });
    }
    return true;
  } catch (e) {
    console.warn('Failed to clear save:', e);
    return false;
  }
}
