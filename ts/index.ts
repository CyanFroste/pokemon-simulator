import { Pokemon } from "./lib/Pokemon.js";
import { NATURES } from "./lib/Nature.js";
import { TYPES } from "./lib/Type.js";
import { MOVES } from "./lib/Move.js";

const { adamant, modest } = NATURES;
const { flamethrower } = MOVES;
const { dragon, ground, fire } = TYPES;

//
let garchomp = new Pokemon(
	"garchomp",
	[dragon, ground],
	adamant,
	[flamethrower],
	{
		hp: 108,
		attack: 130,
		defense: 95,
		spAtk: 80,
		spDef: 85,
		speed: 102,
	},
	{
		hp: 31,
		attack: 31,
		defense: 31,
		spAtk: 31,
		spDef: 31,
		speed: 31,
	},
	{
		hp: 4,
		attack: 252,
		defense: 0,
		spAtk: 0,
		spDef: 0,
		speed: 252,
	}
);

let reshiram = new Pokemon(
	"reshiram",
	[dragon, fire],
	modest,
	[flamethrower],
	{
		hp: 100,
		attack: 120,
		defense: 100,
		spAtk: 150,
		spDef: 120,
		speed: 90,
	},
	{
		hp: 31,
		attack: 31,
		defense: 31,
		spAtk: 31,
		spDef: 31,
		speed: 31,
	},
	{
		hp: 4,
		attack: 0,
		defense: 0,
		spAtk: 252,
		spDef: 252,
		speed: 0,
	}
);

garchomp.levelUp(99);
garchomp.use("flamethrower", reshiram);
// console.log(garchomp.move('flamethrower'));
