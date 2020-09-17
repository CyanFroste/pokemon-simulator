import { TYPE } from "./Globals.js";
import { Pokemon } from "./Pokemon.js";
import { Type } from "./Type.js";
const { FIRE } = TYPE;

type category = "special" | "physical" | "status";

export class Move {
	constructor(
		readonly name: string,
		readonly type: string,
		readonly category: category,
		readonly power: number | null,
		readonly accuracy: number,
		readonly PP: number
	) {}

	STAB(source: Pokemon) {
		for (const type of source.details.types) {
			if (type.name === this.type) return 1.5;
		}
		return 1;
	}

	typeModifier(target: Pokemon) {
		let modifiers = 0;
		for (const type of target.details.types) {
			modifiers += type.getModifier(this.type);
		}
		return modifiers;
	}

	effect(source: Pokemon, target: Pokemon) {
		let targets = 1,
			weather = 1,
			critical = 1,
			random = Math.floor(Math.random() * (1 - 0.85 + 1) + 0.85),
			STAB = this.STAB(source),
			type = this.typeModifier(target),
			burn = 1,
			other = 1;

		let damageModifier =
			weather * critical * random * STAB * type * burn * other;

		let damage = Math.floor(
			((((2 * source.details.level) / 5 + 2) *
				this.power! *
				(source.details.stats.attack / target.details.stats.defense)) /
				50 +
				2) *
				damageModifier
		);

		console.log(damage);
	}
}

export const MOVES = {
	flamethrower: new Move("flamethrower", FIRE, "special", 90, 100, 15),
};
