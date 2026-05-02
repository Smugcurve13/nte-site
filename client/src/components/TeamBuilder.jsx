export function TeamBuilder({ team, characters, addToSlot, clearSlot }) {
  const byId = Object.fromEntries(characters.map(c=>[c.id,c]));
  return <div className="grid grid-cols-2 gap-3">{team.map((slot, idx)=><div key={idx} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>{const id=e.dataTransfer.getData('text/plain'); if(byId[id]) addToSlot(idx, byId[id]);}} className="glass min-h-24 rounded-xl p-3">{slot ? <div className="flex justify-between items-center"><div>{slot.name}<div className="text-xs text-zinc-400">{slot.role} · {slot.esper}</div></div><button onClick={()=>clearSlot(idx)}>✕</button></div> : <div className="text-zinc-500">Drop character to slot {idx+1}</div>}</div>)}</div>
}
