import React, { useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { useRosterStore } from './store/useRosterStore';
import { CharacterCard } from './components/CharacterCard';
import { DetailModal } from './components/DetailModal';
import { TeamBuilder } from './components/TeamBuilder';

function App() {
  const s = useRosterStore();
  useEffect(()=>{s.load();},[]);
  useEffect(()=>{s.analyze();},[s.team]);
  const filtered = useMemo(()=>s.characters.filter(c=>(s.filters.role==='All'||c.role===s.filters.role)&&(s.filters.esper==='All'||c.esper===s.filters.esper)&&(s.filters.tier==='All'||c.tier===s.filters.tier)),[s.characters,s.filters]);
  return <div className="p-6 max-w-7xl mx-auto space-y-6">
    <h1 className="text-3xl font-bold text-cyan-300">Neverness Roster System</h1>
    <div className="grid md:grid-cols-4 gap-2">{['role','esper','tier'].map(k=><select key={k} className="glass p-2 rounded" onChange={(e)=>s.setFilter(k,e.target.value)}><option>All</option>{[...new Set(s.characters.map(c=>c[k]))].map(v=><option key={v}>{v}</option>)}</select>)}</div>
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">{filtered.map(c=><CharacterCard key={c.id} c={c} onClick={()=>s.openDetail(c)} />)}</div>
    <section className="space-y-3"><h2 className="text-xl">Team Builder</h2><TeamBuilder team={s.team} characters={s.characters} addToSlot={s.addToSlot} clearSlot={s.clearSlot} />
    {s.analysis && <div className="glass rounded-xl p-4"><div>Score: <span className="text-cyan-300 font-bold">{s.analysis.score}</span></div><div className="text-sm mt-2">Roles: {Object.entries(s.analysis.roles).map(([r,n])=>`${r}:${n}`).join(' | ')}</div><div className="mt-2 text-sm">Active Reactions: {s.analysis.activeReactions.map(r=>r.reaction).join(', ') || 'None'}</div><div className="mt-2 text-amber-300">Warnings: {s.analysis.warnings.join(', ') || 'None'}</div></div>}</section>
    <DetailModal character={s.selected} synergies={s.synergies} onClose={s.closeDetail} />
  </div>
}
createRoot(document.getElementById('root')).render(<App />);
