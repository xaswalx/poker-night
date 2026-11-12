import test from 'node:test';
import assert from 'node:assert/strict';
import { makePlayers, validRoomCode, validAvatarFile } from './demo.ts';

test('all supported table sizes preserve the local player', () => {
  for (let count = 2; count <= 9; count++) {
    const players = makePlayers(count, 'You', { kind: 'emoji', value: '🦊' });
    assert.equal(players.length, count);
    assert.equal(players[0].name, 'You');
    assert.ok(players.every(player => player.chips === 2500));
  }
  for (const count of [0, 1, 10, 2.5, NaN]) assert.throws(() => makePlayers(count, 'You', { kind: 'emoji', value: '🦊' }));
});
test('room codes require six uppercase alphanumeric characters', () => {
  assert.ok(validRoomCode('ACE123'));
  for (const code of ['', 'abc123', 'AB 123', 'ABC1234']) assert.equal(validRoomCode(code), false);
});
test('avatar uploads only accept bounded raster images', () => {
  assert.ok(validAvatarFile({ type: 'image/png', size: 2048 }));
  for (const file of [{ type: 'image/svg+xml', size: 50 }, { type: 'image/jpeg', size: 0 }, { type: 'image/webp', size: 2097153 }]) assert.equal(validAvatarFile(file), false);
});
