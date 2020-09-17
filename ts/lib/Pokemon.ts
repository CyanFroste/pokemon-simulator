import { Nature } from "./Nature.js";
import { STAT, TYPE } from "./Globals.js";
import { Type, TYPES } from "./Type.js";
import { Move } from "./Move.js";

interface Stats {
	hp: number;
	attack: number;
	defense: number;
	spAtk: number;
	spDef: number;
	speed: number;
}

interface BattleStats {
	fainted: boolean;
	stats: Stats;
	moves: Move[];
}

export class Pokemon {
	private level: number = 0;
	private stats: Stats = {
		hp: 0,
		attack: 0,
		defense: 0,
		spAtk: 0,
		spDef: 0,
		speed: 0,
	};
	private battleStats: BattleStats;
	private status: object[] = [];

	constructor(
		// private gender: string,
		private name: string,
		private types: Type[],
		private nature: Nature,
		private moves: Move[],
		private baseStats: Stats,
		private IVs: Stats,
		private EVs: Stats // private ability: object
	) {
		this.battleStats = {
			// Ingeniously shit method to deep copy object
			fainted: false,
			stats: JSON.parse(JSON.stringify(this.stats)),
			moves: JSON.parse(JSON.stringify(this.moves)),
		};
		this.levelUp(1);
	}

	setBattleStats(stats?: Stats, moves?: Move[], fainted?: boolean) {
		if (stats) this.battleStats.stats = stats;
		if (fainted) this.battleStats.fainted = fainted;
		if (moves) this.battleStats.moves = moves;
	}

	details() {
		return {
			name: this.name,
			nature: this.nature.name,
			types: this.types,
			moves: this.moves,
			level: this.level,
			stats: this.stats,
			baseStats: this.baseStats,
			battleStats: this.battleStats,
			IVs: this.IVs,
			EVs: this.EVs,
		};
	}

	use(move: string, target: Pokemon) {
		let chosenMove = this.moves.find((_move) => _move.name === move);
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
				this.stats[stat as keyof Stats] = Math.floor(
					(((2 * this.baseStats[stat as keyof Stats] +
						this.IVs[stat as keyof Stats] +
						this.EVs[stat as keyof Stats] / 4) *
						this.level) /
						100 +
						5) *
						this.nature.getModifier(stat)
				);
			}
		}
		// end calculation of stats
		this.battleStats.stats = JSON.parse(JSON.stringify(this.stats));
	}
}

