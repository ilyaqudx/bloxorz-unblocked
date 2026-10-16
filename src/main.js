import './style.css';
import { BloxorzGame, TILES, LEVELS } from './bloxorz-engine.js';
import { audio } from './audio.js';

// DOM Elements
const canvas = document.getElementById('bloxorz-canvas');
const ctx = canvas.getContext('2d');
const stageNumEl = document.getElementById('stage-num');
const stageCodeEl = document.getElementById('stage-code');
const moveCountEl = document.getElementById('move-count');

const btnRestartEl = document.getElementById('btn-restart');
const btnUndoEl = document.getElementById('btn-undo');
const btnSoundEl = document.getElementById('btn-sound');
const soundIconEl = document.getElementById('sound-icon');
const btnHelpEl = document.getElementById('btn-help');

const formPasscodeEl = document.getElementById('passcode-form');
const inputPasscodeEl = document.getElementById('passcode-input');

const modalWinEl = document.getElementById('modal-win');
const winStageTitleEl = document.getElementById('win-stage-title');
const nextPasscodeEl = document.getElementById('next-passcode');
const btnNextStageEl = document.getElementById('btn-next-stage');

const modalFallEl = document.getElementById('modal-fall');
const btnRetryEl = document.getElementById('btn-retry');

const modalHelpEl = document.getElementById('modal-help');
const dpadBtns = document.querySelectorAll('.dpad-btn');

// Game Initialization
const game = new BloxorzGame(0);

// Sound
function updateSoundIcon() {
  soundIconEl.textContent = audio.isMuted() ? '🔇' : '🔊';
}
updateSoundIcon();
btnSoundEl.addEventListener('click', () => {
  audio.toggleMute();
  updateSoundIcon();
});

// Canvas Setup
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
}
window.addEventListener('resize', () => {
  resizeCanvas();
  render();
});
resizeCanvas();

// Isometric Projection Math
// tileW = 44, tileH = 24
const TILE_W = 44;
const TILE_H = 24;
const BLOCK_H = 24; // height of 1 unit in Z

function gridToIso(gx, gy, gz = 0, offsetX = 0, offsetY = 0) {
  const x = (gx - gy) * (TILE_W / 2) + offsetX;
  const y = (gx + gy) * (TILE_H / 2) - gz * BLOCK_H + offsetY;
  return { x, y };
}

// Compute dynamic camera center offset based on grid bounds
function getCameraOffset() {
  const rect = canvas.getBoundingClientRect();
  const rows = game.grid.length;
  const cols = game.grid[0].length;
  const midX = (cols - rows) * (TILE_W / 4);
  const midY = (cols + rows) * (TILE_H / 4);
  return {
    x: rect.width / 2 - midX,
    y: rect.height / 2 - midY + 15
  };
}

// Render Tile Isometric Polygon
function drawIsoTile(gx, gy, type, offset) {
  const { x, y } = gridToIso(gx, gy, 0, offset.x, offset.y);
  const halfW = TILE_W / 2;
  const halfH = TILE_H / 2;
  const depth = 8; // tile 3D rim depth

  // 3D Rim Sides (Left & Right)
  ctx.beginPath();
  ctx.moveTo(x - halfW, y);
  ctx.lineTo(x, y + halfH);
  ctx.lineTo(x, y + halfH + depth);
  ctx.lineTo(x - halfW, y + depth);
  ctx.closePath();
  ctx.fillStyle = '#161922';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y + halfH);
  ctx.lineTo(x + halfW, y);
  ctx.lineTo(x + halfW, y + depth);
  ctx.lineTo(x, y + halfH + depth);
  ctx.closePath();
  ctx.fillStyle = '#0f1118';
  ctx.fill();

  // Top Surface
  ctx.beginPath();
  ctx.moveTo(x, y - halfH);
  ctx.lineTo(x + halfW, y);
  ctx.lineTo(x, y + halfH);
  ctx.lineTo(x - halfW, y);
  ctx.closePath();

  switch (type) {
    case TILES.FLOOR:
      ctx.fillStyle = '#262938';
      ctx.fill();
      ctx.strokeStyle = '#32374a';
      ctx.lineWidth = 1;
      ctx.stroke();
      break;

    case TILES.ORANGE:
      ctx.fillStyle = '#ea580c';
      ctx.fill();
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      break;

    case TILES.GOAL:
      // Dark pit with pulsing cyan border
      ctx.fillStyle = '#05070a';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      break;

    case TILES.SOFT_SWITCH:
      ctx.fillStyle = '#262938';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.stroke();
      // Draw Switch 'O'
      ctx.beginPath();
      ctx.ellipse(x, y, 7, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      break;

    case TILES.HARD_SWITCH:
      ctx.fillStyle = '#262938';
      ctx.fill();
      ctx.strokeStyle = '#facc15';
      ctx.stroke();
      // Draw Switch 'X'
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x - 5, y - 3);
      ctx.lineTo(x + 5, y + 3);
      ctx.moveTo(x + 5, y - 3);
      ctx.lineTo(x - 5, y + 3);
      ctx.stroke();
      break;

    case TILES.BRIDGE_OPEN:
      ctx.fillStyle = '#0284c7';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.stroke();
      break;

    case TILES.BRIDGE_CLOSED:
      // Outlined dashed void
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
      break;
  }
}

