import type { AvatarValue } from '../demo';

export default function Avatar({ avatar }: { avatar: AvatarValue }) {
  return <span className={`avatar ${avatar.kind === 'portrait' ? `portrait portrait-${avatar.value.toLowerCase()}` : ''}`}>
    {avatar.kind === 'image' ? <img src={avatar.value} alt="" /> : avatar.kind === 'portrait' ?
      <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="26" r="13" fill="currentColor" /><path d="M9 64v-8a23 23 0 0 1 46 0v8" fill="currentColor" /><path d="M25 26h3m8 0h3" stroke="#160d2c" strokeWidth="3" strokeLinecap="round" /></svg> : <span aria-hidden="true">{avatar.value}</span>}
  </span>;
}
