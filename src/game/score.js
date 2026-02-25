const BASE_SCORES = {
  Easy: 500,
  Medium: 750,
  Hard: 1000,
  Expert: 1500,
  Master: 2000,
  Extreme: 3000
};

const TIME_PENALTY_PER_SECOND = 1;
const MISTAKE_PENALTY = 50;
const MIN_SCORE = 0;

export function calculateScore(difficulty, elapsedSeconds, mistakes) {
  const baseScore = BASE_SCORES[difficulty] || BASE_SCORES.Medium;
  
  const timePenalty = elapsedSeconds * TIME_PENALTY_PER_SECOND;
  const mistakePenalty = mistakes * MISTAKE_PENALTY;
  
  const finalScore = baseScore - timePenalty - mistakePenalty;
  
  return Math.max(finalScore, MIN_SCORE);
}

export function getBaseScore(difficulty) {
  return BASE_SCORES[difficulty] || BASE_SCORES.Medium;
}

export function getTimePenalty(elapsedSeconds) {
  return elapsedSeconds * TIME_PENALTY_PER_SECOND;
}

export function getMistakePenalty(mistakes) {
  return mistakes * MISTAKE_PENALTY;
}
