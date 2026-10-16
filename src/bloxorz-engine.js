// Bloxorz 3D Isometric Physics Engine & Classic Level Definitions

export const TILES = {
  VOID: 0,
  FLOOR: 1,
  ORANGE: 2,       // Fragile tile (breaks if block stands vertically)
  GOAL: 3,         // Target hole (must stand vertically to win)
  SOFT_SWITCH: 4,   // 'O' (activated by any touch)
  HARD_SWITCH: 5,   // 'X' (activated only when standing)
  BRIDGE_OPEN: 6,   // Active traversable bridge
  BRIDGE_CLOSED: 7  // Inactive void bridge
};

// 10 Classic Bloxorz Levels with authentic passwords
export const LEVELS = [
  // Level 1: Tutorial
  {
    level: 1,
    code: '780464',
    name: 'Stage 1: The Basics',
    start: { x: 1, y: 1, state: 'standing' },
    grid: [
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 3, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0]
    ],
    bridges: []
  },
  // Level 2: First Switch & Bridge
  {
    level: 2,
    code: '290299',
    name: 'Stage 2: Soft Switches',
    start: { x: 1, y: 1, state: 'standing' },
    grid: [
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 4, 1, 1, 1, 7, 7, 0, 0, 0, 0, 1, 3, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    bridges: [
      { switchPos: { x: 2, y: 1 }, tiles: [{ x: 6, y: 1 }, { x: 7, y: 1 }], type: 'toggle' }
    ]
  },
  // Level 3: Fragile Orange Tiles
  {
    level: 3,
    code: '348632',
    name: 'Stage 3: Fragile Tiles',
    start: { x: 1, y: 1, state: 'standing' },
    grid: [
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 3, 1],
      [1, 1, 1, 0, 0, 2, 2, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
    ],
    bridges: []
  },
  // Level 4: Narrow Paths & Bridges
  {
    level: 4,
    code: '612849',
    name: 'Stage 4: Precision Bridges',
    start: { x: 1, y: 2, state: 'standing' },
    grid: [
      [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 7, 7, 1, 1, 1, 1, 3, 1],
      [1, 1, 1, 1, 0, 0, 1, 5, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0]
    ],
    bridges: [
      { switchPos: { x: 7, y: 2 }, tiles: [{ x: 4, y: 1 }, { x: 5, y: 1 }], type: 'toggle' }
    ]
  },
  // Level 5: Fragile Pathways
  {
    level: 5,
    code: '198642',
    name: 'Stage 5: Orange Causeway',
    start: { x: 1, y: 1, state: 'standing' },
    grid: [
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 3, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0]
    ],
    bridges: []
  },
  // Level 6: Dual Bridge Switch Maze
  {
    level: 6,
    code: '294718',
    name: 'Stage 6: Dual Control',
    start: { x: 1, y: 1, state: 'standing' },
    grid: [
      [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 4, 1, 1, 7, 7, 1, 1, 1, 3, 1, 1],
      [1, 1, 1, 1, 0, 0, 1, 4, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0]
    ],
    bridges: [
      { switchPos: { x: 1, y: 1 }, tiles: [{ x: 4, y: 1 }, { x: 5, y: 1 }], type: 'toggle' },
      { switchPos: { x: 7, y: 2 }, tiles: [{ x: 4, y: 1 }, { x: 5, y: 1 }], type: 'toggle' }
    ]
  },
  // Level 7: Zigzag Chasm
  {
    level: 7,
    code: '812739',
    name: 'Stage 7: Zigzag Chasm',
    start: { x: 0, y: 0, state: 'standing' },
    grid: [
      [1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 3, 1]
    ],
    bridges: []
  },
  // Level 8: Island Hopper
  {
    level: 8,
    code: '918374',
    name: 'Stage 8: Island Hopper',
    start: { x: 1, y: 1, state: 'standing' },
    grid: [
      [1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1],
      [1, 1, 1, 7, 7, 1, 4, 1, 7, 7, 1, 3, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1]
    ],
    bridges: [
      { switchPos: { x: 6, y: 1 }, tiles: [{ x: 3, y: 1 }, { x: 4, y: 1 }, { x: 8, y: 1 }, { x: 9, y: 1 }], type: 'toggle' }
    ]
  },
  // Level 9: Precision Maneuver
  {
    level: 9,
    code: '472910',
    name: 'Stage 9: Fragile Gauntlet',
    start: { x: 1, y: 1, state: 'standing' },
    grid: [
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 2, 2, 2, 1, 1, 1],
      [0, 1, 1, 0, 0, 0, 0, 1, 3, 1],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
    ],
    bridges: []
  },
  // Level 10: The Grand Master Final
  {
    level: 10,
    code: '629104',
    name: 'Stage 10: The Master Labyrinth',
    start: { x: 1, y: 1, state: 'standing' },
    grid: [
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 5, 1, 1, 7, 7, 7, 1, 1, 3, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0]
    ],
    bridges: [
      { switchPos: { x: 2, y: 1 }, tiles: [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }], type: 'toggle' }
    ]
  }
];

export class BloxorzGame {
  constructor(levelIndex = 0) {
    this.levelIndex = levelIndex;
    this.moves = 0;
    this.status = 'playing'; // 'playing' | 'won' | 'falling'
    this.history = [];
    this.initLevel(levelIndex);
  }