// Render 3D Block
function drawBlock(block, offset) {
  const { x, y, state } = block;
  const halfW = TILE_W / 2;
  const halfH = TILE_H / 2;

  let widthSpanX = 1;
  let heightSpanY = 1;
  let heightSpanZ = 2; // standing is 2 units tall

  if (state === 'lying_h') {
    widthSpanX = 2;
    heightSpanY = 1;
    heightSpanZ = 1;
  } else if (state === 'lying_v') {
    widthSpanX = 1;
    heightSpanY = 2;
    heightSpanZ = 1;
  }

  // Draw Drop Shadow on Floor
  const shadowCenter = gridToIso(
    x + (widthSpanX - 1) / 2,
    y + (heightSpanY - 1) / 2,
    0,
    offset.x,
    offset.y
  );
  ctx.beginPath();
  ctx.ellipse(
    shadowCenter.x,
    shadowCenter.y,
    (widthSpanX * TILE_W) / 2.3,
    (heightSpanY * TILE_H) / 2.3,
    0,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.fill();

  // 3D Block Geometry
  // 8 vertices in isometric space
  // Base corners: (x, y), (x + widthSpanX, y), (x + widthSpanX, y + heightSpanY), (x, y + heightSpanY) at z = 0
  // Top corners: same at z = heightSpanZ
  const b0 = gridToIso(x, y, 0, offset.x, offset.y);
  const b1 = gridToIso(x + widthSpanX, y, 0, offset.x, offset.y);
  const b2 = gridToIso(x + widthSpanX, y + heightSpanY, 0, offset.x, offset.y);
  const b3 = gridToIso(x, y + heightSpanY, 0, offset.x, offset.y);

  const t0 = gridToIso(x, y, heightSpanZ, offset.x, offset.y);
  const t1 = gridToIso(x + widthSpanX, y, heightSpanZ, offset.x, offset.y);
  const t2 = gridToIso(x + widthSpanX, y + heightSpanY, heightSpanZ, offset.x, offset.y);
  const t3 = gridToIso(x, y + heightSpanY, heightSpanZ, offset.x, offset.y);

  // Left Face (t3, t2, b2, b3)
  ctx.beginPath();
  ctx.moveTo(t3.x, t3.y);
  ctx.lineTo(t2.x, t2.y);
  ctx.lineTo(b2.x, b2.y);
  ctx.lineTo(b3.x, b3.y);
  ctx.closePath();
  ctx.fillStyle = '#64748b'; // medium metallic slate
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Right Face (t2, t1, b1, b2)
  ctx.beginPath();
  ctx.moveTo(t2.x, t2.y);
  ctx.lineTo(t1.x, t1.y);
  ctx.lineTo(b1.x, b1.y);
  ctx.lineTo(b2.x, b2.y);
  ctx.closePath();
  ctx.fillStyle = '#475569'; // darker shaded face
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.stroke();

  // Top Face (t0, t1, t2, t3)
  ctx.beginPath();
  ctx.moveTo(t0.x, t0.y);
  ctx.lineTo(t1.x, t1.y);
  ctx.lineTo(t2.x, t2.y);
  ctx.lineTo(t3.x, t3.y);
  ctx.closePath();
  ctx.fillStyle = '#94a3b8'; // bright top face
  ctx.fill();
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.2;
  ctx.stroke();
}

// Main Render Loop
function render() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);

  const offset = getCameraOffset();

  // 1. Draw Grid Tiles (in isometric painter's order: top to bottom, left to right)
  for (let gy = 0; gy < game.grid.length; gy++) {
    for (let gx = 0; gx < game.grid[gy].length; gx++) {
      const type = game.grid[gy][gx];
      if (type !== TILES.VOID) {
        drawIsoTile(gx, gy, type, offset);
      }
    }
  }

  // 2. Draw 3D Block if not dead
  if (game.status !== 'falling') {
    drawBlock(game.block, offset);
  }

  // Update HUD
  stageNumEl.textContent = game.levelData.level;
  stageCodeEl.textContent = game.levelData.code;
  moveCountEl.textContent = game.moves;
}

