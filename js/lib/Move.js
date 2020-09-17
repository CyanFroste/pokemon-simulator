import { TYPE } from "./Globals.js";
const { FIRE } = TYPE;
export class Move {
    constructor(name, type, category, power, accuracy, PP) {
        this.name = name;
        this.type = type;
        this.category = category;
        this.power = power;
        this.accuracy = accuracy;
        this.PP = PP;
    }
    STAB(source) {
        for (const type of source.details.types) {
            if (type.name === this.type)
                return 1.5;
        }
        return 1;
    }
    typeModifier(target) {
        let modifiers = 0;
        for (const type of target.details.types) {
            modifiers += type.getModifier(this.type);
        }
        return modifiers;
    }
    effect(source, target) {
        let targets = 1, weather = 1, critical = 1, random = Math.floor(Math.random() * (1 - 0.85 + 1) + 0.85), STAB = this.STAB(source), type = this.typeModifier(target), burn = 1, other = 1;
        let damageModifier = weather * critical * random * STAB * type * burn * other;
        let damage = Math.floor(((((2 * source.details.level) / 5 + 2) *
            this.power *
            (source.details.stats.attack / target.details.stats.defense)) /
            50 +
            2) *
            damageModifier);
        console.log(damage);
    }
}
export const MOVES = {
    flamethrower: new Move("flamethrower", FIRE, "special", 90, 100, 15),
};
