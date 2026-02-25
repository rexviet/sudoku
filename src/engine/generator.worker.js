import { generatePuzzle } from './generator.js';

self.onmessage = function(e) {
  const { difficulty } = e.data;
  const result = generatePuzzle(difficulty);
  self.postMessage(result);
};
