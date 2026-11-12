// Little pixel-art animals for the garden. Each one is drawn on a 16×16 grid,
// facing left. Every letter is a color from that animal's palette; "." is empty.
// To make an animal recolourable, list its letters in PARTS below.

type Sprite = { palette: Record<string, string>; rows: string[] };

const K = '#2b2b33'; // outline / eyes

export const SPRITES: Record<string, Sprite> = {
  bunny: {
    palette: { k: '#55556a', w: '#f4f4f6', g: '#d9d9e2', p: '#f2a7bb', e: K },
    rows: [
      '................',
      '...kk.kk........',
      '..kwpkwpk.......',
      '..kwpkwpk.......',
      '..kwpkwpk.......',
      '..kwwkwwk.......',
      '.kwwwwwwwk......',
      'kwewwwwwwk......',
      'kwwwwwwwwwkkkk..',
      'kpwwwwwwwwwwwwk.',
      '.kkwwwwwwwwwwgkk',
      '...kwwwwwwwwwkwk',
      '...kwwwwwwwwgk..',
      '...kgwkkkkwgk...',
      '...kkk....kkk...',
      '................',
    ],
  },
  squirrel: {
    palette: { k: '#5a3418', o: '#c8692c', l: '#e59a52', c: '#f3d2a2', e: K },
    rows: [
      '..........kkkk..',
      '.........kolllk.',
      '..kk....koollllk',
      '.kok....kolkkllk',
      'kooook..kolk.klk',
      'koeook..kolk.kk.',
      'kooccok.kollk...',
      '.kocccokkoollk..',
      '..kcccooookolk..',
      '..kccooooooolk..',
      '..kcckooooolk...',
      '...kcckooook....',
      '...kooooook.....',
      '..kkkookkkk.....',
      '................',
      '................',
    ],
  },
  hedgehog: {
    palette: { k: '#3a2a20', s: '#6d4c35', d: '#4b3324', t: '#e3bf8f', e: K, n: '#2b2b33' },
    rows: [
      '................',
      '................',
      '................',
      '.......k.k.k....',
      '.....kskdkskdk..',
      '....ksdsdsdsdsk.',
      '...ksdsdsdsdsdsk',
      '..ktksdsdsdsdsdk',
      '.ktetksdsdsdsdsk',
      'nttttksdsdsdsdsk',
      '.kttttkdsdsdsdk.',
      '..ktttttkkkkkk..',
      '...kkkkkk..kk...',
      '................',
      '................',
      '................',
    ],
  },
  fox: {
    palette: { k: '#4a220f', o: '#e2702a', w: '#fbf3e8', b: '#3a2a22', e: K },
    rows: [
      '................',
      '.k..k.......kk..',
      'kok.kok....kwwk.',
      'koookook..kowwk.',
      'koeooook.koook..',
      'kwwooooookoook..',
      '.kwwooooooook...',
      '..kwoooooooook..',
      '..kwwooooooook..',
      '...kwoooooook...',
      '...kbkkkkkkbk...',
      '...kbk....kbk...',
      '...kk.....kk....',
      '................',
      '................',
      '................',
    ],
  },
  owl: {
    palette: { k: '#3d2918', b: '#8a5a33', l: '#c49461', w: '#fff5dc', y: '#f5c242', e: K, o: '#e08a2b' },
    rows: [
      '................',
      '...kk......kk...',
      '...kbk....kbk...',
      '...kbbkkkkbbk...',
      '..kbwwwbbwwwbk..',
      '..kwyekbbkeywk..',
      '..kwyykookyywk..',
      '..kbwwwkkwwwbk..',
      '.kbbbllllllbbbk.',
      '.kbbllblbllbbbk.',
      '.kbbllllllllbbk.',
      '.kbbblblblbbbbk.',
      '..kbbllllllbbk..',
      '...kbbbbbbbbk...',
      '....kokkkkok....',
      '................',
    ],
  },
  deer: {
    palette: { k: '#3f2615', b: '#a9693a', l: '#d9a774', w: '#fbf0e0', a: '#7a5a3a', e: K },
    rows: [
      '.a..a...........',
      '.aa.a.a.........',
      '..aaaa..........',
      '...ab...........',
      '..kbbk..........',
      '.kbebbk.........',
      'kbbbbbk.........',
      'klbbbbk.........',
      '.kkbbbk.........',
      '...kbbbkkkkkkk..',
      '...kbbwbbbwbbbkk',
      '...kbbbbbbbbbbkw',
      '...kbbbbbbbbbbk.',
      '...kbkkbkkkbkbk.',
      '...kbk.bk..kbkbk',
      '...kk..kk..kk.kk',
    ],
  },
  turtle: {
    palette: { k: '#25402a', g: '#4d8f4f', d: '#2f6b3b', s: '#8dbf5a', y: '#c8a95a', e: K },
    rows: [
      '................',
      '................',
      '................',
      '................',
      '.......kkkkk....',
      '.....kkdgdgdkk..',
      '....kdgdgdgdgdk.',
      '.kk.kgdgdgdgdgdk',
      'kssk.kdgdgdgdgdk',
      'kesskyyyyyyyyyyk',
      'kssssssssssssk..',
      '.kkksskkkksskk..',
      '....kk.....kk...',
      '................',
      '................',
      '................',
    ],
  },
  butterfly: {
    palette: { k: '#2b2b33', o: '#f08a24', y: '#ffd166', p: '#8e5bd1', w: '#ffffff' },
    rows: [
      '................',
      '......k..k......',
      '.kkkk..kk..kkkk.',
      'kooook.kk.kooook',
      'koyyokkkkkkoyyok',
      'koyyookkkkooyyok',
      'kooooookkooooook',
      '.koooookkoooook.',
      '..kkkkkkkkkkkk..',
      '..kpppkkkkpppk..',
      '.kpwppkkkkppwpk.',
      '.kppppk..kppppk.',
      '..kkkk....kkkk..',
      '................',
      '................',
      '................',
    ],
  },
  raccoon: {
    palette: { k: '#2a2a2e', g: '#8c8c96', l: '#c9c9d2', w: '#f4f4f6', m: '#3b3b44', e: '#ffffff' },
    rows: [
      '................',
      '..kk..kk........',
      '.kgk.kgk........',
      '.kggkggk........',
      'kwwwwwwwk.......',
      'kmmemmmmk.......',
      'kwmmmwwgk.......',
      '.kwwwggggk..kkk.',
      '..kkggggggkkmglk',
      '...kggggggggkmgk',
      '...kgggggggggkmk',
      '...kggggggggk.kk',
      '...kgkkgkkkgk...',
      '...kk..kk..kk...',
      '................',
      '................',
    ],
  },
  bear: {
    palette: { k: '#2e1d12', b: '#7a4a2a', l: '#b98557', e: K },
    rows: [
      '................',
      '................',
      '..kk..kk........',
      '.kblkkblk.......',
      '.kbbbbbbk.......',
      'kbbebbbbbk......',
      'llbbbbbbbkkkkk..',
      'klllbbbbbbbbbbk.',
      '.kkkbbbbbbbbbbbk',
      '...kbbbbbbbbbbbk',
      '...kbbbbbbbbbbbk',
      '...kbbbbbbbbbbbk',
      '...kbbkkbbkkbbk.',
      '...kbbk.kk..kbbk',
      '...kkkk.....kkkk',
      '................',
    ],
  },
  peacock: {
    palette: { k: '#1d2b40', b: '#2a6fd6', t: '#1fa59a', g: '#3e9a4e', y: '#f2c94c', p: '#6a3fb5', e: '#ffffff' },
    rows: [
      '.......gggg.....',
      '.....ggtttggg...',
      '....gtyptypttg..',
      '...gtyypyypyttg.',
      '.k.gtpyptpypttg.',
      'kbk.gtttttttttg.',
      'kebk.ggtyptyptg.',
      'yb.k..gtyyptyg..',
      '.kbk...gttttg...',
      '.kbbk..ggggg....',
      '.kbbbkkk........',
      '..kbbbbbk.......',
      '...kbbbbk.......',
      '....kkkk........',
      '....k..k........',
      '...kk.kk........',
    ],
  },
  unicorn: {
    palette: { k: '#4a4a5c', w: '#fbfbff', g: '#e2e2ee', y: '#f5c242', r: '#ff6b8b', o: '#ffb347', b: '#6ec3ff', p: '#b38bff', e: K },
    rows: [
      'y...............',
      '.y..............',
      '..yrk...........',
      '..kwrok.........',
      '.kwwwobk........',
      'kwewwwbpk.......',
      'kwwwwwwpk.......',
      'kgwkwwwwk.......',
      '.kk.kwwwkkkkkk..',
      '....kwwwwwwwwwkr',
      '....kwwwwwwwwwro',
      '....kgwwwwwwwgob',
      '....kwkkwkkkwkbp',
      '....kwk.wk.kwk..',
      '....kgk.gk.kgk..',
      '....kkk.kk.kkk..',
    ],
  },
  dragon: {
    palette: { k: '#1f3a24', g: '#4caf50', d: '#2e7d32', y: '#f6e27a', w: '#a5d6a7', r: '#e53935', e: K },
    rows: [
      '.......kk.......',
      '......kwwk..kk..',
      '.....kwwwwk.kwk.',
      '....kwwwwwwkwwk.',
      '.kk.kkwwwwwwwwk.',
      'kggk..kkwwwwwk..',
      'kegdk...kkkkk...',
      'rggggk.kk.......',
      '.kkggkkggk......',
      '...kgggyggkkkk..',
      '...kggyygggggdk.',
      '...kgggyggggkkdk',
      '....kggggggk..kk',
      '....kdk..kdk....',
      '....kk....kk....',
      '................',
    ],
  },
  zebra: {
    palette: { k: '#2b2b33', w: '#fbfbfb', s: '#2b2b33', n: '#6b6b75', e: K },
    rows: [
      '................',
      '..k.k...........',
      '.kwkwk..........',
      '.kwwwsk.........',
      'kwewwssk........',
      'kwwwwwssk.......',
      'knwswwwssk......',
      'knnkwswwsk......',
      '.kk.kwswwskkkkk.',
      '....kwswswswswsk',
      '....kswswswswswk',
      '....kwswswswswks',
      '....kwkkskkkwkk.',
      '....kwk.sk..kwk.',
      '....ksk.sk..ksk.',
      '....kkk.kk..kkk.',
    ],
  },
  lion: {
    palette: { k: '#4a2a10', o: '#e8a845', m: '#b5561c', l: '#f6d892', n: '#5a2e14', e: K },
    rows: [
      '................',
      '...mmmmm........',
      '..mmmmmmm.......',
      '.mmmoooomm......',
      '.mmoeooomm......',
      'mmooooooomm.....',
      'mmnlooooomm.....',
      'mmllllloomm.....',
      '.mmlllloommkkkk.',
      '..mmmmmmkoooooko',
      '....kooooooooomk',
      '....koooooooook.',
      '....koooooooook.',
      '....kokkokkkok..',
      '....kok.ok.kok..',
      '....kkk.kk.kkk..',
    ],
  },
  elephant: {
    palette: { k: '#3e4250', g: '#9aa1b3', d: '#7b8295', w: '#fffdf5', p: '#e8b7c4', e: K },
    rows: [
      '................',
      '................',
      '...kkkkk........',
      '..kgggggkkkk....',
      '.kggggkdpdk.....',
      'kgegggkdppdkkkk.',
      'kgggggkddddggggk',
      'kwgggggkkdgggggk',
      'kgwggggggggggggg',
      'kgkgggggggggggkd',
      'kgkgggggggggggk.',
      'kgk.kgggggggggk.',
      'kk..kggkggkkggk.',
      '....kggkggk.kggk',
      '....kddkddk.kddk',
      '....kkkkkkk.kkkk',
    ],
  },
  giraffe: {
    palette: { k: '#5a3a12', y: '#f2c14e', b: '#b4652a', n: '#e8d8b0', e: K },
    rows: [
      '.k.k............',
      '.kbk............',
      'kyyyk...........',
      'kyeyyk..........',
      'knyyyk..........',
      '.kkyybk.........',
      '...kybk.........',
      '...kbyk.........',
      '...kybyk........',
      '...kyybykkkkkk..',
      '...kybyybyybyyk.',
      '...kyyybyybyybkb',
      '...kybyyybyyyk..',
      '...kyk.kyk.kyk..',
      '...kyk.kyk.kyk..',
      '...kbk.kbk.kbk..',
    ],
  },
  panda: {
    palette: { k: '#22222a', w: '#f7f7f7', b: '#22222a', e: '#ffffff', p: '#f2a7bb' },
    rows: [
      '................',
      '................',
      '..bb...bb.......',
      '..bbwwwbb.......',
      '.kwwwwwwwk......',
      'kwbbwwbbwk......',
      'kwbewwebwk......',
      'kwwwwbwwwk......',
      '.kwwpwwwkbbbbb..',
      '..kkkkkbbwwwwwk.',
      '....kbbbwwwwwwwk',
      '....kbbbwwwwwwwk',
      '....kbbwwwwwwbbk',
      '....kbbkkkkkkbbk',
      '....kbbk....kbbk',
      '....kkkk....kkkk',
    ],
  },
  penguin: {
    palette: { k: '#1e2230', b: '#2a3045', w: '#fbfbfb', y: '#f5a623', e: '#ffffff' },
    rows: [
      '................',
      '.....kkkk.......',
      '....kbbbbk......',
      '...kbebbbbk.....',
      '..yybbbbbbk.....',
      '...kwbbbbbbk....',
      '...kwwbbbbbk....',
      '..kwwwwbbbbbk...',
      '..kwwwwwbbbbbk..',
      '..kwwwwwbbbbbk..',
      '..kwwwwwbbbbbk..',
      '..kwwwwwbbbbk...',
      '...kwwwwbbbk....',
      '....kkkkkkk.....',
      '....yy..yy......',
      '................',
    ],
  },
  frog: {
    palette: { k: '#1f4a24', g: '#5cc05c', l: '#a6e39a', w: '#ffffff', r: '#e05a6a', e: K },
    rows: [
      '................',
      '................',
      '................',
      '................',
      '..kkk...kkk.....',
      '.kwewk.kwewk....',
      '.kwwwkkkwwwk....',
      'kggggggggggggk..',
      'kgrrrrrrrrrrgk..',
      'kggggggggggggk..',
      '.kgglllllllggk..',
      'kgggllllllgggk..',
      'kgkkgggggggkkgk.',
      'kgk.kkkkkkk.kgk.',
      'kkk.........kkk.',
      '................',
    ],
  },
  capybara: {
    palette: { k: '#4a3020', b: '#a7754c', d: '#8a5e3a', n: '#5a3a24', o: '#f28c28', g: '#5aa44a', e: K },
    rows: [
      '................',
      '....go..........',
      '...kggk.........',
      '...kkkk.........',
      '..kbbkbk........',
      '.kbbbbbbk.......',
      'kbebbbbbbkkkkkk.',
      'kbbbbbbbbbbbbbbk',
      'nbbbbbbbbbbbbbbk',
      'knbbbbbbbbbbbbbk',
      '.kkbbbbbbbbbbbbk',
      '...kbbbbbbbbbbdk',
      '...kbbbbbbbbbbdk',
      '...kdkkkkkkkkdk.',
      '...kdk......kdk.',
      '...kkk......kkk.',
    ],
  },
  sloth: {
    palette: { k: '#4a3a2a', b: '#a08466', l: '#e6d2b5', m: '#3a2a1e', t: '#6d4c2f', g: '#4f9a4a', e: K },
    rows: [
      'tttttttttttttttt',
      '.bk.....kb......',
      '.bbk...kbb......',
      '..kbbbbbbk......',
      '..kbbbbbbbk.....',
      '.kbbbbbbbbbk....',
      '.kbbllllllbbk...',
      '.kblmmlmmllbk...',
      '.kblemlmelbbk...',
      '.kblllmlllbk....',
      '.kbllllllbbk....',
      '..kbbbbbbbk.....',
      '..kbbbbbbbk.....',
      '...kbbbbbk......',
      '....kkkkk.......',
      '................',
    ],
  },
  flamingo: {
    palette: { k: '#7a2a40', p: '#f48fb1', d: '#e05a8a', w: '#ffffff', b: '#2b2b33', e: K },
    rows: [
      '...kkk..........',
      '..kpppk.........',
      '..kepkk.........',
      '.bbkpk..........',
      '.b..kpk.........',
      '.....kpk........',
      '.....kpk........',
      '....kppkkkkk....',
      '....kpppppdpk...',
      '....kppdppddpkk.',
      '.....kppppppppdk',
      '......kkkkkkkkk.',
      '.........kk.....',
      '.........kk.....',
      '.........kk.....',
      '........kkk.....',
    ],
  },
  goose: {
    palette: { k: '#3a3a42', w: '#fbfbfb', g: '#d6d6de', o: '#f39c2a', e: K },
    rows: [
      '................',
      '....kkk.........',
      '...kwwwk........',
      '..okewwk........',
      'ooowwwwk........',
      '...kwwk.........',
      '...kwwk.........',
      '...kwwk.........',
      '...kwwwkkkkkk...',
      '..kwwwwwwwwggkk.',
      '..kwwwwwwwgggwk.',
      '..kwwwwwwwwwwk..',
      '...kwwwwwwwwk...',
      '....kkkkkkkk....',
      '.....oo..oo.....',
      '....ooo.ooo.....',
    ],
  },
  llama: {
    palette: { k: '#5a4a3a', c: '#f1e3c8', d: '#d6c09a', n: '#8a7a6a', e: K },
    rows: [
      '..k.k...........',
      '..kckck.........',
      '..kccck.........',
      '.kcecck.........',
      'knccccck........',
      '.kkcccck........',
      '...kccck........',
      '...kccck........',
      '...kccckkkkkk...',
      '...kccccccccck..',
      '...kcdcdcdcdcck.',
      '...kccccccccccdk',
      '...kccccccccck..',
      '...kck.kck.kck..',
      '...kck.kck.kck..',
      '...kkk.kkk.kkk..',
    ],
  },
  axolotl: {
    palette: { k: '#a0405a', p: '#ffb3c8', r: '#ff6b8b', l: '#ffd6e2', e: K },
    rows: [
      '................',
      '................',
      '................',
      '.rr.....rr......',
      '..rkkkkkr.......',
      '.rkpppppkr......',
      'rkpeppppepk.....',
      '.kpppppppkr.....',
      '.kpplllppkkkkkk.',
      '..kkkppppppppppp',
      '....kpllllllpppk',
      '....kpkkkkkpkppk',
      '....kk....kk.kk.',
      '................',
      '................',
      '................',
    ],
  },
  pig: {
    palette: { k: '#9a4a5a', p: '#ffb6c1', d: '#f08aa0', e: K },
    rows: [
      '................',
      '................',
      '................',
      '..kk..kk........',
      '.kdk.kdk........',
      '.kpkkkpk........',
      'kpeppppkkkkkkk..',
      'kppppppppppppkd.',
      'ddpppppppppppkdk',
      'kddppppppppppk..',
      '.kkppppppppppk..',
      '...kppppppppppk.',
      '...kpkkpkkkpkpk.',
      '...kdk.dk..kdkd.',
      '...kkk.kk..kkkk.',
      '................',
    ],
  },
  cat: {
    palette: { k: '#3a2a20', o: '#f0a050', w: '#fff3e3', s: '#c26a24', g: '#6bbf59', e: K },
    rows: [
      '................',
      '................',
      '.k...k..........',
      '.kok.kok........',
      '.koookook.......',
      '.kogoogok.......',
      '.kooowooook.....',
      '..kwwwwwok......',
      '...kkokkkkkkk.k.',
      '....koosoosook.k',
      '....koooooooook.',
      '....koosoososok.',
      '....koooooooook.',
      '....kokkokkkokk.',
      '....kwk.wk..kwk.',
      '....kkk.kk..kkk.',
    ],
  },
  crocodile: {
    palette: { k: '#1f3d24', g: '#4a8f3c', d: '#2f6b2a', w: '#ffffff', y: '#d8e07a', e: K },
    rows: [
      '................',
      '................',
      '................',
      '................',
      '................',
      '.......kk.kk.kk.',
      '..kk..kdkkdkkdk.',
      'kkekkkgggggggggk',
      'kggggggggggggggg',
      'kwkwkwgggggggddd',
      'kgggggyyyyyyyggk',
      '.kkkkkgkkkkkgkdk',
      '.....kgk...kgk.k',
      '.....kkk...kkk..',
      '................',
      '................',
    ],
  },
  monkey: {
    palette: { k: '#3a2414', b: '#8a5a33', l: '#e6c39a', e: K },
    rows: [
      '................',
      '...kkkk.........',
      '..kbbbbk........',
      '.kblllbbk.......',
      'kblelelbk.......',
      'kbllllllbk......',
      '.kllkllbk.......',
      '..kllllbk.......',
      '...kkkbbkkkk....',
      '....kbbbbbbbk...',
      '...kbllllbbbbk..',
      '...kbllllbbbbk.k',
      '...kbbbbbbbbk.kk',
      '...kbkkbkkkbk.k.',
      '...kbk.bk.kbkk..',
      '...kkk.kk.kkk...',
    ],
  },
};

