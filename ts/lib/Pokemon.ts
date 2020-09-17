import { Nature } from "./Nature.js";
import { STAT, TYPE } from "./Globals.js";
import { Type, TYPES } from "./Type.js";
import { Move } from "./Move.js";

export interface stats {
	hp: number;
	attack: number;
	defense: number;
	spAtk: number;
	spDef: number;
	speed: number;
}

export class Pokemon {
	private level: number = 0;
	private stats: stats = {
		hp: 0,
		attack: 0,
		defense: 0,
		spAtk: 0,
		spDef: 0,
		speed: 0,
	};
	private battleStats: object[] = [];
	private status: object[] = [];

	readonly details = {
		name: this.name,
		nature: this.nature.getName(),
		types: this.types,
		level: this.level,
		stats: this.stats,
		baseStats: this.baseStats,
		IVs: this.IVs,
		EVs: this.EVs,
	};

	constructor(
		// private gender: string,
		private name: string,
		private types: Type[],
		private nature: Nature,
		private _moves: Move[],
		private baseStats: stats,
		private IVs: stats,
		private EVs: stats // private ability: object
	) {
		this.levelUp(1);
	}

	use(move: string, target: Pokemon) {
		let chosenMove = this._moves.find((_move) => _move.name === move);
		// if the pokemon don't have that move
		if (!chosenMove) return;
		chosenMove.effect(this, target);
	}

	levelUp(n: number) {
		this.level += n;
		// begin calculation of stats
		for (const key in STAT) {
			const stat = STAT[key as keyof typeof STAT];
			if (stat === "hp") {
				this.stats.hp = Math.floor(
					((2 * this.baseStats.hp + this.IVs.hp + this.EVs.hp / 4) *
						this.level) /
						100 +
						this.level +
						10
				);
			} else {
				this.stats[stat as keyof stats] = Math.floor(
					(((2 * this.baseStats[stat as keyof stats] +
						this.IVs[stat as keyof stats] +
						this.EVs[stat as keyof stats] / 4) *
						this.level) /
						100 +
						5) *
						this.nature.getModifier(stat)
				);
			}
		}
		// end calculation of stats
	}
}
