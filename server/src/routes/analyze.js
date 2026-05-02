import { Router } from 'express';
import { seedCharacters } from '../data/characters.js';
import { buildTeamAnalysis } from '../logic/esperEngine.js';

export const analyzeRouter = Router();

analyzeRouter.post('/team', (req, res) => {
  const ids = req.body?.ids ?? [];
  const team = ids.slice(0, 4).map((id) => seedCharacters.find((c) => c.id === id) ?? null);
  return res.json(buildTeamAnalysis(team));
});