/** The parts of each animal you can recolour, with a plain name for each.
 *  Outlines (k) and eyes (e) always keep their colour, so every animal still looks like itself. */
export const PARTS: Record<string, Record<string, string>> = {
  'bunny': {
    'w': 'Fur',
    'g': 'Shading',
    'p': 'Ears and nose'
  },
  'squirrel': {
    'o': 'Fur',
    'l': 'Tail',
    'c': 'Belly'
  },
  'hedgehog': {
    's': 'Spikes',
    'd': 'Dark spikes',
    't': 'Face and belly'
  },
  'fox': {
    'o': 'Fur',
    'w': 'Chest and tail tip',
    'b': 'Paws'
  },
  'owl': {
    'b': 'Feathers',
    'l': 'Chest',
    'w': 'Face',
    'y': 'Eyes',
    'o': 'Beak and feet'
  },
  'deer': {
    'b': 'Fur',
    'l': 'Nose',
    'w': 'Spots',
    'a': 'Antlers'
  },
  'turtle': {
    'g': 'Shell',
    'd': 'Shell pattern',
    's': 'Skin',
    'y': 'Shell rim'
  },
  'butterfly': {
    'o': 'Top wings',
    'y': 'Wing spots',
    'p': 'Bottom wings',
    'w': 'Small spots'
  },
  'raccoon': {
    'g': 'Fur',
    'l': 'Tail light',
    'w': 'Face',
    'm': 'Mask and tail rings'
  },
  'bear': {
    'b': 'Fur',
    'l': 'Snout and ears'
  },
  'peacock': {
    'b': 'Body',
    't': 'Tail',
    'g': 'Tail edge',
    'y': 'Eye spots',
    'p': 'Eye centres'
  },
  'unicorn': {
    'w': 'Coat',
    'g': 'Shading',
    'y': 'Horn',
    'r': 'Mane 1',
    'o': 'Mane 2',
    'b': 'Mane 3',
    'p': 'Mane 4'
  },
  'dragon': {
    'g': 'Scales',
    'd': 'Dark scales',
    'y': 'Belly',
    'w': 'Wings',
    'r': 'Fire'
  },
  'zebra': {
    'w': 'Coat',
    's': 'Stripes and mane',
    'n': 'Nose'
  },
  'lion': {
    'o': 'Fur',
    'm': 'Mane',
    'l': 'Muzzle',
    'n': 'Nose'
  },
  'elephant': {
    'g': 'Skin',
    'd': 'Shading',
    'w': 'Tusk',
    'p': 'Inner ear'
  },
  'giraffe': {
    'y': 'Coat',
    'b': 'Spots',
    'n': 'Nose'
  },
  'panda': {
    'w': 'White fur',
    'b': 'Black fur',
    'p': 'Nose'
  },
  'penguin': {
    'b': 'Back',
    'w': 'Front',
    'y': 'Beak and feet'
  },
  'frog': {
    'g': 'Skin',
    'l': 'Belly',
    'w': 'Eyes',
    'r': 'Smile'
  },
  'capybara': {
    'b': 'Fur',
    'd': 'Shading',
    'n': 'Nose',
    'g': 'Hat leaves',
    'o': 'Hat orange'
  },
  'sloth': {
    'b': 'Fur',
    'l': 'Face',
    'm': 'Eye mask',
    't': 'Branch'
  },
  'flamingo': {
    'p': 'Feathers',
    'd': 'Wing',
    'b': 'Beak'
  },
  'goose': {
    'w': 'Feathers',
    'g': 'Wing',
    'o': 'Beak and feet'
  },
  'llama': {
    'c': 'Wool',
    'd': 'Saddle stripes',
    'n': 'Nose'
  },
  'axolotl': {
    'p': 'Skin',
    'l': 'Belly',
    'r': 'Frills'
  },
  'pig': {
    'p': 'Skin',
    'd': 'Snout and ears'
  },
  'cat': {
    'o': 'Fur',
    's': 'Stripes',
    'w': 'Chest and paws',
    'g': 'Eyes'
  },
  'crocodile': {
    'g': 'Scales',
    'd': 'Back ridges',
    'y': 'Belly',
    'w': 'Teeth'
  },
  'monkey': {
    'b': 'Fur',
    'l': 'Face and belly'
  }
};

