import { STAT } from "./Globals.js";
const { HP, ATK, DEF, SP_ATK, SP_DEF, SPD } = STAT;

export class Nature {
	constructor(
		readonly name: string,
		readonly incStat: string | null,
		readonly decStat: string | null
	) {}
	getModifier(stat: string) {
		if (stat === null) return 1;
		else if (stat === this.incStat) return 1.1;
		else if (stat === this.decStat) return 0.9;
		else return 1;
	}
	getName() {
		return this.name;
	}
}

export const NATURES = {
	hardy: new Nature("hardy", null, null),
	lonely: new Nature("lonely", ATK, DEF),
	brave: new Nature("brave", ATK, SPD),
	adamant: new Nature("adamant", ATK, SP_ATK),
	naughty: new Nature("naughty", ATK, SP_DEF),
	bold: new Nature("bold", DEF, ATK),
	docile: new Nature("docile", null, null),
	relaxed: new Nature("relaxed", DEF, SPD),
	impish: new Nature("impish", DEF, SP_ATK),
	lax: new Nature("lax", DEF, SP_DEF),
	timid: new Nature("timid", SPD, ATK),
	hasty: new Nature("hasty", SPD, DEF),
	serious: new Nature("serious", null, null),
	jolly: new Nature("jolly", SPD, SP_ATK),
	naive: new Nature("naive", SPD, SP_DEF),
	modest: new Nature("modest", SP_ATK, ATK),
	mild: new Nature("mild", SP_ATK, DEF),
	quiet: new Nature("quiet", SP_ATK, SPD),
	bashful: new Nature("bashful", null, null),
	rash: new Nature("rash", SP_ATK, SP_DEF),
	calm: new Nature("calm", SP_DEF, ATK),
	gentle: new Nature("gentle", SP_DEF, DEF),
	sassy: new Nature("sassy", SP_DEF, SPD),
	careful: new Nature("careful", SP_DEF, SP_ATK),
	quirky: new Nature("quirky", null, null),
};
