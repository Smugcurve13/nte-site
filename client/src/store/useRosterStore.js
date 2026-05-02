import { create } from 'zustand';

const api = 'http://localhost:4000/api';

export const useRosterStore = create((set, get) => ({
  characters: [], filters: { role: 'All', esper: 'All', tier: 'All' }, selected: null, synergies: [], team: [null,null,null,null], analysis: null,
  load: async () => { const data = await fetch(`${api}/characters`).then(r=>r.json()); set({ characters: data }); },
  setFilter: (k,v) => set((s)=>({filters:{...s.filters,[k]:v}})),
  openDetail: async (character) => { const synergies = await fetch(`${api}/characters/${character.id}/synergies`).then(r=>r.json()); set({ selected: character, synergies }); },
  closeDetail: () => set({ selected: null, synergies: [] }),
  addToSlot: (idx, ch) => set((s) => {
    if (s.team.some((member) => member?.id === ch.id)) return s;
    const next = [...s.team]; next[idx] = ch; return { team: next };
  }),
  analyze: async () => { const ids = get().team.map(c=>c?.id).filter(Boolean); const analysis = await fetch(`${api}/analyze/team`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ids})}).then(r=>r.json()); set({analysis}); },
  clearSlot: (idx)=>set((s)=>{const t=[...s.team]; t[idx]=null; return {team:t};})
}));
