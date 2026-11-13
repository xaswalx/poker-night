import type { Player } from '../demo';
import Avatar from './Avatar';

export default function PokerTable({ players }: { players: Player[] }) {
  return <div className="table-stage">
    <div className="table-ambient" aria-hidden="true" />
    <div className="poker-table">
      <svg className="table-rim" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#6399ff" /><stop offset=".45" stopColor="#0754ff" /><stop offset=".85" stopColor="#28c5ff" /><stop offset="1" stopColor="#0731b8" /></linearGradient>
          <radialGradient id="felt"><stop stopColor="#24064a" /><stop offset="1" stopColor="#10051e" /></radialGradient>
        </defs>
        <rect x="15" y="15" width="970" height="470" rx="235" fill="url(#felt)" stroke="url(#rim)" strokeWidth="30" />
        <rect x="33" y="33" width="934" height="434" rx="217" fill="none" stroke="#ff157c" strokeWidth="4" className="pink-rim" />
      </svg>
      <div className="board"><p className="pot-label">TOTAL POT <strong>0 <span>chips</span></strong></p>
        <div className="community-cards" aria-label="Five empty community card slots">{Array.from({ length: 5 }, (_, i) => <div className="community-slot" key={i}><div className="card-slot"><span aria-hidden="true">♠</span><span className="sr-only">Community card {i + 1}, empty</span></div><span className="street-label">{i < 3 ? 'FLOP' : i === 3 ? 'TURN' : 'RIVER'}</span></div>)}</div>
        <span className="board-caption">THE NIGHT IS YOURS</span>
      </div>
    </div>
    <ol className="seats" aria-label="Demo players">{players.map((player, i) => {
      const angle = Math.PI / 2 + i * 2 * Math.PI / players.length;
      return <li key={i} className={`seat ${i === 0 ? 'local-seat' : ''} ${i === 1 ? 'active-seat' : ''}`} style={{ left: `${50 + 38 * Math.cos(angle)}%`, top: `${50 + 42 * Math.sin(angle)}%` }}>
        <div className="seat-avatar"><Avatar avatar={player.avatar} />{i === 0 && <span className="dealer" title="Dealer">D</span>}</div>
        <strong>{player.name}{i === 0 ? ' (you)' : ''}</strong><span className="chip-balance">{player.chips.toLocaleString('en-US')}</span>
        {i === 1 && <span className="turn-label">Demo active player</span>}
      </li>;
    })}</ol>
  </div>;
}
