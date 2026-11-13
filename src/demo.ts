export const emojis = ['🦊', '🐼', '🐯', '🐸', '👽', '🤖'];
export const portraits = ['Orbit', 'Nova', 'Ace', 'Luna'];
export type AvatarValue = { kind: 'emoji' | 'portrait' | 'image'; value: string };
export type Player = { name: string; chips: number; avatar: AvatarValue };

export function makePlayers(count: number, name: string, avatar: AvatarValue): Player[] {
  if (!Number.isInteger(count) || count < 2 || count > 9) throw new RangeError('Choose 2–9 players.');
  const names = ['Nova', 'River', 'Luna', 'Ace', 'Blake', 'Sky', 'Jules', 'Remy'];
  return [{ name, chips: 2500, avatar }, ...names.slice(0, count - 1).map((name, i) => ({
    name, chips: 2500, avatar: { kind: 'emoji' as const, value: emojis[i % emojis.length] },
  }))];
}

export function validRoomCode(code: string) { return /^[A-Z0-9]{6}$/.test(code); }
export function validAvatarFile(file: { type: string; size: number }) {
  return ['image/png', 'image/jpeg', 'image/webp'].includes(file.type) && file.size > 0 && file.size <= 2 * 1024 * 1024;
}
