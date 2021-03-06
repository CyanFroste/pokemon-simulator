import { TYPE } from "./Globals.js";
const { FIRE, DRAGON, GROUND, DARK } = TYPE;
export class Move {
    constructor(name, type, category, power, accuracy, PP) {
        this.name = name;
        this.type = type;
        this.category = category;
        this.power = power;
        this.accuracy = accuracy;
        this.PP = PP;
    }
    // method to calculate Same type attack bonus - STAB
    STAB(source) {
        for (const type of source.details().types) {
            if (type.name === this.type)
                return 1.5;
        }
        return 1;
    }
    // method to calculate effectiveness of this move against the target pokemon
    typeModifier(target) {
        let modifiers = 1;
        for (const type of target.details().types) {
            modifiers *= type.getModifier(this.type);
        }
        return modifiers;
    }
    // method to check if a move hits or not
    accuracyCheck() {
        let random = Math.floor(Math.random() * 100 + 1);
        if (random <= this.accuracy)
            return true;
        return false;
    }
    // the effect of the move
    effect(source, target) {
        let targets = 1, weather = 1, critical = 1, random = parseFloat(((Math.random() * (100 - 85 + 1) + 85) / 100).toFixed(2)), STAB = this.STAB(source), type = this.typeModifier(target), burn = 1, other = 1;
        // calculate dmg modifier
        let damageModifier = targets * weather * critical * random * STAB * type * burn * other;
        // check which attack stat to use based on move's category
        // attack and defense, if the move's category is physical, special attack and special defense, if the category is special
        let A = source.details().stats.attack;
        let D = target.details().stats.defense;
        if (this.category === "special") {
            A = source.details().stats.spAtk;
            D = target.details().stats.spDef;
        }
        // calculate actual damage
        let damage = this.accuracyCheck()
            ? Math.floor(((((2 * source.details().level) / 5 + 2) * this.power * (A / D)) /
                50 +
                2) *
                damageModifier)
            : 0;
        // console.log(damageModifier, damage);
        // reduce the HP from the battle stats of the target pokemon
        let _stats = target.details().battleStats.stats;
        if (_stats.hp < damage)
            damage = _stats.hp;
        _stats.hp -= damage;
        // reduce PP after using the move from the source pokemon
        let _moves = source.details().battleStats.moves;
        _moves.forEach((move) => {
            if (move.name === this.name)
                move.PP -= 1;
        });
        source.setBattleStats(undefined, _moves, true);
        target.setBattleStats(_stats, undefined, false);
    }
}
export const MOVES = {
    flamethrower: new Move("flamethrower", FIRE, "special", 90, 100, 15),
    dragonRush: new Move("dragon rush", DRAGON, "physical", 100, 75, 10),
    earthquake: new Move("earthquake", GROUND, "physical", 100, 100, 10),
    crunch: new Move("crunch", DARK, "physical", 80, 100, 15),
    dragonPulse: new Move("dragon pulse", DRAGON, "special", 85, 100, 10),
    blueFlare: new Move("blue flare", FIRE, "special", 130, 85, 5),
    fusionFlare: new Move("fusion flare", FIRE, "special", 100, 100, 5),
};
