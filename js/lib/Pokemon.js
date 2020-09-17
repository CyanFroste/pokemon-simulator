import { STAT } from "./Globals.js";
export class Pokemon {
    constructor(
    // private gender: string,
    name, types, nature, moves, baseStats, IVs, EVs // private ability: object
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
        this.status = [];
        this.battleStats = {
            // Ingeniously shit method to deep copy object
            fainted: false,
            stats: JSON.parse(JSON.stringify(this.stats)),
            moves: JSON.parse(JSON.stringify(this.moves)),
        };
        this.levelUp(1);
    }
    setBattleStats(stats, moves, fainted) {
        if (stats)
            this.battleStats.stats = stats;
        if (fainted)
            this.battleStats.fainted = fainted;
        if (moves)
            this.battleStats.moves = moves;
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
    use(move, target) {
        let chosenMove = this.moves.find((_move) => _move.name === move);
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
        this.battleStats.stats = JSON.parse(JSON.stringify(this.stats));
    }
}