export type Colors = Record<string, string>; // part letter → colour, like { s: '#ff00aa' }
export type AllColors = Record<string, Colors>; // animal → its colours

const HEX = /^#[0-9a-f]{6}$/i;
/** Only keep colours for parts that exist and can be changed. */
export function cleanColors(name: string, colors?: Colors): Colors {
  const parts = PARTS[name] ?? {};
  const out: Colors = {};
  for (const [k, v] of Object.entries(colors ?? {})) if (parts[k] && HEX.test(v)) out[k] = v.toLowerCase();
  return out;
}

/** An animal as crisp pixel-art SVG. `px` is the size of one pixel. `colors` recolours its parts. */
export function spriteSvg(name: string, px = 2.5, label = name, colors?: Colors) {
  const s = SPRITES[name];
  if (!s) return '';
  const palette = { ...s.palette, ...cleanColors(name, colors) };
  const rects: string[] = [];
  s.rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      let run = 1;
      while (x + run < row.length && row[x + run] === c) run++;
      const color = palette[c];
      if (color) rects.push(`<rect x="${x}" y="${y}" width="${run}" height="1" fill="${color}"/>`);
      x += run;
    }
  });
  const size = 16 * px;
  const safe = label.replace(/[&<>"]/g, '');
  return `<svg class="sprite" viewBox="0 0 16 16" width="${size}" height="${size}" shape-rendering="crispEdges" role="img" aria-label="${safe}"><title>${safe}</title>${rects.join('')}</svg>`;
}