  initLevel(index) {
    this.levelIndex = (index + LEVELS.length) % LEVELS.length;
    this.levelData = LEVELS[this.levelIndex];
    this.moves = 0;
    this.status = 'playing';
    this.history = [];

    // Deep clone grid
    this.grid = this.levelData.grid.map(row => [...row]);

    // Active bridge states
    this.bridgeStates = new Map();
    if (this.levelData.bridges) {
      this.levelData.bridges.forEach((b, idx) => {
        this.bridgeStates.set(idx, false); // false = closed, true = open
      });
    }

    // Set initial block
    this.block = {
      x: this.levelData.start.x,
      y: this.levelData.start.y,
      state: this.levelData.start.state // 'standing' | 'lying_h' | 'lying_v'
    };
  }

  // Get occupied tiles by current block position
  getOccupiedTiles(block = this.block) {
    const { x, y, state } = block;
    if (state === 'standing') {
      return [{ x, y }];
    } else if (state === 'lying_h') {
      return [{ x, y }, { x: x + 1, y }];
    } else if (state === 'lying_v') {
      return [{ x, y }, { x, y: y + 1 }];
    }
    return [{ x, y }];
  }

  getTileAt(x, y) {
    if (y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[y].length) {
      return TILES.VOID;
    }
    return this.grid[y][x];
  }

  // Move block in a direction: 'up', 'down', 'left', 'right'
  move(dir) {
    if (this.status !== 'playing') return { moved: false };

    // Save history for undo
    this.history.push({
      block: { ...this.block },
      moves: this.moves,
      grid: this.grid.map(r => [...r])
    });

    const nextBlock = this.calculateNextBlock(this.block, dir);
    this.moves++;
    this.block = nextBlock;

    // Evaluate new position
    const evalResult = this.evaluatePosition(this.block);

    if (evalResult === 'win') {
      this.status = 'won';
      return { moved: true, status: 'won', moves: this.moves };
    } else if (evalResult === 'fall') {
      this.status = 'falling';
      return { moved: true, status: 'falling', moves: this.moves };
    }

    // Trigger switches if landed on any
    this.checkSwitches(this.block);

    return { moved: true, status: 'playing', moves: this.moves };
  }

  calculateNextBlock(block, dir) {
    const { x, y, state } = block;

    if (state === 'standing') {
      switch (dir) {
        case 'left': return { x: x - 2, y, state: 'lying_h' };
        case 'right': return { x: x + 1, y, state: 'lying_h' };
        case 'up': return { x, y: y - 2, state: 'lying_v' };
        case 'down': return { x, y: y + 1, state: 'lying_v' };
      }
    } else if (state === 'lying_h') {
      switch (dir) {
        case 'left': return { x: x - 1, y, state: 'standing' };
        case 'right': return { x: x + 2, y, state: 'standing' };
        case 'up': return { x, y: y - 1, state: 'lying_h' };
        case 'down': return { x, y: y + 1, state: 'lying_h' };
      }
    } else if (state === 'lying_v') {
      switch (dir) {
        case 'left': return { x: x - 1, y, state: 'lying_v' };
        case 'right': return { x: x + 1, y, state: 'lying_v' };
        case 'up': return { x, y: y - 1, state: 'standing' };
        case 'down': return { x, y: y + 2, state: 'standing' };
      }
    }
    return block;
  }

  evaluatePosition(block) {
    const occupied = this.getOccupiedTiles(block);

    // 1. Check if any part is over void or closed bridge
    for (const t of occupied) {
      const tileType = this.getTileAt(t.x, t.y);
      if (tileType === TILES.VOID || tileType === TILES.BRIDGE_CLOSED) {
        return 'fall';
      }
    }

    // 2. Check if standing on orange fragile tile
    if (block.state === 'standing') {
      const single = occupied[0];
      const tileType = this.getTileAt(single.x, single.y);
      if (tileType === TILES.ORANGE) {
        return 'fall'; // Orange tile gives way!
      }
      if (tileType === TILES.GOAL) {
        return 'win'; // Successfully dropped into goal hole!
      }
    }

    return 'safe';
  }

  checkSwitches(block) {
    if (!this.levelData.bridges) return;

    const occupied = this.getOccupiedTiles(block);

    this.levelData.bridges.forEach((bridge, bIdx) => {
      const { switchPos } = bridge;
      const isTouching = occupied.some(t => t.x === switchPos.x && t.y === switchPos.y);

      if (isTouching) {
        const switchType = this.getTileAt(switchPos.x, switchPos.y);

        // Soft Switch 'O': triggers on any orientation
        if (switchType === TILES.SOFT_SWITCH) {
          this.toggleBridge(bridge);
        }
        // Hard Switch 'X': triggers ONLY when standing vertically
        else if (switchType === TILES.HARD_SWITCH && block.state === 'standing') {
          this.toggleBridge(bridge);
        }
      }
    });
  }

  toggleBridge(bridge) {
    bridge.tiles.forEach(bt => {
      const cur = this.getTileAt(bt.x, bt.y);
      if (cur === TILES.BRIDGE_CLOSED) {
        this.grid[bt.y][bt.x] = TILES.BRIDGE_OPEN;
      } else if (cur === TILES.BRIDGE_OPEN) {
        this.grid[bt.y][bt.x] = TILES.BRIDGE_CLOSED;
      }
    });
  }

  undo() {
    if (this.history.length === 0) return false;
    const prev = this.history.pop();
    this.block = prev.block;
    this.moves = prev.moves;
    this.grid = prev.grid;
    this.status = 'playing';
    return true;
  }

  restart() {
    this.initLevel(this.levelIndex);
  }

  loadByCode(code) {
    const idx = LEVELS.findIndex(l => l.code === code.trim());
    if (idx !== -1) {
      this.initLevel(idx);
      return true;
    }
    return false;
  }
}
