import { STAT } from "./Globals.js";
export class Pokemon {
    // private status: object[] = [];
    constructor(
    // private gender: string,
    name, types, nature, moves, baseStats, IVs, // IV values range from 0 - 31
    EVs // total EV value of a pokemon can only be 510, one stat can have only 252 EV
    // private ability: object
    ) {
        this.name = name;
        this.types = types;
        this.nature = nature;
        this.moves = moves;
        this.baseStats = baseStats;
        this.IVs = IVs;
        this.EVs = EVs;
        this.level = 0;
        this.stats = {
            hp: 0,
            attack: 0,
            defense: 0,
            spAtk: 0,
            spDef: 0,
            speed: 0,
        };
        this.battleStats = {
            // Ingeniously shit method to deep copy object
            fainted: false,
            stats: JSON.parse(JSON.stringify(this.stats)),
            moves: JSON.parse(JSON.stringify(this.moves)),
        };
        // level up the pokemon one time when the pokemon object is created
        this.levelUp(1);
    }
    // method to set battle related stats
    setBattleStats(stats, moves, fainted) {
        if (stats)
            this.battleStats.stats = stats;
        if (fainted)
            this.battleStats.fainted = fainted;
        if (moves)
            this.battleStats.moves = moves;
    }
    // shows the details of the pokemon
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
    // method to use a move
    use(move, target) {
        // check if the pokemon has that move in its movelist
        let chosenMove = this.moves.find((_move) => _move.name === move);
        // if the pokemon don't have that move
        if (!chosenMove)
            return;
        // else call the effect method of the chosen move
        chosenMove.effect(this, target);
    }
    // method to level up a pokemon
    // stat changes depend on Pokemon's level, base stats, EVs and IVs
    levelUp(n) {
        this.level += n;
        // begin calculation of stats
        for (const key in STAT) {
            const stat = STAT[key];
            if (stat === "hp") {
                this.stats.hp = Math.floor(((2 * this.baseStats.hp + this.IVs.hp + this.EVs.hp / 4) *
                    this.level) /
                    100 +
                    this.level +
                    10);
            }
            else {
                this.stats[stat] = Math.floor((((2 * this.baseStats[stat] +
                    this.IVs[stat] +
                    this.EVs[stat] / 4) *
                    this.level) /
                    100 +
                    5) *
                    this.nature.getModifier(stat));
            }
        }
        // end calculation of stats
        this.battleStats.stats = JSON.parse(JSON.stringify(this.stats));
    }
}