// User Move Action
function handleAction(dir) {
  const res = game.move(dir);
  if (!res.moved) return;

  render();

  if (res.status === 'won') {
    audio.playWin();
    winStageTitleEl.textContent = `Stage ${game.levelData.level} Conquered!`;
    const nextLevel = LEVELS[(game.levelIndex + 1) % LEVELS.length];
    nextPasscodeEl.textContent = nextLevel.code;
    setTimeout(() => { modalWinEl.hidden = false; }, 350);
  } else if (res.status === 'falling') {
    audio.playFall();
    setTimeout(() => { modalFallEl.hidden = false; }, 400);
  } else {
    audio.playRoll();
  }
}

// Keyboard Mapping
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  const k = e.key.toLowerCase();
  switch (k) {
    case 'arrowup':
    case 'w':
      e.preventDefault();
      handleAction('up');
      break;
    case 'arrowdown':
    case 's':
      e.preventDefault();
      handleAction('down');
      break;
    case 'arrowleft':
    case 'a':
      e.preventDefault();
      handleAction('left');
      break;
    case 'arrowright':
    case 'd':
      e.preventDefault();
      handleAction('right');
      break;
    case 'r':
      game.restart();
      modalWinEl.hidden = true;
      modalFallEl.hidden = true;
      render();
      break;
    case 'u':
    case 'backspace':
      if (game.undo()) {
        modalWinEl.hidden = true;
        modalFallEl.hidden = true;
        render();
        audio.playRoll();
      }
      break;
  }
});

// D-Pad Buttons
dpadBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const dir = btn.dataset.dir;
    if (dir) handleAction(dir);
  });
});

// Touch and Swipe Gestures
let touchX = 0;
let touchY = 0;
canvas.addEventListener('touchstart', (e) => {
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
}, { passive: true });

canvas.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);

  if (Math.max(absX, absY) < 25) return; // Ignore small tap

  if (absX > absY) {
    handleAction(dx > 0 ? 'right' : 'left');
  } else {
    handleAction(dy > 0 ? 'down' : 'up');
  }
}, { passive: true });

// Toolbar Controls
btnRestartEl.addEventListener('click', () => {
  game.restart();
  modalWinEl.hidden = true;
  modalFallEl.hidden = true;
  render();
});

btnUndoEl.addEventListener('click', () => {
  if (game.undo()) {
    modalWinEl.hidden = true;
    modalFallEl.hidden = true;
    render();
    audio.playRoll();
  }
});

// Next Stage Button
btnNextStageEl.addEventListener('click', () => {
  game.initLevel(game.levelIndex + 1);
  modalWinEl.hidden = true;
  render();
});

// Retry Button
btnRetryEl.addEventListener('click', () => {
  game.restart();
  modalFallEl.hidden = true;
  render();
});

// Passcode Form Jump
formPasscodeEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const code = inputPasscodeEl.value.trim();
  if (game.loadByCode(code)) {
    inputPasscodeEl.value = '';
    modalWinEl.hidden = true;
    modalFallEl.hidden = true;
    render();
  } else {
    alert('Invalid stage passcode! Check the walkthrough table below for valid passwords.');
  }
});

// Help Modal
btnHelpEl.addEventListener('click', () => { modalHelpEl.hidden = false; });
document.querySelectorAll('.modal-close').forEach(b => {
  b.addEventListener('click', () => { modalHelpEl.hidden = true; });
});
modalHelpEl.addEventListener('click', (e) => {
  if (e.target === modalHelpEl) modalHelpEl.hidden = true;
});

// Initial Render
render();
