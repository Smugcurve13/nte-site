import { Router } from 'express';
import { seedCharacters } from '../data/characters.js';
import { bestSynergies } from '../logic/esperEngine.js';

export const characterRouter = Router();

characterRouter.get('/', (req, res) => {
  res.json(seedCharacters);
});

characterRouter.get('/:id/synergies', (req, res) => {
  const found = seedCharacters.find((c) => c.id === req.params.id);
  if (!found) return res.status(404).json({ message: 'Character not found' });
  return res.json(bestSynergies(found, seedCharacters));
});
