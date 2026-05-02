export const esperWheel = ['Cosmos', 'Lakshana', 'Anima', 'Incantation', 'Chaos', 'Psyche'];

const roleTargets = { DPS: 1, Support: 1, Survival: 1, Utility: 1 };

export function areAdjacent(a, b) {
  if (!a || !b || a === b) return false;
  const i = esperWheel.indexOf(a);
  const j = esperWheel.indexOf(b);
  if (i < 0 || j < 0) return false;
  const d = Math.abs(i - j);
  return d === 1 || d === esperWheel.length - 1;
}

export function buildTeamAnalysis(team) {
  const filled = team.filter(Boolean);
  const roles = { DPS: 0, Support: 0, Survival: 0, Utility: 0 };
  for (const c of filled) roles[c.role] += 1;

  const activeReactions = [];
  const missingLinks = [];
  for (let i = 0; i < team.length - 1; i += 1) {
    const left = team[i];
    const right = team[i + 1];
    if (!left || !right) {
      missingLinks.push({ pair: [left?.name ?? 'Empty', right?.name ?? 'Empty'], reason: 'Slot missing' });
      continue;
    }
    if (areAdjacent(left.esper, right.esper)) {
      activeReactions.push({ pair: [left.name, right.name], reaction: `${left.esper} ⇄ ${right.esper}` });
    } else {
      missingLinks.push({ pair: [left.name, right.name], reason: 'Incompatible espers' });
    }
  }

  const warnings = [];
  if (roles.Survival === 0) warnings.push('No sustain');
  if (activeReactions.length < 2) warnings.push('No synergy chains');

  const roleScore = Object.entries(roleTargets).reduce((acc, [role, target]) => acc + Math.max(0, 25 - Math.abs(roles[role] - target) * 15), 0);
  const reactionScore = Math.min(activeReactions.length * 20, 40);
  const score = Math.max(0, Math.min(100, Math.round(roleScore * 0.6 + reactionScore)));

  return { roles, activeReactions, missingLinks, warnings, score };
}

export function bestSynergies(character, roster) {
  return roster.filter((c) => c.id !== character.id && areAdjacent(character.esper, c.esper)).slice(0, 4);
}
