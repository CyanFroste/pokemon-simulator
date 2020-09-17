import { STAT } from "./Globals.js";
export class Pokemon {
    constructor(
    // private gender: string,
    name, types, nature, _moves, baseStats, IVs, EVs // private ability: object
    ) {
        this.name = name;
        this.types = types;
        this.nature = nature;
        this._moves = _moves;
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
        this.battleStats = [];
        this.status = [];
        this.details = {
            name: this.name,
            nature: this.nature.getName(),
            types: this.types,
            level: this.level,
            stats: this.stats,
            baseStats: this.baseStats,
            IVs: this.IVs,
            EVs: this.EVs,
        };
        this.levelUp(1);
    }
    use(move, target) {
        let chosenMove = this._moves.find((_move) => _move.name === move);
        // if the pokemon don't have that move
        if (!chosenMove)
            return;
        chosenMove.effect(this, target);
    }
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
    }
}
