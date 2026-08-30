// ═══════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════
const SURL = 'https://hnbfjymlhsughcipxuad.supabase.co';
const SKEY = 'sb_publishable_KrZNTyafSc8nrhyYmdTnkA_J1mSr1Sg';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const sb = supabase.createClient(SURL, SKEY);


// ═══════════════════════════════════════════════════════════
// ICON DEFINITIONS
// ═══════════════════════════════════════════════════════════
const ICONS = [
  {id:'spk-inceiling',    name:'In-Ceiling Speaker',  cat:'Audio',    f:'icons/spk-inceiling.svg'},
  {id:'spk-inwall',       name:'In-Wall Speaker',     cat:'Audio',    f:'icons/spk-inwall.svg'},
  {id:'spk-outdoor-surface',name:'Outdoor Speaker',   cat:'Audio',    f:'icons/spk-outdoor-surface.svg'},
  {id:'spk-landscape',    name:'Landscape Speaker',   cat:'Audio',    f:'icons/spk-landscape.svg'},
  {id:'spk-subwoofer',    name:'Subwoofer',           cat:'Audio',    f:'icons/spk-subwoofer.svg'},
  {id:'spk-soundbar',     name:'Soundbar',            cat:'Audio',    f:'icons/spk-soundbar.svg'},
  {id:'tv-mount',         name:'TV Mount',            cat:'Video',    f:'icons/tv-mount.svg'},
  {id:'tv-projector',     name:'Projector',           cat:'Video',    f:'icons/tv-projector.svg'},
  {id:'tv-screen',        name:'Projection Screen',   cat:'Video',    f:'icons/tv-screen.svg'},
  {id:'cam-dome',         name:'Dome Camera',         cat:'Cameras',  f:'icons/cam-dome.svg'},
  {id:'cam-bullet',       name:'Bullet Camera',       cat:'Cameras',  f:'icons/cam-bullet.svg'},
  {id:'cam-ptz',          name:'PTZ Camera',          cat:'Cameras',  f:'icons/cam-ptz.svg'},
  {id:'cam-doorbell',     name:'Video Doorbell',      cat:'Cameras',  f:'icons/cam-doorbell.svg'},
  {id:'cam-nvr',          name:'NVR / DVR',           cat:'Cameras',  f:'icons/cam-nvr.svg'},
  {id:'net-wap',          name:'Wireless AP',         cat:'Network',  f:'icons/net-wap.svg'},
  {id:'net-switch',       name:'Network Switch',      cat:'Network',  f:'icons/net-switch.svg'},
  {id:'net-router',       name:'Router',              cat:'Network',  f:'icons/net-router.svg'},
  {id:'net-patch',        name:'Patch Panel',         cat:'Network',  f:'icons/net-patch.svg'},
  {id:'light-keypad',     name:'Lutron Keypad',       cat:'Lighting', f:'icons/light-keypad.svg'},
  {id:'light-dimmer',     name:'Dimmer Switch',       cat:'Lighting', f:'icons/light-dimmer.svg'},
  {id:'light-occupancy',  name:'Occupancy Sensor',    cat:'Lighting', f:'icons/light-occupancy.svg'},
  {id:'light-fixture',    name:'Light Fixture',       cat:'Lighting', f:'icons/light-fixture.svg'},
  {id:'shade-roller',     name:'Roller Shade',        cat:'Shades',   f:'icons/shade-roller.svg'},
  {id:'shade-drapery',    name:'Motorized Drapery',   cat:'Shades',   f:'icons/shade-drapery.svg'},
  {id:'shade-exterior',   name:'Exterior Shade',      cat:'Shades',   f:'icons/shade-exterior.svg'},
  {id:'lock-smart',       name:'Smart Lock',          cat:'Access',   f:'icons/lock-smart.svg'},
  {id:'lock-reader',      name:'Access Reader',       cat:'Access',   f:'icons/lock-reader.svg'},
  {id:'lock-gate',        name:'Gate Strike',         cat:'Access',   f:'icons/lock-gate.svg'},
  {id:'sec-motion',       name:'Motion Sensor',       cat:'Security', f:'icons/sec-motion.svg'},
  {id:'sec-contact',      name:'Contact Sensor',      cat:'Security', f:'icons/sec-contact.svg'},
  {id:'sec-siren',        name:'Siren / Alarm',       cat:'Security', f:'icons/sec-siren.svg'},
  {id:'sec-panel',        name:'Alarm Keypad',        cat:'Security', f:'icons/sec-panel.svg'},
  {id:'ctrl-control4',    name:'Control4 Controller', cat:'Control',  f:'icons/ctrl-control4.svg'},
  {id:'ctrl-touchpanel',  name:'Touch Panel',         cat:'Control',  f:'icons/ctrl-touchpanel.svg'},
  {id:'rack-equipment',   name:'Equipment Rack',      cat:'Rack',     f:'icons/rack-equipment.svg'},
  {id:'jack-data',        name:'Data Jack',           cat:'Wiring',   f:'icons/jack-data.svg'},
  {id:'jack-hdmi',        name:'HDMI Wall Plate',     cat:'Wiring',   f:'icons/jack-hdmi.svg'},
  {id:'misc-prewire',     name:'Prewire Only',        cat:'Wiring',   f:'icons/misc-prewire.svg'},
  {id:'misc-conduit',     name:'Conduit Run',         cat:'Wiring',   f:'icons/misc-conduit.svg'},
];
// ── Category color system ────────────────────────────────────────
// Defaults: all 12 built-in cats get unique colors.
// Overrides are stored in Supabase app_config (key='cat_colors') — shared across ALL users.
// ── Category color palette ───────────────────────────────────────────────────
// 30 hues on a 12°-step wheel → guaranteed 12° minimum between ANY two colors.
// 11 built-ins occupy specific slots; 19-color pool fills the remaining slots.
// Auto-assign uses max-hue-distance so every new category is maximally distinct.
const CAT_COLORS_DEFAULT = {
  All:      '#94a3b8',  // slate (neutral)
  Audio:    '#1762d3',  // hue=216° blue
  Video:    '#17d3d3',  // hue=180° cyan
  Cameras:  '#ea2e2e',  // hue=0°   red
  Network:  '#1fc01f',  // hue=120° green
  Lighting: '#e4e405',  // hue=60°  yellow
  Shades:   '#2e2eea',  // hue=240° indigo
  Access:   '#ea2e79',  // hue=336° rose
  Security: '#ea792e',  // hue=24°  orange
  Control:  '#1fc080',  // hue=156° teal
  Rack:     '#80c01f',  // hue=84°  lime
  Wiring:   '#ea2eea',  // hue=300° magenta
};
const CAT_COLORS = Object.assign({}, CAT_COLORS_DEFAULT);

// 19 pool colors — remaining slots on the 30-point hue wheel, all 12°+ from defaults
const CAT_COLOR_POOL = [
  '#ea532e',  // hue=12°
  '#ea9f2e',  // hue=36°
  '#e4b805',  // hue=48°
  '#b8e405',  // hue=72°
  '#60c01f',  // hue=96°
  '#3fc01f',  // hue=108°
  '#1fc03f',  // hue=132°
  '#1fc060',  // hue=144°
  '#17d3ad',  // hue=168°
  '#17add3',  // hue=192°
  '#1788d3',  // hue=204°
  '#2e53ea',  // hue=228°
  '#532eea',  // hue=252°
  '#792eea',  // hue=264°
  '#9f2eea',  // hue=276°
  '#c42eea',  // hue=288°
  '#ea2ec4',  // hue=312°
  '#ea2e9f',  // hue=324°
  '#ea2e53',  // hue=348°
];

// Load shared colors from Supabase (called after auth).
// Strategy: start from fresh defaults, merge cloud overrides on top, then check
// for any duplicates — if found, reset to defaults and push corrected colors.
async function loadCatColorsFromCloud() {
  try {
    // Start from clean defaults, then layer cloud overrides on top
    Object.assign(CAT_COLORS, CAT_COLORS_DEFAULT);
    const { data } = await sb.from('app_config').select('value').eq('key', 'cat_colors').maybeSingle();
    if (data?.value) {
      const cloud = JSON.parse(data.value);
      Object.assign(CAT_COLORS, cloud);
    }
  } catch(e) { console.warn('loadCatColorsFromCloud:', e); }
}

// Assign colors to uncolored categories and fix duplicates.
// Uses max-hue-distance selection so every new cat gets the most visually
// distinct available color. Called after loadCatColorsFromCloud + loadCustomIcons.
async function dedupeAllCatColors() {
  const allCats = getActiveCats().filter(c => c !== 'All');
  let changed = false;

  // Full ordered palette: defaults first, then pool — all unique hues
  const fullPalette = [
    ...Object.values(CAT_COLORS_DEFAULT),
    ...CAT_COLOR_POOL
  ].filter((c, i, a) => a.indexOf(c) === i);

  // Parse hex -> hue (0-360)
  function hexHue(hex) {
    const r=parseInt(hex.slice(1,3),16)/255, g=parseInt(hex.slice(3,5),16)/255, b=parseInt(hex.slice(5,7),16)/255;
    const max=Math.max(r,g,b), min=Math.min(r,g,b), d=max-min;
    if(d===0) return 0;
    let h = max===r ? ((g-b)/d)%6 : max===g ? (b-r)/d+2 : (r-g)/d+4;
    return ((h*60)+360)%360;
  }
  function hueDist(a,b){ const d=Math.abs(a-b); return Math.min(d,360-d); }

  // Pick the palette color with max minimum-distance from all already-used hues
  function pickBestColor(usedHues) {
    let bestCol = fullPalette[0], bestScore = -1;
    for (const col of fullPalette) {
      if (usedHues.length === 0) return col;
      const h = hexHue(col);
      const minDist = Math.min(...usedHues.map(uh => hueDist(h, uh)));
      if (minDist > bestScore) { bestScore = minDist; bestCol = col; }
    }
    return bestCol;
  }

  // Pass 1: assign any missing colors using max-distance selection
  for (const cat of allCats) {
    if (!CAT_COLORS[cat]) {
      const usedHues = Object.values(CAT_COLORS).map(hexHue);
      CAT_COLORS[cat] = pickBestColor(usedHues);
      changed = true;
    }
  }

  // Pass 2: fix duplicates — keep first occurrence, reassign duplicates
  const seen = {}; // color -> first cat
  for (const cat of allCats) {
    const col = CAT_COLORS[cat];
    if (!seen[col]) {
      seen[col] = cat;
    } else {
      const usedHues = Object.values(CAT_COLORS).map(hexHue);
      CAT_COLORS[cat] = pickBestColor(usedHues);
      changed = true;
    }
  }

  if (changed) {
    await _flushCatColorsToCloud();
    rebuildSidebar();
  }
}

// Persist cat colors to Supabase — shared for all users
async function _flushCatColorsToCloud() {
  try {
    // Only save overrides (non-default entries + any default that changed)
    await sb.from('app_config').upsert({ key: 'cat_colors', value: JSON.stringify(CAT_COLORS) }, { onConflict: 'key' });
  } catch(e) { console.warn('_flushCatColorsToCloud:', e); }
}

function getNextCatColor() {
  // Pick the palette color with greatest minimum hue distance from all currently used colors
  function hexHue(hex) {
    const r=parseInt(hex.slice(1,3),16)/255, g=parseInt(hex.slice(3,5),16)/255, b=parseInt(hex.slice(5,7),16)/255;
    const max=Math.max(r,g,b), min=Math.min(r,g,b), d=max-min;
    if(d===0) return 0;
    let h = max===r ? ((g-b)/d)%6 : max===g ? (b-r)/d+2 : (r-g)/d+4;
    return ((h*60)+360)%360;
  }
  function hueDist(a,b){ const d=Math.abs(a-b); return Math.min(d,360-d); }
  const fullPalette = [...Object.values(CAT_COLORS_DEFAULT), ...CAT_COLOR_POOL]
    .filter((c,i,a) => a.indexOf(c)===i);
  const usedHues = Object.values(CAT_COLORS).map(hexHue);
  let bestCol = fullPalette[0], bestScore = -1;
  for (const col of fullPalette) {
    const h = hexHue(col);
    const minDist = usedHues.length ? Math.min(...usedHues.map(uh => hueDist(h, uh))) : 360;
    if (minDist > bestScore) { bestScore = minDist; bestCol = col; }
  }
  return bestCol;
}

function saveCatColor(cat, color) {
  CAT_COLORS[cat] = color;
  _flushCatColorsToCloud();
}

function deleteCatColor(cat) {
  delete CAT_COLORS[cat];
  _flushCatColorsToCloud();
}
// ─────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════
let CU = null, userRole = 'tech', CP = null, currentFileName = null;
let pdfDoc = null, pdfScale = 1, pdfPages = [];
let iphoneCurrentPage = 1; // for iPhone single-page nav
let _ewmDirty = false; // true when unsaved EWM changes exist
let pdfCv, pdfCtx, annCv, annCtx;
let tool = 'select', drawColor = '#1d6fdb', strokeW = 2, fontSize = 14;
let drawing = false, drawStart = {x:0,y:0}, drawCur = {x:0,y:0}, penPath = [];
let coverPath = [], coverBrushSize = 28; // freehand cover brush — diameter in natural PDF px
let coverHoverPos = null; // last known cursor pos in natural coords, for live size preview
let strokes = [], redoStack = [], icons = [], sel = null;

// ── Dual-plan tab system ─────────────────────────────────
// Each tab holds independent state for floor plan and elevations
const TABS = {
  floor: { pdfDoc:null, pdfScale:1, pdfPages:[], strokes:[], icons:[], redoStack:[], pdfBlob:null, name:null, _dirty:false },
  elev:  { pdfDoc:null, pdfScale:1, pdfPages:[], strokes:[], icons:[], redoStack:[], pdfBlob:null, name:null, _dirty:false }
};
let activeTab = null; // 'floor' or 'elev' — null when no merge loaded
let dragging = false, resizing = false, rotating = false;
let _hoverHandle = null; // 'resize' | 'rotate' | 'icon' | null
let _rotCorner = null;   // which corner is being used for rotation {lx,ly}
let iconResizeMode = false; // iPad double-tap resize mode: drag resizes instead of moves
let rDist = 0, rScale = 36, rAngle = 0, rRot = 0, dragOff = {x:0,y:0};
let pickIcon = null, clipboard = null, legendOn = false, activeCat = 'All';
let multiSel = []; // array of icon indices when multiple selected
let autoSaveTimer = null;
// Photoshop-style rotate cursor — circular arrow SVG
const _ROTATE_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Ccircle cx='14' cy='14' r='11' fill='none' stroke='white' stroke-width='3.5'/%3E%3Ccircle cx='14' cy='14' r='11' fill='none' stroke='%2338bdf8' stroke-width='2'/%3E%3Cpath d='M14 3 L17.5 8.5 L10.5 8.5 Z' fill='%2338bdf8'/%3E%3C/svg%3E") 14 14, crosshair`;
let openMenu = null;

// Touch state
let touches = {pinching:false,panning:false,pinchDist:0,pinchScale:1,pinchMidX:0,pinchMidY:0,pinchTimer:null,panStart:{x:0,y:0},scrollStart:{x:0,y:0}};

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
// Pre-load Elite logo once at startup so it's guaranteed ready for both
// on-screen legend rendering and PDF export (lazy loading inside _drawLegendOnCanvas
// caused the contact card/stamp to be silently skipped when .complete was false).
window._eliteLogoReady = new Promise(resolve => {
  const _logo = new Image();
  _logo.onload = () => resolve(_logo);
  _logo.onerror = () => resolve(_logo); // still resolve so export doesn't hang
  _logo.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjMuMzMyIDQ2Ny4yNDQiPjxwYXRoIGQ9Ik0zNy4yOTEsMjM4LjQ4OWM3LjgyMSw3LjgzNCw3LjgyMSwyMC41MTQsMCwyOC4zMzEtNy44MjEsNy44My0yMC41MTEsNy44My0yOC4zMzgsMC03LjgyNC03LjgxNy03LjgyNC0yMC41MTEsMC0yOC4zMzEsNy44MjctNy44MzUsMjAuNTE3LTcuODM1LDI4LjMzOCwwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjYuMTciLz48cGF0aCBkPSJNMjY2LjE4OCw4Ljk2MmM3LjgzMSw3LjgyMSw3LjgzMSwyMC41MTEsMCwyOC4zMzEtNy44MTcsNy44MTctMjAuNTExLDcuODI0LTI4LjM0MiwwLTcuODE3LTcuODIxLTcuODE3LTIwLjUxMSwwLTI4LjMzOCw3LjgzMS03LjgyNywyMC41MjUtNy44MjcsMjguMzQyLjAwN1oiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI2LjE3Ii8+PHBhdGggZD0iTTQ0LjI2NSwxNS40MjRjNy44MzQsNy44MjcsNy44MzQsMjAuNTE4LDAsMjguMzM4LTcuODIxLDcuODI0LTIwLjUxMSw3LjgyNC0yOC4zMzEsMC03LjgyNC03LjgyLTcuODI0LTIwLjUxMSwwLTI4LjMzOCw3LjgyMS03LjgyOCwyMC41MTEtNy44MzUsMjguMzMxLDBaIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNi4xNyIvPjxwYXRoIGQ9Ik0zMTEuMDU2LDMwMC43MDhsLS42MjctMS4wNTlMNjkuNDE2LDU5LjAzNGMtNy41NzctMy44MjUtMTQuNzI1LTcuODQyLTIxLjMwMi0xMS43NzgsNC4wNjUsNi43MjcsOC4yMjUsMTQuMDkxLDEyLjE4NSwyMS44NzMsMCwwLDQzLjIzNCw0My40OTEsNDMuMzk3LDQzLjc4NGwyMDguMzIsMjA3LjgwNGg5LjgzN3YtOS4yMTdsLTEwLjc5OC0xMC43OTJaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTMyMS44NTQsMTc5LjAyMnYtMTkuODE3bC01OS45ODYtNjAuMDI4Yy0yLjU2Myw0LjM0NC01LjQyLDguMDk2LTguNDcyLDExLjM0M2w2OC40NTgsNjguNTAzWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNzcuNDE5LDQwLjc1NmMtLjQ0Niw1LjUxNC0xLjAzMSwxMC42ODctMS43NTYsMTUuNTgxbDQ2LjE5MSw0Ni4yMzcuMDE0LTE5LjgyNS00NC40NS00MS45OTNaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTMyMS44NTQsMTQwLjA4NGwuMDE0LTE5LjgyNS00OS4wNjItNDkuMTE0Yy0xLjM1MSw1LjUyMS0yLjk2OCwxMC41MS00Ljc1MSwxNS4xMDVsNTMuNzk5LDUzLjgzNFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzIxLjg1NCwyMTYuNTRsLjAxNC0xOS44MTctNzguMDQ1LTc4LjA5M2MtNC4yMzYsMi43OS04LjczNyw0Ljg5NC0xMy40Niw2LjM3OGw5MS40OSw5MS41MzJaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE5Mi40MDgsMTI2LjAzNWwxMjkuNDQ2LDEyOS40MzZ2LTE5LjgwN2wtMTA3Ljg2My0xMDcuODg4Yy02Ljk1My4zMDctMTQuMjEzLS4zNTItMjEuNTg0LTEuNzQxWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zMjEuODU0LDI5Mi4yNzh2LTE5LjgyOEwxNjguNjkyLDExOS4zNmMtMTIuODQ0LTQuNjgxLTI1LjU3My0xMC44ODYtMzcuNDEzLTE3LjUzNmwxOTAuNTc1LDE5MC40NTNaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTQxLjA1NCwyNzYuNjNjNS41MDctLjQxOCwxMC42ODctMS4wMTcsMTUuNTg4LTEuNzU2bDQ2LjIzLDQ2LjE2My0xOS44MjUuMDE0LTQxLjk5My00NC40MjFaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE0MC4zODUsMzIxLjAzOGwtMTkuODE3LjAxNC00OS4xMjEtNDkuMDMzYzUuNTA4LTEuMzU5LDEwLjUxLTIuOTU0LDE1LjA5Ny00LjczOGw1My44NDEsNTMuNzU4WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNzkuMzM4LDMyMS4wMzhoLTE5LjgyMWwtNjAuMDUyLTU5LjkzN2M0LjM1OC0yLjU5Miw4LjEwMi01LjQyNywxMS4zNTYtOC40NzlsNjguNTE3LDY4LjQxNloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjE2Ljg0OCwzMjEuMDM4bC0xOS44MTUuMDE0LTc4LjExLTc4LjAxYzIuODA0LTQuMjI4LDQuODg4LTguNzQsNi4zNzktMTMuNDc0bDkxLjU0Niw5MS40N1oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTI2LjMyNiwxOTEuNjI2bDEyOS40NTQsMTI5LjQxMmgtMTkuODE0bC0xMDcuODkxLTEwNy44MzljLjMwNy02Ljk2My0uMzUyLTE0LjIwMi0xLjc0OS0yMS41NzMiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjkyLjYwNywzMjEuMDM4aC0xOS44NDJMMTE5LjY1MiwxNjcuOTI3Yy00LjY3OS0xMi44NDQtMTAuODc5LTI1LjU2Mi0xNy41MjktMzcuNDA1bDE5MC40ODQsMTkwLjUxNloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTI4LjA2NCw0MTcuNDI5aC00Mi4yODNjLTMuOTc0LDAtNy4xNDEtMS43ODQtOS40OTYtNS4zNTEtMi41MjYtMy43MjctMy43ODMtOS4xMDUtMy43ODMtMTYuMTYzLDAtNS41MDQuNzYzLTExLjQ2OCwyLjMyLTE3Ljg3bDEwLjQ2NC00Mi40MjJjLjI0My0xLjA1Mi43NzctMS41NzUsMS41OTItMS41NzVoMjUuNzEyYy41NzEsMCwuODU3LjM2Mi44NTcsMS4wODcsMCwuMTYtLjA1OS4zMi0uMTI4LjQ4N2wtMTEuODE2LDQ4LjIzOWMtMS41NCw1Ljk4NS0yLjMwOSwxMC4yNjMtMi4zMDksMTIuODU0LDAsNC4xMTcsMS43MDQsNi4xOCw1LjEwNyw2LjE4aDI3LjQyNWMuNTYxLDAsLjg0LjM3Ni44NCwxLjExNSwwLC4xNjctLjAzNS4zMi0uMTA0LjQ4N2wtMi42OSwxMS4zMjhjLS4zMzEsMS4wOC0uODkyLDEuNjAyLTEuNzA2LDEuNjAyIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE1OS42NDksNDE3LjQyOWgtMjQuMzc0Yy0uNTc4LDAtLjg1Ny0uMzYyLS44NTctMS4wOTQsMC0uMTYxLDYuNjIyLTI3LjA2LDE5Ljg1Ni04MC43MTMuMjQ4LTEuMDUyLjc3Ny0xLjU3NSwxLjU5OS0xLjU3NWgyNC4zODVjLjQ4NywwLC43MjQuMzYyLjcyNCwxLjA4NywwLC4xODEtNi42MTgsMjcuMDY2LTE5Ljg1Niw4MC43MTItLjI0MywxLjA1OS0uNzM4LDEuNTgyLTEuNDc3LDEuNTgyIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTIyOC45MDEsMzQ4LjU4MWwtMTYuNTY3LDY3LjI3M2MtLjI1MSwxLjA1OS0uNzY2LDEuNTc1LTEuNTg5LDEuNTc1aC0yNC4zN2MtLjQ4OCwwLS43MjUtLjM1NS0uNzI1LTEuMDg3LDAtLjE2MSw1LjU2LTIyLjc1NSwxNi42NzktNjcuNzYxaC0xOC44ODFjLS41NzEsMC0uODUtLjM2Mi0uODUtMS4xMDcsMC0uMDc3Ljk0Ny00LjAyLDIuODE0LTExLjgzLjIzNy0xLjA1Mi43NjctMS41OTYsMS41NzUtMS41OTZoNjQuOTQ3Yy42NTUsMCwuOTc1LjM3Ljk3NSwxLjExNSwwLC4xNi0uOTc1LDQuMTM4LTIuOTI2LDExLjk0MS0uMjUuOTktLjc2NiwxLjQ3Ny0xLjU3NCwxLjQ3N2gtMTkuNTA4WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zMC4yNzUsMzgwLjMwOWMtMS43ODQsNi45MTEtMi42NzUsMTEuOTk3LTIuNjc1LDE1LjIwMiwwLDQuNjY3LDEuNTQsNy4wMDksNC42MzcsNy4wMDloMzAuNjI3Yy41NzEsMCwuODU3LjM3Ni44NTcsMS4xMDF2LjUwMmwtMi44MDQsMTEuMzE0Yy0uMjUxLDEuMDczLS44MTUsMS42MTctMS43MTQsMS42MTdIMTMuNzA4Yy00LjA1OSwwLTcuMjc4LTEuODE5LTkuNjMyLTUuNDc2LTIuNTE2LTMuOTcxLTMuNzczLTkuNTU4LTMuNzczLTE2Ljc3NywwLTYuMDc1Ljg1LTEyLjU1NCwyLjU1My0xOS40MzgsMi45MjYtMTEuNjc3LDcuMTEzLTIxLjM1MywxMi41NTgtMjkuMDU5LDUuOTI5LTguNDIzLDEyLjIyNy0xMi42MzEsMTguODc3LTEyLjYzMWg0NS41MDJjLjY0OCwwLC45NzUuMzQ4Ljk3NSwxLjEwMSwwLC4xNjctLjA0Mi4zMzUtLjExMi40ODdsLTIuODExLDExLjQ2OGMtLjE1Ny45NzUtLjY5MywxLjQ3Ny0xLjU4NSwxLjQ3N2gtMzAuNTkyYy0zLjIyMiwwLTUuODE0LDEuODgxLTcuNzQ3LDUuNjU3LTEuMTQ5LDEuOTg1LTMuMDQ0LDYuMjQyLTQuMjM2LDEwLjYxMU0zMy41NzgsMzY0Ljc1OGMuMzItMS4wNTkuNDc3LS41MDIsMS4yMTItLjUwMmgzMi4zNTVjLjY0OCwwLC45NjguNDE4Ljk2OCwxLjIyNiwwLC4wODMtLjk2OCwzLjk5Mi0yLjkyMiwxMS43MjUtLjI1MSwxLjA1Mi0uNzczLDEuNTk2LTEuNTc4LDEuNTk2SDMxLjI2NWMtLjU1NCwwLS44NDYsMS40MzUtLjg0Ni42OTYiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjcyLjk2LDM4MC43NGMtMS43ODQsNi45MTItMi42NzUsMTEuOTktMi42NzUsMTUuMjE3LDAsNC42NTQsMS41NDcsNi45OTQsNC42MjcsNi45OTRoMzAuNjI2Yy41ODYsMCwuODY0LjM4My44NjQsMS4xMTV2LjQ4N2wtMi44MDEsMTEuMzI4Yy0uMjUsMS4wNTktLjgyMiwxLjYwMi0xLjcxNCwxLjYwMmgtNDUuNDk0Yy00LjA2OSwwLTcuMjg4LTEuODI1LTkuNjE1LTUuNDY5LTIuNTM2LTMuOTc4LTMuNzktOS41NjYtMy43OS0xNi43ODMsMC02LjA2OC44NS0xMi41NCwyLjU1LTE5LjQ0NSwyLjkyNi0xMS42NjMsNy4xMDYtMjEuMzU0LDEyLjU2OC0yOS4wNDUsNS45MjItOC40MywxMi4yMDYtMTIuNjQ1LDE4Ljg2Ni0xMi42NDVoNDUuMzk3Yy42MjcsMCwuOTYyLjM2OS45NjIsMS4xMDcsMCwuMTY4LS4wNDIuMzItLjEyNi41MDJsLTIuNzg3LDExLjQ1NGMtLjE1My45ODItLjY4MywxLjQ3Ny0xLjU2MSwxLjQ3N2gtMzAuNTAyYy0zLjIxOCwwLTUuODI0LDEuODk2LTcuNzQ3LDUuNjc4LTEuMTU2LDEuOTU4LTMuMDUxLDYuMjI5LTQuMjUsMTAuNTk3TTI3Ni4yNjIsMzY1LjIwNGMuMzItMS4wNzMuNDg4LS41MDIsMS4yMTItLjUwMmgzMi4zMjdjLjY0MSwwLC45NjIuNDExLjk2MiwxLjIxMiwwLC4wODMtLjk2MiwzLjk5OS0yLjg5OSwxMS43MzItLjI1MSwxLjA1OS0uNzgxLDEuNTk2LTEuNTc1LDEuNTk2aC0zMi4zNDFjLS41NTcsMCwtLjgzNiwxLjQ0Mi0uODM2LjcwMyIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0uNjY1LDQ2Ni44NTF2LTMuODE1aDIxLjI4MmMzLjE4NiwwLDQuODc3LTEuODQ5LDQuODc3LTQuNTI0LDAtMi45NS0xLjczLTQuNDQ0LTQuODc3LTQuNDQ0aC0xMy4zNzVjLTUuMTUzLDAtOC4zMzktMy40MjMtOC4zMzktNy45ODUsMC00LjQ4NSwyLjk1LTcuODI4LDguNDE4LTcuODI4aDIwLjQxNnYzLjgxNUg4LjY1MWMtMi44MzIsMC00LjQ0NSwxLjczLTQuNDQ1LDQuMjQ4LDAsMi41OTcsMS42OTEsNC4yMDksNC40MDYsNC4yMDloMTMuMzM1YzUuNTQ2LDAsOC40OTcsMi43NTQsOC40OTcsOC4xNDQsMCw0LjY4MS0yLjc5Myw4LjE4Mi04LjQ5Nyw4LjE4MkguNjY1WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik03MC4wMTMsNDY2Ljg1MWwtNi4yOTQtMjIuMjI2LTguNjE1LDIxLjE2M2MtLjM5NC45NDQtMS4wMjMsMS40NTYtMS45NjcsMS40NTZzLTEuNjEzLS41MTItMi4wMDYtMS40NTZsLTguNTc2LTIxLjE2My02LjI5NCwyMi4yMjZoLTMuNzc2bDcuNzEtMjcuMzM5Yy4yNzUtMS4wNjIuOTA1LTEuNjEzLDEuOTY3LTEuNjEzLjgyNiwwLDEuNjEzLjQzMywxLjk2NywxLjMzOGw5LjEyNiwyMi4zNDMsOS4wODctMjIuMzQzYy4zNTQtLjkwNSwxLjA2Mi0xLjMzOCwxLjg4OC0xLjMzOC45ODMsMCwxLjU3NC41NTEsMS44ODgsMS42MTNsNy43MSwyNy4zMzloLTMuODE2WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMDguMDg2LDQ2Ni44NTFsLTQuNTYzLTcuNjcxaC0xNS4wMjdsMS44ODgtMy4zMDRoMTEuMTcybC03LjU1My0xMi42NjctMTQuMDQzLDIzLjY0MmgtNC4zNjZsMTYuNjc5LTI3LjczMmMuNDcyLS43ODcsMS4wMjMtMS4yNTksMS44ODgtMS4yNTkuODI2LDAsMS4zNzcuNDcyLDEuODQ5LDEuMjU5bDE2LjY3OSwyNy43MzJoLTQuNjAzWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNDMuNzYsNDY2Ljg1MWwtNy41NTMtOC4xMDRoLTEyLjU0OHYtMy41NGgxMi43ODRjNC4xNywwLDYuMjk0LTIuMzIxLDYuMjk0LTYuNzI3cy0yLjMyMS02LjQxMi02LjI5NC02LjQxMmgtMTYuNDgydjI0Ljc4MmgtMy44MTZ2LTI4LjU5OGgyMC4yOThjNi4zMzMsMCwxMC4wNywzLjk3MywxMC4wNywxMC4yMjgsMCw0Ljc2LTIuMTYzLDguMTgyLTYuMDE5LDkuNTk4bDguNjk0LDguNzcyaC01LjQyOVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTYxLjA2NCw0NjYuODUxdi0yNC43ODJoLTExLjIxMXYtMy44MTVoMjYuMjM3djMuODE1aC0xMS4yMTF2MjQuNzgyaC0zLjgxNVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTc5Ljc4NCw0NjcuMDQ3di0yOC43OTRoMy44MTV2MjguNzk0aC0zLjgxNVpNMjAzLjQ2NSw0NjcuMDQ3di0xMi45OGgtMTYuMTY3di0zLjU0MWgxNi4xNjd2LTEyLjI3MmgzLjg1NXYyOC43OTRoLTMuODU1WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yMjUuNDksNDY2Ljg1MWMtNy44NjcsMC0xMy42NS02LjI5NC0xMy42NS0xNC41OTQsMC04LjQxOSw1Ljc4My0xNC4wMDQsMTMuNjUtMTQuMDA0aDYuODQ1YzguMTA0LDAsMTMuNzI5LDUuNzAzLDEzLjcyOSwxNC4wMDRzLTUuNzQzLDE0LjU5NC0xMy43MjksMTQuNTk0aC02Ljg0NVpNMjMyLjMzNSw0NjMuMDM1YzUuNzgyLDAsOS45MTMtNC41MjQsOS45MTMtMTAuNTgyLDAtNi4wOTgtNC4wOTItMTAuMzg1LTkuOTEzLTEwLjM4NWgtNi44NDVjLTUuNjY1LDAtOS44MzQsNC4yNDgtOS44MzQsMTAuMzg1LDAsNi4wNTgsNC4xMywxMC41ODIsOS44MzQsMTAuNTgyaDYuODQ1WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yODUuMDAzLDQ2Ni44NTFsLTYuMjk0LTIyLjIyNi04LjYxNCwyMS4xNjNjLS4zOTQuOTQ0LTEuMDIyLDEuNDU2LTEuOTY3LDEuNDU2cy0xLjYxMy0uNTEyLTIuMDA3LTEuNDU2bC04LjU3NS0yMS4xNjMtNi4yOTQsMjIuMjI2aC0zLjc3Nmw3LjcxLTI3LjMzOWMuMjc1LTEuMDYyLjkwNS0xLjYxMywxLjk2Ny0xLjYxMy44MjYsMCwxLjYxMy40MzMsMS45NjcsMS4zMzhsOS4xMjcsMjIuMzQzLDkuMDg3LTIyLjM0M2MuMzU0LS45MDUsMS4wNjItMS4zMzgsMS44ODgtMS4zMzguOTgzLDAsMS41NzMuNTUxLDEuODg5LDEuNjEzbDcuNzEsMjcuMzM5aC0zLjgxNloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjkyLjUxMiw0NjYuODUxdi0yOC41OThoMjUuMDk4djMuODE1aC0yMS4yODJ2MjAuOTY3aDIxLjMyMXYzLjgxNWgtMjUuMTM3Wk0zMDAuMDI2LDQ1NC4wNjZ2LTMuNTQxaDE2LjUyMXYzLjU0MWgtMTYuNTIxWiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==';
  window._eliteLogo = _logo;
});

window.addEventListener('DOMContentLoaded', async () => {
  pdfCv  = document.getElementById('pdf-cv');
  annCv  = document.getElementById('ann-cv');
  pdfCtx = pdfCv.getContext('2d');
  annCtx = annCv.getContext('2d');

  const { data: { session } } = await sb.auth.getSession();
  if (!session) { location.href = 'index.html'; return; }
  CU = session.user;

  await loadUserProfile();
  buildSidebar();
  setupCanvas();
  setupDragDrop();
  initTheme();
  setupKeys();
  initIPadMode();
  initApplePencil();
  loadAIRules();
  const sessionRestored = await restoreSession();
  // Only show dashboard if no session was restored
  if (!sessionRestored) {
    loadJobDashboard();
  }
});

// ═══════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════
async function loadUserProfile() {
  const { data } = await sb.from('markup_users').select('*').eq('id', CU.id);
  const p = data && data[0];
  if (p) {
    userRole = p.role || 'tech';
    document.getElementById('user-nm').textContent = p.full_name || CU.email.split('@')[0];
    document.getElementById('user-rl').textContent = userRole === 'admin' ? 'Admin' : 'Tech';
    const adminMenuItem = document.getElementById('user-menu-admin');
    if (adminMenuItem) adminMenuItem.style.display = userRole === 'admin' ? 'block' : 'none';
    document.getElementById('user-av').textContent = (p.full_name || CU.email)[0].toUpperCase();
  }
  // Sync API key and custom icons from Supabase after auth
  await loadApiKeyFromCloud();
  await loadCatColorsFromCloud();
  await loadCustomIcons();
  await dedupeAllCatColors();
}

function toggleUserMenu(e) {
  e.stopPropagation();
  const menu = document.getElementById('user-menu');
  if (!menu) return;
  const isOpen = menu.style.display !== 'none';
  menu.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    // Close when clicking outside
    const close = (ev) => { menu.style.display = 'none'; document.removeEventListener('click', close); };
    setTimeout(() => document.addEventListener('click', close), 0);
  }
}

async function doSignOut() {
  stopPresence();
  await sb.auth.signOut();
  location.href = 'index.html';
}

// DEV ONLY — wipe all test projects + storage
// Call from browser console: await window.devWipeAllProjects()
window.devWipeAllProjects = async function() {
  if (!confirm('⚠️ DELETE ALL PROJECTS AND PDF FILES FROM DATABASE? This cannot be undone.')) return;
  try {
    // List and delete all files in plan-pdfs bucket
    const { data: files } = await sb.storage.from('plan-pdfs').list('', { limit: 1000 });
    if (files && files.length) {
      // Each project is a folder — list files inside each
      for (const folder of files) {
        const { data: inner } = await sb.storage.from('plan-pdfs').list(folder.name, { limit: 1000 });
        if (inner && inner.length) {
          const paths = inner.map(f => folder.name + '/' + f.name);
          await sb.storage.from('plan-pdfs').remove(paths);
        }
      }
    }
    // Delete all projects rows
    const { error } = await sb.from('markup_projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
    console.log('✅ All projects and PDFs wiped');
    alert('✅ Done! All projects and PDF files deleted. Reload the page.');
  } catch(e) {
    console.error('Wipe failed:', e);
    alert('❌ Wipe failed: ' + e.message);
  }
};

// ═══════════════════════════════════════════════════════════
// MENU
// ═══════════════════════════════════════════════════════════
function toggleMenu(name) {
  const id = 'mi-' + name;
  const el = document.getElementById(id);
  if (openMenu && openMenu !== id) document.getElementById(openMenu).classList.remove('open');
  el.classList.toggle('open');
  openMenu = el.classList.contains('open') ? id : null;
}
function closeMenus() {
  document.querySelectorAll('.mi.open').forEach(m => m.classList.remove('open'));
  openMenu = null;
}
document.addEventListener('click', e => {
  if (!e.target.closest('.mi')) closeMenus();
  if (!e.target.closest('#ctx')) hideCtx();
});

// ═══════════════════════════════════════════════════════════
// SIDEBAR / ICONS
// ═══════════════════════════════════════════════════════════
function buildSidebar() {
  // Pre-fill API key if saved
  const saved = localStorage.getItem('elite_anthropic_key');
  rebuildSidebar();
  Promise.all([loadCatColorsFromCloud(), loadCustomIcons()]).then(() => { dedupeAllCatColors(); pruneEmptyCats(); rebuildSidebar(); }); // remove any cats with no icons from previous sessions
  rebuildSidebar();
}

function setCat(c, el) {
  activeCat = c;
  document.querySelectorAll('.scat').forEach(t => {
    t.classList.remove('on');
    const tc = CAT_COLORS[t.textContent] || '#94a3b8';
    t.style.background = 'transparent';
    t.style.color = tc;
    t.style.borderColor = tc;
  });
  const cc = CAT_COLORS[c] || '#38bdf8';
  el.classList.add('on'); el.style.background = cc; el.style.color = '#fff'; el.style.borderColor = cc;
  renderIconGrid(c, document.getElementById('sb-search').value);
}

function filterIcons(q) { renderIconGrid(activeCat, q); }

function renderIconGrid(cat, q = '') {
  const f = ICONS.filter(i => (cat === 'All' || i.cat === cat) && (!q || i.name.toLowerCase().includes(q.toLowerCase())));
  document.getElementById('sb-grid').innerHTML = f.map(ic =>
    `<div class="ic${pickIcon===ic.id?' on':''}"
        onclick="selectIcon('${ic.id}',this)"
        ondblclick="event.stopPropagation();openEditIcon('${ic.id}')"
        oncontextmenu="event.preventDefault();openEditIcon('${ic.id}')"
        title="Click to place  |  Double-click or right-click to edit">
      <img src="${ic.f}" alt="${ic.name}" onerror="this.style.opacity='.15'">
      <span>${ic.name}</span>
    </div>`
  ).join('') || `<div style="grid-column:1/-1;padding:20px;text-align:center;font-size:12px;color:var(--txt3)">No icons found</div>`;
}

function openEditIcon(id) {
  showIconCreator();
  setTimeout(() => editAnyIcon(id), 100);
}

function selectIcon(id, el) {
  if (!pdfDoc) { toast('Open a PDF plan first'); return; }
  pickIcon = id;
  document.querySelectorAll('.ic').forEach(i => i.classList.remove('on'));
  el.classList.add('on');
  annCv.style.cursor = 'crosshair';
  toast('Click on the plan to place — Esc to cancel');
}


// ── Draggable toolbar ──────────────────────────────────────────────
(function(){
  // Apply saved position (or default to right side) — call every time toolbar becomes visible
  function applyToolbarPos() {
    const tb = document.getElementById('toolbar');
    if (!tb) return;
    try {
      const saved = localStorage.getItem('tbPos');
      if (saved) {
        const p = JSON.parse(saved);
        // Clamp to current viewport in case window was resized
        const w = tb.offsetWidth || 46, h = tb.offsetHeight || 400;
        const nx = Math.max(0, Math.min(window.innerWidth - w, p.x));
        const ny = Math.max(0, Math.min(window.innerHeight - h, p.y));
        tb.style.left = nx + 'px';
        tb.style.top  = ny + 'px';
        return;
      }
    } catch(e) {}
    // Default: right side, vertically centered
    const w = tb.offsetWidth || 46;
    tb.style.left = (window.innerWidth - w - 12) + 'px';
    tb.style.top  = Math.round((window.innerHeight - 400) / 2) + 'px';
  }

  function saveToolbarPos() {
    const tb = document.getElementById('toolbar');
    if (!tb) return;
    try { localStorage.setItem('tbPos', JSON.stringify({x: parseInt(tb.style.left) || 0, y: parseInt(tb.style.top) || 0})); } catch(e) {}
  }

  // Expose so show-toolbar callers can invoke it
  window._applyToolbarPos = applyToolbarPos;

  function initToolbarDrag() {
    const tb = document.getElementById('toolbar');
    const handle = document.getElementById('toolbar-handle');
    if (!tb || !handle) return;

    let dragging = false, ox = 0, oy = 0;

    handle.addEventListener('mousedown', function(e) {
      if (e.button !== 0) return;
      dragging = true;
      const r = tb.getBoundingClientRect();
      ox = e.clientX - r.left;
      oy = e.clientY - r.top;
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
      if (!dragging) return;
      const w = tb.offsetWidth, h = tb.offsetHeight;
      const nx = Math.max(0, Math.min(window.innerWidth - w,  e.clientX - ox));
      const ny = Math.max(0, Math.min(window.innerHeight - h, e.clientY - oy));
      tb.style.left = nx + 'px';
      tb.style.top  = ny + 'px';
    });

    document.addEventListener('mouseup', function() {
      if (!dragging) return;
      dragging = false;
      document.body.style.userSelect = '';
      saveToolbarPos();
    });

    // Touch support
    handle.addEventListener('touchstart', function(e) {
      const t = e.touches[0];
      dragging = true;
      const r = tb.getBoundingClientRect();
      ox = t.clientX - r.left;
      oy = t.clientY - r.top;
      e.preventDefault();
    }, {passive: false});

    document.addEventListener('touchmove', function(e) {
      if (!dragging) return;
      const t = e.touches[0];
      const w = tb.offsetWidth, h = tb.offsetHeight;
      const nx = Math.max(0, Math.min(window.innerWidth - w,  t.clientX - ox));
      const ny = Math.max(0, Math.min(window.innerHeight - h, t.clientY - oy));
      tb.style.left = nx + 'px';
      tb.style.top  = ny + 'px';
      e.preventDefault();
    }, {passive: false});

    document.addEventListener('touchend', function() {
      if (!dragging) return;
      dragging = false;
      saveToolbarPos();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initToolbarDrag);
  else initToolbarDrag();
})();
// ──────────────────────────────────────────────────────────────────

function toggleDrawToolbar() {
  // Toolbar is always visible when a project is open — this button is kept for iPad compat
  const tb = document.getElementById('toolbar');
  if (!tb) return;
  const visible = tb.style.display === 'none';
  tb.style.display = visible ? 'flex' : 'none';
  if (visible && window._applyToolbarPos) window._applyToolbarPos();
  const btn = document.getElementById('pc-toolbar-btn');
  if (btn) btn.style.borderColor = visible ? 'var(--acc)' : 'var(--bdr2)';
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('hidden');
  if (!pdfDoc) return;
  _applyFitScale();
}

// Natural page width cached after first render — never need async to get it
let _natPageWidth = 0;

async function _applyFitScale() {
  if (!pdfDoc) return;
  console.log('[_applyFitScale] called from:', new Error().stack.split('\n')[2].trim());
  if (!_natPageWidth) {
    await pdfDoc.getPage(1).then(pg => { _natPageWidth = pg.getViewport({scale:1}).width; });
  }
  const wrap = document.getElementById('cwrap');
  const ccon = document.getElementById('ccon');

  // Read availW synchronously — double-rAF ensures sidebar reflow is committed
  const doFit = () => {
    const availW = wrap.clientWidth - 42;
    if (availW <= 0) { if (ccon) ccon.style.display = 'block'; return; }
    const newScale = Math.floor((availW / _natPageWidth) * 100) / 100;
    // Skip only if scale matches AND canvas is already rendered+visible for this doc.
    // Otherwise (e.g. fresh PDF load where ccon was hidden) we must still render.
    const _alreadyRendered = renderScale > 0 && pdfCv.width > 0 && ccon && ccon.style.display !== 'none';
    if (Math.abs(newScale - pdfScale) < 0.005 && _alreadyRendered) return; // already correct, skip re-render

    clearTimeout(zoomRenderTimer);
    wrap.classList.remove('zoomed');

    // Instantly CSS-scale the already-rendered canvas to look right
    if (renderScale > 0 && pdfCv.width > 0) {
      const cssR = newScale / renderScale;
      if (ccon) {
        ccon.style.transformOrigin = '0 0';
        ccon.style.transform = 'scale(' + cssR + ')';
        ccon.style.width  = Math.round(pdfCv.width  * cssR) + 'px';
        ccon.style.height = Math.round(pdfCv.height * cssR) + 'px';
      }
    }

    pdfScale = newScale;
    renderPages().then(() => { wrap.scrollLeft = 0; wrap.scrollTop = 0; });
  };

  requestAnimationFrame(() => requestAnimationFrame(doFit));
}

// ═══════════════════════════════════════════════════════════
// CANVAS SETUP
// ═══════════════════════════════════════════════════════════
function setupCanvas() {
  annCv.addEventListener('mousedown', onDown);
  annCv.addEventListener('mousemove', onMove);
  annCv.addEventListener('mouseup',   onUp);
  annCv.addEventListener('mouseleave', () => { coverHoverPos = null; if (tool === 'cover') redraw(); onUp(); });
  annCv.addEventListener('contextmenu', onRightClick);
  // Double-click on a text stroke to open inline editor
  annCv.addEventListener('dblclick', e => {
    const p = getPos(e);
    const sk = hitStroke(p);
    if (sk >= 0 && strokes[sk].type === 'text') {
      sel = { type: 'stroke', index: sk };
      redraw();
      openTextEditor(null, sk);
    }
  });
  annCv.addEventListener('touchstart', onTouchStart, { passive: false });
  // Touch double-tap = edit text
  let _lastTap = 0, _lastTapX = 0, _lastTapY = 0;
  annCv.addEventListener('touchend', e => {
    if (e.changedTouches.length !== 1) return;
    const now = Date.now();
    const t = e.changedTouches[0];
    const dx = t.clientX - _lastTapX, dy = t.clientY - _lastTapY;
    if (now - _lastTap < 320 && Math.hypot(dx, dy) < 30) {
      // double tap
      const p = getPos({ clientX: t.clientX, clientY: t.clientY });
      const sk = hitStroke(p);
      if (sk >= 0 && strokes[sk].type === 'text') {
        e.preventDefault();
        sel = { type: 'stroke', index: sk };
        redraw();
        openTextEditor(null, sk);
        _lastTap = 0;
        return;
      }
    }
    _lastTap = now; _lastTapX = t.clientX; _lastTapY = t.clientY;
  }, { passive: false });
  annCv.addEventListener('touchmove',  onTouchMove,  { passive: false });
  annCv.addEventListener('touchend',   onTouchEnd,   { passive: false });
}

function setupDragDrop() {
  // Drag and drop removed — use New Project button or click to browse
}

// ═══════════════════════════════════════════════════════════
// CANVAS COORDS
// ═══════════════════════════════════════════════════════════
function getPos(e) {
  const r = annCv.getBoundingClientRect();
  const rs = renderScale || 1;
  return {
    x: (e.clientX - r.left) * (annCv.width / r.width) / rs,
    y: (e.clientY - r.top)  * (annCv.height / r.height) / rs - (196 / rs)
  };
}

// ═══════════════════════════════════════════════════════════
// MOUSE EVENTS
// ═══════════════════════════════════════════════════════════
function onDown(e) {
  if (!pdfDoc) return;
  // If text editor is open, commit it then stop — don't process the click further
  if (document.getElementById('_txt-editor') && typeof _txtCommitFn === 'function') {
    _txtCommitFn();
    return;
  }
  hideCtx();
  const p = getPos(e);

  // Place icon mode
  if (pickIcon) {
    placeIcon(pickIcon, p);
    pickIcon = null;
    document.querySelectorAll('.ic').forEach(i => i.classList.remove('on'));
    annCv.style.cursor = 'default';
    setTool('select');
    return;
  }

  if (tool === 'select') {
    const _fh = findHandle(p);
    if (_fh.type && sel?.type === 'icon') {
      const pi = icons[sel.index];
      pushUndo(); // snapshot before any move/resize/rotate
      if (_fh.type === 'rotate') {
        // Rotate around icon center; anchor angle from icon center to cursor
        rotating = true;
        rAngle = Math.atan2(p.y - pi.y, p.x - pi.x);
        rRot = pi.rotation || 0;
        _rotCorner = _fh.corner;
      } else {
        // Resize — On iPad/iPhone only, block unless in iconResizeMode
        const _isIpadIphone = /iPad|iPhone|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (_isIpadIphone && !iconResizeMode) {
          dragOff = { x: p.x - pi.x, y: p.y - pi.y };
          dragging = true;
        } else {
          resizing = true;
          const _rn = pi.img?.naturalWidth && pi.img?.naturalHeight ? pi.img.naturalWidth / pi.img.naturalHeight : 1;
          const _rhw = (pi.scale||36)*_rn/2; const _rhh = (pi.scale||36)/2;
          rDist = Math.hypot(_rhw, _rhh);
          rScale = pi.scale || 36;
        }
      }
      return;
    }
    const ic = hitIcon(p);
    const sk = hitStroke(p);
    if (ic !== null) {
      // Shift+click: toggle icon in/out of multiSel
      if (e.shiftKey) {
        const _already = multiSel.indexOf(ic);
        if (_already >= 0) {
          multiSel.splice(_already, 1);
        } else {
          // Add current single sel to multiSel if not there yet
          if (sel?.type === 'icon' && !multiSel.includes(sel.index)) multiSel.push(sel.index);
          multiSel.push(ic);
        }
        // Keep sel pointing at the last-clicked for handle/toolbar reference
        if (multiSel.length > 0) {
          sel = { type: 'icon', index: ic };
        } else {
          sel = null; closeItb(); closeStb();
        }
        if (multiSel.length > 1) closeItb(); // hide single-icon toolbar during multi-select
        redraw(); return;
      }
      // Normal click: clear multi, select single
      multiSel = [];
      pushUndo(); // snapshot before move/resize
      sel = { type: 'icon', index: ic };
      if (iconResizeMode) {
        // In resize mode: drag from icon center changes scale
        const pi = icons[ic];
        const _rn = pi.img?.naturalWidth && pi.img?.naturalHeight ? pi.img.naturalWidth / pi.img.naturalHeight : 1;
        const _rhw = (pi.scale||36)*_rn/2; const _rhh = (pi.scale||36)/2;
        rDist = Math.hypot(_rhw, _rhh) || 18;
        rScale = pi.scale || 36;
        resizing = true;
      } else {
        dragOff = { x: p.x - icons[ic].x, y: p.y - icons[ic].y };
        dragging = true;
      }
      closeStb(); showItb(icons[ic]);
    } else if (sk >= 0) {
      multiSel = [];
      pushUndo(); // snapshot before stroke move
      sel = { type: 'stroke', index: sk };
      dragOff = { x: p.x, y: p.y };
      dragging = true;
      closeItb();
      showStb(strokes[sk]);
    } else {
      multiSel = []; sel = null; closeItb(); closeStb();
      iconResizeMode = false; // exit resize mode when deselecting
    }
    redraw(); return;
  }
  // Deselect icon/stroke if something is selected and user clicks empty canvas on any tool
  if (sel) {
    const _icHit = hitIcon(p);
    const _skHit = hitStroke(p);
    if (_icHit === null && _skHit < 0) { sel = null; closeItb(); closeStb(); iconResizeMode = false; redraw(); }
  }
  if (tool === 'eraser') { eraseAt(p); return; }
  if (tool === 'text') { addText(p); return; }

  drawing = true;
  drawStart = { ...p }; drawCur = { ...p };
  if (tool === 'pen') penPath = [{ ...p }];
  if (tool === 'cover') {
    pushUndo();
    coverPath = [{ ...p }];
    _coverPaintDab(p);
  }
}

function onMove(e) {
  const p = getPos(e);
  // Cover brush: always track hover position and redraw the size-preview ring,
  // even when not actively dragging, so the user can see the brush size before clicking.
  if (tool === 'cover') {
    coverHoverPos = { ...p };
    if (!drawing) redraw();
  }
  if (rotating && sel?.type === 'icon') {
    const pi = icons[sel.index];
    const a = Math.atan2(p.y - pi.y, p.x - pi.x);
    let _rot = ((rRot + (a - rAngle) * 180 / Math.PI) % 360 + 360) % 360;
    if (e.shiftKey) _rot = Math.round(_rot / 15) * 15; // shift = snap to 15° increments
    pi.rotation = _rot;
    redraw(); return;
  }
  if (resizing && sel?.type === 'icon') {
    const pi = icons[sel.index];
    const d = Math.hypot(p.x - pi.x, p.y - pi.y); // both in scale=1 space
    const rs = renderScale || 1;
    pi.scale = Math.max(12/rs, Math.min(140/rs, (d / rDist) * rScale)); // stored at scale=1
    document.getElementById('itb-sz').value = Math.round(pi.scale * rs); // show in screen px
    redraw(); return;
  }
  if (dragging) {
    if (sel?.type === 'icon') {
      const _newX = p.x - dragOff.x;
      const _newY = p.y - dragOff.y;
      const _dx = _newX - icons[sel.index].x;
      const _dy = _newY - icons[sel.index].y;
      icons[sel.index].x = _newX;
      icons[sel.index].y = _newY;
      // Also move all other multi-selected icons by same delta
      if (multiSel.length > 1) {
        multiSel.forEach(idx => { if (idx !== sel.index) { icons[idx].x += _dx; icons[idx].y += _dy; } });
      }
    } else if (sel?.type === 'stroke') {
      moveStroke(sel.index, p.x - dragOff.x, p.y - dragOff.y);
      dragOff = { x: p.x, y: p.y };
    }
    redraw(); return;
  }
  // ── Hover cursor (select tool, idle) ─────────────────────────────────────
  if (tool === 'select' && !dragging && !rotating && !resizing) {
    const _fh = findHandle(p);
    const _ic = hitIcon(p);
    let _newHover = null;
    if (_fh.type === 'rotate') {
      annCv.style.cursor = _ROTATE_CURSOR;
      _newHover = 'rotate';
    } else if (_fh.type === 'resize') {
      // Compute the outward angle of this corner in screen space (icon rotation + corner direction)
      // then pick the closest of the 4 diagonal CSS resize cursors
      (function() {
        const pi = icons[sel.index];
        const _rot = (pi.rotation || 0) * Math.PI / 180;
        const _cx = _fh.corner.lx, _cy = _fh.corner.ly; // local corner coords (e.g. -hsW,-hsH)
        // Rotate the local corner vector by icon rotation to get screen-space outward direction
        const _sx = Math.cos(_rot)*_cx - Math.sin(_rot)*_cy;
        const _sy = Math.sin(_rot)*_cx + Math.cos(_rot)*_cy;
        // Angle in degrees (0=right, 90=down, etc.)
        let _deg = (Math.atan2(_sy, _sx) * 180 / Math.PI + 360) % 360;
        // Map to nearest 45° diagonal cursor (4 options repeat every 90°)
        // nwse: ~315/135, nesw: ~45/225, ew: 0/180, ns: 90/270 — we only use diagonals
        const _cursors = ['ew-resize','nwse-resize','ns-resize','nesw-resize','ew-resize','nwse-resize','ns-resize','nesw-resize'];
        const _idx = Math.round(_deg / 45) % 8;
        annCv.style.cursor = _cursors[_idx];
      })();
      _newHover = 'resize';
    } else if (_ic !== null) {
      annCv.style.cursor = 'grab';
      _newHover = 'icon';
    } else {
      annCv.style.cursor = 'default';
    }
    if (_newHover !== _hoverHandle) { _hoverHandle = _newHover; redraw(); }
    return;
  }
  if (!drawing) return;
  drawCur = { ...p };
  if (tool === 'pen') penPath.push({ ...p });
  if (tool === 'cover') { coverPath.push({ ...p }); _coverPaintDab(p); }
  redraw(); drawPreview();
}

function onUp() {
  _hoverHandle = null; _rotCorner = null;
  if (rotating || resizing || dragging) { rotating = resizing = dragging = false; autoSave(); return; }
  if (!drawing) return;
  drawing = false;
  commitStroke();
}

function onRightClick(e) {
  e.preventDefault();
  const p = getPos(e);
  const ic = hitIcon(p);
  const sk = hitStroke(p);
  if (ic !== null) { sel = { type: 'icon', index: ic }; redraw(); showCtx(e.clientX, e.clientY); }
  else if (sk >= 0) { sel = { type: 'stroke', index: sk }; showCtx(e.clientX, e.clientY); }
}

// ═══════════════════════════════════════════════════════════
// TOUCH EVENTS
// ═══════════════════════════════════════════════════════════
function onTouchStart(e) {
  if (pencilActive) return;
  // Block canvas interaction when any modal is open (prevents color picker touches bleeding through)
  if (document.querySelector('.mbg:not(.gone)')) return;
  e.preventDefault();
  if (e.touches.length === 2) {
    // Cancel any single-finger action
    touches.panning = false; touches.tapping = false;
    // End any drawing in progress
    if (drawing) { drawing = false; penPath = []; }
    const t  = e.touches;
    const wr = document.getElementById('cwrap');
    touches.pinching    = true;
    touches.pinchDist   = Math.hypot(t[1].clientX-t[0].clientX, t[1].clientY-t[0].clientY);
    touches.pinchScale  = pdfScale; // target scale at pinch start (may differ from renderScale if zoom pending)
    touches.pinchMidX   = (t[0].clientX + t[1].clientX) / 2;
    touches.pinchMidY   = (t[0].clientY + t[1].clientY) / 2;
    touches.pinchScrollX = wr.scrollLeft;
    touches.pinchScrollY = wr.scrollTop;
    clearTimeout(zoomRenderTimer);
    return;
  }
  if (touches.pinching) return;
  const t = e.touches[0];
  touches.tapStart = { x: t.clientX, y: t.clientY };
  touches.tapMoved = false;
  touches.tapping  = true;
  touches.panStart = { x: t.clientX, y: t.clientY };
  const wrap = document.getElementById('cwrap');
  touches.scrollStart = { x: wrap.scrollLeft, y: wrap.scrollTop };
  // Don't force renderPages during pan - let the pinch timer handle it
  // Extra renderPages calls cause double-rescaling of icon coords
  onDown({ clientX: t.clientX, clientY: t.clientY });
}

function onTouchMove(e) {
  if (pencilActive) return;
  if (document.querySelector('.mbg:not(.gone)')) return;
  e.preventDefault();
  if (e.touches.length === 2 && touches.pinching) {
    const t    = e.touches;
    const wrap = document.getElementById('cwrap');
    const ccon = document.getElementById('ccon');
    const rect = wrap.getBoundingClientRect();
    const d    = Math.hypot(t[1].clientX-t[0].clientX, t[1].clientY-t[0].clientY);
    // Target scale based on spread ratio from pinch start
    // touches.pinchScale = renderScale at pinch start (set in onTouchStart)
    // Cap scale to prevent canvas exceeding iOS Safari's max canvas pixel limit
    // iOS limit: ~16M total pixels. For a typical floor plan page, compute safe max.
    const _iosMaxPx = 16000000; // conservative iOS canvas pixel limit
    const _pageW = _natPageWidth || 800;
    const _pageH = pdfPages[0] ? pdfPages[0].h / (renderScale || 1) : 1100;
    const _numPg = pdfDoc ? pdfDoc.numPages : 1;
    const _maxSafeScale = Math.sqrt(_iosMaxPx / (_pageW * (_pageH * _numPg + 196)));
    const _isIpadDevice = navigator.maxTouchPoints > 1 && window.innerWidth >= 768;
    const _scaleMax = _isIpadDevice ? Math.max(2, _maxSafeScale) : Infinity;
    const newScale = Math.max(0.1, Math.min(_scaleMax, touches.pinchScale * (d / touches.pinchDist)));
    // CSS ratio: visual scale vs what canvas is ACTUALLY rendered at (renderScale, unchanged during pinch)
    const cssRatio = newScale / touches.pinchScale;
    // Fixed anchor: the content point under the initial pinch midpoint
    const anchorX = touches.pinchScrollX + (touches.pinchMidX - rect.left);
    const anchorY = touches.pinchScrollY + (touches.pinchMidY - rect.top);
    // Apply CSS transform
    ccon.style.transformOrigin = '0 0';
    ccon.style.transform = 'scale(' + cssRatio + ')';
    ccon.style.width  = Math.round(pdfCv.width  * cssRatio) + 'px';
    ccon.style.height = Math.round(pdfCv.height * cssRatio) + 'px';
    // Pan so anchor stays fixed under pinch midpoint
    wrap.scrollLeft = anchorX * cssRatio - (touches.pinchMidX - rect.left);
    wrap.scrollTop  = anchorY * cssRatio - (touches.pinchMidY - rect.top);
    touches.lastPinchScale = newScale;
    return;
  }
  if (touches.pinching) return;
  const t = e.touches[0];
  if (touches.tapStart) {
    if (Math.abs(t.clientX-touches.tapStart.x) > 8 || Math.abs(t.clientY-touches.tapStart.y) > 8)
      touches.tapMoved = true;
  }
  if (touches.tapMoved && !sel && !drawing && !resizing && !rotating) {
    // Pan canvas only when not drawing/resizing/rotating
    const wrap = document.getElementById('cwrap');
    wrap.scrollLeft = touches.scrollStart.x - (t.clientX - touches.panStart.x);
    wrap.scrollTop  = touches.scrollStart.y - (t.clientY - touches.panStart.y);
    return;
  }
  onMove({ clientX: t.clientX, clientY: t.clientY });
}

function onTouchEnd(e) {
  if (pencilActive) return;
  if (document.querySelector('.mbg:not(.gone)')) return;
  e.preventDefault();
  const wasPinching = touches.pinching && e.touches.length < 2;
  if (e.touches.length < 2) touches.pinching = false;
  if (e.touches.length === 0) touches.panning = false;

  if (wasPinching && touches.lastPinchScale && pdfDoc) {
    const wrap = document.getElementById('cwrap');
    const ccon = document.getElementById('ccon');
    // cssRatio = how much we visually scaled vs what was rendered
    const cssRatio = touches.lastPinchScale / touches.pinchScale;
    // Scroll fraction in CSS-scaled space
    const cssW = pdfCv.width  * cssRatio;
    const cssH = pdfCv.height * cssRatio;
    const fx = cssW > wrap.clientWidth  ? wrap.scrollLeft / (cssW - wrap.clientWidth)  : 0;
    const fy = cssH > wrap.clientHeight ? wrap.scrollTop  / (cssH - wrap.clientHeight) : 0;
    // Clear CSS transform before render to avoid double-scaling
    if (ccon) { ccon.style.transform=''; ccon.style.transformOrigin=''; ccon.style.width=''; ccon.style.height=''; }
    pdfScale = touches.lastPinchScale;
    renderPages().then(() => {
      // Canvas rendered at new pdfScale. Restore scroll by fraction.
      wrap.scrollLeft = Math.max(0, fx * (pdfCv.width  - wrap.clientWidth));
      wrap.scrollTop  = Math.max(0, fy * (pdfCv.height - wrap.clientHeight));
    });
    return;
  }

  if (!touches.pinching) {
    // Double-tap detection: toggle iconResizeMode on selected icon
    const _now = Date.now();
    const _dtap = _now - (touches.lastTapTime || 0);
    const _t0 = e.changedTouches[0];
    const _dtapDist = touches.lastTapPos ? Math.hypot(_t0.clientX - touches.lastTapPos.x, _t0.clientY - touches.lastTapPos.y) : 999;
    if (_dtap < 350 && _dtapDist < 40 && !touches.tapMoved) {
      // Double-tap — check if on a selected icon
      const _dtp = getPos({ clientX: _t0.clientX, clientY: _t0.clientY });
      const _dic = hitIcon(_dtp);
      if (_dic !== null) {
        sel = { type: 'icon', index: _dic };
        iconResizeMode = !iconResizeMode;
        redraw();
        toast(iconResizeMode ? '🔴 Resize mode — drag to resize' : '🔵 Move mode — drag to move');
        touches.lastTapTime = 0; // reset so triple-tap doesn't re-toggle
        touches.tapping = false; touches.tapMoved = false;
        return;
      }
    }
    touches.lastTapTime = _now;
    touches.lastTapPos  = { x: _t0.clientX, y: _t0.clientY };

    onUp();
    touches.tapping  = false;
    touches.tapMoved = false;
  }
}

// ═══════════════════════════════════════════════════════════
// DRAWING
// ═══════════════════════════════════════════════════════════
function _coverPaintDab(p) {
  // Paint a white brush dab directly onto the base PDF canvas at natural coord p,
  // connecting to the previous point in coverPath for a smooth continuous stroke.
  const rs = renderScale || 1;
  const legendPx = 196;
  const ctx2 = pdfCv.getContext('2d');
  const cx = p.x * rs, cy = (p.y + legendPx/rs) * rs;
  const r = (coverBrushSize/2) * rs;
  ctx2.save();
  ctx2.fillStyle = '#ffffff';
  ctx2.strokeStyle = '#ffffff';
  ctx2.lineCap = 'round'; ctx2.lineJoin = 'round';
  ctx2.lineWidth = r * 2;
  const prev = coverPath.length > 1 ? coverPath[coverPath.length - 2] : null;
  if (prev) {
    ctx2.beginPath();
    ctx2.moveTo(prev.x * rs, (prev.y + legendPx/rs) * rs);
    ctx2.lineTo(cx, cy);
    ctx2.stroke();
  } else {
    ctx2.beginPath();
    ctx2.arc(cx, cy, r, 0, Math.PI*2);
    ctx2.fill();
  }
  ctx2.restore();
}

function setCoverBrushSize(v) {
  coverBrushSize = Math.max(6, Math.min(200, parseInt(v, 10) || 28));
  const slider = document.getElementById('cover-size-slider');
  const label = document.getElementById('cover-size-label');
  if (slider) slider.value = coverBrushSize;
  if (label) label.textContent = coverBrushSize + 'px';
  redraw(); // refresh the hover-preview circle at the new size immediately
}

function drawPreview() {
  if (!drawing) return;
  const rs = renderScale || 1;
  const legendPx = 196;
  annCtx.save();
  annCtx.strokeStyle = drawColor; annCtx.lineWidth = strokeW;
  annCtx.lineCap = 'round'; annCtx.lineJoin = 'round';
  if (tool === 'pen' && penPath.length > 1) {
    annCtx.beginPath(); penPath.forEach((p, i) => i ? annCtx.lineTo(p.x*rs, (p.y+legendPx/rs)*rs) : annCtx.moveTo(p.x*rs, (p.y+legendPx/rs)*rs)); annCtx.stroke();
  } else if (tool === 'line') {
    annCtx.beginPath(); annCtx.moveTo(drawStart.x*rs, (drawStart.y+legendPx/rs)*rs); annCtx.lineTo(drawCur.x*rs, (drawCur.y+legendPx/rs)*rs); annCtx.stroke();
  } else if (tool === 'rect') {
    annCtx.strokeRect(drawStart.x*rs, (drawStart.y+legendPx/rs)*rs, (drawCur.x-drawStart.x)*rs, (drawCur.y-drawStart.y)*rs);
  } else if (tool === 'cover' && coverPath.length > 0) {
    // While actively dragging: paint already applied live to pdfCv in onMove;
    // just show a thin ring around the brush at the current point.
    annCtx.save();
    annCtx.strokeStyle = '#dc2626';
    annCtx.setLineDash([4,3]);
    annCtx.lineWidth = 1.5;
    const lastP = coverPath[coverPath.length - 1];
    annCtx.beginPath();
    annCtx.arc(lastP.x*rs, (lastP.y+legendPx/rs)*rs, (coverBrushSize/2)*rs, 0, Math.PI*2);
    annCtx.stroke();
    annCtx.restore();
  } else if (tool === 'circle') {
    const rx = Math.abs(drawCur.x - drawStart.x) / 2, ry = Math.abs(drawCur.y - drawStart.y) / 2;
    annCtx.beginPath(); annCtx.ellipse((Math.min(drawStart.x,drawCur.x)+rx)*rs, (Math.min(drawStart.y,drawCur.y)+ry+legendPx/rs)*rs, rx*rs, ry*rs, 0, 0, Math.PI*2); annCtx.stroke();
  } else if (tool === 'arrow') {
    drawArrow(annCtx, {x:drawStart.x*rs,y:(drawStart.y+legendPx/rs)*rs}, {x:drawCur.x*rs,y:(drawCur.y+legendPx/rs)*rs});
  }
  annCtx.restore();
}

function drawArrow(ctx, f, t) {
  const hl = 14, a = Math.atan2(t.y - f.y, t.x - f.x);
  ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(t.x, t.y); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(t.x, t.y); ctx.lineTo(t.x - hl * Math.cos(a - Math.PI/6), t.y - hl * Math.sin(a - Math.PI/6));
  ctx.moveTo(t.x, t.y); ctx.lineTo(t.x - hl * Math.cos(a + Math.PI/6), t.y - hl * Math.sin(a + Math.PI/6));
  ctx.stroke();
}

function commitStroke() {
  const fillColor = document.getElementById('stb-fill')?.value || '#1d6fdb';
  const fillNoneActive = document.getElementById('stb-fill-none')?.style.background?.includes('var(--acc)') ||
    document.getElementById('stb-fill-none')?.style.background === 'var(--acc)';
  const fillOn = !fillNoneActive;
  const dash = document.getElementById('stb-dash')?.value || 'solid';
  const s = { type: tool, color: drawColor, width: strokeW, fill: fillColor, fillOn, dash };
  if (tool === 'pen') { if (penPath.length < 2) return; s.path = [...penPath]; }
  else if (tool === 'line' || tool === 'arrow') {
    if (drawStart.x === drawCur.x && drawStart.y === drawCur.y) return;
    s.from = { ...drawStart }; s.to = { ...drawCur };
  } else if (tool === 'rect') {
    if (Math.abs(drawCur.x - drawStart.x) < 3) return;
    s.x = drawStart.x; s.y = drawStart.y; s.w = drawCur.x - drawStart.x; s.h = drawCur.y - drawStart.y;
  } else if (tool === 'cover') {
    if (coverPath.length < 1) return;
    // Paint was already applied live to pdfCv during onMove (undo snapshot taken at stroke start).
    s.type = 'coverpath'; s.path = [...coverPath]; s.brush = coverBrushSize;
    strokes.push(s);
    coverPath = [];
    sel = null;
    redraw(); autoSave();
    return;
  } else if (tool === 'circle') {
    s.rx = Math.abs(drawCur.x - drawStart.x) / 2; s.ry = Math.abs(drawCur.y - drawStart.y) / 2;
    if (s.rx < 3) return;
    s.cx = Math.min(drawStart.x, drawCur.x) + s.rx; s.cy = Math.min(drawStart.y, drawCur.y) + s.ry;
  } else return;
  pushUndo(); strokes.push(s);
  // Select the new stroke and show STB
  sel = { type: 'stroke', index: strokes.length - 1 };
  showStb(s);
  redraw(); autoSave();
}

// ── Inline text editor ────────────────────────────────────────
// ── Inline text editor — transparent textarea sits exactly over the canvas text ──
// _txtEditIdx tracks which stroke is being edited so redraw hides it while editing
let _txtEditIdx = -1;
let _txtCommitFn = null; // called by onDown to commit editor on canvas click

function openTextEditor(p, existingIdx) {
  // Close any existing editor first
  const _old = document.getElementById('_txt-editor');
  if (_old) _old.remove();

  const rs       = renderScale || 1;
  const legendPx = 196;
  const isEdit   = existingIdx !== null && existingIdx >= 0;
  const existing = isEdit ? strokes[existingIdx] : null;

  const rect   = annCv.getBoundingClientRect();
  const scaleX = rect.width  / annCv.width;
  const scaleY = rect.height / annCv.height;

  const anchorX = isEdit ? existing.x : p.x;
  const anchorY = isEdit ? existing.y : p.y;

  const screenX = rect.left + anchorX * rs * scaleX;
  const screenY = rect.top  + (anchorY + legendPx / rs) * rs * scaleY;

  const sz   = isEdit ? (existing.size   || 14)       : (fontSize  || 14);
  const col  = isEdit ? (existing.color  || drawColor) : drawColor;
  const bold = isEdit ? !!existing.bold   : false;
  const ital = isEdit ? !!existing.italic : false;

  const screenFontPx = sz * rs * scaleY;
  const lineH        = Math.round(screenFontPx * 1.45);
  const fontStr      = (ital ? 'italic ' : '') + (bold ? 'bold ' : '') +
                       screenFontPx + 'px "DM Sans",sans-serif';

  const initText = isEdit ? (existing.text || '') : '';

  // Measure widest line using a hidden <span> — matches browser font rendering exactly
  const _ruler = document.createElement('span');
  _ruler.style.cssText = 'position:fixed;visibility:hidden;white-space:pre;font:' + fontStr + ';padding:0;margin:0;border:0;top:-999px;left:-999px;';
  document.body.appendChild(_ruler);
  const measureLine = (txt) => { _ruler.textContent = txt || ' '; return _ruler.offsetWidth; };

  const initLines   = initText.split('\n');
  const initWidth   = Math.max(180, ...initLines.map(measureLine)) + 32; // generous buffer

  // Hide stroke while editor is open
  _txtEditIdx = isEdit ? existingIdx : -1;
  redraw();

  // Full-screen backdrop — click outside = save
  const wrap = document.createElement('div');
  wrap.id = '_txt-editor';
  wrap.style.cssText = 'position:fixed;z-index:2000;inset:0;pointer-events:none;';

  // Clamp left so box doesn't overflow right edge of window
  const safeLeft = Math.max(8, Math.min(screenX - 4, window.innerWidth - initWidth - 12));

  const ta = document.createElement('textarea');
  ta.value        = initText;
  ta.spellcheck   = false;
  ta.autocomplete = 'off';
  ta.style.cssText = [
    'position:absolute',
    'left:'         + safeLeft + 'px',
    'top:'          + (screenY - 4) + 'px',
    'width:'        + initWidth + 'px',
    'height:'       + (lineH + 12) + 'px',
    'background:rgba(10,16,30,.9)',
    'color:'        + col,
    'caret-color:'  + col,
    'font:'         + fontStr,
    'line-height:1.45',
    'letter-spacing:0',
    'padding:4px 8px',
    'border:2px solid #38bdf8',
    'border-radius:5px',
    'outline:none',
    'resize:none',
    'overflow:hidden',
    'pointer-events:all',
    'white-space:pre',         // NO wrapping — box expands sideways to show full line
    'box-shadow:0 0 0 3px rgba(56,189,248,.25),0 6px 28px rgba(0,0,0,.6)',
    '-webkit-appearance:none',
    'tab-size:4',
  ].join(';');

  // Grow box to fit content — width tracks widest line, height tracks line count
  const growBox = () => {
    const lines = ta.value.split('\n');
    const w = Math.max(180, ...lines.map(measureLine)) + 32;
    ta.style.width  = Math.min(w, window.innerWidth - safeLeft - 12) + 'px';
    ta.style.height = '0px';
    ta.style.height = (ta.scrollHeight + 2) + 'px';
    // keep hint below
    hint.style.left = safeLeft + 'px';
    hint.style.top  = (parseFloat(ta.style.top) + ta.scrollHeight + 10) + 'px';
  };

  const commit = () => {
    _ruler.remove();
    _txtEditIdx = -1;
    _txtCommitFn = null;
    wrap.remove();
    const txt = ta.value;
    if (!txt.trim()) {
      if (isEdit) { pushUndo(); strokes.splice(existingIdx, 1); }
    } else {
      pushUndo();
      if (isEdit) {
        strokes[existingIdx].text = txt;
      } else {
        strokes.push({ type:'text', x:anchorX, y:anchorY, text:txt,
                       color:col, size:sz, bold, italic:ital });
      }
    }
    sel = null; closeStb(); redraw(); autoSave();
  };

  // Store commit fn globally so onDown can trigger it on canvas click
  _txtCommitFn = commit;

  const cancel = () => {
    _ruler.remove();
    _txtEditIdx = -1;
    _txtCommitFn = null;
    wrap.remove();
    redraw();
  };

  // Hint label
  const hint = document.createElement('div');
  hint.style.cssText = 'position:absolute;font:11px "DM Sans",sans-serif;color:rgba(56,189,248,.7);pointer-events:none;white-space:nowrap;left:' + safeLeft + 'px;top:-999px;';
  hint.textContent   = 'Enter = new line  ·  Ctrl+Enter = done  ·  Esc = cancel';

  ta.addEventListener('input', growBox);

  ta.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); cancel(); return; }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); commit(); return; }
    // Plain Enter: browser inserts \n naturally in textarea - just growBox after
    setTimeout(growBox, 0);
  });

  wrap.addEventListener('pointerdown', e => { if (e.target === wrap) commit(); });

  wrap.appendChild(hint);
  wrap.appendChild(ta);
  document.body.appendChild(wrap);

  requestAnimationFrame(() => {
    growBox();
    ta.focus();
    ta.selectionStart = ta.selectionEnd = ta.value.length;
  });
}

function addText(p) { openTextEditor(p, null); }

function moveStroke(idx, dx, dy) {
  const s = strokes[idx];
  if (s.type === 'pen' && s.path) s.path = s.path.map(p => ({ x: p.x + dx, y: p.y + dy }));
  else if (s.type === 'line' || s.type === 'arrow') { s.from.x += dx; s.from.y += dy; s.to.x += dx; s.to.y += dy; }
  else if (s.type === 'rect') { s.x += dx; s.y += dy; }
  else if (s.type === 'circle') { s.cx += dx; s.cy += dy; }
  else if (s.type === 'text') { s.x += dx; s.y += dy; }
}

function eraseAt(p) {
  const ic = hitIcon(p);
  const sk = hitStroke(p);
  if (ic !== null) { icons.splice(ic, 1); updateLegend(); }
  else if (sk >= 0) { strokes.splice(sk, 1); }
  sel = null; closeItb(); redraw(); autoSave();
}

// ═══════════════════════════════════════════════════════════
// REDRAW
// ═══════════════════════════════════════════════════════════
function redraw() {
  annCtx.clearRect(0, 0, annCv.width, annCv.height);
  const rs = renderScale || 1; // icons/strokes stored at scale=1, multiply by rs to draw
  const legendPx = 196; // fixed legend whitespace — add back when drawing

  // Draw strokes — all coords multiplied by rs at draw time
  strokes.forEach((s, idx) => {
    if (s.type === 'whitebox' || s.type === 'coverpath') return; // painted on pdfCtx above, not annCtx
    if (s.type === 'text' && idx === _txtEditIdx) return; // hidden while inline editor is open
    const isSel = sel?.type === 'stroke' && sel.index === idx;
    annCtx.save();
    annCtx.strokeStyle = isSel ? '#38bdf8' : (s.color || drawColor);
    annCtx.lineWidth   = isSel ? (s.width||2) + 2 : (s.width||2);
    if (s.dash === 'dashed') annCtx.setLineDash([8, 5]);
    else if (s.dash === 'dotted') annCtx.setLineDash([2, 4]);
    else annCtx.setLineDash([]);
    annCtx.lineCap = 'round'; annCtx.lineJoin = 'round';
    if (s.type === 'pen' && s.path?.length > 1) {
      annCtx.beginPath(); s.path.forEach((p, i) => i ? annCtx.lineTo(p.x*rs,(p.y+legendPx/rs)*rs) : annCtx.moveTo(p.x*rs,(p.y+legendPx/rs)*rs)); annCtx.stroke();
    } else if (s.type === 'line') {
      annCtx.beginPath(); annCtx.moveTo(s.from.x*rs,(s.from.y+legendPx/rs)*rs); annCtx.lineTo(s.to.x*rs,(s.to.y+legendPx/rs)*rs); annCtx.stroke();
    } else if (s.type === 'rect') {
      if (s.fillOn) { annCtx.fillStyle = s.fill||'#1d6fdb'; annCtx.fillRect(s.x*rs,(s.y+legendPx/rs)*rs,s.w*rs,s.h*rs); }
      annCtx.strokeRect(s.x*rs,(s.y+legendPx/rs)*rs,s.w*rs,s.h*rs);
    } else if (s.type === 'circle') {
      annCtx.beginPath(); annCtx.ellipse(s.cx*rs,(s.cy+legendPx/rs)*rs,s.rx*rs,s.ry*rs,0,0,Math.PI*2); if (s.fillOn) { annCtx.fillStyle = s.fill||'#1d6fdb'; annCtx.fill(); } annCtx.stroke();
    } else if (s.type === 'arrow') {
      drawArrow(annCtx, {x:s.from.x*rs,y:(s.from.y+legendPx/rs)*rs}, {x:s.to.x*rs,y:(s.to.y+legendPx/rs)*rs});
    } else if (s.type === 'text') {
      annCtx.fillStyle = isSel ? '#38bdf8' : (s.color || drawColor);
      const fStyle = (s.italic ? 'italic ' : '') + (s.bold ? 'bold ' : '');
      const _tSz = (s.size||14)*rs;
      annCtx.font = fStyle + _tSz + 'px DM Sans,sans-serif';
      annCtx.textBaseline = 'top';
      const _lineH = _tSz * 1.45;
      const _lines = (s.text || '').split('\n');
      const _tx = s.x*rs, _ty = (s.y+legendPx/rs)*rs;
      // selection highlight box
      if (isSel) {
        const _maxW = Math.max(..._lines.map(l => annCtx.measureText(l).width));
        annCtx.fillStyle = 'rgba(56,189,248,.15)';
        annCtx.fillRect(_tx - 3, _ty - 3, _maxW + 6, _lineH * _lines.length + 6);
        annCtx.strokeStyle = '#38bdf8'; annCtx.lineWidth = 1.5; annCtx.setLineDash([4,3]);
        annCtx.strokeRect(_tx - 3, _ty - 3, _maxW + 6, _lineH * _lines.length + 6);
        annCtx.setLineDash([]);
      }
      annCtx.fillStyle = isSel ? '#38bdf8' : (s.color || drawColor);
      _lines.forEach((ln, li) => annCtx.fillText(ln, _tx, _ty + li * _lineH));
    }
    annCtx.restore();
  });

  // Draw icons — coords and scale multiplied by rs at draw time
  icons.forEach((pi, idx) => {
    if (!pi.img) return;
    const sz = (pi.scale || 36) * rs;
    const cx = pi.x * rs, cy = (pi.y + legendPx/rs) * rs;
    const isSel = (sel?.type === 'icon' && sel.index === idx) || (multiSel.length > 1 && multiSel.includes(idx));
    const nat = pi.img.naturalWidth && pi.img.naturalHeight ? pi.img.naturalWidth / pi.img.naturalHeight : 1;
    const drawH = sz, drawW = sz * nat;

    annCtx.save();
    annCtx.globalAlpha = (pi.opacity || 100) / 100;
    annCtx.translate(cx, cy);
    annCtx.rotate(((pi.rotation || 0) * Math.PI) / 180);
    if (pi.flipH) annCtx.scale(-1, 1);
    annCtx.drawImage(pi.img, -drawW/2, -drawH/2, drawW, drawH);
    annCtx.restore();

    if (pi.label && isSel) {
      annCtx.save();
      annCtx.font = 'bold 11px DM Sans,sans-serif'; annCtx.textAlign = 'center';
      const tw = annCtx.measureText(pi.label).width;
      annCtx.fillStyle = 'rgba(0,0,0,.75)'; annCtx.fillRect(cx - tw/2 - 3, cy + drawH/2 + 2, tw + 6, 15);
      annCtx.fillStyle = '#fff'; annCtx.fillText(pi.label, cx, cy + drawH/2 + 13);
      annCtx.restore();
    }

    if (isSel) {
      annCtx.save();
      annCtx.translate(cx, cy);
      annCtx.rotate(((pi.rotation || 0) * Math.PI) / 180);
      const hsW = drawW/2 + 6, hsH = drawH/2 + 6;
      const _selColor = iconResizeMode ? '#ef4444' : '#38bdf8'; // red=resize, blue=move
      annCtx.strokeStyle = _selColor; annCtx.lineWidth = iconResizeMode ? 2.5 : 1.5;
      annCtx.setLineDash([4, 3]); annCtx.strokeRect(-hsW, -hsH, hsW*2, hsH*2); annCtx.setLineDash([]);
      // Corner resize handles — simple squares, no circles
      [[-hsW,-hsH],[hsW,-hsH],[hsW,hsH],[-hsW,hsH]].forEach(([hx,hy]) => {
        const _rhov = _hoverHandle === 'resize';
        const _cs = _rhov ? 6 : 5;
        annCtx.fillStyle = _selColor; annCtx.fillRect(hx-_cs, hy-_cs, _cs*2, _cs*2);
        annCtx.strokeStyle = '#fff'; annCtx.lineWidth = 1; annCtx.strokeRect(hx-_cs, hy-_cs, _cs*2, _cs*2);
      });
      annCtx.restore();

    }
  });

  // Cover brush: live size-preview ring at the cursor, shown whenever the tool
  // is active and we know the mouse position — even before the user clicks.
  if (tool === 'cover' && coverHoverPos) {
    annCtx.save();
    annCtx.strokeStyle = '#dc2626';
    annCtx.lineWidth = 1.5;
    annCtx.setLineDash([4,3]);
    annCtx.beginPath();
    annCtx.arc(coverHoverPos.x*rs, (coverHoverPos.y+legendPx/rs)*rs, (coverBrushSize/2)*rs, 0, Math.PI*2);
    annCtx.stroke();
    annCtx.setLineDash([]);
    // small center dot so the exact anchor point is visible at any zoom
    annCtx.fillStyle = '#dc2626';
    annCtx.beginPath();
    annCtx.arc(coverHoverPos.x*rs, (coverHoverPos.y+legendPx/rs)*rs, 1.5, 0, Math.PI*2);
    annCtx.fill();
    annCtx.restore();
  }

  // Draw device legend BELOW the last page in the whitespace area
  // Skip on iPhone only (not iPad) — legend too large for phone screens
  const _isIphoneLegend = window.innerWidth <= 767 && !(navigator.maxTouchPoints > 1 && window.innerWidth >= 768);
  if (_isIphoneLegend) return;
  if (icons.length > 0 && pdfPages.length > 0) {
    _drawLegendOnCanvas(annCtx, annCv.width, icons, ICONS);
  }
}

// Standalone legend renderer — called by both redraw() and PDF export
function _drawLegendOnCanvas(ctx, canvasW, iconsArr, ICONS_arr, forceScale) {
  if (!iconsArr || iconsArr.length === 0) return;
  if (true) {
    const used = [...new Set(iconsArr.map(p => p.iconId))];
    const iconDefs = used.map(id => ICONS_arr.find(i => i.id === id)).filter(Boolean);
    if (iconDefs.length === 0) return;

    // Scale all legend sizing proportionally to canvas width so it looks right
    // both on-screen (canvasW ~800-1200px) and in the PDF export (canvasW = pgW pts)
    // Reference width: 900px. Scale everything relative to that.
    const _legScale = (forceScale != null) ? forceScale : Math.min(1, canvasW / 900);
    const ICON_H = Math.round(22 * _legScale);
    const cellW = Math.round(200 * _legScale), cellH = ICON_H + Math.round(10 * _legScale);
    const padX = Math.round(18 * _legScale), padY = Math.round(14 * _legScale);
    const HEADER_H = Math.round(42 * _legScale);
    const CARD_W = Math.round(280 * _legScale), CARD_H = Math.round(130 * _legScale);
    const GAP_BETWEEN = Math.round(20 * _legScale);

    // Max legend width = canvas width minus contact card, gap, margins
    const PAD = Math.round(24 * _legScale); // padding from canvas edges
    const maxLegW = canvasW - CARD_W - GAP_BETWEEN - PAD - PAD; // lx=PAD left, PAD right of card
    const maxColsAllowed = Math.max(1, Math.floor((maxLegW - padX * 2) / cellW));
    const cols = Math.min(maxColsAllowed, iconDefs.length); // expand cols before adding rows
    const rows = Math.ceil(iconDefs.length / cols);
    const legW = cols * cellW + padX * 2;
    const legH = rows * cellH + padY * 2 + HEADER_H;

    ctx.save();

    // Position legend at top — in the whitespace above the first page
    {
      const lx = PAD, ly = PAD;

      // White background with subtle border
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(lx, ly, legW, legH, 6);
      else ctx.rect(lx, ly, legW, legH);
      ctx.fill();
      ctx.strokeStyle = '#c8d8ea';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Blue header — just logo mark + "Legend"
      ctx.fillStyle = '#1d6fdb';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(lx, ly, legW, HEADER_H, [6,6,0,0]);
      else ctx.rect(lx, ly, legW, HEADER_H);
      ctx.fill();

      // Elite Smart Home logo in header — use pre-loaded logo (set at startup)
      // (Lazy creation here caused the stamp to be silently skipped when .complete was false during export)
      if (!window._eliteLogo) { window._eliteLogo = new Image(); window._eliteLogo.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjMuMzMyIDQ2Ny4yNDQiPjxwYXRoIGQ9Ik0zNy4yOTEsMjM4LjQ4OWM3LjgyMSw3LjgzNCw3LjgyMSwyMC41MTQsMCwyOC4zMzEtNy44MjEsNy44My0yMC41MTEsNy44My0yOC4zMzgsMC03LjgyNC03LjgxNy03LjgyNC0yMC41MTEsMC0yOC4zMzEsNy44MjctNy44MzUsMjAuNTE3LTcuODM1LDI4LjMzOCwwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjYuMTciLz48cGF0aCBkPSJNMjY2LjE4OCw4Ljk2MmM3LjgzMSw3LjgyMSw3LjgzMSwyMC41MTEsMCwyOC4zMzEtNy44MTcsNy44MTctMjAuNTExLDcuODI0LTI4LjM0MiwwLTcuODE3LTcuODIxLTcuODE3LTIwLjUxMSwwLTI4LjMzOCw3LjgzMS03LjgyNywyMC41MjUtNy44MjcsMjguMzQyLjAwN1oiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI2LjE3Ii8+PHBhdGggZD0iTTQ0LjI2NSwxNS40MjRjNy44MzQsNy44MjcsNy44MzQsMjAuNTE4LDAsMjguMzM4LTcuODIxLDcuODI0LTIwLjUxMSw3LjgyNC0yOC4zMzEsMC03LjgyNC03LjgyLTcuODI0LTIwLjUxMSwwLTI4LjMzOCw3LjgyMS03LjgyOCwyMC41MTEtNy44MzUsMjguMzMxLDBaIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNi4xNyIvPjxwYXRoIGQ9Ik0zMTEuMDU2LDMwMC43MDhsLS42MjctMS4wNTlMNjkuNDE2LDU5LjAzNGMtNy41NzctMy44MjUtMTQuNzI1LTcuODQyLTIxLjMwMi0xMS43NzgsNC4wNjUsNi43MjcsOC4yMjUsMTQuMDkxLDEyLjE4NSwyMS44NzMsMCwwLDQzLjIzNCw0My40OTEsNDMuMzk3LDQzLjc4NGwyMDguMzIsMjA3LjgwNGg5LjgzN3YtOS4yMTdsLTEwLjc5OC0xMC43OTJaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTMyMS44NTQsMTc5LjAyMnYtMTkuODE3bC01OS45ODYtNjAuMDI4Yy0yLjU2Myw0LjM0NC01LjQyLDguMDk2LTguNDcyLDExLjM0M2w2OC40NTgsNjguNTAzWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNzcuNDE5LDQwLjc1NmMtLjQ0Niw1LjUxNC0xLjAzMSwxMC42ODctMS43NTYsMTUuNTgxbDQ2LjE5MSw0Ni4yMzcuMDE0LTE5LjgyNS00NC40NS00MS45OTNaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTMyMS44NTQsMTQwLjA4NGwuMDE0LTE5LjgyNS00OS4wNjItNDkuMTE0Yy0xLjM1MSw1LjUyMS0yLjk2OCwxMC41MS00Ljc1MSwxNS4xMDVsNTMuNzk5LDUzLjgzNFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzIxLjg1NCwyMTYuNTRsLjAxNC0xOS44MTctNzguMDQ1LTc4LjA5M2MtNC4yMzYsMi43OS04LjczNyw0Ljg5NC0xMy40Niw2LjM3OGw5MS40OSw5MS41MzJaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE5Mi40MDgsMTI2LjAzNWwxMjkuNDQ2LDEyOS40MzZ2LTE5LjgwN2wtMTA3Ljg2My0xMDcuODg4Yy02Ljk1My4zMDctMTQuMjEzLS4zNTItMjEuNTg0LTEuNzQxWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zMjEuODU0LDI5Mi4yNzh2LTE5LjgyOEwxNjguNjkyLDExOS4zNmMtMTIuODQ0LTQuNjgxLTI1LjU3My0xMC44ODYtMzcuNDEzLTE3LjUzNmwxOTAuNTc1LDE5MC40NTNaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTQxLjA1NCwyNzYuNjNjNS41MDctLjQxOCwxMC42ODctMS4wMTcsMTUuNTg4LTEuNzU2bDQ2LjIzLDQ2LjE2My0xOS44MjUuMDE0LTQxLjk5My00NC40MjFaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE0MC4zODUsMzIxLjAzOGwtMTkuODE3LjAxNC00OS4xMjEtNDkuMDMzYzUuNTA4LTEuMzU5LDEwLjUxLTIuOTU0LDE1LjA5Ny00LjczOGw1My44NDEsNTMuNzU4WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNzkuMzM4LDMyMS4wMzhoLTE5LjgyMWwtNjAuMDUyLTU5LjkzN2M0LjM1OC0yLjU5Miw4LjEwMi01LjQyNywxMS4zNTYtOC40NzlsNjguNTE3LDY4LjQxNloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjE2Ljg0OCwzMjEuMDM4bC0xOS44MTUuMDE0LTc4LjExLTc4LjAxYzIuODA0LTQuMjI4LDQuODg4LTguNzQsNi4zNzktMTMuNDc0bDkxLjU0Niw5MS40N1oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTI2LjMyNiwxOTEuNjI2bDEyOS40NTQsMTI5LjQxMmgtMTkuODE0bC0xMDcuODkxLTEwNy44MzljLjMwNy02Ljk2My0uMzUyLTE0LjIwMi0xLjc0OS0yMS41NzMiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjkyLjYwNywzMjEuMDM4aC0xOS44NDJMMTE5LjY1MiwxNjcuOTI3Yy00LjY3OS0xMi44NDQtMTAuODc5LTI1LjU2Mi0xNy41MjktMzcuNDA1bDE5MC40ODQsMTkwLjUxNloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTI4LjA2NCw0MTcuNDI5aC00Mi4yODNjLTMuOTc0LDAtNy4xNDEtMS43ODQtOS40OTYtNS4zNTEtMi41MjYtMy43MjctMy43ODMtOS4xMDUtMy43ODMtMTYuMTYzLDAtNS41MDQuNzYzLTExLjQ2OCwyLjMyLTE3Ljg3bDEwLjQ2NC00Mi40MjJjLjI0My0xLjA1Mi43NzctMS41NzUsMS41OTItMS41NzVoMjUuNzEyYy41NzEsMCwuODU3LjM2Mi44NTcsMS4wODcsMCwuMTYtLjA1OS4zMi0uMTI4LjQ4N2wtMTEuODE2LDQ4LjIzOWMtMS41NCw1Ljk4NS0yLjMwOSwxMC4yNjMtMi4zMDksMTIuODU0LDAsNC4xMTcsMS43MDQsNi4xOCw1LjEwNyw2LjE4aDI3LjQyNWMuNTYxLDAsLjg0LjM3Ni44NCwxLjExNSwwLC4xNjctLjAzNS4zMi0uMTA0LjQ4N2wtMi42OSwxMS4zMjhjLS4zMzEsMS4wOC0uODkyLDEuNjAyLTEuNzA2LDEuNjAyIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE1OS42NDksNDE3LjQyOWgtMjQuMzc0Yy0uNTc4LDAtLjg1Ny0uMzYyLS44NTctMS4wOTQsMC0uMTYxLDYuNjIyLTI3LjA2LDE5Ljg1Ni04MC43MTMuMjQ4LTEuMDUyLjc3Ny0xLjU3NSwxLjU5OS0xLjU3NWgyNC4zODVjLjQ4NywwLC43MjQuMzYyLjcyNCwxLjA4NywwLC4xODEtNi42MTgsMjcuMDY2LTE5Ljg1Niw4MC43MTItLjI0MywxLjA1OS0uNzM4LDEuNTgyLTEuNDc3LDEuNTgyIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTIyOC45MDEsMzQ4LjU4MWwtMTYuNTY3LDY3LjI3M2MtLjI1MSwxLjA1OS0uNzY2LDEuNTc1LTEuNTg5LDEuNTc1aC0yNC4zN2MtLjQ4OCwwLS43MjUtLjM1NS0uNzI1LTEuMDg3LDAtLjE2MSw1LjU2LTIyLjc1NSwxNi42NzktNjcuNzYxaC0xOC44ODFjLS41NzEsMC0uODUtLjM2Mi0uODUtMS4xMDcsMC0uMDc3Ljk0Ny00LjAyLDIuODE0LTExLjgzLjIzNy0xLjA1Mi43NjctMS41OTYsMS41NzUtMS41OTZoNjQuOTQ3Yy42NTUsMCwuOTc1LjM3Ljk3NSwxLjExNSwwLC4xNi0uOTc1LDQuMTM4LTIuOTI2LDExLjk0MS0uMjUuOTktLjc2NiwxLjQ3Ny0xLjU3NCwxLjQ3N2gtMTkuNTA4WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zMC4yNzUsMzgwLjMwOWMtMS43ODQsNi45MTEtMi42NzUsMTEuOTk3LTIuNjc1LDE1LjIwMiwwLDQuNjY3LDEuNTQsNy4wMDksNC42MzcsNy4wMDloMzAuNjI3Yy41NzEsMCwuODU3LjM3Ni44NTcsMS4xMDF2LjUwMmwtMi44MDQsMTEuMzE0Yy0uMjUxLDEuMDczLS44MTUsMS42MTctMS43MTQsMS42MTdIMTMuNzA4Yy00LjA1OSwwLTcuMjc4LTEuODE5LTkuNjMyLTUuNDc2LTIuNTE2LTMuOTcxLTMuNzczLTkuNTU4LTMuNzczLTE2Ljc3NywwLTYuMDc1Ljg1LTEyLjU1NCwyLjU1My0xOS40MzgsMi45MjYtMTEuNjc3LDcuMTEzLTIxLjM1MywxMi41NTgtMjkuMDU5LDUuOTI5LTguNDIzLDEyLjIyNy0xMi42MzEsMTguODc3LTEyLjYzMWg0NS41MDJjLjY0OCwwLC45NzUuMzQ4Ljk3NSwxLjEwMSwwLC4xNjctLjA0Mi4zMzUtLjExMi40ODdsLTIuODExLDExLjQ2OGMtLjE1Ny45NzUtLjY5MywxLjQ3Ny0xLjU4NSwxLjQ3N2gtMzAuNTkyYy0zLjIyMiwwLTUuODE0LDEuODgxLTcuNzQ3LDUuNjU3LTEuMTQ5LDEuOTg1LTMuMDQ0LDYuMjQyLTQuMjM2LDEwLjYxMU0zMy41NzgsMzY0Ljc1OGMuMzItMS4wNTkuNDc3LS41MDIsMS4yMTItLjUwMmgzMi4zNTVjLjY0OCwwLC45NjguNDE4Ljk2OCwxLjIyNiwwLC4wODMtLjk2OCwzLjk5Mi0yLjkyMiwxMS43MjUtLjI1MSwxLjA1Mi0uNzczLDEuNTk2LTEuNTc4LDEuNTk2SDMxLjI2NWMtLjU1NCwwLS44NDYsMS40MzUtLjg0Ni42OTYiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjcyLjk2LDM4MC43NGMtMS43ODQsNi45MTItMi42NzUsMTEuOTktMi42NzUsMTUuMjE3LDAsNC42NTQsMS41NDcsNi45OTQsNC42MjcsNi45OTRoMzAuNjI2Yy41ODYsMCwuODY0LjM4My44NjQsMS4xMTV2LjQ4N2wtMi44MDEsMTEuMzI4Yy0uMjUsMS4wNTktLjgyMiwxLjYwMi0xLjcxNCwxLjYwMmgtNDUuNDk0Yy00LjA2OSwwLTcuMjg4LTEuODI1LTkuNjE1LTUuNDY5LTIuNTM2LTMuOTc4LTMuNzktOS41NjYtMy43OS0xNi43ODMsMC02LjA2OC44NS0xMi41NCwyLjU1LTE5LjQ0NSwyLjkyNi0xMS42NjMsNy4xMDYtMjEuMzU0LDEyLjU2OC0yOS4wNDUsNS45MjItOC40MywxMi4yMDYtMTIuNjQ1LDE4Ljg2Ni0xMi42NDVoNDUuMzk3Yy42MjcsMCwuOTYyLjM2OS45NjIsMS4xMDcsMCwuMTY4LS4wNDIuMzItLjEyNi41MDJsLTIuNzg3LDExLjQ1NGMtLjE1My45ODItLjY4MywxLjQ3Ny0xLjU2MSwxLjQ3N2gtMzAuNTAyYy0zLjIxOCwwLTUuODI0LDEuODk2LTcuNzQ3LDUuNjc4LTEuMTU2LDEuOTU4LTMuMDUxLDYuMjI5LTQuMjUsMTAuNTk3TTI3Ni4yNjIsMzY1LjIwNGMuMzItMS4wNzMuNDg4LS41MDIsMS4yMTItLjUwMmgzMi4zMjdjLjY0MSwwLC45NjIuNDExLjk2MiwxLjIxMiwwLC4wODMtLjk2MiwzLjk5OS0yLjg5OSwxMS43MzItLjI1MSwxLjA1OS0uNzgxLDEuNTk2LTEuNTc1LDEuNTk2aC0zMi4zNDFjLS41NTcsMC0uODM2LDEuNDQyLS44MzYuNzAzIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTS42NjUsNDY2Ljg1MXYtMy44MTVoMjEuMjgyYzMuMTg2LDAsNC44NzctMS44NDksNC44NzctNC41MjQsMC0yLjk1LTEuNzMtNC40NDQtNC44NzctNC40NDRoLTEzLjM3NWMtNS4xNTMsMC04LjMzOS0zLjQyMy04LjMzOS03Ljk4NSwwLTQuNDg1LDIuOTUtNy44MjgsOC40MTgtNy44MjhoMjAuNDE2djMuODE1SDguNjUxYy0yLjgzMiwwLTQuNDQ1LDEuNzMtNC40NDUsNC4yNDgsMCwyLjU5NywxLjY5MSw0LjIwOSw0LjQwNiw0LjIwOWgxMy4zMzVjNS41NDYsMCw4LjQ5NywyLjc1NCw4LjQ5Nyw4LjE0NCwwLDQuNjgxLTIuNzkzLDguMTgyLTguNDk3LDguMTgySC42NjVaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTcwLjAxMyw0NjYuODUxbC02LjI5NC0yMi4yMjYtOC42MTUsMjEuMTYzYy0uMzk0Ljk0NC0xLjAyMywxLjQ1Ni0xLjk2NywxLjQ1NnMtMS42MTMtLjUxMi0yLjAwNi0xLjQ1NmwtOC41NzYtMjEuMTYzLTYuMjk0LDIyLjIyNmgtMy43NzZsNy43MS0yNy4zMzljLjI3NS0xLjA2Mi45MDUtMS42MTMsMS45NjctMS42MTMuODI2LDAsMS42MTMuNDMzLDEuOTY3LDEuMzM4bDkuMTI2LDIyLjM0Myw5LjA4Ny0yMi4zNDNjLjM1NC0uOTA1LDEuMDYyLTEuMzM4LDEuODg4LTEuMzM4Ljk4MywwLDEuNTc0LjU1MSwxLjg4OCwxLjYxM2w3LjcxLDI3LjMzOWgtMy44MTZaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTEwOC4wODYsNDY2Ljg1MWwtNC41NjMtNy42NzFoLTE1LjAyN2wxLjg4OC0zLjMwNGgxMS4xNzJsLTcuNTUzLTEyLjY2Ny0xNC4wNDMsMjMuNjQyaC00LjM2NmwxNi42NzktMjcuNzMyYy40NzItLjc4NywxLjAyMy0xLjI1OSwxLjg4OC0xLjI1OS44MjYsMCwxLjM3Ny40NzIsMS44NDksMS4yNTlsMTYuNjc5LDI3LjczMmgtNC42MDNaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE0My43Niw0NjYuODUxbC03LjU1My04LjEwNGgtMTIuNTQ4di0zLjU0aDEyLjc4NGM0LjE3LDAsNi4yOTQtMi4zMjEsNi4yOTQtNi43MjdzLTIuMzIxLTYuNDEyLTYuMjk0LTYuNDEyaC0xNi40ODJ2MjQuNzgyaC0zLjgxNnYtMjguNTk4aDIwLjI5OGM2LjMzMywwLDEwLjA3LDMuOTczLDEwLjA3LDEwLjIyOCwwLDQuNzYtMi4xNjMsOC4xODItNi4wMTksOS41OThsOC42OTQsOC43NzJoLTUuNDI5WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNjEuMDY0LDQ2Ni44NTF2LTI0Ljc4MmgtMTEuMjExdi0zLjgxNWgyNi4yMzd2My44MTVoLTExLjIxMXYyNC43ODJoLTMuODE1WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNzkuNzg0LDQ2Ny4wNDd2LTI4Ljc5NGgzLjgxNXYyOC43OTRoLTMuODE1Wk0yMDMuNDY1LDQ2Ny4wNDd2LTEyLjk4aC0xNi4xNjd2LTMuNTQxaDE2LjE2N3YtMTIuMjcyaDMuODU1djI4Ljc5NGgtMy44NTVaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTIyNS40OSw0NjYuODUxYy03Ljg2NywwLTEzLjY1LTYuMjk0LTEzLjY1LTE0LjU5NCwwLTguNDE5LDUuNzgzLTE0LjAwNCwxMy42NS0xNC4wMDRoNi44NDVjOC4xMDQsMCwxMy43MjksNS43MDMsMTMuNzI5LDE0LjAwNHMtNS43NDMsMTQuNTk0LTEzLjcyOSwxNC41OTRoLTYuODQ1Wk0yMzIuMzM1LDQ2My4wMzVjNS43ODIsMCw5LjkxMy00LjUyNCw5LjkxMy0xMC41ODIsMC02LjA5OC00LjA5Mi0xMC4zODUtOS45MTMtMTAuMzg1aC02Ljg0NWMtNS42NjUsMC05LjgzNCw0LjI0OC05LjgzNCwxMC4zODUsMCw2LjA1OCw0LjEzLDEwLjU4Miw5LjgzNCwxMC41ODJoNi44NDVaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTI4NS4wMDMsNDY2Ljg1MWwtNi4yOTQtMjIuMjI2LTguNjE0LDIxLjE2M2MtLjM5NC45NDQtMS4wMjIsMS40NTYtMS45NjcsMS40NTZzLTEuNjEzLS41MTItMi4wMDctMS40NTZsLTguNTc1LTIxLjE2My02LjI5NCwyMi4yMjZoLTMuNzc2bDcuNzEtMjcuMzM5Yy4yNzUtMS4wNjIuOTA1LTEuNjEzLDEuOTY3LTEuNjEzLjgyNiwwLDEuNjEzLjQzMywxLjk2NywxLjMzOGw5LjEyNywyMi4zNDMsOS4wODctMjIuMzQzYy4zNTQtLjkwNSwxLjA2Mi0xLjMzOCwxLjg4OC0xLjMzOC45ODMsMCwxLjU3My41NTEsMS44ODksMS42MTNsNy43MSwyNy4zMzloLTMuODE2WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yOTIuNTEyLDQ2Ni44NTF2LTI4LjU5OGgyNS4wOTh2My44MTVoLTIxLjI4MnYyMC45NjdoMjEuMzIxdjMuODE1aC0yNS4xMzdaTTMwMC4wMjYsNDU0LjA2NnYtMy41NDFoMTYuNTIxdjMuNTQxaC0xNi41MjFaIiBmaWxsPSIjZmZmIi8+PC9zdmc+'; }
      const logo = window._eliteLogo;
      const logoH = HEADER_H - Math.round(8 * _legScale);
      const logoW = Math.round(logoH * (85 / 122));
      const logoY = ly + (HEADER_H - logoH) / 2;
      if (logo && logo.naturalWidth) { try { ctx.drawImage(logo, lx + padX, logoY, logoW, logoH); } catch(e2) {} }
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(12 * _legScale)}px DM Sans,sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('Legend', lx + padX + logoW + Math.round(14 * _legScale), ly + HEADER_H / 2);

      // Contact card — FIXED size, vertically centered alongside legend
      if (logo && logo.naturalWidth) {
        ctx.save();
        const cardX = canvasW - PAD - CARD_W;
        const cardY = ly; // same top padding as legend (matches right side padding)
        const r6 = 6;

        // Blue background — fixed rectangle
        ctx.fillStyle = '#1d6fdb';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(cardX, cardY, CARD_W, CARD_H, r6);
        else ctx.rect(cardX, cardY, CARD_W, CARD_H);
        ctx.fill();

        // Measure text block width first so we can center everything as one unit
        const lines = [
          { text: 'Elite Smart Home, LLC', bold: true, size: 10.5 * _legScale },
          { text: '856-315-9147', bold: false, size: 9 * _legScale },
          { text: 'elitesmarthome.com', bold: false, size: 9 * _legScale },
          { text: '409 Bloomfield Dr. STE 5', bold: false, size: 9 * _legScale },
          { text: 'West Berlin NJ 08091', bold: false, size: 9 * _legScale },
        ];
        const lineH = Math.round(13 * _legScale);
        let maxTextW = 0;
        lines.forEach(l => {
          ctx.font = (l.bold ? 'bold ' : '') + l.size + 'px DM Sans,sans-serif';
          maxTextW = Math.max(maxTextW, ctx.measureText(l.text).width);
        });

        // Logo dimensions
        const logoH2 = Math.round(56 * _legScale);
        const logoW2 = Math.round(logoH2 * (323 / 467));
        const dividerGap = Math.round(16 * _legScale); // gap each side of divider line
        const contentW = logoW2 + dividerGap + 1 + dividerGap + maxTextW; // logo + gaps + line + gaps + text

        // Center the whole content block horizontally in the card
        const contentStartX = cardX + Math.round((CARD_W - contentW) / 2);

        // Logo — vertically centered
        const logoX2 = contentStartX;
        const logoY2 = cardY + Math.round((CARD_H - logoH2) / 2);
        try { ctx.drawImage(logo, logoX2, logoY2, logoW2, logoH2); } catch(e2) {}

        // Divider line
        const divX = contentStartX + logoW2 + dividerGap;
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(divX, cardY + Math.round(14 * _legScale));
        ctx.lineTo(divX, cardY + CARD_H - Math.round(14 * _legScale));
        ctx.stroke();

        // Text block — vertically centered
        const totalTextH = lines.length * lineH;
        const tx = divX + dividerGap;
        let ty = cardY + Math.round((CARD_H - totalTextH) / 2);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        lines.forEach(l => {
          ctx.font = (l.bold ? 'bold ' : '') + l.size + 'px DM Sans,sans-serif';
          ctx.fillStyle = l.bold ? '#ffffff' : 'rgba(255,255,255,0.85)';
          ctx.fillText(l.text, tx, ty);
          ty += lineH;
        });
        ctx.restore();
      }

      // Icon rows — preserve aspect ratio
      iconDefs.forEach((ic, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const ix = lx + padX + col * cellW;
        const iy = ly + HEADER_H + padY + row * cellH;
        const pi = iconsArr.find(p => p.iconId === ic.id);

        const iconCount = iconsArr.filter(p => p.iconId === ic.id).length;
        if (pi?.img) {
          try {
            const nat = pi.img.naturalWidth && pi.img.naturalHeight
              ? pi.img.naturalWidth / pi.img.naturalHeight : 1;
            const iH = ICON_H;
            const iW = iH * nat;
            ctx.drawImage(pi.img, ix, iy, iW, iH);
            ctx.fillStyle = '#0d1a2a';
            ctx.font = `${Math.round(10 * _legScale)}px DM Sans,sans-serif`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            const _nameX = ix + iW + Math.round(5 * _legScale);
            const _nameW = ctx.measureText(ic.name).width; // measure while name font is active
            ctx.fillText(ic.name, _nameX, iy + iH / 2);
            // Count badge — positioned after name with clear gap
            ctx.font = `bold ${Math.round(9 * _legScale)}px DM Sans,sans-serif`;
            ctx.fillStyle = '#1d6fdb';
            ctx.fillText('×' + iconCount, _nameX + _nameW + Math.round(10 * _legScale), iy + iH / 2);
          } catch(e2) {}
        } else {
          ctx.fillStyle = '#0d1a2a';
          ctx.font = `${Math.round(10 * _legScale)}px DM Sans,sans-serif`;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(ic.name + '  x' + iconCount, ix, iy + ICON_H / 2);
        }
      });
    }

    ctx.restore();
  }
}

// ═══════════════════════════════════════════════════════════
// HIT TESTING
// ═══════════════════════════════════════════════════════════
function hitIcon(p) {
  for (let i = icons.length - 1; i >= 0; i--) {
    const pi = icons[i];
    const _nat = pi.img?.naturalWidth && pi.img?.naturalHeight ? pi.img.naturalWidth / pi.img.naturalHeight : 1;
    const _hw = (pi.scale || 36) * _nat / 2 + 5;
    const _hh = (pi.scale || 36) / 2 + 5;
    if (Math.abs(p.x - pi.x) <= _hw && Math.abs(p.y - pi.y) <= _hh) return i;
  }
  return null;
}

function hitStroke(p) {
  for (let i = strokes.length - 1; i >= 0; i--) {
    const s = strokes[i]; const th = Math.max(s.width || 2, 8);
    if (s.type === 'text') {
      // Measure actual text bounds for reliable hit testing
      const _fStyle = (s.italic?'italic ':'') + (s.bold?'bold ':'');
      annCtx.font = _fStyle + (s.size||14) + 'px DM Sans,sans-serif';
      const _tLines = (s.text||'').split('\n');
      const _tW = Math.max(..._tLines.map(l => annCtx.measureText(l).width)) + 16;
      const _tH = (s.size||14) * 1.45 * _tLines.length + 16;
      if (p.x >= s.x - 8 && p.x <= s.x + _tW && p.y >= s.y - 8 && p.y <= s.y + _tH) return i;
    }
    if (s.type === 'rect') {
      const inside = p.x >= s.x && p.x <= s.x+s.w && p.y >= s.y && p.y <= s.y+s.h;
      const onBorder = p.x >= s.x-th && p.x <= s.x+s.w+th && p.y >= s.y-th && p.y <= s.y+s.h+th &&
        (Math.abs(p.x-s.x)<th||Math.abs(p.x-(s.x+s.w))<th||Math.abs(p.y-s.y)<th||Math.abs(p.y-(s.y+s.h))<th);
      if (inside || onBorder) return i;
    }
    if (s.type === 'circle') {
      const dx=p.x-s.cx, dy=p.y-s.cy;
      const d = Math.sqrt(dx*dx/(s.rx*s.rx)+dy*dy/(s.ry*s.ry));
      if (d <= 1 + th/Math.max(s.rx,s.ry)) return i; // inside or on border
    }
    if ((s.type==='line'||s.type==='arrow') && ptSegDist(p,s.from,s.to)<th) return i;
    if (s.type==='pen' && s.path) { for(let j=1;j<s.path.length;j++) { if(ptSegDist(p,s.path[j-1],s.path[j])<th) return i; } }
  }
  return -1;
}

function ptSegDist(p, a, b) {
  const dx = b.x-a.x, dy = b.y-a.y;
  if (!dx && !dy) return Math.hypot(p.x-a.x, p.y-a.y);
  const t = Math.max(0, Math.min(1, ((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy)));
  return Math.hypot(p.x-a.x-t*dx, p.y-a.y-t*dy);
}

function findHandle(p) {
  // Returns { type: 'resize'|'rotate'|null, corner: {lx,ly}|null }
  if (!sel || sel.type !== 'icon') return { type: null, corner: null };
  const pi = icons[sel.index];
  const _n = pi.img?.naturalWidth && pi.img?.naturalHeight ? pi.img.naturalWidth / pi.img.naturalHeight : 1;
  const hsH = (pi.scale||36)/2 + 6;
  const hsW = (pi.scale||36)*_n/2 + 6;
  const a = ((pi.rotation||0)*Math.PI)/180;
  // Transform p into icon's local (unrotated) space
  const dx = p.x - pi.x, dy = p.y - pi.y;
  const lx =  Math.cos(a)*dx + Math.sin(a)*dy;
  const ly = -Math.sin(a)*dx + Math.cos(a)*dy;
  const rp = (cx,cy) => ({ x: Math.cos(a)*cx-Math.sin(a)*cy+pi.x, y: Math.sin(a)*cx+Math.cos(a)*cy+pi.y });

  // Check corner resize nodes first (10px radius on the node square)
  const resizeR = 10;
  for (const [cx,cy] of [[-hsW,-hsH],[hsW,-hsH],[hsW,hsH],[-hsW,hsH]]) {
    const h = rp(cx,cy);
    if (Math.hypot(p.x-h.x, p.y-h.y) <= resizeR) return { type: 'resize', corner: {lx:cx,ly:cy} };
  }

  // Outside the icon bbox (but within a 32px outer band) = rotate
  const outside = Math.abs(lx) > hsW || Math.abs(ly) > hsH;
  const nearOuter = Math.abs(lx) <= hsW + 32 && Math.abs(ly) <= hsH + 32;
  if (outside && nearOuter) return { type: 'rotate', corner: null };

  return { type: null, corner: null };
}

// ═══════════════════════════════════════════════════════════
// TOOLS
// ═══════════════════════════════════════════════════════════
function stepProp(inputId, delta, min, max, callback) {
  const el = document.getElementById(inputId);
  if (!el) return;
  const newVal = Math.max(min, Math.min(max, (+el.value || 0) + delta));
  el.value = newVal;
  callback(newVal);
}

function setTool(t) {
  tool = t;
  document.querySelectorAll('.t[id^="tool-"]').forEach(b => b.classList.remove('on'));
  const b = document.getElementById('tool-' + t); if (b) b.classList.add('on');
  annCv.style.cursor = t === 'select' ? 'default' : t === 'eraser' ? 'cell' : t === 'cover' ? 'none' : 'crosshair';
  _hoverHandle = null; _rotCorner = null;
  // Show/hide the floating brush-size panel for the cover tool
  const _csp = document.getElementById('cover-size-panel');
  if (_csp) _csp.style.display = (t === 'cover') ? 'flex' : 'none';
  if (t !== 'cover') coverHoverPos = null;
  if (t === 'select' || t === 'eraser') {
    sel = null; closeItb(); closeStb(); redraw();
  } else if (t === 'cover') {
    sel = null; closeItb(); closeStb(); redraw();
  } else {
    // Show STB immediately with default props for the selected tool
    sel = null; closeItb(); redraw();
    const defaults = { type: t, color: drawColor || '#1d6fdb', width: strokeW || 2,
      fill: '#1d6fdb', fillOn: false, dash: 'solid', size: fontSize || 14 };
    showStb(defaults);
  }
}
function setColor(c)  { drawColor = c; }
function setStroke(v) { strokeW = Math.max(1, Math.min(20, v || 2)); }
function setFontSz(v) { fontSize = Math.max(8, Math.min(72, v || 14)); }

// ═══════════════════════════════════════════════════════════
// ICON OPERATIONS
// ═══════════════════════════════════════════════════════════
function placeIcon(id, pos) {
  const ic = ICONS.find(i => i.id === id); if (!ic) return;
  const img = new Image();
  img.onload = () => {
    // pos is scale=1 (from getPos). Store scale at scale=1 so it displays correctly at all zoom levels.
    pushUndo(); icons.push({ id: Date.now(), iconId: id, x: pos.x, y: pos.y, scale: 36 / (renderScale||1), img, label: '', rotation: 0, opacity: 100, flipH: false });
    redraw(); updateLegend(); autoSave();
  };
  img.src = ic.f;
}

function showItb(pi) {
  const isIphone = window.innerWidth <= 767;
  const op  = pi.opacity || 100;
  const sz  = Math.round((pi.scale || 36) * (renderScale || 1));
  document.getElementById('itb-op').value = op;
  document.getElementById('itb-sz').value = sz;
  if (isIphone) {
    document.getElementById('itb-sheet-op').value = op;
    document.getElementById('itb-sheet-sz').value = sz;
    document.getElementById('itb-sheet').style.display = 'block';
    document.getElementById('itb').style.display = 'none';
    return;
  }
  const tb = document.getElementById('itb');
  tb.style.display = 'flex';
  requestAnimationFrame(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const tbW = tb.offsetWidth || 380;
    const tbH = tb.offsetHeight || 50;
    const left = Math.max(8, Math.min(vw - tbW - 8, (vw - tbW) / 2));
    const topOffset = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--tbh')) || 42) + 36;
    const top = Math.max(8, Math.min(vh - tbH - 8, topOffset));
    tb.style.left = left + 'px';
    tb.style.top = top + 'px';
  });
}
function closeItb() {
  document.getElementById('itb').style.display = 'none';
  document.getElementById('itb-sheet').style.display = 'none';
}
function closeItbSheet() {
  document.getElementById('itb-sheet').style.display = 'none';
}

function closeStb() { document.getElementById('stb').style.display = 'none'; }

// Hold-to-repeat for iPhone stepper buttons
let _stepRepeatTimer = null;
function stepPropRepeat(id, delta, mn, mx, cb) {
  stepProp(id, delta, mn, mx, cb);
  _stepRepeatTimer = setTimeout(() => {
    _stepRepeatTimer = setInterval(() => stepProp(id, delta, mn, mx, cb), 80);
  }, 400);
}
function stopStepRepeat() {
  clearTimeout(_stepRepeatTimer);
  clearInterval(_stepRepeatTimer);
  _stepRepeatTimer = null;
}

function showStb(s) {
  const stb = document.getElementById('stb');
  const isText = s.type === 'text';
  stb.style.display = 'flex';
  // stroke color
  document.getElementById('stb-stroke').value = s.color || '#1d6fdb';
  // fill
  const fillGrp = document.getElementById('stb-fill-grp');
  if (isText || s.type === 'pen' || s.type === 'line' || s.type === 'arrow') {
    fillGrp.style.display = 'none';
  } else {
    fillGrp.style.display = '';
    document.getElementById('stb-fill').value = s.fill || '#1d6fdb';
    const noneBtn = document.getElementById('stb-fill-none');
    if (noneBtn) noneBtn.style.outline = s.fillOn ? 'none' : '2px solid var(--acc)';
  }
  // width
  const w = s.width || s.size || 2;
  document.getElementById('stb-width').value = isText ? 14 : w;
  
  // dash
  document.getElementById('stb-dash').value = s.dash || 'solid';
  document.getElementById('stb-dash').parentElement.style.display = isText ? 'none' : '';
  // text controls
  const tg = document.getElementById('stb-text-grp');
  const tb = document.getElementById('stb-text-bold');
  if (isText) {
    tg.style.display = '';
    tb.style.display = '';
    document.getElementById('stb-fontsize').value = s.size || 14;
    document.getElementById('stb-bold-btn').style.background = s.bold ? 'var(--acc)' : '';
    document.getElementById('stb-bold-btn').style.color = s.bold ? '#fff' : '';
    document.getElementById('stb-italic-btn').style.background = s.italic ? 'var(--acc)' : '';
    document.getElementById('stb-italic-btn').style.color = s.italic ? '#fff' : '';
    // For text, repurpose width slider as font size
    document.getElementById('stb-width').min = 8;
    document.getElementById('stb-width').max = 96;
    document.getElementById('stb-width').value = s.size || 14;
  } else {
    tg.style.display = 'none';
    tb.style.display = 'none';
    document.getElementById('stb-width').min = 1;
    document.getElementById('stb-width').max = 20;
    document.getElementById('stb-width').value = s.width || 2;
  }
  // Position centred, clamped to viewport — works on iPhone, iPad, and PC
  requestAnimationFrame(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const stbW = stb.offsetWidth || 520;
    const stbH = stb.offsetHeight || 50;
    const left = Math.max(8, Math.min(vw - stbW - 8, (vw - stbW) / 2));
    const isIphone = window.innerWidth <= 767;
    const topOffset = isIphone ? 60 : (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--tbh')) || 42) + 36;
    const top = Math.max(8, Math.min(vh - stbH - 8, topOffset));
    stb.style.left = left + 'px';
    stb.style.top = top + 'px';
  });
}

function updateStrokeProp(prop, val) {
  // Always update drawing defaults so next drawn shape uses these settings
  if (prop === 'color') drawColor = val;
  if (prop === 'width') strokeW = +val;
  if (prop === 'size') fontSize = +val;

  // Also update None button state regardless of selection
  if (prop === 'fill' || prop === 'fillOn') {
    const noneBtn = document.getElementById('stb-fill-none');
    const active = prop === 'fill' ? true : val;
    if (noneBtn) noneBtn.style.outline = active ? 'none' : '2px solid var(--acc)';
  }

  if (!sel || sel.type !== 'stroke') return;
  pushUndo();
  undoStack.pop(); // remove the just-pushed snapshot since we want live updates
  const s = strokes[sel.index];
  if (!s) return;
  if (prop === 'color') { s.color = val; }
  else if (prop === 'fill') { s.fill = val; s.fillOn = true; }
  else if (prop === 'fillOn') { s.fillOn = val; }
  else if (prop === 'width') {
    if (s.type === 'text') { s.size = +val; }
    else { s.width = +val; }
    
  }
  else if (prop === 'dash') { s.dash = val; }
  else if (prop === 'size') { s.size = +val; }
  redraw();
}

function toggleStrokeTextStyle(style) {
  if (!sel || sel.type !== 'stroke') return;
  const s = strokes[sel.index];
  if (!s || s.type !== 'text') return;
  pushUndo(); undoStack.pop();
  s[style] = !s[style];
  const btn = document.getElementById('stb-' + style + '-btn');
  btn.style.background = s[style] ? 'var(--acc)' : '';
  btn.style.color = s[style] ? '#fff' : '';
  redraw();
}

function updateIconProp(prop, val) {
  if (!sel || sel.type !== 'icon') return;
  if (prop === 'scale') {
    icons[sel.index].scale = val / (renderScale || 1); // slider in screen px, store at scale=1
  } else {
    icons[sel.index][prop] = val;
  }
  redraw(); autoSave();
}
function rotateIcon(deg) {
  if (!sel || sel.type !== 'icon') return;
  const pi = icons[sel.index]; pi.rotation = ((pi.rotation||0)+deg+360)%360; redraw(); autoSave();
}
function flipIcon() {
  if (!sel || sel.type !== 'icon') return;
  icons[sel.index].flipH = !icons[sel.index].flipH; redraw(); autoSave();
}
function labelIcon() {
  if (!sel || sel.type !== 'icon') return;
  const pi = icons[sel.index];
  const l = prompt('Label:', pi.label || ''); if (l !== null) { pi.label = l; redraw(); updateLegend(); autoSave(); }
}
function dupeSel() {
  if (!sel || sel.type !== 'icon') return;
  pushUndo();
  if (multiSel.length > 1) {
    const _startIdx = icons.length;
    const _unique = [...new Set(multiSel)];
    _unique.forEach((idx, i) => {
      const pi = icons[idx];
      icons.push({ ...pi, id: Date.now() + i, x: pi.x + 28, y: pi.y + 28 });
    });
    multiSel = _unique.map((_, i) => _startIdx + i);
    sel = { type: 'icon', index: icons.length - 1 };
    closeItb(); redraw(); updateLegend(); autoSave();
  } else {
    const pi = icons[sel.index];
    const cl = { ...pi, id: Date.now(), x: pi.x+28, y: pi.y+28 };
    icons.push(cl); multiSel = []; sel = { type:'icon', index:icons.length-1 };
    showItb(cl); redraw(); updateLegend(); autoSave();
  }
}
function copySelected() {
  if (!sel || sel.type !== 'icon') return;
  if (multiSel.length > 1) {
    clipboard = { _multi: true, items: [...new Set(multiSel)].map(i => ({...icons[i]})) };
    toast('✅ Copied ' + multiSel.length + ' icons — ⌘V to paste');
  } else {
    clipboard = { ...icons[sel.index] };
    toast('✅ Copied — ⌘V to paste');
  }
}
function pasteCopied() {
  if (!clipboard) return;
  pushUndo();
  if (clipboard._multi) {
    const _startIdx = icons.length;
    clipboard.items.forEach((item, i) => {
      icons.push({ ...item, id: Date.now() + i, x: item.x + 28, y: item.y + 28 });
    });
    multiSel = clipboard.items.map((_, i) => _startIdx + i);
    sel = { type: 'icon', index: icons.length - 1 };
    closeItb(); redraw(); updateLegend(); autoSave(); toast('Pasted ' + clipboard.items.length + ' icons');
  } else {
    const cl = { ...clipboard, id: Date.now(), x: clipboard.x+28, y: clipboard.y+28 };
    icons.push(cl); multiSel = []; sel = { type:'icon', index:icons.length-1 };
    showItb(cl); redraw(); updateLegend(); autoSave(); toast('Pasted');
  }
}
function delSel() {
  if (!sel) return;
  if (sel.type === 'icon') {
    const _toDelete = multiSel.length > 1 ? [...new Set(multiSel)].sort((a,b)=>b-a) : [sel.index];
    _toDelete.forEach(idx => icons.splice(idx, 1));
    multiSel = []; updateLegend();
  } else if (sel.type === 'stroke') { strokes.splice(sel.index, 1); }
  sel = null; closeItb(); redraw(); autoSave();
}

// ═══════════════════════════════════════════════════════════
// CONTEXT MENU
// ═══════════════════════════════════════════════════════════
function showCtx(x, y) { const el = document.getElementById('ctx'); el.style.left=x+'px'; el.style.top=y+'px'; el.classList.remove('gone'); }
function hideCtx() { document.getElementById('ctx').classList.add('gone'); }
function ctxAction(a) { hideCtx(); if(a==='delete') delSel(); else if(a==='duplicate') dupeSel(); else if(a==='label') labelIcon(); else if(a==='copy') copySelected(); }

// ═══════════════════════════════════════════════════════════
// UNDO / REDO
// ═══════════════════════════════════════════════════════════
// Unified undo/redo — each action pushed as {type, data} snapshot
const undoStack = [];
function pushUndo() {
  undoStack.push({ strokes: JSON.parse(JSON.stringify(strokes)), icons: icons.map(i => ({...i})) });
  redoStack.length = 0; // new action clears redo
  if (undoStack.length > 80) undoStack.shift();
}
function clearStaleCoverStrokes() {
  if (!pdfDoc) { toast('Open a project first', true); return; }
  const before = strokes.length;
  const coverCount = strokes.filter(s => s.type === 'whitebox' || s.type === 'coverpath').length;
  if (coverCount === 0) { toast('No cover-brush erase marks on this plan'); return; }
  if (!confirm('Remove all ' + coverCount + ' cover-brush erase mark(s) from this plan?\n\nUse this if erase marks look misplaced after the PDF was re-merged or replaced. This will NOT affect pen/text/icon annotations.')) return;
  pushUndo();
  strokes = strokes.filter(s => s.type !== 'whitebox' && s.type !== 'coverpath');
  renderScale = 0; // force full repaint of pdfCv without the stale cover strokes
  renderPages().then(() => { redraw(); autoSave(); toast('✅ Removed ' + coverCount + ' erase mark(s)'); });
}

function _strokesHavePixelPaint(arr) {
  // whitebox/coverpath are baked directly into pdfCv pixels, not redrawn from
  // the strokes array each frame — so undo/redo must trigger a full canvas
  // re-render (not just redraw()) whenever one of these is added or removed.
  return arr.some(s => s.type === 'whitebox' || s.type === 'coverpath');
}

function doUndo() {
  if (!undoStack.length) return;
  // Save current state to redo
  redoStack.push({ strokes: JSON.parse(JSON.stringify(strokes)), icons: icons.map(i => ({...i})) });
  const prevStrokes = strokes; // pre-undo, for pixel-paint diff check
  const prev = undoStack.pop();
  strokes = prev.strokes;
  // Restore icons with img references
  icons = prev.icons.map(pi => {
    const existing = icons.find(e => e.id === pi.id);
    if (existing) return { ...pi, img: existing.img };
    const ic = ICONS.find(i => i.id === pi.iconId);
    if (ic) {
      const img = new Image(); img.src = ic.f;
      return { ...pi, img };
    }
    return pi;
  });
  sel = null; closeItb(); closeStb();
  const _needsRepaint = _strokesHavePixelPaint(prevStrokes) || _strokesHavePixelPaint(strokes);
  if (_needsRepaint) {
    renderScale = 0; // force renderPages to fully redraw pdfCv from source, reapplying only current strokes
    renderPages().then(() => { redraw(); updateLegend(); autoSave(); });
  } else {
    redraw(); updateLegend(); autoSave();
  }
}
function doRedo() {
  if (!redoStack.length) return;
  undoStack.push({ strokes: JSON.parse(JSON.stringify(strokes)), icons: icons.map(i => ({...i})) });
  const prevStrokes = strokes;
  const next = redoStack.pop();
  strokes = next.strokes;
  icons = next.icons.map(pi => {
    const existing = icons.find(e => e.id === pi.id);
    if (existing) return { ...pi, img: existing.img };
    const ic = ICONS.find(i => i.id === pi.iconId);
    if (ic) {
      const img = new Image(); img.src = ic.f;
      return { ...pi, img };
    }
    return pi;
  });
  sel = null; closeItb(); closeStb();
  const _needsRepaint = _strokesHavePixelPaint(prevStrokes) || _strokesHavePixelPaint(strokes);
  if (_needsRepaint) {
    renderScale = 0;
    renderPages().then(() => { redraw(); updateLegend(); autoSave(); });
  } else {
    redraw(); updateLegend(); autoSave();
  }
}

// ═══════════════════════════════════════════════════════════
// CLEAR
// ═══════════════════════════════════════════════════════════
function clearAll() {
  if (!confirm('Clear all annotations and icons?')) return;
  strokes = []; icons = []; sel = null; closeItb(); closeStb(); redraw(); updateLegend(); autoSave(); toast('Cleared');
}

// ═══════════════════════════════════════════════════════════
// LEGEND
// ═══════════════════════════════════════════════════════════
function toggleLegend() { legendOn = !legendOn; redraw(); } // legend drawn on canvas
// Track last legend row count to know when canvas needs to expand
let _lastLegendRows = 0;

let _legendRerenderTimer = null;
function updateLegend() {
  if (window.innerWidth <= 767) { redraw(); return; } // no legend on iPhone
  // Compute current layout to see if canvas height needs to change
  const uniqueIds = [...new Set(icons.map(p => p.iconId))];
  if (uniqueIds.length === 0) { redraw(); return; }
  // Use same col calculation as redraw (maxColsAllowed based on canvas width)
  const CARD_W = 240, GAP_BETWEEN = 16, PAD = 24;
  const canvW = annCv ? annCv.width : 800;
  const cellW = 180, padX = 16;
  const maxLegW = canvW - CARD_W - GAP_BETWEEN - PAD - PAD;
  const maxCols = Math.max(1, Math.floor((maxLegW - padX * 2) / cellW));
  const cols = Math.min(maxCols, uniqueIds.length);
  const rows = Math.ceil(uniqueIds.length / cols);

  if (rows !== _lastLegendRows) {
    // Canvas height must change — debounce to avoid rapid-fire re-renders (blink)
    _lastLegendRows = rows;
    clearTimeout(_legendRerenderTimer);
    _legendRerenderTimer = setTimeout(() => { renderPages(); }, 150);
  } else {
    redraw();
  }
}

// ═══════════════════════════════════════════════════════════
// PDF LOADING
// ═══════════════════════════════════════════════════════════
async function loadPDF(file) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  _zoomedOnceThisDoc = false;
  showLoad('Loading PDF...');
  try {
    pdfDoc = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    _natPageWidth = 0; // reset cached page width for new PDF
    document.getElementById('dropzone').classList.add('gone');
    document.getElementById('ccon').style.display = 'none';
    document.getElementById('cwrap').style.overflow = 'auto';
    document.getElementById('save-btns').style.display = 'flex';
    document.getElementById('canvas-titlebar').style.display = 'flex';
    _ewmDirty = true;
    const _isIphoneLoad = window.innerWidth <= 767;
    if (!_isIphoneLoad) autoOpenStrip();
    loadMapBoxes();
    // Render — fit to screen, await completion so callers see canvas ready
    await new Promise(resolve => {
      requestAnimationFrame(async () => {
        await _applyFitScale();
        if (!_isIphoneLoad) saveSession();
        resolve();
      });
    });
    toast('✅ ' + pdfDoc.numPages + ' page' + (pdfDoc.numPages > 1 ? 's' : '') + ' loaded');
  } catch(e) { toast('❌ ' + e.message, true); }
  hideLoad();
}



// Zoom = re-render at actual pdfScale for crisp vector quality. No CSS scaling blur.
let renderScale = 1;
let _prevLegendOffset = 0;
let _scrollTargetX = null, _scrollTargetY = null; // set by zoomBy, applied in renderPages // track legend offset changes to keep icon positions stable
let _renderToken = 0; // incremented each render call — stale renders abort when token changes

function _reapplyPixelStrokes() {
  // whitebox/coverpath are baked directly into pdfCv pixels, not redrawn from
  // the strokes array by the normal annCv redraw — must be repainted onto
  // pdfCv any time it's cleared/redrawn (full render, or a background page
  // landing after the fact).
  if (!strokes || !strokes.length) return;
  const _wbCtx2 = pdfCv.getContext('2d');
  strokes.filter(s => s.type === 'whitebox').forEach(s => {
    _wbCtx2.fillStyle = '#ffffff';
    _wbCtx2.fillRect(s.x * renderScale, (s.y + 196/renderScale) * renderScale, s.w * renderScale, s.h * renderScale);
  });
  strokes.filter(s => s.type === 'coverpath' && s.path && s.path.length).forEach(s => {
    const _r = ((s.brush || 28) / 2) * renderScale;
    _wbCtx2.save();
    _wbCtx2.fillStyle = '#ffffff'; _wbCtx2.strokeStyle = '#ffffff';
    _wbCtx2.lineCap = 'round'; _wbCtx2.lineJoin = 'round'; _wbCtx2.lineWidth = _r * 2;
    if (s.path.length === 1) {
      const p0 = s.path[0];
      _wbCtx2.beginPath();
      _wbCtx2.arc(p0.x * renderScale, (p0.y + 196/renderScale) * renderScale, _r, 0, Math.PI*2);
      _wbCtx2.fill();
    } else {
      _wbCtx2.beginPath();
      s.path.forEach((pt, i) => {
        const px = pt.x * renderScale, py = (pt.y + 196/renderScale) * renderScale;
        if (i === 0) _wbCtx2.moveTo(px, py); else _wbCtx2.lineTo(px, py);
      });
      _wbCtx2.stroke();
    }
    _wbCtx2.restore();
  });
}

async function renderPages() {
  if (!pdfDoc) return;
  const myToken = ++_renderToken;
  pdfPages = [];
  const fp = await pdfDoc.getPage(1);
  if (myToken !== _renderToken) return; // newer render started, abort
  // Cache natural page width so _applyFitScale never needs async
  if (!_natPageWidth) _natPageWidth = fp.getViewport({ scale: 1 }).width;
  // Guard: cap pdfScale if canvas would exceed iOS/browser limits.
  // iPad/iPhone get a tighter cap (memory-constrained). Desktop also needs a
  // ceiling — without one, the MASTER canvas (pw x th) can exceed the browser's
  // 2D canvas pixel limit at high zoom on multi-page plans, which fails silently
  // and desyncs icon screen-positions from what's actually drawn.
  const _isIpadRender = /iPad|iPhone|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const _vp0test = fp.getViewport({ scale: 1 });
  const _pw1 = _vp0test.width, _ph1 = _vp0test.height;
  const _pages = pdfDoc.numPages;
  if (_isIpadRender) {
    const _totalH = 196 + (_ph1 * pdfScale + 16) * _pages;
    const _totalPx = Math.round(_pw1 * pdfScale) * _totalH;
    if (_totalPx > 14000000) {
      // Scale back to fit within ~14M pixels
      pdfScale = Math.sqrt(14000000 / (_pw1 * (_ph1 * _pages + 196 / _pages)));
      pdfScale = Math.max(0.5, Math.round(pdfScale * 10) / 10);
    }
  } else {
    // Desktop ceiling: keep master canvas comfortably under common browser limits
    // (Chrome/Firefox ~268M px area, Safari smaller). Cap at 100M px total.
    const DESKTOP_MAX_PX = 100000000;
    const _totalHd = 196 + (_ph1 * pdfScale + 16) * _pages;
    const _totalPxd = Math.round(_pw1 * pdfScale) * _totalHd;
    if (_totalPxd > DESKTOP_MAX_PX) {
      const _cappedScale = Math.sqrt(DESKTOP_MAX_PX / (_pw1 * (_ph1 * _pages + 196 / _pages)));
      if (_cappedScale < pdfScale) {
        pdfScale = Math.max(0.1, Math.round(_cappedScale * 100) / 100);
        toast('Zoom limited — plan too large to render higher at this page count', true);
      }
    }
  }
  const vp0 = fp.getViewport({ scale: pdfScale });
  const pw = Math.round(vp0.width), ph = Math.round(vp0.height), gap = 16;
  // Calculate legend height — add whitespace ABOVE first page
  const _legendH = 0; const _legendOffset = 0;
  const _isIphoneRender = window.innerWidth <= 767;
  const _legBelowH = _isIphoneRender ? 20 : 196; // no legend on iPhone, minimal padding
  const th = _legBelowH + (ph + gap) * pdfDoc.numPages - gap;

  // Icons/strokes stored at scale=1 always. legendOffset shifts y-coords only.
  // renderScale is applied at draw time in redraw() — NEVER mutate coords here.
  const _legendDelta = _legendOffset - _prevLegendOffset;
  if (_legendDelta !== 0 && _prevLegendOffset >= 0) {
    icons.forEach(ic => { ic.y = Math.round(ic.y + _legendDelta); });
    strokes.forEach(s => {
      if (s.path) s.path = s.path.map(p => ({x:p.x, y:p.y + _legendDelta}));
      if (s.from) { s.from.y += _legendDelta; s.to.y += _legendDelta; }
      if (s.type==='rect') { s.y += _legendDelta; }
      if (s.type==='circle') { s.cy += _legendDelta; }
      if (s.type==='text') { s.y += _legendDelta; }
    });
  }
  _prevLegendOffset = _legendOffset;

  // Render into offscreen canvas first to avoid flash/blink
  // On iPhone, render only current page to avoid memory crash

  if (_isIphoneRender) {
    // Clamp iphoneCurrentPage
    if (iphoneCurrentPage < 1) iphoneCurrentPage = 1;
    if (iphoneCurrentPage > pdfDoc.numPages) iphoneCurrentPage = pdfDoc.numPages;
    const iphoneScale = pdfScale;
    const fp2 = await pdfDoc.getPage(iphoneCurrentPage);
    const vp2 = fp2.getViewport({ scale: iphoneScale });
    const ipw = Math.round(vp2.width), iph = Math.round(vp2.height);
    const ith = iph + 196;
    pdfCv.width = ipw; pdfCv.height = ith; annCv.width = ipw; annCv.height = ith;
    pdfCtx.fillStyle = '#ffffff'; pdfCtx.fillRect(0, 0, ipw, ith);
    const yo = 196;
    pdfCtx.fillStyle = '#fff'; pdfCtx.fillRect(0, yo, ipw, iph);
    const off = document.createElement('canvas');
    off.width = ipw; off.height = iph;
    const offCtx = off.getContext('2d', { alpha: false });
    await fp2.render({ canvasContext: offCtx, viewport: vp2, intent: 'display' }).promise;
    pdfCtx.drawImage(off, 0, yo);
    off.width = 1; off.height = 1;
    offCtx.clearRect(0,0,1,1);
    pdfPages = [{ y: yo, h: iph }];
    updateIphonePageNav();
  } else {
    // Render every page 1:1 at exactly pdfScale — no separate quality multiplier,
    // no independent rounding between offscreen canvas size and the slot size.
    // (A previous version stretched a differently-rounded high-res canvas into
    // the slot, which caused content to drift slightly relative to icons at
    // different zoom levels. Rendering directly at the target size eliminates
    // that distortion entirely.)
    //
    // Speed: only the page(s) currently visible in the viewport are rendered
    // synchronously (so a zoom click feels instant); off-screen pages render
    // right after, non-blocking, and the canvas updates again when ready.
    const _maxPages = pdfDoc.numPages;
    const _wrapEl = document.getElementById('cwrap');
    const _visTop = _wrapEl ? _wrapEl.scrollTop : 0;
    const _visBot = _wrapEl ? _visTop + _wrapEl.clientHeight : th;

    // Resizing pdfCv clears it instantly to blank — if we do that BEFORE the new
    // content is ready, there's a visible blank flash while PDF.js renders
    // (most noticeable on the very first zoom, before anything is warmed up).
    // Fix: paint visible pages into an offscreen buffer first, then swap the
    // buffer onto pdfCv in one atomic step once it's actually ready to show.
    const _swapBuffer = document.createElement('canvas');
    _swapBuffer.width = pw; _swapBuffer.height = th;
    const _swapCtx = _swapBuffer.getContext('2d', { alpha: false });
    _swapCtx.fillStyle = '#ffffff'; _swapCtx.fillRect(0, 0, pw, th);

    const _renderOnePage = async (i, targetCtx) => {
      const page = await pdfDoc.getPage(i);
      if (myToken !== _renderToken) return false;
      const vp = page.getViewport({ scale: pdfScale });
      const off = document.createElement('canvas');
      off.width = pw; off.height = ph;
      const offCtx = off.getContext('2d', { alpha: false });
      offCtx.fillStyle = '#ffffff';
      offCtx.fillRect(0, 0, pw, ph);
      await page.render({ canvasContext: offCtx, viewport: vp }).promise;
      if (myToken !== _renderToken) return false;
      const yo = 196 + (ph + gap) * (i - 1);
      targetCtx.drawImage(off, 0, yo);
      off.width = 1; off.height = 1;
      return true;
    };

    const _visiblePages = [], _offscreenPages = [];
    for (let i = 1; i <= _maxPages; i++) {
      const yo = 196 + (ph + gap) * (i - 1);
      pdfPages.push({ y: yo, h: ph });
      const overlaps = (yo + ph) > _visTop && yo < _visBot;
      (overlaps ? _visiblePages : _offscreenPages).push(i);
    }
    // Render visible pages into the offscreen buffer — old canvas stays on
    // screen untouched the whole time, so nothing ever goes blank.
    for (const i of _visiblePages) {
      if (myToken !== _renderToken) return;
      await _renderOnePage(i, _swapCtx);
    }
    if (myToken !== _renderToken) return;

    // Atomic swap: resize the real canvas and immediately paint the finished
    // buffer onto it in the same synchronous block — no blank frame possible.
    pdfCv.width = pw; pdfCv.height = th; annCv.width = pw; annCv.height = th;
    pdfCtx.drawImage(_swapBuffer, 0, 0);
    _swapBuffer.width = 1; _swapBuffer.height = 1;

    // Off-screen pages render in the background without blocking the click-to-paint path
    if (_offscreenPages.length) {
      (async () => {
        for (const i of _offscreenPages) {
          if (myToken !== _renderToken) return;
          await _renderOnePage(i, pdfCtx);
        }
        if (myToken !== _renderToken) return;
        // Off-screen pages just landed — reapply any cover-brush/whitebox paint
        // on those pages, since their fresh render would otherwise sit on top of it.
        _reapplyPixelStrokes();
        redraw();
      })();
    }
  }
  if (myToken !== _renderToken) return;
  renderScale = pdfScale;
  const ccon2 = document.getElementById('ccon');
  if (ccon2) { ccon2.style.transform=''; ccon2.style.transformOrigin=''; ccon2.style.width=''; ccon2.style.height=''; ccon2.style.display='block'; }
  // Restore scroll in rAF so browser reflow from clearing transform settles first
  if (_scrollTargetX !== null) {
    const _tx = _scrollTargetX, _ty = _scrollTargetY;
    _scrollTargetX = null; _scrollTargetY = null;
    requestAnimationFrame(() => {
      const _wrap2 = document.getElementById('cwrap');
      if (_wrap2) { _wrap2.scrollLeft = _tx; _wrap2.scrollTop = _ty; }
    });
  }
  _reapplyPixelStrokes();
  hideLoad(); redraw(); updateMergeBtn();
  // Re-render map overlay boxes at new scale after zoom re-render
  if (typeof renderMapOverlay === 'function' && mapBoxes && mapBoxes.length) renderMapOverlay();
}

let zoomRenderTimer = null;

let _zoomedOnceThisDoc = false; // first zoom on a freshly loaded PDF is slower (PDF.js cold start for this scale)

function zoomBy(d) {
  if (!pdfDoc) return;
  const wrap = document.getElementById('cwrap');

  const newScale = Math.max(0.1, parseFloat((pdfScale + d).toFixed(3)));
  if (newScale === pdfScale) return;

  // Anchor to the point currently at the viewport center, in natural (scale=1) coords.
  const viewCenterX = wrap.scrollLeft + wrap.clientWidth / 2;
  const viewCenterY = wrap.scrollTop  + wrap.clientHeight / 2;
  const natCX = viewCenterX / pdfScale;
  const natCY = viewCenterY / pdfScale;

  pdfScale = newScale;

  // Render immediately — no artificial delay. renderPages()'s own _renderToken
  // guard already cancels a still-in-flight render if another zoom comes in
  // right behind it, so rapid clicking/holding stays safe without a timer.
  clearTimeout(zoomRenderTimer);
  _scrollTargetX = natCX * pdfScale - wrap.clientWidth / 2;
  _scrollTargetY = natCY * pdfScale - wrap.clientHeight / 2;

  // First zoom on a freshly opened plan is the one render that's genuinely
  // slower (PDF.js building its internal operator list for this scale for
  // the first time). Give a brief visual cue so the wait reads as "working"
  // rather than "stuck" — subsequent zooms are fast and skip this entirely.
  if (!_zoomedOnceThisDoc) {
    _zoomedOnceThisDoc = true;
    const _ccon3 = document.getElementById('ccon');
    if (_ccon3) {
      _ccon3.style.transition = 'opacity .08s';
      _ccon3.style.opacity = '0.55';
      renderPages().then(() => { _ccon3.style.opacity = '1'; setTimeout(() => { _ccon3.style.transition = ''; }, 150); });
      return;
    }
  }
  renderPages();
}

function zoomFit() {
  if (!pdfDoc) return;
  _applyFitScale();
}

function zoomFitAll() {
  if (!pdfDoc) return;
  const wrap = document.getElementById('cwrap');
  const pad = 32;
  const availW = wrap.clientWidth  - pad;
  const availH = wrap.clientHeight - pad;
  pdfDoc.getPage(1).then(pg => {
    const nat = pg.getViewport({ scale: 1 });
    const scaleW = availW / nat.width;
    const scaleH = (availH / nat.height) / pdfDoc.numPages;
    pdfScale = Math.min(scaleW, scaleH * pdfDoc.numPages, scaleW);
    renderPages();
  });
}

// ═══════════════════════════════════════════════════════════
// FILE OPEN
// ═══════════════════════════════════════════════════════════
function openFileDialog() {
  closeMenus();
  goToDashboard();
}

function goToDashboard() {
  if (pdfDoc || CP) {
    // closeProject is async; _doCloseReset calls loadJobDashboard when done
    closeProject();
    return;
  }
  // No project open — just show dashboard
  const sidebar3 = document.getElementById('sidebar');
  if (sidebar3) sidebar3.classList.add('hidden');
  const toolbar3 = document.getElementById('toolbar');
  if (toolbar3) toolbar3.style.display = 'none';
  document.getElementById('ccon').style.display = 'none';
  document.getElementById('cwrap').style.overflow = 'hidden';
  document.getElementById('cwrap').classList.remove('zoomed');
  if (!CP && !pdfDoc) document.getElementById('dropzone').classList.remove('gone');
  loadJobDashboard();
}

async function handleFileOpen(input) {
  if (!input.files[0]) return;
  closeMenus();
  await handleFile(input.files[0]);
  input.value = '';
}

async function handleFile(file) {
  const name = file.name.toLowerCase();
  if (name.endsWith('.ewm')) {
    await openEliteMarkup(file);
  } else if (name.endsWith('.pdf')) {
    if (!CP) {
      showNewJobModal(file);
      return;
    }
    currentFileName = CP.name;
    strokes = []; icons = [];
    setProjectUI(currentFileName);
    document.getElementById('dropzone').classList.add('gone');
    document.getElementById('cwrap').style.overflow = 'auto';
    await new Promise(r => setTimeout(r, 80));
    await loadPDF(file);
    // Upload PDF to storage if not already stored
    if (CP?.id && !CP.pdf_storage_path) {
      const pdfPath = CP.id + '/' + file.name;
      const { error: upErr } = await sb.storage.from('plan-pdfs').upload(pdfPath, file, { upsert: true });
      if (!upErr) {
        // Also persist blank annotations so the base project is always clean
        const blankAnn = { v: 2, savedAt: new Date().toISOString(), strokes: [], icons: [] };
        await sb.from('markup_projects').update({ pdf_storage_path: pdfPath, pdf_filename: file.name, ewm_data: blankAnn }).eq('id', CP.id);
        CP.pdf_storage_path = pdfPath;
        CP.pdf_filename = file.name;
        toast('✅ PDF saved to cloud');
      }
    }
    // Do not restore from cloud here — openProject/openVariant handle annotation loading
  } else {
    toast('Unsupported file type. Use .pdf or .ewm');
  }
}

// Replace the current PDF while keeping the project open.
// Prompts with a confirm if there are unsaved annotations, then swaps the PDF,
// clears annotations, uploads to Supabase, and re-renders.
async function deleteAllVariants() {
  if (!CP || !CP.id) { toast('Open a project first', true); return; }
  const { data: vars } = await sb.from('markup_variants').select('id, name').eq('project_id', CP.id);
  if (!vars || !vars.length) { toast('No saved plans to delete for this project'); return; }
  if (!confirm('Delete ALL ' + vars.length + ' saved plan(s) for this project?\n\n' + vars.map(v=>'• '+v.name).join('\n') + '\n\nThis cannot be undone. The base project PDF will not be affected.')) return;
  showLoad('Deleting saved plans...');
  try {
    const { error } = await sb.from('markup_variants').delete().eq('project_id', CP.id);
    if (error) throw error;
    window._apUsedPageNums = [];
    window._apSourcePdfDoc = null;
    toast('✅ Deleted ' + vars.length + ' saved plan(s)');
  } catch(e) { toast('❌ ' + e.message, true); }
  hideLoad();
}

async function replacePDF() {
  if (!CP) { toast('Open a project first', true); return; }
  if (icons.length > 0 || strokes.length > 0) {
    if (!confirm('Replacing the PDF will clear all current annotations. Continue?')) return;
  }
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = '.pdf';
  inp.onchange = async () => {
    const file = inp.files[0];
    if (!file) return;
    showLoad('Replacing PDF…');
    try {
      // Clear annotations
      strokes = []; icons = []; sel = null;
      closeItb();
      if (annCtx) annCtx.clearRect(0, 0, annCv.width, annCv.height);

      // Load new pdfDoc directly — same pattern as openVariant so we control sequencing
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      pdfDoc = null;
      _renderToken++; // cancel any in-flight renders
      const objUrl = URL.createObjectURL(file);
      pdfDoc = await pdfjsLib.getDocument(objUrl).promise;
      URL.revokeObjectURL(objUrl);

      // Calculate fit scale for new PDF
      _natPageWidth = 0;
      const pg1 = await pdfDoc.getPage(1);
      _natPageWidth = pg1.getViewport({ scale: 1 }).width;
      const wrap = document.getElementById('cwrap');
      pdfScale = Math.floor((wrap.clientWidth - 42) / _natPageWidth * 100) / 100;

      // Full synchronous render — await completion before showing canvas
      renderScale = 0; // force full re-render
      await renderPages();

      // Now show the canvas
      const ccon = document.getElementById('ccon');
      if (ccon) { ccon.style.display = 'block'; ccon.style.transform = ''; ccon.style.width = ''; ccon.style.height = ''; }
      wrap.scrollLeft = 0; wrap.scrollTop = 0;
      redraw();

      // Rebuild page thumbnail strip
      if (window.innerWidth > 767) autoOpenStrip();

      // Upload new PDF to Supabase — use a FRESH timestamped path every time.
      // Never reuse the old path: upsert on storage can be unreliable/cached,
      // and a fresh path guarantees the project points at exactly this new file.
      if (CP?.id) {
        const _ts = Date.now();
        const _ext = (file.name.split('.').pop() || 'pdf');
        const pdfPath = CP.id + '/source-' + _ts + '.' + _ext;
        const { error: upErr } = await sb.storage.from('plan-pdfs').upload(pdfPath, file, { upsert: false });
        if (upErr) {
          toast('Upload failed: ' + upErr.message, true);
          hideLoad(); return;
        }
        const { error: dbErr } = await sb.from('markup_projects').update({ pdf_storage_path: pdfPath, pdf_filename: file.name }).eq('id', CP.id);
        if (dbErr) { toast('DB update failed: ' + dbErr.message, true); hideLoad(); return; }
        CP.pdf_storage_path = pdfPath;
        CP.pdf_filename = file.name;
        window._apSourcePdfDoc = null;
        window._apUsedPageNums = [];
        if (window.allProjects) {
          const _ci = window.allProjects.findIndex(p => p.id === CP.id);
          if (_ci >= 0) { window.allProjects[_ci].pdf_storage_path = pdfPath; window.allProjects[_ci].pdf_filename = file.name; }
        }
        console.log('[replacePDF] new source path:', pdfPath);
        // Clear cloud annotations so old icons don't restore on top of new PDF
        if (currentVariantId) {
          await sb.from('markup_variants').update({ ewm_data: { strokes: [], icons: [] }, updated_at: new Date().toISOString() }).eq('id', currentVariantId);
        }
      }

      document.getElementById('ct-name').textContent = CP.name;
      toast('✅ PDF replaced: ' + file.name);
    } catch(e) { toast('❌ ' + e.message, true); console.error(e); }
    hideLoad();
  };
  inp.click();
}

async function openEliteMarkup(file) {
  showLoad('Opening .ewm file...');
  try {
    const text = await file.text();
    const pkg = JSON.parse(text);
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    currentFileName = pkg.projectName || file.name.replace(/\.ewm$/i,'');

    document.getElementById('dropzone').classList.add('gone');
    document.getElementById('cwrap').style.overflow = 'auto';

    // Always single-plan — open the PDF, restore annotations, done
    const arr2 = Uint8Array.from(atob(pkg.pdfData), c => c.charCodeAt(0));
    const blob2 = new Blob([arr2], { type:'application/pdf' });
    pdfDoc = await pdfjsLib.getDocument(URL.createObjectURL(blob2)).promise;
    pdfScale = pkg.pdfScale || 1;
    activeTab = null; // single plan, no tab switching needed
    // Hide plan tabs — not relevant for standalone EWM
    document.getElementById('plan-tabs').style.display = 'none';
    await renderPages();
    zoomFit();
    strokes = pkg.strokes || [];
    icons = [];
    for (const pi of (pkg.icons || [])) {
      const ic = ICONS.find(i => i.id === pi.iconId); if (!ic) continue;
      await new Promise(res => { const img=new Image(); img.onload=()=>{icons.push({...pi,img});res();}; img.onerror=res; img.src=ic.f; });
    }

    redraw(); updateLegend(); zoomFit();
    if (window.innerWidth > 767) autoOpenStrip();

    if (!CP) await autoCreateProject(currentFileName);
    setProjectUI(currentFileName);

    // Restore map boxes from EWM, fall back to Supabase
    if (pkg.mapBoxes && pkg.mapBoxes.length > 0) {
      mapBoxes = pkg.mapBoxes;
      renderMapOverlay(); renderMapBoxList();
    } else {
      await loadMapBoxes();
    }

    _ewmDirty = false;
    if (activeTab && TABS[activeTab]) TABS[activeTab]._dirty = false;
    saveSession();
    toast('✅ ' + currentFileName + ' restored — ' + icons.length + ' icons, ' + strokes.length + ' drawings');
  } catch(e) { toast('❌ Could not open file: ' + e.message, true); console.error(e); }
  hideLoad();
}

async function autoCreateProject(name) {
  const { data } = await sb.from('markup_projects').insert({ name, created_by: CU.id, annotations: JSON.stringify({strokes:[],icons:[]}) }).select().single();
  if (data) CP = data;
}

function setProjectUI(name) {
  // Show sidebar and toolbar when project is open — but NOT on iPhone (sidebar stays closed)
  const sidebar = document.getElementById('sidebar');
  if (sidebar && window.innerWidth > 767) sidebar.classList.remove('hidden');
  const toolbar = document.getElementById('toolbar');
  if (toolbar) { toolbar.style.display = 'flex'; if(window._applyToolbarPos) window._applyToolbarPos(); }
  // Show iPad toolbar when on canvas
  const ipadToolbar = document.getElementById('ipad-toolbar');
  if (ipadToolbar) ipadToolbar.style.display = 'flex';
  // Update iPhone canvas title bar — read from ct-name which is always set correctly
  const iphoneFname = document.getElementById('iphone-canvas-fname');
  if (iphoneFname) {
    const ctName = document.getElementById('ct-name')?.textContent || '';
    const customer = CP?.client || CP?.markup_customers?.name || CP?.name || '';
    const variant = currentVariantName || ctName || '';
    iphoneFname.textContent = customer && variant ? customer + ' · ' + variant : customer || variant || name || '';
  }
  // Reset AI chat so welcome message reflects new project context
  const msgs = document.getElementById('ai-chat-messages');
  if (msgs) { msgs.innerHTML = '<div class="ai-msg system">Plan markup assistant · powered by Claude</div>'; }
  aiChatHistory = [];
  document.getElementById('pname').textContent = name;
  document.getElementById('ct-name').textContent = name;
  document.getElementById('canvas-titlebar').style.display = 'flex';
  document.getElementById('save-btns').style.display = 'flex';
  // Enable file menu items
  const me = document.getElementById('menu-export-pdf');
  const mc = document.getElementById('menu-close-project');
  const mr = document.getElementById('menu-replace-pdf');
  const ms = document.getElementById('menu-save-as');
  if (me) { me.style.opacity='1'; me.style.pointerEvents='auto'; }
  if (mc) { mc.style.opacity='1'; mc.style.pointerEvents='auto'; }
  if (mr) { mr.style.opacity='1'; mr.style.pointerEvents='auto'; }
  if (ms) { ms.style.opacity='1'; ms.style.pointerEvents='auto'; }
  const _mapEn = document.getElementById('menu-add-pages'); if (_mapEn) { _mapEn.style.opacity='1'; _mapEn.style.pointerEvents='auto'; }
  const _mdvEn = document.getElementById('menu-delete-variants'); if (_mdvEn) { _mdvEn.style.opacity='1'; _mdvEn.style.pointerEvents='auto'; }
  const _mccEn = document.getElementById('menu-clear-cover'); if (_mccEn) { _mccEn.style.opacity='1'; _mccEn.style.pointerEvents='auto'; }
  setTimeout(() => { if (currentFileName) loadMapBoxes(); }, 300);
  document.getElementById('plan-tabs').style.display = 'none'; // plan tabs only shown during merge transition
  document.getElementById('ct-close-btn').style.display = 'flex';
  if (CP) startPresence(CP.id, name);
}

// ═══════════════════════════════════════════════════════════
// PROJECT MANAGEMENT
// ═══════════════════════════════════════════════════════════
function showNewProj() { closeMenus(); closeModal('open-proj-modal'); document.getElementById('new-proj-modal').classList.remove('gone'); setTimeout(() => document.getElementById('np-name').focus(), 80); }

async function createNewProj() {
  const name = document.getElementById('np-name').value.trim();
  if (!name) { toast('Enter a project name'); return; }
  const client = document.getElementById('np-client').value.trim();
  const { data, error } = await sb.from('markup_projects').insert({ name, client, created_by: CU.id, annotations: JSON.stringify({strokes:[],icons:[]}) }).select().single();
  if (error) { toast('❌ ' + error.message, true); return; }
  document.getElementById('np-name').value = ''; document.getElementById('np-client').value = '';
  closeModal('new-proj-modal');
  CP = data; currentFileName = name; strokes = []; icons = [];
  setProjectUI(name);
  // Now prompt for PDF
  document.getElementById('file-open-input').accept = '.pdf';
  document.getElementById('file-open-input').click();
  toast('Project created — now open a PDF plan');
}

async function showOpenProj() {
  closeMenus();
  document.getElementById('open-proj-modal').classList.remove('gone');
  await loadProjList('');
  setTimeout(() => document.getElementById('proj-search').focus(), 80);
}

async function loadProjList(q) {
  let query = sb.from('markup_projects').select('*, markup_customers(name, customer_type)').order('updated_at', { ascending: false });
  const { data } = await query;
  if (!data) return;
  const f = q ? data.filter(p => {
    const ql = q.toLowerCase();
    return p.name.toLowerCase().includes(ql)
      || (p.client || '').toLowerCase().includes(ql)
      || (p.markup_customers?.name || '').toLowerCase().includes(ql)
      || (p.job_type || '').toLowerCase().includes(ql);
  }) : data;
  const active = f.filter(p => !p.archived);
  const archived = f.filter(p => p.archived);
  let html = active.length ? active.map(p => projItemHTML(p)).join('') : '<div class="p-empty">No projects yet.<br>Create one to get started.</div>';
  if (archived.length) { html += `<div class="arch-lbl">Archived (${archived.length})</div>`; html += archived.map(p => projItemHTML(p, true)).join(''); }
  document.getElementById('open-proj-list').innerHTML = html;
}

function projItemHTML(p, archived = false) {
  return `<div class="pitem${CP?.id===p.id?' active':''}${archived?' archived':''}" onclick="openProject('${p.id}')">
    <div class="pinfo"><h4>${p.name}</h4><p>${p.client?p.client+' · ':''}${new Date(p.updated_at).toLocaleDateString()}</p></div>
    <div class="pacts">
      ${archived
        ? `<button class="pact" onclick="archiveProj(event,'${p.id}',false)" title="Restore">♻</button>`
        : `<button class="pact" onclick="archiveProj(event,'${p.id}',true)" title="Archive">📦</button>`}
      <button class="pact del" onclick="deleteProj(event,'${p.id}')" title="Delete">🗑</button>
    </div>
  </div>`;
}

function filterProjs(q) { loadProjList(q); }


// ═══════════════════════════════════════════════════════════
// VARIANT MANAGEMENT — Save/load named plan versions per project
// ═══════════════════════════════════════════════════════════
let currentVariantId = null;
let currentVariantName = null;
let currentVariantTabType = null; // floor / elev / single
let _blankProtectPrompted = false; // true once user has been warned about blank protection

const BLANK_VARIANT_NAMES = ['Blank Layout', 'Blank Elevation', 'Blank Floorplan'];

function isBlankVariant() {
  return !!(currentVariantName && BLANK_VARIANT_NAMES.includes(currentVariantName));
}

function hasContent() {
  return (icons && icons.length > 0) || (strokes && strokes.length > 0);
}

async function showVariantPicker(projectId, projectName) {
  let variants = [];
  try {
    const { data, error } = await sb.from('markup_variants')
      .select('*').eq('project_id', projectId).order('tab_type').order('name');
    if (!error && data) variants = data;
  } catch(e) { return false; } // table may not exist yet
  if (!variants || variants.length === 0) return false;

  return new Promise(resolve => {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:9999;display:flex;align-items:center;justify-content:center;';
    const renderGroup = (label, color, items) => {
      if (!items.length) return '';
      return `<div style="margin-bottom:14px;">
        <div style="font-size:9px;font-weight:700;letter-spacing:1.5px;color:${color};text-transform:uppercase;margin-bottom:6px;">${label}</div>
        ${items.map(v => `
          <div onclick="window._selV('${v.id}')" data-vid="${v.id}"
            style="padding:10px 14px;background:var(--surf2);border:1px solid var(--bdr);border-radius:8px;cursor:pointer;margin-bottom:5px;display:flex;align-items:center;gap:10px;touch-action:manipulation;"
            onmouseenter="this.style.borderColor='var(--acc)'" onmouseleave="this.style.borderColor='var(--bdr)'">
            <div style="flex:1;">
              <div style="font-size:13px;font-weight:600;color:var(--txt);">${v.name}</div>
              <div style="font-size:10px;color:var(--txt3);">${new Date(v.updated_at||v.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>
            </div>
            <button onclick="event.stopPropagation();window._dotMenu('${v.id}','${v.name.replace(/'/g,"\\'")}',this.closest('[data-vid]'))"
              style="width:30px;height:30px;border-radius:6px;border:1px solid var(--bdr2);background:var(--surf);color:var(--txt2);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;touch-action:manipulation;line-height:1;">⋯</button>
          </div>`).join('')}
      </div>`;
    };
    const floors = variants.filter(v=>v.tab_type==='floor');
    const elevs = variants.filter(v=>v.tab_type==='elev');
    const singles = variants.filter(v=>v.tab_type==='single');
    modal.innerHTML = `
      <div style="background:var(--surf);border:1px solid var(--bdr2);border-radius:14px;padding:28px;max-width:520px;width:94%;max-height:80vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.5);">
        <div style="font-size:16px;font-weight:700;color:var(--txt);margin-bottom:4px;">${projectName}</div>
        <div style="font-size:11px;color:var(--txt3);margin-bottom:16px;">Choose a saved version to open</div>
        ${renderGroup('📐 Floor Plan Versions','#22c55e',floors)}
        ${renderGroup('🏠 Elevation Versions','#38bdf8',elevs)}
        ${renderGroup('📄 Other Versions','#f0a500',singles)}
        <div style="border-top:1px solid var(--bdr);margin-top:14px;padding-top:14px;display:flex;gap:8px;">
          <button onclick="window._selV('dismiss')" style="padding:10px 14px;background:transparent;border:1px solid var(--bdr2);border-radius:8px;color:var(--txt3);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;">Cancel</button>
          <button onclick="window._selV('base')" style="flex:1;padding:10px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:8px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;">📂 Open Base Project</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    window._selV = (id) => { modal.remove(); resolve(id==='dismiss'?null:id); };
    window._dotMenu = (id, name, rowEl) => {
      const m = document.createElement('div');
      m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:10000;display:flex;align-items:center;justify-content:center;';
      m.innerHTML = `
        <div style="background:var(--surf);border:1px solid var(--bdr2);border-radius:12px;padding:18px;width:260px;box-shadow:0 16px 48px rgba(0,0,0,.6);display:flex;flex-direction:column;gap:8px;">
          <div style="font-size:12px;font-weight:700;color:var(--txt);margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${name}</div>
          <button id="_dm-rename" style="padding:11px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:8px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-align:left;touch-action:manipulation;">✏️ Rename</button>
          <button id="_dm-delete" style="padding:11px;background:transparent;border:1px solid var(--red);border-radius:8px;color:var(--red);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-align:left;touch-action:manipulation;">🗑 Delete</button>
          <button id="_dm-cancel" style="padding:8px;background:transparent;border:none;color:var(--txt3);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;touch-action:manipulation;">Cancel</button>
        </div>`;
      document.body.appendChild(m);
      m.querySelector('#_dm-cancel').onclick = () => m.remove();
      m.querySelector('#_dm-rename').onclick = async () => {
        m.remove();
        const n = prompt('Rename:', name);
        if (!n || n === name) return;
        await sb.from('markup_variants').update({name:n, updated_at:new Date().toISOString()}).eq('id', id);
        const nameEl = rowEl.querySelector('div > div');
        if (nameEl) nameEl.textContent = n;
      };
      m.querySelector('#_dm-delete').onclick = async () => {
        m.remove();
        const confirmM = document.createElement('div');
        confirmM.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:10000;display:flex;align-items:center;justify-content:center;';
        confirmM.innerHTML = `
          <div style="background:var(--surf);border:1px solid var(--bdr2);border-radius:12px;padding:22px;width:280px;box-shadow:0 16px 48px rgba(0,0,0,.6);display:flex;flex-direction:column;gap:10px;">
            <div style="font-size:14px;font-weight:700;color:var(--txt);">Delete Version?</div>
            <div style="font-size:12px;color:var(--txt2);">Delete <strong>${name}</strong>? This cannot be undone.</div>
            <button id="_dc-confirm" style="padding:11px;background:var(--red);border:none;border-radius:8px;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;touch-action:manipulation;">Delete</button>
            <button id="_dc-cancel" style="padding:8px;background:transparent;border:none;color:var(--txt3);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;touch-action:manipulation;">Cancel</button>
          </div>`;
        document.body.appendChild(confirmM);
        confirmM.querySelector('#_dc-cancel').onclick = () => confirmM.remove();
        confirmM.querySelector('#_dc-confirm').onclick = async () => {
          confirmM.remove();
          await sb.from('markup_variants').delete().eq('id', id);
          rowEl.remove();
        };
      };
    };
  });
}

async function openVariant(variantId) {
  const {data:v} = await sb.from('markup_variants').select('*').eq('id',variantId).single();
  if (!v) { toast('Variant not found',true); return; }
  currentVariantId = variantId;
  currentVariantName = v.name;
  currentVariantTabType = v.tab_type || null;
  _blankProtectPrompted = false; // reset so warning fires again if this is a blank
  showLoad('Opening '+v.name+'...');
  try {
    if (!v.pdf_storage_path) { hideLoad(); toast('No PDF for this variant',true); return; }
    toast('Loading: ' + v.pdf_storage_path.split('/').pop(), false);
    console.log('[openVariant] name:', v.name, 'tab_type:', v.tab_type, 'path:', v.pdf_storage_path);
    const {data:pdfBlob,error} = await sb.storage.from('plan-pdfs').download(v.pdf_storage_path);
    console.log('[openVariant] blob size:', pdfBlob?.size, 'error:', error?.message);
    if (error) throw error;

    // Set up annotations
    strokes=[]; icons=[];
    if (v.ewm_data) {
      strokes = v.ewm_data.strokes||[];
      for (const pi of (v.ewm_data.icons||[])) {
        const ic=ICONS.find(i=>i.id===pi.iconId); if(!ic) continue;
        await new Promise(res=>{const img=new Image();img.onload=()=>{icons.push({...pi,img});res();};img.onerror=res;img.src=ic.f;});
      }
    }

    // Set up editor UI fully before loading PDF
    document.getElementById('dropzone').classList.add('gone');
    document.getElementById('cwrap').style.overflow = 'auto';
    document.getElementById('save-btns').style.display = 'flex';
    document.getElementById('canvas-titlebar').style.display = 'flex';
    document.getElementById('plan-tabs').style.display = 'none';
    document.getElementById('ct-close-btn').style.display = 'flex';
    setProjectUI(CP?.name||v.name);
    document.getElementById('ct-name').textContent = v.name;
    // Update iPhone canvas title
    const _iphoneFname = document.getElementById('iphone-canvas-fname');
    if (_iphoneFname) {
      const _cust = CP?.client || CP?.markup_customers?.name || CP?.name || '';
      _iphoneFname.textContent = _cust ? _cust + ' · ' + v.name : v.name;
    }

    // Load and render PDF — force clean load, never reuse cached pdfDoc
    pdfDoc = null;
    _renderToken++; // cancel any in-flight renders
    const objUrl = URL.createObjectURL(pdfBlob);
    pdfDoc = await pdfjsLib.getDocument(objUrl).promise;
    URL.revokeObjectURL(objUrl);
    _natPageWidth = 0;
    // Calculate fit scale fresh for this PDF
    const _pg1 = await pdfDoc.getPage(1);
    _natPageWidth = _pg1.getViewport({scale:1}).width;
    const _wrap = document.getElementById('cwrap');
    pdfScale = Math.floor((_wrap.clientWidth - 42) / _natPageWidth * 100) / 100;
    renderScale = 0; // force renderPages to do a full re-render regardless of previous state
    await renderPages();
    _wrap.scrollLeft = 0; _wrap.scrollTop = 0;
    // Force canvas visible and redraw icons after PDF renders
    const _ccon = document.getElementById('ccon');
    if (_ccon) { _ccon.style.transform = ''; _ccon.style.width = ''; _ccon.style.height = ''; _ccon.style.display = 'block'; }
    redraw();
    hideLoad();
    toast('✅ Opened: '+v.name);
  } catch(e) { hideLoad(); toast('❌ '+e.message,true); console.error(e); }
}


async function showSaveMenu() {
  if (!CP?.id) { toast('Open a cloud project first',true); return; }
  const curName = currentVariantName || document.getElementById('ct-name')?.textContent || 'this file';
  const onBlank = isBlankVariant();
  const choice = await new Promise(resolve => {
    const m = document.createElement('div');
    m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99999;display:flex;align-items:center;justify-content:center;';
    const overwriteBtn = onBlank ? '' : `<button id="_sm1" style="padding:11px;background:var(--acc);border:none;border-radius:8px;color:#fff;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;cursor:pointer;">💾 Save — overwrite ${JSON.stringify(curName)}</button>`;
    const blankNote = onBlank ? `<div style="font-size:11px;color:var(--txt3);background:var(--surf2);border-radius:7px;padding:8px 11px;border:1px solid var(--bdr2);">🔒 <strong>${curName}</strong> is a protected blank print — it cannot be overwritten. Use Save As to create a new named version.</div>` : '';
    m.innerHTML = `<div style="background:var(--surf);border:1px solid var(--bdr2);border-radius:14px;padding:22px;max-width:320px;width:90%;display:flex;flex-direction:column;gap:9px;box-shadow:0 24px 80px rgba(0,0,0,.7);"><div style="font-size:14px;font-weight:700;color:var(--txt);">Save</div>${blankNote}${overwriteBtn}<button id="_sm2" style="padding:11px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:8px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;">📋 Save As — new name</button><button id="_sm3" style="padding:7px;background:transparent;border:none;color:var(--txt3);font-family:'DM Sans',sans-serif;font-size:11px;cursor:pointer;">Cancel</button></div>`;
    document.body.appendChild(m);
    const done = r => { m.remove(); resolve(r); };
    if (!onBlank) m.querySelector('#_sm1').onclick = () => done('save');
    m.querySelector('#_sm2').onclick = () => done('saveas');
    m.querySelector('#_sm3').onclick = () => done('cancel');
  });
  if (choice === 'save') await saveCurrentVariant();
  else if (choice === 'saveas') await saveAsVariant();
}

// Save As — always creates a NEW variant, preserving tab_type and PDF path
async function _saveAsWithName(name) {
  if (!CP?.id) { toast('Open a cloud project first',true); return; }
  showLoad('Saving...');
  try {
    const tabType = currentVariantTabType || activeTab || 'single';
    let pdfPath = CP.pdf_storage_path;
    if (currentVariantId) {
      const {data:cv} = await sb.from('markup_variants').select('pdf_storage_path').eq('id',currentVariantId).single();
      if (cv?.pdf_storage_path) pdfPath = cv.pdf_storage_path;
    }
    const ann = { strokes, icons: icons.map(pi=>({id:pi.id,iconId:pi.iconId,x:pi.x,y:pi.y,scale:pi.scale||36,label:pi.label||'',rotation:pi.rotation||0,opacity:pi.opacity||100,flipH:pi.flipH||false})) };
    const {data:nv} = await sb.from('markup_variants').insert({
      project_id:CP.id, tab_type:tabType, name:name.trim(),
      pdf_storage_path:pdfPath, ewm_data:ann,
      created_by:CU.id, updated_at:new Date().toISOString()
    }).select().single();
    await sb.from('markup_projects').update({ ewm_data: { strokes: [], icons: [] }, annotations: JSON.stringify({ strokes: [], icons: [] }) }).eq('id', CP.id);
    if (nv) {
      currentVariantId = nv.id;
      currentVariantName = name.trim();
      const ctName = document.getElementById('ct-name');
      if (ctName) ctName.textContent = name.trim();
      if (pdfDoc) await renderPages();
    }
    setSave('saved');
    toast('✅ Saved as "'+name.trim()+'"');
  } catch(e) { toast('❌ '+e.message,true); console.error(e); }
  hideLoad();
}

async function saveAsVariant() {
  if (!CP?.id) { toast('Open a cloud project first',true); return; }
  const name = prompt('Save as new version name (e.g. Audio/Video System, Networking System):', '');
  if (!name?.trim()) return;
  await _saveAsWithName(name.trim());
}

// Save — overwrites the currently open variant
async function saveCurrentVariant() {
  if (!CP?.id) return;
  // Never allow overwriting a blank variant
  if (isBlankVariant()) { await saveAsVariant(); return; }
  try {
    const ann = { strokes, icons: icons.map(pi=>({id:pi.id,iconId:pi.iconId,x:pi.x,y:pi.y,scale:pi.scale||36,label:pi.label||'',rotation:pi.rotation||0,opacity:pi.opacity||100,flipH:pi.flipH||false})) };
    if (currentVariantId) {
      // Overwrite existing variant — no prompt
      await sb.from('markup_variants').update({ewm_data:ann,updated_at:new Date().toISOString()}).eq('id',currentVariantId);
    } else {
      // No variant open yet — auto-create one named after the current file
      const name = currentVariantName || document.getElementById('ct-name')?.textContent || 'My Version';
      const tabType = activeTab || 'single';
      const {data:nv} = await sb.from('markup_variants').insert({project_id:CP.id,tab_type:tabType,name,pdf_storage_path:CP.pdf_storage_path,ewm_data:ann,created_by:CU.id,updated_at:new Date().toISOString()}).select().single();
      if (nv) { currentVariantId = nv.id; currentVariantName = name; }
    }
    setSave('saved');
    toast('Saved');
  } catch(e) { console.warn('saveCurrentVariant:',e.message); }
}



function showPDFPrompt(name) {
  const m = document.createElement('div');
  m.id = 'pdf-prompt'; m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:900;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
  m.innerHTML = `<div style="background:var(--surf);border:1px solid var(--bdr2);border-radius:14px;padding:28px;max-width:380px;width:90%;text-align:center;display:flex;flex-direction:column;gap:16px;">
    <div style="font-size:40px;">📄</div>
    <div style="font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:2px;">${name}</div>
    <p style="font-size:13px;color:var(--txt2);line-height:1.7;">Project loaded with saved annotations.<br>Upload the PDF plan to view them.</p>
    <label for="file-open-input" onclick="document.getElementById('pdf-prompt')?.remove()" style="display:block;padding:13px 20px;background:var(--acc);border-radius:9px;color:#fff;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">Open PDF Plan</label>
    <button onclick="document.getElementById('pdf-prompt')?.remove()" style="background:none;border:none;color:var(--txt3);font-size:12px;cursor:pointer;font-family:'DM Sans',sans-serif;">Skip for now</button>
  </div>`;
  document.body.appendChild(m);
}

async function archiveProj(e, id, archive) {
  e.stopPropagation();
  await sb.from('markup_projects').update({ archived: archive }).eq('id', id);
  loadProjList(document.getElementById('proj-search')?.value || '');
  toast(archive ? 'Archived' : 'Restored');
}
async function deleteProj(e, id) {
  e.stopPropagation();
  if (!confirm('Delete this project?')) return;
  await sb.from('markup_variants').delete().eq('project_id', id);
  const { error } = await sb.from('markup_projects').delete().eq('id', id);
  if (error) { alert('Delete failed: ' + error.message); return; }
  if (CP?.id === id) { CP = null; document.getElementById('pname').textContent = 'No project open'; }
  await loadProjList(document.getElementById('proj-search')?.value || '');
  toast('Deleted');
}

async function renameProj() {
  closeMenus();
  if (!CP) { toast('No project open'); return; }
  const n = prompt('Rename:', CP.name); if (!n) return;
  await sb.from('markup_projects').update({ name: n }).eq('id', CP.id);
  CP.name = n; currentFileName = n;
  document.getElementById('pname').textContent = n;
  document.getElementById('ct-name').textContent = n;
  toast('Renamed');
}

async function archiveCurrent() {
  closeMenus();
  if (!CP) { toast('No project open'); return; }
  await sb.from('markup_projects').update({ archived: true }).eq('id', CP.id);
  closeProject(); toast('Project archived');
}
async function deleteCurrent() {
  closeMenus();
  if (!CP) { toast('No project open'); return; }
  if (!confirm('Delete "' + CP.name + '"?')) return;
  await sb.from('markup_projects').delete().eq('id', CP.id);
  closeProject(); toast('Project deleted');
}

async function closeProject() {
  // Remove any stray PDF upload prompt first
  document.getElementById('pdf-prompt')?.remove();

  // If in tab mode with actual content, delegate to per-tab close
  if (activeTab && TABS[activeTab] && TABS[activeTab].pdfDoc) {
    await closeTab(activeTab);
    return;
  }

  const hasChanges = icons.length > 0 || strokes.length > 0;
  const onBlank = isBlankVariant();

  if (CP?.id && pdfDoc && hasChanges) {
    const choice = await _showCloseDialog(onBlank, currentVariantName);
    if (choice === 'cancel') return;
    if (choice === 'save') await saveCurrentVariant();
    else if (choice === 'saveas') await saveAsVariant();
    else if (choice === 'discard') {
      // Blank: restore to empty state. Non-blank: delete the variant entirely.
      if (onBlank && currentVariantId) {
        await sb.from('markup_variants').update({ ewm_data: { strokes: [], icons: [] }, updated_at: new Date().toISOString() }).eq('id', currentVariantId);
      } else if (!onBlank && currentVariantId) {
        await sb.from('markup_variants').delete().eq('id', currentVariantId);
      }
    }
    if (CP && _ewmDirty && !currentVariantId) await saveToCloud();
    stopPresence(); dbDel('session');
  } else if (CP || pdfDoc) {
    if (CP && _ewmDirty && !currentVariantId) await saveToCloud();
    stopPresence(); dbDel('session');
  }

  _doCloseReset();
}

function _showCloseDialog(onBlank, variantName) {
  return new Promise(resolve => {
    const m = document.createElement('div');
    m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:99999;display:flex;align-items:center;justify-content:center;';
    const discardLabel = onBlank
      ? '✕ Close without saving — blank print will be restored'
      : '🗑 Close and delete this version';
    const discardNote = onBlank
      ? `<div style="font-size:11px;color:var(--txt3);background:var(--surf2);border-radius:7px;padding:8px 11px;border:1px solid var(--bdr2);">The blank print <strong>${variantName}</strong> will be restored to its original empty state.</div>`
      : `<div style="font-size:11px;color:var(--txt3);background:var(--surf2);border-radius:7px;padding:8px 11px;border:1px solid var(--bdr2);">This version will be permanently removed from the project.</div>`;
    const saveBtn = onBlank ? '' : `<button id="_cd1" style="padding:11px;background:var(--acc);border:none;border-radius:8px;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;">💾 Save</button><button id="_cd2" style="padding:11px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:8px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;">📋 Save As</button>`;
    m.innerHTML = `<div style="background:var(--surf);border:1px solid var(--bdr2);border-radius:14px;padding:24px;max-width:340px;width:90%;display:flex;flex-direction:column;gap:10px;box-shadow:0 24px 80px rgba(0,0,0,.7);">
      <div style="font-size:15px;font-weight:700;color:var(--txt);">Close File</div>
      ${saveBtn}
      ${discardNote}
      <button id="_cd3" style="padding:11px;background:transparent;border:1px solid var(--red,#ef4444);border-radius:8px;color:var(--red,#ef4444);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;">${discardLabel}</button>
      <button id="_cd4" style="padding:8px;background:transparent;border:none;color:var(--txt3);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;">Cancel</button>
    </div>`;
    document.body.appendChild(m);
    const done = r => { m.remove(); resolve(r); };
    if (!onBlank) { m.querySelector('#_cd1').onclick = () => done('save'); m.querySelector('#_cd2').onclick = () => done('saveas'); }
    m.querySelector('#_cd3').onclick = () => done('discard');
    m.querySelector('#_cd4').onclick = () => done('cancel');
  });
}

function _doCloseReset() {
  CP = null; pdfDoc = null; strokes = []; icons = []; sel = null; currentFileName = null;
  _lastLegendRows = 0;
  _prevLegendOffset = 0;
  currentVariantId = null; currentVariantName = null; currentVariantTabType = null;
  activeTab = null;
  TABS.floor = { pdfDoc:null, pdfScale:1, pdfPages:[], strokes:[], icons:[], redoStack:[], pdfBlob:null, name:null, _dirty:false };
  TABS.elev  = { pdfDoc:null, pdfScale:1, pdfPages:[], strokes:[], icons:[], redoStack:[], pdfBlob:null, name:null, _dirty:false };
  document.getElementById('save-btns').style.display = 'none';
  const menuExport2 = document.getElementById('menu-export-pdf');
  const menuClose2 = document.getElementById('menu-close-project');
  const menuReplace2 = document.getElementById('menu-replace-pdf');
  const menuSaveAs2 = document.getElementById('menu-save-as');
  if (menuExport2) { menuExport2.style.opacity = '.4'; menuExport2.style.pointerEvents = 'none'; }
  if (menuClose2) { menuClose2.style.opacity = '.4'; menuClose2.style.pointerEvents = 'none'; }
  if (menuReplace2) { menuReplace2.style.opacity = '.4'; menuReplace2.style.pointerEvents = 'none'; }
  if (menuSaveAs2) { menuSaveAs2.style.opacity = '.4'; menuSaveAs2.style.pointerEvents = 'none'; }
  const _mapDis = document.getElementById('menu-add-pages'); if (_mapDis) { _mapDis.style.opacity='.4'; _mapDis.style.pointerEvents='none'; }
  document.getElementById('plan-tabs').style.display = 'none';
  document.getElementById('page-strip').style.display = 'none';
  _ewmDirty = false;
  _blankProtectPrompted = false;
  closeItb();
  const _sb = document.getElementById('sidebar');
  if (_sb) _sb.classList.add('hidden');
  const _tb = document.getElementById('toolbar');
  if (_tb) _tb.style.display = 'none';
  const _ipadTb = document.getElementById('ipad-toolbar');
  if (_ipadTb) _ipadTb.style.display = 'none';
  document.getElementById('ct-close-btn').style.display = 'none';
  document.getElementById('ccon').style.display = 'none';
  document.getElementById('cwrap').style.overflow = 'hidden';
  document.getElementById('cwrap').classList.remove('zoomed');
  if (!CP && !pdfDoc) document.getElementById('dropzone').classList.remove('gone');
  document.getElementById('pname').textContent = 'No project open';
  document.getElementById('canvas-titlebar').style.display = 'none';
  document.getElementById('presence-bar').style.display = 'none';
  if (annCtx) annCtx.clearRect(0, 0, annCv.width, annCv.height);
  loadJobDashboard();
  toast('File closed');
}
function closeModal(id) {
  document.getElementById(id).classList.add('gone');
  document.body.style.overflow = ''; // restore body scroll
}

// ═══════════════════════════════════════════════════════════
// SAVE
// ═══════════════════════════════════════════════════════════
async function saveEWM() { return doSave(); }

// Returns 'save', 'discard', or 'cancel'
function showUnsavedDialog(otherDirty) {
  return new Promise(resolve => {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
      <div style="background:var(--surf);border:1px solid var(--bdr);border-radius:12px;padding:24px;max-width:400px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,.4);">
        <div style="font-size:16px;font-weight:700;color:var(--txt);margin-bottom:8px;">Unsaved changes</div>
        <p style="font-size:13px;color:var(--txt2);line-height:1.6;margin-bottom:20px;">
          ${otherDirty ? '<strong>Both plans have unsaved changes.</strong> ' : ''}Save as <strong>.ewm</strong> to keep your icons and drawings fully editable.
        </p>
        <div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;">
          <button id="usd-cancel" style="padding:8px 16px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:6px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;">Cancel</button>
          <button id="usd-discard" style="padding:8px 16px;background:#7f1d1d;border:none;border-radius:6px;color:#fff;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;">Discard & Close</button>
          <button id="usd-save" style="padding:8px 16px;background:#6d28d9;border:none;border-radius:6px;color:#fff;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;cursor:pointer;">💾 Save .ewm</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    const cleanup = (result) => { document.body.removeChild(modal); resolve(result); };
    modal.querySelector('#usd-cancel').onclick  = () => cleanup('cancel');
    modal.querySelector('#usd-discard').onclick = () => cleanup('discard');
    modal.querySelector('#usd-save').onclick    = () => cleanup('save');
  });
}

async function doSave(suggestedName) {
  closeMenus();
  if (!pdfDoc) { toast('Open a PDF plan first'); return; }
  showLoad('Saving...');
  try {
    // Always save the active tab (or current pdfDoc if no tab system)
    saveTabState(); // flush active tab state first

    // Get the right pdfDoc, strokes, icons for what's currently showing
    const srcDoc    = pdfDoc;
    const srcStrokes = strokes;
    const srcIcons   = icons;
    const tabLabel  = activeTab === 'floor' ? 'Floor Plans' : activeTab === 'elev' ? 'Elevations' : null;

    const pdfBytes = await srcDoc.getData();
    const arr = new Uint8Array(pdfBytes);
    let b64 = '';
    for (let i = 0; i < arr.length; i += 8192) b64 += String.fromCharCode(...arr.subarray(i, i+8192));
    b64 = btoa(b64);

    // Serialize map boxes (strip non-serializable img refs)
    const mapBoxesSave = mapBoxes.map(b => b.isMarker
      ? { id:b.id, labelId:b.labelId, labelName:b.labelName, color:b.color, category:b.category, isMarker:true, cx:b.cx, cy:b.cy, page:b.page||1 }
      : { id:b.id, labelId:b.labelId, labelName:b.labelName, color:b.color, category:b.category, x1:b.x1, y1:b.y1, x2:b.x2, y2:b.y2, page:b.page||1 }
    );

    const pkg = {
      v: 1, savedAt: new Date().toISOString(),
      projectName: currentFileName || CP?.name || 'plan',
      tabLabel,
      pdfData: b64, pdfScale,
      strokes: srcStrokes,
      icons: srcIcons.map(pi => ({ id:pi.id, iconId:pi.iconId, x:pi.x, y:pi.y, scale:pi.scale, label:pi.label||'', rotation:pi.rotation||0, opacity:pi.opacity||100, flipH:pi.flipH||false })),
      mapBoxes: mapBoxesSave
    };
    const blob = new Blob([JSON.stringify(pkg)], { type: 'application/octet-stream' });
    const fname = (suggestedName || currentFileName || CP?.name || 'plan') + '.ewm';
    // Use File System Access API on Chrome/Edge for real Save dialog
    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({ suggestedName: fname, types: [{ description: 'EliteWorker Markup', accept: {'application/octet-stream': ['.ewm']} }] });
        const w = await handle.createWritable(); await w.write(blob); await w.close();
        currentFileName = handle.name.replace(/\.ewm$/i,'');
        _ewmDirty = false; TABS.floor._dirty = false; TABS.elev._dirty = false; setSave('saved'); toast('✅ Saved: ' + handle.name); hideLoad(); return;
      } catch(e) { if (e.name === 'AbortError') { hideLoad(); return; } }
    }
    // Fallback download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = fname;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    _ewmDirty = false; TABS.floor._dirty = false; TABS.elev._dirty = false; setSave('saved'); toast('✅ Saved as ' + fname);
    // Backup to Supabase
    if (CP) await saveToCloud();
  } catch(e) { toast('❌ Save failed: ' + e.message, true); console.error(e); }
  hideLoad();
}

async function restoreFromCloud(projectId) {
  try {
    const { data: proj } = await sb.from('markup_projects').select('annotations, ewm_data').eq('id', projectId).single();
    if (!proj) return;
    // Prefer ewm_data (newer format), fall back to annotations
    const src = proj.ewm_data || (proj.annotations ? JSON.parse(proj.annotations) : null);
    if (!src) return;
    strokes = src.strokes || [];
    const savedIcons = src.icons || [];
    icons = [];
    for (const pi of savedIcons) {
      const ic = ICONS.find(i => i.id === pi.iconId);
      if (!ic) continue;
      await new Promise(res => {
        const img = new Image();
        img.onload = () => { icons.push({ ...pi, img }); res(); };
        img.onerror = res;
        img.src = ic.f;
      });
    }
    if (src.mapBoxes && typeof mapBoxes !== 'undefined') {
      mapBoxes = src.mapBoxes;
      if (typeof renderMapOverlay === 'function') renderMapOverlay();
      if (typeof renderMapBoxList === 'function') renderMapBoxList();
    }
  } catch(e) { console.warn('restoreFromCloud:', e); }
}

async function saveToCloud() {
  if (!CP) return;
  try {
    const ann = { strokes, icons: icons.map(pi => ({ id:pi.id, iconId:pi.iconId, x:pi.x, y:pi.y, scale:pi.scale, label:pi.label||'', rotation:pi.rotation||0, opacity:pi.opacity||100, flipH:pi.flipH||false })) };
    const ewmData = {
      v: 2, savedAt: new Date().toISOString(), pdfScale: renderScale,
      strokes,
      icons: icons.map(pi => ({ id:pi.id, iconId:pi.iconId, x:pi.x, y:pi.y, scale:(pi.scale||36), label:pi.label||'', rotation:pi.rotation||0, opacity:pi.opacity||100, flipH:pi.flipH||false })),
      mapBoxes: (typeof mapBoxes !== 'undefined' ? mapBoxes : []).map(b => b.isMarker
        ? { id:b.id, labelId:b.labelId, labelName:b.labelName, color:b.color, category:b.category, isMarker:true, cx:b.cx, cy:b.cy, page:b.page||1 }
        : { id:b.id, labelId:b.labelId, labelName:b.labelName, color:b.color, category:b.category, x1:b.x1, y1:b.y1, x2:b.x2, y2:b.y2, page:b.page||1 })
    };
    await sb.from('markup_projects').update({ annotations: JSON.stringify(ann), ewm_data: ewmData, updated_at: new Date().toISOString() }).eq('id', CP.id);
    const ind = document.getElementById('autosave-indicator');
    if (ind) { ind.textContent = '✓ Saved ' + new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); ind.style.color = '#22c55e'; setTimeout(() => { ind.style.color = 'var(--txt3)'; }, 3000); }
  } catch(e) { console.warn('saveToCloud:', e); }
}

function markDirty() {
  _ewmDirty = true;
  if (activeTab && TABS[activeTab]) TABS[activeTab]._dirty = true;
  updateDirtyDots();
  const ind = document.getElementById('autosave-indicator');
  if (ind) { ind.textContent = '● Saving...'; ind.style.color = 'var(--txt3)'; }
  // Show one-time warning when a blank variant is first modified — inline Save As, no second modal
  if (isBlankVariant() && hasContent() && !_blankProtectPrompted) {
    _blankProtectPrompted = true;
    setTimeout(() => {
      const m = document.createElement('div');
      m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:99999;display:flex;align-items:center;justify-content:center;';
      m.innerHTML = `<div style="background:var(--surf);border:1px solid var(--bdr2);border-radius:14px;padding:24px;max-width:340px;width:90%;display:flex;flex-direction:column;gap:12px;box-shadow:0 24px 80px rgba(0,0,0,.7);">
        <div style="font-size:22px;">📋</div>
        <div style="font-size:14px;font-weight:700;color:var(--txt);">Looks like you're marking up a plan</div>
        <div style="font-size:13px;color:var(--txt2);line-height:1.5;">The blank print <strong>${currentVariantName}</strong> cannot be overwritten. Please save this as a new version name so the blank is kept clean.</div>
        <input id="_bpp-name" type="text" placeholder="e.g. Audio/Video System, Security..." style="padding:10px 12px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:8px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;box-sizing:border-box;">
        <div id="_bpp-err" style="display:none;font-size:12px;color:#ef4444;"></div>
        <button id="_bpp-save" style="padding:11px;background:var(--acc);border:none;border-radius:8px;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;">Save as New Version</button>
        <button id="_bpp-later" style="padding:6px;background:transparent;border:none;color:var(--txt3);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;">I'll name it later</button>
      </div>`;
      document.body.appendChild(m);
      const nameInput = m.querySelector('#_bpp-name');
      const errEl = m.querySelector('#_bpp-err');
      nameInput.focus();
      nameInput.onkeydown = (e) => { if (e.key === 'Enter') m.querySelector('#_bpp-save').click(); };
      m.querySelector('#_bpp-save').onclick = async () => {
        const name = nameInput.value.trim();
        if (!name) { errEl.textContent = 'Please enter a version name.'; errEl.style.display = 'block'; nameInput.focus(); return; }
        m.remove();
        await _saveAsWithName(name);
      };
      m.querySelector('#_bpp-later').onclick = () => m.remove();
    }, 400);
  }
}

function autoSave() {
  markDirty();
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(async () => {
    saveSession();
    if (!CP) return;
    // Only write to base project if no variant is active (variants store their own annotations)
    if (!currentVariantId) await saveToCloud();
    // Auto-update current variant — NEVER overwrite a blank variant
    if (currentVariantId && !isBlankVariant()) {
      try {
        const ann = { strokes: strokes.map(s=>({...s})), icons: icons.map(pi=>({id:pi.id,iconId:pi.iconId,x:pi.x,y:pi.y,scale:pi.scale||36,label:pi.label||'',rotation:pi.rotation||0,opacity:pi.opacity||100,flipH:pi.flipH||false})) };
        await sb.from('markup_variants').update({ewm_data:ann,updated_at:new Date().toISOString()}).eq('id',currentVariantId);
      } catch(e) { console.warn('autoSave variant:', e.message); }
    }
    // Auto-create/update "with Icons" variant when icons exist
    if (icons.length > 0) {
      const tabType = activeTab || 'single';
      const withName = tabType==='floor' ? 'Layout with Icons' : tabType==='elev' ? 'Elevation with Icons' : 'Plan with Icons';
      const blankName = tabType==='floor' ? 'Blank Layout' : tabType==='elev' ? 'Blank Elevation' : null;
      try {
        const ann = { strokes: strokes.map(s=>({...s})), icons: icons.map(pi=>({id:pi.id,iconId:pi.iconId,x:pi.x,y:pi.y,scale:pi.scale||36,label:pi.label||'',rotation:pi.rotation||0,opacity:pi.opacity||100,flipH:pi.flipH||false})) };
        const {data:blankV} = blankName ? await sb.from('markup_variants').select('pdf_storage_path').eq('project_id',CP.id).eq('name',blankName).maybeSingle() : {data:null};
        const pdfPath = blankV?.pdf_storage_path || CP?.pdf_storage_path;
        const {data:existing} = await sb.from('markup_variants').select('id').eq('project_id',CP.id).eq('name',withName).maybeSingle();
        if (existing) {
          await sb.from('markup_variants').update({ewm_data:ann,updated_at:new Date().toISOString()}).eq('id',existing.id);
        } else {
          const {data:nv} = await sb.from('markup_variants').insert({project_id:CP.id,tab_type:tabType,name:withName,pdf_storage_path:pdfPath,ewm_data:ann,created_by:CU.id,updated_at:new Date().toISOString()}).select().single();
          if (nv && !currentVariantId) { currentVariantId = nv.id; currentVariantName = withName; }
        }
      } catch(e) { console.warn('autoSave withIcons:', e.message); }
    }
    setSave('saved');
  }, 2000);
}

function setSave(s) {
  const el = document.getElementById('savest'), tx = document.getElementById('save-txt');
  el.className = ''; tx.textContent = '';
  if (s === 'saving') { el.classList.add('saving'); tx.textContent = 'Saving...'; }
  else if (s === 'saved') { el.classList.add('saved'); tx.textContent = 'Saved'; setTimeout(() => { el.className=''; tx.textContent=''; }, 3000); }
}

// ═══════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════
function showExport() { closeMenus(); if (!pdfDoc) { toast('Open a PDF first'); return; } document.getElementById('export-modal').classList.remove('gone'); }


// ── pdf-lib vector export helper ──────────────────────────────────────────────
// Convert a canvas dataURL to Uint8Array without a fetch() round-trip
function _dataUrlToBytes(dataUrl) {
  const b64 = dataUrl.split(',')[1];
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

// If the source PDF has pages with /Rotate flags, PDF.js handles rotation on screen
// but pdf-lib ignores it when embedding annotations. Fix: for any rotated page,
// use PDF.js to render it visually (rotation already applied) then replace the
// pdf-lib page content with that flat raster — same as what Smart Merge produces.
async function _flattenRotatedPages(pdfLibDoc, pdfJsDoc) {
  const pages = pdfLibDoc.getPages();
  let anyRotated = false;
  for (const page of pages) {
    const rot = page.getRotation ? page.getRotation().angle : 0;
    if (rot !== 0) { anyRotated = true; break; }
  }
  if (!anyRotated) return; // nothing to do — fast path for normal PDFs

  // Re-render via PDF.js (which applies /Rotate automatically) then replace
  // each rotated pdf-lib page with a flat JPEG — same as Smart Merge output.
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const rot = page.getRotation ? page.getRotation().angle : 0;
    if (rot === 0) continue;

    // Render this page via PDF.js — it applies /Rotate automatically
    const pdfJsPage = await pdfJsDoc.getPage(i + 1);
    const vp = pdfJsPage.getViewport({ scale: 2.0 }); // 2x for quality
    const cv = document.createElement('canvas');
    cv.width = vp.width; cv.height = vp.height;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cv.width, cv.height);
    await pdfJsPage.render({ canvasContext: ctx, viewport: vp }).promise;

    // Embed this flat raster as the page content in pdf-lib
    const jpegUrl = cv.toDataURL('image/jpeg', 0.95);
    const jpegBuf = await fetch(jpegUrl).then(r => r.arrayBuffer());
    const img = await pdfLibDoc.embedJpg(jpegBuf);
    cv.width = 1; cv.height = 1;

    // Replace the rotated page: zero rotation, set MediaBox to visual dims, draw image
    page.setRotation(window.PDFLib.degrees(0));
    page.setMediaBox(0, 0, vp.width / 2, vp.height / 2); // pts = px / 2 (rendered at 2x)
    try { page.setCropBox(0, 0, vp.width / 2, vp.height / 2); } catch(e) {}
    // Clear existing content by drawing the flat JPEG over the full page
    page.drawImage(img, { x: 0, y: 0, width: vp.width / 2, height: vp.height / 2 });
  }
}

async function _renderAnnotLayer(pdfLibDoc, piIdx, annIcons, annStrokes, annPdfPages, annRenderScale, annCvRef) {
  const pages = pdfLibDoc.getPages();
  const pdfPage = pages[piIdx];
  const { width: pgW, height: pgH } = pdfPage.getSize();
  // 2× gives crisp print quality; 4× created canvases too large for browser memory on multi-page plans
  const EXPORT_SCALE = 2;
  const rs = annRenderScale || 1;

  const pageInfo = annPdfPages[piIdx];
  const pageTopCanvas = pageInfo ? pageInfo.y : 196; // canvas px of this page's top
  const pageOffsetPts = (pageTopCanvas - 196) / rs;
  const pageHeightPts = pageInfo ? pageInfo.h / rs : pgH;

  // Filter to only icons/strokes that actually land on this page — skip if nothing to draw
  const sf = EXPORT_SCALE;
  const ex = x => x * sf;
  const ey = y => (y - pageOffsetPts) * sf;

  const pageIcons   = annIcons.filter(ic => {
    const cy = ic.y - pageOffsetPts;
    return cy > -100 && cy < pageHeightPts + 100;
  });
  const pageStrokes = annStrokes.filter(s => {
    const refY = s.y ?? s.cy ?? s.from?.y ?? (s.path?.[0]?.y);
    if (refY == null) return true;
    const cy = refY - pageOffsetPts;
    return cy > -200 && cy < pageHeightPts + 200;
  });

  const hasAnnots = pageIcons.length > 0 || pageStrokes.length > 0;
  const hasLegend = piIdx === 0 && annIcons.length > 0;

  // Nothing to do for this page — skip all canvas work
  if (!hasAnnots && !hasLegend) return;

  const annCanvas = document.createElement('canvas');
  annCanvas.width  = Math.round(pgW * sf);
  annCanvas.height = Math.round(pgH * sf);
  const ac = annCanvas.getContext('2d');
  ac.clearRect(0, 0, annCanvas.width, annCanvas.height);

  // Draw strokes
  pageStrokes.forEach(s => {
    ac.save();
    ac.strokeStyle = s.color || '#1d6fdb';
    ac.lineWidth = (s.width || 2) * sf;
    if (s.dash === 'dashed') ac.setLineDash([8*sf, 5*sf]);
    else if (s.dash === 'dotted') ac.setLineDash([2*sf, 4*sf]);
    else ac.setLineDash([]);
    ac.lineCap = 'round'; ac.lineJoin = 'round';

    if (s.type === 'pen' && Array.isArray(s.path) && s.path.length > 1) {
      ac.beginPath();
      s.path.forEach((p2, i) => i ? ac.lineTo(ex(p2.x), ey(p2.y)) : ac.moveTo(ex(p2.x), ey(p2.y)));
      ac.stroke();
    } else if (s.type === 'line' && s.from && s.to) {
      ac.beginPath(); ac.moveTo(ex(s.from.x), ey(s.from.y)); ac.lineTo(ex(s.to.x), ey(s.to.y)); ac.stroke();
    } else if (s.type === 'rect' && s.x != null) {
      if (s.fillOn) { ac.fillStyle = s.fill||'#1d6fdb'; ac.fillRect(ex(s.x), ey(s.y), s.w*sf, s.h*sf); }
      ac.strokeRect(ex(s.x), ey(s.y), s.w*sf, s.h*sf);
    } else if (s.type === 'circle' && s.cx != null) {
      ac.beginPath(); ac.ellipse(ex(s.cx), ey(s.cy), s.rx*sf, s.ry*sf, 0, 0, Math.PI*2);
      if (s.fillOn) { ac.fillStyle = s.fill||'#1d6fdb'; ac.fill(); } ac.stroke();
    } else if (s.type === 'arrow' && s.from && s.to) {
      ac.beginPath(); ac.moveTo(ex(s.from.x), ey(s.from.y)); ac.lineTo(ex(s.to.x), ey(s.to.y)); ac.stroke();
    } else if (s.type === 'text' && s.text) {
      ac.fillStyle = s.color || '#1d6fdb';
      const _eSz = (s.size||14)*sf;
      ac.font = (s.italic?'italic ':'')+(s.bold?'bold ':'')+_eSz+'px DM Sans,sans-serif';
      ac.textBaseline = 'top';
      const _eLines = s.text.split('\n');
      const _eLH = _eSz * 1.45;
      _eLines.forEach((ln, li) => ac.fillText(ln, ex(s.x||0), ey(s.y||0) + li * _eLH));
    } else if (s.type === 'whitebox' && s.x != null) {
      ac.setLineDash([]);
      ac.fillStyle = '#ffffff';
      ac.fillRect(ex(s.x), ey(s.y), s.w*sf, s.h*sf);
    } else if (s.type === 'coverpath' && Array.isArray(s.path) && s.path.length) {
      ac.setLineDash([]);
      ac.fillStyle = '#ffffff'; ac.strokeStyle = '#ffffff';
      ac.lineCap = 'round'; ac.lineJoin = 'round';
      ac.lineWidth = (s.brush || 28) * sf;
      if (s.path.length === 1) {
        ac.beginPath();
        ac.arc(ex(s.path[0].x), ey(s.path[0].y), ((s.brush||28)/2)*sf, 0, Math.PI*2);
        ac.fill();
      } else {
        ac.beginPath();
        s.path.forEach((p2, i) => i ? ac.lineTo(ex(p2.x), ey(p2.y)) : ac.moveTo(ex(p2.x), ey(p2.y)));
        ac.stroke();
      }
    }
    ac.restore();
  });

  // Draw icons
  pageIcons.forEach(ic => {
    if (!ic.img) return;
    const sz = (ic.scale || 36) * sf;
    const nat = ic.img.naturalWidth && ic.img.naturalHeight ? ic.img.naturalWidth/ic.img.naturalHeight : 1;
    const dw = sz * nat, dh = sz;
    const cx = ex(ic.x||0), cy = ey(ic.y||0);
    ac.save();
    ac.globalAlpha = (ic.opacity||100)/100;
    ac.translate(cx, cy);
    ac.rotate(((ic.rotation||0)*Math.PI)/180);
    if (ic.flipH) ac.scale(-1, 1);
    ac.drawImage(ic.img, -dw/2, -dh/2, dw, dh);
    ac.restore();
  });

  // Embed annotation layer
  if (hasAnnots) {
    // Capture MediaBox early — CAD/arch PDFs often have non-zero origins (e.g. mb.y=-1584).
    // Annotations must be placed at mb.x,mb.y not 0,0 or they shift on such plans.
    const _mb0 = pdfPage.getMediaBox();
    const pngImage = await pdfLibDoc.embedPng(_dataUrlToBytes(annCanvas.toDataURL('image/png')));
    pdfPage.drawImage(pngImage, { x: _mb0.x, y: _mb0.y, width: pgW, height: pgH });
  }
  annCanvas.width = 1; annCanvas.height = 1;

  // Legend — page 0 only, in a white strip ABOVE the plan.
  // pdf-lib Y=0 is bottom-left. setMediaBox extending height to pgH+STRIP adds
  // white space at the visual top of the page (high Y values = visual top).
  // Draw legend at y=pgH — it lands in that new white strip at the top.
  // The existing plan content at y=0..pgH is untouched.
  // NO translateContent needed — tested and confirmed it breaks positioning.
  if (hasLegend) {
    const mb = pdfPage.getMediaBox();

    // Canvas pixel width = full page width at 2x for crispness
    const LEG_PX_W = Math.round(mb.width * 2);

    // Compute the scale that will be used when drawing, so we can measure the
    // exact content height and size the strip to fit without clipping.
    const exportLegScale = (LEG_PX_W / 900) / 2;
    const _HEADER_H = Math.round(42 * exportLegScale);
    const _ICON_H   = Math.round(22 * exportLegScale);
    const _cellH    = _ICON_H + Math.round(10 * exportLegScale);
    const _padY     = Math.round(14 * exportLegScale);
    const _PAD      = Math.round(24 * exportLegScale);
    const _padX     = Math.round(18 * exportLegScale);
    const _cellW    = Math.round(200 * exportLegScale);
    const _CARD_W   = Math.round(280 * exportLegScale);
    const _GAP      = Math.round(20 * exportLegScale);
    const _CARD_H   = Math.round(130 * exportLegScale);
    const _maxLegW  = LEG_PX_W - _CARD_W - _GAP - _PAD - _PAD;
    const _used     = [...new Set(annIcons.map(p => p.iconId))].length;
    const _cols     = Math.max(1, Math.min(Math.floor((_maxLegW - _padX * 2) / _cellW), _used));
    const _rows     = Math.ceil(_used / _cols);
    const _legBoxH  = _HEADER_H + _padY * 2 + _rows * _cellH;
    // Canvas must be tall enough for both the legend box and the contact card
    const LEG_PX_H  = Math.max(_legBoxH, _CARD_H) + _PAD * 2;
    const legendStripPts = Math.ceil(LEG_PX_H / 2);

    pdfPage.setMediaBox(mb.x, mb.y, mb.width, mb.height + legendStripPts);
    try {
      const cb = pdfPage.getCropBox();
      if (cb) pdfPage.setCropBox(cb.x, cb.y, cb.width, cb.height + legendStripPts);
    } catch(e2) {}

    const legCv = document.createElement('canvas');
    legCv.width  = LEG_PX_W;
    legCv.height = LEG_PX_H;
    const legCtx = legCv.getContext('2d');
    legCtx.fillStyle = '#ffffff';
    legCtx.fillRect(0, 0, LEG_PX_W, LEG_PX_H);
    if (window._eliteLogoReady) await window._eliteLogoReady;
    // forceScale = exportLegScale so content fills the full page-width canvas
    _drawLegendOnCanvas(legCtx, LEG_PX_W, annIcons, ICONS, exportLegScale);

    const legImg = await pdfLibDoc.embedPng(_dataUrlToBytes(legCv.toDataURL('image/png')));
    const legY = mb.y + mb.height;
    pdfPage.drawImage(legImg, { x: mb.x, y: legY, width: mb.width, height: legendStripPts });
    legCv.width = 1; legCv.height = 1;
  }
}
// ── end helper ────────────────────────────────────────────────────────────────

async function doExport(format) {
  // NOTE: Do NOT call closeModal here — it can break the browser user-gesture
  // context required for showSaveFilePicker. Close it after the picker opens.
  // Deselect before render
  sel = null; closeItb(); redraw();
  showLoad('Exporting as ' + format.toUpperCase() + '...');
  closeModal('export-modal');
  try {
    // Icons are stored at pdfScale coords; canvas renders at renderScale
    // Scale factor to convert icon coords → export canvas coords
    const exportRatio = renderScale / pdfScale;
    // Composite canvas at renderScale dimensions
    const mg = document.createElement('canvas'); mg.width = pdfCv.width; mg.height = pdfCv.height;
    const mc = mg.getContext('2d'); mc.drawImage(pdfCv, 0, 0); mc.drawImage(annCv, 0, 0);
    // All icon labels — apply exportRatio to icon positions
    icons.forEach(pi => {
      if (!pi.label) return; const sz = (pi.scale || 36) * exportRatio;
      const ix = pi.x * exportRatio, iy = pi.y * exportRatio;
      mc.save(); mc.globalAlpha = (pi.opacity||100)/100; mc.translate(ix, iy); mc.rotate(((pi.rotation||0)*Math.PI)/180);
      mc.font = 'bold 11px sans-serif'; mc.textAlign = 'center';
      const tw = mc.measureText(pi.label).width;
      mc.fillStyle = 'rgba(0,0,0,.72)'; mc.fillRect(-tw/2-3, sz/2+2, tw+6, 15);
      mc.fillStyle = '#fff'; mc.fillText(pi.label, 0, sz/2+13); mc.restore();
    });
    // Legend
    if (legendOn) {
      const used = [...new Set(icons.map(p => p.iconId))];
      const lx=20, lh=62+(used.length*22), ly=pdfCv.height-lh-20, lw=210;
      mc.fillStyle='rgba(10,15,28,.95)'; mc.fillRect(lx,ly,lw,lh);
      mc.fillStyle='#e2e8f4'; mc.font='bold 14px sans-serif'; mc.fillText('LEGEND',lx+12,ly+22);
      used.forEach((id,i)=>{
        const ic=ICONS.find(x=>x.id===id); if(!ic) return;
        const pi=icons.find(p=>p.iconId===id);
        if(pi?.img){try{mc.drawImage(pi.img,lx+8,ly+36+(i*22)-13,16,16);}catch(e){}}
        mc.fillStyle='#7a8fac'; mc.font='11px sans-serif'; mc.fillText(ic.name,lx+30,ly+36+(i*22));
      });
      mc.fillStyle='#1d6fdb'; mc.fillRect(lx,ly+lh-26,lw,26);
      mc.fillStyle='#fff'; mc.font='bold 11px sans-serif'; mc.fillText('ELITE SMART HOME',lx+12,ly+lh-10);
    }
    const _activeTabVariantName = activeTab ? TABS[activeTab]?._variantName : null;
    const base = _activeTabVariantName || currentVariantName || CP?.job_type || 'plan';
    if (format === 'pdf') {
      // ── Vector-quality export via pdf-lib ──────────────────────────────────
      // NOTE: If overwriting an existing file, close it in Acrobat first.
      // Windows cannot detect OS file locks from the browser — the write will
      // silently appear to succeed but the file won't update if open elsewhere.
      toast('\u2139\ufe0f Close the file in Acrobat before saving to ensure it overwrites correctly');
      const _pdfName = base+'-markup.pdf';
      let _fileHandle = null;
      if (window.showSaveFilePicker) {
        try {
          _fileHandle = await window.showSaveFilePicker({ suggestedName: _pdfName, types:[{description:'PDF',accept:{'application/pdf':['.pdf']}}] });
        } catch(e) {
          if (e.name === 'AbortError') { hideLoad(); return; }
        }
      }
      const { PDFDocument } = window.PDFLib;
      if (!PDFDocument) { toast('\u274c PDF library not loaded', true); hideLoad(); return; }
      const srcBytes = await pdfDoc.getData();
      const pdfLibDoc = await PDFDocument.load(srcBytes, { ignoreEncryption: true, throwOnInvalidObject: false });
      await _flattenRotatedPages(pdfLibDoc, pdfDoc);
      const numPages2 = pdfLibDoc.getPageCount();
      for (let pi2 = 0; pi2 < numPages2; pi2++) {
        await _renderAnnotLayer(pdfLibDoc, pi2, icons, strokes, pdfPages, renderScale, annCv);
      }
      const exportBytes = await pdfLibDoc.save({ useObjectStreams: false });
      const pblob = new Blob([exportBytes], {type:'application/pdf'});
      if (_fileHandle) {
        try {
          const w = await _fileHandle.createWritable(); await w.write(pblob); await w.close();
          toast('\u2705 Exported as PDF'); hideLoad(); return;
        } catch(e) { toast('\u274c Save failed: ' + e.message, true); hideLoad(); return; }
      }
      // Fallback: auto-download
      const a2 = document.createElement('a'); a2.href = URL.createObjectURL(pblob);
      a2.download = _pdfName; document.body.appendChild(a2); a2.click(); document.body.removeChild(a2);
    } else {
      const mime = format==='png'?'image/png':'image/jpeg', ext=format==='png'?'.png':'.jpg', q=format==='png'?1:.95;
      const _imgName = base+'-markup'+ext;
      let _imgHandle = window._exportHandles?.[_imgName] || null;
      if (!_imgHandle && window.showSaveFilePicker) {
        try {
          _imgHandle = await window.showSaveFilePicker({ suggestedName: _imgName, types:[{description:format.toUpperCase(),accept:{[mime]:[ext]}}] });
          window._exportHandles = window._exportHandles || {};
          window._exportHandles[_imgName] = _imgHandle;
        } catch(e) { if (e.name==='AbortError') { hideLoad(); return; } }
      }
      if (_imgHandle) {
        try {
          const iblob = await new Promise(res => mg.toBlob(res, mime, q));
          const w = await _imgHandle.createWritable(); await w.write(iblob); await w.close();
          toast('✅ Exported as ' + format.toUpperCase()); hideLoad(); return;
        } catch(e) {
          if (window._exportHandles) delete window._exportHandles[_imgName];
        }
      }
      const a=document.createElement('a'); a.href=mg.toDataURL(mime,q); a.download=_imgName;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
    toast('✅ Exported as ' + format.toUpperCase());
  } catch(e) { toast('❌ Export failed: ' + e.message, true); console.error(e); }
  hideLoad();
}

// ═══════════════════════════════════════════════════════════
// PAGE STRIP
// ═══════════════════════════════════════════════════════════
let currentPageIdx = 0;
let selectedPages = new Set();
let singlePageMode = false; // when true, shows one page at a time
let singlePagePdfDoc = null; // original full pdf doc stored
let singlePageBytes = null;

function togglePageStrip() {
  const strip = document.getElementById('page-strip');
  if (!strip) return;
  const hidden = strip.style.display === 'none';
  strip.style.display = hidden ? 'block' : 'none';
  const btn = document.getElementById('pc-strip-btn');
  if (btn) btn.classList.toggle('on', hidden);
  // page strip is horizontal — doesn't affect canvas width
}

async function buildPageStrip() {
  try {
    if (!pdfDoc) { console.warn('buildPageStrip: pdfDoc not set'); return; }
    selectedPages.clear();

    const con = document.getElementById('page-thumbs');
    if (!con) { console.warn('buildPageStrip: page-thumbs not found'); return; }

    console.log('buildPageStrip: building', pdfDoc.numPages, 'pages');

    // Render page 1 to determine thumbnail scale
    const pg0 = await pdfDoc.getPage(1);
    const vp0nat = pg0.getViewport({ scale: 1 });
    const thumbScale = Math.min(0.15, 120 / vp0nat.width);
    const vp0 = pg0.getViewport({ scale: thumbScale });
    const thumbW = Math.round(vp0.width);
    const thumbH = Math.round(vp0.height);

    // Resize static merge button to match thumbnail dimensions
    const mergeBtn = document.getElementById('ai-merge-btn');
    if (mergeBtn) { mergeBtn.style.width = thumbW + 'px'; mergeBtn.style.height = ''; }

    // Remove old thumbnails — keep merge btn (first child) only
    while (con.children.length > 1) con.removeChild(con.lastChild);

    // Build thumbnails for every page
    for (let i = 0; i < pdfDoc.numPages; i++) {
      const pg = i === 0 ? pg0 : await pdfDoc.getPage(i + 1);
      const vp = pg.getViewport({ scale: thumbScale });
      const cv = document.createElement('canvas');
      cv.width = vp.width; cv.height = vp.height;
      await pg.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;

      const wrap = document.createElement('div');
      wrap.className = 'pt' + (i === currentPageIdx ? ' active' : '');
      wrap.dataset.idx = i;
      wrap.style.position = 'relative';

      const check = document.createElement('div');
      check.className = 'pt-check'; check.textContent = '✓';

      const frame = document.createElement('div');
      frame.className = 'pt-frame';
      frame.appendChild(cv);

      const lbl = document.createElement('div');
      lbl.className = 'pt-lbl';
      lbl.textContent = 'Pg ' + (i + 1);

      // X delete button — only show if more than 1 page
      const del = document.createElement('button');
      del.type = 'button'; del.textContent = '✕';
      del.title = 'Remove this page';
      del.style.cssText = 'position:absolute;top:2px;right:2px;width:16px;height:16px;background:rgba(220,38,38,.85);border:none;border-radius:3px;color:#fff;font-size:9px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;line-height:1;padding:0;';
      if (pdfDoc.numPages <= 1) del.style.display = 'none'; // can't delete the only page
      (idx => { del.onclick = async e => { e.stopPropagation(); if (!confirm('Remove page ' + (idx+1) + '?')) return; await deletePage(idx); }; })(i);

      wrap.appendChild(check);
      wrap.appendChild(frame);
      wrap.appendChild(lbl);
      wrap.appendChild(del);

      frame.addEventListener('click', e => {
        if (e.shiftKey || e.ctrlKey || e.metaKey) {
          e.stopPropagation();
          togglePageSelect(i, wrap);
        } else {
          jumpToPage(i);
        }
      });

      con.appendChild(wrap);
    }
    updateMergeBtn();
    console.log('buildPageStrip: done');
  } catch(err) {
    console.error('buildPageStrip error:', err);
  }
}

// Delete a page from the current PDF by re-building without it
async function deletePage(pageIdx) {
  if (!pdfDoc || pdfDoc.numPages <= 1) { toast('Cannot delete — only one page remaining'); return; }
  showLoad('Removing page ' + (pageIdx+1) + '...');
  try {
    const { PDFDocument } = window.PDFLib || {};
    if (!PDFDocument) { toast('PDF editing library not loaded'); hideLoad(); return; }

    const srcBytes = await pdfDoc.getData();
    const srcDoc = await PDFDocument.load(srcBytes, { ignoreEncryption: true, throwOnInvalidObject: false });
    srcDoc.removePage(pageIdx);
    const newBytes = await srcDoc.save();

    // Reload into app
    const blob = new Blob([newBytes], { type:'application/pdf' });
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    pdfDoc = await pdfjsLib.getDocument(URL.createObjectURL(blob)).promise;
    if (currentPageIdx >= pdfDoc.numPages) currentPageIdx = pdfDoc.numPages - 1;
    pdfScale = pdfScale; // keep current zoom
    await renderPages();
    zoomFit();
    markDirty();
    await buildPageStrip();
    toast('✅ Page ' + (pageIdx+1) + ' removed');
  } catch(e) { toast('❌ Could not remove page: ' + e.message, true); console.error(e); }
  hideLoad();
}

function jumpToPage(idx) {
  if (!pdfPages[idx]) return;
  currentPageIdx = idx;
  // Update active state
  document.querySelectorAll('.pt').forEach((t, i) => t.classList.toggle('active', i === idx));
  // Scroll canvas to page
  const wrap = document.getElementById('cwrap');
  wrap.scrollTop = pdfPages[idx].y + 10;
  toast('Page ' + (idx + 1));
}

function togglePageSelect(idx, wrap) {
  if (selectedPages.has(idx)) {
    selectedPages.delete(idx);
    wrap.classList.remove('selected');
  } else {
    selectedPages.add(idx);
    wrap.classList.add('selected');
  }
  updateMergeBtn();
}

function updateMergeBtn() {
  const lbl = document.getElementById('ai-merge-label');
  if (!lbl) return;
  if (selectedPages.size >= 1) {
    lbl.innerHTML = selectedPages.size + ' SEL<br>MERGE';
  } else {
    lbl.innerHTML = 'SMART<br>MERGE';
  }
}

// Auto-open strip when PDF loads (multi-page)
async function autoOpenStrip() {
  if (!pdfDoc) return;
  const strip = document.getElementById('page-strip');
  strip.style.display = 'block';
  await buildPageStrip();
}

// Legacy compat
function togglePagePanel() { togglePageStrip(); }
function buildPageThumbs() { buildPageStrip(); }
function scrollToPage(idx) { jumpToPage(idx); }

// ═══════════════════════════════════════════════════════════
// SESSION PERSISTENCE (IndexedDB)
// ═══════════════════════════════════════════════════════════
let _db = null;
async function openDB() {
  if (_db) return _db;
  return new Promise((res, rej) => {
    const req = indexedDB.open('EliteMarkup', 2);
    req.onupgradeneeded = e => {
      const d=e.target.result;
      // Create store if missing (handles version upgrades)
      if(!d.objectStoreNames.contains('session'))d.createObjectStore('session');
      if(!d.objectStoreNames.contains('s'))d.createObjectStore('s');
    };
    req.onsuccess = e => { _db=e.target.result; res(_db); };
    req.onerror = rej;
  });
}
async function dbSet(k,v){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction('session','readwrite');tx.objectStore('session').put(v,k);tx.oncomplete=res;tx.onerror=rej;});}
async function dbGet(k){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction('session','readonly');const req=tx.objectStore('session').get(k);req.onsuccess=e=>res(e.target.result);req.onerror=rej;});}
async function dbDel(k){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction('session','readwrite');tx.objectStore('session').delete(k);tx.oncomplete=res;tx.onerror=rej;});}

async function saveSession() {
  try {
    if (!pdfDoc) return;
    const sessionData = {
      fileName: currentFileName,
      projectId: CP?.id,
      projectName: CP?.name,
      variantId: currentVariantId || null,
      strokes: strokes,
      pdfScale: renderScale,
      icons: icons.map(pi => ({id:pi.id, iconId:pi.iconId,
        x:pi.x, y:pi.y, scale:(pi.scale||36),
        label:pi.label||'', rotation:pi.rotation||0, opacity:pi.opacity||100, flipH:pi.flipH||false})),
      savedAt: Date.now(),
      mapBoxes: mapBoxes.map(b => b.isMarker
        ? { id:b.id, labelId:b.labelId, labelName:b.labelName, color:b.color, category:b.category, isMarker:true, cx:b.cx, cy:b.cy, page:b.page||1 }
        : { id:b.id, labelId:b.labelId, labelName:b.labelName, color:b.color, category:b.category, x1:b.x1, y1:b.y1, x2:b.x2, y2:b.y2, page:b.page||1 })
    };

    // Always try to save pdfBytes — catch quota errors and fall back gracefully
    try {
      sessionData.pdfBytes = await pdfDoc.getData();
    } catch(e) {
      sessionData.pdfBytes = null;
      console.warn('[saveSession] pdfBytes unavailable:', e.message);
    }

    try {
      await dbSet('session', sessionData);
      console.log('[saveSession] saved — projectId:', CP?.id, 'hasPdfBytes:', !!sessionData.pdfBytes);
    } catch(e) {
      // Quota error with pdfBytes — retry without
      console.warn('[saveSession] quota error, retrying without pdfBytes');
      sessionData.pdfBytes = null;
      await dbSet('session', sessionData);
    }
  } catch(e) { console.warn('Session save error:', e); }
}

async function restoreSession() {
  // Detect iPad: touch device with width >= 768
  const _isIpad = navigator.maxTouchPoints > 1 && window.innerWidth >= 768;
  // Skip full session restore on iPhone (too memory intensive)
  if (window.innerWidth <= 767) return false;
  // On iPad: skip auto-restore, just show dashboard with recent projects
  if (_isIpad) {
    const recentIds = getRecentlyOpened();
    if (recentIds.length > 0) {
      // Show dashboard — loadJobDashboard will display recent cards
      return false;
    }
    return false;
  }
  try {
    const s = await dbGet('session');
    console.log('[restoreSession]', s ? {hasPdfBytes:!!s.pdfBytes, projectId:s.projectId, fileName:s.fileName, age:Math.round((Date.now()-s.savedAt)/1000)+'s'} : 'no session');
    if (!s || (Date.now() - s.savedAt > 86400000)) {
      // No session or expired — try most recently opened project as fallback
      const recentIds = getRecentlyOpened();
      if (recentIds.length > 0) {
        console.log('[restoreSession] no session, trying most recent project:', recentIds[0]);
        await openProject(recentIds[0], {skipPicker:true});
        return true;
      }
      return false;
    }
    // If no pdfBytes but we have a projectId, restore from Supabase
    if (!s.pdfBytes && s.projectId) {
      console.log('[restoreSession] no pdfBytes, opening project:', s.projectId);
      await openProject(s.projectId, {skipPicker:true});
      return true;
    }
    // No pdfBytes and no projectId — try most recently opened project
    if (!s.pdfBytes) {
      const recentIds = getRecentlyOpened();
      if (recentIds.length > 0) {
        console.log('[restoreSession] no pdfBytes/projectId, trying recent project:', recentIds[0]);
        await openProject(recentIds[0], {skipPicker:true});
        return true;
      }
      console.log('[restoreSession] cannot restore — no pdfBytes, no projectId, no recents');
      return false;
    }
    showLoad('Restoring your session...');
    // If session has a variantId, reopen that variant properly
    if (s.variantId && s.projectId) {
      console.log('[restoreSession] reopening variant:', s.variantId);
      const {data:proj} = await sb.from('markup_projects').select('*').eq('id',s.projectId).single();
      if (proj) { CP = proj; currentFileName = proj.name; }
      await openVariant(s.variantId);
      hideLoad();
      return true;
    }
    const blob = new Blob([s.pdfBytes], { type:'application/pdf' });
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    pdfDoc = await pdfjsLib.getDocument(URL.createObjectURL(blob)).promise;
    // Recalculate width-fit scale for current screen
    const _wrap = document.getElementById('cwrap');
    const _pg1 = await pdfDoc.getPage(1);
    const _nat = _pg1.getViewport({ scale: 1 });
    pdfScale = Math.floor((_wrap.clientWidth - 42) / _nat.width * 100) / 100;
    _wrap.classList.remove('zoomed');
    renderScale = 1;
    document.getElementById('dropzone').classList.add('gone');
    document.getElementById('cwrap').style.overflow = 'auto';
    strokes = s.strokes || []; icons = [];
    for (const pi of (s.icons || [])) {
      const ic = ICONS.find(i => i.id === pi.iconId); if (!ic) continue;
      await new Promise(res => { const img=new Image(); img.onload=()=>{icons.push({...pi,img});res();}; img.onerror=res; img.src=ic.f; });
    }
    currentFileName = s.fileName;
    if (s.projectId) { const{data}=await sb.from('markup_projects').select('*').eq('id',s.projectId).single(); if(data)CP=data; }
    if (currentFileName) setProjectUI(currentFileName);
    if (s.mapBoxes && s.mapBoxes.length > 0) {
      mapBoxes = s.mapBoxes;
      renderMapOverlay(); renderMapBoxList();
    } else {
      loadMapBoxes();
    }
    if (window.innerWidth > 767) await autoOpenStrip();
    hideLoad(); toast('✅ Session restored');
    // Single fit render — _applyFitScale sets pdfScale from available width then renders once
    _applyFitScale();
    return true;
  } catch(e) { console.warn('Restore error:', e); hideLoad(); return false; }
}

// ═══════════════════════════════════════════════════════════
// PRESENCE
// ═══════════════════════════════════════════════════════════
let presenceCh = null;
function startPresence(projectId, name) {
  stopPresence();
  const userName = document.getElementById('user-nm').textContent || CU.email;
  presenceCh = sb.channel('presence:' + projectId, { config:{ presence:{ key: CU.id } } });
  presenceCh
    .on('presence', { event: 'sync' }, () => {
      const state = presenceCh.presenceState();
      const others = Object.entries(state).filter(([k]) => k !== CU.id).map(([,v]) => v[0]?.userName || 'Someone').filter(Boolean);
      const bar = document.getElementById('presence-bar');
      if (others.length > 0) { bar.style.display='flex'; document.getElementById('presence-msg').textContent='⚠️ '+others.join(', ')+' '+(others.length===1?'is':'are')+' also editing this project'; }
      else { bar.style.display='none'; }
    })
    .on('presence', { event: 'join' }, ({ key, newPresences }) => { if (key !== CU.id) toast('👤 ' + (newPresences[0]?.userName||'Someone') + ' joined this project'); })
    .on('presence', { event: 'leave' }, ({ key, leftPresences }) => { if (key !== CU.id) { document.getElementById('presence-bar').style.display='none'; toast('👤 ' + (leftPresences[0]?.userName||'Someone') + ' left'); } })
    .subscribe(async status => { if (status === 'SUBSCRIBED') await presenceCh.track({ userName, projectName: name, online_at: new Date().toISOString() }); });
}
function stopPresence() { if (presenceCh) { presenceCh.untrack(); sb.removeChannel(presenceCh); presenceCh = null; } document.getElementById('presence-bar').style.display = 'none'; }
window.addEventListener('beforeunload', (e) => {
  stopPresence();
  if (_ewmDirty && pdfDoc) {
    e.preventDefault();
    e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    return e.returnValue;
  }
});

// ═══════════════════════════════════════════════════════════
// ICON CREATOR
// ═══════════════════════════════════════════════════════════

let _icImageData = null; // base64 of uploaded image
let _icRawSource = null;  // canvas with background-removed product (no border, no bg fill)

let _icShape = 'square'; // 'square' or 'circle'

function setIconShape(shape) {
  _icShape = shape;
  ['square','circle','rect'].forEach(s => {
    const el = document.getElementById('ic-shape-' + s);
    if (el) { el.style.borderColor = s===shape ? 'var(--acc)' : 'var(--bdr2)'; el.style.color = s===shape ? 'var(--txt)' : 'var(--txt2)'; }
  });
  syncPreviewShapeBtns();
}

function showIconCreator() {
  closeMenus();
  // Reset state
  _icImageData = null;
  _icRawSource = null;
  _icEditingId = null;
  window._icProcessedPixels = null;
  window._icAsIsMode = false;
  document.getElementById('ic-process-btn').disabled = true;
  populateCatSelect();
  document.getElementById('ic-cat').dataset.last = '';
  fieldErrClear('ic-err', document.getElementById('ic-cat'));
  document.getElementById('ic-swap-hint').style.display = 'none';
  const hintText = document.getElementById('ic-upload-hint-text');
  if (hintText) hintText.textContent = 'Click or drag a product photo';
  document.getElementById('ic-save-btn').textContent = '✅ Save to Library';
  _setIconEditBtns(false);
  document.getElementById('ic-process-btn').style.opacity = '.4';
  document.getElementById('ic-process-btn').style.cursor = 'not-allowed';
  const _asIsReset = document.getElementById('ic-asis-btn');
  if (_asIsReset) { _asIsReset.disabled = true; _asIsReset.style.opacity = '.4'; _asIsReset.style.cursor = 'not-allowed'; _asIsReset.style.color = 'var(--txt2)'; }
  document.getElementById('ic-result-area').style.display = 'none';
  document.getElementById('ic-preview-area').style.display = 'none';
  document.getElementById('ic-upload-hint').style.display = 'block';
  document.getElementById('ic-name').value = ''; document.getElementById('ic-preview-name').value = '';
  setIconShape('square');
  document.getElementById('icon-creator-modal').classList.remove('gone');
}

// ── Icon Image Search ─────────────────────────────────────────────────────────
let _icImgSearchActive = false;

function icImgSearchClear() {
  document.getElementById('ic-img-search-results').style.display = 'none';
  document.getElementById('ic-img-search-grid').innerHTML = '';
  document.getElementById('ic-img-search-status').textContent = '';
}

async function icImgSearch() {
  const query = document.getElementById('ic-img-search-input').value.trim();
  if (!query) return;

  const apiKey = localStorage.getItem('elite_anthropic_key');
  if (!apiKey) { alert('Add your Anthropic API key in Settings to use image search.'); return; }

  const btn    = document.getElementById('ic-img-search-btn');
  const results= document.getElementById('ic-img-search-results');
  const grid   = document.getElementById('ic-img-search-grid');
  const status = document.getElementById('ic-img-search-status');

  btn.disabled = true; btn.textContent = '…';
  results.style.display = 'block';
  grid.innerHTML = '';
  status.textContent = 'Searching…';

  try {
    // Use Haiku — fast enough for simple URL extraction
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        system: 'You are a product image finder. Search for the product and return ONLY a JSON array of 6 direct image URLs (jpg/png/webp). No explanation, no markdown, just the array. Example: ["https://a.com/x.jpg","https://b.com/y.png"]',
        messages: [{ role: 'user', content: 'Product images for: ' + query }]
      })
    });

    const data = await res.json();
    if (data.error) {
      status.textContent = 'API error: ' + (data.error.message || data.error.type);
      console.error('icImgSearch API error:', data.error);
      btn.disabled = false; btn.textContent = 'Search';
      return;
    }

    // Dump ALL content to string — grab URLs from anywhere in it
    const allText = JSON.stringify(data.content || '');
    console.log('Search response blocks:', (data.content||[]).map(b=>b.type));

    // Pull every http URL that looks like an image out of the raw JSON dump
    const imgRx = /https?:\\\/\\\/[^"\\\\]+\\.(?:jpg|jpeg|png|webp|gif)(?:\\?[^"\\\\]*)?/gi;
    const raw = [...new Set(allText.match(imgRx) || [])];
    let urls = raw
      .map(u => u.replace(/\\\\u[\da-f]{4}/gi, '').replace(/\\\\/g,''))  // unescape
      .filter(u => u.startsWith('http') && u.length < 600
        && !/favicon|sprite|icon-\d|pixel\.gif|logo\d|blank\.gif/i.test(u))
      .slice(0, 8);

    // Also try parsing a JSON array Claude may have put in a text block
    for (const block of (data.content || [])) {
      if (block.type === 'text') {
        const m = block.text.match(/\[[\s\S]*?\]/);
        if (m) {
          try {
            const arr = JSON.parse(m[0]);
            if (Array.isArray(arr)) {
              const extra = arr.filter(u => typeof u === 'string' && u.startsWith('http'));
              urls = [...new Set([...extra, ...urls])].slice(0, 8);
            }
          } catch(e) {}
        }
      }
    }

    if (!urls.length) {
      status.textContent = 'No images found — try a more specific search';
      btn.disabled = false; btn.textContent = 'Search';
      return;
    }

    icImgRenderResults(urls);

  } catch(e) {
    status.textContent = 'Search error — see F12 console';
    console.error('icImgSearch:', e);
  }
  btn.disabled = false; btn.textContent = 'Search';
}

// Render thumbnail grid — always proxy images through weserv.nl (CORS-safe image CDN)
function icImgRenderResults(urls) {
  const grid   = document.getElementById('ic-img-search-grid');
  const status = document.getElementById('ic-img-search-status');
  grid.innerHTML = '';
  let loaded = 0, failed = 0;

  const update = () => {
    const showing = urls.length - failed;
    if (loaded + failed === urls.length) {
      status.textContent = showing
        ? showing + ' image' + (showing !== 1 ? 's' : '') + ' — click to use'
        : 'No images could be displayed — try a different search';
    } else {
      status.textContent = 'Loading ' + urls.length + ' images…';
    }
  };

  urls.forEach(url => {
    // weserv.nl proxies the image with CORS headers, resizes to thumbnail
    const thumbUrl = 'https://images.weserv.nl/?url=' + encodeURIComponent(url.replace(/^https?:\/\//,'')) + '&w=160&h=160&fit=contain&bg=white';

    const cell = document.createElement('div');
    cell.style.cssText = 'aspect-ratio:1;border-radius:7px;overflow:hidden;background:#1a2a3a;border:2px solid transparent;cursor:pointer;transition:border-color .12s,opacity .12s;';

    const img = document.createElement('img');
    img.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;';
    img.title = 'Click to use';

    img.onload  = () => { loaded++; cell.style.opacity = '1'; update(); };
    img.onerror = () => { failed++; cell.style.display = 'none'; update(); };
    cell.style.opacity = '0.5';
    img.src = thumbUrl;

    cell.addEventListener('mouseenter', () => { cell.style.borderColor = 'var(--acc)'; cell.style.opacity = '1'; });
    cell.addEventListener('mouseleave', () => { if (cell.style.borderColor !== 'rgb(16, 185, 129)') { cell.style.borderColor = 'transparent'; cell.style.opacity = '0.85'; } });
    cell.addEventListener('click', () => {
      document.querySelectorAll('#ic-img-search-grid > div').forEach(d => {
        d.style.borderColor = 'transparent';
        if (parseFloat(d.style.opacity) > 0.5) d.style.opacity = '0.85';
      });
      cell.style.borderColor = '#10b981';
      cell.style.opacity = '1';
      icLoadImageFromUrl(url);  // load the ORIGINAL (full-res) URL, not the thumb
    });

    cell.appendChild(img);
    grid.appendChild(cell);
  });

  status.textContent = 'Loading ' + urls.length + ' images…';
}

// Load an image from a URL into the icon creator (handles CORS via canvas)
async function icLoadImageFromUrl(url) {
  const status = document.getElementById('ic-img-search-status');
  status.textContent = 'Loading image…';

  // Try direct load first (works if server allows CORS)
  const img = new Image();
  img.crossOrigin = 'anonymous';

  const loadDirect = () => new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });

  // Proxy fallback — corsproxy.io is reliable for public product images
  const loadProxy = (proxyUrl) => new Promise((resolve, reject) => {
    const pImg = new Image();
    pImg.crossOrigin = 'anonymous';
    pImg.onload = () => resolve(pImg);
    pImg.onerror = reject;
    pImg.src = proxyUrl;
  });

  let loadedImg = null;
  try {
    loadedImg = await loadDirect();
  } catch(e) {
    try {
      loadedImg = await loadProxy('https://corsproxy.io/?' + encodeURIComponent(url));
    } catch(e2) {
      try {
        loadedImg = await loadProxy('https://api.allorigins.win/raw?url=' + encodeURIComponent(url));
      } catch(e3) {
        status.textContent = '⚠ Could not load — try downloading and uploading manually';
        return;
      }
    }
  }

  // Draw to canvas → get base64 → feed into existing pipeline
  const cv = document.createElement('canvas');
  cv.width = loadedImg.naturalWidth || loadedImg.width;
  cv.height = loadedImg.naturalHeight || loadedImg.height;
  cv.getContext('2d').drawImage(loadedImg, 0, 0);

  let dataUrl;
  try {
    dataUrl = cv.toDataURL('image/png');
  } catch(e) {
    status.textContent = '⚠ Image blocked by security policy — download and upload manually';
    return;
  }

  // Inject into the existing image pipeline exactly like a file upload
  _icImageData = dataUrl;
  window._icProcessedPixels = null;
  window._icAsIsMode = false;

  document.getElementById('ic-original-preview').src = dataUrl;
  document.getElementById('ic-preview-area').style.display = 'block';
  document.getElementById('ic-upload-hint').style.display = 'none';
  document.getElementById('ic-swap-hint').style.display = 'none';
  document.getElementById('ic-result-area').style.display = 'none';

  const processBtn = document.getElementById('ic-process-btn');
  processBtn.disabled = false; processBtn.style.opacity = '1'; processBtn.style.cursor = 'pointer';
  processBtn.innerHTML = '<svg class="ai-star-icon" width="14" height="14" viewBox="0 0 36 36" fill="none"><g class="s0"><path d="M18 4 L20 12 L28 14 L20 16 L18 24 L16 16 L8 14 L16 12Z" fill="white"/></g><g class="s1"><path d="M18 0 L19 3.6 L22.6 4.6 L19 5.6 L18 9.2 L17 5.6 L13.4 4.6 L17 3.6Z" fill="white" opacity=".85"/></g><g class="s2"><path d="M18 26.8 L19 30.4 L22.6 31.4 L19 32.4 L18 36 L17 32.4 L13.4 31.4 L17 30.4Z" fill="white" opacity=".85"/></g><g class="s3"><path d="M4.6 14 L5.6 17.6 L9.2 18.6 L5.6 19.6 L4.6 23.2 L3.6 19.6 L0 18.6 L3.6 17.6Z" fill="white" opacity=".85"/></g><g class="s4"><path d="M26.8 14 L27.8 17.6 L31.4 18.6 L27.8 19.6 L26.8 23.2 L25.8 19.6 L22.2 18.6 L25.8 17.6Z" fill="white" opacity=".85"/></g><g class="r2"><path d="M30 6 L30.7 8.4 L33 9.1 L30.7 9.8 L30 13.2 L29.3 9.8 L27 9.1 L29.3 8.4Z" fill="white" opacity=".52"/><path d="M30 21 L30.7 23.4 L33 24.1 L30.7 24.8 L30 28.2 L29.3 24.8 L27 24.1 L29.3 23.4Z" fill="white" opacity=".52"/><path d="M6 6 L6.7 8.4 L9 9.1 L6.7 9.8 L6 13.2 L5.3 9.8 L3 9.1 L5.3 8.4Z" fill="white" opacity=".52"/><path d="M6 21 L6.7 23.4 L9 24.1 L6.7 24.8 L6 28.2 L5.3 24.8 L3 24.1 L5.3 23.4Z" fill="white" opacity=".52"/></g></svg> AI Background Remover';

  const asIsBtn = document.getElementById('ic-asis-btn');
  if (asIsBtn) { asIsBtn.disabled = false; asIsBtn.style.opacity = '1'; asIsBtn.style.cursor = 'pointer'; asIsBtn.style.color = 'var(--txt)'; }

  status.textContent = '✓ Image loaded — process or use as-is';
}
// ─────────────────────────────────────────────────────────────────────────────

function handleIconImageFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = e => {
    _icImageData = e.target.result;
    window._icProcessedPixels = null; // new image — reset processed cache
    window._icAsIsMode = false; // reset as-is mode for new image
    document.getElementById('ic-original-preview').src = _icImageData;
    document.getElementById('ic-preview-area').style.display = 'block';
    document.getElementById('ic-upload-hint').style.display = 'none';
    document.getElementById('ic-swap-hint').style.display = 'none';
    document.getElementById('ic-result-area').style.display = 'none';
    // Reset process button to standard label
    const btn = document.getElementById('ic-process-btn');
    btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer';
    btn.innerHTML = '<svg class=\"ai-star-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 36 36\" fill=\"none\"><g class=\"s0\"><path d=\"M18 4 L20 12 L28 14 L20 16 L18 24 L16 16 L8 14 L16 12Z\" fill=\"white\"/></g><g class=\"s1\"><path d=\"M18 0 L19 3.6 L22.6 4.6 L19 5.6 L18 9.2 L17 5.6 L13.4 4.6 L17 3.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s2\"><path d=\"M18 26.8 L19 30.4 L22.6 31.4 L19 32.4 L18 36 L17 32.4 L13.4 31.4 L17 30.4Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s3\"><path d=\"M4.6 14 L5.6 17.6 L9.2 18.6 L5.6 19.6 L4.6 23.2 L3.6 19.6 L0 18.6 L3.6 17.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s4\"><path d=\"M26.8 14 L27.8 17.6 L31.4 18.6 L27.8 19.6 L26.8 23.2 L25.8 19.6 L22.2 18.6 L25.8 17.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"r2\"><path d=\"M30 6 L30.7 8.4 L33 9.1 L30.7 9.8 L30 13.2 L29.3 9.8 L27 9.1 L29.3 8.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M30 21 L30.7 23.4 L33 24.1 L30.7 24.8 L30 28.2 L29.3 24.8 L27 24.1 L29.3 23.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M6 6 L6.7 8.4 L9 9.1 L6.7 9.8 L6 13.2 L5.3 9.8 L3 9.1 L5.3 8.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M6 21 L6.7 23.4 L9 24.1 L6.7 24.8 L6 28.2 L5.3 24.8 L3 24.1 L5.3 23.4Z\" fill=\"white\" opacity=\".52\"/></g></svg> AI Background Remover';
    // Also enable the As-Is button
    const asIsBtn = document.getElementById('ic-asis-btn');
    if (asIsBtn) { asIsBtn.disabled = false; asIsBtn.style.opacity = '1'; asIsBtn.style.cursor = 'pointer'; asIsBtn.style.color = 'var(--txt)'; }
  };
  reader.readAsDataURL(file);
}

function handleIconImageDrop(file) { handleIconImageFile(file); }

// Draw uploaded image as-is (no background removal) inside the border shape
async function useAsIsIcon() {
  if (!_icImageData) return;

  const strokeColor = document.getElementById('ic-preview-color')?.value || '#f97316';
  const strokeW = 7;
  const PADDING = 10;

  // Determine canvas size from current shape
  let cvW, cvH;
  if (_icShape === 'rect') {
    const img0 = new Image();
    await new Promise(res => { img0.onload = res; img0.src = _icImageData; });
    const aspect = img0.naturalWidth / img0.naturalHeight;
    if (aspect >= 1) { cvW = 160; cvH = Math.max(80, Math.min(120, Math.round(160 / aspect))); }
    else { cvH = 160; cvW = Math.max(80, Math.min(120, Math.round(160 * aspect))); }
  } else {
    cvW = cvH = 120;
  }

  const cv = document.getElementById('ic-result-canvas');
  cv.width = cvW; cv.height = cvH;
  cv.style.width = cvW + 'px'; cv.style.height = cvH + 'px';
  const ctx = cv.getContext('2d');

  // Clip to shape
  ctx.save();
  if (_icShape === 'circle') {
    ctx.beginPath();
    ctx.arc(cvW / 2, cvH / 2, Math.min(cvW, cvH) / 2, 0, Math.PI * 2);
    ctx.clip();
  }

  // White background fill
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, cvW, cvH);

  // Draw image scaled to fit inside padding + border
  const img = new Image();
  await new Promise(res => { img.onload = res; img.src = _icImageData; });
  const innerW = cvW - strokeW * 2 - PADDING * 2;
  const innerH = cvH - strokeW * 2 - PADDING * 2;
  const fitScale = Math.min(innerW / img.naturalWidth, innerH / img.naturalHeight);
  const drawW = Math.round(img.naturalWidth * fitScale);
  const drawH = Math.round(img.naturalHeight * fitScale);
  const drawX = Math.round((cvW - drawW) / 2);
  const drawY = Math.round((cvH - drawH) / 2);
  ctx.drawImage(img, drawX, drawY, drawW, drawH);
  ctx.restore();

  // Draw border on top
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeW;
  const half = strokeW / 2;
  const r = Math.round(strokeW * 1.5);
  ctx.beginPath();
  if (_icShape === 'circle') {
    ctx.arc(cvW / 2, cvH / 2, Math.min(cvW, cvH) / 2 - half, 0, Math.PI * 2);
  } else {
    ctx.roundRect(half, half, cvW - strokeW, cvH - strokeW, r);
  }
  ctx.stroke();

  // Sync name only if not already set by user
  const nameVal = document.getElementById('ic-name').value || 'Custom Icon';
  if (!document.getElementById('ic-name').value) { document.getElementById('ic-name').value = nameVal; document.getElementById('ic-preview-name').value = nameVal; }
  document.getElementById('ic-preview-color').value = strokeColor;
  document.getElementById('ic-preview-color-hex').value = strokeColor;
  document.getElementById('ic-result-area').style.display = 'flex';
  syncPreviewShapeBtns();

  // Store a dummy _icProcessedPixels so refreshIconPreview re-runs this path
  // We repurpose the flag to signal "as-is mode" — redraw on color/shape change
  window._icAsIsMode = true;
  window._icProcessedPixels = null; // no bg-removed pixels
}

// Override refreshIconPreview to handle as-is mode — handled directly in refreshIconPreview below

async function processIconImage() {
  if (!_icImageData) return;

  const btn = document.getElementById('ic-process-btn');
  btn.disabled = true; btn.classList.add('ai-loading'); btn.style.cursor = 'not-allowed';

  try {
    // First check if image already has transparency (no bg removal needed)
    const checkImg = new Image();
    await new Promise(res => { checkImg.onload = res; checkImg.src = _icImageData; });
    const checkCv = document.createElement('canvas');
    const checkScale = Math.min(1, 200 / Math.max(checkImg.width, checkImg.height));
    checkCv.width = Math.round(checkImg.width * checkScale);
    checkCv.height = Math.round(checkImg.height * checkScale);
    checkCv.getContext('2d').drawImage(checkImg, 0, 0, checkCv.width, checkCv.height);
    const checkPx = checkCv.getContext('2d').getImageData(0, 0, checkCv.width, checkCv.height).data;
    let transparentCount = 0;
    for (let i = 3; i < checkPx.length; i += 4) if (checkPx[i] < 128) transparentCount++;
    const transparentRatio = transparentCount / (checkCv.width * checkCv.height);

    if (transparentRatio > 0.1) {
      // Already has transparency — skip AI, use as-is
      btn.textContent = '🎨 Compositing...';
      await compositeIcon({ bg_r: 255, bg_g: 255, bg_b: 255, tolerance: 0, skipRemoval: true });
      btn.innerHTML = '<svg class=\"ai-star-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 36 36\" fill=\"none\"><g class=\"s0\"><path d=\"M18 4 L20 12 L28 14 L20 16 L18 24 L16 16 L8 14 L16 12Z\" fill=\"white\"/></g><g class=\"s1\"><path d=\"M18 0 L19 3.6 L22.6 4.6 L19 5.6 L18 9.2 L17 5.6 L13.4 4.6 L17 3.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s2\"><path d=\"M18 26.8 L19 30.4 L22.6 31.4 L19 32.4 L18 36 L17 32.4 L13.4 31.4 L17 30.4Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s3\"><path d=\"M4.6 14 L5.6 17.6 L9.2 18.6 L5.6 19.6 L4.6 23.2 L3.6 19.6 L0 18.6 L3.6 17.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s4\"><path d=\"M26.8 14 L27.8 17.6 L31.4 18.6 L27.8 19.6 L26.8 23.2 L25.8 19.6 L22.2 18.6 L25.8 17.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"r2\"><path d=\"M30 6 L30.7 8.4 L33 9.1 L30.7 9.8 L30 13.2 L29.3 9.8 L27 9.1 L29.3 8.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M30 21 L30.7 23.4 L33 24.1 L30.7 24.8 L30 28.2 L29.3 24.8 L27 24.1 L29.3 23.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M6 6 L6.7 8.4 L9 9.1 L6.7 9.8 L6 13.2 L5.3 9.8 L3 9.1 L5.3 8.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M6 21 L6.7 23.4 L9 24.1 L6.7 24.8 L6 28.2 L5.3 24.8 L3 24.1 L5.3 23.4Z\" fill=\"white\" opacity=\".52\"/></g></svg> AI Background Remover';
      btn.disabled = false; btn.style.cursor = 'pointer'; btn.style.opacity = '1';
      return;
    }

    // Has background — use AI to identify it
    const apiKey = requireApiKey();
    if (!apiKey) { btn.disabled = false; btn.style.cursor = 'pointer'; btn.style.opacity = '1'; return; }

    btn.textContent = '⚡ AI removing background...';
    const b64 = _icImageData.split(',')[1];
    const mime = _icImageData.split(';')[0].split(':')[1] || 'image/png';

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929', max_tokens: 200,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: mime, data: b64 } },
          { type: 'text', text: 'What is the background color of this product image? Respond ONLY with JSON: {"bg_r":N,"bg_g":N,"bg_b":N,"tolerance":N} where tolerance is color variation 0-80. No other text.' }
        ]}]
      })
    });

    const data = await resp.json();
    const txt = data.content?.[0]?.text || '';
    let bgInfo = { bg_r: 255, bg_g: 255, bg_b: 255, tolerance: 30 };
    try { const m = txt.match(/\{[^}]+\}/); if (m) bgInfo = JSON.parse(m[0]); } catch(e) {}

    btn.textContent = '🎨 Compositing icon...';
    await compositeIcon(bgInfo);

  } catch(e) {
    toast('❌ Error: ' + e.message, true);
  }
  btn.innerHTML = '<svg class=\"ai-star-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 36 36\" fill=\"none\"><g class=\"s0\"><path d=\"M18 4 L20 12 L28 14 L20 16 L18 24 L16 16 L8 14 L16 12Z\" fill=\"white\"/></g><g class=\"s1\"><path d=\"M18 0 L19 3.6 L22.6 4.6 L19 5.6 L18 9.2 L17 5.6 L13.4 4.6 L17 3.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s2\"><path d=\"M18 26.8 L19 30.4 L22.6 31.4 L19 32.4 L18 36 L17 32.4 L13.4 31.4 L17 30.4Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s3\"><path d=\"M4.6 14 L5.6 17.6 L9.2 18.6 L5.6 19.6 L4.6 23.2 L3.6 19.6 L0 18.6 L3.6 17.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s4\"><path d=\"M26.8 14 L27.8 17.6 L31.4 18.6 L27.8 19.6 L26.8 23.2 L25.8 19.6 L22.2 18.6 L25.8 17.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"r2\"><path d=\"M30 6 L30.7 8.4 L33 9.1 L30.7 9.8 L30 13.2 L29.3 9.8 L27 9.1 L29.3 8.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M30 21 L30.7 23.4 L33 24.1 L30.7 24.8 L30 28.2 L29.3 24.8 L27 24.1 L29.3 23.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M6 6 L6.7 8.4 L9 9.1 L6.7 9.8 L6 13.2 L5.3 9.8 L3 9.1 L5.3 8.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M6 21 L6.7 23.4 L9 24.1 L6.7 24.8 L6 28.2 L5.3 24.8 L3 24.1 L5.3 23.4Z\" fill=\"white\" opacity=\".52\"/></g></svg> AI Background Remover';
  btn.disabled = false; btn.style.cursor = 'pointer'; btn.style.opacity = '1';
}

async function compositeIcon(bgInfo = {}) {
  const ICON_SIZE = 120; // output canvas size
  const PADDING = 10;    // padding inside border
  const strokeW = parseInt(document.getElementById('ic-stroke-width').value) || 8;
  const strokeColor = document.getElementById('ic-stroke-color').value || '#f97316';

  // Load image
  const img = new Image();
  await new Promise(res => { img.onload = res; img.src = _icImageData; });

  // Draw to temp canvas to get pixel data
  const tmp = document.createElement('canvas');
  // Scale to max 400px for processing
  const scale = Math.min(1, 400 / Math.max(img.width, img.height));
  tmp.width = Math.round(img.width * scale);
  tmp.height = Math.round(img.height * scale);
  const tc = tmp.getContext('2d');
  tc.drawImage(img, 0, 0, tmp.width, tmp.height);

  const px = tc.getImageData(0, 0, tmp.width, tmp.height);
  const d = px.data;
  const { bg_r, bg_g, bg_b, tolerance } = bgInfo;
  const tol = Math.max(20, Math.min(80, tolerance || 30));

  // Remove background: flood-fill style — pixels similar to bg color become transparent
  // Also remove near-white pixels near edges
  if (!bgInfo.skipRemoval && tol > 0) {
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i+1], b = d[i+2];
      const dist = Math.sqrt((r-bg_r)**2 + (g-bg_g)**2 + (b-bg_b)**2);
      if (dist < tol) { d[i+3] = 0; }
      else if (dist < tol * 1.5) { d[i+3] = Math.round(255 * (dist - tol) / (tol * 0.5)); }
    }
    tc.putImageData(px, 0, 0);
  }

  // Store processed canvas so we can re-composite without re-running AI
  window._icProcessedPixels = { tmp, minX: 0, maxX: tmp.width-1, minY: 0, maxY: tmp.height-1 };

// Find bounding box of non-transparent pixels
  let minX = tmp.width, maxX = 0, minY = tmp.height, maxY = 0;
  for (let y = 0; y < tmp.height; y++) {
    for (let x = 0; x < tmp.width; x++) {
      const alpha = d[(y * tmp.width + x) * 4 + 3];
      if (alpha > 30) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
  }

  // Store bounding box AND raw source for re-compositing without re-running AI
  window._icProcessedPixels = { tmp, minX, maxX, minY, maxY };
  _icRawSource = { tmp, minX, maxX, minY, maxY }; // bg-removed pixels, no border


  // After bg removal, just delegate to recompositeFromPixels for consistency
  await recompositeFromPixels(strokeColor);

  // Show result — sync preview controls (only set name if not already typed by user)
  const name = document.getElementById('ic-name').value || 'Custom Icon';
  if (!document.getElementById('ic-name').value) { document.getElementById('ic-name').value = name; document.getElementById('ic-preview-name').value = name; }
  document.getElementById('ic-preview-color').value = strokeColor;
  document.getElementById('ic-preview-color-hex').value = strokeColor;
  document.getElementById('ic-result-area').style.display = 'flex';
  // Sync shape buttons in preview
  syncPreviewShapeBtns();

  const btn = document.getElementById('ic-process-btn');
  btn.innerHTML = '<svg class=\"ai-star-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 36 36\" fill=\"none\"><g class=\"s0\"><path d=\"M18 4 L20 12 L28 14 L20 16 L18 24 L16 16 L8 14 L16 12Z\" fill=\"white\"/></g><g class=\"s1\"><path d=\"M18 0 L19 3.6 L22.6 4.6 L19 5.6 L18 9.2 L17 5.6 L13.4 4.6 L17 3.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s2\"><path d=\"M18 26.8 L19 30.4 L22.6 31.4 L19 32.4 L18 36 L17 32.4 L13.4 31.4 L17 30.4Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s3\"><path d=\"M4.6 14 L5.6 17.6 L9.2 18.6 L5.6 19.6 L4.6 23.2 L3.6 19.6 L0 18.6 L3.6 17.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"s4\"><path d=\"M26.8 14 L27.8 17.6 L31.4 18.6 L27.8 19.6 L26.8 23.2 L25.8 19.6 L22.2 18.6 L25.8 17.6Z\" fill=\"white\" opacity=\".85\"/></g><g class=\"r2\"><path d=\"M30 6 L30.7 8.4 L33 9.1 L30.7 9.8 L30 13.2 L29.3 9.8 L27 9.1 L29.3 8.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M30 21 L30.7 23.4 L33 24.1 L30.7 24.8 L30 28.2 L29.3 24.8 L27 24.1 L29.3 23.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M6 6 L6.7 8.4 L9 9.1 L6.7 9.8 L6 13.2 L5.3 9.8 L3 9.1 L5.3 8.4Z\" fill=\"white\" opacity=\".52\"/><path d=\"M6 21 L6.7 23.4 L9 24.1 L6.7 24.8 L6 28.2 L5.3 24.8 L3 24.1 L5.3 23.4Z\" fill=\"white\" opacity=\".52\"/></g></svg> AI Background Remover';
  btn.disabled = false; btn.style.cursor = 'pointer'; btn.style.opacity = '1';
}

// Re-composite icon instantly when preview controls change
async function refreshIconPreview() {
  if (window._icAsIsMode) { await useAsIsIcon(); return; }
  if (!_icProcessedPixels) return; // no processed image data yet
  const strokeColor = document.getElementById('ic-preview-color').value || '#f97316';
  document.getElementById('ic-stroke-color').value = strokeColor;
  syncPreviewShapeBtns();
  await recompositeFromPixels(strokeColor);
}

function syncPreviewShapeBtns() {
  ['square','circle','rect'].forEach(s => {
    const prev = document.getElementById('ic-prev-shape-' + s);
    const main = document.getElementById('ic-shape-' + s);
    const active = s === _icShape;
    if (prev) { prev.style.borderColor = active ? 'var(--acc)' : 'var(--bdr2)'; prev.style.color = active ? 'var(--txt)' : 'var(--txt2)'; }
    if (main) { main.style.borderColor = active ? 'var(--acc)' : 'var(--bdr2)'; main.style.color = active ? 'var(--txt)' : 'var(--txt2)'; }
  });
}

// Re-composite from stored processed pixels (no AI needed)
async function recompositeFromPixels(strokeColor) {
  if (!window._icProcessedPixels) return;
  const { tmp, minX, maxX, minY, maxY } = window._icProcessedPixels;
  const PADDING = 10;
  const strokeW = 7;

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  // For rect: auto-detect portrait vs landscape from actual crop dimensions
  // Canvas is always 120px on one axis, proportional on the other (capped at 180)
  let cvW, cvH;
  if (_icShape === 'rect') {
    const aspect = cropW / cropH;
    if (aspect >= 1) {
      // landscape
      cvW = 160; cvH = Math.round(160 / aspect);
      cvH = Math.max(80, Math.min(120, cvH));
    } else {
      // portrait
      cvH = 160; cvW = Math.round(160 * aspect);
      cvW = Math.max(80, Math.min(120, cvW));
    }
  } else {
    cvW = cvH = 120;
  }

  const cv = document.getElementById('ic-result-canvas');
  cv.width = cvW; cv.height = cvH;
  cv.style.width = cvW + 'px'; cv.style.height = cvH + 'px';
  const ctx = cv.getContext('2d');

  ctx.save();
  if (_icShape === 'circle') {
    ctx.beginPath();
    ctx.arc(cvW/2, cvH/2, Math.min(cvW,cvH)/2, 0, Math.PI*2);
    ctx.clip();
  }
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, cvW, cvH);

  const innerW = cvW - strokeW * 2 - PADDING * 2;
  const innerH = cvH - strokeW * 2 - PADDING * 2;
  const fitScale = Math.min(innerW / cropW, innerH / cropH);
  const drawW = Math.round(cropW * fitScale);
  const drawH = Math.round(cropH * fitScale);
  const drawX = Math.round((cvW - drawW) / 2);
  const drawY = Math.round((cvH - drawH) / 2);
  ctx.drawImage(tmp, minX, minY, cropW, cropH, drawX, drawY, drawW, drawH);
  ctx.restore();

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeW;
  const half = strokeW / 2;
  const r = Math.round(strokeW * 1.5);
  ctx.beginPath();
  if (_icShape === 'circle') {
    const rad = Math.min(cvW,cvH)/2 - half;
    ctx.arc(cvW/2, cvH/2, rad, 0, Math.PI*2);
  } else {
    ctx.roundRect(half, half, cvW - strokeW, cvH - strokeW, r);
  }
  ctx.stroke();
}

let _icEditingId = null; // id of icon being edited, null = new


// ── PLACEMENT RULES HELPERS ──────────────────────────────────────────────────

function icRulesGet() {
  // Read current state of placement rules UI → returns array of rule objects
  const rules = [];
  const planType = document.getElementById('ic-rule-plan-type')?.value;
  if (planType) rules.push({ type: 'plan_type', value: planType });

  const qty = parseInt(document.getElementById('ic-rule-qty')?.value || '0');
  if (qty > 0) rules.push({ type: 'qty_per_room', value: qty });

  const askRooms = document.getElementById('ic-rule-ask-rooms')?.value === 'true';
  rules.push({ type: 'ask_rooms', value: askRooms });

  if (document.getElementById('ic-rule-loc-stairs')?.checked)
    rules.push({ type: 'location_hint', value: 'near_stairs' });
  if (document.getElementById('ic-rule-loc-garage-entry')?.checked)
    rules.push({ type: 'location_hint', value: 'garage_entry' });
  if (document.getElementById('ic-rule-loc-exterior-doors')?.checked)
    rules.push({ type: 'location_hint', value: 'exterior_doors' });
  if (document.getElementById('ic-rule-loc-exterior')?.checked)
    rules.push({ type: 'location_hint', value: 'exterior' });

  const prefRooms = (document.getElementById('ic-rule-preferred-rooms')?.value || '')
    .split(',').map(r => r.trim()).filter(Boolean);
  if (prefRooms.length) rules.push({ type: 'preferred_rooms', value: prefRooms });

  const learn = document.getElementById('ic-rule-learn')?.checked !== false;
  rules.push({ type: 'learn', value: learn });

  return rules;
}

function icRulesSet(rules) {
  // Populate placement rules UI from array of rule objects
  if (!rules || !Array.isArray(rules)) { icRulesClear(); return; }

  const planType = rules.find(r => r.type === 'plan_type');
  const el = document.getElementById('ic-rule-plan-type');
  if (el && planType) el.value = planType.value;

  const qty = rules.find(r => r.type === 'qty_per_room');
  const qtyEl = document.getElementById('ic-rule-qty');
  if (qtyEl) qtyEl.value = qty ? qty.value : '';

  const askRooms = rules.find(r => r.type === 'ask_rooms');
  const askEl = document.getElementById('ic-rule-ask-rooms');
  if (askEl) askEl.value = (askRooms && askRooms.value === false) ? 'false' : 'true';

  const hints = rules.filter(r => r.type === 'location_hint').map(r => r.value);
  const setChk = (id, val) => { const c = document.getElementById(id); if (c) c.checked = hints.includes(val); };
  setChk('ic-rule-loc-stairs', 'near_stairs');
  setChk('ic-rule-loc-garage-entry', 'garage_entry');
  setChk('ic-rule-loc-exterior-doors', 'exterior_doors');
  setChk('ic-rule-loc-exterior', 'exterior');

  const prefRooms = rules.find(r => r.type === 'preferred_rooms');
  const prefEl = document.getElementById('ic-rule-preferred-rooms');
  if (prefEl) prefEl.value = prefRooms ? (Array.isArray(prefRooms.value) ? prefRooms.value.join(', ') : prefRooms.value) : '';

  const learn = rules.find(r => r.type === 'learn');
  const learnEl = document.getElementById('ic-rule-learn');
  if (learnEl) learnEl.checked = learn ? learn.value !== false : true;
}

function icRulesClear() {
  const el = id => document.getElementById(id);
  if (el('ic-rule-plan-type')) el('ic-rule-plan-type').value = 'layout';
  if (el('ic-rule-qty')) el('ic-rule-qty').value = '';
  if (el('ic-rule-ask-rooms')) el('ic-rule-ask-rooms').value = 'true';
  ['ic-rule-loc-stairs','ic-rule-loc-garage-entry','ic-rule-loc-exterior-doors','ic-rule-loc-exterior']
    .forEach(id => { if (el(id)) el(id).checked = false; });
  if (el('ic-rule-preferred-rooms')) el('ic-rule-preferred-rooms').value = '';
  if (el('ic-rule-learn')) el('ic-rule-learn').checked = true;
}

// ── END PLACEMENT RULES ───────────────────────────────────────────────────────

async function saveCustomIcon() {
  const cv = document.getElementById('ic-result-canvas');
  const name = document.getElementById('ic-name').value.trim() || 'Custom Icon';
  const cat = document.getElementById('ic-cat').value;
  fieldErrClear('ic-err', document.getElementById('ic-cat'));

  if (!cat || cat === '__new__') { fieldErr(document.getElementById('ic-cat'), 'Select a category before saving', 'ic-err'); return; }

  // Validate: must have a rendered canvas (result area visible OR editing existing)
  const resultEl = document.getElementById('ic-result-area');
  const resultVisible = resultEl && (resultEl.style.display === 'flex' || resultEl.style.display === 'block');
  if (!_icEditingId && !resultVisible) {
    fieldErr(null, 'Process an image first — click "Use As-Is" or "AI Background Remover"', 'ic-err');
    return;
  }

  let dataUrl;
  try { dataUrl = cv?.toDataURL('image/png'); } catch(e) { dataUrl = null; }
  // A blank/unrendered canvas has width=0 or produces only a tiny data URL
  if (!dataUrl || !cv || cv.width === 0 || cv.height === 0) {
    fieldErr(null, 'Image not ready — process the image first', 'ic-err');
    return;
  }

  // Check for name collision — exclude the icon being edited from the check
  const nameTaken = ICONS.some(i => i.name.toLowerCase() === name.toLowerCase() && i.id !== _icEditingId);
  if (nameTaken) {
    fieldErr(document.getElementById('ic-name'), '"' + name + '" already exists — choose a different name', 'ic-err');
    return;
  }

  if (_icEditingId) {
    // UPDATE existing icon — upsert to company_icons
    const entry = { id: _icEditingId, name, cat, f: dataUrl };
    if (window._icAsIsMode) { entry.asis = true; entry.originalSrc = _icImageData; }
    // Save to company_icons (shared) — sole source of truth
    try {
      const _rules = icRulesGet();
      await sb.from('company_icons').upsert({ id: _icEditingId, name, cat, f: dataUrl, placement_rules: _rules, created_by: CU?.id });
      // Update live ICONS array rules too
      const _liveIc = ICONS.find(i => i.id === _icEditingId);
      if (_liveIc) _liveIc.placement_rules = _rules;
    } catch(e) { console.warn('company_icons save:', e); }
    // Update live ICONS array and canvas
    const liveIdx = ICONS.findIndex(i => i.id === _icEditingId);
    if (liveIdx >= 0) { ICONS[liveIdx] = { id: _icEditingId, name, cat, f: dataUrl, custom: true }; }
    const newImg = new Image();
    newImg.onload = () => { icons.forEach(pi => { if (pi.iconId === _icEditingId) pi.img = newImg; }); redraw(); };
    newImg.src = dataUrl;
    rebuildSidebar();
    toast('✅ "' + name + '" updated for all users');
  } else {
    // NEW icon
    const id = 'custom-' + Date.now();
    const entry = { id, name, cat, f: dataUrl };
    if (window._icAsIsMode) { entry.asis = true; entry.originalSrc = _icImageData; }
    ICONS.push({ id, name, cat, f: dataUrl, custom: true });
    // Save to company_icons (shared) — this is the sole source of truth
    try {
      const _newRules = icRulesGet();
      await sb.from('company_icons').insert({ id, name, cat, f: dataUrl, placement_rules: _newRules, created_by: CU?.id });
      ICONS[ICONS.length - 1].placement_rules = _newRules;
    } catch(e) { console.warn('company_icons insert:', e); }
    toast('✅ "' + name + '" added for all users');
  }

  // Re-render sidebar, prune any now-empty custom categories
  pruneEmptyCats();
  rebuildSidebar();

  _icEditingId = null;
  closeModal('icon-creator-modal');
}

// ── Category management ──────────────────────────────────────────────────────

// All built-in categories (never auto-deleted)
const BUILTIN_CATS = ['Audio','Video','Cameras','Network','Lighting','Shades','Access','Security','Control','Rack','Wiring'];

// Get all categories currently in use (built-in + custom saved + icon categories)
function getActiveCats() {
  const used = new Set(ICONS.map(i => i.cat));
  BUILTIN_CATS.forEach(c => used.add(c));
  // Also include any custom cats saved to localStorage even if no icons assigned yet
  const savedCustom = JSON.parse(localStorage.getItem('elite_custom_cats') || '[]');
  savedCustom.forEach(c => used.add(c));
  return ['All', ...Array.from(used).filter(c => c !== 'All').sort((a,b) => {
    const ai = BUILTIN_CATS.indexOf(a), bi = BUILTIN_CATS.indexOf(b);
    if (ai >= 0 && bi >= 0) return ai - bi;
    if (ai >= 0) return -1;
    if (bi >= 0) return 1;
    return a.localeCompare(b);
  })];
}

// Populate the category <select> in icon creator
function populateCatSelect(selectedCat) {
  const sel = document.getElementById('ic-cat');
  if (!sel) return;
  const cats = getActiveCats().filter(c => c !== 'All');
  const placeholder = selectedCat ? '' : '<option value="" disabled selected>Select a category...</option>';
  sel.innerHTML = placeholder + cats.map(c =>
    `<option value="${c}" ${c === selectedCat ? 'selected' : ''}>${c}</option>`
  ).join('') + `<option value="__new__">+ New Category...</option>`;
}

// Handle category dropdown change
function handleCatChange(sel) {
  if (sel.value !== '__new__') {
    sel.dataset.last = sel.value;
    return;
  }
  // Revert immediately so UI doesn't show "+ New Category..." selected
  sel.value = sel.dataset.last || '';
  showNewCatDialog();
}

function showNewCatDialog() {
  // Build inline dialog
  const existing = document.getElementById('new-cat-dialog');
  if (existing) existing.remove();

  const wrap = document.createElement('div');
  wrap.id = 'new-cat-dialog';
  wrap.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center;';
  wrap.innerHTML = `
    <div style="background:var(--surf);border:1px solid var(--bdr);border-radius:10px;padding:20px;width:320px;box-shadow:0 12px 40px rgba(0,0,0,.4);">
      <div style="font-size:14px;font-weight:700;color:var(--txt);margin-bottom:12px;">New Category</div>
      <input id="new-cat-input" type="text" placeholder="e.g. Intercom, AV Rack, Speakers..."
        style="width:100%;padding:8px 10px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:6px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;box-sizing:border-box;margin-bottom:12px;">
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button onclick="document.getElementById('new-cat-dialog').remove()" 
          style="padding:7px 14px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:6px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;">Cancel</button>
        <button id="new-cat-confirm"
          style="padding:7px 14px;background:var(--acc);border:none;border-radius:6px;color:#fff;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Add Category</button>
      </div>
    </div>`;
  document.body.appendChild(wrap);

  const input = document.getElementById('new-cat-input');
  input.focus();

  const confirm = () => {
    const cat = input.value.trim();
    if (!cat) return;
    // Auto-assign a unique color
    const color = getNextCatColor();
    saveCatColor(cat, color);
    // Save to localStorage
    const custom = JSON.parse(localStorage.getItem('elite_custom_cats') || '[]');
    if (!custom.includes(cat)) { custom.push(cat); localStorage.setItem('elite_custom_cats', JSON.stringify(custom)); }
    wrap.remove();
    // Rebuild select and sidebar, then select the new cat
    populateCatSelect(cat);
    const sel = document.getElementById('ic-cat');
    if (sel) { sel.value = cat; sel.dataset.last = cat; }
    rebuildSidebar();
    toast('Category "' + cat + '" created');
  };

  document.getElementById('new-cat-confirm').onclick = confirm;
  input.onkeydown = e => { if (e.key === 'Enter') confirm(); if (e.key === 'Escape') wrap.remove(); };
}

// Edit existing category (rename and/or change color)
function showEditCatDialog(cat) {
  const isBuiltin = typeof BUILTIN_CATS !== 'undefined' && BUILTIN_CATS.includes(cat);
  if (cat === 'All') return;
  const existing = document.getElementById('edit-cat-dialog');
  if (existing) existing.remove();

  const currentColor = CAT_COLORS[cat] || '#94a3b8';

  const wrap = document.createElement('div');
  wrap.id = 'edit-cat-dialog';
  wrap.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center;';
  wrap.innerHTML = `
    <div style="background:var(--surf);border:1px solid var(--bdr);border-radius:10px;padding:20px;width:320px;box-shadow:0 12px 40px rgba(0,0,0,.4);">
      <div style="font-size:14px;font-weight:700;color:var(--txt);margin-bottom:14px;">Edit Category</div>
      <div style="margin-bottom:10px;">
        <label style="font-size:11px;color:var(--txt3);display:block;margin-bottom:4px;">Category Name</label>
        <input id="edit-cat-name" type="text" value="${cat}"
          style="width:100%;padding:8px 10px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:6px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;box-sizing:border-box;">
      </div>
      <div style="margin-bottom:14px;">
        <label style="font-size:11px;color:var(--txt3);display:block;margin-bottom:6px;">Color</label>
        <div id="edit-cat-swatches" style="display:flex;flex-wrap:wrap;gap:6px;">
          ${[currentColor, ...Object.values(CAT_COLORS_DEFAULT), ...CAT_COLOR_POOL].filter((c,i,a)=>a.indexOf(c)===i).map(c =>
            `<div onclick="document.querySelectorAll('#edit-cat-swatches .sw').forEach(s=>s.style.outline='none');this.style.outline='2px solid var(--txt)';document.getElementById('edit-cat-color').value='${c}';"
              class="sw" style="width:22px;height:22px;border-radius:50%;background:${c};cursor:pointer;outline:${c===currentColor?'2px solid var(--txt)':'none'};outline-offset:2px;"></div>`
          ).join('')}
          <input id="edit-cat-color" type="color" value="${currentColor}"
            style="width:22px;height:22px;border-radius:50%;border:none;cursor:pointer;padding:0;background:none;"
            onchange="document.querySelectorAll('#edit-cat-swatches .sw').forEach(s=>s.style.outline='none');"
            title="Custom color">
        </div>
      </div>
      <div id="edit-cat-err" style="color:#ef4444;font-size:11px;min-height:16px;margin-bottom:8px;"></div>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button onclick="document.getElementById('edit-cat-dialog').remove()"
          style="padding:7px 14px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:6px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;">Cancel</button>
        <button id="edit-cat-save"
          style="padding:7px 14px;background:var(--acc);border:none;border-radius:6px;color:#fff;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Save</button>
      </div>
    </div>`;
  document.body.appendChild(wrap);

  const nameInput = document.getElementById('edit-cat-name');
  if (nameInput) { nameInput.focus(); nameInput.setSelectionRange(0, nameInput.value.length); }

  document.getElementById('edit-cat-save').onclick = async () => {
    const newColor = document.getElementById('edit-cat-color').value;
    const newName = (document.getElementById('edit-cat-name').value.trim());
    const errEl = document.getElementById('edit-cat-err');

    if (!newName) { errEl.textContent = 'Name cannot be empty.'; return; }
    if (newName !== cat) {
      // Check for duplicate
      const allCats = getActiveCats();
      if (allCats.includes(newName)) { errEl.textContent = 'A category with that name already exists.'; return; }
      // Rename in custom list (if it's there)
      const custom = JSON.parse(localStorage.getItem('elite_custom_cats') || '[]');
      const idx = custom.indexOf(cat);
      if (idx >= 0) { custom[idx] = newName; localStorage.setItem('elite_custom_cats', JSON.stringify(custom)); }
      // Rename built-in entry in BUILTIN_CATS array in-memory so it persists in this session
      const bIdx = BUILTIN_CATS.indexOf(cat);
      if (bIdx >= 0) { BUILTIN_CATS[bIdx] = newName; }
      // Rename in ICONS (in-memory)
      ICONS.forEach(ic => { if (ic.cat === cat) ic.cat = newName; });
      // Rename in Supabase icons
      try {
        await sb.from('company_icons').update({ category: newName }).eq('category', cat);
      } catch(e) {}
      // Transfer color
      saveCatColor(newName, newColor);
      deleteCatColor(cat);
      // Update activeCat if needed
      if (activeCat === cat) activeCat = newName;
    } else {
      saveCatColor(cat, newColor);
    }

    wrap.remove();
    rebuildSidebar();
    populateCatSelect(document.getElementById('ic-cat') ? document.getElementById('ic-cat').value : null);
    toast('Category updated');
  };
}

// Rebuild sidebar category buttons from live ICONS array
function rebuildSidebar() {
  const cats = getActiveCats();
  document.getElementById('sb-cats').innerHTML = cats.map(c =>
    `<button class="scat${c===activeCat?' on':''}" style="color:${c===activeCat?'#fff':(CAT_COLORS[c]||'#94a3b8')};border-color:${CAT_COLORS[c]||'#94a3b8'};background:${c===activeCat?(CAT_COLORS[c]||'#38bdf8'):'transparent'}" onclick="setCat('${c}',this)" oncontextmenu="event.preventDefault();showEditCatDialog('${c}')" title="Right-click to edit category">${c}</button>`
  ).join('');
  // Long-press support for touch devices
  document.querySelectorAll('#sb-cats .scat').forEach(btn => {
    let lpt;
    btn.addEventListener('touchstart', e => { lpt = setTimeout(() => { e.preventDefault(); showEditCatDialog(btn.textContent); }, 600); }, {passive:true});
    btn.addEventListener('touchend', () => clearTimeout(lpt));
    btn.addEventListener('touchmove', () => clearTimeout(lpt));
  });
  renderIconGrid(activeCat);
}

// Prune any custom categories that have no icons assigned
function pruneEmptyCats() {
  const custom = JSON.parse(localStorage.getItem('elite_custom_cats') || '[]');
  // Count all icons (custom or built-in overrides) assigned to each category
  const usedCats = new Set(ICONS.map(i => i.cat));
  const kept = custom.filter(c => usedCats.has(c));
  if (kept.length !== custom.length) {
    localStorage.setItem('elite_custom_cats', JSON.stringify(kept));
    rebuildSidebar();
  }
}

async function loadCustomIcons() {
  function applyCustomIcon(ic) {
    const existing = ICONS.findIndex(i => i.id === ic.id);
    if (existing >= 0) {
      ICONS[existing] = { ...ICONS[existing], ...ic, custom: true };
    } else {
      ICONS.push({ ...ic, custom: true });
    }
  }

  // Load from localStorage first (instant)
  const local = JSON.parse(localStorage.getItem('elite_custom_icons') || '[]');
  local.forEach(ic => applyCustomIcon(ic));

  // Sync from company_icons table — shared across ALL users
  try {
    if (!CU) return;
    const { data } = await sb.from('company_icons').select('*').order('created_at', { ascending: true });
    if (data && data.length > 0) {
      const newLocal = [...local];
      data.forEach(ic => {
        applyCustomIcon(ic);
        if (!newLocal.find(l => l.id === ic.id)) {
          newLocal.push({ id: ic.id, name: ic.name, cat: ic.cat, f: ic.f, placement_rules: ic.placement_rules || [] });
        }
      });
      rebuildSidebar();
    }
  } catch(e) { console.warn('Custom icon sync:', e); }
}

async function saveCustomIconsToCloud(stored) {
  // Legacy — no-op, icons now saved individually to company_icons
}

// renderCustomIconList removed — editing via right-click/dblclick on icon grid

// Edit any icon — built-in or custom

// Load an existing icon image into _icProcessedPixels so color/shape editing works
// without needing to re-run AI background removal.
async function _loadIconIntoProcessedPixels(imgSrc) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise(res => { img.onload = res; img.onerror = res; img.src = imgSrc; });
  const w = img.naturalWidth || 120, h = img.naturalHeight || 120;
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  // Find bounding box of non-transparent pixels (or use full image if opaque)
  const d = ctx.getImageData(0, 0, w, h).data;
  let mnX=w, mxX=0, mnY=h, mxY=0, hasAlpha=false;
  for (let y=0; y<h; y++) for (let x=0; x<w; x++) {
    const a = d[(y*w+x)*4+3];
    if (a < 250) hasAlpha = true;
    if (a > 30) { if(x<mnX)mnX=x; if(x>mxX)mxX=x; if(y<mnY)mnY=y; if(y>mxY)mxY=y; }
  }
  // If no transparency found (opaque icon), use inner 70% to avoid capturing existing border
  if (!hasAlpha) {
    const pad = Math.round(Math.min(w,h) * 0.12);
    mnX=pad; mnY=pad; mxX=w-pad-1; mxY=h-pad-1;
  }
  if (mxX <= mnX || mxY <= mnY) { mnX=0; mnY=0; mxX=w-1; mxY=h-1; }
  window._icProcessedPixels = { tmp: cv, minX: mnX, maxX: mxX, minY: mnY, maxY: mxY };
}

async function editAnyIcon(id) {
  const ic = ICONS.find(i => i.id === id);
  if (!ic) return;

  // asis/originalSrc come from ICONS array (loaded from Supabase company_icons)

  _icEditingId = id;
  _icRawSource = null;
  window._icProcessedPixels = null;
  window._icAsIsMode = false;

  // Pre-fill metadata controls
  document.getElementById('ic-name').value = ic.name; document.getElementById('ic-preview-name').value = ic.name;
  document.getElementById('ic-name').value = ic.name; document.getElementById('ic-preview-name').value = ic.name;
  populateCatSelect(ic.cat || 'Control'); document.getElementById('ic-cat').value = ic.cat || 'Control'; document.getElementById('ic-cat').dataset.last = ic.cat || 'Control';

  // Show in upload area — for as-is icons show original photo, not finished icon
  const previewSrc = (ic.asis && ic.originalSrc) ? ic.originalSrc : ic.f;
  document.getElementById('ic-original-preview').src = previewSrc;
  document.getElementById('ic-preview-area').style.display = 'block';
  document.getElementById('ic-upload-hint').style.display = 'none';
  document.getElementById('ic-swap-hint').style.display = 'block';
  const hintText = document.getElementById('ic-upload-hint-text');
  if (hintText) hintText.textContent = 'Drop a new photo to replace this icon';

  // Check if this icon was saved as-is (no background removal) — do this BEFORE
  // _loadIconIntoProcessedPixels so we never run the finished icon through the pixel pipeline
  if (ic.asis) {
    window._icAsIsMode = true;
    window._icProcessedPixels = null;
    _icImageData = ic.originalSrc || ic.f;
    await useAsIsIcon();
    document.getElementById('ic-result-area').style.display = 'flex';
    document.getElementById('ic-name').value = ic.name; document.getElementById('ic-preview-name').value = ic.name;
    document.getElementById('ic-save-btn').textContent = '✅ Update Icon';
    const isCustomAsis = !!(ICONS.find(i=>i.id===id)?.custom);
    _setIconEditBtns(isCustomAsis);
    const btnAsis = document.getElementById('ic-process-btn');
    btnAsis.disabled = false; btnAsis.style.opacity = '1'; btnAsis.style.cursor = 'pointer';
    btnAsis.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l1.2 4.8L14 6l-4.8 1.2L8 12 6.8 7.2 2 6l4.8-1.2z"/></svg> AI Background Remover';
    const asIsEditBtn = document.getElementById('ic-asis-btn');
    if (asIsEditBtn) { asIsEditBtn.disabled = false; asIsEditBtn.style.opacity = '1'; asIsEditBtn.style.cursor = 'pointer'; asIsEditBtn.style.color = 'var(--txt)'; }
    syncPreviewShapeBtns();
    document.querySelector('#icon-creator-modal .mbox').scrollTop = 0;
    icRulesSet(ic.placement_rules || []);
    toast('Editing "' + ic.name + '" — adjust color, shape, or name and save');
    return;
  }

  // AI-processed icon: pre-load into _icProcessedPixels so color editing works immediately.
  // The rawStored path below will overwrite this with a cleaner source if available.
  await _loadIconIntoProcessedPixels(ic.f);
  const rawStored = null; // elite_raw no longer cached in localStorage
  if (rawStored) {
    // We have a clean bg-removed version — load it directly and skip AI
    const rawImg = new Image();
    await new Promise(res => { rawImg.onload = res; rawImg.src = rawStored; });
    const rawCv = document.createElement('canvas');
    rawCv.width = rawImg.width; rawCv.height = rawImg.height;
    rawCv.getContext('2d').drawImage(rawImg, 0, 0);
    // Find bounding box
    const rd = rawCv.getContext('2d').getImageData(0, 0, rawCv.width, rawCv.height).data;
    let mnX=rawCv.width,mxX=0,mnY=rawCv.height,mxY=0;
    for (let y=0;y<rawCv.height;y++) for (let x=0;x<rawCv.width;x++) {
      if (rd[(y*rawCv.width+x)*4+3]>30) { if(x<mnX)mnX=x;if(x>mxX)mxX=x;if(y<mnY)mnY=y;if(y>mxY)mxY=y; }
    }
    window._icProcessedPixels = { tmp: rawCv, minX: mnX, maxX: mxX, minY: mnY, maxY: mxY };
    _icRawSource = window._icProcessedPixels;
    _icImageData = rawStored;

    // Re-composite immediately with current color/shape
    const strokeColor = document.getElementById('ic-stroke-color').value || '#f97316';
    await recompositeFromPixels(strokeColor);
    document.getElementById('ic-result-area').style.display = 'flex';
    document.getElementById('ic-name').value = ic.name; document.getElementById('ic-preview-name').value = ic.name;
    document.getElementById('ic-save-btn').textContent = '✅ Update Icon';
    const isCustom2 = !!(ICONS.find(i=>i.id===id)?.custom);
    _setIconEditBtns(isCustom2);
    syncPreviewShapeBtns();
    const btn2 = document.getElementById('ic-process-btn');
    btn2.disabled = false; btn2.style.opacity = '1'; btn2.style.cursor = 'pointer';
    btn2.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l1.2 4.8L14 6l-4.8 1.2L8 12 6.8 7.2 2 6l4.8-1.2z"/></svg> AI Background Remover';
    document.querySelector('#icon-creator-modal .mbox').scrollTop = 0;
    icRulesSet(ic.placement_rules || []);
    toast('Editing "' + ic.name + '" — adjust color, shape, or name and save');
    return;
  }

  // No raw source saved — show current icon and prompt to re-process with AI
  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise(res => { img.onload = res; img.onerror = res; img.src = ic.f; });
  const tmp = document.createElement('canvas');
  tmp.width = 120; tmp.height = 120;
  tmp.getContext('2d').drawImage(img, 0, 0, 120, 120);
  _icImageData = tmp.toDataURL('image/png');

  const cv = document.getElementById('ic-result-canvas');
  cv.width = 120; cv.height = 120;
  cv.getContext('2d').drawImage(img, 0, 0, 120, 120);
  document.getElementById('ic-result-area').style.display = 'flex';
  document.getElementById('ic-name').value = ic.name; document.getElementById('ic-preview-name').value = ic.name;
  document.getElementById('ic-save-btn').textContent = '✅ Update Icon';
  const isCustom = !!(ICONS.find(i=>i.id===id)?.custom);
  _setIconEditBtns(isCustom);

  const btn = document.getElementById('ic-process-btn');
  btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer';
  btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l1.2 4.8L14 6l-4.8 1.2L8 12 6.8 7.2 2 6l4.8-1.2z"/></svg> AI Background Remover';
  document.querySelector('#icon-creator-modal .mbox').scrollTop = 0;
  toast('Run "AI Background Remover" to enable live color and shape editing');
}

// Edit custom icon (legacy — delegates to editAnyIcon)
function editCustomIcon(id) { editAnyIcon(id); }

// The actual stored-icon edit (called from custom list)
async function editCustomIcon(id) {
  const ic = ICONS.find(i => i.id === id);
  if (!ic) return;

  _icEditingId = id;
  window._icProcessedPixels = null;
  window._icAsIsMode = false;

  // Pre-fill controls
  document.getElementById('ic-name').value = ic.name; document.getElementById('ic-preview-name').value = ic.name;
  document.getElementById('ic-name').value = ic.name; document.getElementById('ic-preview-name').value = ic.name;
  populateCatSelect(ic.cat);
  const catSel = document.getElementById('ic-cat');
  if (catSel) { catSel.value = ic.cat; catSel.dataset.last = ic.cat; }

  document.getElementById('ic-preview-area').style.display = 'block';
  document.getElementById('ic-upload-hint').style.display = 'none';
  document.getElementById('ic-swap-hint').style.display = 'block';
  const hintText = document.getElementById('ic-upload-hint-text');
  if (hintText) hintText.textContent = 'Drop a new photo to replace image';

  // Enable both buttons
  const btn = document.getElementById('ic-process-btn');
  btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer';
  btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l1.2 4.8L14 6l-4.8 1.2L8 12 6.8 7.2 2 6l4.8-1.2z"/></svg> AI Background Remover';
  const asIsBtn = document.getElementById('ic-asis-btn');
  if (asIsBtn) { asIsBtn.disabled = false; asIsBtn.style.opacity = '1'; asIsBtn.style.cursor = 'pointer'; asIsBtn.style.color = 'var(--txt)'; }

  // As-is icon — show original photo, render with border, skip pixel pipeline entirely
  if (ic.asis) {
    window._icAsIsMode = true;
    _icImageData = ic.originalSrc || ic.f;
    document.getElementById('ic-original-preview').src = _icImageData;
    await useAsIsIcon();
    document.getElementById('ic-result-area').style.display = 'flex';
    document.getElementById('ic-name').value = ic.name; document.getElementById('ic-preview-name').value = ic.name;
    document.getElementById('ic-save-btn').textContent = '✅ Update Icon';
    _setIconEditBtns(true);
    syncPreviewShapeBtns();
    document.querySelector('#icon-creator-modal .mbox').scrollTop = 0;
    icRulesSet(ic.placement_rules || []);
    toast('Editing "' + ic.name + '" — adjust color, shape, or name and save');
    return;
  }

  // AI-processed icon — show finished icon as source preview, load into pixel pipeline
  _icImageData = ic.f;
  document.getElementById('ic-original-preview').src = ic.f;
  const img = new Image();
  img.onload = () => {
    const cv = document.getElementById('ic-result-canvas');
    cv.width = 120; cv.height = 120;
    cv.getContext('2d').drawImage(img, 0, 0, 120, 120);
    document.getElementById('ic-result-area').style.display = 'flex';
    document.getElementById('ic-name').value = ic.name; document.getElementById('ic-preview-name').value = ic.name;
    document.getElementById('ic-save-btn').textContent = '✅ Update Icon';
    _setIconEditBtns(true);
    _loadIconIntoProcessedPixels(ic.f);
  };
  img.src = ic.f;

  document.querySelector('#icon-creator-modal .mbox').scrollTop = 0;
  icRulesSet(ic.placement_rules || []);
  toast('Editing "' + ic.name + '" — upload a new photo or adjust color/shape then update');
}

// Show/hide both the delete and duplicate buttons together
function _setIconEditBtns(visible) {
  // Delete is always available — system icons can be deleted too
  const del = document.getElementById('ic-delete-btn');
  const dup = document.getElementById('ic-dupe-btn');
  if (del) del.style.display = _icEditingId ? 'flex' : 'none';
  if (dup) dup.style.display = visible ? 'flex' : 'none';
}

// Save a copy of the current icon under a new name — does NOT overwrite the original
async function duplicateCustomIcon() {
  const cv = document.getElementById('ic-result-canvas');
  const currentName = document.getElementById('ic-name').value.trim() || 'Icon';
  const existingNames = ICONS.map(i => i.name.toLowerCase());

  // Keep prompting until a unique name is entered or user cancels
  let newName = '';
  while (true) {
    newName = prompt('Name for the duplicate (must be unique):', newName || currentName + ' Copy');
    if (!newName?.trim()) return; // cancelled
    if (newName.trim().toLowerCase() === currentName.toLowerCase()) {
      alert('The duplicate must have a different name than the original.');
      newName = '';
      continue;
    }
    if (existingNames.includes(newName.trim().toLowerCase())) {
      alert('"' + newName.trim() + '" already exists. Please choose a different name.');
      continue;
    }
    break;
  }

  const cat = document.getElementById('ic-cat').value;
  const dataUrl = cv.toDataURL('image/png');
  const id = 'custom-' + Date.now();

  const entry = { id, name: newName.trim(), cat, f: dataUrl };
  if (window._icAsIsMode) { entry.asis = true; entry.originalSrc = _icImageData; }
  ICONS.push({ id, name: newName.trim(), cat, f: dataUrl, custom: true });
  try { await sb.from('company_icons').insert({ id, name: newName.trim(), cat, f: dataUrl, created_by: CU?.id }); } catch(e) { console.warn('company_icons insert:', e); }

  pruneEmptyCats();
  rebuildSidebar();
  toast('✅ Duplicate saved: "' + newName.trim() + '"');
}

async function deleteIconFromEditor() {
  if (!_icEditingId) return;
  if (!confirm('Delete this icon from your library?')) return;
  const idx = ICONS.findIndex(i => i.id === _icEditingId);
  if (idx >= 0) ICONS.splice(idx, 1);
  try { await sb.from('company_icons').delete().eq('id', _icEditingId); } catch(e) { console.warn('delete icon:', e); }
  pruneEmptyCats();
  renderIconGrid(activeCat);
  closeModal('icon-creator-modal');
  toast('Icon deleted');
}

async function deleteCustomIcon(id) {
  if (!confirm('Delete this custom icon for all users?')) return;
  // Icons stored in Supabase company_icons — no localStorage
  // Remove from live ICONS array
  const idx = ICONS.findIndex(i => i.id === id);
  if (idx >= 0) ICONS.splice(idx, 1);
  // Remove from company_icons (shared)
  try { await sb.from('company_icons').delete().eq('id', id); } catch(e) { console.warn('company_icons delete:', e); }
  pruneEmptyCats();
  rebuildSidebar();
  toast('✅ Icon deleted for all users');
}

// ═══════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════
// Spacebar pan state
let spaceDown = false, panActive = false, panStart = null, panScrollStart = null;

function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light');
  localStorage.setItem('eliteTheme', isLight ? 'light' : 'dark');
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  if (isLight) {
    // Show moon icon (switch to dark)
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    label.textContent = 'Dark';
  } else {
    // Show sun icon (switch to light)
    icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
    label.textContent = 'Light';
  }
}

function initTheme() {
  const saved = localStorage.getItem('eliteTheme');
  if (saved === 'light') {
    document.documentElement.classList.add('light');
    setTimeout(() => {
      const icon = document.getElementById('theme-icon');
      const label = document.getElementById('theme-label');
      if (icon) icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
      if (label) label.textContent = 'Dark';
    }, 0);
  }
}


// ═══════════════════════════════════════════════════════════
// iPAD LAYOUT CONTROLS
// ═══════════════════════════════════════════════════════════
let _ipadToolbarHidden = false;
let _ipadStripHidden   = false;

function isIPad() {
  return window.matchMedia('(min-width:768px) and (max-width:1366px) and (pointer:coarse)').matches
    || (/iPad/i.test(navigator.userAgent))
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function initIPadMode() {
  if (!isIPad()) return;
  _ipadToolbarHidden = false;
  _ipadStripHidden   = false;
  // Sidebar hidden by default on iPad to maximise canvas
  const sdbEl = document.getElementById('sidebar');
  if (sdbEl && !sdbEl.classList.contains('hidden')) sdbEl.classList.add('hidden');
  updateIpadBtns();
}

// ── iPHONE PAGE NAV FUNCTIONS ──
function updateIphonePageNav() {
  const nav = document.getElementById('iphone-page-nav');
  const label = document.getElementById('iphone-page-label');
  const prev = document.getElementById('iphone-prev-btn');
  const next = document.getElementById('iphone-next-btn');
  if (!pdfDoc) { if (nav) nav.style.display = 'none'; return; }
  if (window.innerWidth > 767) { if (nav) nav.style.display = 'none'; return; }
  nav.style.display = 'flex';
  label.textContent = iphoneCurrentPage + ' / ' + pdfDoc.numPages;
  prev.disabled = iphoneCurrentPage <= 1;
  next.disabled = iphoneCurrentPage >= pdfDoc.numPages;
}

async function iphoneChangePage(dir) {
  if (!pdfDoc) return;
  const newPage = iphoneCurrentPage + dir;
  if (newPage < 1 || newPage > pdfDoc.numPages) return;
  iphoneCurrentPage = newPage;
  showLoad('Loading page ' + iphoneCurrentPage + '...');
  // Clear annotations for new page view
  strokes = []; icons = [];
  await renderPages();
  const wrap = document.getElementById('cwrap');
  if (wrap) { wrap.scrollLeft = 0; wrap.scrollTop = 0; }
  hideLoad();
}

// ── iPHONE NAV FUNCTIONS ──
let _iphoneToolSheetOpen = false;
let _iphoneSidebarOpen = false;

function iphoneSetTool(tool) {
  setTool(tool);
  // Update bottom nav active state
  document.querySelectorAll('.iphone-nav-btn').forEach(b => b.classList.remove('on'));
  if (tool === 'select') document.getElementById('iphone-btn-select')?.classList.add('on');
  else document.getElementById('iphone-btn-draw')?.classList.add('on');
  // Update tool sheet items
  document.querySelectorAll('.iphone-tool-item').forEach(b => b.classList.remove('on'));
  const ti = document.getElementById('iphone-tool-' + tool);
  if (ti) ti.classList.add('on');
  // Close tool sheet after selection
  closeIphoneToolSheet();
}

function toggleIphoneToolSheet() {
  _iphoneToolSheetOpen = !_iphoneToolSheetOpen;
  const sheet = document.getElementById('iphone-tool-sheet');
  if (sheet) sheet.classList.toggle('open', _iphoneToolSheetOpen);
  document.getElementById('iphone-btn-draw')?.classList.toggle('on', _iphoneToolSheetOpen);
  // Close sidebar if open
  if (_iphoneToolSheetOpen && _iphoneSidebarOpen) iphoneCloseSidebar();
}

function closeIphoneToolSheet() {
  _iphoneToolSheetOpen = false;
  document.getElementById('iphone-tool-sheet')?.classList.remove('open');
}

function iphoneToggleSidebar() {
  if (_iphoneSidebarOpen) iphoneCloseSidebar();
  else iphoneOpenSidebar();
}

function iphoneOpenSidebar() {
  _iphoneSidebarOpen = true;
  document.getElementById('sidebar')?.classList.remove('hidden');
  document.getElementById('iphone-btn-icons')?.classList.add('on');
  closeIphoneToolSheet();
}

function iphoneCloseSidebar() {
  _iphoneSidebarOpen = false;
  document.getElementById('sidebar')?.classList.add('hidden');
  document.getElementById('iphone-btn-icons')?.classList.remove('on');
}

function toggleIphoneHamburger() {
  const existing = document.getElementById('iphone-hamburger-sheet');
  if (existing) { existing.remove(); return; }
  const sheet = document.createElement('div');
  sheet.id = 'iphone-hamburger-sheet';
  sheet.style.cssText = 'position:fixed;top:var(--mbh);left:0;right:0;background:var(--surf);border-bottom:1px solid var(--bdr2);z-index:900;padding:8px 12px 16px;box-shadow:0 8px 24px rgba(0,0,0,.4);max-height:80vh;overflow-y:auto;';

  const userNm = document.getElementById('user-nm')?.textContent || '';
  const userRl = document.getElementById('user-rl')?.textContent || '';
  const projName = document.getElementById('pname')?.textContent || 'No project open';
  const section = (label) => `<div style="font-size:9px;font-weight:700;letter-spacing:1px;color:var(--txt3);text-transform:uppercase;margin:10px 0 4px;padding:0 4px;">${label}</div>`;
  const item = (label, fn, red=false) => `<div onclick="document.getElementById('iphone-hamburger-sheet')?.remove();${fn}" style="padding:11px 12px;border-radius:8px;font-size:13px;font-weight:500;color:${red?'var(--red)':'var(--txt)'};cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;" ontouchstart="this.style.background='var(--surf2)'" ontouchend="this.style.background=''">${label}</div>`;

  sheet.innerHTML = `
    <div style="font-size:11px;color:var(--txt3);padding:4px 12px 8px;border-bottom:1px solid var(--bdr);margin-bottom:4px;">${projName}</div>
    ${section('File')}
    ${item('New Project', 'showNewJobModal()')}
    ${item('Open Project', 'goToDashboard()')}
    ${item('💾 Save', 'showSaveMenu()')}
    ${item('📤 Export to PDF', 'saveCurrentTab()')}
    ${item('Close Project', 'closeProject()', true)}
    ${section('Edit')}
    ${item('Undo', 'doUndo()')}
    ${item('Redo', 'doRedo()')}
    ${item('Duplicate Selected', 'dupeSel()')}
    ${item('Delete Selected', 'delSel()', true)}
    ${item('Clear All Annotations', 'clearAll()', true)}
    ${section('View')}
    ${item('Zoom In', 'zoomBy(.15)')}
    ${item('Zoom Out', 'zoomBy(-.15)')}
    ${item('Fit to Screen', 'zoomFit()')}
    ${item('Toggle ' + (document.documentElement.classList.contains('light') ? 'Dark' : 'Light') + ' Mode', 'toggleTheme()')}
    ${section('Account')}
    <div style="padding:10px 12px;display:flex;align-items:center;gap:10px;border-radius:8px;background:var(--surf2);margin-bottom:2px;">
      <div style="width:36px;height:36px;border-radius:50%;background:var(--acc);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;flex-shrink:0;">${(userNm||'?')[0].toUpperCase()}</div>
      <div><div style="font-size:13px;font-weight:600;color:var(--txt);">${userNm}</div><div style="font-size:11px;color:var(--acc2);font-weight:700;letter-spacing:.5px;">${userRl}</div></div>
    </div>
    ${item('🚪 Sign Out', 'doSignOut()', true)}
  `;
  document.body.appendChild(sheet);
  setTimeout(() => {
    document.addEventListener('touchstart', function closer(e) {
      if (!sheet.contains(e.target) && !document.getElementById('iphone-hamburger')?.contains(e.target)) {
        sheet.remove();
        document.removeEventListener('touchstart', closer);
      }
    }, { passive: true });
  }, 100);
}

function toggleIphoneMore() {
  // Show more actions sheet
  const existing = document.getElementById('iphone-more-sheet');
  if (existing) { existing.remove(); return; }
  const sheet = document.createElement('div');
  sheet.id = 'iphone-more-sheet';
  sheet.style.cssText = 'position:fixed;bottom:64px;left:0;right:0;background:var(--surf);border-top:1px solid var(--bdr2);z-index:599;padding:12px 16px 16px;border-radius:16px 16px 0 0;box-shadow:0 -8px 32px rgba(0,0,0,.4);';
  sheet.innerHTML = `
    <div style="width:36px;height:4px;background:var(--bdr2);border-radius:2px;margin:0 auto 14px;"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      <button onclick="zoomFit();this.closest('#iphone-more-sheet').remove()" style="padding:14px;border-radius:10px;background:var(--surf2);border:1px solid var(--bdr);color:var(--txt);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
        Fit Screen
      </button>
      <button onclick="this.closest('#iphone-more-sheet').remove();showSaveMenu()" style="padding:14px;border-radius:10px;background:var(--acc);border:none;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/></svg>
        Save
      </button>
      <button onclick="this.closest('#iphone-more-sheet').remove();saveCurrentTab()" style="padding:14px;border-radius:10px;background:#0e7a5a;border:none;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Export to PDF
      </button>
      <button onclick="runPageMerger();this.closest('#iphone-more-sheet').remove()" style="padding:14px;border-radius:10px;background:linear-gradient(135deg,#1d6fdb,#38bdf8);border:none;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;">
        <svg width="22" height="22" viewBox="0 0 36 36" fill="none"><g class="s0"><path d="M18 4 L20 12 L28 14 L20 16 L18 24 L16 16 L8 14 L16 12Z" fill="white"/></g></svg>
        AI Merge
      </button>
    </div>`;
  document.body.appendChild(sheet);
  // Close on outside tap
  setTimeout(() => {
    document.addEventListener('touchstart', function closer(e) {
      if (!sheet.contains(e.target) && !document.getElementById('iphone-btn-more')?.contains(e.target)) {
        sheet.remove();
        document.removeEventListener('touchstart', closer);
      }
    }, { passive: true });
  }, 100);
}

// Close tool sheet when tapping canvas
document.addEventListener('touchstart', function(e) {
  if (_iphoneToolSheetOpen && !document.getElementById('iphone-tool-sheet')?.contains(e.target) 
      && !document.getElementById('iphone-btn-draw')?.contains(e.target)) {
    closeIphoneToolSheet();
  }
  if (_iphoneSidebarOpen && !document.getElementById('sidebar')?.contains(e.target)
      && !document.getElementById('iphone-btn-icons')?.contains(e.target)) {
    iphoneCloseSidebar();
  }
}, { passive: true });

function toggleIpadToolbar() {
  _ipadToolbarHidden = !_ipadToolbarHidden;
  document.getElementById('toolbar').classList.toggle('ipad-hidden', _ipadToolbarHidden);
  updateIpadBtns();
}

function toggleIpadStrip() {
  _ipadStripHidden = !_ipadStripHidden;
  document.getElementById('page-strip').classList.toggle('ipad-hidden', _ipadStripHidden);
  updateIpadBtns();
}

function updateIpadBtns() {
  const tb = document.getElementById('ipad-toolbar-btn');
  const ipadStripBtn = document.getElementById('ipad-strip-btn');
  const sdb = document.getElementById('ipad-sidebar-btn');
  if (tb) tb.classList.toggle('active', !_ipadToolbarHidden);
  if (ipadStripBtn) ipadStripBtn.classList.toggle('active', !_ipadStripHidden);
  const sidebar = document.getElementById('sidebar');
  if (sdb && sidebar) sdb.classList.toggle('active', !sidebar.classList.contains('hidden'));
}

// ═══════════════════════════════════════════════════════════
// APPLE PENCIL SUPPORT
// ═══════════════════════════════════════════════════════════
let pencilActive = false;
let _pencilLastTool = 'select';
let _pencilDoubleTapFired = false;

function initApplePencil() {
  if (!isIPad()) return;

  // Pointer events distinguish Pencil (pointerType='pen') from finger (pointerType='touch')
  annCv.addEventListener('pointerdown', onPencilDown, { passive: false });
  annCv.addEventListener('pointermove', onPencilMove, { passive: false });
  annCv.addEventListener('pointerup',   onPencilUp,   { passive: false });
  annCv.addEventListener('pointercancel', onPencilUp, { passive: false });

  // Apple Pencil 2 double-tap detection
  // iOS fires button===5 on some versions; on others detect via rapid double-tap timing
  let _lastPencilTap = 0;
  document.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'pen') return;

    const isHardwareDoubleTap = e.button === 5; // Pencil 2 on iOS 16+
    const now = Date.now();
    const isRapidTap = (now - _lastPencilTap) < 300;
    _lastPencilTap = now;

    if (isHardwareDoubleTap || isRapidTap) {
      e.preventDefault();
      e.stopPropagation();
      _pencilDoubleTapFired = true; // suppress onPencilDown from also firing
      if (tool === 'select') {
        setTool(_pencilLastTool || 'select');
      } else {
        _pencilLastTool = tool;
        setTool('select');
      }
    }
  }, true); // capture phase so it runs before onPencilDown
}

function onPencilDown(e) {
  if (e.pointerType !== 'pen') return;
  if (_pencilDoubleTapFired) { _pencilDoubleTapFired = false; return; } // swallow the tap after double-tap
  e.preventDefault();
  e.stopPropagation();
  pencilActive = true;
  annCv.setPointerCapture(e.pointerId);
  onDown({ clientX: e.clientX, clientY: e.clientY });
}

function onPencilMove(e) {
  if (e.pointerType !== 'pen' || !pencilActive) return;
  e.preventDefault();
  e.stopPropagation();
  onMove({ clientX: e.clientX, clientY: e.clientY });
}

function onPencilUp(e) {
  if (e.pointerType !== 'pen') return;
  e.preventDefault();
  e.stopPropagation();
  pencilActive = false;
  onUp();
}

function setupKeys() {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Spacebar = hand/pan tool (like Illustrator)
    if (e.code === 'Space' && !spaceDown) {
      spaceDown = true;
      e.preventDefault();
      e.stopPropagation();
      annCv.style.cursor = 'grab';
      return;
    }
    if (e.code === 'Space') {
      e.preventDefault(); // prevent space from triggering browser scroll
      return;
    }

    if (e.metaKey || e.ctrlKey) {
      if (e.key==='z'){e.preventDefault();e.shiftKey?doRedo():doUndo();}
      if (e.key==='y'){e.preventDefault();doRedo();}
      if (e.key==='s'&&!e.shiftKey){e.preventDefault();doSave();}
      if (e.key==='s'&&e.shiftKey){e.preventDefault();saveAsVariant();}
      if (e.key==='n'){e.preventDefault();showNewJobModal();}
      if (e.key==='e'){e.preventDefault();showExport();}
      // ⌘N removed — no new project workflow
      if (e.key==='c'){e.preventDefault();copySelected();}
      if (e.key==='v'){e.preventDefault();pasteCopied();}
      if (e.key==='d'){e.preventDefault();dupeSel();}
      // Ctrl+= or Ctrl++ zoom in, Ctrl+- zoom out, Ctrl+0 fit
      if (e.key==='+' || e.key==='=') { e.preventDefault(); const w=document.getElementById('cwrap'); zoomBy(0.15); }
      if (e.key==='-' || e.key==='_') { e.preventDefault(); const w=document.getElementById('cwrap'); zoomBy(-0.15); }
      if (e.key==='0') { e.preventDefault(); zoomFit(); }
    } else {
      const m = {v:'select',p:'pen',l:'line',r:'rect',c:'circle',a:'arrow',t:'text',e:'eraser',w:'cover'};
      if (m[e.key.toLowerCase()]) setTool(m[e.key.toLowerCase()]);
      if (tool === 'cover' && (e.key === '[' || e.key === ']')) {
        e.preventDefault();
        setCoverBrushSize(coverBrushSize + (e.key === ']' ? 6 : -6));
      }
      if (e.key==='Escape') { pickIcon=null; document.querySelectorAll('.ic').forEach(i=>i.classList.remove('on')); annCv.style.cursor='default'; sel=null; multiSel=[]; closeItb(); closeStb(); redraw(); }
      if (e.key==='Delete'||e.key==='Backspace') delSel();
      // Arrow keys — nudge selected icon (or stroke), don't scroll canvas
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key) && sel) {
        e.preventDefault();
        const _step = e.shiftKey ? 10 : 1; // shift = big nudge
        const rs = renderScale || 1;
        const _d = _step / rs;
        if (sel.type === 'icon') {
          const _targets = multiSel.length > 1 ? multiSel : [sel.index];
          _targets.forEach(idx => {
            const pi = icons[idx];
            if (e.key==='ArrowUp')    pi.y -= _d;
            if (e.key==='ArrowDown')  pi.y += _d;
            if (e.key==='ArrowLeft')  pi.x -= _d;
            if (e.key==='ArrowRight') pi.x += _d;
          });
          redraw(); autoSave();
        } else if (sel.type === 'stroke') {
          const _s = strokes[sel.index];
          if (e.key==='ArrowUp')    moveStroke(sel.index, _s.x ?? _s.from?.x ?? 0, (_s.y ?? _s.from?.y ?? 0) - _d);
          if (e.key==='ArrowDown')  moveStroke(sel.index, _s.x ?? _s.from?.x ?? 0, (_s.y ?? _s.from?.y ?? 0) + _d);
          if (e.key==='ArrowLeft')  moveStroke(sel.index, (_s.x ?? _s.from?.x ?? 0) - _d, _s.y ?? _s.from?.y ?? 0);
          if (e.key==='ArrowRight') moveStroke(sel.index, (_s.x ?? _s.from?.x ?? 0) + _d, _s.y ?? _s.from?.y ?? 0);
          redraw(); autoSave();
        }
      }
    }
  });

  document.addEventListener('keyup', e => {
    if (e.code === 'Space') {
      spaceDown = false;
      panActive = false;
      panStart = null;
      annCv.style.cursor = 'default';
    }
  });

  // Spacebar pan: mousedown/move/up on canvas
  annCv.addEventListener('mousedown', e => {
    if (spaceDown) {
      panActive = true;
      panStart = { x: e.clientX, y: e.clientY };
      const wrap = document.getElementById('cwrap');
      panScrollStart = { left: wrap.scrollLeft, top: wrap.scrollTop };
      annCv.style.cursor = 'grabbing';
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  document.addEventListener('mousemove', e => {
    if (!panActive || !panStart) return;
    e.preventDefault();
    const wrap = document.getElementById('cwrap');
    // Mouse delta is in screen pixels. The scroll container scrolls in CSS pixels.
    // When ccon has a CSS scale transform, screen pixels == CSS pixels for the
    // wrapper scroll (the wrapper itself is not scaled), so use 1:1.
    // BUT the canvas content appears scaled, so the visual pan speed must match:
    // moving mouse 100px should scroll 100/ratio CSS px so the canvas content
    // moves exactly 100 screen px.
    const ratio = (pdfScale > 0 && renderScale > 0) ? pdfScale / renderScale : 1;
    const r = ratio > 0.01 ? ratio : 1;
    wrap.scrollLeft = panScrollStart.left - (e.clientX - panStart.x) / r;
    wrap.scrollTop  = panScrollStart.top  - (e.clientY - panStart.y) / r;
  }, { passive: false });

  document.addEventListener('mouseup', e => {
    if (panActive) {
      panActive = false;
      panStart = null;
      annCv.style.cursor = spaceDown ? 'grab' : 'default';
    }
  });

  // Ctrl+scroll wheel zoom (like Illustrator) — zoom toward cursor
  document.getElementById('cwrap').addEventListener('wheel', e => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const wrap = document.getElementById('cwrap');
      const rect = wrap.getBoundingClientRect();
      const rawDelta = Math.abs(e.deltaY);
      const step = rawDelta > 100 ? 0.15 : rawDelta > 20 ? 0.1 : 0.05;
      zoomBy(e.deltaY < 0 ? step : -step);
    }
  }, { passive: false });
}

// ═══════════════════════════════════════════════════════════
// SIDEBAR TABS
// ═══════════════════════════════════════════════════════════
function switchTab(tab) {
  if (tab === 'ai') loadAIRules();
  // room map is now in AI tab

  const panels = { manual: 'tab-manual-content', ai: 'tab-ai-content' };
  Object.entries(panels).forEach(([t, id]) => {
    const el = document.getElementById(id);
    if (el) el.style.display = t === tab ? 'flex' : 'none';
  });

  // Show map overlay when on AI tab (room map is now inside AI tab)
  const mapOverlay = document.getElementById('map-overlay');
  if (mapOverlay) mapOverlay.classList.toggle('active', tab === 'ai');

  // Update tab button styles
  const tabStyles = {
    manual: { bg: 'var(--surf2)', color: 'var(--acc2)', border: 'var(--acc)' },
    ai:     { bg: 'linear-gradient(135deg,#1d6fdb,#38bdf8)', color: '#fff', border: 'rgba(255,255,255,.5)' },
  };
  ['manual','ai'].forEach(t => {
    const btn = document.getElementById('tab-' + t);
    if (!btn) return;
    const active = t === tab;
    const s = tabStyles[t];
    btn.style.background = active ? s.bg : 'transparent';
    btn.style.color = active ? s.color : 'var(--txt3)';
    btn.style.borderBottom = active ? '2px solid ' + s.border : '2px solid transparent';
  });
}

// ═══════════════════════════════════════════════════════════
// ELITE AI — ICON PLACEMENT
// ═══════════════════════════════════════════════════════════
// Anthropic API key — stored in browser localStorage, never leaves your device
function getApiKey() {
  return localStorage.getItem('elite_anthropic_key') || null;
}
function requireApiKey() {
  const key = getApiKey();
  if (!key) {
    toast('⚠️ AI not available — contact your administrator', true);
    return null;
  }
  return key;
}
function saveApiKey(val) {
  if (val && val.startsWith('sk-ant')) {
    localStorage.setItem('elite_anthropic_key', val);
    // Sync to Supabase so all devices get it
    syncApiKeyToCloud(val);
  }
}
async function syncApiKeyToCloud(key) {
  try {
    if (!CU) return;
    await sb.from('markup_users').update({ anthropic_key: key }).eq('id', CU.id);
  } catch(e) { console.warn('API key cloud sync failed:', e); }
}
async function loadApiKeyFromCloud() {
  try {
    if (!CU) return;
    // Fetch shared app-level key from app_config table
    const { data } = await sb.from('app_config').select('value').eq('key', 'anthropic_key').single();
    if (data?.value && data.value.startsWith('sk-ant')) {
      localStorage.setItem('elite_anthropic_key', data.value);
      const inp = document.getElementById('ai-key-input');
      if (inp) inp.value = data.value;
    }
  } catch(e) {
    // Fallback: try per-user key for backward compatibility
    try {
      const { data } = await sb.from('markup_users').select('anthropic_key').eq('id', CU.id).single();
      if (data?.anthropic_key && data.anthropic_key.startsWith('sk-ant')) {
        localStorage.setItem('elite_anthropic_key', data.anthropic_key);
        const inp = document.getElementById('ai-key-input');
        if (inp) inp.value = data.anthropic_key;
      }
    } catch(e2) { console.warn('API key load failed:', e2); }
  }
}

// ═══════════════════════════════════════════════════════════
// ROOM MAP SYSTEM
// ═══════════════════════════════════════════════════════════
let mapBoxes = [];
let mapLabels = [];
let mapDrawing = false;
let mapDrawStartPt = null;
let mapDrawMode = false;
let mapLayerVisibility = { Space: true, Opening: true, Structure: true, Other: true };

function toggleLayer(category) {
  mapLayerVisibility[category] = !mapLayerVisibility[category];
  const btn = document.getElementById('layer-' + category);
  if (btn) {
    btn.style.background = mapLayerVisibility[category] ? 'var(--acc)' : 'var(--surf2)';
    btn.style.color = mapLayerVisibility[category] ? '#fff' : 'var(--txt3)';
  }
  renderMapOverlay();
}
let selectedMapBox = null;

async function loadLabelsFromDB() {
  if (mapLabels.length > 0) { renderLabelPicker(); return; }
  try {
    const { data } = await sb.from('floor_plan_labels').select('*').order('sort_order');
    if (data) { mapLabels = data; renderLabelPicker(); }
  } catch(e) { console.warn('loadLabels:', e); }
}

function renderLabelPicker() {
  const list = document.getElementById('map-label-list');
  if (!list) return;
  const categories = [...new Set(mapLabels.map(l => l.category))];
  list.innerHTML = categories.map(cat =>
    '<div style="font-size:9px;font-weight:700;letter-spacing:1px;color:var(--txt3);text-transform:uppercase;margin:4px 0 2px;">' + cat + '</div>' +
    mapLabels.filter(l => l.category === cat).map(l =>
      '<button onclick="applyLabelToBox(' + JSON.stringify(l.id) + ',' + JSON.stringify(l.name) + ',' + JSON.stringify(l.color) + ',' + JSON.stringify(l.category) + ')" ' +
      'style="width:100%;padding:4px 8px;text-align:left;border-radius:5px;background:' + l.color + '22;border:1px solid ' + l.color + '44;' +
      'color:var(--txt);font-family:\'DM Sans\',sans-serif;font-size:11px;cursor:pointer;display:flex;align-items:center;gap:6px;margin-bottom:2px;">' +
      '<span style="width:10px;height:10px;border-radius:2px;background:' + l.color + ';flex-shrink:0;"></span>' + l.name + '</button>'
    ).join('')
  ).join('');
}

async function addNewLabel() {
  const name = document.getElementById('new-label-input').value.trim();
  const cat = document.getElementById('new-label-cat').value;
  if (!name) return;
  const colors = ['#22c55e','#3b82f6','#f97316','#8b5cf6','#ef4444','#06b6d4','#f59e0b','#ec4899'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  try {
    const { data } = await sb.from('floor_plan_labels').insert({ category: cat, name, color, sort_order: mapLabels.length + 1 }).select().single();
    if (data) { mapLabels.push(data); renderLabelPicker(); document.getElementById('new-label-input').value = ''; toast('Label added'); }
  } catch(e) { toast('Error: ' + e.message, true); }
}

function showLabelPicker(x, y) {
  const picker = document.getElementById('map-label-picker');
  picker.style.display = 'flex';
  const pw = 220, ph = 380;
  const sx = Math.min(x + 10, window.innerWidth - pw - 10);
  const sy = Math.min(y + 10, window.innerHeight - ph - 10);
  picker.style.left = sx + 'px';
  picker.style.top = sy + 'px';
  // Store box id on picker so we can recover it even if selectedMapBox gets cleared
  picker.dataset.boxId = selectedMapBox?.id || '';
  loadLabelsFromDB();
}

function hideLabelPicker() {
  document.getElementById('map-label-picker').style.display = 'none';
}

function applyLabelToBox(labelId, labelName, color, category) {
  // Recover box if selectedMapBox was cleared
  if (!selectedMapBox) {
    const picker = document.getElementById('map-label-picker');
    const boxId = picker?.dataset.boxId;
    if (boxId) selectedMapBox = mapBoxes.find(b => b.id === boxId);
  }
  if (!selectedMapBox) { console.warn('applyLabelToBox: no box selected'); return; }
  selectedMapBox.labelId = labelId;
  selectedMapBox.labelName = labelName;
  selectedMapBox.color = color;
  selectedMapBox.category = category;
  selectedMapBox.needsReview = false; // user has confirmed — clear review flag
  saveMapBox(selectedMapBox);
  renderMapOverlay();
  renderMapBoxList();
  hideLabelPicker();
  selectedMapBox = null;
}

function toggleMapMode() {
  mapDrawMode = !mapDrawMode;
  const btn = document.getElementById('map-draw-btn');
  const overlay = document.getElementById('map-overlay');
  if (mapDrawMode) {
    btn.style.background = 'var(--acc)'; btn.style.color = '#fff';
    btn.textContent = 'Stop drawing';
    if (overlay) overlay.style.cursor = 'crosshair';
    overlay.addEventListener('mousedown', onMapMouseDown);
    overlay.addEventListener('mousemove', onMapMouseMove);
    overlay.addEventListener('mouseup', onMapMouseUp);
  } else {
    btn.style.background = 'var(--surf2)'; btn.style.color = 'var(--txt)';
    btn.textContent = 'Draw box manually';
    if (overlay) overlay.style.cursor = 'default';
    overlay.removeEventListener('mousedown', onMapMouseDown);
    overlay.removeEventListener('mousemove', onMapMouseMove);
    overlay.removeEventListener('mouseup', onMapMouseUp);
    document.getElementById('map-draw-rect').style.display = 'none';
  }
}

function onMapMouseDown(e) {
  if (e.target.classList.contains('map-box') || e.target.classList.contains('map-box-delete')) return;
  mapDrawing = true;
  const rect = document.getElementById('map-overlay').getBoundingClientRect();
  mapDrawStartPt = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  const dr = document.getElementById('map-draw-rect');
  dr.style.cssText = 'position:absolute;border:2px dashed var(--acc2);background:rgba(56,189,248,.1);pointer-events:none;box-sizing:border-box;display:block;left:' + mapDrawStartPt.x + 'px;top:' + mapDrawStartPt.y + 'px;width:0;height:0;';
}

function onMapMouseMove(e) {
  if (!mapDrawing || !mapDrawStartPt) return;
  const rect = document.getElementById('map-overlay').getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  const dr = document.getElementById('map-draw-rect');
  dr.style.left = Math.min(x, mapDrawStartPt.x) + 'px';
  dr.style.top = Math.min(y, mapDrawStartPt.y) + 'px';
  dr.style.width = Math.abs(x - mapDrawStartPt.x) + 'px';
  dr.style.height = Math.abs(y - mapDrawStartPt.y) + 'px';
}

function onMapMouseUp(e) {
  if (!mapDrawing || !mapDrawStartPt) return;
  mapDrawing = false;
  const rect = document.getElementById('map-overlay').getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  document.getElementById('map-draw-rect').style.display = 'none';
  const x1 = Math.min(x, mapDrawStartPt.x), y1 = Math.min(y, mapDrawStartPt.y);
  const x2 = Math.max(x, mapDrawStartPt.x), y2 = Math.max(y, mapDrawStartPt.y);
  mapDrawStartPt = null;
  if (x2-x1 < 15 || y2-y1 < 15) return;
  const box = { id: 'box-' + Date.now(), labelId: null, labelName: 'Unlabeled', color: '#94a3b8', category: 'Other', x1: Math.round(x1), y1: Math.round(y1), x2: Math.round(x2), y2: Math.round(y2), page: iphoneCurrentPage || 1 };
  selectedMapBox = box;
  mapBoxes.push(box);
  saveMapBox(box); // save immediately even before labeling
  renderMapOverlay();
  renderMapBoxList();
  showLabelPicker(e.clientX, e.clientY);
}

function testMapCalibration() {
  // Draw boxes at known percentages to test coordinate mapping
  const testBoxes = [
    { name: '0-10%', x1pct: 0, y1pct: 0, x2pct: 10, y2pct: 10 },
    { name: '50-60%', x1pct: 50, y1pct: 0, x2pct: 60, y2pct: 10 },
    { name: '90-100%', x1pct: 90, y1pct: 0, x2pct: 100, y2pct: 10 },
  ];
  mapBoxes = testBoxes.map((t, i) => ({
    id: 'cal-' + i, labelId: null, labelName: t.name, color: '#ff0000', category: 'Other',
    x1: Math.round(t.x1pct / 100 * pdfCv.width),
    y1: Math.round(t.y1pct / 100 * pdfCv.height),
    x2: Math.round(t.x2pct / 100 * pdfCv.width),
    y2: Math.round(t.y2pct / 100 * pdfCv.height),
    page: 1
  }));
  renderMapOverlay();
  renderMapBoxList();
  toast('Calibration boxes drawn at 0%, 50%, 90% — check alignment');
}

function renderMapOverlay() {
  const overlay = document.getElementById('map-overlay');
  if (!overlay) return;
  const pdfCvEl = document.getElementById('pdf-cv');
  console.log('[renderMapOverlay] rs=' + (renderScale||1).toFixed(3) + ' boxes=' + mapBoxes.length + ' canvas=' + pdfCvEl.width + 'x' + pdfCvEl.height);
  // Overlay sits inside ccon which carries the CSS zoom transform — no need to set explicit size.
  overlay.style.width = pdfCvEl.width + 'px';
  overlay.style.height = pdfCvEl.height + 'px';
  // Always show overlay when we have boxes
  overlay.style.display = mapBoxes.length > 0 ? 'block' : 'none';
  overlay.classList.toggle('active', mapBoxes.length > 0);
  overlay.querySelectorAll('.map-box').forEach(el => el.remove());
  const currentPage = iphoneCurrentPage || 1;
  mapBoxes.filter(b => (b.page || 1) === currentPage && mapLayerVisibility[b.category] !== false).forEach(box => {
    const el = document.createElement('div');
    el.className = 'map-box';
    const borderStyle = box.needsReview ? 'dashed' : 'solid';
    const reviewBadge = box.needsReview ? '<div style="position:absolute;top:2px;right:18px;font-size:9px;background:rgba(251,191,36,.9);color:#000;border-radius:3px;padding:0 3px;font-weight:700;">?</div>' : '';
    const rs2 = pdfScale || renderScale || 1;
    const pageIdx = (box.page || 1) - 1;
    const pageCanvasY = pdfPages[pageIdx]?.y || pdfPages[0]?.y || 0; // canvas px Y where this page starts
    const cx1 = box.x1 * rs2;
    const cy1 = pageCanvasY + box.y1 * rs2;
    const cx2 = box.x2 * rs2;
    const cy2 = pageCanvasY + box.y2 * rs2;
    el.style.cssText = 'position:absolute;border:2px ' + borderStyle + ' ' + box.color + ';border-radius:3px;cursor:pointer;box-sizing:border-box;background:' + box.color + '25;left:' + cx1 + 'px;top:' + cy1 + 'px;width:' + (cx2-cx1) + 'px;height:' + (cy2-cy1) + 'px;';
    el.innerHTML = '<div style="position:absolute;top:2px;left:4px;font-size:9px;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.8);pointer-events:none;text-transform:uppercase;letter-spacing:.3px;">' + box.labelName + '</div>' +
      reviewBadge +
      '<div onclick="deleteMapBox(\'' + box.id + '\')" style="position:absolute;top:1px;right:2px;width:14px;height:14px;background:rgba(0,0,0,.5);border-radius:3px;color:#fff;font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;">✕</div>';
    // Double-click = open label picker
    el.addEventListener('dblclick', function(e) {
      if (e.target.textContent === '✕') return;
      selectedMapBox = box;
      showLabelPicker(e.clientX, e.clientY);
    });

    // Get PDF units per screen px (boxes stored in PDF units)
    function getScale() {
      const r = overlay.getBoundingClientRect();
      const rs2 = pdfScale || renderScale || 1;
      return { x: pdfCv.width / r.width / rs2, y: pdfCv.height / r.height / rs2 };
    }

    // Drag to move
    el.addEventListener('mousedown', function(e) {
      if (e.target.dataset.handle || e.target.textContent === '✕') return;
      e.preventDefault(); e.stopPropagation();
      hideLabelPicker();
      const s = getScale();
      const startX = e.clientX, startY = e.clientY;
      const orig = { x1: box.x1, y1: box.y1, x2: box.x2, y2: box.y2 };
      el.style.opacity = '0.75'; el.style.cursor = 'grabbing';
      function onMove(e) {
        const dx = (e.clientX - startX) * s.x, dy = (e.clientY - startY) * s.y;
        box.x1 = orig.x1 + dx; box.y1 = orig.y1 + dy;
        box.x2 = orig.x2 + dx; box.y2 = orig.y2 + dy;
        const rs2 = pdfScale || renderScale || 1;
        const pageCanvasY = pdfPages[(box.page||1)-1]?.y || pdfPages[0]?.y || 0;
        el.style.left = (box.x1*rs2) + 'px'; el.style.top = (pageCanvasY + box.y1*rs2) + 'px';
      }
      function onUp() {
        el.style.opacity = '1'; el.style.cursor = 'pointer';
        saveMapBox(box); renderMapBoxList();
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    // 4 corner resize handles
    [
      { pos: 'top:−6px;left:−6px',     cur: 'nw-resize', dx1:1,dy1:1,dx2:0,dy2:0 },
      { pos: 'top:−6px;right:−6px',    cur: 'ne-resize', dx1:0,dy1:1,dx2:1,dy2:0 },
      { pos: 'bottom:−6px;left:−6px',  cur: 'sw-resize', dx1:1,dy1:0,dx2:0,dy2:1 },
      { pos: 'bottom:−6px;right:−6px', cur: 'se-resize', dx1:0,dy1:0,dx2:1,dy2:1 },
    ].forEach(h => {
      const rh = document.createElement('div');
      rh.dataset.handle = '1';
      rh.style.cssText = 'position:absolute;' + h.pos.replace(/−/g,'-') + ';width:12px;height:12px;background:#fff;border:2px solid ' + box.color + ';border-radius:3px;cursor:' + h.cur + ';z-index:10;box-shadow:0 1px 4px rgba(0,0,0,.4);';
      rh.addEventListener('mousedown', function(e) {
        e.preventDefault(); e.stopPropagation();
        hideLabelPicker();
        const s = getScale();
        const startX = e.clientX, startY = e.clientY;
        const orig = { x1: box.x1, y1: box.y1, x2: box.x2, y2: box.y2 };
        function onMove(e) {
          const dx = (e.clientX - startX) * s.x, dy = (e.clientY - startY) * s.y;
          if (h.dx1) box.x1 = Math.min(orig.x1 + dx, orig.x2 - 20);
          if (h.dy1) box.y1 = Math.min(orig.y1 + dy, orig.y2 - 20);
          if (h.dx2) box.x2 = Math.max(orig.x2 + dx, orig.x1 + 20);
          if (h.dy2) box.y2 = Math.max(orig.y2 + dy, orig.y1 + 20);
          const rs2 = pdfScale || renderScale || 1;
          const pageCanvasY = pdfPages[(box.page||1)-1]?.y || pdfPages[0]?.y || 0;
          el.style.left = (box.x1*rs2) + 'px'; el.style.top = (pageCanvasY + box.y1*rs2) + 'px';
          el.style.width = ((box.x2-box.x1)*rs2) + 'px'; el.style.height = ((box.y2-box.y1)*rs2) + 'px';
        }
        function onUp() {
          saveMapBox(box); renderMapBoxList();
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
        }
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });
      el.appendChild(rh);
    });

    overlay.appendChild(el);
  });
}

function deleteMapBox(id) {
  mapBoxes = mapBoxes.filter(b => b.id !== id);
  sb.from('floor_plan_annotations').delete().eq('id', id).then(() => {});
  renderMapOverlay();
  renderMapBoxList();
}

function renderMapBoxList() {
  const list = document.getElementById('map-box-list');
  if (!list) return;
  if (!mapBoxes.length) { list.innerHTML = '<div style="font-size:11px;color:var(--txt3);text-align:center;padding:20px;">No boxes yet</div>'; return; }
  list.innerHTML = mapBoxes.map(b =>
    '<div style="display:flex;align-items:center;gap:6px;padding:5px 6px;background:var(--surf2);border-radius:6px;border-left:3px solid ' + b.color + ';margin-bottom:3px;">' +
    '<span style="font-size:11px;color:var(--txt);flex:1;">' + b.labelName + '</span>' +
    '<span style="font-size:9px;color:var(--txt3);">' + Math.round(b.x2-b.x1) + 'x' + Math.round(b.y2-b.y1) + '</span>' +
    '<button onclick="deleteMapBox(\'' + b.id + '\')" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:12px;">✕</button></div>'
  ).join('');
}

function clearAllMapBoxes() {
  if (!confirm('Clear all room map boxes? This will also remove any saved boxes from the database for this file.')) return;
  mapBoxes = [];
  if (currentFileName) {
    // Delete ALL annotations for this file from Supabase (including any wrongly-saved AI boxes)
    sb.from('floor_plan_annotations').delete().eq('plan_filename', currentFileName).then(({error}) => {
      if (error) console.error('clearAllMapBoxes delete error:', error);
      else console.log('clearAllMapBoxes: deleted all annotations for', currentFileName);
    });
  }
  renderMapOverlay();
  renderMapBoxList();
  toast('All room boxes cleared and removed from database.');
}

// Call this from browser console to fix corrupted files:
// purgeAllMapBoxesForFile('Blank Layout')
window.purgeAllMapBoxesForFile = async function(filename) {
  const name = filename || currentFileName;
  if (!name) { alert('No filename specified'); return; }
  const { error, count } = await sb.from('floor_plan_annotations').delete().eq('plan_filename', name);
  console.log('Purged annotations for "' + name + '":', error || 'OK');
  if (!error) { mapBoxes = []; renderMapOverlay(); renderMapBoxList(); toast('Purged all boxes for: ' + name); }
}

// Debug: drop a test box at specific CANVAS pixel coords to verify overlay alignment
// Usage: testBox(canvasX1, canvasY1, canvasX2, canvasY2)
// Example: testBox(0, 196, 200, 400)  ← top-left of plan content
window.testBox = function(cx1, cy1, cx2, cy2) {
  const rs = renderScale || 1;
  const box = { id: genUUID(), labelName: 'TEST', color: '#ff0000', category: 'other',
    x1: cx1/rs, y1: cy1/rs, x2: cx2/rs, y2: cy2/rs, page: 1, _aiGenerated: true };
  mapBoxes.push(box);
  renderMapOverlay();
  console.log('testBox: canvas(' + cx1 + ',' + cy1 + ')-(' + cx2 + ',' + cy2 + ') → pdfUnits(' + Math.round(cx1/rs) + ',' + Math.round(cy1/rs) + ')-(' + Math.round(cx2/rs) + ',' + Math.round(cy2/rs) + ') rs=' + rs.toFixed(3));
  console.log('Canvas size:', pdfCv.width, 'x', pdfCv.height, '| canvasY of page1:', pdfPages[0]?.y);
}

async function saveMapBox(box) {
  if (!currentFileName) { console.warn('saveMapBox: no currentFileName'); return; }
  if (!CU) { console.warn('saveMapBox: no CU'); return; }
  // Never persist AI-generated boxes — they are temporary scan previews
  if (box._aiGenerated) { console.log('saveMapBox: skipping AI-generated box', box.labelName); return; }
  // Blank variant protection — same flow as icon placement: prompt Save As instead of saving
  if (isBlankVariant()) {
    if (!_blankProtectPrompted) {
      _blankProtectPrompted = true;
      setTimeout(() => {
        const m = document.createElement('div');
        m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:99999;display:flex;align-items:center;justify-content:center;';
        m.innerHTML = `<div style="background:var(--surf);border:1px solid var(--bdr2);border-radius:14px;padding:24px;max-width:340px;width:90%;display:flex;flex-direction:column;gap:12px;box-shadow:0 24px 80px rgba(0,0,0,.7);">
          <div style="font-size:22px;">📋</div>
          <div style="font-size:14px;font-weight:700;color:var(--txt);">Looks like you're marking up a plan</div>
          <div style="font-size:13px;color:var(--txt2);line-height:1.5;">The blank print <strong>${currentVariantName}</strong> cannot be overwritten. Please save this as a new version name so the blank is kept clean.</div>
          <input id="_bpp-name" type="text" placeholder="e.g. Audio/Video System, Security..." style="padding:10px 12px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:8px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;box-sizing:border-box;">
          <div id="_bpp-err" style="display:none;font-size:12px;color:#ef4444;"></div>
          <button id="_bpp-save" style="padding:11px;background:var(--acc);border:none;border-radius:8px;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;">Save as New Version</button>
          <button id="_bpp-later" style="padding:6px;background:transparent;border:none;color:var(--txt3);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;">I'll name it later</button>
        </div>`;
        document.body.appendChild(m);
        const nameInput = m.querySelector('#_bpp-name');
        const errEl = m.querySelector('#_bpp-err');
        nameInput.focus();
        nameInput.onkeydown = (e) => { if (e.key === 'Enter') m.querySelector('#_bpp-save').click(); };
        m.querySelector('#_bpp-save').onclick = async () => {
          const name = nameInput.value.trim();
          if (!name) { errEl.textContent = 'Please enter a version name.'; errEl.style.display = 'block'; nameInput.focus(); return; }
          m.remove();
          await _saveAsWithName(name);
          // Now actually save all current map boxes under the new project name
          await saveAllMapBoxes();
        };
        m.querySelector('#_bpp-later').onclick = () => m.remove();
      }, 400);
    }
    return; // Don't save to Supabase until they've named it
  }
  try {
    const record = {
      id: box.id,
      plan_filename: currentFileName,
      page_num: box.page || 1,
      label_id: box.labelId ? parseInt(box.labelId) : null,
      created_by: CU.id,
      notes: box.isMarker ? 'marker' : null
    };
    if (box.isMarker) {
      record.x1 = Math.round(box.cx - 8); record.y1 = Math.round(box.cy - 8);
      record.x2 = Math.round(box.cx + 8); record.y2 = Math.round(box.cy + 8);
    } else {
      record.x1 = Math.round(box.x1); record.y1 = Math.round(box.y1);
      record.x2 = Math.round(box.x2); record.y2 = Math.round(box.y2);
    }
    const { error } = await sb.from('floor_plan_annotations').upsert(record);
    if (error) console.error('saveMapBox error:', error);
    else console.log('saveMapBox saved:', box.labelName, record);
  } catch(e) { console.warn('saveMapBox exception:', e); }
}

// Save ALL current map boxes to Supabase at once
async function saveAllMapBoxes() {
  if (!currentFileName || !CU) return;
  for (const box of mapBoxes) { await saveMapBox(box); }
  toast('✅ Room map saved');
}

async function loadMapBoxes() {
  console.log('loadMapBoxes called, currentFileName=', currentFileName, 'CU=', CU?.id);
  if (!currentFileName) { console.warn('loadMapBoxes: no currentFileName'); return; }
  // Never load room boxes onto a blank variant — blanks should always open clean
  if (isBlankVariant()) { console.log('loadMapBoxes: skipping — blank variant is always clean'); mapBoxes = []; return; }
  try {
    const { data, error } = await sb.from('floor_plan_annotations')
      .select('*, floor_plan_labels(name, color, category)')
      .eq('plan_filename', currentFileName);
    console.log('loadMapBoxes result:', data?.length, 'rows, error=', error);
    if (data && data.length > 0) {
      mapBoxes = data.map(r => {
        const isMarker = r.notes === 'marker';
        const base = { id: r.id, labelId: r.label_id, labelName: r.floor_plan_labels?.name || r.notes || 'Unlabeled', color: r.floor_plan_labels?.color || '#94a3b8', category: r.floor_plan_labels?.category || 'Other', page: r.page_num || 1 };
        if (isMarker) return { ...base, isMarker: true, cx: Math.round((r.x1+r.x2)/2), cy: Math.round((r.y1+r.y2)/2) };
        return { ...base, x1: r.x1, y1: r.y1, x2: r.x2, y2: r.y2 };
      });
      renderMapOverlay(); renderMapBoxList();
      toast('Room map loaded: ' + mapBoxes.length + ' items');
      // Refresh idle-state clear button visibility
      const _cb = document.getElementById('eai-idle-clear-btn');
      if (_cb) _cb.style.display = mapBoxes.length > 0 ? 'block' : 'none';
    } else {
      console.warn('loadMapBoxes: no data for filename "' + currentFileName + '"');
      // Show all stored filenames to help debug
      const { data: all } = await sb.from('floor_plan_annotations').select('plan_filename').limit(10);
      console.log('Stored filenames:', [...new Set(all?.map(r=>r.plan_filename))]);
    }
  } catch(e) { console.warn('loadMapBoxes error:', e); }
}

// Force reload boxes — call from console: reloadMapBoxes()
async function reloadMapBoxes() {
  console.log('Force reloading map boxes for:', currentFileName);
  await loadMapBoxes();
}

async function aiAutoMap() {
  if (!pdfDoc) { toast('Open a PDF plan first'); return; }
  const apiKey = localStorage.getItem('elite_anthropic_key');
  if (!apiKey) { toast('Set your API key first'); return; }
  const btn = document.querySelector('#tab-map-content .ai-btn') || document.querySelector('#room-map-section .ai-btn');
  if (btn) { btn.innerHTML = '⏳ Scanning plan...'; btn.disabled = true; }

  try {
    // ── Render each page at high resolution (same approach as icon placement) ──
    const TARGET_LONG_EDGE = 3000;
    const pageImages = [];

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      if (btn) btn.innerHTML = `⏳ Rendering page ${i}/${pdfDoc.numPages}...`;
      const page = await pdfDoc.getPage(i);
      const nativeVp = page.getViewport({ scale: 1.0 });
      const nativeLong = Math.max(nativeVp.width, nativeVp.height);
      const aiScale = TARGET_LONG_EDGE / nativeLong;
      const vp = page.getViewport({ scale: aiScale });
      const cv = document.createElement('canvas');
      cv.width = Math.round(vp.width); cv.height = Math.round(vp.height);
      const ctx = cv.getContext('2d');
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cv.width, cv.height);
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      pageImages.push({
        pageNum: i,
        b64: cv.toDataURL('image/png').split(',')[1],
        aiScale,
        aiW: cv.width,
        aiH: cv.height,
        nativeW: nativeVp.width,
        nativeH: nativeVp.height,
        canvasY: pdfPages[i-1]?.y || 0,
      });
    }

    if (btn) btn.innerHTML = '⏳ AI analyzing rooms...';

    // ── Build page descriptions ──
    const pageDesc = pageImages.map(pg =>
      `Page ${pg.pageNum}: ${pg.aiW}×${pg.aiH}px`
    ).join(', ');

    // ── Build user content with images ──
    const userContent = [
      { type: 'text', text: `You are an architectural floor plan expert. Analyze the floor plan(s) and identify every enclosed room/space.

FLOOR PLAN: ${pdfDoc.numPages} page(s). ${pageDesc}.

HOW TO READ THIS PLAN:
- WALLS: thick parallel black lines — the space BETWEEN the two parallel lines is solid wall
- ROOMS: the open white area enclosed by walls
- DOORS: an arc (quarter-circle) swinging from a corner of a wall opening
- WINDOWS: three thin parallel lines crossing a wall segment
- Rooms often have a text label printed inside them — use it if visible

YOUR TASK:
1. CRITICAL: Scan the ENTIRE image from left edge to right edge. Floor plan sheets often contain multiple separate drawings side by side (e.g. Ground Floor, First Floor, Second Floor, Roof Deck — each is a separate drawing). You MUST detect rooms in ALL drawings across the full image width, not just the leftmost one.
2. Draw a bounding box for each room's INTERIOR (not including wall thickness)
3. Label each room — use the printed text if visible, otherwise infer from shape/context
4. Mark confidence: "sure" if you can clearly read the label, "guess" if inferred
5. Assign a color-coded category

CATEGORIES and their colors:
- "living" = Living/Family/Great Room → color #3b82f6 (blue)
- "bedroom" = Bedroom/Master/Guest → color #8b5cf6 (purple)  
- "kitchen" = Kitchen/Kitchenette → color #f97316 (orange)
- "bathroom" = Bathroom/Bath/WC/Powder → color #06b6d4 (cyan)
- "garage" = Garage/Carport → color #6b7280 (gray)
- "outdoor" = Patio/Deck/Porch/Lanai → color #22c55e (green)
- "utility" = Laundry/Mechanical/Storage/Closet/Pantry → color #f59e0b (amber)
- "office" = Office/Study/Den → color #ec4899 (pink)
- "dining" = Dining/Breakfast → color #a855f7 (violet)
- "hallway" = Hall/Foyer/Entry/Corridor → color #64748b (slate)
- "other" = anything else → color #94a3b8

COORDINATE RULES:
- Origin (0,0) = TOP-LEFT of each page image
- x increases rightward, y increases downward
- Coordinates are PIXEL positions in the FULL-RESOLUTION image (listed above as WxH)
- CRITICAL: Images are ~3000px wide. Room boxes must use the full coordinate space.
- A room box must SPAN THE ENTIRE ROOM INTERIOR — not just a corner
- For a 3000x2000px image, expect values like x1:300, y1:200, x2:1400, y2:900
- Shrink 15-20px from each interior wall face (not the outer wall edge)
- WRONG: x1:10, y1:20, x2:80, y2:60 (way too small — that is a tiny corner)
- RIGHT: x1:350, y1:280, x2:1250, y2:850 (spans the whole room)

Return ONLY valid JSON, no explanation:
[
  {"page": 1, "name": "Living Room", "category": "living", "color": "#3b82f6", "confidence": "sure", "x1": 380, "y1": 290, "x2": 1350, "y2": 920},
  {"page": 1, "name": "Master Bedroom", "category": "bedroom", "color": "#8b5cf6", "confidence": "sure", "x1": 1400, "y1": 290, "x2": 2450, "y2": 1050},
  {"page": 1, "name": "Bathroom", "category": "bathroom", "color": "#06b6d4", "confidence": "guess", "x1": 1400, "y1": 1100, "x2": 1900, "y2": 1500}
]` }
    ];

    pageImages.forEach((pg, idx) => {
      userContent.push({ type: 'text', text: `Page ${idx+1} of ${pdfDoc.numPages}. Image is ${pg.aiW}×${pg.aiH} pixels. Use the FULL coordinate space: x from 0-${pg.aiW}, y from 0-${pg.aiH}. Room boxes must be hundreds of pixels wide/tall to cover full room interiors.` });
      userContent.push({ type: 'image', source: { type: 'base64', media_type: 'image/png', data: pg.b64 } });
    });

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: 'claude-opus-4-5-20251101', max_tokens: 4000, messages: [{ role: 'user', content: userContent }] })
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error?.message || 'API error ' + resp.status);

    const txt = data.content?.find(c => c.type === 'text')?.text || '';
    const jsonMatch = txt.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON in response');
    const detected = JSON.parse(jsonMatch[0]);

    // ── Convert AI pixel coords → canvas pixel coords ──
    // AI rendered at aiScale px/pdfUnit. Canvas rendered at pdfScale (renderScale) px/pdfUnit.
    // AI pixel → canvas pixel: multiply by (pdfScale / aiScale)
    // canvasY offset: pg.canvasY includes 196px legend strip at top
    const rs = renderScale || pdfScale || 1;

    const newBoxes = detected.map(d => {
      const pageIdx = Math.max(0, (d.page || 1) - 1);
      const pg = pageImages[Math.min(pageIdx, pageImages.length - 1)];
      const scale = rs / pg.aiScale; // AI px → canvas px

      const bx1 = Math.round(d.x1 * scale);
      const by1 = Math.round(pg.canvasY + d.y1 * scale);
      const bx2 = Math.round(d.x2 * scale);
      const by2 = Math.round(pg.canvasY + d.y2 * scale);

      const color = d.color || '#94a3b8';
      const needsReview = d.confidence === 'guess' || !d.name || d.name === 'Room';

      return {
        id: genUUID(),
        labelId: null,
        labelName: d.name || 'Unknown',
        color,
        category: d.category || 'other',
        x1: bx1, y1: by1, x2: bx2, y2: by2,
        page: d.page || 1,
        needsReview,
        confidence: d.confidence || 'sure',
      };
    });

    // Add a CALIBRATION BOX at the very top-left of page content (should appear at top-left of plan)
  mapBoxes = [...mapBoxes.filter(b => !b._aiGenerated), ...newBoxes.map(b => ({ ...b, _aiGenerated: true }))];
    renderMapOverlay();
    renderMapBoxList();
    for (const box of newBoxes) { await saveMapBox(box); }

    // ── Show review prompt if any boxes need manual labeling ──
    const needsReview = newBoxes.filter(b => b.needsReview);
    const sure = newBoxes.length - needsReview.length;

    const summaryEl = document.getElementById('ai-map-summary');
    if (summaryEl) {
      if (needsReview.length > 0) {
        const reviewList = needsReview.map(b =>
          '<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">' +
          '<span style="width:10px;height:10px;border-radius:2px;background:' + b.color + ';flex-shrink:0;"></span>' +
          '<span style="font-size:11px;color:var(--txt);">' + b.labelName + '</span>' +
          '<span style="font-size:10px;color:var(--txt3);">(uncertain)</span>' +
          '</div>'
        ).join('');
        summaryEl.style.display = 'block';
        summaryEl.innerHTML =
          '<div style="font-size:11px;color:var(--txt2);background:var(--surf2);border:1px solid var(--bdr2);border-radius:8px;padding:10px 12px;">' +
          '<div style="font-weight:700;margin-bottom:5px;">✅ ' + sure + ' rooms identified · ⚠️ ' + needsReview.length + ' need review</div>' +
          '<div style="color:var(--txt3);margin-bottom:8px;">Rooms with dashed borders could not be confidently labeled. Double-click any room box on the plan to rename it.</div>' +
          reviewList + '</div>';
      } else {
        summaryEl.style.display = 'block';
        summaryEl.innerHTML =
          '<div style="font-size:11px;color:#22c55e;background:var(--surf2);border:1px solid var(--bdr2);border-radius:8px;padding:8px 12px;">' +
          '✅ All ' + newBoxes.length + ' rooms identified with high confidence. Double-click any box to rename.</div>';
      }
    }

    toast('✅ Mapped ' + newBoxes.length + ' rooms' + (needsReview.length ? ' — ' + needsReview.length + ' need review' : ''));

  } catch(e) {
    toast('❌ ' + e.message, true);
    console.error('[aiAutoMap]', e);
  }

  if (btn) {
    btn.innerHTML = '<svg class="ai-star-icon" width="11" height="11" viewBox="0 0 36 36" fill="none"><g class="s0"><path d="M18 4 L20 12 L28 14 L20 16 L18 24 L16 16 L8 14 L16 12Z" fill="white"/></g></svg> Auto-detect rooms';
    btn.disabled = false;
  }
}

// Use room map boxes in EliteAI placement
function getRoomMapForPlacement() {
  if (!mapBoxes.length) return null;
  return mapBoxes.filter(b => b.category === 'Space').map(b => ({
    name: b.labelName,
    x1: Math.round(b.x1 / (document.getElementById('pdf-cv').offsetWidth / (pdfCv?.width || 1))),
    y1: Math.round(b.y1 / (document.getElementById('pdf-cv').offsetHeight / (pdfCv?.height || 1))),
    x2: Math.round(b.x2 / (document.getElementById('pdf-cv').offsetWidth / (pdfCv?.width || 1))),
    y2: Math.round(b.y2 / (document.getElementById('pdf-cv').offsetHeight / (pdfCv?.height || 1))),
    cx: Math.round(((b.x1 + b.x2) / 2) / (document.getElementById('pdf-cv').offsetWidth / (pdfCv?.width || 1))),
    cy: Math.round(((b.y1 + b.y2) / 2) / (document.getElementById('pdf-cv').offsetHeight / (pdfCv?.height || 1)))
  }));
}

// ── FLOATING AI CHAT HELPER ──
let aiChatOpen = false;
let aiChatHistory = [];

function toggleAiChat() {
  aiChatOpen = !aiChatOpen;
  document.getElementById('ai-chat-panel').classList.toggle('open', aiChatOpen);
  if (aiChatOpen) {
    // Inject context-aware welcome message on first open (only if no messages beyond the system line)
    const msgs = document.getElementById('ai-chat-messages');
    if (msgs && msgs.querySelectorAll('.ai-msg.assistant, .ai-msg.user').length === 0) {
      if (!pdfDoc) {
        // Dashboard / no project open
        addAiMessage('assistant',
          'Hi! I\'m EliteAI. You\'re on the home screen — search for a project or create a new one to get started. I can answer questions about the app, smart home devices, installation tips, or anything else.',
          ['How do I create a project?', 'What file types can I open?', 'How does icon placement work?']
        );
      } else if (CP) {
        // Project open with PDF
        addAiMessage('assistant',
          'Hi! I\'m EliteAI. You\'re working on ' + (CP.name || 'your plan') + '. Ask me about icon placement, room coverage, or use the EliteAI tab to label rooms for smarter suggestions.',
          ['Suggest icons for this plan', 'Review my current markup']
        );
      } else {
        // PDF open but no cloud project
        addAiMessage('assistant',
          'Hi! I\'m EliteAI. Ask me about icon placement or device suggestions for your plan.',
          ['Suggest icons for this plan', 'What devices go in a great room?']
        );
      }
    }
    setTimeout(() => document.getElementById('ai-chat-input')?.focus(), 100);
  }
  scrollAiChat();
}

function renderMarkdown(text) {
  // Process line by line for clean output
  const lines = text.split('\n');
  let html = '';
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/__(.+?)__/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/`([^`]+)`/g,'<code style="background:rgba(255,255,255,.12);padding:1px 5px;border-radius:3px;font-family:monospace;font-size:11px;">$1</code>');

    // Headers
    if (/^### (.+)/.test(line)) {
      if (inList) { html += '</div>'; inList = false; }
      html += '<div style="font-size:10px;font-weight:700;color:var(--acc2);text-transform:uppercase;letter-spacing:.5px;margin:10px 0 3px;">' + line.replace(/^### /,'') + '</div>';
    } else if (/^## (.+)/.test(line)) {
      if (inList) { html += '</div>'; inList = false; }
      html += '<div style="font-size:12px;font-weight:700;color:var(--txt);margin:10px 0 3px;">' + line.replace(/^## /,'') + '</div>';
    } else if (/^# (.+)/.test(line)) {
      if (inList) { html += '</div>'; inList = false; }
      html += '<div style="font-size:13px;font-weight:700;color:var(--txt);margin:10px 0 3px;">' + line.replace(/^# /,'') + '</div>';
    // Bullet list item
    } else if (/^[\-\*•] (.+)/.test(line)) {
      if (!inList) { html += '<div style="display:flex;flex-direction:column;gap:3px;margin:4px 0;">'; inList = true; }
      html += '<div style="display:flex;gap:6px;"><span style="color:var(--acc2);flex-shrink:0;">•</span><span>' + line.replace(/^[\-\*•] /,'') + '</span></div>';
    // Numbered list
    } else if (/^(\d+)\. (.+)/.test(line)) {
      const m = line.match(/^(\d+)\. (.+)/);
      if (!inList) { html += '<div style="display:flex;flex-direction:column;gap:3px;margin:4px 0;">'; inList = true; }
      html += '<div style="display:flex;gap:6px;"><span style="color:var(--acc2);flex-shrink:0;min-width:16px;">' + m[1] + '.</span><span>' + m[2] + '</span></div>';
    // Horizontal rule
    } else if (/^---+$/.test(line.trim())) {
      if (inList) { html += '</div>'; inList = false; }
      html += '<hr style="border:none;border-top:1px solid var(--bdr);margin:8px 0;">';
    // Empty line
    } else if (line.trim() === '') {
      if (inList) { html += '</div>'; inList = false; }
      html += '<div style="height:6px;"></div>';
    // Normal text
    } else {
      if (inList) { html += '</div>'; inList = false; }
      html += '<div style="margin:1px 0;">' + line + '</div>';
    }
  }
  if (inList) html += '</div>';
  return html;
}

function addAiMessage(role, text, quickOptions) {
  const msgs = document.getElementById('ai-chat-messages');
  const div = document.createElement('div');
  div.className = 'ai-msg ' + role;
  if (role === 'assistant') {
    div.innerHTML = renderMarkdown(text);
  } else {
    div.textContent = text;
  }
  if (quickOptions && quickOptions.length) {
    const btns = document.createElement('div');
    btns.className = 'ai-quick-btns';
    quickOptions.forEach(opt => {
      const b = document.createElement('button');
      b.className = 'ai-quick-btn';
      b.textContent = opt;
      b.onclick = () => aiChatQuick(opt);
      btns.appendChild(b);
    });
    div.appendChild(btns);
  }
  msgs.appendChild(div);
  // Scroll so top of new message is visible
  requestAnimationFrame(() => { div.scrollIntoView({ block: 'start', behavior: 'smooth' }); });
  return div;
}

function scrollAiChat() {
  const msgs = document.getElementById('ai-chat-messages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

async function aiChatQuick(text) {
  const feedbackBtns = ['Place on Plan'];
  if (text === 'Place on Plan') {
    const last = aiChatHistory.filter(m => m.role === 'assistant').slice(-1)[0]?.content || '';
    await runEliteAIFromChat(last);
    return;
  }
  document.getElementById('ai-chat-input').value = text;
  await sendAiChat();
}

async function sendAiChat() {
  const input = document.getElementById('ai-chat-input');
  const text = input.value.trim();
  if (!text) return;
  const apiKey = localStorage.getItem('elite_anthropic_key');
  if (!apiKey) { addAiMessage('system', 'Set your API key first (EliteAI tab)'); return; }
  input.value = '';
  addAiMessage('user', text);
  aiChatHistory.push({ role: 'user', content: text });
  const sendBtn = document.getElementById('ai-chat-send');
  const chatBtn = document.getElementById('ai-chat-btn');
  sendBtn.classList.add('ai-loading');
  if (chatBtn) chatBtn.classList.add('ai-loading');

  const planContext = pdfDoc
    ? 'Current plan: ' + (currentFileName || 'untitled') + ' | Icons placed: ' + icons.length + ' | Rooms mapped: ' + (mapBoxes.filter(b => b.category === 'Space').length) + ' | Pages: ' + (pdfDoc.numPages || 1)
    : 'No plan currently open (user is on the dashboard)';

  const systemPrompt = `You are EliteAI, the built-in assistant for Elite Plan Markup — a web app used by Elite Smart Home technicians to annotate floor plan PDFs with smart home device icons.

ABOUT THE APP:
- Technicians open PDF floor plans (single or multi-page) and place device icons directly on the plan
- Supported file types: PDF floor plans (.pdf) and .ewm project files (Elite Markup format)
- Projects are saved to the cloud (Supabase) and can be restored across sessions
- The app works on PC (Chrome/Edge/Safari), iPad (Apple Pencil optimized), and iPhone
- Export options: PDF with annotations burned in, JPEG, PNG
- The AI placement system (EliteAI tab) can scan the plan and auto-suggest icon positions

CUSTOMER & PROJECT MANAGEMENT:
- The home screen has a search bar — type a customer name to find them; click to open their customer profile
- "View all customers" link (bottom-left of search) opens a full customer list with Active/Archived tabs
- Each customer can have multiple addresses — the customer modal shows an address dropdown to switch between locations
- Each address shows only the projects associated with that address
- To add a new address to a customer: open the customer modal, click the address dropdown, select "＋ Add new address…"
- Customers can be archived (hides them and all their projects from search) — use the Archive button in View All Customers
- Archived customers can be restored from the Archived tab in View All Customers
- To create a new project: click "New Project" button, select/type a customer, pick or add an address, name the job, upload a PDF

ICON CATEGORIES AVAILABLE:
Audio: In-Ceiling Speakers, In-Wall Speakers, Outdoor/Landscape Speakers, Subwoofer, Soundbar
Video: TV Mount, Projector, Projection Screen, Display Monitor
Networking: WiFi Access Point, Network Switch, Router, Patch Panel, Server Rack, PoE Switch
Control: Keypad, Touch Panel, Remote, Control Processor, Smart Hub
Lighting: Dimmer Switch, LED Driver, Lighting Controller
Security: Camera (Indoor/Outdoor/PTZ/Doorbell), Motion Sensor, Glass Break Sensor, Door/Window Contact, Siren, Panel, Keypad
Climate: Thermostat, Zone Controller, Damper, Humidifier
Power: Surge Protector, UPS Battery Backup, Power Conditioner, Smart Outlet

TOOLS AVAILABLE IN THE APP:
- Select tool: click/tap to select/move icons and shapes
- Pen tool: freehand drawing
- Line, Arrow, Rectangle, Circle tools: draw shapes with stroke/fill color, width, dash style
- Text tool: add text labels
- Eraser tool: erase freehand strokes
- Page strip: thumbnail navigation for multi-page PDFs
- Room Map (EliteAI tab): label rooms, then AI suggests device placement per room

HOW TO USE KEY FEATURES:
- To place an icon: click it in the left sidebar, then click on the plan
- To move an icon: use the Select tool, drag it
- To resize an icon: select it, drag the corner handle
- To edit an icon (opacity, size, rotate, flip, duplicate, label, delete): tap/click the icon to select it — on iPhone a bottom sheet appears with large touch-friendly controls; on desktop/iPad a floating toolbar appears
- To save: click the blue Save button — creates a named version (e.g. "Audio/Video System")
- To export PDF: click Export to PDF — saves annotated PDF to your device
- On iPad: double-tap Apple Pencil 2 to toggle between current tool and pointer
- The app auto-saves markup to the cloud continuously

ADMIN:
- Admin users can access the Admin Panel by clicking their name in the top-right corner and selecting "Admin Panel"
- The Admin Panel is used to invite new users, manage roles, and administer the team
- Non-admin users (Techs) do not see the Admin Panel option

CURRENT SESSION CONTEXT:
\${planContext}

BEHAVIOR:
- Answer ANY question the user has — about the app, smart home best practices, device specs, installation tips, industry standards, or anything else
- If you don't know something specific, say so and offer what you do know
- For questions about smart home products, brands, or specs, use your training knowledge freely
- Be helpful, practical, and concise — aim for under 150 words unless detail is needed
- If the user asks about placing devices, reference the current plan context above`;

  try {
    const messages = [{ role: 'user', content: planContext + '\n\nQuestion: ' + aiChatHistory[0].content }];
    for (let i = 1; i < aiChatHistory.length; i++) messages.push(aiChatHistory[i]);
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 800,
        system: systemPrompt,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages
      })
    });
    const data = await resp.json();
    // Extract text from all content blocks (web search may add tool_use/tool_result blocks)
    const reply = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('') || 'No response.';
    const suggestsPlacement = /place|add|suggest|put|install/i.test(reply) && pdfDoc;
    addAiMessage('assistant', reply, suggestsPlacement ? ['Place on Plan'] : null);
    aiChatHistory.push({ role: 'assistant', content: reply });
    if (aiChatHistory.length > 20) aiChatHistory = aiChatHistory.slice(-20);
  } catch(e) { addAiMessage('system', 'Error: ' + e.message); }

  sendBtn.classList.remove('ai-loading');
  if (chatBtn) chatBtn.classList.remove('ai-loading');
  scrollAiChat();
}

async function runEliteAIFromChat(promptText) {
  if (!pdfDoc) { addAiMessage('system', 'Open a PDF plan first'); return; }
  const apiKey = localStorage.getItem('elite_anthropic_key');
  if (!apiKey) { addAiMessage('system', 'Set your API key first'); return; }
  if (!promptText?.trim()) { addAiMessage('system', 'No prompt provided'); return; }
  const promptEl = document.getElementById('ai-prompt');
  if (promptEl) promptEl.value = promptText.trim();
  const iconsBefore = icons.length;
  window._lastPlacementStart = iconsBefore;
  addAiMessage('system', 'Scanning floor plan and placing icons...');
  scrollAiChat();
  try {
    await runEliteAI();
    const placed = icons.length - iconsBefore;
    if (placed > 0) {
      window._lastAIPrompt = promptText;
      addAiMessage('assistant', 'Placed ' + placed + ' icons. Use Select tool to fine-tune.', ['Save as example', 'Redo this']);
    } else {
      addAiMessage('system', 'No icons placed — try a more specific prompt');
    }
  } catch(e) { addAiMessage('system', 'Error: ' + e.message); }
  scrollAiChat();
}

function toggleRoomMapSection() {
  const section = document.getElementById('room-map-section');
  const chevron = document.getElementById('room-map-chevron');
  const open = section.style.display === 'none' || section.style.display === '';
  section.style.display = open ? 'flex' : 'none';
  if (chevron) chevron.style.transform = open ? 'rotate(180deg)' : '';
  if (open) { loadLabelsFromDB(); loadMapBoxes(); renderMapBoxList(); renderMapOverlay(); }
}
// ═══════════════════════════════════════════════════════════
// JOB DASHBOARD
// ═══════════════════════════════════════════════════════════
let allProjects = [];
let njPdfFile = null;
let selectedCustomerId = null;

// Track recently opened per user in localStorage
function getRecentlyOpened() {
  try { return JSON.parse(localStorage.getItem('elite_recent_' + (CU?.id||'')) || '[]'); } catch(e) { return []; }
}
function addRecentlyOpened(projectId) {
  const key = 'elite_recent_' + (CU?.id||'');
  let recent = getRecentlyOpened().filter(id => id !== projectId);
  recent.unshift(projectId);
  recent = recent.slice(0, 5);
  localStorage.setItem(key, JSON.stringify(recent));
  // Update project cache so it appears immediately on next load
  const proj = allProjects?.find(p => p.id === projectId) || CP;
  if (proj) {
    const cached = getCachedProjects().filter(p => p.id !== projectId);
    cached.unshift(proj);
    setCachedProjects(cached.slice(0, 5));
  }
}

function getCachedProjects() {
  try { return JSON.parse(localStorage.getItem('elite_proj_cache_' + (CU?.id||'')) || '[]'); } catch(e) { return []; }
}
function setCachedProjects(projects) {
  try { localStorage.setItem('elite_proj_cache_' + (CU?.id||''), JSON.stringify(projects)); } catch(e) {}
}

async function loadJobDashboard() {
  // Never run dashboard logic while a project is open
  if (CP || pdfDoc) return;
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.add('hidden');
  const toolbar = document.getElementById('toolbar');
  if (toolbar) toolbar.style.display = 'none';
  const ipadToolbar = document.getElementById('ipad-toolbar');
  if (ipadToolbar) ipadToolbar.style.display = 'none';
  const searchEl = document.getElementById('job-search');
  if (searchEl) searchEl.value = '';
  const resultsPanel = document.getElementById('job-search-results');
  if (resultsPanel) resultsPanel.style.display = 'none';
  if (!CP && !pdfDoc) document.getElementById('dropzone').classList.remove('gone');

  const cards = document.getElementById('recent-cards');
  const _isIpad = navigator.maxTouchPoints > 1 && window.innerWidth >= 768;

  // Show cached projects immediately so iPad never shows endless loading
  const _cached = getCachedProjects();
  if (_cached.length > 0 && cards) {
    allProjects = _cached;
    renderRecentCards(_cached);
  } else if (cards) {
    cards.innerHTML = '<div style="color:var(--txt3);font-size:12px;padding:20px;">Loading...</div>';
  }

  // Then fetch fresh data from network in background
  const _withTimeout = (promise, ms) => Promise.race([promise, new Promise((_,rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
  let recentProjects = [];
  let fetchError = null;

  try {
    const recentIds = getRecentlyOpened();

    if (recentIds.length > 0) {
      try {
        const { data, error } = await _withTimeout(sb.from('markup_projects').select('*, markup_customers(name, customer_type), markup_locations(address)').in('id', recentIds), 8000);
        if (data) recentProjects = recentIds.map(id => data.find(p => p.id === id)).filter(Boolean);
      } catch(e) { fetchError = e; }
    }

    if (recentProjects.length === 0) {
      try {
        const { data, error } = await _withTimeout(
          sb.from('markup_projects').select('*, markup_customers(name, customer_type), markup_locations(address)').order('updated_at', { ascending: false }).limit(10),
          8000
        );
        recentProjects = (data || []).slice(0, 5);
      } catch(e) { fetchError = e; }
    }
  } catch(e) {
    fetchError = e;
  }

  // Guard: if project opened while we were fetching, bail out
  if (CP || pdfDoc) return;
  if (recentProjects.length > 0) {
    setCachedProjects(recentProjects);
    allProjects = recentProjects;
    renderRecentCards(recentProjects);
  } else if (_cached.length > 0) {
    // Already rendered cache above — leave it, just log
    console.log('[dashboard] network returned nothing, keeping cached display');
  } else {
    // Nothing from cache OR network — show appropriate message (never stay on "Loading...")
    if (cards) {
      if (fetchError) {
        cards.innerHTML = '<div style="color:var(--red);font-size:12px;padding:20px;text-align:center;">Error loading projects. Check connection.</div>';
      } else {
        cards.innerHTML = '<div style="color:var(--txt3);font-size:12px;text-align:center;padding:20px;">No recent projects yet</div>';
      }
    }
  }
}

async function renderRecentCards(projects) {
  const cards = document.getElementById('recent-cards');
  if (!cards) return;
  if (!projects.length) {
    cards.innerHTML = '<div style="color:var(--txt3);font-size:12px;text-align:center;padding:20px;">No recent projects yet</div>';
    return;
  }
  cards.innerHTML = '';
  cards.style.cssText = 'display:flex;flex-direction:column;gap:8px;width:100%;';

  const colors = ['#1d6fdb','#0e7a5a','#7c3aed','#b45309','#dc2626','#0891b2'];

  for (const p of projects) {
    const customer = p.markup_customers?.name || p.client || p.name?.split(' — ')[0] || 'Project';
    const address  = p.markup_locations?.address || p.name?.split(' — ')[1] || '';
    const jobType  = p.job_type || p.name?.split(' — ')[2] || '';
    const updated  = p.updated_at ? new Date(p.updated_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }) : '';
    const isCompany = p.markup_customers?.customer_type === 'company' || p.markup_customers?.customer_type === 'business';
    const color = colors[customer.charCodeAt(0) % colors.length];

    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:12px;padding:11px 14px;background:var(--surf2);border:1px solid var(--bdr);border-radius:10px;cursor:pointer;transition:border-color .14s;';
    row.addEventListener('mouseenter', () => row.style.borderColor = 'var(--acc)');
    row.addEventListener('mouseleave', () => row.style.borderColor = 'var(--bdr)');
    row.addEventListener('click', () => openProject(p.id));

    // Avatar with blueprint icon
    const avatarWrap = document.createElement('div');
    avatarWrap.style.cssText = `width:42px;height:42px;border-radius:10px;background:${color}18;display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative;`;
    avatarWrap.innerHTML = `<svg width="26" height="26" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.7">
      <rect x="8" y="8" width="48" height="48" rx="1" stroke="${color}" stroke-width="4" fill="none"/>
      <line x1="8" y1="30" x2="40" y2="30" stroke="${color}" stroke-width="3"/>
      <line x1="36" y1="30" x2="36" y2="56" stroke="${color}" stroke-width="3"/>
      <path d="M8 19 Q17 19 17 28" stroke="${color}" stroke-width="2" fill="none" stroke-dasharray="2 1"/>
      <path d="M36 43 Q45 43 45 52" stroke="${color}" stroke-width="2" fill="none" stroke-dasharray="2 1"/>
      <line x1="22" y1="8" x2="30" y2="8" stroke="${color}" stroke-width="4"/>
      <line x1="56" y1="18" x2="56" y2="26" stroke="${color}" stroke-width="4"/>
    </svg>`;
    if (isCompany) {
      const badge = document.createElement('div');
      badge.style.cssText = 'position:absolute;bottom:-3px;right:-3px;font-size:11px;line-height:1;';
      badge.textContent = '🏢';
      avatarWrap.appendChild(badge);
    }

    // Info
    const info = document.createElement('div');
    info.style.cssText = 'flex:1;min-width:0;';

    const custEl = document.createElement('div');
    custEl.style.cssText = 'font-size:13px;font-weight:700;color:var(--txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
    custEl.textContent = customer;

    const addrEl = document.createElement('div');
    addrEl.style.cssText = 'font-size:11px;color:var(--txt2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px;';
    addrEl.textContent = address;

    const jobEl = document.createElement('div');
    jobEl.style.cssText = 'font-size:11px;color:var(--txt3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px;';
    jobEl.textContent = jobType ? jobType + (updated ? '  ·  ' + updated : '') : updated;

    info.appendChild(custEl);
    if (address) info.appendChild(addrEl);
    if (jobType || updated) info.appendChild(jobEl);

    const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevron.setAttribute('width', '13'); chevron.setAttribute('height', '13');
    chevron.setAttribute('viewBox', '0 0 24 24'); chevron.setAttribute('fill', 'none');
    chevron.setAttribute('stroke', 'currentColor'); chevron.setAttribute('stroke-width', '2');
    chevron.style.color = 'var(--txt3)'; chevron.style.flexShrink = '0';
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    poly.setAttribute('points', '9,18 15,12 9,6');
    chevron.appendChild(poly);

    row.appendChild(avatarWrap);
    row.appendChild(info);
    row.appendChild(chevron);
    cards.appendChild(row);
  }
}

function renderRecentList(projects) {
  const list = document.getElementById('job-list');
  if (!list) return;
  list.innerHTML = '';
  if (!projects.length) {
    list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--txt3);font-size:12px;">No recent projects — create your first one above</div>';
    return;
  }
  // Section label
  const label = document.createElement('div');
  label.style.cssText = 'font-size:10px;font-weight:700;letter-spacing:1px;color:var(--txt3);text-transform:uppercase;margin-bottom:6px;';
  label.textContent = 'Recently opened';
  list.appendChild(label);
  renderJobRows(projects, list);
}

function renderJobList(projects) {
  const list = document.getElementById('job-list');
  if (!list) return;
  list.innerHTML = '';
  if (!projects.length) {
    list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--txt3);font-size:12px;">No projects found</div>';
    return;
  }
  renderJobRows(projects, list);
}

function renderJobRows(projects, list) {
  projects.forEach(p => {
    const customer = p.markup_customers?.name || '';
    const address = p.markup_locations?.address || '';
    const jobType = p.job_type || '';
    const updated = p.updated_at ? new Date(p.updated_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }) : '';
    const initials = (customer || p.name || 'P').substring(0, 2).toUpperCase();
    const colors = ['#1d6fdb','#0e7a5a','#7c3aed','#b45309','#dc2626','#0891b2'];
    const color = colors[(customer || p.name || '').charCodeAt(0) % colors.length];

    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:14px;padding:13px 16px;background:var(--surf2);border:1px solid var(--bdr);border-radius:10px;cursor:pointer;transition:border-color .14s;';
    row.addEventListener('mouseenter', () => row.style.borderColor = 'var(--acc)');
    row.addEventListener('mouseleave', () => row.style.borderColor = 'var(--bdr)');
    row.addEventListener('click', () => openProject(p.id));

    const avatar = document.createElement('div');
    avatar.style.cssText = 'width:36px;height:36px;border-radius:50%;background:' + color + '22;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:' + color + ';flex-shrink:0;';
    avatar.textContent = initials;

    const info = document.createElement('div');
    info.style.cssText = 'flex:1;min-width:0;';

    const title = document.createElement('div');
    title.style.cssText = 'font-size:13px;font-weight:600;color:var(--txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
    title.textContent = customer || p.name;
    info.appendChild(title);

    if (address) {
      const addrEl = document.createElement('div');
      addrEl.style.cssText = 'font-size:11px;color:var(--txt3);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      addrEl.textContent = address;
      info.appendChild(addrEl);
    }

    if (jobType) {
      const jnEl = document.createElement('div');
      jnEl.style.cssText = 'font-size:11px;color:var(--acc2);margin-top:1px;';
      jnEl.textContent = jobType;
      info.appendChild(jnEl);
    }

    const meta = document.createElement('div');
    meta.style.cssText = 'text-align:right;flex-shrink:0;';
    meta.innerHTML = '<div style="font-size:11px;color:var(--txt3);">' + updated + '</div>';

    const chevron = document.createElementNS('http://www.w3.org/2000/svg','svg');
    chevron.setAttribute('width','13'); chevron.setAttribute('height','13');
    chevron.setAttribute('viewBox','0 0 24 24'); chevron.setAttribute('fill','none');
    chevron.setAttribute('stroke','currentColor'); chevron.setAttribute('stroke-width','2');
    chevron.style.color = 'var(--txt3)';
    const poly = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    poly.setAttribute('points','9,18 15,12 9,6');
    chevron.appendChild(poly);

    row.appendChild(avatar); row.appendChild(info); row.appendChild(meta); row.appendChild(chevron);
    list.appendChild(row);
  });
}

let _searchTimer = null;

// ── Customer avatar helper ───────────────────────────────────────
// Returns a div with colored initials + a small 🏢 badge for companies
function makeCustAvatar(name, customerType, size = 34) {
  const colors = ['#1d6fdb','#0e7a5a','#7c3aed','#b45309','#dc2626','#0891b2'];
  const color = colors[(name || '').charCodeAt(0) % colors.length];
  const initials = (name || '??').substring(0, 2).toUpperCase();
  const isCompany = customerType === 'company' || customerType === 'business';
  const wrap = document.createElement('div');
  wrap.style.cssText = `position:relative;width:${size}px;height:${size}px;flex-shrink:0;`;
  const circle = document.createElement('div');
  circle.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${color}22;display:flex;align-items:center;justify-content:center;font-size:${Math.round(size*0.35)}px;font-weight:700;color:${color};`;
  circle.textContent = initials;
  wrap.appendChild(circle);
  if (isCompany) {
    const badge = document.createElement('div');
    badge.style.cssText = `position:absolute;bottom:-2px;right:-2px;font-size:${Math.round(size*0.38)}px;line-height:1;`;
    badge.textContent = '🏢';
    badge.title = 'Company / Builder';
    wrap.appendChild(badge);
  }
  return wrap;
}

function searchJobs(query) {
  const list = document.getElementById('job-list');
  const panel = document.getElementById('job-search-results');
  if (!query.trim()) {
    if (panel) panel.style.display = 'none';
    return;
  }
  // Show results panel with loading state
  if (panel) panel.style.display = 'block';
  if (list) list.innerHTML = '<div style="padding:16px;color:var(--txt3);font-size:12px;text-align:center;">Searching...</div>';
  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(() => doSearch(query.trim()), 250);
}

async function doSearch(query) {
  const list = document.getElementById('job-list');
  try {
    // Search customers AND projects simultaneously
    const [custResult, projResult] = await Promise.all([
      sb.from('markup_customers').select('id, name, archived, customer_type').ilike('name', '%' + query + '%').order('name').limit(20),
      sb.from('markup_projects').select('id, name, client, job_type, customer_id, updated_at, archived').or('name.ilike.%' + query + '%,client.ilike.%' + query + '%,job_type.ilike.%' + query + '%').order('updated_at', { ascending: false }).limit(30)
    ]);

    // Deduplicate customers by name — keep the oldest record (most likely to have projects linked)
    const custByName = new Map();
    (custResult.data || []).filter(c => c.archived !== true).forEach(c => {
      const key = c.name.toLowerCase().trim();
      const existing = custByName.get(key);
      if (!existing) {
        custByName.set(key, c);
      } else {
        // Keep whichever was created first (has projects linked to it)
        const existingDate = new Date(existing.created_at || 0);
        const thisDate = new Date(c.created_at || 0);
        if (thisDate < existingDate) custByName.set(key, c);
      }
    });
    const liveCustomers = Array.from(custByName.values());
    const matchedProjects = (projResult.data || []).filter(p => !p.archived);
    const custIds = new Set(liveCustomers.map(c => c.id));
    // Only show orphan projects when no customer record matched at all
    const orphanProjects = liveCustomers.length === 0
      ? matchedProjects.filter(p => !p.customer_id || !custIds.has(p.customer_id))
      : [];

    list.innerHTML = '';
    if (!liveCustomers.length && !orphanProjects.length) {
      list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--txt3);font-size:12px;">No results found for \"' + query + '\"</div>';
      return;
    }

    const colors = ['#1d6fdb','#0e7a5a','#7c3aed','#b45309','#dc2626','#0891b2'];

    liveCustomers.forEach(c => {
      const color = colors[c.name.charCodeAt(0) % colors.length];
      const isCompany = (c.customer_type === 'company' || c.customer_type === 'business');
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;border-bottom:1px solid var(--bdr);transition:background .1s;';
      row.addEventListener('mouseenter', () => row.style.background = 'var(--surf2)');
      row.addEventListener('mouseleave', () => row.style.background = '');
      row.addEventListener('click', () => {
        document.getElementById('job-search-results').style.display = 'none';
        document.getElementById('job-search').value = '';
        openCustomerModal(c.id, c.name, c.customer_type);
      });
      const avatar = makeCustAvatar(c.name, c.customer_type);
      const info = document.createElement('div');
      info.style.cssText = 'flex:1;min-width:0;';
      info.innerHTML = '<div style="font-size:13px;font-weight:600;color:var(--txt);">' + c.name + '</div><div style="font-size:11px;color:var(--txt3);">' + (isCompany ? 'Company / Builder' : 'Customer') + '</div>';
      const chevron = document.createElementNS('http://www.w3.org/2000/svg','svg');
      chevron.setAttribute('width','13'); chevron.setAttribute('height','13');
      chevron.setAttribute('viewBox','0 0 24 24'); chevron.setAttribute('fill','none');
      chevron.setAttribute('stroke','currentColor'); chevron.setAttribute('stroke-width','2');
      chevron.style.color = 'var(--txt3)';
      const poly = document.createElementNS('http://www.w3.org/2000/svg','polyline');
      poly.setAttribute('points','9,18 15,12 9,6');
      chevron.appendChild(poly);
      row.appendChild(avatar); row.appendChild(info); row.appendChild(chevron);
      list.appendChild(row);
    });

    if (orphanProjects.length) {
      // Group orphan projects by the customer name embedded before the first ' — '
      const byCustomer = new Map();
      orphanProjects.forEach(p => {
        const embeddedName = p.name.split(' — ')[0].trim();
        if (!byCustomer.has(embeddedName)) byCustomer.set(embeddedName, []);
        byCustomer.get(embeddedName).push(p);
      });

      byCustomer.forEach((projects, embeddedName) => {
        const color = colors[embeddedName.charCodeAt(0) % colors.length];
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;border-bottom:1px solid var(--bdr);transition:background .1s;';
        row.addEventListener('mouseenter', () => row.style.background = 'var(--surf2)');
        row.addEventListener('mouseleave', () => row.style.background = '');
        row.addEventListener('click', async () => {
          document.getElementById('job-search-results').style.display = 'none';
          document.getElementById('job-search').value = '';
          // Create a proper customer record then open their modal
          showLoad('Setting up customer...');
          try {
            const { data: existing } = await sb.from('markup_customers').select('id, name, customer_type').ilike('name', embeddedName).limit(1).maybeSingle();
            let custId, custType;
            if (existing) {
              custId = existing.id;
              custType = existing.customer_type || 'individual';
            } else {
              const { data: newCust } = await sb.from('markup_customers').insert({ name: embeddedName, customer_type: 'individual', created_by: CU?.id }).select().single();
              custId = newCust?.id;
              custType = 'individual';
            }
            // Link all matching projects to this customer
            if (custId) {
              const projIds = projects.map(p => p.id);
              await sb.from('markup_projects').update({ customer_id: custId }).in('id', projIds);
            }
            hideLoad();
            if (custId) openCustomerModal(custId, embeddedName, custType);
          } catch(e) { hideLoad(); toast('Error: ' + e.message, true); }
        });
        const avatar = makeCustAvatar(embeddedName, 'individual');
        const info = document.createElement('div');
        info.style.cssText = 'flex:1;min-width:0;';
        info.innerHTML = '<div style="font-size:13px;font-weight:600;color:var(--txt);">' + embeddedName + '</div><div style="font-size:11px;color:var(--txt3);">' + projects.length + ' project' + (projects.length !== 1 ? 's' : '') + ' · Tap to set up customer page</div>';
        const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        chevron.setAttribute('width', '13'); chevron.setAttribute('height', '13');
        chevron.setAttribute('viewBox', '0 0 24 24'); chevron.setAttribute('fill', 'none');
        chevron.setAttribute('stroke', 'currentColor'); chevron.setAttribute('stroke-width', '2');
        chevron.style.color = 'var(--txt3)';
        const poly2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        poly2.setAttribute('points', '9,18 15,12 9,6');
        chevron.appendChild(poly2);
        row.appendChild(avatar); row.appendChild(info); row.appendChild(chevron);
        list.appendChild(row);
      });
    }
  } catch(e) {
    if (list) list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--red);font-size:12px;">Search error: ' + e.message + '</div>';
  }
}

// ── Customer modal ────────────────────────────────────────────────

// ── All customers list ───────────────────────────────────────────

let _acAllCustomers = [];
let _acTab = 'live'; // 'live' | 'archived'

function acSetTab(tab) {
  _acTab = tab;
  const liveBtn = document.getElementById('ac-tab-live');
  const archBtn = document.getElementById('ac-tab-archived');
  if (liveBtn && archBtn) {
    liveBtn.style.background   = tab === 'live'     ? 'var(--acc)' : 'none';
    liveBtn.style.color        = tab === 'live'     ? '#fff'       : 'var(--txt3)';
    archBtn.style.background   = tab === 'archived' ? 'var(--acc)' : 'none';
    archBtn.style.color        = tab === 'archived' ? '#fff'       : 'var(--txt3)';
  }
  document.getElementById('ac-filter').value = '';
  acFilter('');
}

async function openAllCustomers() {
  _acTab = 'live';
  document.getElementById('all-customers-modal').classList.remove('gone');
  document.getElementById('ac-filter').value = '';
  // Reset tabs visually
  const liveBtn = document.getElementById('ac-tab-live');
  const archBtn = document.getElementById('ac-tab-archived');
  if (liveBtn) { liveBtn.style.background = 'var(--acc)'; liveBtn.style.color = '#fff'; }
  if (archBtn) { archBtn.style.background = 'none'; archBtn.style.color = 'var(--txt3)'; }
  const list = document.getElementById('ac-list');
  list.innerHTML = '<div style="color:var(--txt3);font-size:12px;text-align:center;padding:20px;">Loading...</div>';
  try {
    let resolvedData = [];
    try {
      const { data: d1, error: e1 } = await sb.from('markup_customers').select('id, name, archived, customer_type').order('name');
      if (e1) throw e1;
      resolvedData = d1 || [];
    } catch(_) {
      // archived column doesn't exist yet — load without it
      const { data: d2 } = await sb.from('markup_customers').select('id, name').order('name');
      resolvedData = d2 || [];
    }
    _acAllCustomers = resolvedData;
    acFilter('');
  } catch(e) {
    list.innerHTML = '<div style="color:var(--red);font-size:12px;text-align:center;padding:20px;">Error loading customers</div>';
  }
}

function acFilter(query) {
  const q = query.trim().toLowerCase();
  const subset = _acAllCustomers.filter(c => {
    const matchesTab = _acTab === 'archived' ? c.archived === true : c.archived !== true;
    const matchesQ   = !q || c.name.toLowerCase().includes(q);
    return matchesTab && matchesQ;
  });
  acRender(subset);
}

function acRender(customers) {
  const list = document.getElementById('ac-list');
  list.innerHTML = '';
  const isArchived = _acTab === 'archived';
  if (!customers.length) {
    list.innerHTML = '<div style="color:var(--txt3);font-size:12px;text-align:center;padding:20px;">' +
      (isArchived ? 'No archived customers' : 'No active customers found') + '</div>';
    return;
  }
  const colors = ['#1d6fdb','#0e7a5a','#7c3aed','#b45309','#dc2626','#0891b2'];
  customers.forEach(c => {
    const color   = colors[c.name.charCodeAt(0) % colors.length];
    const initials = c.name.substring(0,2).toUpperCase();
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:12px;padding:11px 14px;background:var(--surf2);border:1px solid var(--bdr);border-radius:9px;transition:border-color .14s;' + (isArchived ? 'opacity:.7;' : '');
    row.addEventListener('mouseenter', () => row.style.borderColor = 'var(--acc)');
    row.addEventListener('mouseleave', () => row.style.borderColor = 'var(--bdr)');

    const avatar = makeCustAvatar(c.name, c.customer_type);
    avatar.title = 'Open customer';
    avatar.style.cursor = 'pointer';
    avatar.addEventListener('click', () => { closeModal('all-customers-modal'); openCustomerModal(c.id, c.name, c.customer_type); });

    const nameEl = document.createElement('div');
    nameEl.style.cssText = 'flex:1;font-size:13px;font-weight:600;color:var(--txt);cursor:pointer;';
    nameEl.textContent = c.name;
    nameEl.addEventListener('click', () => { closeModal('all-customers-modal'); openCustomerModal(c.id, c.name, c.customer_type); });

    // Archive / Unarchive button
    const archBtn = document.createElement('button');
    archBtn.style.cssText = "background:none;border:1px solid var(--bdr2);border-radius:6px;padding:5px 10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;flex-shrink:0;white-space:nowrap;color:" + (isArchived ? "var(--acc)" : "var(--txt3)") + ";";
    archBtn.textContent = isArchived ? 'Unarchive' : 'Archive';
    archBtn.title = isArchived ? 'Restore this customer and their projects' : 'Archive this customer and all their projects';
    archBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const action = isArchived ? 'unarchive' : 'archive';
      if (!confirm((isArchived ? 'Unarchive' : 'Archive') + ' ' + c.name + ' and all their projects?')) return;
      try {
        await sb.from('markup_customers').update({ archived: !isArchived }).eq('id', c.id);
        await sb.from('markup_projects').update({ archived: !isArchived }).eq('customer_id', c.id);
        // Remove from local list and re-render
        _acAllCustomers = _acAllCustomers.map(x => x.id === c.id ? { ...x, archived: !isArchived } : x);
        acFilter(document.getElementById('ac-filter')?.value || '');
        toast(c.name + (isArchived ? ' unarchived' : ' archived'));
      } catch(err) {
        toast('Error: ' + err.message, true);
      }
    });

    row.appendChild(avatar); row.appendChild(nameEl); row.appendChild(archBtn);
    list.appendChild(row);
  });
}

// ── Customer modal ────────────────────────────────────────────────

let _cmCustomerId = null;
let _cmCustomerName = '';
let _cmCustomerType = 'individual'; // 'individual' | 'company'
let _cmAddresses  = []; // [{id, address}]

async function openCustomerModal(customerId, customerName, customerType) {
  // Always cancel any in-progress name edit before loading new customer
  cmCancelEditName();

  _cmCustomerId = customerId;
  _cmCustomerName = customerName;
  _cmCustomerType = customerType || 'individual';
  // Fetch fresh type from Supabase — handles legacy records with null customer_type
  const { data: cRow } = await sb.from('markup_customers').select('customer_type').eq('id', customerId).single();
  _cmCustomerType = cRow?.customer_type || 'individual';
  _cmAddresses  = [];

  const colors = ['#1d6fdb','#0e7a5a','#7c3aed','#b45309','#dc2626','#0891b2'];
  const color   = colors[customerName.charCodeAt(0) % colors.length];
  const initials = customerName.substring(0,2).toUpperCase();
  const isCompany = _cmCustomerType === 'company' || _cmCustomerType === 'business';

  const avatarEl = document.getElementById('cm-avatar');
  if (avatarEl) {
    avatarEl.style.background = color + '22';
    avatarEl.style.color = color;
    avatarEl.style.position = 'relative';
    avatarEl.textContent = initials;
    // Remove old badge if any
    const oldBadge = avatarEl.querySelector('.cm-company-badge');
    if (oldBadge) oldBadge.remove();
    if (isCompany) {
      const badge = document.createElement('div');
      badge.className = 'cm-company-badge';
      badge.style.cssText = 'position:absolute;bottom:-3px;right:-3px;font-size:13px;line-height:1;';
      badge.textContent = '🏢';
      avatarEl.appendChild(badge);
    }
  }
  const nameEl = document.getElementById('cm-name');
  if (nameEl) nameEl.textContent = customerName;

  // Hide new-address row if open from previous use
  const newAddrRow = document.getElementById('cm-new-addr-row');
  if (newAddrRow) newAddrRow.style.display = 'none';

  // Reset archived toggle
  _cmShowArchived = false;
  const archToggle = document.getElementById('cm-archived-toggle');
  if (archToggle) { archToggle.textContent = '📦 View Archived'; archToggle.style.color = 'var(--txt3)'; archToggle.style.borderColor = 'var(--bdr2)'; }
  document.getElementById('customer-modal').classList.remove('gone');
  document.getElementById('cm-project-list').innerHTML = '<div style="color:var(--txt3);font-size:12px;text-align:center;padding:20px;">Loading...</div>';

  try {
    // Load all addresses for this customer
    const { data: locs } = await sb.from('markup_locations')
      .select('id, address').eq('customer_id', customerId).order('address');
    _cmAddresses = locs || [];

    const sel = document.getElementById('cm-addr-select');
    sel.innerHTML = '';
    if (_cmAddresses.length > 0) {
      _cmAddresses.forEach(loc => {
        const opt = document.createElement('option');
        opt.value = loc.id;
        opt.textContent = loc.address;
        sel.appendChild(opt);
      });
    } else {
      const opt = document.createElement('option');
      opt.value = '__none__';
      opt.textContent = 'No address on file';
      sel.appendChild(opt);
    }
    // Add new address option always at bottom
    const newOpt = document.createElement('option');
    newOpt.value = '__new__';
    newOpt.textContent = '＋ Add new address…';
    sel.appendChild(newOpt);

    // Load projects for the first address (or all if no addresses)
    const firstLocId = _cmAddresses.length > 0 ? _cmAddresses[0].id : null;
    const editBtn = document.getElementById('cm-addr-edit-btn');
    if (editBtn) editBtn.style.display = firstLocId ? 'inline-flex' : 'none';
    await cmLoadProjects(customerId, firstLocId);
  } catch(e) {
    document.getElementById('cm-project-list').innerHTML = '<div style="color:var(--red);font-size:12px;text-align:center;padding:20px;">Error loading data</div>';
  }
}

async function cmAddressChanged(val) {
  const editBtn = document.getElementById('cm-addr-edit-btn');
  if (val === '__new__') {
    // Show inline new-address input, revert select to previous value
    const sel = document.getElementById('cm-addr-select');
    if (_cmAddresses.length > 0) sel.value = _cmAddresses[0].id;
    else sel.value = '__none__';
    if (editBtn) editBtn.style.display = 'none';
    document.getElementById('cm-new-addr-row').style.display = 'block';
    document.getElementById('cm-new-addr-input').focus();
    return;
  }
  if (val === '__none__') {
    if (editBtn) editBtn.style.display = 'none';
    await cmLoadProjects(_cmCustomerId, null);
    return;
  }
  if (editBtn) editBtn.style.display = 'inline-flex';
  await cmLoadProjects(_cmCustomerId, val);
}

let _cmShowArchived = false;

function cmToggleArchived() {
  _cmShowArchived = !_cmShowArchived;
  const btn = document.getElementById('cm-archived-toggle');
  if (btn) {
    btn.textContent = _cmShowArchived ? '✅ Viewing Archived' : '📦 View Archived';
    btn.style.color = _cmShowArchived ? 'var(--acc)' : 'var(--txt3)';
    btn.style.borderColor = _cmShowArchived ? 'var(--acc)' : 'var(--bdr2)';
  }
  const sel = document.getElementById('cm-addr-select');
  const locId = sel && sel.value !== '__none__' && sel.value !== '__new__' ? sel.value : null;
  cmLoadProjects(_cmCustomerId, locId);
}

async function cmLoadProjects(customerId, locationId) {
  const list = document.getElementById('cm-project-list');
  list.innerHTML = '<div style="color:var(--txt3);font-size:12px;text-align:center;padding:20px;">Loading...</div>';
  try {
    let q = sb.from('markup_projects')
      .select('*, markup_customers(name), markup_locations(address)')
      .eq('customer_id', customerId)
      .order('updated_at', { ascending: false });
    if (_cmShowArchived) {
      q = q.eq('archived', true);
    } else {
      q = q.not('archived', 'eq', true);
    }
    if (locationId) q = q.eq('location_id', locationId);
    const { data: projects } = await q;

    // If filtering by location returned nothing, also check for projects with no location_id
    let allProjects = projects || [];
    if (locationId && !allProjects.length) {
      let q2 = sb.from('markup_projects')
        .select('*, markup_customers(name), markup_locations(address)')
        .eq('customer_id', customerId)
        .is('location_id', null)
        .order('updated_at', { ascending: false });
      if (_cmShowArchived) q2 = q2.eq('archived', true);
      else q2 = q2.not('archived', 'eq', true);
      const { data: unlinked } = await q2;
      allProjects = unlinked || [];
    }

    list.innerHTML = '';
    if (!allProjects.length) {
      list.innerHTML = '<div style="color:var(--txt3);font-size:12px;text-align:center;padding:30px;">' + (_cmShowArchived ? 'No archived projects' : 'No projects at this address') + '</div>';
      return;
    }
    const colors = ['#1d6fdb','#0e7a5a','#7c3aed','#b45309','#dc2626','#0891b2'];
    allProjects.forEach(p => {
      const customer = p.markup_customers?.name || p.name || '';
      const address  = p.markup_locations?.address || '';
      let jobType    = p.job_type || '';
      const updated  = p.updated_at ? new Date(p.updated_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }) : '';
      const color    = colors[(p.job_type || p.name || '').charCodeAt(0) % colors.length];
      const initials = (p.job_type || p.name || 'JB').substring(0, 2).toUpperCase();

      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:14px;padding:13px 16px;background:var(--surf2);border:1px solid var(--bdr);border-radius:10px;cursor:pointer;transition:border-color .14s;' + (_cmShowArchived ? 'opacity:.65;' : '');
      row.addEventListener('mouseenter', () => row.style.borderColor = 'var(--acc)');
      row.addEventListener('mouseleave', () => row.style.borderColor = 'var(--bdr)');
      row.addEventListener('click', () => { if (!_cmShowArchived) { closeModal('customer-modal'); openProject(p.id); } });

      const avatar = document.createElement('div');
      avatar.style.cssText = 'width:36px;height:36px;border-radius:50%;background:' + color + '22;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:' + color + ';flex-shrink:0;';
      avatar.textContent = initials;

      const info = document.createElement('div');
      info.style.cssText = 'flex:1;min-width:0;';

      // Title row with inline edit
      const titleRow = document.createElement('div');
      titleRow.style.cssText = 'display:flex;align-items:center;gap:6px;';

      const title = document.createElement('div');
      title.style.cssText = 'font-size:13px;font-weight:600;color:var(--txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0;';
      title.textContent = jobType || p.name;

      // ⋯ menu button (rename + archive/restore)
      const menuBtn = document.createElement('button');
      menuBtn.innerHTML = '&bull;&bull;&bull;';
      menuBtn.title = 'Project options';
      menuBtn.style.cssText = 'background:none;border:none;color:var(--txt3);cursor:pointer;padding:4px 8px;flex-shrink:0;line-height:1;font-size:15px;letter-spacing:1px;';
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Remove any existing menu
        document.querySelectorAll('.cm-proj-menu').forEach(m => m.remove());
        const menu = document.createElement('div');
        menu.className = 'cm-proj-menu';
        menu.style.cssText = 'position:fixed;background:var(--surf);border:1px solid var(--bdr2);border-radius:9px;box-shadow:0 8px 32px rgba(0,0,0,.4);z-index:9999;min-width:160px;overflow:hidden;';
        const items = _cmShowArchived
          ? [{ label: '♻️ Restore Project', action: 'restore' }]
          : [{ label: '✏️ Rename', action: 'rename' }, { label: '📦 Archive Project', action: 'archive', danger: true }];
        items.forEach(item => {
          const btn = document.createElement('button');
          btn.textContent = item.label;
          btn.style.cssText = 'display:block;width:100%;padding:10px 14px;background:none;border:none;text-align:left;font-family:DM Sans,sans-serif;font-size:13px;color:' + (item.danger ? '#ef4444' : 'var(--txt)') + ';cursor:pointer;';
          btn.addEventListener('mouseenter', () => btn.style.background = 'var(--surf2)');
          btn.addEventListener('mouseleave', () => btn.style.background = '');
          btn.addEventListener('click', async (ev) => {
            ev.stopPropagation();
            menu.remove();
            if (item.action === 'rename') {
              const current = jobType || p.name;
              const newName = prompt('Rename project:', current);
              if (!newName || !newName.trim() || newName.trim() === current) return;
              const trimmed = newName.trim();
              const custName = p.markup_customers?.name || '';
              const addr = p.markup_locations?.address || '';
              const fullName = custName + (addr ? ' — ' + addr : '') + ' — ' + trimmed;
              const { error } = await sb.from('markup_projects').update({ job_type: trimmed, name: fullName }).eq('id', p.id);
              if (error) { toast('Failed to rename', true); return; }
              title.textContent = trimmed;
              jobType = trimmed; p.job_type = trimmed; p.name = fullName;
              toast('✅ Project renamed');
            } else if (item.action === 'archive') {
              if (!confirm('Archive "' + (jobType || p.name) + '"? It will be hidden from the project list.')) return;
              const { error } = await sb.from('markup_projects').update({ archived: true }).eq('id', p.id);
              if (error) { toast('Failed to archive', true); return; }
              toast('📦 Project archived');
              row.remove();
            } else if (item.action === 'restore') {
              const { error } = await sb.from('markup_projects').update({ archived: false }).eq('id', p.id);
              if (error) { toast('Failed to restore', true); return; }
              toast('✅ Project restored');
              row.remove();
            }
          });
          menu.appendChild(btn);
        });
        // Position near the button
        const rect = menuBtn.getBoundingClientRect();
        menu.style.top = (rect.bottom + 4) + 'px';
        menu.style.right = (window.innerWidth - rect.right) + 'px';
        document.body.appendChild(menu);
        // Close on outside click
        setTimeout(() => document.addEventListener('click', function close() {
          menu.remove(); document.removeEventListener('click', close);
        }), 0);
      });

      titleRow.appendChild(title);
      info.appendChild(titleRow);
      if (address) {
        const addrEl = document.createElement('div');
        addrEl.style.cssText = 'font-size:11px;color:var(--txt3);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
        addrEl.textContent = address;
        info.appendChild(addrEl);
      }

      const meta = document.createElement('div');
      meta.style.cssText = 'text-align:right;flex-shrink:0;font-size:11px;color:var(--txt3);';
      meta.textContent = updated;

      const chevron = document.createElementNS('http://www.w3.org/2000/svg','svg');
      chevron.setAttribute('width','13'); chevron.setAttribute('height','13');
      chevron.setAttribute('viewBox','0 0 24 24'); chevron.setAttribute('fill','none');
      chevron.setAttribute('stroke','currentColor'); chevron.setAttribute('stroke-width','2');
      chevron.style.color = 'var(--txt3)';
      const poly = document.createElementNS('http://www.w3.org/2000/svg','polyline');
      poly.setAttribute('points','9,18 15,12 9,6');
      chevron.appendChild(poly);

      row.appendChild(avatar); row.appendChild(info); row.appendChild(meta); row.appendChild(menuBtn);
      list.appendChild(row);
    });
  } catch(e) {
    list.innerHTML = '<div style="color:var(--red);font-size:12px;text-align:center;padding:20px;">Error loading projects</div>';
  }
}

function cmStartEditName() {
  const nameEl = document.getElementById('cm-name');
  const editRow = document.getElementById('cm-name-edit-row');
  const fnInput = document.getElementById('cm-name-first');
  const lnInput = document.getElementById('cm-name-last');
  const cnInput = document.getElementById('cm-name-company');
  const indFields = document.getElementById('cm-edit-individual-fields');
  const bizFields = document.getElementById('cm-edit-company-fields');
  const toggleBtn = document.getElementById('cm-toggle-type-btn');
  if (!nameEl || !editRow) return;
  const isCompany = (_cmCustomerType === 'company' || _cmCustomerType === 'business');
  if (isCompany) {
    if (indFields) indFields.style.display = 'none';
    if (bizFields) bizFields.style.display = 'block';
    if (cnInput) cnInput.value = nameEl.textContent.trim();
    if (toggleBtn) toggleBtn.textContent = '👤 Switch to Individual';
  } else {
    if (indFields) indFields.style.display = 'flex';
    if (bizFields) bizFields.style.display = 'none';
    const parts = nameEl.textContent.trim().split(' ');
    if (fnInput) fnInput.value = parts[0] || '';
    if (lnInput) lnInput.value = parts.slice(1).join(' ') || '';
    if (toggleBtn) toggleBtn.textContent = '🏢 Switch to Company';
  }
  nameEl.parentElement.style.display = 'none';
  editRow.style.display = 'flex';
  (isCompany ? cnInput : fnInput)?.focus();
  const onKey = (e) => {
    if (e.key === 'Enter') cmSaveEditName();
    if (e.key === 'Escape') cmCancelEditName();
  };
  if (fnInput) fnInput.onkeydown = onKey;
  if (lnInput) lnInput.onkeydown = onKey;
  if (cnInput) cnInput.onkeydown = onKey;
}

function cmToggleCustomerType() {
  _cmCustomerType = (_cmCustomerType === 'company' || _cmCustomerType === 'business') ? 'individual' : 'company';
  const indFields = document.getElementById('cm-edit-individual-fields');
  const bizFields = document.getElementById('cm-edit-company-fields');
  const toggleBtn = document.getElementById('cm-toggle-type-btn');
  const nameEl = document.getElementById('cm-name');
  const isCompany = (_cmCustomerType === 'company' || _cmCustomerType === 'business');
  if (indFields) indFields.style.display = isCompany ? 'none' : 'flex';
  if (bizFields) bizFields.style.display = isCompany ? 'block' : 'none';
  if (toggleBtn) toggleBtn.textContent = isCompany ? '👤 Switch to Individual' : '🏢 Switch to Company';
  const curName = nameEl?.textContent.trim() || '';
  if (isCompany) {
    const cn = document.getElementById('cm-name-company');
    if (cn) { cn.value = curName; cn.focus(); }
  } else {
    const parts = curName.split(' ');
    const fn = document.getElementById('cm-name-first');
    const ln = document.getElementById('cm-name-last');
    if (fn) fn.value = parts[0] || '';
    if (ln) ln.value = parts.slice(1).join(' ') || '';
    fn?.focus();
  }
}

function cmCancelEditName() {
  const nameEl = document.getElementById('cm-name');
  const editRow = document.getElementById('cm-name-edit-row');
  if (!nameEl || !editRow) return;
  nameEl.parentElement.style.display = 'flex';
  editRow.style.display = 'none';
}

async function cmSaveEditName() {
  const nameEl = document.getElementById('cm-name');
  const editRow = document.getElementById('cm-name-edit-row');
  const fnInput = document.getElementById('cm-name-first');
  const lnInput = document.getElementById('cm-name-last');
  const cnInput = document.getElementById('cm-name-company');
  const avatar = document.getElementById('cm-avatar');
  if (!nameEl || !editRow) return;
  const isCompany = (_cmCustomerType === 'company' || _cmCustomerType === 'business');
  let newName;
  if (isCompany) {
    newName = (cnInput?.value || '').trim();
    if (!newName) { toast('Enter a company name', true); cnInput?.focus(); return; }
  } else {
    const firstName = (fnInput?.value || '').trim();
    const lastName = (lnInput?.value || '').trim();
    if (!firstName) { toast('Enter first name', true); fnInput?.focus(); return; }
    if (!lastName) { toast('Enter last name', true); lnInput?.focus(); return; }
    newName = firstName + ' ' + lastName;
  }
  const { error } = await sb.from('markup_customers').update({ name: newName, customer_type: _cmCustomerType }).eq('id', _cmCustomerId);
  if (error) { toast('Failed to save', true); return; }
  nameEl.textContent = newName;
  _cmCustomerName = newName;
  if (avatar) {
    const colors = ['#1d6fdb','#0e7a5a','#7c3aed','#b45309','#dc2626','#0891b2'];
    const color = colors[newName.charCodeAt(0) % colors.length];
    avatar.style.background = color + '22';
    avatar.style.color = color;
    avatar.style.position = 'relative';
    avatar.textContent = newName.substring(0, 2).toUpperCase();
    const oldBadge = avatar.querySelector('.cm-company-badge');
    if (oldBadge) oldBadge.remove();
    if (isCompany) {
      const badge = document.createElement('div');
      badge.className = 'cm-company-badge';
      badge.style.cssText = 'position:absolute;bottom:-3px;right:-3px;font-size:13px;line-height:1;';
      badge.textContent = '🏢';
      avatar.appendChild(badge);
    }
  }
  cmCancelEditName();
  toast('✅ ' + (isCompany ? 'Company' : 'Name') + ' updated');
  if (typeof loadAllCustomers === 'function') loadAllCustomers();
}

async function cmSaveNewAddress() {
  const input = document.getElementById('cm-new-addr-input');
  const address = (input?.value || '').trim();
  if (!address) { toast('Enter an address', true); return; }
  try {
    const { data: newLoc, error } = await sb.from('markup_locations')
      .insert({ customer_id: _cmCustomerId, address }).select().single();
    if (error) throw error;
    _cmAddresses.push(newLoc);
    // Add to select and switch to it
    const sel = document.getElementById('cm-addr-select');
    const newOptEl = sel.querySelector('option[value="__new__"]');
    const noneOptEl = sel.querySelector('option[value="__none__"]');
    if (noneOptEl) noneOptEl.remove();
    if (newOptEl) newOptEl.remove();
    const opt = document.createElement('option');
    opt.value = newLoc.id;
    opt.textContent = newLoc.address;
    sel.appendChild(opt);
    const addMoreOpt = document.createElement('option');
    addMoreOpt.value = '__new__';
    addMoreOpt.textContent = '＋ Add new address…';
    sel.appendChild(addMoreOpt);
    sel.value = newLoc.id;
    document.getElementById('cm-new-addr-row').style.display = 'none';
    input.value = '';
    toast('Address saved');

    // Check if this customer has existing projects with no location_id
    const { data: unlinked } = await sb.from('markup_projects')
      .select('id, name')
      .eq('customer_id', _cmCustomerId)
      .is('location_id', null)
      .not('archived', 'eq', true);

    if (unlinked?.length) {
      // Ask if they want to move existing projects to this address
      const m = document.createElement('div');
      m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:99999;display:flex;align-items:center;justify-content:center;';
      m.innerHTML = `<div style="background:var(--surf);border:1px solid var(--bdr2);border-radius:14px;padding:24px;max-width:340px;width:90%;display:flex;flex-direction:column;gap:12px;box-shadow:0 24px 80px rgba(0,0,0,.7);">
        <div style="font-size:15px;font-weight:700;color:var(--txt);">Link Existing Projects?</div>
        <div style="font-size:13px;color:var(--txt2);line-height:1.5;">There ${unlinked.length === 1 ? 'is' : 'are'} <strong>${unlinked.length} existing project${unlinked.length !== 1 ? 's' : ''}</strong> for this customer with no address on file. Move ${unlinked.length === 1 ? 'it' : 'them'} to <strong>${address}</strong>?</div>
        <button id="_lp-yes" style="padding:11px;background:var(--acc);border:none;border-radius:8px;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;">Yes, link to this address</button>
        <button id="_lp-no" style="padding:8px;background:transparent;border:none;color:var(--txt3);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;">No, keep them unassigned</button>
      </div>`;
      document.body.appendChild(m);
      m.querySelector('#_lp-yes').onclick = async () => {
        m.remove();
        await sb.from('markup_projects').update({ location_id: newLoc.id }).eq('customer_id', _cmCustomerId).is('location_id', null);
        toast('✅ Projects linked to address');
        await cmLoadProjects(_cmCustomerId, newLoc.id);
      };
      m.querySelector('#_lp-no').onclick = () => {
        m.remove();
        cmLoadProjects(_cmCustomerId, newLoc.id);
      };
    } else {
      await cmLoadProjects(_cmCustomerId, newLoc.id);
    }
  } catch(e) {
    toast('Error saving address: ' + e.message, true);
  }
}

function cmCancelNewAddress() {
  document.getElementById('cm-new-addr-row').style.display = 'none';
  document.getElementById('cm-new-addr-input').value = '';
}

function cmStartEditAddress() {
  const sel = document.getElementById('cm-addr-select');
  const locId = sel?.value;
  if (!locId || locId === '__none__' || locId === '__new__') return;
  const loc = _cmAddresses.find(a => a.id === locId);
  if (!loc) return;
  const editRow = document.getElementById('cm-edit-addr-row');
  const editInput = document.getElementById('cm-edit-addr-input');
  if (!editRow || !editInput) return;
  editInput.value = loc.address;
  editRow.style.display = 'block';
  editInput.focus();
  editInput.select();
  editInput.onkeydown = (e) => { if (e.key === 'Enter') cmSaveEditAddress(); if (e.key === 'Escape') cmCancelEditAddress(); };
}

async function cmSaveEditAddress() {
  const sel = document.getElementById('cm-addr-select');
  const locId = sel?.value;
  const editInput = document.getElementById('cm-edit-addr-input');
  const newAddress = (editInput?.value || '').trim();
  if (!newAddress) { toast('Enter an address', true); editInput?.focus(); return; }
  if (!locId || locId === '__none__' || locId === '__new__') return;
  const { error } = await sb.from('markup_locations').update({ address: newAddress }).eq('id', locId);
  if (error) { toast('Failed to save: ' + error.message, true); return; }
  // Update local state and dropdown
  const loc = _cmAddresses.find(a => a.id === locId);
  if (loc) loc.address = newAddress;
  const opt = sel.querySelector('option[value="' + locId + '"]');
  if (opt) opt.textContent = newAddress;
  cmCancelEditAddress();
  toast('✅ Address updated');
}

function cmStartNewProject() {
  // Get currently selected address from the dropdown
  const sel = document.getElementById('cm-addr-select');
  const locId = sel?.value;
  let address = '';
  if (locId && locId !== '__none__' && locId !== '__new__') {
    const loc = _cmAddresses.find(a => a.id === locId);
    address = loc?.address || '';
  }
  closeModal('customer-modal');
  showNewJobModal(null, {
    customerId: _cmCustomerId,
    customerName: _cmCustomerName,
    customerType: _cmCustomerType,
    address
  });
}

function cmCancelEditAddress() {
  const editRow = document.getElementById('cm-edit-addr-row');
  const editInput = document.getElementById('cm-edit-addr-input');
  if (editRow) editRow.style.display = 'none';
  if (editInput) editInput.value = '';
}

async function openProject(projectId, opts={}) {
  addRecentlyOpened(projectId);
  showLoad('Opening project...');
  try {
    const project = allProjects.find(p => p.id === projectId) ||
      (await sb.from('markup_projects').select('*, markup_customers(name), markup_locations(address)').eq('id', projectId).single()).data;
    if (!project) { hideLoad(); toast('Project not found', true); return; }
    CP = project;
    currentFileName = project.name;
    currentVariantId = null;

    // Check for saved variants (skip picker for auto-restore)
    if (!opts.skipPicker) {
      hideLoad();
      const variantChoice = await showVariantPicker(projectId, project.name);
      if (variantChoice === null) return;
      if (variantChoice && variantChoice !== 'base') {
        await openVariant(variantChoice); return;
      }
      showLoad('Opening project...');
    }

    // Hide dashboard, show editor UI
    document.getElementById('dropzone').classList.add('gone');
    document.getElementById('cwrap').style.overflow = 'auto';
    
    setProjectUI(currentFileName);
    // Update iPhone canvas title — base project, no variant
    const _iphoneFnameB = document.getElementById('iphone-canvas-fname');
    if (_iphoneFnameB) {
      const _custB = project.client || project.markup_customers?.name || project.name || '';
      _iphoneFnameB.textContent = _custB;
    }
    await new Promise(r => setTimeout(r, 80));

    // Base project always opens as a clean blank canvas — no annotations loaded.
    // Variants are the place to store markup; the base is always the original untouched PDF.
    strokes = [];
    icons = [];
    // Re-assert UI state after async calls
    document.getElementById('dropzone').classList.add('gone');
    
    document.getElementById('cwrap').style.overflow = 'auto';

    // Try to load PDF from Supabase Storage
    if (project.pdf_storage_path) {
      showLoad('Loading PDF...');
      try {
        const { data: pdfBlob, error: dlErr } = await sb.storage.from('plan-pdfs').download(project.pdf_storage_path);
        if (dlErr) throw dlErr;
        const pdfFile = new File([pdfBlob], project.pdf_filename || 'plan.pdf', { type: 'application/pdf' });
        await loadPDF(pdfFile);
        window._apSourcePdfDoc = pdfDoc; window._apUsedPageNums = window._apUsedPageNums||[];
        hideLoad();
      } catch(e2) {
        hideLoad();
        console.warn('PDF load from storage failed:', e2.message);
        showPdfUploadPrompt(project);
      }
    } else {
      hideLoad();
      // No PDF in storage — prompt user to upload it
      showPdfUploadPrompt(project);
    }
  } catch(e) {
    hideLoad();
    toast('❌ ' + e.message, true);
  }
}

function showPdfUploadPrompt(project) {
  const existing = document.getElementById('pdf-prompt');
  if (existing) existing.remove();
  const pdfName = project?.pdf_filename || 'the floor plan PDF';
  const div = document.createElement('div');
  div.id = 'pdf-prompt';
  div.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--surf);border:1px solid var(--bdr2);border-radius:16px;padding:32px 36px;text-align:center;z-index:9999;box-shadow:0 20px 60px rgba(0,0,0,.5);max-width:380px;width:90%;';
  const icon = document.createElement('div');
  icon.innerHTML = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--acc);margin-bottom:12px;"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>';
  const titleEl = document.createElement('div');
  titleEl.style.cssText = 'font-size:16px;font-weight:700;color:var(--txt);margin-bottom:6px;';
  titleEl.textContent = 'Upload Floor Plan PDF';
  const subtitleEl = document.createElement('div');
  subtitleEl.style.cssText = 'font-size:12px;color:var(--txt3);margin-bottom:20px;line-height:1.5;';
  subtitleEl.textContent = 'Locate and upload ' + pdfName + ' to view and edit this project.';
  const uploadBtn = document.createElement('button');
  uploadBtn.style.cssText = 'display:block;width:100%;padding:12px 20px;background:var(--acc);border:none;border-radius:9px;color:#fff;font-family:DM Sans,sans-serif;font-size:14px;font-weight:600;cursor:pointer;margin-bottom:10px;';
  uploadBtn.textContent = 'Browse for PDF…';
  uploadBtn.addEventListener('click', () => {
    const _dynInput = document.createElement('input');
    _dynInput.type = 'file';
    _dynInput.accept = '.pdf';
    _dynInput.style.display = 'none';
    document.body.appendChild(_dynInput);
    _dynInput.addEventListener('change', async () => {
      if (!_dynInput.files[0]) { document.body.removeChild(_dynInput); return; }
      div.remove();
      await handleFile(_dynInput.files[0]);
      document.body.removeChild(_dynInput);
    });
    _dynInput.click();
  });
  const cancelBtn = document.createElement('div');
  cancelBtn.style.cssText = 'font-size:12px;color:var(--txt3);cursor:pointer;';
  cancelBtn.textContent = 'Cancel — go back to projects';
  cancelBtn.addEventListener('click', () => { div.remove(); closeProject(); });
  div.appendChild(icon); div.appendChild(titleEl); div.appendChild(subtitleEl);
  div.appendChild(uploadBtn); div.appendChild(cancelBtn);
  document.body.appendChild(div);
}

function showNewJobModal(preloadedFile, prefill) {
  selectedCustomerId = prefill?.customerId || null;
  const fnEl = document.getElementById('nj-firstname');
  const lnEl = document.getElementById('nj-lastname');
  const coEl = document.getElementById('nj-companyname');
  const addrEl = document.getElementById('nj-address');
  const jnEl = document.getElementById('nj-jobname');
  const lblEl = document.getElementById('nj-pdf-label');
  if (fnEl) fnEl.value = '';
  if (lnEl) lnEl.value = '';
  if (coEl) coEl.value = '';
  if (addrEl) addrEl.value = '';
  const sugBox = document.getElementById('nj-customer-suggestions');
  if (sugBox) sugBox.style.display = 'none';
  if (preloadedFile) {
    // File pre-loaded from drag/drop — keep it
    njPdfFile = preloadedFile;
    if (jnEl) jnEl.value = preloadedFile.name.replace(/\.pdf$/i,'').replace(/[_\-]/g,' ').trim();
    if (lblEl) lblEl.textContent = '✅ ' + preloadedFile.name;
  } else {
    njPdfFile = null;
    if (jnEl) jnEl.value = '';
    if (lblEl) lblEl.textContent = 'Click to choose PDF or drag here';
  }
  const isCompany = prefill?.customerType === 'company' || prefill?.customerType === 'business';
  njSetCustType(isCompany ? 'company' : 'individual');
  // Pre-fill customer info if provided
  if (prefill?.customerName) {
    if (isCompany) {
      if (coEl) coEl.value = prefill.customerName;
    } else {
      const parts = prefill.customerName.trim().split(' ');
      if (fnEl) fnEl.value = parts[0] || '';
      if (lnEl) lnEl.value = parts.slice(1).join(' ') || '';
    }
  }
  if (prefill?.address && addrEl) addrEl.value = prefill.address;
  document.getElementById('new-job-modal').classList.remove('gone');
}

function njPdfSelected(input) {
  if (!input.files[0]) return;
  njPdfFile = input.files[0];
  const lbl = document.getElementById('nj-pdf-label');
  if (lbl) lbl.textContent = '✅ ' + njPdfFile.name;
}

function njSetCustType(type) {
  const modal = document.getElementById('new-job-modal');
  if (modal) modal.dataset.custtype = type === 'company' ? 'business' : 'individual';

  const isBiz = type === 'company';
  // Toggle button styles
  const btnInd = document.getElementById('nj-btn-individual');
  const btnCo = document.getElementById('nj-btn-company');
  if (btnInd) {
    btnInd.style.borderColor = isBiz ? 'var(--bdr2)' : 'var(--acc)';
    btnInd.style.background = isBiz ? 'var(--surf2)' : 'var(--acc)';
    btnInd.style.color = isBiz ? 'var(--txt3)' : '#fff';
  }
  if (btnCo) {
    btnCo.style.borderColor = isBiz ? 'var(--acc)' : 'var(--bdr2)';
    btnCo.style.background = isBiz ? 'var(--acc)' : 'var(--surf2)';
    btnCo.style.color = isBiz ? '#fff' : 'var(--txt3)';
  }
  // Toggle fields
  const indFields = document.getElementById('nj-individual-fields');
  const coFields = document.getElementById('nj-company-fields');
  if (indFields) indFields.style.display = isBiz ? 'none' : 'flex';
  if (coFields) coFields.style.display = isBiz ? 'block' : 'none';
  // Clear suggestions
  const box = document.getElementById('nj-customer-suggestions');
  if (box) box.style.display = 'none';
  selectedCustomerId = null;
}

async function searchCustomersName() {
  const isBiz = document.getElementById('new-job-modal')?.dataset.custtype === 'business';
  const fn = (document.getElementById('nj-firstname')?.value || '').trim();
  const ln = (document.getElementById('nj-lastname')?.value || '').trim();
  const co = (document.getElementById('nj-companyname')?.value || '').trim();
  const q = isBiz ? co : ((fn + ' ' + ln).trim());
  selectedCustomerId = null;
  const box = document.getElementById('nj-customer-suggestions');
  if (!box) return;
  if (!q) { box.style.display = 'none'; return; }
  try {
    const { data } = await sb.from('markup_customers').select('id,name,customer_type').ilike('name', '%' + q + '%').order('name').limit(10);
    if (!data?.length) { box.style.display = 'none'; return; }
    box.style.display = 'block';
    box.innerHTML = '';
    data.forEach(c => {
      const isCompany = c.customer_type === 'company' || c.customer_type === 'business';
      const item = document.createElement('div');
      item.style.cssText = 'padding:8px 12px;cursor:pointer;font-size:13px;color:var(--txt);display:flex;align-items:center;gap:8px;';
      item.innerHTML = '<span>' + (isCompany ? '🏢' : '👤') + '</span><span>' + c.name + '</span>';
      item.addEventListener('mouseenter', () => item.style.background = 'var(--surf2)');
      item.addEventListener('mouseleave', () => item.style.background = '');
      item.addEventListener('click', () => {
        selectedCustomerId = c.id;
        if (isCompany) {
          njSetCustType('company');
          const coEl = document.getElementById('nj-companyname');
          if (coEl) coEl.value = c.name;
        } else {
          njSetCustType('individual');
          const parts = c.name.trim().split(' ');
          const fnEl = document.getElementById('nj-firstname');
          const lnEl = document.getElementById('nj-lastname');
          if (fnEl) fnEl.value = parts[0] || '';
          if (lnEl) lnEl.value = parts.slice(1).join(' ') || '';
        }
        box.style.display = 'none';
      });
      box.appendChild(item);
    });
  } catch(e) { box.style.display = 'none'; }
}

async function searchCustomers(query) { await searchCustomersName(); }

function selectCustomer(id, name) {
  selectedCustomerId = id;
  const parts = name.trim().split(' ');
  const fnEl = document.getElementById('nj-firstname');
  const lnEl = document.getElementById('nj-lastname');
  if (fnEl) fnEl.value = parts[0] || '';
  if (lnEl) lnEl.value = parts.slice(1).join(' ') || '';
  const box = document.getElementById('nj-customer-suggestions');
  if (box) box.style.display = 'none';
}

async function createNewJob() {
  const _btn = document.querySelector('#new-job-modal button[onclick="createNewJob()"]');
  if (_btn) { if (_btn.disabled) return; _btn.disabled = true; }
  const isBiz = document.getElementById('new-job-modal')?.dataset.custtype === 'business';
  const firstName = (document.getElementById('nj-firstname')?.value || '').trim();
  const lastName = (document.getElementById('nj-lastname')?.value || '').trim();
  const companyName = (document.getElementById('nj-companyname')?.value || '').trim();
  const customerName = isBiz ? companyName : (firstName + ' ' + lastName).trim();
  const address = (document.getElementById('nj-address')?.value || '').trim();
  const jobName = (document.getElementById('nj-jobname')?.value || '').trim();
  // Clear previous errors
  fieldErrClear('nj-err',
    document.getElementById('nj-firstname'), document.getElementById('nj-lastname'),
    document.getElementById('nj-companyname'), document.getElementById('nj-address'),
    document.getElementById('nj-jobname'));
  if (isBiz && !companyName) { fieldErr(document.getElementById('nj-companyname'), 'Enter a company name', 'nj-err'); if (_btn) _btn.disabled = false; return; }
  if (!isBiz && !firstName) { fieldErr(document.getElementById('nj-firstname'), 'Enter customer first name', 'nj-err'); if (_btn) _btn.disabled = false; return; }
  if (!isBiz && !lastName) { fieldErr(document.getElementById('nj-lastname'), 'Enter customer last name', 'nj-err'); if (_btn) _btn.disabled = false; return; }
  if (!address) { fieldErr(document.getElementById('nj-address'), 'Enter a property address', 'nj-err'); if (_btn) _btn.disabled = false; return; }
  if (!jobName) { fieldErr(document.getElementById('nj-jobname'), 'Enter a job name', 'nj-err'); if (_btn) _btn.disabled = false; return; }
  if (!njPdfFile) { fieldErr(null, 'Upload a PDF floor plan', 'nj-err'); if (_btn) _btn.disabled = false; return; }
  showLoad('Creating project...');
  try {
    let customerId = selectedCustomerId;
    if (!customerId) {
      const { data: ex } = await sb.from('markup_customers').select('id').ilike('name', customerName).limit(1).maybeSingle();
      if (ex) { customerId = ex.id; }
      else { const { data: nc } = await sb.from('markup_customers').insert({ name: customerName, created_by: CU.id }).select().single(); customerId = nc?.id; }
    }
    let locationId = null;
    if (address) {
      const { data: exL } = await sb.from('markup_locations').select('id').eq('customer_id', customerId).ilike('address', address).limit(1).maybeSingle();
      if (exL) { locationId = exL.id; }
      else { const { data: nL } = await sb.from('markup_locations').insert({ customer_id: customerId, address }).select().single(); locationId = nL?.id; }
    }
    const projectName = customerName + (address ? ' — ' + address : '') + ' — ' + jobName;
    const { data: project } = await sb.from('markup_projects').insert({
      name: projectName, customer_id: customerId, location_id: locationId,
      job_type: jobName, pdf_filename: njPdfFile.name, created_by: CU.id,
      annotations: JSON.stringify({ strokes: [], icons: [] })
    }).select().single();
    if (!project) throw new Error('Failed to create project');

    // Upload PDF to Supabase Storage
    const pdfMB = (njPdfFile.size / 1024 / 1024).toFixed(1);
    showLoad('Uploading PDF (' + pdfMB + ' MB)…');
    // Animate dots so user knows it's working
    let _dotCount = 0;
    const _dotInterval = setInterval(() => {
      _dotCount = (_dotCount + 1) % 4;
      showLoad('Uploading PDF (' + pdfMB + ' MB)' + '.'.repeat(_dotCount));
    }, 500);
    const pdfPath = project.id + '/' + njPdfFile.name;
    const { error: uploadErr } = await sb.storage.from('plan-pdfs').upload(pdfPath, njPdfFile, { upsert: true });
    clearInterval(_dotInterval);
    if (uploadErr) console.warn('PDF upload error:', uploadErr.message);
    else {
      // Save storage path to project record
      showLoad('Saving project…');
      await sb.from('markup_projects').update({ pdf_storage_path: pdfPath }).eq('id', project.id);
      project.pdf_storage_path = pdfPath;
    }

    CP = project;
    currentFileName = projectName;
    closeModal('new-job-modal');
    setProjectUI(currentFileName);
    document.getElementById('dropzone').classList.add('gone');
    document.getElementById('cwrap').style.overflow = 'auto';
    await new Promise(r => setTimeout(r, 80));
    await loadPDF(njPdfFile);
    // Re-assert dropzone hidden in case any async call re-showed it
    document.getElementById('dropzone').classList.add('gone');
    document.getElementById('cwrap').style.overflow = 'auto';
    toast('✅ Project created');
  } catch(e) { toast('❌ ' + e.message, true); console.error(e); if (_btn) _btn.disabled = false; }
  hideLoad();
}

// Close search results when clicking outside
document.addEventListener('click', function(e) {
  const panel = document.getElementById('job-search-results');
  const search = document.getElementById('job-search');
  if (panel && !panel.contains(e.target) && e.target !== search) {
    panel.style.display = 'none';
  }
});

// ═══════════════════════════════════════════════════════════
// STORAGE MANAGEMENT (Admin)
// ═══════════════════════════════════════════════════════════
async function showStorageManager() {
  if (CU?.role !== 'admin') { toast('Admin only', true); return; }
  showLoad('Checking storage...');
  try {
    // Get all projects with storage paths
    const { data: projects } = await sb.from('markup_projects')
      .select('id, name, pdf_storage_path, pdf_filename, updated_at, created_by')
      .not('pdf_storage_path', 'is', null)
      .order('updated_at', { ascending: false });

    hideLoad();

    const modal = document.createElement('div');
    modal.className = 'mbg';
    modal.style.zIndex = '2000';
    modal.innerHTML = '';

    const box = document.createElement('div');
    box.className = 'mbox';
    box.style.cssText = 'max-width:600px;width:95vw;max-height:80vh;overflow-y:auto;';

    const title = document.createElement('h2');
    title.textContent = 'Storage Manager';
    box.appendChild(title);

    const info = document.createElement('div');
    info.style.cssText = 'font-size:12px;color:var(--txt3);margin-bottom:16px;';
    info.textContent = (projects?.length || 0) + ' PDFs stored in Supabase Storage. Delete old projects to free space.';
    box.appendChild(info);

    (projects || []).forEach(p => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--bdr);';

      const nameEl = document.createElement('div');
      nameEl.style.cssText = 'flex:1;min-width:0;';
      const updated = p.updated_at ? new Date(p.updated_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }) : '';
      nameEl.innerHTML = '<div style="font-size:12px;font-weight:600;color:var(--txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + (p.name || p.pdf_filename) + '</div>' +
        '<div style="font-size:10px;color:var(--txt3);">' + (p.pdf_filename || '') + ' · ' + updated + '</div>';

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete PDF';
      delBtn.style.cssText = 'padding:5px 10px;background:#dc2626;border:none;border-radius:6px;color:#fff;font-size:11px;cursor:pointer;flex-shrink:0;';
      delBtn.onclick = async () => {
        if (!confirm('Delete stored PDF for "' + (p.name || p.pdf_filename) + '"? The project and markup will remain but the PDF must be re-uploaded next time.')) return;
        const { error } = await sb.storage.from('plan-pdfs').remove([p.pdf_storage_path]);
        if (error) { toast('❌ ' + error.message, true); return; }
        await sb.from('markup_projects').update({ pdf_storage_path: null }).eq('id', p.id);
        row.remove();
        toast('✅ PDF deleted');
      };

      row.appendChild(nameEl);
      row.appendChild(delBtn);
      box.appendChild(row);
    });

    const closeBtn = document.createElement('button');
    closeBtn.className = 'mbtn';
    closeBtn.textContent = 'Close';
    closeBtn.style.marginTop = '16px';
    closeBtn.onclick = () => modal.remove();
    box.appendChild(closeBtn);

    modal.appendChild(box);
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  } catch(e) {
    hideLoad();
    toast('❌ ' + e.message, true);
  }
}

function saveAIRules(v) { localStorage.setItem('elite_ai_rules', v); }

// ── EliteAI Wizard ───────────────────────────────────────────────
let _eawDocText = '';
let _eawDocName = '';

// Sidebar state machine
function eaiShowState(state) {
  ['idle','calibrating','scanning','review','placing','done'].forEach(s => {
    const el = document.getElementById('eai-' + s);
    if (el) el.style.display = s === state ? 'flex' : 'none';
  });
  // Show clear button in idle state only when boxes exist
  const clearBtn = document.getElementById('eai-idle-clear-btn');
  if (clearBtn) clearBtn.style.display = (state === 'idle' && mapBoxes && mapBoxes.length > 0) ? 'block' : 'none';
}

// Progress helpers
function eaiSetProgress(pct, label) {
  const bar = document.getElementById('eai-progress-bar');
  const lbl = document.getElementById('eai-progress-label');
  if (bar) bar.style.width = Math.min(100, pct) + '%';
  if (lbl) lbl.textContent = label || '';
}

function eaiLog(msg) {
  const log = document.getElementById('eai-scan-log');
  if (log) { log.innerHTML += msg + '<br>'; log.scrollTop = log.scrollHeight; }
}

function eaiPlaceLog(msg) {
  const log = document.getElementById('eai-place-log');
  if (log) { log.innerHTML += msg + '<br>'; log.scrollTop = log.scrollHeight; }
  const lbl = document.getElementById('eai-place-label');
  if (lbl) lbl.textContent = msg.replace(/[⚡✅❌⏳]/g, '').trim();
}

// Modal navigation
function openEliteAIWizard() {
  if (!pdfDoc) { toast('Open a floor plan first', true); return; }
  const apiKey = localStorage.getItem('elite_anthropic_key');
  if (!apiKey) { toast('Set your API key in settings first', true); return; }
  eawShowIntro();
  document.getElementById('elite-ai-wizard').style.display = 'flex';
}

function closeEliteAIWizard() {
  document.getElementById('elite-ai-wizard').style.display = 'none';
}

function eawShowIntro() {
  document.getElementById('eaw-intro').style.display = 'flex';
  document.getElementById('eaw-setup').style.display = 'none';
}

function eawShowSetup() {
  document.getElementById('eaw-intro').style.display = 'none';
  document.getElementById('eaw-setup').style.display = 'flex';
}

// ── PROPOSAL FLOW STATE ──────────────────────────────────────────────────────
let _proposalText = '';       // raw extracted text from PDF
let _parsedSystems = null;    // array of {system, items:[{name,qty,iconId,rules}]}
let _qaAnswers = {};          // collected Q&A answers keyed by question id
let _qaQueue = [];            // pending questions [{id,question,chips,systemIdx,itemIdx}]
let _qaCurrentIdx = 0;        // current question index

// ── PDF TEXT EXTRACTION ───────────────────────────────────────────────────────
async function eawExtractPdfText(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(' ') + '\n';
        }
        resolve(text.trim());
      } catch(err) {
        console.warn('PDF text extract error:', err);
        resolve('');
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

// ── HANDLE PROPOSAL UPLOAD ────────────────────────────────────────────────────
async function eawHandleProposal(input) {
  const file = input.files[0];
  if (!file) return;

  // Show loading state
  document.getElementById('eaw-upload-icon').textContent = '⏳';
  document.getElementById('eaw-upload-label').textContent = 'Reading proposal...';
  document.getElementById('eaw-parse-status').style.display = 'block';
  document.getElementById('eaw-parse-status').textContent = 'Extracting text from PDF...';

  // Extract text
  _proposalText = await eawExtractPdfText(file);
  if (!_proposalText) {
    document.getElementById('eaw-parse-status').textContent = '⚠️ Could not extract text. Try a different PDF.';
    document.getElementById('eaw-upload-icon').textContent = '❌';
    return;
  }

  document.getElementById('eaw-parse-status').textContent = 'Analyzing proposal with AI...';

  // Send to Claude to parse
  try {
    const apiKey = localStorage.getItem('elite_anthropic_key');
    if (!apiKey) throw new Error('No API key');

    // Build icon catalog summary for matching
    const iconCatalog = ICONS.map(ic => ({
      id: ic.id, name: ic.name, cat: ic.cat,
      rules: ic.placement_rules || []
    }));

    const prompt = `You are an expert AV/smart home system estimator. Parse this proposal and extract every system and device.

PROPOSAL TEXT:
${_proposalText.substring(0, 6000)}

AVAILABLE ICONS (match devices to these):
${JSON.stringify(iconCatalog.slice(0, 80))}

Return ONLY valid JSON in this exact structure:
{
  "systems": [
    {
      "system": "Audio",
      "planType": "layout",
      "items": [
        {
          "name": "Indoor In-Ceiling Speaker",
          "qty": 10,
          "iconId": "spk-inceiling",
          "needsRoomAssignment": true,
          "locationHint": null,
          "notes": "5 pairs from proposal"
        }
      ]
    }
  ]
}

Rules for planType: cameras → "elevation", everything else → "layout".
Rules for needsRoomAssignment: true if rooms are not specified in proposal.
locationHint options: "near_stairs", "garage_entry", "exterior_doors", "exterior", null.
Match iconId as closely as possible from the available icons list.
Group items by system type (Audio, Video, Security, Networking, Access, Lighting, etc).
CRITICAL: Return ONLY the raw JSON object. No markdown, no backticks, no explanation before or after. Start your response with { and end with }.`;

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 4000, messages: [{ role: 'user', content: prompt }] })
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error?.message || 'API error');

    const txt = data.content?.find(c => c.type === 'text')?.text || '';
    console.log('[EliteAI Proposal] Raw response:', txt.substring(0, 500));
    // Robust JSON extraction — find the outermost { ... } block
    let clean = txt.replace(/```json|```/g, '').trim();
    const jsonStart = clean.indexOf('{');
    const jsonEnd = clean.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) clean = clean.slice(jsonStart, jsonEnd + 1);
    // Sanitize common issues from PDF text contamination
    clean = clean
      .replace(/[‘’]/g, "\'")
      .replace(/[“”]/g, '\"')
      .replace(/[–—]/g, '-')
      .replace(/,\s*([}\]])/g, '$1');
    console.log('[EliteAI Proposal] Cleaned JSON (first 500):', clean.substring(0, 500));
    try {
      _parsedSystems = JSON.parse(clean);
    } catch(parseErr) {
      console.error('[EliteAI Proposal] Parse error:', parseErr.message);
      console.error('[EliteAI Proposal] Full clean string:', clean);
      throw new Error('Parse failed: ' + parseErr.message);
    }

    // Show parsed summary
    eawShowParsedSummary();

  } catch(err) {
    console.error('Proposal parse error:', err);
    document.getElementById('eaw-parse-status').textContent = '❌ Parse failed: ' + err.message;
    document.getElementById('eaw-upload-icon').textContent = '❌';
  }
}

function eawHandleDoc(input) { eawHandleProposal(input); } // legacy alias

function eawShowParsedSummary() {
  const systems = _parsedSystems?.systems || [];
  if (!systems.length) {
    document.getElementById('eaw-parse-status').textContent = '⚠️ No systems found in proposal.';
    return;
  }

  document.getElementById('eaw-upload-icon').textContent = '✅';
  document.getElementById('eaw-upload-label').textContent = 'Proposal loaded';
  document.getElementById('eaw-parse-status').style.display = 'none';

  const summaryEl = document.getElementById('eaw-parsed-summary');
  summaryEl.style.display = 'block';
  summaryEl.innerHTML = '<div style="font-size:10px;font-weight:700;letter-spacing:1px;color:var(--txt3);text-transform:uppercase;margin-bottom:8px;">Found in Proposal</div>' +
    systems.map(sys => {
      const total = sys.items.reduce((s, i) => s + (i.qty || 1), 0);
      const planBadge = sys.planType === 'elevation'
        ? '<span style="font-size:9px;background:rgba(139,92,246,.2);color:#a78bfa;border-radius:4px;padding:1px 5px;margin-left:5px;">Elevation</span>'
        : '<span style="font-size:9px;background:rgba(29,111,219,.15);color:var(--acc2);border-radius:4px;padding:1px 5px;margin-left:5px;">Layout</span>';
      return '<div style="display:flex;align-items:flex-start;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--bdr);">' +
        '<div><div style="font-size:12px;font-weight:700;color:var(--txt);">' + sys.system + planBadge + '</div>' +
        '<div style="font-size:10px;color:var(--txt3);margin-top:2px;">' +
        sys.items.map(i => i.qty + '× ' + i.name).join(' · ') +
        '</div></div>' +
        '<div style="font-size:11px;font-weight:700;color:var(--txt2);flex-shrink:0;margin-left:8px;">' + total + ' devices</div>' +
        '</div>';
    }).join('') +
    '<div style="font-size:10px;color:var(--txt3);margin-top:8px;">' + systems.length + ' plans will be created</div>';

  document.getElementById('eaw-start-btn').style.display = 'flex';
}

// ── Q&A ENGINE ────────────────────────────────────────────────────────────────
async function eawStartQA() {
  const systems = _parsedSystems?.systems || [];
  if (!systems.length) return;

  _qaAnswers = {};
  _qaQueue = [];
  _qaCurrentIdx = 0;

  // Build question queue from systems + placement rules
  for (let si = 0; si < systems.length; si++) {
    const sys = systems[si];
    for (let ii = 0; ii < sys.items.length; ii++) {
      const item = sys.items[ii];
      const icon = ICONS.find(ic => ic.id === item.iconId);
      const rules = icon?.placement_rules || [];
      const askRooms = rules.find(r => r.type === 'ask_rooms');
      const locHint = rules.find(r => r.type === 'location_hint');

      // Check placement history for suggestions
      let suggestion = await eawGetHistorySuggestion(item.iconId);

      if (item.needsRoomAssignment && (!askRooms || askRooms.value !== false)) {
        // Need to ask which rooms
        const prefRooms = rules.find(r => r.type === 'preferred_rooms');
        const chips = prefRooms?.value || suggestion || [];
        const qtyRule = rules.find(r => r.type === 'qty_per_room');
        const perRoom = qtyRule?.value;
        const roomCount = perRoom ? Math.ceil(item.qty / perRoom) : item.qty;

        _qaQueue.push({
          id: 'rooms_' + si + '_' + ii,
          systemIdx: si, itemIdx: ii,
          question: 'The <strong>' + sys.system + '</strong> plan has <strong>' + item.qty + '× ' + item.name + '</strong>' +
            (perRoom ? ' (' + perRoom + ' per room, so ~' + roomCount + ' rooms)' : '') +
            '. Which rooms should they go in?',
          chips: chips,
          type: 'rooms'
        });
      }

      // Floor count question for motions/stairs
      if (locHint?.value === 'near_stairs' && !_qaQueue.find(q => q.id === 'floor_count')) {
        _qaQueue.push({
          id: 'floor_count',
          systemIdx: si, itemIdx: ii,
          question: 'How many <strong>floors</strong> does this property have? (Motion sensors will be placed near stair landings on each floor)',
          chips: ['1', '2', '3', '4'],
          type: 'floor_count'
        });
      }

      // Exterior doors question for contacts
      if (locHint?.value === 'exterior_doors' && !_qaQueue.find(q => q.id === 'ext_doors')) {
        _qaQueue.push({
          id: 'ext_doors',
          systemIdx: si, itemIdx: ii,
          question: 'Which doors are <strong>exterior perimeter doors</strong>? (Door contacts will be placed on each)',
          chips: ['Front Door', 'Back Door', 'Garage Door', 'Side Door', 'Slider'],
          type: 'multi_select'
        });
      }
    }
  }

  // Switch to Q&A panel
  eawShowSetup();

  if (_qaQueue.length === 0) {
    // No questions needed — go straight to generate
    eawShowQADone();
    return;
  }

  eawShowNextQuestion();
}

async function eawGetHistorySuggestion(iconId) {
  try {
    const { data } = await sb.from('ai_placement_history')
      .select('rooms')
      .eq('icon_id', iconId)
      .order('created_at', { ascending: false })
      .limit(10);
    if (!data || !data.length) return [];
    // Count room frequency across history
    const freq = {};
    data.forEach(row => {
      const rooms = row.rooms || [];
      (Array.isArray(rooms) ? rooms : []).forEach(r => { freq[r] = (freq[r] || 0) + 1; });
    });
    return Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,6).map(e => e[0]);
  } catch(e) { return []; }
}

function eawShowNextQuestion() {
  if (_qaCurrentIdx >= _qaQueue.length) { eawShowQADone(); return; }
  const q = _qaQueue[_qaCurrentIdx];

  // Add question bubble to messages
  const messagesEl = document.getElementById('eaw-qa-messages');
  const bubble = document.createElement('div');
  bubble.style.cssText = 'background:rgba(29,111,219,.12);border:1px solid rgba(29,111,219,.2);border-radius:10px 10px 10px 2px;padding:10px 12px;font-size:12px;color:var(--txt);line-height:1.6;max-width:90%;';
  bubble.innerHTML = '<div style="font-size:9px;font-weight:700;color:var(--acc2);letter-spacing:1px;margin-bottom:4px;">ELITEAI</div>' + q.question;
  messagesEl.appendChild(bubble);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  // Show input area
  const inputArea = document.getElementById('eaw-qa-input-area');
  inputArea.style.display = 'block';
  document.getElementById('eaw-qa-answer').value = '';
  document.getElementById('eaw-qa-answer').focus();

  // Populate chips
  const chipsEl = document.getElementById('eaw-qa-chips');
  chipsEl.innerHTML = '';
  (q.chips || []).forEach(chip => {
    const btn = document.createElement('button');
    btn.textContent = chip;
    btn.style.cssText = 'padding:4px 10px;border-radius:99px;border:1px solid var(--bdr2);background:var(--surf2);color:var(--txt2);font-family:"DM Sans",sans-serif;font-size:11px;cursor:pointer;';
    btn.onmouseenter = () => { btn.style.borderColor = 'var(--acc)'; btn.style.color = 'var(--acc)'; };
    btn.onmouseleave = () => { btn.style.borderColor = 'var(--bdr2)'; btn.style.color = 'var(--txt2)'; };
    btn.onclick = () => {
      const current = document.getElementById('eaw-qa-answer').value.trim();
      const parts = current ? current.split(',').map(s => s.trim()) : [];
      if (!parts.includes(chip)) parts.push(chip);
      document.getElementById('eaw-qa-answer').value = parts.join(', ');
    };
    chipsEl.appendChild(btn);
  });
}

function eawSubmitAnswer() {
  const answer = document.getElementById('eaw-qa-answer').value.trim();
  if (!answer) return;

  const q = _qaQueue[_qaCurrentIdx];
  _qaAnswers[q.id] = answer;

  // Show answer bubble
  const messagesEl = document.getElementById('eaw-qa-messages');
  const bubble = document.createElement('div');
  bubble.style.cssText = 'background:var(--surf2);border:1px solid var(--bdr);border-radius:10px 10px 2px 10px;padding:10px 12px;font-size:12px;color:var(--txt);line-height:1.6;max-width:90%;align-self:flex-end;margin-left:auto;';
  bubble.innerHTML = '<div style="font-size:9px;font-weight:700;color:var(--txt3);letter-spacing:1px;margin-bottom:4px;">YOU</div>' + answer;
  messagesEl.appendChild(bubble);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  _qaCurrentIdx++;
  eawShowNextQuestion();
}

function eawShowQADone() {
  document.getElementById('eaw-qa-input-area').style.display = 'none';
  const doneArea = document.getElementById('eaw-qa-done-area');
  doneArea.style.display = 'flex';
  // Add completion message to chat
  const messagesEl = document.getElementById('eaw-qa-messages');
  const bubble = document.createElement('div');
  bubble.style.cssText = 'background:rgba(29,111,219,.12);border:1px solid rgba(29,111,219,.2);border-radius:10px;padding:10px 12px;font-size:12px;color:var(--txt);line-height:1.6;';
  bubble.innerHTML = '<div style="font-size:9px;font-weight:700;color:var(--acc2);letter-spacing:1px;margin-bottom:4px;">ELITEAI</div>Got it! I have everything I need. Click <strong>Generate Plans</strong> to create your variants with icons placed.';
  messagesEl.appendChild(bubble);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// ── PLAN GENERATOR ────────────────────────────────────────────────────────────
async function eawGeneratePlans() {
  const systems = _parsedSystems?.systems || [];
  if (!systems.length) return;

  closeEliteAIWizard();
  toast('⚡ Generating plans...');

  const apiKey = localStorage.getItem('elite_anthropic_key');
  const projectId = currentProjectId || CP?.id;
  if (!projectId) { toast('❌ No project open', true); return; }

  for (const sys of systems) {
    try {
      // Build context for this system
      const sysAnswers = {};
      _qaQueue.forEach((q, i) => {
        if (q.systemIdx === systems.indexOf(sys)) sysAnswers[q.id] = _qaAnswers[q.id] || '';
      });

      // Create variant name
      const variantName = sys.system + ' Plan';
      const variantType = sys.planType === 'elevation' ? 'elevation' : 'floor';

      // Ask Claude where to place each device given the answers
      const placementPrompt = `You are placing smart home devices on a floor plan for a ${variantName}.

DEVICES TO PLACE:
${sys.items.map(item => `- ${item.qty}x ${item.name} (iconId: ${item.iconId}, locationHint: ${item.locationHint || 'none'})`).join('\n')}

USER ANSWERS TO QUESTIONS:
${Object.entries(_qaAnswers).map(([k,v]) => k + ': ' + v).join('\n') || 'None provided'}

FLOOR PLAN SIZE: The plan canvas is approximately 4800 x 3106 PDF units.

For each device, return placement as a fraction (0.0-1.0) of the page width/height.
Place devices in logical locations based on room assignments and location hints.

Return ONLY valid JSON array:
[{"iconId":"spk-inceiling","qty":2,"placements":[{"x":0.25,"y":0.35},{"x":0.35,"y":0.35}],"room":"Living Room"}]`;

      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 2000, messages: [{ role: 'user', content: placementPrompt }] })
      });
      const data = await resp.json();
      const txt = data.content?.find(c => c.type === 'text')?.text || '[]';
      const placements = JSON.parse(txt.replace(/```json|```/g, '').trim());

      // Create the variant
      await eawCreateVariantWithIcons(variantName, variantType, placements, sys);

      // Save to placement history for learning
      for (const p of placements) {
        if (p.room) {
          try {
            await sb.from('ai_placement_history').insert({
              icon_id: p.iconId, project_type: sys.system,
              floor_count: parseInt(_qaAnswers['floor_count'] || '1'),
              rooms: [p.room], qty_placed: p.qty || 1
            });
          } catch(e) {}
        }
      }

      toast('✅ ' + variantName + ' created');
    } catch(err) {
      console.error('Plan generation error for ' + sys.system + ':', err);
      toast('⚠️ Error creating ' + sys.system + ' plan: ' + err.message, true);
    }
  }

  toast('🎉 All plans generated — check your variants!');
}

async function eawCreateVariantWithIcons(variantName, variantType, placements, sys) {
  // Get current PDF bytes as base for new variant
  const pdfBytes = window._currentPdfBytes;
  if (!pdfBytes) { console.warn('No PDF bytes available'); return; }

  const projectId = currentProjectId || CP?.id;
  const variantId = genUUID();
  const fileName = variantName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now() + '.pdf';
  const storagePath = 'variants/' + projectId + '/' + fileName;

  // Upload PDF to storage
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  await sb.storage.from('plan-pdfs').upload(storagePath, blob, { upsert: true });

  // Create variant record
  await sb.from('markup_variants').insert({
    id: variantId,
    project_id: projectId,
    name: variantName,
    tab_type: variantType,
    pdf_path: storagePath,
    created_by: CU?.id
  });

  // Convert fractional placements to canvas icon positions
  const nativeW = pdfPages[0] ? (pdfPages[0].h / (pdfPages[0].h / 4800)) : 4800; // approximate
  const iconData = [];
  for (const p of placements) {
    const icon = ICONS.find(ic => ic.id === p.iconId);
    if (!icon) continue;
    for (const pos of (p.placements || [])) {
      iconData.push({
        iconId: p.iconId,
        x: pos.x,    // store as fractions — rendered on open
        y: pos.y,
        scale: 1,
        label: p.room || '',
        _fractional: true
      });
    }
  }

  // Save icon placements to variant (stored as JSON in variant record)
  if (iconData.length) {
    await sb.from('markup_variants').update({ icon_placements: JSON.stringify(iconData) })
      .eq('id', variantId);
  }

  console.log('[eawCreateVariantWithIcons] Created:', variantName, 'with', iconData.length, 'icons');
}

// ── END PROPOSAL FLOW ─────────────────────────────────────────────────────────


async function eaiClearAllBoxes() {
  // Delete from both tables (EliteAI uses floor_plan_room_boxes; aiAutoMap uses floor_plan_annotations)
  if (currentFileName) {
    try { await sb.from('floor_plan_room_boxes').delete().eq('plan_filename', currentFileName); } catch(e) {}
    try { await sb.from('floor_plan_annotations').delete().eq('plan_filename', currentFileName); } catch(e) {}
  }
  mapBoxes = [];
  const overlay = document.getElementById('map-overlay');
  if (overlay) { overlay.style.display = 'none'; overlay.classList.remove('active'); overlay.innerHTML = ''; }
  eaiShowState('idle');
  toast('Room boxes cleared');
}

async function eawLaunchScan() {
  const prompt = (document.getElementById('eaw-prompt')?.value || '').trim();
  window._eawPrompt = prompt;

  // Close modal, switch to AI tab, start calibration
  closeEliteAIWizard();
  if (typeof switchTab === 'function') switchTab('ai');
  eaiStartCalibration();
}

// Calibration state
let _calibPt1 = null, _calibPt2 = null, _calibHandler = null, _calibMarkers = [];

function eaiStartCalibration() {
  _calibPt1 = null; _calibPt2 = null;
  _calibMarkers.forEach(m => m.remove());
  _calibMarkers = [];

  // Show instruction modal first
  const modal = document.getElementById('eai-calib-modal');
  if (modal) { modal.style.display = 'flex'; }
}

function eaiDismissCalibModal() {
  const modal = document.getElementById('eai-calib-modal');
  if (modal) {
    modal.style.transition = 'opacity 0.25s';
    modal.style.opacity = '0';
    setTimeout(() => { modal.style.display = 'none'; modal.style.opacity = '1'; modal.style.transition = ''; }, 250);
  }
  eaiActivateCalibration();
}

function eaiActivateCalibration() {
  eaiShowState('calibrating');
  document.getElementById('eai-calib-pt1-label').textContent = 'Top-left corner — click on plan';
  document.getElementById('eai-calib-pt2-label').textContent = 'Bottom-right corner — waiting...';
  document.getElementById('eai-calib-pt2').style.opacity = '0.4';
  document.getElementById('eai-calib-msg').innerHTML = 'Click the <strong>top-left corner</strong> of the floor plan drawing area.';

  // Size and show the overlay to cover the full canvas
  const cvEl = document.getElementById('pdf-cv');
  const overlay = document.getElementById('map-overlay');
  overlay.style.width = cvEl.width + 'px';
  overlay.style.height = cvEl.height + 'px';
  overlay.style.display = 'block';
  overlay.style.cursor = 'crosshair';
  overlay.style.pointerEvents = 'all';
  overlay.innerHTML = ''; // clear any stale content

  // Listen for clicks
  _calibHandler = function(e) { eaiHandleCalibClick(e); };
  overlay.addEventListener('click', _calibHandler);
}

function eaiCancelCalibration() {
  const overlay = document.getElementById('map-overlay');
  overlay.removeEventListener('click', _calibHandler);
  overlay.style.cursor = '';
  overlay.style.display = 'none';
  _calibMarkers.forEach(m => m.remove());
  _calibMarkers = [];
  _calibPt1 = null; _calibPt2 = null;
  eaiShowState('idle');
}

function eaiGetCanvasPdfCoords(e) {
  const cvEl = document.getElementById('pdf-cv');
  const r = cvEl.getBoundingClientRect();
  const cssScale = r.width / cvEl.width;
  const canvasX = (e.clientX - r.left) / cssScale;
  const canvasY = (e.clientY - r.top) / cssScale;
  return { canvasX, canvasY };
}

function eaiPlaceCalibMarker(canvasX, canvasY, label, color) {
  const overlay = document.getElementById('map-overlay');
  const rs = pdfScale || renderScale || 1;
  const m = document.createElement('div');
  m.style.cssText = 'position:absolute;width:18px;height:18px;border-radius:50%;background:' + color + ';border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700;transform:translate(-50%,-50%);pointer-events:none;z-index:200;box-shadow:0 1px 4px rgba(0,0,0,.4);';
  m.style.left = canvasX + 'px';
  m.style.top = canvasY + 'px';
  m.textContent = label;
  overlay.appendChild(m);
  _calibMarkers.push(m);
  return m;
}

function eaiDrawCalibRect(pt1, pt2) {
  // Remove old rect marker if exists
  const old = document.getElementById('eai-calib-rect');
  if (old) old.remove();
  const overlay = document.getElementById('map-overlay');
  const rect = document.createElement('div');
  rect.id = 'eai-calib-rect';
  rect.style.cssText = 'position:absolute;border:2px dashed var(--acc2);border-radius:3px;background:rgba(56,189,248,.07);pointer-events:none;z-index:190;';
  rect.style.left = Math.min(pt1.canvasX, pt2.canvasX) + 'px';
  rect.style.top = Math.min(pt1.canvasY, pt2.canvasY) + 'px';
  rect.style.width = Math.abs(pt2.canvasX - pt1.canvasX) + 'px';
  rect.style.height = Math.abs(pt2.canvasY - pt1.canvasY) + 'px';
  overlay.appendChild(rect);
  _calibMarkers.push(rect);
}

async function eaiHandleCalibClick(e) {
  const coords = eaiGetCanvasPdfCoords(e);

  if (!_calibPt1) {
    _calibPt1 = coords;
    eaiPlaceCalibMarker(coords.canvasX, coords.canvasY, '1', 'var(--acc)');
    // Update UI to prompt pt2
    document.getElementById('eai-calib-pt1-label').textContent = 'Top-left ✓ (' + Math.round(coords.canvasX) + ', ' + Math.round(coords.canvasY) + ')';
    document.getElementById('eai-calib-pt2').style.opacity = '1';
    document.getElementById('eai-calib-msg').innerHTML = 'Now click the <strong>bottom-right corner</strong> of the floor plan drawing area.';
    return;
  }

  if (!_calibPt2) {
    _calibPt2 = coords;
    eaiPlaceCalibMarker(coords.canvasX, coords.canvasY, '2', '#22c55e');
    eaiDrawCalibRect(_calibPt1, _calibPt2);
    document.getElementById('eai-calib-pt2-label').textContent = 'Bottom-right ✓ (' + Math.round(coords.canvasX) + ', ' + Math.round(coords.canvasY) + ')';
    document.getElementById('eai-calib-msg').innerHTML = '✅ Area selected — starting scan...';

    // Remove click listener, restore cursor
    const overlay = document.getElementById('map-overlay');
    overlay.removeEventListener('click', _calibHandler);
    overlay.style.cursor = '';

    // Short pause so user sees the preview rect, then launch scan
    await new Promise(r => setTimeout(r, 800));

    // Clear calibration markers and proceed to scan
    _calibMarkers.forEach(m => m.remove());
    _calibMarkers = [];
    overlay.style.display = 'none';
    overlay.innerHTML = '';

    // Clear existing boxes
    if (currentFileName) {
      try { await sb.from('floor_plan_room_boxes').delete().eq('plan_filename', currentFileName); } catch(e) {}
    }
    mapBoxes = [];

    eaiShowState('scanning');
    eaiSetProgress(5, 'Rendering floor plan...');
    eaiLog('⚡ Starting room scan with calibrated area...');

    try {
      await eaiRunRoomScan();
      eaiRenderRoomList();
      const sure = mapBoxes.filter(b => !b.needsReview).length;
      const review = mapBoxes.filter(b => b.needsReview).length;
      const summaryEl = document.getElementById('eai-review-summary');
      if (summaryEl) summaryEl.textContent = sure + ' rooms identified' + (review > 0 ? ' · ' + review + ' need your review' : ' — all confirmed');
      eaiShowState('review');
    } catch(err) {
      console.error('[EliteAI Room Scan] ERROR:', err);
      eaiLog('❌ Error: ' + err.message);
      toast('❌ Scan failed: ' + err.message, true);
      eaiShowState('idle');
    }
  }
}

function genUUID(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0;return(c=='x'?r:(r&0x3|0x8)).toString(16)});}

async function eaiRunRoomScan() {
  const apiKey = localStorage.getItem('elite_anthropic_key');
  if (!apiKey) throw new Error('No API key set');

  const TARGET_LONG_EDGE = 1568; // Match Anthropic vision API internal resize limit
  const pageImages = [];

  // Calibration crop: _calibPt1/_calibPt2 are canvas pixel coords
  // Convert to PDF units for each page
  const rs = renderScale || pdfScale || 1;
  const hasCrop = _calibPt1 && _calibPt2;
  let cropPdf = null;
  if (hasCrop) {
    const x1c = Math.min(_calibPt1.canvasX, _calibPt2.canvasX);
    const y1c = Math.min(_calibPt1.canvasY, _calibPt2.canvasY);
    const x2c = Math.max(_calibPt1.canvasX, _calibPt2.canvasX);
    const y2c = Math.max(_calibPt1.canvasY, _calibPt2.canvasY);
    // Convert canvas px to PDF units (no page y offset for X, subtract page start for Y)
    const pageY = pdfPages[0]?.y || 196;
    cropPdf = {
      x1: x1c / rs,
      y1: (y1c - pageY) / rs,
      x2: x2c / rs,
      y2: (y2c - pageY) / rs
    };
    console.log('[EliteAI Room Scan] Calibration crop (PDF units):', cropPdf);
  }

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const pct = 5 + (i - 1) / pdfDoc.numPages * 35;
    eaiSetProgress(pct, 'Rendering page ' + i + ' of ' + pdfDoc.numPages + '...');
    const page = await pdfDoc.getPage(i);
    const nativeVp = page.getViewport({ scale: 1.0 });

    // Render full page first at target scale
    const aiScaleFull = TARGET_LONG_EDGE / Math.max(nativeVp.width, nativeVp.height);
    const vpFull = page.getViewport({ scale: aiScaleFull });
    const cvFull = document.createElement('canvas');
    cvFull.width = Math.round(vpFull.width); cvFull.height = Math.round(vpFull.height);
    const ctxFull = cvFull.getContext('2d');
    ctxFull.fillStyle = '#ffffff'; ctxFull.fillRect(0, 0, cvFull.width, cvFull.height);
    await page.render({ canvasContext: ctxFull, viewport: vpFull }).promise;

    let finalB64, finalW, finalH, cropOffsetX = 0, cropOffsetY = 0;

    if (hasCrop && cropPdf && i === 1) {
      // Crop the rendered image to the calibrated area
      const cx1 = Math.max(0, Math.round(cropPdf.x1 * aiScaleFull));
      const cy1 = Math.max(0, Math.round(cropPdf.y1 * aiScaleFull));
      const cx2 = Math.min(cvFull.width, Math.round(cropPdf.x2 * aiScaleFull));
      const cy2 = Math.min(cvFull.height, Math.round(cropPdf.y2 * aiScaleFull));
      const cw = cx2 - cx1, ch = cy2 - cy1;
      console.log('[EliteAI Room Scan] Crop in AI px:', cx1, cy1, '-', cx2, cy2, '=', cw, 'x', ch);

      // Draw crop into new canvas, scaled to fit TARGET_LONG_EDGE
      const cropScale = TARGET_LONG_EDGE / Math.max(cw, ch);
      const outW = Math.round(cw * cropScale), outH = Math.round(ch * cropScale);
      const cvCrop = document.createElement('canvas');
      cvCrop.width = outW; cvCrop.height = outH;
      const ctxCrop = cvCrop.getContext('2d');
      ctxCrop.fillStyle = '#ffffff'; ctxCrop.fillRect(0, 0, outW, outH);
      ctxCrop.drawImage(cvFull, cx1, cy1, cw, ch, 0, 0, outW, outH);

      finalB64 = cvCrop.toDataURL('image/png').split(',')[1];
      finalW = outW; finalH = outH;
      // cropOffsetX/Y: how many PDF units from page origin to crop top-left
      cropOffsetX = cropPdf.x1;
      cropOffsetY = cropPdf.y1;
      // The aiScale for coord conversion: cropScale * aiScaleFull (crop px → PDF units)
      // cropAiScale = outW / (cw / aiScaleFull * 1) = outW * aiScaleFull / cw
      const cropAiScale = outW * aiScaleFull / cw;
      pageImages.push({ pageNum: i, b64: finalB64, aiScale: cropAiScale, aiW: outW, aiH: outH, nativeW: nativeVp.width, nativeH: nativeVp.height, canvasY: pdfPages[i-1]?.y || 0, cropOffsetX, cropOffsetY });
    } else {
      finalB64 = cvFull.toDataURL('image/png').split(',')[1];
      pageImages.push({ pageNum: i, b64: finalB64, aiScale: aiScaleFull, aiW: cvFull.width, aiH: cvFull.height, nativeW: nativeVp.width, nativeH: nativeVp.height, canvasY: pdfPages[i-1]?.y || 0, cropOffsetX: 0, cropOffsetY: 0 });
    }
  }

  const rs2 = renderScale || pdfScale || 1;
  // Capture canvasY in PDF units now (while rs is known) so coordinate conversion is zoom-independent
  pageImages.forEach(pg => { pg.canvasYpdf = pg.canvasY / rs2; });
  console.log('[EliteAI Room Scan] Sending', pageImages.length, 'page(s) to Claude, rs=', rs2.toFixed(3));
  pageImages.forEach(pg => {
    console.log('  Page', pg.pageNum, ': rendered at', pg.aiW, 'x', pg.aiH, 'px, aiScale=', pg.aiScale.toFixed(3), 'canvasY=', pg.canvasY, 'renderScale=', rs2.toFixed(3));
  });

  const pageDesc = pageImages.map(pg => 'Page ' + pg.pageNum + ': ' + pg.aiW + 'x' + pg.aiH + 'px').join(', ');
  const userContent = [
    { type: 'text', text: 'You are an architectural floor plan expert. Identify every enclosed room/space.\n\nFLOOR PLAN: ' + pdfDoc.numPages + ' page(s). ' + pageDesc + '.\n\nIMAGE SIZE: Each page image is the EXACT resolution listed above. Use the FULL coordinate space.\n\nHOW TO READ:\n- WALLS: thick parallel black lines\n- ROOMS: open white area enclosed by walls\n- DOORS: arc (quarter-circle) swinging from wall opening\n- WINDOWS: three thin parallel lines in a wall\n- Rooms often have text labels inside\n\nTASK: Find every enclosed room. Draw a bounding box covering the full interior of each room wall-to-wall. Mark confidence "sure" if label readable, "guess" if inferred.\n\nCATEGORIES:\n- "living" = Living/Family/Great Room #3b82f6\n- "bedroom" = Bedroom/Master/Guest #8b5cf6\n- "kitchen" = Kitchen #f97316\n- "bathroom" = Bathroom/Bath/WC #06b6d4\n- "garage" = Garage/Carport #6b7280\n- "outdoor" = Patio/Deck/Porch #22c55e\n- "utility" = Laundry/Storage/Closet/Pantry #f59e0b\n- "office" = Office/Study/Den #ec4899\n- "dining" = Dining/Breakfast #a855f7\n- "hallway" = Hall/Foyer/Entry/Corridor #64748b\n- "other" = anything else #94a3b8\n\nCOORDINATE RULES:\n- Use pixel coordinates. (0,0) = top-left corner of the image\n- x increases left-to-right, y increases top-to-bottom\n- Boxes must be LARGE, covering the full room interior wall-to-wall\n- A box covering only a corner is WRONG\n\nReturn ONLY valid JSON array, no explanation:\n[{"page":1,"name":"Living Room","category":"living","color":"#3b82f6","confidence":"sure","x1":420,"y1":310,"x2":1380,"y2":980}]' }
  ];
  pageImages.forEach((pg, idx) => {
    userContent.push({ type: 'text', text: 'Page ' + (idx+1) + ' of ' + pdfDoc.numPages + '. Image is ' + pg.aiW + 'x' + pg.aiH + ' pixels. Coordinates: x from 0 to ' + pg.aiW + ', y from 0 to ' + pg.aiH + '.' });
    userContent.push({ type: 'image', source: { type: 'base64', media_type: 'image/png', data: pg.b64 } });
  });

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
    body: JSON.stringify({ model: 'claude-opus-4-5-20251101', max_tokens: 4000, messages: [{ role: 'user', content: userContent }] })
  });

  eaiSetProgress(80, 'Processing AI response...');
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error?.message || 'API error ' + resp.status);

  const txt = data.content?.find(c => c.type === 'text')?.text || '';
  console.log('[EliteAI Room Scan] Raw Claude response:', txt.substring(0, 2000));
  eaiLog('⚡ Claude response received (' + txt.length + ' chars)');
  const jsonMatch = txt.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('No room data in response');
  const detected = JSON.parse(jsonMatch[0]);

  eaiSetProgress(90, 'Drawing room overlays...');
  eaiLog('✅ Found ' + detected.length + ' rooms — drawing overlays...');

  // Coordinate conversion: AI image px → canvas px
  // AI rendered at aiScale px per PDF unit
  // Canvas rendered at rs px per PDF unit  
  // So: canvasPx = aiPx * (rs / aiScale)
  // canvasY includes 196px legend offset at top
  // Verify: canvas width should be nativeW * rs
  console.log('[EliteAI Room Scan] Coordinate conversion: rs=', rs, 'pdfScale=', pdfScale, 'renderScale=', renderScale);
  console.log('  Canvas actual size: pdfCv.width=', pdfCv.width, 'pdfCv.height=', pdfCv.height);
  pageImages.forEach(pg => {
    const expectedCanvasW = Math.round(pg.nativeW * rs);
    const expectedCanvasH = Math.round(pg.nativeH * rs);
    console.log('  Page', pg.pageNum, 'native PDF size:', Math.round(pg.nativeW), 'x', Math.round(pg.nativeH), '→ expected canvas:', expectedCanvasW, 'x', expectedCanvasH, '(actual canvas w:', pdfCv.width, ')');
  });
  const newBoxes = detected.map(d => {
    const pageIdx = Math.max(0, (d.page || 1) - 1);
    const pg = pageImages[Math.min(pageIdx, pageImages.length - 1)];
    // Convert AI px → PDF units (zoom-independent)
    // AI image was rendered at aiScale px per PDF unit
    // So: PDF units = AI px / aiScale
    // canvasY (pdfPages[i].y) is in canvas px = PDF units * renderScale, so divide by rs to get PDF units
    // Convert AI px → PDF units
    // AI image rendered at aiScale px per PDF unit, no legend offset (legend is UI chrome only)
    // AI px → PDF units, then add crop offset so coords are relative to full page origin
    const x1 = d.x1 / pg.aiScale + (pg.cropOffsetX || 0);
    const x2 = d.x2 / pg.aiScale + (pg.cropOffsetX || 0);
    const y1 = d.y1 / pg.aiScale + (pg.cropOffsetY || 0);
    const y2 = d.y2 / pg.aiScale + (pg.cropOffsetY || 0);
    console.log('  Room "' + d.name + '": AI(' + d.x1 + ',' + d.y1 + ')-(' + d.x2 + ',' + d.y2 + ') offset(' + Math.round(pg.cropOffsetX||0) + ',' + Math.round(pg.cropOffsetY||0) + ') pdfUnits(' + Math.round(x1) + ',' + Math.round(y1) + ')-(' + Math.round(x2) + ',' + Math.round(y2) + ')');
    return {
      id: genUUID(),
      labelId: null, labelName: d.name || 'Unknown', color: d.color || '#94a3b8',
      category: d.category || 'other',
      x1, y1, x2, y2,
      page: d.page || 1, needsReview: d.confidence === 'guess' || !d.name || d.name === 'Room',
      confidence: d.confidence || 'sure', _aiGenerated: true
    };
  });

  // Clear ALL previously AI-generated boxes (stale rs scale from prior scan)
  const oldAI = mapBoxes.filter(b => b._aiGenerated);
  for (const old of oldAI) {
    try { await sb.from('floor_plan_room_boxes').delete().eq('id', old.id); } catch(e) {}
    try { await sb.from('floor_plan_annotations').delete().eq('id', old.id); } catch(e) {}
  }
  mapBoxes = [...mapBoxes.filter(b => !b._aiGenerated), ...newBoxes];
  renderMapOverlay();

  // Scroll to top-left so calibration boxes are visible
  const cwrap = document.getElementById('cwrap');
  if (cwrap) { cwrap.scrollTop = 0; cwrap.scrollLeft = 0; }

  // AI-generated boxes are NOT auto-saved to Supabase — they are temporary previews only.
  // This prevents scan results from corrupting blank/template files on reload.
  // Boxes persist only when user manually draws, renames, or places icons.

  eaiSetProgress(100, 'Done!');
  eaiLog('✅ ' + newBoxes.length + ' rooms mapped and shown on plan');
}

function eaiRenderRoomList() {
  const listEl = document.getElementById('eai-room-list');
  if (!listEl) return;
  listEl.innerHTML = '';
  if (!mapBoxes.length) {
    listEl.innerHTML = '<div style="color:var(--txt3);font-size:11px;text-align:center;padding:16px;">No rooms detected</div>';
    return;
  }
  mapBoxes.forEach(b => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:7px 9px;background:var(--surf2);border:1px solid ' + (b.needsReview ? 'rgba(251,191,36,.5)' : 'var(--bdr)') + ';border-radius:7px;';
    const dot = document.createElement('div');
    dot.style.cssText = 'width:11px;height:11px;border-radius:3px;background:' + b.color + ';flex-shrink:0;';
    const name = document.createElement('div');
    name.style.cssText = 'flex:1;font-size:12px;font-weight:600;color:var(--txt);';
    name.textContent = b.labelName;
    const badge = document.createElement('div');
    badge.style.cssText = 'font-size:9px;padding:1px 5px;border-radius:4px;font-weight:700;flex-shrink:0;' + (b.needsReview ? 'background:rgba(251,191,36,.2);color:#b45309;' : 'color:#22c55e;');
    badge.textContent = b.needsReview ? '?' : '✓';
    const editBtn = document.createElement('button');
    editBtn.style.cssText = 'padding:2px 7px;border-radius:5px;border:1px solid var(--bdr2);background:var(--surf);color:var(--txt3);font-family:"DM Sans",sans-serif;font-size:10px;cursor:pointer;flex-shrink:0;';
    editBtn.textContent = 'Rename';
    editBtn.onclick = () => {
      const newName = prompt('Rename:', b.labelName);
      if (newName && newName.trim()) { b.labelName = newName.trim(); b.needsReview = false; saveMapBox(b); renderMapOverlay(); eaiRenderRoomList(); }
    };
    row.appendChild(dot); row.appendChild(name); row.appendChild(badge); row.appendChild(editBtn);
    listEl.appendChild(row);
  });
}

async function eawStartIconPlacement() {
  eaiShowState('placing');
  const userPrompt = window._eawPrompt || '';
  const docContext = _eawDocText ? '\n\nPROPOSAL/SCOPE:\n' + _eawDocText.substring(0, 3000) : '';
  const roomContext = mapBoxes.length ? '\n\nROOM MAP (place icons INSIDE these rooms):\n' + mapBoxes.map(b => '- ' + b.labelName + ' (' + b.category + ')').join('\n') : '';
  const fullPrompt = userPrompt + docContext + roomContext;
  const promptEl = document.getElementById('ai-prompt');
  if (promptEl) promptEl.value = fullPrompt;

  eaiPlaceLog('⚡ Rendering floor plan at high resolution...');
  const placeBar = document.getElementById('eai-place-bar');
  if (placeBar) { placeBar.style.width = '25%'; placeBar.style.animation = 'none'; }

  try {
    await runEliteAI();
    if (placeBar) { placeBar.style.width = '100%'; }
    const doneMsg = document.getElementById('eai-done-msg');
    if (doneMsg) doneMsg.textContent = icons.length + ' icons placed on your plan!';
    eaiShowState('done');
    toast('✅ ' + icons.length + ' icons placed');
  } catch(e) {
    eaiPlaceLog('❌ ' + e.message);
    toast('❌ ' + e.message, true);
    eaiShowState('review');
  }
}

function openEliteAIWizard() {
  if (!pdfDoc) { toast('Open a floor plan first', true); return; }
  const apiKey = localStorage.getItem('elite_anthropic_key');
  if (!apiKey) { toast('Set your API key in settings first', true); return; }
  document.getElementById('elite-ai-wizard').style.display = 'flex';
  eawGoStep(1);
}

function closeEliteAIWizard() {
  document.getElementById('elite-ai-wizard').style.display = 'none';
}

function eawGoStep(n) {
  [1,2,3,4].forEach(i => {
    const panel = document.getElementById('eaw-step-' + i);
    if (panel) panel.style.display = i === n ? 'flex' : 'none';
    const stepEl = document.querySelector('.eaw-step[data-step="' + i + '"]');
    if (stepEl) {
      stepEl.style.color = i === n ? 'var(--acc)' : 'var(--txt3)';
      stepEl.style.borderBottomColor = i === n ? 'var(--acc)' : 'transparent';
    }
  });
}

function eawHandleDoc(input) {
  const file = input.files[0];
  if (!file) return;
  _eawDocName = file.name;
  document.getElementById('eaw-doc-name').textContent = file.name;
  const reader = new FileReader();
  reader.onload = e => { _eawDocText = e.target.result || ''; };
  // Try to read as text for txt/doc; PDF will be unreadable but we note the filename
  if (file.type === 'application/pdf') {
    _eawDocText = '[PDF proposal attached: ' + file.name + ']';
  } else {
    reader.readAsText(file);
  }
}

async function eawStartRoomScan() {
  const prompt = (document.getElementById('eaw-prompt')?.value || '').trim();
  const btn = document.getElementById('eaw-scan-btn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Scanning...'; }

  eawGoStep(3);
  const statusEl = document.getElementById('eaw-room-status');
  const listEl = document.getElementById('eaw-room-list');
  if (statusEl) statusEl.textContent = 'Rendering floor plan at high resolution...';
  if (listEl) listEl.innerHTML = '<div style="color:var(--txt3);font-size:12px;text-align:center;padding:20px;">Scanning...</div>';

  try {
    // Store the prompt for use in step 4
    window._eawPrompt = prompt;

    // Run the room scan (reuse aiAutoMap logic)
    await aiAutoMap();

    // Populate room list from mapBoxes
    eawRenderRoomList();

    const sure = mapBoxes.filter(b => !b.needsReview).length;
    const review = mapBoxes.filter(b => b.needsReview).length;
    if (statusEl) statusEl.innerHTML =
      '<strong>' + mapBoxes.length + ' rooms mapped.</strong> ' +
      (review > 0 ? '<span style="color:#f59e0b;">' + review + ' marked for review — check the plan and double-click to rename.</span>' : '<span style="color:#22c55e;">All identified with high confidence.</span>');

  } catch(e) {
    if (statusEl) statusEl.innerHTML = '<span style="color:var(--red);">❌ ' + e.message + '</span>';
  }

  if (btn) { btn.disabled = false; btn.innerHTML = '<svg class="ai-star-icon" width="14" height="14" viewBox="0 0 36 36" fill="none"><g class="s0"><path d="M18 4 L20 12 L28 14 L20 16 L18 24 L16 16 L8 14 L16 12Z" fill="white"/></g></svg> Re-scan Plan'; }
}

function eawRenderRoomList() {
  const listEl = document.getElementById('eaw-room-list');
  if (!listEl) return;
  if (!mapBoxes.length) {
    listEl.innerHTML = '<div style="color:var(--txt3);font-size:12px;text-align:center;padding:20px;">No rooms detected — try re-scanning</div>';
    return;
  }
  listEl.innerHTML = '';
  mapBoxes.forEach(b => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--surf2);border:1px solid ' + (b.needsReview ? 'rgba(251,191,36,.4)' : 'var(--bdr)') + ';border-radius:8px;';
    const dot = document.createElement('div');
    dot.style.cssText = 'width:12px;height:12px;border-radius:3px;background:' + b.color + ';flex-shrink:0;';
    const name = document.createElement('div');
    name.style.cssText = 'flex:1;font-size:13px;font-weight:600;color:var(--txt);';
    name.textContent = b.labelName;
    const badge = document.createElement('div');
    badge.style.cssText = 'font-size:10px;color:' + (b.needsReview ? '#b45309' : '#22c55e') + ';font-weight:700;';
    badge.textContent = b.needsReview ? '? Review' : '✓ Sure';
    const editBtn = document.createElement('button');
    editBtn.style.cssText = 'padding:3px 8px;border-radius:5px;border:1px solid var(--bdr2);background:var(--surf);color:var(--txt3);font-family:"DM Sans",sans-serif;font-size:11px;cursor:pointer;';
    editBtn.textContent = 'Rename';
    editBtn.onclick = () => {
      const newName = prompt('Rename room:', b.labelName);
      if (newName && newName.trim()) {
        b.labelName = newName.trim();
        b.needsReview = false;
        saveMapBox(b);
        renderMapOverlay();
        eawRenderRoomList();
      }
    };
    row.appendChild(dot); row.appendChild(name); row.appendChild(badge); row.appendChild(editBtn);
    listEl.appendChild(row);
  });
}

async function eawStartIconPlacement() {
  eawGoStep(4);
  const statusEl = document.getElementById('eaw-place-status');
  const progressEl = document.getElementById('eaw-place-progress');
  const resultsEl = document.getElementById('eaw-results');
  const doneBtns = document.getElementById('eaw-done-btns');
  const progressText = document.getElementById('eaw-progress-text');
  if (resultsEl) resultsEl.style.display = 'none';
  if (doneBtns) doneBtns.style.display = 'none';
  if (progressEl) progressEl.style.display = 'flex';

  // Build prompt from wizard input + proposal doc + room context
  const userPrompt = window._eawPrompt || '';
  const docContext = _eawDocText ? '\n\nPROPOSAL/SCOPE DOCUMENT:\n' + _eawDocText.substring(0, 3000) : '';
  const roomContext = mapBoxes.length
    ? '\n\nROOM MAP (already identified — place icons INSIDE these rooms):\n' + mapBoxes.map(b => '- ' + b.labelName + ' (' + b.category + ')').join('\n')
    : '';

  // Set the hidden ai-prompt textarea so runEliteAI can read it
  const promptEl = document.getElementById('ai-prompt');
  if (promptEl) promptEl.value = userPrompt + docContext + roomContext;

  try {
    if (progressText) progressText.textContent = 'Rendering plan at high resolution...';
    if (statusEl) statusEl.textContent = 'EliteAI is analyzing rooms and placing icons...';

    // Temporarily hook into the status updates
    const origStatus = document.getElementById('ai-status');
    if (origStatus && progressText) {
      const observer = new MutationObserver(() => {
        progressText.textContent = origStatus.textContent.replace(/[⚡✅❌]/g, '').trim();
      });
      observer.observe(origStatus, { childList: true, subtree: true, characterData: true });
      setTimeout(() => observer.disconnect(), 120000);
    }

    await runEliteAI();

    // Show results
    if (progressEl) progressEl.style.display = 'none';
    const placed = icons.length;
    if (resultsEl) {
      resultsEl.style.display = 'flex';
      resultsEl.innerHTML =
        '<div style="background:var(--surf2);border-radius:10px;padding:16px;text-align:center;">' +
        '<div style="font-size:32px;margin-bottom:8px;">✅</div>' +
        '<div style="font-size:15px;font-weight:700;color:var(--txt);margin-bottom:4px;">' + placed + ' icons placed</div>' +
        '<div style="font-size:12px;color:var(--txt3);">Review placements on your plan. Use the Select tool to fine-tune any icons that need adjustment.</div>' +
        '</div>';
    }
    if (doneBtns) { doneBtns.style.display = 'flex'; }
    if (statusEl) statusEl.textContent = 'Done! Review the icons on your plan.';

  } catch(e) {
    if (progressEl) progressEl.style.display = 'none';
    if (statusEl) statusEl.innerHTML = '<span style="color:var(--red);">❌ ' + e.message + '</span>';
    if (doneBtns) { doneBtns.style.display = 'flex'; }
  }
}
function loadAIRules() {
  const saved = localStorage.getItem('elite_ai_rules');
  const el = document.getElementById('ai-rules');
  if (saved && el) el.value = saved;
}
// API key managed via Supabase app_config
const ANTHROPIC_KEY = '';

async function runEliteAI() {
  document.getElementById('run-ai-btn')?.classList.add('ai-loading');
  if (!pdfDoc) { toast('Open a PDF plan first'); return; }
  const apiKey = requireApiKey(); if (!apiKey) return;
  const prompt = (document.getElementById('eaw-prompt')?.value || document.getElementById('ai-prompt')?.value || '').trim();
  if (!prompt) { toast('Describe what systems to add', true); return; }

  const status = document.getElementById('ai-status');
  status.innerHTML = '<div style="color:var(--acc2)">⚡ Rendering high-resolution plan for AI analysis...</div>';

  try {
    // ── Step 1: Render each page at high resolution for Claude ──────────────
    // Target the longest edge at 3000px so Claude can clearly see wall lines,
    // door arcs, window gaps, and room boundaries.
    // Use PNG (lossless) — JPEG compression blurs thin wall lines.
    const TARGET_LONG_EDGE = 3000;

    const pageImages = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      status.innerHTML = `<div style="color:var(--acc2)">⚡ Rendering page ${i} of ${pdfDoc.numPages} at high resolution...</div>`;
      const page = await pdfDoc.getPage(i);
      const nativeVp = page.getViewport({ scale: 1.0 });
      // Scale so longest edge hits TARGET_LONG_EDGE
      const nativeLong = Math.max(nativeVp.width, nativeVp.height);
      const aiScale = TARGET_LONG_EDGE / nativeLong;
      const vp = page.getViewport({ scale: aiScale });

      const cv = document.createElement('canvas');
      cv.width  = Math.round(vp.width);
      cv.height = Math.round(vp.height);
      const ctx = cv.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cv.width, cv.height);
      await page.render({ canvasContext: ctx, viewport: vp }).promise;

      // PNG for lossless wall line clarity
      const b64 = cv.toDataURL('image/png').split(',')[1];

      pageImages.push({
        pageNum: i,
        b64,
        aiScale,           // px per PDF unit in this image
        aiW: cv.width,
        aiH: cv.height,
        nativeW: nativeVp.width,   // PDF units (at scale 1)
        nativeH: nativeVp.height,
        canvasY: pdfPages[i-1]?.y || 0,  // canvas pixel Y offset for this page
        canvasH: pdfPages[i-1]?.h || 0,
      });
    }

    status.innerHTML = '<div style="color:var(--acc2)">⚡ EliteAI is analyzing the plan and placing icons...</div>';
    eaiPlaceLog('⚡ Sending plan to AI for icon placement...');

    // Build icon list
    const iconList = ICONS.map(ic => ic.id + ': ' + ic.name + ' (' + ic.cat + ')').join('\n');

    // Placement rules
    const aiRules = (document.getElementById('ai-rules')?.value || localStorage.getItem('elite_ai_rules') || '').trim();
    const rulesSection = aiRules ? `\n\nMANDATORY PLACEMENT RULES — FOLLOW EXACTLY:\n${aiRules}\n` : '';

    // Learning examples
    let examplesSection = '';
    try {
      const { data: examples } = await sb.from('placement_examples')
        .select('prompt, placements_summary').order('created_at', { ascending: false }).limit(3);
      if (examples?.length) {
        examplesSection = '\n\nPREVIOUS SUCCESSFUL PLACEMENTS (use as style reference):\n';
        examples.forEach((ex, i) => {
          examplesSection += `\nExample ${i+1} — \"${ex.prompt}\":\n${ex.placements_summary}\n`;
        });
      }
    } catch(e) { /* ignore */ }

    // ── Step 2: Build the prompt ─────────────────────────────────────────────
    const pageDescriptions = pageImages.map(pg =>
      `Page ${pg.pageNum}: ${pg.aiW} × ${pg.aiH} pixels (represents ${Math.round(pg.nativeW)} × ${Math.round(pg.nativeH)} PDF units at native scale)`
    ).join('\n');

    const userContent = [
      { type: 'text', text: `You are an expert AV/smart home integration designer placing smart home devices on architectural floor plans for Elite Smart Home.${rulesSection}${examplesSection}

CLIENT REQUEST: "${prompt}"

FLOOR PLAN IMAGES: ${pdfDoc.numPages} page(s) follow this message.
${pageDescriptions}

═══════════════════════════════════════════════
HOW TO READ ARCHITECTURAL FLOOR PLANS
═══════════════════════════════════════════════
WALLS: Thick parallel lines forming the room boundaries. Everything BETWEEN the parallel lines is wall material — do NOT place icons inside wall thickness.

DOORS: An arc (quarter-circle) swinging from a hinge point at a wall opening. The arc shows the door swing path. Place door contacts ON the hinge side of the opening.

WINDOWS: Three thin parallel lines in a wall opening (two outer lines = frame, center line = glass). Do not place icons here.

ROOMS: Enclosed spaces bounded by walls. Place icons INSIDE the room, away from the wall lines themselves.

EXTERIOR vs INTERIOR: The exterior is OUTSIDE the outer wall boundary. Cameras and exterior keypads go on exterior walls aimed outward. All other devices go INSIDE.

═══════════════════════════════════════════════
CRITICAL PLACEMENT RULES
═══════════════════════════════════════════════
1. STAY INSIDE ROOMS — every icon must be within the enclosed room boundary, not on wall lines, not in wall thickness, not outside the building
2. IDENTIFY THE ROOM FIRST — locate the room's four walls, find its center, then place the icon 
3. MOTION SENSORS — place in upper corners of rooms where two walls meet
4. CAMERAS — on exterior walls above doors, aimed outward (just outside the outer wall line)
5. KEYPADS — on interior wall surface, beside the door opening, 1-2 ft from door frame
6. SPEAKERS — centered in room ceiling, evenly spaced in pairs
7. DOOR CONTACTS — on the door slab itself, near the hinge
8. SMOKE/CO — center of room ceiling, away from HVAC vents
9. NEVER place icons on top of text labels, room name annotations, or dimension lines

═══════════════════════════════════════════════
COORDINATE SYSTEM
═══════════════════════════════════════════════
- Origin (0, 0) = TOP-LEFT corner of each page image
- X increases rightward, Y increases downward
- Coordinates are PIXEL positions within the page image shown
- Each page image size is listed above — stay within those bounds

Available icon IDs:
${iconList}

═══════════════════════════════════════════════
RESPONSE FORMAT
═══════════════════════════════════════════════
Return ONLY a valid JSON array, no other text:
[
  {"iconId": "motion-pir", "page": 1, "x": 245, "y": 312, "label": "LR Motion", "reason": "Corner of living room"},
  {"iconId": "cam-dome", "page": 1, "x": 890, "y": 156, "label": "Front Cam", "reason": "Above front door exterior"}
]

Maximum 40 icons. Use ONLY icon IDs from the list above.` }
    ];

    pageImages.forEach((pg, idx) => {
      userContent.push({ type: 'text', text: `Page ${idx + 1} of ${pdfDoc.numPages} (${pg.aiW}×${pg.aiH}px):` });
      userContent.push({ type: 'image', source: { type: 'base64', media_type: 'image/png', data: pg.b64 } });
    });

    // ── Step 3: Call Claude ──────────────────────────────────────────────────
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4000,
        messages: [{ role: 'user', content: userContent }]
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'API error');

    const text = data.content.find(c => c.type === 'text')?.text || '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Could not parse AI response: ' + text.substring(0, 200));
    const placements = JSON.parse(jsonMatch[0]);

    // ── Step 4: Convert AI pixel coords → stored icon coords ────────────────
    let placed = 0;
    for (const pl of placements) {
      const ic = ICONS.find(i => i.id === pl.iconId);
      if (!ic) { console.warn('Unknown iconId:', pl.iconId); continue; }
      const pageIdx = Math.max(0, (pl.page || 1) - 1);
      const pg = pageImages[Math.min(pageIdx, pageImages.length - 1)];
      if (!pg) continue;

      // Clamp coords within image bounds
      const aiX = Math.max(0, Math.min(pl.x, pg.aiW));
      const aiY = Math.max(0, Math.min(pl.y, pg.aiH));

      // Convert AI pixel coords → stored icon units (PDF scale-1 units, legend-offset corrected)
      // Icon draw:  cx = pi.x * rs,  cy = (pi.y + 196/rs) * rs  = pi.y*rs + 196
      // So:  pi.x = canvasPx_x / rs  =  (aiX * pdfScale/aiScale) / pdfScale  =  aiX / aiScale
      //      pi.y = (canvasPx_y - 196) / rs
      //           = (pg.canvasY + aiY * pdfScale/aiScale - 196) / pdfScale
      //           = (pg.canvasY - 196) / pdfScale  +  aiY / aiScale
      const storedX = aiX / pg.aiScale;
      const storedY = (pg.canvasY - 196) / rs + (aiY / pg.aiScale);

      console.log(`[EliteAI] ${pl.iconId} "${pl.label}" pg${pl.page}: AI(${aiX},${aiY}) aiScale=${pg.aiScale.toFixed(3)} canvasY=${pg.canvasY} rs=${rs2.toFixed(3)} → stored(${storedX.toFixed(1)},${storedY.toFixed(1)}) → canvas(${(storedX*rs).toFixed(0)},${(storedY*rs+196).toFixed(0)})`);

      console.log(`[EliteAI] ${pl.iconId} "${pl.label}": AI(${aiX},${aiY}) aiScale=${pg.aiScale.toFixed(3)} → stored(${storedX.toFixed(1)},${storedY.toFixed(1)})`);

      await new Promise(res => {
        const img = new Image();
        img.onload = () => {
          icons.push({
            id: Date.now() + placed,
            iconId: pl.iconId,
            x: storedX,
            y: storedY,
            scale: 36,
            img,
            label: pl.label || '',
            rotation: 0,
            opacity: 100,
            flipH: false
          });
          placed++;
          res();
        };
        img.onerror = res;
        img.src = ic.f;
      });
    }

    redraw(); updateLegend(); autoSave();

    const summaryHtml = placements.map(p => `<div style="margin-bottom:4px;">• <strong>${p.label || p.iconId}</strong>: ${p.reason || ''}</div>`).join('');
    status.innerHTML = `<div style="color:var(--grn)">✅ Placed ${placed} icons on your plan!</div>
    <div style="margin-top:8px;font-size:11px;color:var(--txt2);">${summaryHtml}</div>
    <div style="margin-top:10px;font-size:11px;color:var(--txt3);">Fine-tune with the Select tool, then save as a learning example:</div>
    <button type="button" onclick="saveAsExample()" style="margin-top:8px;width:100%;padding:7px;background:var(--surf2);border:1px solid var(--bdr2);border-radius:6px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;">💾 Save as Learning Example</button>`;

    window._lastAIPrompt = prompt;
    window._lastPlacementSummary = placements.map(p => `- ${p.label || p.iconId}: ${p.reason || ''}`).join('\n');
    document.getElementById('run-ai-btn')?.classList.remove('ai-loading');
    toast('✅ EliteAI placed ' + placed + ' icons');

  } catch(e) {
    status.innerHTML = `<div style="color:var(--red)">❌ ${e.message}</div>`;
    toast('❌ AI error: ' + e.message, true);
    console.error('[EliteAI error]', e);
    document.getElementById('run-ai-btn')?.classList.remove('ai-loading');
  }
}

// ═══════════════════════════════════════════════════════════
// PAGE MERGER
// ═══════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════
// SMART PAGE MERGE
// ═══════════════════════════════════════════════════════════

// Page type classifications from AI scan
let mergePageData = []; // [{pageNum, type, label, selected, cv, crop}]

async function showPageMerger() {
  if (!pdfDoc) { toast('Open a PDF plan first'); return; }
  closeMenus();
  // iOS: prevent keyboard from opening by blurring any active element first
  if (document.activeElement) document.activeElement.blur();
  document.body.style.overflow = 'hidden'; // prevent body scroll on iOS
  document.getElementById('page-merger-modal').classList.remove('gone');

  // Reset progressive reveal — hide steps 2 & 3 until scan completes
  const step2 = document.getElementById('merge-step2');
  const step3 = document.getElementById('merge-step3');
  if (step2) step2.style.display = 'none';
  if (step3) step3.style.display = 'none';

  const scanBtn = document.getElementById('scan-btn');
  scanBtn.disabled = true;
  scanBtn.style.opacity = '0.4';
  scanBtn.style.cursor = 'not-allowed';
  // Re-enable scan button after 3s so user can retry if auto-scan hangs
  setTimeout(() => {
    const scanBtn = document.getElementById('scan-btn');
    // scan button re-enabled only when aiScanPages() completes
  }, 999999); // effectively disabled — real re-enable happens at end of aiScanPages
  document.getElementById('scan-status').innerHTML = '<span style="color:var(--acc2)">Loading page previews...</span>';
  await buildMergerThumbs();
  document.getElementById('scan-status').innerHTML = '<span style="color:var(--acc2)">Previews done. Checking API key...</span>';
  await new Promise(r => setTimeout(r, 50)); // let UI update
  await aiScanPages();
}

async function buildMergerThumbs() {
  const container = document.getElementById('merger-pages');
  mergePageData = [];

  // On iOS skip thumbnails entirely — just show page numbers
  // iOS PDF.js canvas rendering inside modals is unreliable
  const isMobile = /iPad|iPhone|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // Skip thumbnail rendering — just populate page list with placeholders
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      mergePageData.push({
        pageNum: i, type: 'unknown', label: 'Page ' + i,
        selected: false, dataUrl: '',
        floorLevel: null, elevationSide: null, secondaryElevation: null
      });
    }
    renderMergerList();
    return;
  }

  // Desktop: render thumbnails normally
  container.innerHTML = '<div style="padding:14px;font-size:12px;color:var(--txt3);">Generating previews...</div>';
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    try {
      const page = await pdfDoc.getPage(i);
      // Render at a scale suitable for both display thumbnail AND AI scan reuse
      // Use 0.35 — good enough for Claude to classify, avoids double-render memory spike
      const vp = page.getViewport({ scale: 0.35 });
      const cv = document.createElement('canvas');
      cv.width = vp.width; cv.height = vp.height;
      await page.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
      const dataUrl = cv.toDataURL('image/jpeg', 0.70);
      // Release canvas memory immediately — dataUrl is all we need
      cv.width = 0; cv.height = 0;
      mergePageData.push({
        pageNum: i, type: 'unknown', label: 'Page ' + i,
        selected: false, dataUrl,
        floorLevel: null, elevationSide: null, secondaryElevation: null
      });
    } catch(e) {
      mergePageData.push({
        pageNum: i, type: 'unknown', label: 'Page ' + i,
        selected: false, dataUrl: '',
        floorLevel: null, elevationSide: null, secondaryElevation: null
      });
    }
    // Yield to the browser every 4 pages to prevent UI freeze and GPU starvation
    if (i % 4 === 0) await new Promise(r => setTimeout(r, 10));
  }
  renderMergerList();
}


function showMergeTypePrompt(pd, callback) {
  const m = document.createElement('div');
  m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:99999;display:flex;align-items:center;justify-content:center;';
  m.innerHTML = `<div style="background:var(--surf);border:1px solid var(--bdr2);border-radius:14px;padding:28px;max-width:340px;width:90%;display:flex;flex-direction:column;gap:12px;box-shadow:0 24px 80px rgba(0,0,0,.7);">
    <div style="font-size:15px;font-weight:700;color:var(--txt);">Page ${pd.pageNum} — Choose Category</div>
    <div style="font-size:12px;color:var(--txt3);">What type of drawing is this?</div>
    <button onclick="window._mtp('floor_electrical')" style="padding:14px;background:#22c55e22;border:2px solid #22c55e;border-radius:10px;color:#22c55e;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;">📐 Layout</button>
    <button onclick="window._mtp('elevation_front')" style="padding:14px;background:#38bdf822;border:2px solid #38bdf8;border-radius:10px;color:#38bdf8;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;">🏠 Elevation</button>
    <button onclick="window._mtp('other')" style="padding:10px;background:transparent;border:1px solid var(--bdr2);border-radius:9px;color:var(--txt3);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;">— Skip this page</button>
  </div>`;
  document.body.appendChild(m);
  window._mtp = (type) => { delete window._mtp; m.remove(); pd.type = type; pd.selected = type !== 'other'; if (callback) callback(); };
  m.addEventListener('click', (e) => { if (e.target === m) { delete window._mtp; m.remove(); } });
}

function renderMergerList() {
  const container = document.getElementById('merger-pages');
  const typeColors = {
    floor:'#22c55e', floor_electrical:'#22c55e', floor_layout:'#22c55e', floor_other:'#7a8fac',
    elevation_front:'#38bdf8', elevation_back:'#38bdf8',
    elevation_left:'#38bdf8', elevation_right:'#38bdf8',
    other:'#555', unknown:'#444'
  };
  const typeLabels = {
    floor:'📐 Layout', floor_electrical:'📐 Layout', floor_layout:'📐 Layout',
    elevation_front:'🏠 Elevation', elevation_back:'🏠 Elevation',
    elevation_left:'🏠 Elevation', elevation_right:'🏠 Elevation',
    other:'— Skip', unknown:'Not scanned'
  };
  container.innerHTML = '';
  mergePageData.forEach((pd, i) => {
    const col = typeColors[pd.type] || '#444';
    const lbl = typeLabels[pd.type] || pd.type;
    const sel = pd.selected;

    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:5px;flex-shrink:0;width:155px;';

    // Frame
    const frame = document.createElement('div');
    frame.style.cssText = [
      'position:relative;border-radius:7px;overflow:hidden;cursor:pointer;',
      'border:3px solid ' + (sel ? '#38bdf8' : '#1e2d45') + ';',
      'box-shadow:' + (sel ? '0 0 0 3px rgba(56,189,248,.35)' : 'none') + ';',
      'transition:border-color .12s,box-shadow .12s;'
    ].join('');

    const img = document.createElement('img');
    if (pd.dataUrl) {
      img.src = pd.dataUrl;
      img.style.cssText = 'width:149px;display:block;background:#fff;';
    } else {
      // No thumbnail — show page number placeholder
      img.style.cssText = 'width:149px;height:100px;display:flex;align-items:center;justify-content:center;background:#1a2a3a;';
      const ph = document.createElement('div');
      ph.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:#38bdf8;font-family:DM Sans,sans-serif;';
      ph.textContent = 'Pg ' + pd.pageNum;
      frame.appendChild(ph);
    }

    // Checkmark badge — click to toggle select/deselect
    const chk = document.createElement('div');
    chk.style.cssText = [
      'position:absolute;top:5px;right:5px;width:24px;height:24px;border-radius:6px;',
      'background:' + (sel ? '#38bdf8' : '#ffffff') + ';',
      'border:2px solid ' + (sel ? '#38bdf8' : '#999') + ';',
      'display:flex;align-items:center;justify-content:center;',
      'font-size:14px;color:#fff;font-weight:900;cursor:pointer;z-index:2;'
    ].join('');
    chk.textContent = sel ? '✓' : '';
    chk.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!pd.selected) {
        showMergeTypePrompt(pd, () => renderMergerList());
      } else {
        pd.selected = false;
        renderMergerList();
      }
    });

    // Type badge
    const badge = document.createElement('div');
    badge.style.cssText = [
      'position:absolute;bottom:0;left:0;right:0;padding:4px 6px;',
      'background:' + col + ';font-size:9px;font-weight:700;color:#fff;text-align:center;'
    ].join('');
    badge.textContent = lbl;

    frame.appendChild(img);
    frame.appendChild(chk);
    frame.appendChild(badge);

    // Click thumbnail = open lightbox
    frame.style.cursor = 'zoom-in';
    frame.addEventListener('click', () => {
      if (pd.dataUrl) openMergeLightbox(pd.dataUrl, 'Page ' + pd.pageNum + ': ' + pd.label);
    });

    // Label
    const labelEl = document.createElement('div');
    labelEl.style.cssText = 'font-size:10px;color:var(--txt2);text-align:center;line-height:1.3;width:149px;word-break:break-word;';
    labelEl.textContent = 'P' + pd.pageNum + ': ' + pd.label;

    // Type dropdown
    const typeSelect = document.createElement('select');
    typeSelect.style.cssText = 'width:149px;padding:3px 5px;font-size:10px;font-family:DM Sans,sans-serif;background:var(--surf2);border:1px solid var(--bdr2);border-radius:5px;color:var(--txt);cursor:pointer;margin-top:2px;';
    [['floor_electrical','📐 Layout'],['elevation_front','🏠 Elevation'],['other','— Skip this page']].forEach(([val,lbl]) => {
      const opt = document.createElement('option');
      opt.value = val; opt.textContent = lbl;
      if ((pd.type === val) || (val === 'elevation_front' && pd.type && pd.type.startsWith('elevation') && pd.type !== 'floor_electrical')) opt.selected = true;
      if (val === 'floor_electrical' && (pd.type === 'floor' || pd.type === 'floor_electrical')) opt.selected = true;
      typeSelect.appendChild(opt);
    });
    typeSelect.addEventListener('change', (e) => {
      pd.type = e.target.value;
      pd.selected = pd.type !== 'other';
      renderMergerList();
    });

    wrap.appendChild(frame);
    wrap.appendChild(labelEl);
    wrap.appendChild(typeSelect);
    container.appendChild(wrap);
  });
}

function openMergeLightbox(src, caption) {
  // Remove existing
  const existing = document.getElementById('merge-lb');
  if (existing) existing.remove();
  const lb = document.createElement('div');
  lb.id = 'merge-lb';
  lb.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.95);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;';
  lb.innerHTML = '<div style="font-size:12px;color:#aaa;font-family:DM Sans,sans-serif;">' + caption + ' — double-click or press Esc to close</div>';
  const img = document.createElement('img');
  img.src = src;
  img.style.cssText = 'max-width:92vw;max-height:88vh;object-fit:contain;border-radius:6px;box-shadow:0 20px 80px rgba(0,0,0,.8);';
  lb.appendChild(img);
  lb.addEventListener('dblclick', () => lb.remove());
  document.addEventListener('keydown', function esc(e) { if(e.key==='Escape'){lb.remove();document.removeEventListener('keydown',esc);} });
  document.body.appendChild(lb);
}

async function aiScanPages() {
  const status2 = document.getElementById('scan-status');
  if (status2) status2.innerHTML = '<span style="color:var(--acc2)">Checking API key...</span>';
  await new Promise(r => setTimeout(r, 30));
  const apiKey = requireApiKey(); if (!apiKey) return;
  if (!pdfDoc) return;
  const btn = document.getElementById('scan-btn');
  const status = document.getElementById('scan-status');
  btn.disabled = true; btn.classList.add('ai-loading'); btn.textContent = 'Scanning...';
  document.getElementById('merge-header-star')?.classList.add('ai-loading');
  status.innerHTML = '<span style="color:var(--acc2)">Starting scan of ' + pdfDoc.numPages + ' pages...</span>';
  await new Promise(r => setTimeout(r, 30));
  try {
    const isMobile = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    const pageImages = [];

    if (isMobile) {
      // iOS: skip ALL canvas rendering — send text-only prompt
      status.innerHTML = '<span style="color:var(--acc2)">Analyzing ' + mergePageData.length + ' pages...</span>';
      for (let i = 0; i < mergePageData.length; i++) {
        pageImages.push({ idx: i, b64: null, w: 0, h: 0 });
      }
    } else {
      // Desktop: reuse dataUrls already captured in buildMergerThumbs — no re-rendering needed.
      // This prevents the double-render memory spike that was blanking the screen.
      status.innerHTML = '<span style="color:var(--acc2)">Preparing pages for AI...</span>';
      for (let i = 0; i < mergePageData.length; i++) {
        const pd = mergePageData[i];
        const b64 = pd.dataUrl ? pd.dataUrl.split(',')[1] : null;
        pageImages.push({ idx: i, b64, w: 0, h: 0 });
      }
    }

    // For large PDFs, batch the scan so the payload fits within context limits.
    // A 34-page PDF sent in one shot can cause truncated JSON responses.
    const BATCH_SIZE = 16;
    const batches = [];
    for (let start = 0; start < pageImages.length; start += BATCH_SIZE) {
      batches.push(pageImages.slice(start, start + BATCH_SIZE));
    }
    const allResults = [];

    for (let batchIdx = 0; batchIdx < batches.length; batchIdx++) {
      const batch = batches[batchIdx];
      const batchStart = batchIdx * BATCH_SIZE;
      status.innerHTML = '<span style="color:var(--acc2)">Scanning pages ' + (batchStart+1) + '–' + (batchStart+batch.length) + ' of ' + pageImages.length + '...</span>';
      await new Promise(r => setTimeout(r, 20));

    // Send all pages to Claude in one call
    const scanPrompt = 'You are classifying architectural PDF pages. You will receive a BATCH of pages (may not start at page 1). Apply priority rules below.'+
      '\n\nPRIORITY RULE: First check if ANY page in this batch is an electrical floor plan (type="floor").'+
      '\n- If YES: use electrical plans as the layout pages. All other floor plans become type="other".'+
      '\n- If NO electrical plans exist: select any architectural floor plan as type="floor_layout".'+
      '\n\nTYPE 1: type="floor" — ELECTRICAL floor plans (highest priority).'+
      '\nMust show electrical symbols: outlet receptacles, wall switches, lighting fixtures, circuit lines, panel boxes, smoke detectors.'+
      '\nTitle typically contains: "Electrical", "Elec", "Power", "Lighting Plan".'+
      '\n\nTYPE 2: type="floor_layout" — Architectural floor plans (ONLY when zero electrical plans exist in the batch).'+
      '\nShows walls, rooms, dimensions, doors, windows — no electrical symbols.'+
      '\nTitle typically says: "Floor Plan", "First Floor", "Second Floor", "Level 1", "Main Floor".'+
      '\n\nTYPE 3: type="elevation_front" — ANY exterior elevation drawing.'+
      '\nShows outside face of building: wall surface, windows, doors, roof profile.'+
      '\nAll directions (front/rear/left/right/N/S/E/W) use type="elevation_front".'+
      '\nMultiple elevations on one page: still type="elevation_front", quadPage=true if 4 in a grid.'+
      '\n\nEVERYTHING ELSE = type="other", include=false.'+
      '\n\nIMPORTANT: Return EXACTLY one JSON object per page in this batch. Use the page numbers I provide.'+
      '\nReturn ONLY a JSON array:\n'+
      '[{"page":1,"type":"other","label":"Site Plan","include":false,"floorLevel":null,"elevationSide":null,"secondaryElevation":null,"secondaryPosition":null,"quadPage":false,"quadSides":null}]';

      // Process each batch
      const batchContent = [{ type:'text', text: scanPrompt }];
      batch.forEach((p) => {
        const pageNum = batchStart + p.idx + 1;
        batchContent.push({ type:'text', text:'Page '+pageNum+':' });
        if (p.b64) {
          batchContent.push({ type:'image', source:{ type:'base64', media_type:'image/jpeg', data:p.b64 } });
        } else {
          batchContent.push({ type:'text', text:'(image unavailable — classify based on context)' });
        }
      });
      const bodyStr = JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:4000, messages:[{role:'user',content:batchContent}] });
      console.log('Batch', batchIdx+1, 'payload:', Math.round(bodyStr.length/1024), 'KB');
      const resp = await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
        body:bodyStr
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error?.message||'API error ' + resp.status);
      const txt = data.content?.find(c=>c.type==='text')?.text||'';
      const match = txt.match(/\[[\s\S]*\]/);
      if (match) {
        const batchResults = JSON.parse(match[0]);
        allResults.push(...batchResults);
      }
    } // end batch loop

    if (allResults.length === 0) throw new Error('Could not parse AI response');

    // Apply classifications — enforce priority across ALL batches
    const hasElectrical = allResults.some(r => r.type === 'floor' || r.type === 'floor_electrical');
    allResults.forEach(r => {
      const idx = r.page - 1;
      if (idx < 0 || idx >= mergePageData.length) return;
      const pd = mergePageData[idx];
      if (hasElectrical && r.type === 'floor_layout') { r.include = false; }
      pd.type = r.type;
      pd.label = r.label;
      const _isFloor = r.type === 'floor' || r.type === 'floor_electrical' || r.type === 'floor_layout';
      const _isElev = r.type?.startsWith('elevation');
      pd.selected = (_isFloor || _isElev) && r.include !== false;
      pd.cropHint = r.cropHint;
      pd.floorLevel = r.floorLevel || null;
      pd.elevationSide = r.elevationSide || null;
      pd.secondaryElevation = r.secondaryElevation || null;
      pd.secondaryPosition  = r.secondaryPosition  || null;
      pd.quadPage           = r.quadPage           || false;
      pd.quadSides          = r.quadSides           || null;
    });
    renderMergerList();
    const layoutCount = allResults.filter(r=>(r.type==='floor'||r.type==='floor_electrical'||r.type==='floor_layout')&&r.include).length;
    const elevs = allResults.filter(r=>r.type?.startsWith('elevation')&&r.include).length;
    status.innerHTML = '<span style="color:var(--grn)">✅ Found <strong>'+layoutCount+' layout plan'+(layoutCount!==1?'s':'')+'</strong> and <strong>'+elevs+' elevation'+(elevs!==1?'s':'')+'</strong></span>';
    // Reveal steps 2 and 3 now that scan is complete
    const step2 = document.getElementById('merge-step2');
    const step3 = document.getElementById('merge-step3');
    const step1title = document.querySelector('#merge-step1 .step1-title');
    if (step1title) step1title.textContent = '✅ Scan complete';
    if (step2) { step2.style.display = 'block'; step2.scrollIntoView({ behavior:'smooth', block:'nearest' }); }
    if (step3) step3.style.display = 'block';
  } catch(e) { status.innerHTML = '<span style="color:var(--red)">❌ '+e.message+'</span>'; }
  btn.style.display = 'none';
}

async function runSmartMerge() {
  const apiKey = requireApiKey(); if (!apiKey) return;
  const toMerge = mergePageData.filter(pd => pd.selected);
  if (toMerge.length < 1) { toast('Select at least one page'); return; }
  const _mergeIsIphone = window.innerWidth <= 767;
  const outputW2 = _mergeIsIphone ? 1200 : (+document.getElementById('merge-output-size').value || 4800);
  const btn = document.getElementById('merger-run-btn');
  btn.style.opacity = '.5'; btn.style.pointerEvents = 'none';
  // Hide rescan button — not needed during merge
  const _sb = document.getElementById('scan-btn');
  if (_sb) { _sb.style.display = 'none'; }

  // Progress bar inside the modal
  const scanStatus = document.getElementById('scan-status');
  function setProgress(pct, msg) {
    scanStatus.innerHTML =
      '<div style="font-size:12px;color:var(--acc2);margin-bottom:6px;">' + msg + '</div>' +
      '<div style="background:var(--bdr);border-radius:4px;height:6px;overflow:hidden;">' +
        '<div style="background:var(--acc);height:6px;width:' + pct + '%;transition:width .3s;border-radius:4px;"></div>' +
      '</div>' +
      '<div style="font-size:10px;color:var(--txt3);margin-top:4px;">' + Math.round(pct) + '% complete</div>';
  }

  try {
    const totalSteps = toMerge.length * 2 + 4; // render + crop + 4 assembly steps
    let step = 0;
    function tick(msg) { step++; setProgress((step/totalSteps)*100, msg); }

    // ── Step 1: Render each selected page at high res ──────────────────
    const rendered = [];
    const _isMergeIphone = window.innerWidth <= 767;
    const _mergeScale = _isMergeIphone ? 0.8 : 6.0; // iPhone: low scale to avoid crash; desktop: high-res
    for (const pd of toMerge) {
      tick('Rendering page ' + pd.pageNum + ' of ' + pdfDoc.numPages + '...');
      const page = await pdfDoc.getPage(pd.pageNum);
      const vp = page.getViewport({ scale: _mergeScale });
      const cv = document.createElement('canvas'); cv.width=vp.width; cv.height=vp.height;
      const ctx = cv.getContext('2d');
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,cv.width,cv.height);
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      rendered.push({ pd, cv, w: cv.width, h: cv.height });
    }

    // ── Step 2: Crop each page — strip title blocks aggressively ─────────
    const cropped = [];
    for (const r of rendered) {
      tick('Stripping title block: page ' + r.pd.pageNum + '...');
      let cropBox = null;

      // AI crop: send thumbnail, ask for tight bounding box of drawing only
      if (apiKey) {
        try {
          const thumb = document.createElement('canvas');
          const ts = Math.min(900/r.w, 1);
          thumb.width=Math.round(r.w*ts); thumb.height=Math.round(r.h*ts);
          thumb.getContext('2d').drawImage(r.cv,0,0,thumb.width,thumb.height);
          const b64 = thumb.toDataURL('image/jpeg',0.8).split(',')[1];
          const resp = await fetch('https://api.anthropic.com/v1/messages',{
            method:'POST',
            headers:{'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
            body:JSON.stringify({model:'claude-sonnet-4-5-20250929',max_tokens:120,
              messages:[{role:'user',content:[
                {type:'image',source:{type:'base64',media_type:'image/jpeg',data:b64}},
                {type:'text',text:'Architectural sheet '+thumb.width+'x'+thumb.height+'px. Find the bounding box that contains the main drawing area (floor plan or elevation) PLUS any legends, schedules, dimension strings, or notes that belong to that drawing. Only exclude a clearly separate bordered title block / stamp box / revision table sitting in its own distinct box, typically in a corner or along one edge. If you are not confident exactly where the title block boundary is, include MORE rather than less — it is far better to leave some title block visible than to cut off any part of the actual drawing, a legend, or dimension text. Use generous 4-5% padding on each side. Reply ONLY with JSON {"x":N,"y":N,"w":N,"h":N} — nothing else.'}
              ]}]
            })
          });
          if (resp.ok) {
            const d = await resp.json();
            const txt = d.content?.find(c=>c.type==='text')?.text||'';
            const m = txt.match(/\{\s*"x"\s*:\s*\d+/);
            if (m) {
              const box = JSON.parse(txt.match(/\{[^}]+\}/)[0]);
              const sx=r.w/thumb.width, sy=r.h/thumb.height;
              // Validate box is reasonable (at least 30% of page)
              if (box.w > thumb.width*0.6 && box.h > thumb.height*0.6) {
                // Add 2% padding to each side to avoid clipping drawing edges
                const padX = Math.round(r.w * 0.02), padY = Math.round(r.h * 0.02);
                cropBox = {
                  x: Math.max(0, Math.round(box.x*sx) - padX),
                  y: Math.max(0, Math.round(box.y*sy) - padY),
                  w: Math.min(r.w, Math.round(box.w*sx) + padX*2),
                  h: Math.min(r.h, Math.round(box.h*sy) + padY*2)
                };
              }
            }
          }
        } catch(e) { console.warn('AI crop failed:', e); }
      }

      // Fallback when AI crop is unavailable: use a small fixed safety margin only.
      // We deliberately do NOT guess at title-block location here — aggressive
      // density-based guessing was cutting into real plan content (legends,
      // dense linework near edges). Better to leave a border than eat a drawing.
      if (!cropBox) {
        const cv = r.cv;
        const iw = cv.width, ih = cv.height;
        const m = Math.round(Math.min(iw, ih) * 0.01); // 1% safety margin only
        cropBox = { x: m, y: m, w: iw - m*2, h: ih - m*2 };
      }

      // Add safety padding to avoid clipping drawing edges
      const _padX2 = Math.round(r.w*0.01), _padY2 = Math.round(r.h*0.01);
      const cx=Math.max(0,cropBox.x-_padX2), cy=Math.max(0,cropBox.y-_padY2);
      const cw=Math.min(cropBox.w+_padX2*2, r.w-cx), ch=Math.min(cropBox.h+_padY2*2, r.h-cy);
      const out = document.createElement('canvas'); out.width=cw; out.height=ch;
      const outCtx = out.getContext('2d');
      outCtx.drawImage(r.cv, cx, cy, cw, ch, 0, 0, cw, ch);

      // Ask AI to find ONLY large standalone text blocks (schedules, title blocks)
      // Be conservative — only remove clearly non-drawing content
      if (apiKey) {
        try {
          const thumb2 = document.createElement('canvas');
          const ts2 = Math.min(800/cw, 1);
          thumb2.width = Math.round(cw*ts2); thumb2.height = Math.round(ch*ts2);
          thumb2.getContext('2d').drawImage(out, 0, 0, thumb2.width, thumb2.height);
          const b642 = thumb2.toDataURL('image/jpeg', 0.75).split(',')[1];
          const resp2 = await fetch('https://api.anthropic.com/v1/messages', {
            method:'POST',
            headers:{'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
            body: JSON.stringify({ model:'claude-sonnet-4-5-20250929', max_tokens:400,
              messages:[{role:'user', content:[
                {type:'image', source:{type:'base64', media_type:'image/jpeg', data:b642}},
                {type:'text', text:'Architectural drawing '+thumb2.width+'x'+thumb2.height+'px. Find ONLY large standalone text blocks that are NOT part of the drawing: material schedule tables (grid with columns of specs), title blocks with job/architect info, or large legend boxes filled with text rows. Do NOT mark small labels, dimensions, room names, or callouts that are embedded in the drawing. Only return regions that are clearly separate rectangular text blocks. Return JSON array: [{"x":N,"y":N,"w":N,"h":N}]. If nothing qualifies return [].'}
              ]}]
            })
          });
          if (resp2.ok) {
            const d2 = await resp2.json();
            const txt2 = d2.content?.find(c=>c.type==='text')?.text || '';
            const arrM = txt2.match(/\[[\s\S]*?\]/);
            if (arrM) {
              let rects = [];
              try { rects = JSON.parse(arrM[0]); } catch(_) {}
              const sx2 = cw/thumb2.width, sy2 = ch/thumb2.height;
              outCtx.fillStyle = '#ffffff';
              for (const rec of rects) {
                if (!rec.w || !rec.h) continue;
                // Safety caps: never remove more than 45% width or 55% height in one rect
                const rw = Math.min(Math.round(rec.w * sx2), cw * 0.45);
                const rh = Math.min(Math.round(rec.h * sy2), ch * 0.55);
                const rx = Math.max(0, Math.round(rec.x * sx2));
                const ry = Math.max(0, Math.round(rec.y * sy2));
                outCtx.fillRect(rx, ry, rw, rh);
              }
            }
          }
        } catch(e) { console.warn('Text removal pass failed:', e); }
      }

      cropped.push({ cv:out, pd:r.pd });
    }

    // ── Step 3: Sort into floors and elevations ────────────────────────
    tick('Sorting pages by type...');
    // Include all possible level names AI might return
    const levelOrder = ['basement','lower','ground','first','main','second','upper','third','fourth','fifth'];
    const floors = cropped.filter(c => c.pd.type === 'floor' || c.pd.type === 'floor_electrical' || c.pd.type === 'floor_layout')
      .sort((a,b) => {
        // Normalize level: null/undefined = sort by page number
        const la = a.pd.floorLevel ? levelOrder.indexOf(a.pd.floorLevel.toLowerCase()) : -1;
        const lb = b.pd.floorLevel ? levelOrder.indexOf(b.pd.floorLevel.toLowerCase()) : -1;
        // Unknown levels: use page number as tiebreaker
        const ra = la < 0 ? 999 + a.pd.pageNum : la;
        const rb = lb < 0 ? 999 + b.pd.pageNum : lb;
        return ra - rb;
      });
    console.log('Floors found:', floors.map(f => 'P'+f.pd.pageNum+' level='+f.pd.floorLevel));

    // Collect ALL elevation pages in page order — no deduplication, no splitting
    const elevations = cropped
      .filter(c => c.pd.type && c.pd.type.startsWith('elevation_'))
      .sort((a, b) => a.pd.pageNum - b.pd.pageNum);
    console.log('Elevations found:', elevations.map(e => 'P'+e.pd.pageNum));

    if (floors.length===0 && elevations.length===0) {
      cropped.forEach(c => { c.pd.type='floor_electrical'; floors.push(c); });
    }

    // Layout constants
    const HEADER_H = 0;     // no header bar on merged pages
    const LEGEND_H = 0;     // no legend area reserved (handled by the markup tool)
    const GAP = 90;          // space between drawings
    const MARGIN = 100;      // outer page margin
    const PAGE_W = outputW2;
    const PAGE_H = Math.round(outputW2 * (11/17)); // landscape 17x11

    // Safe rounded rect (no roundRect API needed)
    function rrect(mc, x, y, w, h, r) {
      mc.beginPath();
      mc.moveTo(x+r, y);
      mc.lineTo(x+w-r, y); mc.arcTo(x+w,y, x+w,y+r, r);
      mc.lineTo(x+w, y+h-r); mc.arcTo(x+w,y+h, x+w-r,y+h, r);
      mc.lineTo(x+r, y+h); mc.arcTo(x,y+h, x,y+h-r, r);
      mc.lineTo(x, y+r); mc.arcTo(x,y, x+r,y, r);
      mc.closePath();
    }

    function drawHeader(mc, title) {
      // Full blue header — no black bar
      mc.fillStyle = '#1d6fdb'; mc.fillRect(0, 0, PAGE_W, HEADER_H);
      mc.fillStyle = '#ffffff'; mc.font = 'bold 18px DM Sans,sans-serif'; mc.textAlign = 'left';
      mc.fillText('Elite Smart Home  —  ' + title, 22, HEADER_H/2 + 6);
      mc.fillStyle = 'rgba(255,255,255,0.7)'; mc.font = '11px DM Sans,sans-serif'; mc.textAlign = 'right';
      mc.fillText('856-315-9147  |  elitesmarthome.com', PAGE_W - 20, HEADER_H/2 + 4);
    }

    // drawEliteBrand: top-left corner Elite branding box
    function drawEliteBrand(mc) {
      const lw=340, lh=72;
      const lx=MARGIN, ly=HEADER_H+14;
      mc.save(); mc.shadowColor='rgba(0,0,0,0.12)'; mc.shadowBlur=10; mc.shadowOffsetX=1; mc.shadowOffsetY=2;
      mc.fillStyle='#ffffff'; rrect(mc,lx,ly,lw,lh,7); mc.fill(); mc.restore();
      mc.strokeStyle='#c0cfe8'; mc.lineWidth=1.5; rrect(mc,lx,ly,lw,lh,7); mc.stroke();
      mc.fillStyle='#1d6fdb'; rrect(mc,lx,ly,8,lh,4); mc.fill();
      mc.fillStyle='#1d6fdb'; rrect(mc,lx+18,ly+12,40,40,6); mc.fill();
      mc.fillStyle='#fff'; mc.font='bold 22px sans-serif'; mc.textAlign='center';
      mc.fillText('⌂', lx+38, ly+39);
      mc.fillStyle='#080d18'; mc.font='bold 15px DM Sans,sans-serif'; mc.textAlign='left';
      mc.fillText('ELITE SMART HOME', lx+68, ly+27);
      mc.fillStyle='#1d6fdb'; mc.fillRect(lx+68, ly+31, 180, 2);
      mc.fillStyle='#7a90a8'; mc.font='10px DM Sans,sans-serif';
      mc.fillText('856-315-9147  |  elitesmarthome.com', lx+68, ly+46);
      mc.fillText('409 Bloomfield Dr. STE 5, West Berlin NJ 08091', lx+68, ly+61);
      const today=new Date().toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'});
      mc.fillStyle='#a0b4c8'; mc.font='9px DM Sans,sans-serif'; mc.textAlign='right';
      mc.fillText(today, lx+lw-10, ly+lh-8);
    }
    // drawLegend: alias kept for compatibility
    function drawLegend(mc) { drawEliteBrand(mc); }
    // ── Step 4: Build floor plans page ────────────────────────────────
    tick('Building floor plans...');
    const floorPdfs = [];
    if (floors.length > 0) {
      const pg = document.createElement('canvas');
      pg.width = PAGE_W; pg.height = PAGE_H;
      const mc = pg.getContext('2d');
      mc.fillStyle = '#ffffff'; mc.fillRect(0,0,PAGE_W,PAGE_H);

      const availW = PAGE_W - MARGIN*2;
      const availH = PAGE_H - HEADER_H - MARGIN - LEGEND_H;

      // Scale all to same height then fit width
      let scales = floors.map(c => availH / c.cv.height);
      let totalW = floors.reduce((s,c,i) => s + c.cv.width*scales[i], 0) + GAP*(floors.length-1);
      if (totalW > availW) {
        const shrink = availW / totalW;
        scales = scales.map(s => s*shrink);
        totalW = floors.reduce((s,c,i) => s + c.cv.width*scales[i], 0) + GAP*(floors.length-1);
      }

      let x = MARGIN + Math.round((availW - totalW) / 2);
      const drawTop = HEADER_H + MARGIN;

      floors.forEach((c, i) => {
        const dw = Math.round(c.cv.width*scales[i]);
        const dh = Math.round(c.cv.height*scales[i]);
        const y = drawTop + Math.round((availH - dh) / 2);
        mc.drawImage(c.cv, x, y, dw, dh);
        // Label pill
        const lbl = c.pd.label || ('Floor '+(i+1));
        mc.font = 'bold 12px DM Sans,sans-serif'; mc.textAlign = 'center';
        const lblW = mc.measureText(lbl).width + 20;
        const ly2 = y+dh+10;
        mc.fillStyle='#eef3fb'; rrect(mc, x+dw/2-lblW/2, ly2, lblW, 20, 10); mc.fill();
        mc.fillStyle='#1d6fdb'; mc.fillText(lbl, x+dw/2, ly2+14);
        // Divider
        if (i < floors.length-1) {
          mc.strokeStyle='#e0e6ef'; mc.lineWidth=1;
          mc.beginPath(); mc.moveTo(x+dw+GAP/2, drawTop+20); mc.lineTo(x+dw+GAP/2, drawTop+availH-20); mc.stroke();
        }
        x += dw+GAP;
      });

      // No header bar — clean white page
      floorPdfs.push(pg);
    }

    // ── Step 5: Build elevations page ─────────────────────────────────
    tick('Building elevations...');
    const elevPdfs = [];
    if (elevations.length > 0) {
      // Layout: 1 elevation = full width; 2+ = 2-column grid
      const E_COLS = elevations.length === 1 ? 1 : 2;
      const E_GAP = 20;
      const E_MARGIN = 30;
      const cellW = E_COLS === 1 ? (PAGE_W - E_MARGIN * 2) : Math.floor((PAGE_W - E_MARGIN * 2 - E_GAP) / E_COLS);

      // Calculate row heights based on actual image aspect ratios
      const rowHeights = [];
      for (let r = 0; r < Math.ceil(elevations.length / E_COLS); r++) {
        let maxH = 0;
        for (let c = 0; c < E_COLS; c++) {
          const idx = r * E_COLS + c;
          if (idx < elevations.length) {
            const e = elevations[idx];
            const scaled = Math.round(e.cv.height * (cellW / e.cv.width));
            maxH = Math.max(maxH, scaled);
          }
        }
        rowHeights.push(maxH);
      }

      const totalH = E_MARGIN + rowHeights.reduce((a, h) => a + h + E_GAP, 0) - E_GAP + E_MARGIN;
      const pg = document.createElement('canvas');
      pg.width = PAGE_W; pg.height = totalH;
      const mc = pg.getContext('2d');
      mc.fillStyle = '#ffffff'; mc.fillRect(0, 0, PAGE_W, totalH);

      let curY = E_MARGIN;
      for (let r = 0; r < rowHeights.length; r++) {
        const rowH = rowHeights[r];
        for (let c = 0; c < E_COLS; c++) {
          const idx = r * E_COLS + c;
          if (idx >= elevations.length) break;
          const e = elevations[idx];
          const bx = E_MARGIN + c * (cellW + E_GAP);
          // Scale to fit cellW exactly, maintain aspect ratio
          const s = cellW / e.cv.width;
          const dw = cellW;
          const dh = Math.round(e.cv.height * s);
          // Center vertically in row
          const dy = curY + Math.round((rowH - dh) / 2);
          mc.drawImage(e.cv, bx, dy, dw, dh);
        }
        curY += rowH + E_GAP;
      }

      elevPdfs.push(pg);
    }

    // ── Build two separate PDFs and load combined into canvas ──────────
    tick('Building PDFs...');
    const { jsPDF } = window.jspdf;
    const pt = 72/96;
    const baseName = CP?.name || currentFileName || 'plan';

    function canvasToPdf(canvasPage) {
      const pw = canvasPage.width*pt, ph = canvasPage.height*pt;
      const p = new jsPDF({ orientation: pw>ph?'l':'p', unit:'pt', format:[pw,ph] });
      p.addImage(canvasPage.toDataURL('image/jpeg',.93),'JPEG',0,0,pw,ph,undefined,'FAST');
      return p;
    }

    // Store separate PDF blobs for individual download
    window._floorPdfBlob = null;
    window._elevPdfBlob = null;
    window._floorPdfName = baseName + '-electrical-floors';
    window._elevPdfName = baseName + '-elevations';

    // Build floor/elev PDF blobs using pdf-lib for vector quality (blank — no annotations yet)
    const { PDFDocument: _PDFD } = window.PDFLib;

    async function canvasToPdfLibBlob(cv) {
      // For the merge preview canvas, we create a PDF with the canvas as a high-res PNG.
      // This is the blank base (no icons yet) — icons are added later via saveCurrentTab.
      const libDoc = await _PDFD.create();
      const pg = libDoc.addPage([cv.width, cv.height]);
      const pngDU = cv.toDataURL('image/png');
      const pngBuf = await fetch(pngDU).then(r => r.arrayBuffer());
      const pngImg = await libDoc.embedPng(pngBuf);
      pg.drawImage(pngImg, { x:0, y:0, width:cv.width, height:cv.height });
      const bytes = await libDoc.save();
      return new Blob([bytes], {type:'application/pdf'});
    }

    console.log('[merge] building floor/elev blobs with pdf-lib...');
    if (floorPdfs.length > 0) {
      window._floorPdfBlob = await canvasToPdfLibBlob(floorPdfs[0]);
      console.log('[merge] floorBlob:', window._floorPdfBlob.size);
    }
    if (elevPdfs.length > 0) {
      window._elevPdfBlob = await canvasToPdfLibBlob(elevPdfs[0]);
      console.log('[merge] elevBlob:', window._elevPdfBlob.size);
    }

    // Combine into one 2-page PDF for canvas viewing (floor page 1, elev page 2)
    const allPages = [...floorPdfs, ...elevPdfs];
    if (allPages.length === 0) throw new Error('No pages to merge');
    const combinedLibDoc = await _PDFD.create();
    for (const pgCv of allPages) {
      const pgPng = pgCv.toDataURL('image/png');
      const pgBuf = await fetch(pgPng).then(r => r.arrayBuffer());
      const pgImg = await combinedLibDoc.embedPng(pgBuf);
      const newPg = combinedLibDoc.addPage([pgCv.width, pgCv.height]);
      newPg.drawImage(pgImg, { x:0, y:0, width:pgCv.width, height:pgCv.height });
    }
    const combinedBytes = await combinedLibDoc.save();
    // Load combined PDF for canvas display
    const combinedBlob = new Blob([combinedBytes], {type:'application/pdf'});

    setProgress(95, 'Saving blank versions to project...');
    closeModal('page-merger-modal');
    strokes = []; icons = []; sel = null;
    currentFileName = baseName;
    document.getElementById('page-strip').style.display = 'none';

    await loadMergedTabs(window._floorPdfBlob, window._elevPdfBlob, baseName);

    // Auto-save blank variants to Supabase
    if (CP?.id) {
      try {
        const blankAnn = { strokes: [], icons: [] };
        const _ts = Date.now();
        // Only delete the blank placeholder variants (Blank Layout / Blank Elevation)
        // that Smart Merge auto-creates — never delete named variants the user saved.
        await sb.from('markup_variants').delete().eq('project_id', CP.id).in('name', ['Blank Layout', 'Blank Elevation', 'Blank Floorplan']);
        if (window._floorPdfBlob) {
          const floorPath = 'variants/' + CP.id + '/layout-' + _ts + '.pdf';
          console.log('[merge] uploading floor:', floorPath, window._floorPdfBlob.size);
          await sb.storage.from('plan-pdfs').upload(floorPath, window._floorPdfBlob, { contentType: 'application/pdf' });
          const {data:fv} = await sb.from('markup_variants').insert({ project_id:CP.id, tab_type:'floor', name:'Blank Layout', pdf_storage_path:floorPath, ewm_data:blankAnn, created_by:CU.id, updated_at:new Date().toISOString() }).select().single();
          if (fv) { TABS.floor._variantId = fv.id; TABS.floor._variantName = 'Blank Layout'; TABS.floor._variantTabType = 'floor'; console.log('[merge] floor variant id:', fv.id); }
        }
        if (window._elevPdfBlob) {
          const elevPath = 'variants/' + CP.id + '/elevation-' + _ts + '.pdf';
          console.log('[merge] uploading elev:', elevPath, window._elevPdfBlob.size);
          await sb.storage.from('plan-pdfs').upload(elevPath, window._elevPdfBlob, { contentType: 'application/pdf' });
          const {data:ev} = await sb.from('markup_variants').insert({ project_id:CP.id, tab_type:'elev', name:'Blank Elevation', pdf_storage_path:elevPath, ewm_data:blankAnn, created_by:CU.id, updated_at:new Date().toISOString() }).select().single();
          if (ev) { TABS.elev._variantId = ev.id; TABS.elev._variantName = 'Blank Elevation'; TABS.elev._variantTabType = 'elev'; console.log('[merge] elev variant id:', ev.id); }
        }
        currentVariantId = TABS.floor._variantId || null;
        currentVariantName = 'Blank Layout';
        currentVariantTabType = 'floor';
      } catch(e) { console.warn('Auto-save blank variants:', e.message); }
    }

    setProgress(100, '✅ Done!');
    toast('✅ Merged — Blank Layout & Blank Elevation saved to project');
    window._apSourcePdfDoc = pdfDoc;
    window._apUsedPageNums = mergePageData.filter(pd=>pd.selected).map(pd=>pd.pageNum);

  } catch(e) {
    scanStatus.innerHTML = '<span style="color:var(--red)">❌ Merge failed: '+e.message+'</span>';
    toast('❌ Merge failed: '+e.message, true);
    console.error(e);
  }
  btn.style.opacity='1'; btn.style.pointerEvents='auto';
}

async function runPageMerger() {
  if (window.innerWidth <= 767) {
    toast('⚠️ Smart Merge is only available on iPad and desktop', true);
    return;
  }
  showPageMerger();
}

async function saveAsExample() {
  const jobPrompt = window._lastAIPrompt || '';
  const name = prompt('Name this example (e.g. "2-story colonial security + AV"):', jobPrompt.substring(0, 60));
  if (!name) return;

  // Build a readable summary of icon placements (what + where)
  const summary = icons.map(ic => {
    const def = ICONS.find(i => i.id === ic.iconId);
    const lbl = ic.label || def?.name || ic.iconId;
    return `- ${lbl} (${ic.iconId})`;
  }).join('\n');

  const record = { name, prompt: jobPrompt, placements_summary: summary, icon_count: icons.length, created_by: CU?.id };

  // Save to localStorage always (works even without Supabase table)
  const localExamples = JSON.parse(localStorage.getItem('elite_placement_examples') || '[]');
  localExamples.unshift({ ...record, created_at: new Date().toISOString() });
  localStorage.setItem('elite_placement_examples', JSON.stringify(localExamples.slice(0, 20)));

  // Also try Supabase
  try {
    const { error } = await sb.from('placement_examples').insert(record);
    if (error) console.warn('Supabase save skipped (table may not exist):', error.message);
  } catch(e) { console.warn('Supabase unavailable:', e); }

  toast('✅ Saved "' + name + '" — AI will reference this on future placements');
}

// ── Dual-plan tab system ─────────────────────────────────────────────
function saveTabState() {
  if (!activeTab) return;
  const t = TABS[activeTab];
  t.pdfDoc = pdfDoc; t.pdfScale = pdfScale; t.pdfPages = [...pdfPages];
  t.strokes = strokes.map(s => ({...s}));
  t.icons = icons.map(i => ({...i}));
  t.redoStack = [...redoStack];
  t._variantId = currentVariantId;
  t._variantName = currentVariantName;
  t._variantTabType = currentVariantTabType;
}

async function switchPlanTab(which) {
  if (activeTab === which) return;
  // Save current tab state
  saveTabState();
  activeTab = which;
  const t = TABS[which];

  // Update tab button styles
  document.getElementById('tab-floor').style.background = which==='floor' ? 'var(--acc)' : 'var(--surf2)';
  document.getElementById('tab-floor').style.color = which==='floor' ? '#fff' : 'var(--txt2)';
  document.getElementById('tab-elev').style.background  = which==='elev'  ? 'var(--acc)' : 'var(--surf2)';
  document.getElementById('tab-elev').style.color  = which==='elev'  ? '#fff' : 'var(--txt2)';

  // Restore tab state
  pdfDoc = t.pdfDoc; pdfScale = t.pdfScale;
  strokes = t.strokes ? [...t.strokes] : [];
  icons = t.icons ? [...t.icons] : [];
  redoStack = t.redoStack ? [...t.redoStack] : [];
  sel = null;
  if (t._variantId) { currentVariantId = t._variantId; currentVariantName = t._variantName || null; currentVariantTabType = t._variantTabType || null; }

  const label = which === 'floor' ? (t.name || 'Floor Plans') : (t.name || 'Elevations');
  document.getElementById('ct-name').textContent = label;

  if (t.pdfDoc) {
    // Fit to screen same as initial load
    _natPageWidth = 0;
    const _wrap3 = document.getElementById('cwrap');
    const _pg1 = await t.pdfDoc.getPage(1);
    _natPageWidth = _pg1.getViewport({ scale: 1 }).width;
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    pdfScale = Math.floor((_wrap3.clientWidth - 42) / _natPageWidth * 100) / 100;
    await renderPages();
    _wrap3.scrollLeft = 0; _wrap3.scrollTop = 0;
    redraw();
    updateLegend();
  } else {
    // Empty tab — show message
    pdfPages = [];
    pdfCv.width = 10; pdfCv.height = 10;
    annCv.width = 10; annCv.height = 10;
    toast('No ' + label + ' available for this project');
  }
}

async function loadMergedTabs(floorBlob, elevBlob, baseName) {
  document.getElementById('dropzone').classList.add('gone');
  document.getElementById('cwrap').style.overflow = 'auto';
  document.getElementById('canvas-titlebar').style.display = 'flex';
  document.getElementById('page-strip').style.display = 'none';

  // Load floor tab
  if (floorBlob) {
    const url = URL.createObjectURL(floorBlob);
    TABS.floor.pdfDoc = await pdfjsLib.getDocument(url).promise;
    TABS.floor.pdfScale = 1; TABS.floor.pdfBlob = floorBlob;
    TABS.floor.name = baseName + ' — Floor Plans';
    TABS.floor.strokes = []; TABS.floor.icons = []; TABS.floor.redoStack = [];
    TABS.floor._dirty = true;
  }
  if (elevBlob) {
    const url2 = URL.createObjectURL(elevBlob);
    TABS.elev.pdfDoc = await pdfjsLib.getDocument(url2).promise;
    TABS.elev.pdfScale = 1; TABS.elev.pdfBlob = elevBlob;
    TABS.elev.name = baseName + ' — Elevations';
    TABS.elev.strokes = []; TABS.elev.icons = []; TABS.elev.redoStack = [];
    TABS.elev._dirty = true;
  }

  activeTab = null;
  await switchPlanTab('floor');
  showPlanTabs();
}

async function confirmUndoMerge() {
  const msg = 'Are you sure you want to undo the merge?\n\nThis will revert to your original unmerged PDF. Any icons or drawings you have added will be lost.';
  if (!confirm(msg)) return;
  undoMerge();
}

function undoMerge() {
  if (!confirm('Undo merge? This will close both merged plans and re-open the original PDF.')) return;
  // Clear both tabs
  activeTab = null;
  TABS.floor = { pdfDoc:null, pdfScale:1, pdfPages:[], strokes:[], icons:[], redoStack:[], pdfBlob:null, name:null, _dirty:false };
  TABS.elev  = { pdfDoc:null, pdfScale:1, pdfPages:[], strokes:[], icons:[], redoStack:[], pdfBlob:null, name:null, _dirty:false };
  _ewmDirty = false;
  document.getElementById('plan-tabs').style.display = 'none';
  document.getElementById('save-btns').style.display = 'none';
  document.getElementById('canvas-titlebar').style.display = 'none';
  document.getElementById('ccon').style.display = 'none'; document.getElementById('cwrap').style.overflow = 'hidden'; document.getElementById('cwrap').classList.remove('zoomed');
  if (!CP && !pdfDoc) document.getElementById('dropzone').classList.remove('gone');
  document.getElementById('pname').textContent = 'No project open';
  pdfDoc = null; strokes = []; icons = []; sel = null;
  if (annCtx) annCtx.clearRect(0, 0, annCv.width, annCv.height);
  toast('Merge undone — open your original PDF to start again');
}


// Close a specific tab with save prompt
async function closeTab(which) {
  const t = TABS[which];
  if (!t || !t.pdfDoc) { _doCloseReset(); return; }
  const label = which === 'floor' ? 'Floor Plans' : 'Elevations';

  // Sync active tab state so save functions operate on the right data
  if (activeTab !== which) { saveTabState(); activeTab = which; pdfDoc = t.pdfDoc; strokes = t.strokes||[]; icons = t.icons||[]; currentVariantId = t._variantId||null; currentVariantName = t._variantName||null; currentVariantTabType = t._variantTabType||null; }

  const hasChanges = icons.length > 0 || strokes.length > 0;
  const onBlank = isBlankVariant();

  if (hasChanges) {
    const choice = await _showCloseDialog(onBlank, currentVariantName || label);
    if (choice === 'cancel') return;
    if (choice === 'save') await saveCurrentVariant();
    else if (choice === 'saveas') await saveAsVariant();
    else if (choice === 'discard') {
      if (onBlank && currentVariantId) {
        await sb.from('markup_variants').update({ ewm_data: { strokes: [], icons: [] }, updated_at: new Date().toISOString() }).eq('id', currentVariantId);
      } else if (!onBlank && currentVariantId) {
        await sb.from('markup_variants').delete().eq('id', currentVariantId);
      }
    }
  }

  // Clear this tab
  TABS[which] = { pdfDoc:null, pdfScale:1, pdfPages:[], strokes:[], icons:[], redoStack:[], pdfBlob:null, name:null, _dirty:false };
  const other = which === 'floor' ? 'elev' : 'floor';

  if (TABS[other].pdfDoc) {
    activeTab = null;
    await switchPlanTab(other);
    document.getElementById('plan-tabs').style.display = 'none';
    document.getElementById('ct-close-btn').style.display = 'flex';
  } else {
    stopPresence(); dbDel('session');
    _doCloseReset();
  }
}
function showPlanTabs() {
  document.getElementById('plan-tabs').style.display = 'flex';
  document.getElementById('save-btns').style.display = 'flex';
  document.getElementById('ct-close-btn').style.display = 'flex';
  updateDirtyDots();
}

// Update dirty indicator dots on tab buttons
function updateDirtyDots() {
  const fd = document.getElementById('floor-dirty-dot');
  const ed = document.getElementById('elev-dirty-dot');
  if (fd) fd.style.display = TABS.floor._dirty ? 'inline' : 'none';
  if (ed) ed.style.display = TABS.elev._dirty  ? 'inline' : 'none';
}

// Close the currently active tab — if other tab still has content, switch to it
async function closeCurrentTab() {
  if (!activeTab) return;
  const which = activeTab;
  const t = TABS[which];
  const other = which === 'floor' ? 'elev' : 'floor';

  // Prompt if dirty
  if (t._dirty || _ewmDirty) {
    // Auto-save before closing tab
    if (CP) await saveToCloud();
    if (false) {  // kept for structure
      await saveEWM();
      if (t._dirty) return; // user cancelled file picker
    }
  }

  // Clear this tab's data
  TABS[which] = { pdfDoc:null, pdfScale:1, pdfPages:[], strokes:[], icons:[], redoStack:[], pdfBlob:null, name:null, _dirty:false };

  // If other tab still has a plan, switch to it standalone
  if (TABS[other].pdfDoc) {
    activeTab = null; // clear before switchPlanTab so it doesn't skip
    await switchPlanTab(other);
    document.getElementById('plan-tabs').style.display = 'none';
    document.getElementById('ct-close-btn').style.display = 'flex';
    document.getElementById('save-btns').style.display = 'flex';
    _ewmDirty = TABS[other]._dirty;
    updateDirtyDots();
  } else {
    // Both tabs empty — do a full clean close without re-entering closeCurrentTab
    activeTab = null; // MUST clear before closeProject or it loops
    _ewmDirty = false;
    // Directly execute the close sequence instead of calling closeProject()
    stopPresence(); dbDel('session');
    CP = null; pdfDoc = null; strokes = []; icons = []; sel = null; currentFileName = null;
  _lastLegendRows = 0;
  _prevLegendOffset = 0;
    TABS.floor = { pdfDoc:null, pdfScale:1, pdfPages:[], strokes:[], icons:[], redoStack:[], pdfBlob:null, name:null, _dirty:false };
    TABS.elev  = { pdfDoc:null, pdfScale:1, pdfPages:[], strokes:[], icons:[], redoStack:[], pdfBlob:null, name:null, _dirty:false };
    document.getElementById('save-btns').style.display = 'none';
    document.getElementById('plan-tabs').style.display = 'none';
    document.getElementById('page-strip').style.display = 'none';
    closeItb();
    document.getElementById('ccon').style.display = 'none'; document.getElementById('cwrap').style.overflow = 'hidden'; document.getElementById('cwrap').classList.remove('zoomed');
    if (!CP && !pdfDoc) document.getElementById('dropzone').classList.remove('gone');
    document.getElementById('pname').textContent = 'No project open';
    document.getElementById('canvas-titlebar').style.display = 'none';
    document.getElementById('presence-bar').style.display = 'none';
    if (annCtx) annCtx.clearRect(0, 0, annCv.width, annCv.height);
    toast('Project closed');
  }
}

async function saveCurrentTab() {
  // Works in both single-plan mode (activeTab=null) and dual-tab mode
  const doc = activeTab ? TABS[activeTab]?.pdfDoc : pdfDoc;
  if (!doc) { toast('No PDF loaded'); return; }

  if (activeTab) saveTabState();
  const t = activeTab ? TABS[activeTab] : null;
  const fname = (t?._variantName) || currentVariantName || CP?.job_type || currentFileName || 'plan';

  // Vector-quality export via pdf-lib — preserves original PDF vectors, icons as 4× PNG overlay
  showLoad('Saving PDF...');
  try {
    sel = null; closeItb(); redraw();
    await new Promise(r => setTimeout(r, 80));

    const _isIOS2 = /iPad|iPhone|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Open file picker FIRST before any awaits (preserves browser user-gesture context)
    // iOS uses share sheet instead — that also must be called after the file is ready,
    // but iOS Safari doesn't enforce gesture timeout the same way.
    let _saveHandle = null;
    if (!_isIOS2 && window.showSaveFilePicker) {
      try {
        _saveHandle = await window.showSaveFilePicker({ suggestedName: fname+'.pdf', types:[{description:'PDF',accept:{'application/pdf':['.pdf']}}] });
      } catch(e) {
        if (e.name === 'AbortError') { hideLoad(); return; }
        // Fall through
      }
    }

    const { PDFDocument } = window.PDFLib;
    if (!PDFDocument) { toast('❌ PDF library not loaded', true); hideLoad(); return; }
    const doc2 = activeTab ? TABS[activeTab]?.pdfDoc : pdfDoc;
    if (!doc2) { toast('\u274c No PDF document found', true); hideLoad(); return; }
    const srcBytes2 = await doc2.getData();
    if (!srcBytes2 || !srcBytes2.length) { toast('\u274c PDF data is empty', true); hideLoad(); return; }
    const pdfLibDoc2 = await PDFDocument.load(srcBytes2, { ignoreEncryption: true, throwOnInvalidObject: false });
    await _flattenRotatedPages(pdfLibDoc2, doc2);
    const numPages3 = pdfLibDoc2.getPageCount();
    const _expIcons   = (activeTab && TABS[activeTab]) ? (TABS[activeTab].icons   || icons)   : icons;
    const _expStrokes = (activeTab && TABS[activeTab]) ? (TABS[activeTab].strokes || strokes) : strokes;
    const _expPages   = (activeTab && TABS[activeTab]) ? (TABS[activeTab].pdfPages || pdfPages) : pdfPages;
    const _expScale   = (activeTab && TABS[activeTab]) ? (TABS[activeTab].pdfScale || renderScale) : renderScale;
    for (let pi3 = 0; pi3 < numPages3; pi3++) {
      await _renderAnnotLayer(pdfLibDoc2, pi3, _expIcons, _expStrokes, _expPages, _expScale, annCv);
    }
    const exportBytes2 = await pdfLibDoc2.save({ useObjectStreams: false });
    const blob = new Blob([exportBytes2], {type:'application/pdf'});
    if (t) t.pdfBlob = blob;

    // iOS: use Web Share API
    if (_isIOS2 && navigator.share) {
      try {
        const file = new File([blob], fname + '.pdf', { type: 'application/pdf' });
        await navigator.share({ files: [file], title: fname });
        toast('✅ Shared: ' + fname + '.pdf');
        hideLoad(); return;
      } catch(e) {
        if (e.name === 'AbortError') { hideLoad(); return; }
      }
    }

    // Desktop: write to already-opened file handle
    if (_saveHandle) {
      try {
        const w = await _saveHandle.createWritable(); await w.write(blob); await w.close();
        toast('✅ Saved: ' + fname + '.pdf');
        hideLoad(); return;
      } catch(e) { toast('❌ Save failed: ' + e.message, true); hideLoad(); return; }
    }

    // Fallback download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = fname + '.pdf';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    toast('✅ Downloaded: ' + fname + '.pdf');
  } catch(e) { const _em = e?.message || (typeof e==='string'?e:JSON.stringify(e))||'unknown'; toast('❌ Save failed: ' + _em, true); console.error('[saveCurrentTab]', e); }
  hideLoad();
}

function showMergeDownloads() {} // handled by tab system now

function downloadMergePdf(type) {
  const blob = type === 'floor' ? window._floorPdfBlob : window._elevPdfBlob;
  const name = type === 'floor' ? window._floorPdfName : window._elevPdfName;
  if (!blob) { toast('No ' + (type==='floor'?'floor':'elevation') + ' PDF available', true); return; }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name + '.pdf';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast('✅ Downloading ' + a.download);
}

// ═══════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════
function showLoad(m) { document.getElementById('load-msg').textContent=m; document.getElementById('loading').classList.remove('gone'); }
function hideLoad() { document.getElementById('loading').classList.add('gone'); }
// One-time clear of bloated localStorage icon cache — icons now live in Supabase only
(function() {
  try {
    localStorage.removeItem('elite_custom_icons');
    // Clear any elite_raw_ entries
    Object.keys(localStorage).filter(k => k.startsWith('elite_raw_')).forEach(k => localStorage.removeItem(k));
  } catch(e) {}
})();

function toast(m, err=false) {
  // On iPhone, skip non-error instruction messages (they block UI)
  if (window.innerWidth <= 767 && !err) return;
  const el=document.getElementById('toast'); el.textContent=m; el.classList.remove('gone');
  el.style.borderColor=err?'var(--red)':'var(--bdr2)';
  clearTimeout(el._t); el._t=setTimeout(()=>el.classList.add('gone'), 3500);
}

// Inline field validation helpers — show error inside the modal, highlight the field
function fieldErr(el, msg, errDivId) {
  if (el) { el.classList.add('field-err-border'); el.focus(); }
  const errDiv = document.getElementById(errDivId);
  if (errDiv) { errDiv.textContent = msg; errDiv.style.display = 'block'; }
}
function fieldErrClear(errDivId, ...els) {
  const errDiv = document.getElementById(errDivId);
  if (errDiv) { errDiv.textContent = ''; errDiv.style.display = 'none'; }
  els.forEach(el => { if (el) el.classList.remove('field-err-border'); });
}
// ══════════════════════════════════════════════════════════════════════════
// ADD PAGES TO PROJECT — mirrors Smart Merge UI/UX exactly
// ══════════════════════════════════════════════════════════════════════════
let _apPages = []; // [{pageNum, dataUrl, alreadyUsed, selected, type}]

function apTriggerLocalPdf() {
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'application/pdf';
  inp.style.display = 'none';
  document.body.appendChild(inp);
  inp.onchange = () => { apLoadLocalPdf(inp); document.body.removeChild(inp); };
  inp.click();
}

async function apLoadLocalPdf(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  input.value = '';
  showLoad('Loading PDF...');
  try {
    const url = URL.createObjectURL(file);
    const localDoc = await pdfjsLib.getDocument(url).promise;
    URL.revokeObjectURL(url);
    hideLoad();
    const isMobile = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    for (let i = 1; i <= localDoc.numPages; i++) {
      let dataUrl = '';
      if (!isMobile) {
        try {
          const page = await localDoc.getPage(i);
          const vp = page.getViewport({ scale: 0.25 });
          const cv = document.createElement('canvas');
          cv.width = vp.width; cv.height = vp.height;
          await page.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
          dataUrl = cv.toDataURL('image/jpeg', 0.85);
          cv.width = 1; cv.height = 1;
        } catch(e) {}
      }
      _apPages.push({ pageNum: i, dataUrl, alreadyUsed: false, selected: false, type: 'floor_electrical', _localDoc: localDoc, _isLocal: true });
    }
    // Only show pages from the newly loaded file — clear source PDF pages
    _apPages = _apPages.filter(p => p._isLocal);
    _apRenderGrid();
    document.getElementById('ap-step2').style.display = 'block';
    document.getElementById('ap-step3').style.display = 'none';
    document.getElementById('ap-status').innerHTML = localDoc.numPages + ' page' + (localDoc.numPages !== 1 ? 's' : '') + ' from ' + file.name + ' — select pages to add.';
    toast('✅ Loaded ' + localDoc.numPages + ' page' + (localDoc.numPages !== 1 ? 's' : '') + ' from ' + file.name);
  } catch(e) { hideLoad(); toast('Could not load PDF: ' + e.message, true); }
}

async function openAddPagesModal() {
  if (!CP || !CP.id) { toast('Open a cloud project first', true); return; }

  // Always use the original project source PDF, not the currently-loaded variant PDF.
  // CP.pdf_storage_path is the original file uploaded when the project was created.
  let srcDoc = window._apSourcePdfDoc;
  if (!srcDoc) {
    if (!CP.pdf_storage_path) { toast('No source PDF found for this project.', true); return; }
    showLoad('Loading source PDF...');
    try {
      const { data: blob, error: dlErr } = await sb.storage.from('plan-pdfs').download(CP.pdf_storage_path);
      if (dlErr || !blob) throw new Error(dlErr?.message || 'No source PDF found');
      srcDoc = await pdfjsLib.getDocument(URL.createObjectURL(blob)).promise;
      window._apSourcePdfDoc = srcDoc;
      console.log('[addPages] source PDF loaded from CP.pdf_storage_path, pages:', srcDoc.numPages);
    } catch(e) { hideLoad(); toast('Could not load source PDF: ' + e.message, true); return; }
    hideLoad();
  }

  console.log('[addPages] source PDF loaded, pages:', srcDoc.numPages);

  closeMenus();
  document.getElementById('add-pages-modal').classList.remove('gone');

  // Reset UI — source PDF pages are already in the project, don't show them.
  // User loads additional pages from a new PDF via the Load from PC button.
  _apPages = [];
  document.getElementById('ap-step2').style.display = 'none';
  document.getElementById('ap-step3').style.display = 'none';
  document.getElementById('ap-status').innerHTML = 'Click <strong style="color:#38bdf8;">+ Load PDF from PC</strong> above to select pages from another PDF to add to this project.';
  document.getElementById('ap-header-star').classList.remove('ai-loading');
  return;

  // Figure out how many pages are already in the project.
  // The blank variants (created by Smart Merge) each have exactly 1 page.
  // Any additional pages added later push that count up.
  // We use _apUsedPageNums if set (from this session's merge), otherwise
  // we check the blank variant PDF page count to infer how many source pages were used.
  let usedNums = window._apUsedPageNums || [];
  if (usedNums.length === 0 && CP.id) {
    try {
      const { data: vars } = await sb.from('markup_variants').select('pdf_storage_path, tab_type, name').eq('project_id', CP.id).ilike('name', 'Blank%').limit(1);
      if (vars && vars[0]?.pdf_storage_path) {
        const { data: vBlob } = await sb.storage.from('plan-pdfs').download(vars[0].pdf_storage_path);
        if (vBlob) {
          const vDoc = await pdfjsLib.getDocument(URL.createObjectURL(vBlob)).promise;
          // Each page in the variant = one source page that was merged
          // We don't know WHICH source pages, so we just treat pages 1..N as used
          const mergedCount = vDoc.numPages;
          usedNums = Array.from({ length: mergedCount }, (_, i) => i + 1);
          console.log('[addPages] inferred used pages from blank variant:', usedNums);
        }
      }
    } catch(e) { console.warn('[addPages] could not infer used pages:', e.message); }
  }
  _apPages = [];
  for (let i = 1; i <= srcDoc.numPages; i++) {
    if (usedNums.includes(i)) continue; // skip pages already in the project
    _apPages.push({ pageNum:i, dataUrl:'', alreadyUsed:false, selected:false, type:'floor_electrical' });
  }

  // Render thumbnails (same as buildMergerThumbs)
  const isMobile = /iPad|iPhone|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    _apRenderGrid();
    document.getElementById('ap-step2').style.display = 'block';
    document.getElementById('ap-status').innerHTML = 'Tap a page to select it.';
  } else {
    document.getElementById('ap-status').innerHTML = '<span style="color:var(--acc2)">Generating previews...</span>';
    for (let i = 0; i < _apPages.length; i++) {
      try {
        const page = await srcDoc.getPage(_apPages[i].pageNum);
        const vp = page.getViewport({ scale: 0.25 });
        const cv = document.createElement('canvas'); cv.width=vp.width; cv.height=vp.height;
        await page.render({ canvasContext:cv.getContext('2d'), viewport:vp }).promise;
        _apPages[i].dataUrl = cv.toDataURL('image/jpeg', 0.85);
        cv.width=1; cv.height=1;
      } catch(e) {}
    }
    _apRenderGrid();
    document.getElementById('ap-step2').style.display = 'block';
    const avail = _apPages.length;
    document.getElementById('ap-status').innerHTML = avail > 0
      ? avail + ' page' + (avail!==1?'s':'') + ' available to add. Click a thumbnail to preview, check the box to select.'
      : 'All pages from the original PDF are already in this project.';
  }
}

function _apRenderGrid() {
  const container = document.getElementById('ap-grid');
  // Same type colors/labels as renderMergerList
  const typeColors = { floor_electrical:'#22c55e', elevation_front:'#38bdf8', other:'#555', unknown:'#444' };
  const typeLabels = { floor_electrical:'&#128208; Layout', elevation_front:'&#127968; Elevation', other:'&#8212; Skip', unknown:'Not selected' };

  container.innerHTML = '';
  _apPages.forEach((pd, idx) => {
    const col = pd.selected ? (pd.type === 'elevation_front' ? '#38bdf8' : '#22c55e') : '#444';
    const lbl = pd.selected ? typeLabels[pd.type] : 'click to add';
    const sel = pd.selected;

    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:5px;flex-shrink:0;width:155px;';

    // Frame — same style as renderMergerList
    const frame = document.createElement('div');
    frame.style.cssText = [
      'position:relative;border-radius:7px;overflow:hidden;',
      'border:3px solid ' + (sel ? '#38bdf8' : '#1e2d45') + ';',
      'box-shadow:' + (sel ? '0 0 0 3px rgba(56,189,248,.35)' : 'none') + ';',
      'transition:border-color .12s,box-shadow .12s;'
    ].join('');

    // Thumbnail / placeholder
    if (pd.dataUrl) {
      const img = document.createElement('img');
      img.src = pd.dataUrl;
      img.style.cssText = 'width:149px;display:block;background:#fff;';
      frame.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.style.cssText = 'width:149px;height:100px;display:flex;align-items:center;justify-content:center;background:#1a2a3a;font-size:22px;font-weight:700;color:#38bdf8;font-family:DM Sans,sans-serif;';
      ph.textContent = 'Pg ' + pd.pageNum;
      frame.appendChild(ph);
    }

    // Checkmark badge — click to toggle
    const chk = document.createElement('div');
    chk.style.cssText = [
      'position:absolute;top:5px;right:5px;width:24px;height:24px;border-radius:6px;',
      'background:' + (sel ? '#38bdf8' : '#ffffff') + ';',
      'border:2px solid ' + (sel ? '#38bdf8' : '#999') + ';',
      'display:flex;align-items:center;justify-content:center;',
      'font-size:14px;color:#fff;font-weight:900;cursor:pointer;z-index:2;'
    ].join('');
    chk.textContent = sel ? '✓' : '';
    chk.addEventListener('click', e => {
      e.stopPropagation();
      if (!pd.selected) {
        _apShowTypePrompt(pd, () => _apRenderGrid());
      } else {
        pd.selected = false; _apRenderGrid(); _apUpdateStep3();
      }
    });
    frame.appendChild(chk);

    // Type badge bottom — same as Smart Merge
    const badge = document.createElement('div');
    badge.style.cssText = [
      'position:absolute;bottom:0;left:0;right:0;padding:4px 6px;',
      'background:' + col + ';font-size:9px;font-weight:700;color:#fff;text-align:center;'
    ].join('');
    badge.innerHTML = lbl;
    frame.appendChild(badge);

    // Click thumbnail = render at high res and open lightbox
    frame.style.cursor = 'zoom-in';
    frame.addEventListener('click', () => _apOpenHiResLightbox(pd.pageNum));

    // Label
    const labelEl = document.createElement('div');
    labelEl.style.cssText = 'font-size:10px;color:var(--txt2);text-align:center;line-height:1.3;width:149px;word-break:break-word;';
    labelEl.textContent = 'Page ' + pd.pageNum;

    // Type dropdown (same options as Smart Merge, only when selected)
    const typeSelect = document.createElement('select');
    typeSelect.style.cssText = 'width:149px;padding:3px 5px;font-size:10px;font-family:DM Sans,sans-serif;background:var(--surf2);border:1px solid var(--bdr2);border-radius:5px;color:var(--txt);cursor:pointer;margin-top:2px;';
    [['floor_electrical','&#128208; Layout'],['elevation_front','&#127968; Elevation']].forEach(([val,lbl]) => {
      const opt = document.createElement('option');
      opt.value = val; opt.innerHTML = lbl;
      if (pd.type === val) opt.selected = true;
      typeSelect.appendChild(opt);
    });
    typeSelect.addEventListener('change', e => { pd.type = e.target.value; _apRenderGrid(); });

    wrap.appendChild(frame);
    wrap.appendChild(labelEl);
    if (pd.selected) wrap.appendChild(typeSelect);
    container.appendChild(wrap);
  });

  _apUpdateStep3();
}

function _apShowTypePrompt(pd, cb) {
  // Same style as showMergeTypePrompt
  const m = document.createElement('div');
  m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:99999;display:flex;align-items:center;justify-content:center;';
  m.innerHTML = `<div style="background:var(--surf);border:1px solid var(--bdr2);border-radius:14px;padding:28px;max-width:340px;width:90%;display:flex;flex-direction:column;gap:12px;box-shadow:0 24px 80px rgba(0,0,0,.7);">
    <div style="font-size:15px;font-weight:700;color:var(--txt);">Page ${pd.pageNum} \u2014 Choose Category</div>
    <div style="font-size:12px;color:var(--txt3);">What type of drawing is this?</div>
    <button onclick="window._aptp('floor_electrical')" style="padding:14px;background:#22c55e22;border:2px solid #22c55e;border-radius:10px;color:#22c55e;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;">&#128208; Layout</button>
    <button onclick="window._aptp('elevation_front')" style="padding:14px;background:#38bdf822;border:2px solid #38bdf8;border-radius:10px;color:#38bdf8;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;">&#127968; Elevation</button>
    <button onclick="window._aptp(null)" style="padding:10px;background:transparent;border:1px solid var(--bdr2);border-radius:9px;color:var(--txt3);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;">\u2014 Cancel</button>
  </div>`;
  document.body.appendChild(m);
  window._aptp = type => {
    delete window._aptp; m.remove();
    if (type) { pd.type = type; pd.selected = true; }
    if (cb) cb();
  };
  m.addEventListener('click', e => { if(e.target===m){ delete window._aptp; m.remove(); if(cb)cb(); }});
}

function _apUpdateStep3() {
  const hasSelected = _apPages.some(p => p.selected);
  const s3 = document.getElementById('ap-step3');
  if (s3) s3.style.display = hasSelected ? 'block' : 'none';
  const btn = document.getElementById('ap-apply-btn');
  if (btn) { btn.disabled = !hasSelected; btn.style.opacity = hasSelected ? '1' : '.45'; btn.style.pointerEvents = hasSelected ? 'auto' : 'none'; }
}

async function _apOpenHiResLightbox(pageNum) {
  const srcDoc = window._apSourcePdfDoc;
  if (!srcDoc) return;

  // Show loading overlay immediately
  const existing = document.getElementById('merge-lb');
  if (existing) existing.remove();
  const lb = document.createElement('div');
  lb.id = 'merge-lb';
  lb.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.96);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;';
  lb.innerHTML = '<div style="font-size:12px;color:#aaa;font-family:DM Sans,sans-serif;">Page ' + pageNum + ' — rendering full resolution...</div>' +
    '<div style="width:40px;height:40px;border:3px solid rgba(255,255,255,.15);border-top-color:#38bdf8;border-radius:50%;animation:spin .7s linear infinite;"></div>' +
    '<div style="font-size:11px;color:rgba(255,255,255,.35);font-family:DM Sans,sans-serif;">Double-click or Esc to close</div>';
  document.body.appendChild(lb);

  // Render at 2× scale — crisp text, readable details
  try {
    const page = await srcDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const cv = document.createElement('canvas');
    cv.width = viewport.width;
    cv.height = viewport.height;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cv.width, cv.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    const dataUrl = cv.toDataURL('image/jpeg', 0.95);
    cv.width = 1; cv.height = 1; // free memory

    // Replace spinner with full-res image
    lb.innerHTML = '<div style="font-size:11px;color:rgba(255,255,255,.5);font-family:DM Sans,sans-serif;flex-shrink:0;">Page ' + pageNum + ' — double-click or Esc to close</div>';
    const img = document.createElement('img');
    img.src = dataUrl;
    img.style.cssText = 'max-width:94vw;max-height:90vh;object-fit:contain;border-radius:4px;box-shadow:0 20px 80px rgba(0,0,0,.8);';
    lb.appendChild(img);
  } catch(e) {
    lb.innerHTML = '<div style="color:var(--red);font-family:DM Sans,sans-serif;">Could not render page: ' + e.message + '</div>';
  }

  lb.addEventListener('dblclick', () => lb.remove());
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', esc); }
  });
}

let _apApplyInProgress = false;
async function applyAddPages() {
  if (_apApplyInProgress) { console.warn('[addPages] already in progress, ignoring duplicate call'); return; }
  _apApplyInProgress = true;
  try {
    await _applyAddPagesInner();
  } finally {
    _apApplyInProgress = false;
  }
}

async function _applyAddPagesInner() {
  const selected = _apPages.filter(p => p.selected);
  if (!selected.length) return;

  const btn = document.getElementById('ap-apply-btn');
  const statusEl = document.getElementById('ap-status');
  btn.disabled = true; btn.classList.add('ai-loading');
  document.getElementById('ap-header-star').classList.add('ai-loading');

  function setProgress(pct, msg) {
    statusEl.innerHTML =
      '<div style="font-size:12px;color:var(--acc2);margin-bottom:6px;">' + msg + '</div>' +
      '<div style="background:var(--bdr);border-radius:4px;height:6px;overflow:hidden;">' +
        '<div style="background:var(--acc);height:6px;width:' + pct + '%;transition:width .3s;border-radius:4px;"></div>' +
      '</div>' +
      '<div style="font-size:10px;color:var(--txt3);margin-top:4px;">' + Math.round(pct) + '% complete</div>';
  }
  function setErr(msg) {
    statusEl.innerHTML = '<span style="color:var(--red)">&#10007; ' + msg + '</span>';
    btn.disabled = false; btn.classList.remove('ai-loading');
    document.getElementById('ap-header-star').classList.remove('ai-loading');
  }

  const total = selected.length * 2 + 4;
  let step = 0;
  const tick = msg => { step++; setProgress(step / total * 100, msg); };

  try {
    const srcDoc = window._apSourcePdfDoc;
    if (!srcDoc) throw new Error('Source PDF not loaded');
    const apiKey = getApiKey();
    const { PDFDocument: PDFD } = window.PDFLib;
    const floorPages = selected.filter(p => p.type !== 'elevation_front');
    const elevPages  = selected.filter(p => p.type === 'elevation_front');

    // ── Render + AI crop a source page (same as Smart Merge) ──────────
    async function renderAndCrop(pageNum, _localDoc) {
      tick('Rendering page ' + pageNum + '...');
      const page = await (_localDoc || srcDoc).getPage(pageNum);
      const vp = page.getViewport({ scale: 6.0 });
      const cv = document.createElement('canvas');
      cv.width = vp.width; cv.height = vp.height;
      const ctx = cv.getContext('2d');
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cv.width, cv.height);
      await page.render({ canvasContext: ctx, viewport: vp }).promise;

      let cropBox = null;
      if (apiKey) {
        try {
          const th = document.createElement('canvas');
          const ts = Math.min(900 / cv.width, 1);
          th.width = Math.round(cv.width * ts); th.height = Math.round(cv.height * ts);
          th.getContext('2d').drawImage(cv, 0, 0, th.width, th.height);
          const b64 = th.toDataURL('image/jpeg', 0.8).split(',')[1];
          const resp = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
            body: JSON.stringify({ model: 'claude-sonnet-4-5-20250929', max_tokens: 120,
              messages: [{ role: 'user', content: [
                { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: b64 } },
                { type: 'text', text: 'Architectural sheet ' + th.width + 'x' + th.height + 'px. Find the bounding box that contains the main drawing area PLUS any legends, schedules, or notes belonging to it. Only exclude a clearly separate bordered title block / stamp box / revision table. If unsure where the title block boundary is, include MORE rather than less — never cut into the actual drawing. Use generous 4-5% padding. Reply ONLY with JSON {"x":N,"y":N,"w":N,"h":N} — nothing else.' }
              ]}] })
          });
          if (resp.ok) {
            const d = await resp.json();
            const txt = (d.content?.find(x => x.type === 'text')?.text) || '';
            const m = txt.match(/\{[^}]+\}/);
            if (m) {
              const box = JSON.parse(m[0]);
              const sx = cv.width / th.width, sy = cv.height / th.height;
              if (box.w > th.width * 0.6 && box.h > th.height * 0.6) {
                const px = Math.round(cv.width * .02), py = Math.round(cv.height * .02);
                cropBox = { x: Math.max(0, Math.round(box.x * sx) - px), y: Math.max(0, Math.round(box.y * sy) - py),
                  w: Math.min(cv.width, Math.round(box.w * sx) + px * 2), h: Math.min(cv.height, Math.round(box.h * sy) + py * 2) };
              }
            }
          }
        } catch(e) {}
      }
      if (!cropBox) cropBox = { x: Math.round(cv.width * .02), y: Math.round(cv.height * .02), w: Math.round(cv.width * .96), h: Math.round(cv.height * .96) };
      tick('Cropping page ' + pageNum + '...');
      const out = document.createElement('canvas');
      out.width = cropBox.w; out.height = cropBox.h;
      out.getContext('2d').drawImage(cv, cropBox.x, cropBox.y, cropBox.w, cropBox.h, 0, 0, cropBox.w, cropBox.h);
      return out;
    }

    // ── Render a PDF blob as a canvas (for reading existing variant pages) ──
    async function pdfBlobToCanvas(blob) {
      const url = URL.createObjectURL(blob);
      const doc = await pdfjsLib.getDocument(url).promise;
      URL.revokeObjectURL(url);
      // Get all pages as canvases
      const canvases = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const pg = await doc.getPage(i);
        const vp = pg.getViewport({ scale: 2.0 });
        const cv = document.createElement('canvas');
        cv.width = vp.width; cv.height = vp.height;
        const ctx = cv.getContext('2d');
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cv.width, cv.height);
        await pg.render({ canvasContext: ctx, viewport: vp }).promise;
        canvases.push(cv);
      }
      return canvases; // array of page canvases
    }

    // ── Assemble canvases side-by-side using Smart Merge layout ──────────
    function assembleSideBySide(canvasList) {
      const PAGE_W = 4800;
      const PAGE_H = Math.round(PAGE_W * (11 / 17));
      const GAP = 90, MARGIN = 100;
      const availW = PAGE_W - MARGIN * 2;
      const availH = PAGE_H - MARGIN * 2;
      const out = document.createElement('canvas');
      out.width = PAGE_W; out.height = PAGE_H;
      const ctx = out.getContext('2d');
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, PAGE_W, PAGE_H);

      // Scale all to same height then shrink to fit width (same as Smart Merge)
      let scales = canvasList.map(cv => availH / cv.height);
      let totalW = canvasList.reduce((s, cv, i) => s + cv.width * scales[i], 0) + GAP * (canvasList.length - 1);
      if (totalW > availW) {
        const shrink = availW / totalW;
        scales = scales.map(s => s * shrink);
        totalW = canvasList.reduce((s, cv, i) => s + cv.width * scales[i], 0) + GAP * (canvasList.length - 1);
      }
      let x = MARGIN + Math.round((availW - totalW) / 2);
      canvasList.forEach((cv, i) => {
        const dw = Math.round(cv.width * scales[i]);
        const dh = Math.round(cv.height * scales[i]);
        const y = MARGIN + Math.round((availH - dh) / 2);
        ctx.drawImage(cv, x, y, dw, dh);
        x += dw + GAP;
      });
      return out;
    }

    // ── Same layout for elevations (2-column grid) ────────────────────────
    function assembleElevGrid(canvasList) {
      const PAGE_W = 4800;
      const PAGE_H = Math.round(PAGE_W * (11 / 17));
      const E_COLS = canvasList.length === 1 ? 1 : 2;
      const E_GAP = 20, E_MARGIN = 30;
      const cellW = E_COLS === 1 ? (PAGE_W - E_MARGIN * 2) : Math.floor((PAGE_W - E_MARGIN * 2 - E_GAP) / E_COLS);
      const out = document.createElement('canvas');
      out.width = PAGE_W; out.height = PAGE_H;
      const ctx = out.getContext('2d');
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, PAGE_W, PAGE_H);
      let curY = E_MARGIN;
      for (let row = 0; row < Math.ceil(canvasList.length / E_COLS); row++) {
        const rowCvs = canvasList.slice(row * E_COLS, row * E_COLS + E_COLS);
        const rowH = Math.max(...rowCvs.map(cv => Math.round(cv.height * (cellW / cv.width))));
        rowCvs.forEach((cv, col) => {
          const dw = cellW, dh = Math.round(cv.height * (cellW / cv.width));
          ctx.drawImage(cv, E_MARGIN + col * (cellW + E_GAP), curY + Math.round((rowH - dh) / 2), dw, dh);
        });
        curY += rowH + E_GAP;
      }
      return out;
    }

    // ── Canvas → single-page PDF blob (JPEG, same as Smart Merge) ────────
    async function canvasToNewPdf(cv) {
      const doc = await PDFD.create();
      // Canvas rendered at 6x — divide by 6 for PDF points, else export canvas blows up
      const pgW = cv.width / 6;
      const pgH = cv.height / 6;
      const pg = doc.addPage([pgW, pgH]);
      const jpegUrl = cv.toDataURL('image/jpeg', 0.93);
      if (!jpegUrl || jpegUrl === 'data:,') throw new Error('Canvas toDataURL failed — may be too large');
      const jpegBuf = await fetch(jpegUrl).then(r => r.arrayBuffer());
      const img = await doc.embedJpg(jpegBuf);
      pg.drawImage(img, { x: 0, y: 0, width: pgW, height: pgH });
      const bytes = await doc.save({ useObjectStreams: false });
      return new Blob([bytes], { type: 'application/pdf' });
    }

    // ── Render the new source pages ───────────────────────────────────────
    const newFloorCanvases = [];
    for (const pd of floorPages) newFloorCanvases.push(await renderAndCrop(pd.pageNum, pd._localDoc));
    const newElevCanvases = [];
    for (const pd of elevPages)  newElevCanvases.push(await renderAndCrop(pd.pageNum, pd._localDoc));

    // ── Load all variants ─────────────────────────────────────────────────
    tick('Loading saved plans...');
    const { data: variants, error: varErr } = await sb.from('markup_variants').select('*').eq('project_id', CP.id);
    console.log('[addPages] variants:', variants?.map(v => v.name + ' (' + v.tab_type + ')'));

    // ALWAYS append new pages to the BASE project PDF first, so base thumbnails
    // always reflect the addition — regardless of whether variants exist.
    tick('Adding pages to base project PDF...');
    {
      const allNewCanvases = [...newFloorCanvases, ...newElevCanvases];
      if (!allNewCanvases.length) throw new Error('No pages rendered');
      if (!CP.pdf_storage_path) throw new Error('No base PDF found for this project.');

      const { data: baseBlob, error: baseErr } = await sb.storage.from('plan-pdfs').download(CP.pdf_storage_path);
      if (baseErr || !baseBlob) throw new Error('Could not load base PDF: ' + (baseErr?.message || ''));

      const newDoc = await PDFD.create();
      const baseBytes = await baseBlob.arrayBuffer();
      const basePdfDoc = await PDFD.load(baseBytes);
      const _baseIndices = basePdfDoc.getPageIndices();
      console.log('[addPages] base PDF currently has', _baseIndices.length, 'page(s) before append');
      const copiedPages = await newDoc.copyPages(basePdfDoc, _baseIndices);
      copiedPages.forEach(p => newDoc.addPage(p));
      // Match new page dimensions (PDF points) to the existing page's size —
      // canvases are in pixels (rendered at 6x scale) and must be scaled down to points.
      const _refPage = copiedPages[0];
      const _refW = _refPage ? _refPage.getWidth()  : 792;
      const _refH = _refPage ? _refPage.getHeight() : 612;
      for (const cv of allNewCanvases) {
        const jpegUrl = cv.toDataURL('image/jpeg', 0.93);
        const jpegBuf = await fetch(jpegUrl).then(r => r.arrayBuffer());
        const img = await newDoc.embedJpg(jpegBuf);
        // Fit the new page into the same page size as the existing pages,
        // preserving aspect ratio and centering.
        const cvAspect = cv.width / cv.height;
        const refAspect = _refW / _refH;
        let drawW, drawH, offX, offY;
        if (cvAspect > refAspect) { drawW = _refW; drawH = _refW / cvAspect; offX = 0; offY = (_refH - drawH) / 2; }
        else { drawH = _refH; drawW = _refH * cvAspect; offY = 0; offX = (_refW - drawW) / 2; }
        const pg = newDoc.addPage([_refW, _refH]);
        pg.drawRectangle({ x: 0, y: 0, width: _refW, height: _refH, color: window.PDFLib.rgb(1,1,1) });
        pg.drawImage(img, { x: offX, y: offY, width: drawW, height: drawH });
      }
      console.log('[addPages] new combined PDF will have', newDoc.getPageCount(), 'page(s) total');
      const bytes = await newDoc.save();
      const newBlob = new Blob([bytes], { type: 'application/pdf' });
      const newPath = CP.id + '/source-' + Date.now() + '.pdf';
      const { error: upErr } = await sb.storage.from('plan-pdfs').upload(newPath, newBlob, { upsert: false });
      if (upErr) throw new Error('Upload failed: ' + upErr.message);
      const { error: dbErr } = await sb.from('markup_projects').update({ pdf_storage_path: newPath }).eq('id', CP.id);
      if (dbErr) throw new Error('Could not update project: ' + dbErr.message);
      CP.pdf_storage_path = newPath;
      window._apSourcePdfDoc = null;
      window._apUsedPageNums = [];
      if (window.allProjects) {
        const _ci = window.allProjects.findIndex(p => p.id === CP.id);
        if (_ci >= 0) window.allProjects[_ci].pdf_storage_path = newPath;
      }
      console.log('[addPages] base project PDF updated:', newPath, 'total pages:', newDoc.getPageCount());
    }

    // If no variants exist, we're done — reload base view and exit.
    if (varErr || !variants?.length) {
      const allNewCanvases = [...newFloorCanvases, ...newElevCanvases];
      setProgress(100, '&#10003; Added ' + allNewCanvases.length + ' page' + (allNewCanvases.length !== 1 ? 's' : '') + ' to base project.');
      toast('✅ Added to base project PDF');
      const { data: reloadBlob } = await sb.storage.from('plan-pdfs').download(CP.pdf_storage_path);
      setTimeout(async () => {
        closeModal('add-pages-modal');
        if (reloadBlob) { await loadPDF(reloadBlob); } // loadPDF already calls autoOpenStrip -> buildPageStrip
      }, 1500);
      return;
    }

    const _ts = Date.now();
    let updated = 0;

    for (const v of variants) {
      const isElev = v.tab_type === 'elev';
      const newCanvases = isElev ? newElevCanvases : newFloorCanvases;
      if (!newCanvases.length || !v.pdf_storage_path) {
        console.log('[addPages] skip', v.name, '— no new canvases for type or no path');
        continue;
      }

      tick('Rebuilding "' + v.name + '"...');

      // Download existing variant PDF and render all its pages as canvases
      console.log('[addPages] downloading', v.pdf_storage_path);
      const { data: existingBlob, error: dlErr } = await sb.storage.from('plan-pdfs').download(v.pdf_storage_path);
      if (dlErr || !existingBlob) { console.warn('[addPages] download failed:', dlErr?.message); continue; }
      console.log('[addPages] existing size:', existingBlob.size);

      let existingCanvases;
      try {
        existingCanvases = await pdfBlobToCanvas(existingBlob);
        console.log('[addPages] existing has', existingCanvases.length, 'page(s)');
      } catch(e) {
        console.warn('[addPages] could not render existing PDF:', e.message);
        existingCanvases = [];
      }

      // Build new PDF: copy existing pages, then append each new canvas as a new page
      let newPdfBlob;
      try {
        const newDoc = await PDFD.create();
        // Copy existing pages from the variant PDF
        const existingBytes = await existingBlob.arrayBuffer();
        const existingPdfDoc = await PDFD.load(existingBytes);
        const _vIndices = existingPdfDoc.getPageIndices();
        console.log('[addPages]', v.name, 'currently has', _vIndices.length, 'page(s) before append');
        const copiedPages = await newDoc.copyPages(existingPdfDoc, _vIndices);
        copiedPages.forEach(p => newDoc.addPage(p));
        // Match new page size (PDF points) to the existing page's dimensions
        const _vRefPage = copiedPages[0];
        const _vRefW = _vRefPage ? _vRefPage.getWidth()  : 792;
        const _vRefH = _vRefPage ? _vRefPage.getHeight() : 612;
        for (const cv of newCanvases) {
          const jpegUrl = cv.toDataURL('image/jpeg', 0.93);
          const jpegBuf = await fetch(jpegUrl).then(r => r.arrayBuffer());
          const img = await newDoc.embedJpg(jpegBuf);
          const cvAspect = cv.width / cv.height;
          const refAspect = _vRefW / _vRefH;
          let drawW, drawH, offX, offY;
          if (cvAspect > refAspect) { drawW = _vRefW; drawH = _vRefW / cvAspect; offX = 0; offY = (_vRefH - drawH) / 2; }
          else { drawH = _vRefH; drawW = _vRefH * cvAspect; offY = 0; offX = (_vRefW - drawW) / 2; }
          const pg = newDoc.addPage([_vRefW, _vRefH]);
          pg.drawRectangle({ x: 0, y: 0, width: _vRefW, height: _vRefH, color: window.PDFLib.rgb(1,1,1) });
          pg.drawImage(img, { x: offX, y: offY, width: drawW, height: drawH });
        }
        const bytes = await newDoc.save();
        newPdfBlob = new Blob([bytes], { type: 'application/pdf' });
        console.log('[addPages] new PDF size:', newPdfBlob.size, 'pages:', newDoc.getPageCount());
      } catch(e) {
        setErr('PDF build failed for "' + v.name + '": ' + e.message);
        return;
      }

      // Upload to new timestamped path
      const folder = v.pdf_storage_path.substring(0, v.pdf_storage_path.lastIndexOf('/'));
      const newPath = folder + '/' + (isElev ? 'elevation' : 'layout') + '-ap-' + _ts + '-' + updated + '.pdf';
      console.log('[addPages] uploading to:', newPath);
      const { error: upErr } = await sb.storage.from('plan-pdfs').upload(newPath, newPdfBlob, { upsert: true });
      if (upErr) { setErr('Upload failed for "' + v.name + '": ' + upErr.message); return; }

      // Update variant record. Page geometry just changed (pages appended/resized),
      // so any cover-brush erase marks stored in ewm_data would now point at stale
      // pixel coordinates that don't correspond to anything on the new page —
      // strip those out automatically. Pen/text/icon annotations are left intact
      // since those are still meaningful even if their exact position shifts slightly.
      let _newEwm = v.ewm_data;
      if (_newEwm && Array.isArray(_newEwm.strokes)) {
        const _hadCover = _newEwm.strokes.some(s => s.type === 'whitebox' || s.type === 'coverpath');
        if (_hadCover) {
          _newEwm = { ..._newEwm, strokes: _newEwm.strokes.filter(s => s.type !== 'whitebox' && s.type !== 'coverpath') };
          console.log('[addPages] stripped stale cover-brush strokes from', v.name, '(page geometry changed)');
        }
      }
      const { error: dbErr } = await sb.from('markup_variants').update({
        pdf_storage_path: newPath,
        ewm_data: _newEwm,
        updated_at: new Date().toISOString()
      }).eq('id', v.id);
      if (dbErr) { console.error('[addPages] db update failed:', dbErr.message); continue; }
      console.log('[addPages] ✓ updated', v.name, '→', newPath);
      updated++;
    }

    // Mark pages as used
    const newNums = selected.map(p => p.pageNum);
    window._apUsedPageNums = [...(window._apUsedPageNums || []), ...newNums];

    setProgress(100, '&#10003; Done! Rebuilt ' + updated + ' plan' + (updated !== 1 ? 's' : '') + ' with ' + selected.length + ' new page' + (selected.length !== 1 ? 's' : '') + ' merged in. Base project PDF also updated.');
    toast('✅ Added ' + selected.length + ' page' + (selected.length !== 1 ? 's' : '') + ' to ' + updated + ' plans + base project');
    setTimeout(() => closeModal('add-pages-modal'), 1800);

    // Auto-reload: if a variant tab is active, reload it; otherwise reload base project view
    if (activeTab && TABS[activeTab]?._variantId) {
      const v = (variants || []).find(x => x.id === TABS[activeTab]._variantId);
      if (v) setTimeout(() => openVariant(v.id), 2200);
    } else {
      const { data: reloadBlob2 } = await sb.storage.from('plan-pdfs').download(CP.pdf_storage_path);
      if (reloadBlob2) setTimeout(async () => { await loadPDF(reloadBlob2); }, 2200); // loadPDF already rebuilds strip
    }

  } catch(e) {
    statusEl.innerHTML = '<span style="color:var(--red)">&#10007; ' + e.message + '</span>';
    console.error('[addPages]', e);
    toast('Add pages failed: ' + e.message, true);
  }
  btn.disabled = false; btn.classList.remove('ai-loading');
  document.getElementById('ap-header-star').classList.remove('ai-loading');
}


