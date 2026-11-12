import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import Avatar from './components/Avatar';
import PokerTable from './components/PokerTable';
import { emojis, portraits, makePlayers, validAvatarFile, validRoomCode } from './demo';
import type { AvatarValue } from './demo';

type Screen = 'home' | 'create' | 'join' | 'table';
export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState<AvatarValue>({ kind: 'emoji', value: emojis[0] });
  const [count, setCount] = useState(6);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [preview, setPreview] = useState<string>();
  const title = useRef<HTMLHeadingElement>(null);
  const uploadVersion = useRef(0);
  useEffect(() => { title.current?.focus(); }, [screen]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  function navigate(next: Screen) { setError(''); setScreen(next); }
  function enterDemo(event: FormEvent) {
    event.preventDefault();
    if (!nickname.trim() || nickname.trim().length > 20) { setError('Enter a nickname of 1–20 characters.'); return; }
    if (screen === 'join' && !validRoomCode(code)) { setError('Enter a six-character room code using letters and numbers.'); return; }
    navigate('table');
  }
  function upload(file?: File) {
    const version = ++uploadVersion.current;
    setUploadError('');
    if (!file) return;
    if (!validAvatarFile(file)) { setUploadError('Choose a PNG, JPEG or WebP image, up to 2 MB.'); return; }
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      if (version !== uploadVersion.current) { URL.revokeObjectURL(url); return; }
      setPreview(url); setAvatar({ kind: 'image', value: url });
    };
    image.onerror = () => { URL.revokeObjectURL(url); if (version === uploadVersion.current) setUploadError('This image could not be opened. Choose another file.'); };
    image.src = url;
  }
  const players = makePlayers(count, nickname.trim() || 'You', avatar);
  return <div className="app-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header flex items-center justify-between gap-4">
      <button className="brand" onClick={() => navigate('home')} aria-label="Poker Night home"><span className="brand-mark" aria-hidden="true">♠</span> POKER<span className="brand-light">NIGHT</span><span className="brand-dot" /></button>
      <span className="demo-badge"><span /> FRONTEND PREVIEW</span>
    </header>
    <main id="main">
      {screen !== 'table' ? <div className="home-layout">
        <section className="intro">
          <p className="eyebrow">GOOD FRIENDS. GREAT HANDS.</p>
          <h1 ref={title} tabIndex={-1}>{screen === 'home' ? <>Your friends.<br />Your table.<br /><span>Your night.</span></> : screen === 'create' ? <>Set the table.<br /><span>Make it yours.</span></> : <>Find your seat.<br /><span>Join the night.</span></>}</h1>
          <p className="intro-copy">A little friendly rivalry. A whole lot of good company. Your next poker night starts right here.</p>
          <div className="intro-facts"><span>2–9 friends</span><span>Free to play</span><span>In your browser</span></div>
          <div className="mini-table" aria-hidden="true"><PokerTable players={[]} /></div>
          <p className="preview-note">UI demo only · Live multiplayer is coming in a future phase.</p>
        </section>
        <section className="setup-panel" aria-label="Poker night setup">
          {screen !== 'home' && <button className="back-button" onClick={() => navigate('home')}>← Back to home</button>}
          <div className="panel-heading"><div><p className="eyebrow">TAKE A SEAT</p><h2>{screen === 'join' ? 'Join your friends' : screen === 'create' ? 'Create your room' : 'Ready for poker night?'}</h2></div><Avatar avatar={avatar} /></div>
          <form onSubmit={enterDemo}>
            <label htmlFor="nickname">Your nickname</label>
            <input id="nickname" value={nickname} maxLength={20} onChange={event => setNickname(event.target.value)} placeholder="What should we call you?" autoComplete="nickname" required aria-describedby="nickname-hint form-error" />
            <p id="nickname-hint" className="field-hint">1–20 characters. Bring your best poker face.</p>
            <fieldset><legend>Choose your avatar</legend><div className="avatar-options">
              {emojis.map(value => <button type="button" key={value} aria-label={`Choose ${value} avatar`} aria-pressed={avatar.kind === 'emoji' && avatar.value === value} onClick={() => { uploadVersion.current++; setAvatar({ kind: 'emoji', value }); }}><Avatar avatar={{ kind: 'emoji', value }} /></button>)}
            </div><p className="field-hint">Or pick a built-in portrait</p><div className="avatar-options portraits">
              {portraits.map(value => <button type="button" key={value} aria-label={`Choose ${value} portrait`} aria-pressed={avatar.kind === 'portrait' && avatar.value === value} onClick={() => { uploadVersion.current++; setAvatar({ kind: 'portrait', value }); }}><Avatar avatar={{ kind: 'portrait', value }} /></button>)}
            </div><label className="upload-label" htmlFor="avatar-upload">Upload your own image <span>PNG, JPEG, WebP · 2 MB max · Local preview only</span></label><input id="avatar-upload" type="file" accept="image/png,image/jpeg,image/webp" aria-describedby="upload-error" onChange={event => upload(event.target.files?.[0])} /><p id="upload-error" className="error" role="alert">{uploadError}</p></fieldset>
            {screen === 'create' && <><label htmlFor="players">Seats at the table</label><select id="players" value={count} onChange={event => setCount(Number(event.target.value))}>{Array.from({ length: 8 }, (_, i) => <option key={i} value={i + 2}>{i + 2} players</option>)}</select><p className="field-hint">All other seats use demo players.</p></>}
            {screen === 'join' && <><label htmlFor="room-code">Room code</label><input id="room-code" value={code} onChange={event => setCode(event.target.value.toUpperCase())} placeholder="E.g. ACE123" maxLength={6} pattern="[A-Z0-9]{6}" required autoComplete="off" aria-describedby="room-hint form-error" /><p id="room-hint" className="field-hint">Any six letters or numbers opens the demo. No room is contacted.</p></>}
            <p id="form-error" role="alert" className="error">{error}</p>
            {screen === 'home' ? <div className="home-actions"><button type="button" className="primary" onClick={() => navigate('create')}>Create Room <span aria-hidden="true">↗</span></button><button type="button" className="secondary" onClick={() => navigate('join')}>Join Room</button></div> : <button className="primary full-width" type="submit">{screen === 'join' ? 'Preview joined table' : 'Preview your table'} <span aria-hidden="true">→</span></button>}
            <p className="panel-note">No signup. No real money. Just your crew.</p>
          </form>
        </section>
      </div> : <section className="demo-screen">
        <div className="table-header"><div><p className="eyebrow">YOUR PRIVATE CORNER OF THE NIGHT</p><h1 ref={title} tabIndex={-1}>The good company club</h1></div><button className="secondary" onClick={() => navigate('home')}>Leave demo</button></div>
        <div className="demo-notice" role="status">Demo table · All players and balances are mock data. Live gameplay is not enabled.</div>
        <div className="table-settings"><span>NO-LIMIT TEXAS HOLD’EM</span><label htmlFor="demo-seats">Players <select id="demo-seats" value={count} onChange={event => setCount(Number(event.target.value))}>{Array.from({ length: 8 }, (_, i) => <option key={i} value={i + 2}>{i + 2}</option>)}</select></label></div>
        <PokerTable players={players} />
        <div className="table-controls"><div className="private-hand" aria-label="Your two empty private card slots"><div className="card-slot">?<span className="sr-only">Private card one, empty</span></div><div className="card-slot">?<span className="sr-only">Private card two, empty</span></div><span>YOUR HAND</span></div><div className="betting-controls" aria-describedby="betting-note"><button disabled>Fold</button><button disabled>Check</button><button disabled>Raise</button><p id="betting-note">Betting controls are a visual preview only.</p></div></div>
      </section>}
    </main>
    <footer><span>POKER NIGHT <span aria-hidden="true">♠</span></span><span>Made for friends. Played for fun.</span><span>PHASE 01 / UI PREVIEW</span></footer>
  </div>;
}
