import { Pokemon } from "./lib/Pokemon.js";
import { NATURES } from "./lib/Nature.js";
import { TYPES } from "./lib/Type.js";
import { MOVES } from "./lib/Move.js";

const { adamant, modest } = NATURES;
const {
	flamethrower,
	dragonRush,
	earthquake,
	crunch,
	dragonPulse,
	blueFlare,
	fusionFlare,
} = MOVES;
const { dragon, ground, fire } = TYPES;

//
let garchomp = new Pokemon(
	"garchomp",
	[dragon, ground],
	adamant,
	[flamethrower, dragonRush, crunch, earthquake],
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
	[flamethrower, fusionFlare, blueFlare, dragonPulse],
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
reshiram.levelUp(99);

class ProgressBar {
	constructor(private progressbar: HTMLElement, private totalHP: number) {
		progressbar.setAttribute("aria-valuenow", "100");
	}
	update(currentHP: number) {
		const percentage = Math.floor((currentHP / this.totalHP) * 100).toString();
		console.log(percentage, this.totalHP);
		this.progressbar.setAttribute("aria-valuenow", percentage);
		this.progressbar.style.width = percentage + "%";
		this.progressbar.innerHTML = percentage + "%";
	}
}

(function setUpPokemonOne(pokemonOne: Pokemon, pokemonTwo: Pokemon) {
	const PTHPProgress = document.querySelector(
		".pokemon-two-hp-progress .progress-bar"
	);
	const PTHPProgressbar = new ProgressBar(
		PTHPProgress as HTMLElement,
		reshiram.details().stats.hp
	);

	// Pokemon One
	document.querySelector(
		".pokemon-one-name"
	)!.innerHTML = pokemonOne.details().name.toUpperCase();
	const POneTypes = pokemonOne.details().types;
	document.querySelector(
		".pokemon-one-types .type-one"
	)!.innerHTML = POneTypes[0].name.toUpperCase();
	document.querySelector(".pokemon-one-types .type-two")!.innerHTML =
		POneTypes[1].name.toUpperCase() || "";

	document.querySelector(
		".pokemon-one-hp .current-hp"
	)!.innerHTML = pokemonOne.details().battleStats.stats.hp.toString();
	document.querySelector(
		".pokemon-one-hp .total-hp"
	)!.innerHTML = pokemonOne.details().stats.hp.toString();

	document.querySelector(
		".pokemon-one-battle-attack"
	)!.innerHTML = pokemonOne.details().battleStats.stats.attack.toString();
	document.querySelector(
		".pokemon-one-battle-defense"
	)!.innerHTML = pokemonOne.details().battleStats.stats.defense.toString();
	document.querySelector(
		".pokemon-one-battle-spatk"
	)!.innerHTML = pokemonOne.details().battleStats.stats.spAtk.toString();
	document.querySelector(
		".pokemon-one-battle-spdef"
	)!.innerHTML = pokemonOne.details().battleStats.stats.spDef.toString();
	document.querySelector(
		".pokemon-one-battle-speed"
	)!.innerHTML = pokemonOne.details().battleStats.stats.speed.toString();

	document.querySelector(
		".pokemon-one-attack"
	)!.innerHTML = pokemonOne.details().stats.attack.toString();
	document.querySelector(
		".pokemon-one-defense"
	)!.innerHTML = pokemonOne.details().stats.defense.toString();
	document.querySelector(
		".pokemon-one-spatk"
	)!.innerHTML = pokemonOne.details().stats.spAtk.toString();
	document.querySelector(
		".pokemon-one-spdef"
	)!.innerHTML = pokemonOne.details().stats.spDef.toString();
	document.querySelector(
		".pokemon-one-speed"
	)!.innerHTML = pokemonOne.details().stats.speed.toString();

	const POMoveOne = document.querySelector(".pokemon-one-move-one")!;
	POMoveOne.querySelector(
		".name"
	)!.innerHTML = pokemonOne.details().moves[0].name.toUpperCase();
	POMoveOne.querySelector(
		".type"
	)!.innerHTML = pokemonOne.details().moves[0].type.toUpperCase();
	POMoveOne.querySelector(
		".power"
	)!.innerHTML = pokemonOne.details().moves[0].power!.toString();
	POMoveOne.querySelector(
		".accuracy"
	)!.innerHTML = pokemonOne.details().moves[0].accuracy + '%';
	POMoveOne.querySelector(
		".PP .current-PP"
	)!.innerHTML = pokemonOne.details().battleStats.moves[0].PP.toString();
	POMoveOne.querySelector(
		".PP .total-PP"
	)!.innerHTML = pokemonOne.details().moves[0].PP.toString();

	POMoveOne.querySelector(".use")?.addEventListener("click", (e) => {
		e.preventDefault();
		pokemonOne.use(pokemonOne.details().moves[0].name, pokemonTwo);
		POMoveOne.querySelector(
			".PP .current-PP"
		)!.innerHTML = pokemonOne.details().battleStats.moves[0].PP.toString();
		document.querySelector(
			".pokemon-two-hp .current-hp"
		)!.innerHTML = pokemonTwo.details().battleStats.stats.hp.toString();
		PTHPProgressbar.update(pokemonTwo.details().battleStats.stats.hp);
	});

	const POMoveTwo = document.querySelector(".pokemon-one-move-two")!;
	POMoveTwo.querySelector(
		".name"
	)!.innerHTML = pokemonOne.details().moves[1].name.toUpperCase();
	POMoveTwo.querySelector(
		".type"
	)!.innerHTML = pokemonOne.details().moves[1].type.toUpperCase();
	POMoveTwo.querySelector(
		".power"
	)!.innerHTML = pokemonOne.details().moves[1].power!.toString();
	POMoveTwo.querySelector(
		".accuracy"
	)!.innerHTML = pokemonOne.details().moves[1].accuracy + '%';
	POMoveTwo.querySelector(
		".PP .current-PP"
	)!.innerHTML = pokemonOne.details().battleStats.moves[1].PP.toString();
	POMoveTwo.querySelector(
		".PP .total-PP"
	)!.innerHTML = pokemonOne.details().moves[1].PP.toString();

	POMoveTwo.querySelector(".use")?.addEventListener("click", (e) => {
		e.preventDefault();
		pokemonOne.use(pokemonOne.details().moves[1].name, pokemonTwo);
		POMoveTwo.querySelector(
			".PP .current-PP"
		)!.innerHTML = pokemonOne.details().battleStats.moves[1].PP.toString();
		document.querySelector(
			".pokemon-two-hp .current-hp"
		)!.innerHTML = pokemonTwo.details().battleStats.stats.hp.toString();
		PTHPProgressbar.update(pokemonTwo.details().battleStats.stats.hp);
	});

	const POMoveThree = document.querySelector(".pokemon-one-move-three")!;
	POMoveThree.querySelector(
		".name"
	)!.innerHTML = pokemonOne.details().moves[2].name.toUpperCase();
	POMoveThree.querySelector(
		".type"
	)!.innerHTML = pokemonOne.details().moves[2].type.toUpperCase();
	POMoveThree.querySelector(
		".power"
	)!.innerHTML = pokemonOne.details().moves[2].power!.toString();
	POMoveThree.querySelector(
		".accuracy"
	)!.innerHTML = pokemonOne.details().moves[2].accuracy + '%';
	POMoveThree.querySelector(
		".PP .current-PP"
	)!.innerHTML = pokemonOne.details().battleStats.moves[2].PP.toString();
	POMoveThree.querySelector(
		".PP .total-PP"
	)!.innerHTML = pokemonOne.details().moves[2].PP.toString();

	POMoveThree.querySelector(".use")?.addEventListener("click", (e) => {
		e.preventDefault();
		pokemonOne.use(pokemonOne.details().moves[2].name, pokemonTwo);
		POMoveThree.querySelector(
			".PP .current-PP"
		)!.innerHTML = pokemonOne.details().battleStats.moves[2].PP.toString();
		document.querySelector(
			".pokemon-two-hp .current-hp"
		)!.innerHTML = pokemonTwo.details().battleStats.stats.hp.toString();
		PTHPProgressbar.update(pokemonTwo.details().battleStats.stats.hp);
	});

	const POMoveFour = document.querySelector(".pokemon-one-move-four")!;
	POMoveFour.querySelector(
		".name"
	)!.innerHTML = pokemonOne.details().moves[3].name.toUpperCase();
	POMoveFour.querySelector(
		".type"
	)!.innerHTML = pokemonOne.details().moves[3].type.toUpperCase();
	POMoveFour.querySelector(
		".power"
	)!.innerHTML = pokemonOne.details().moves[3].power!.toString();
	POMoveFour.querySelector(
		".accuracy"
	)!.innerHTML = pokemonOne.details().moves[3].accuracy + '%';
	POMoveFour.querySelector(
		".PP .current-PP"
	)!.innerHTML = pokemonOne.details().battleStats.moves[3].PP.toString();
	POMoveFour.querySelector(
		".PP .total-PP"
	)!.innerHTML = pokemonOne.details().moves[3].PP.toString();

	POMoveFour.querySelector(".use")?.addEventListener("click", (e) => {
		e.preventDefault();
		pokemonOne.use(pokemonOne.details().moves[3].name, pokemonTwo);
		POMoveFour.querySelector(
			".PP .current-PP"
		)!.innerHTML = pokemonOne.details().battleStats.moves[3].PP.toString();
		document.querySelector(
			".pokemon-two-hp .current-hp"
		)!.innerHTML = pokemonTwo.details().battleStats.stats.hp.toString();
		PTHPProgressbar.update(pokemonTwo.details().battleStats.stats.hp);
	});
})(garchomp, reshiram);

(function setUpPokemonTwo(pokemonOne: Pokemon, pokemonTwo: Pokemon) {
	const POHPProgress = document.querySelector(
		".pokemon-one-hp-progress .progress-bar"
	);
	const POHPProgressbar = new ProgressBar(
		POHPProgress as HTMLElement,
		garchomp.details().stats.hp
	);

	// Pokemon Two
	document.querySelector(
		".pokemon-two-name"
	)!.innerHTML = pokemonTwo.details().name.toUpperCase();
	const PTTypes = pokemonTwo.details().types;
	document.querySelector(
		".pokemon-two-types .type-one"
	)!.innerHTML = PTTypes[0].name.toUpperCase();
	document.querySelector(".pokemon-two-types .type-two")!.innerHTML =
		PTTypes[1].name.toUpperCase() || "";

	document.querySelector(
		".pokemon-two-hp .current-hp"
	)!.innerHTML = pokemonTwo.details().battleStats.stats.hp.toString();
	document.querySelector(
		".pokemon-two-hp .total-hp"
	)!.innerHTML = pokemonTwo.details().stats.hp.toString();

	document.querySelector(
		".pokemon-two-battle-attack"
	)!.innerHTML = pokemonTwo.details().battleStats.stats.attack.toString();
	document.querySelector(
		".pokemon-two-battle-defense"
	)!.innerHTML = pokemonTwo.details().battleStats.stats.defense.toString();
	document.querySelector(
		".pokemon-two-battle-spatk"
	)!.innerHTML = pokemonTwo.details().battleStats.stats.spAtk.toString();
	document.querySelector(
		".pokemon-two-battle-spdef"
	)!.innerHTML = pokemonTwo.details().battleStats.stats.spDef.toString();
	document.querySelector(
		".pokemon-two-battle-speed"
	)!.innerHTML = pokemonTwo.details().battleStats.stats.speed.toString();

	document.querySelector(
		".pokemon-two-attack"
	)!.innerHTML = pokemonTwo.details().stats.attack.toString();
	document.querySelector(
		".pokemon-two-defense"
	)!.innerHTML = pokemonTwo.details().stats.defense.toString();
	document.querySelector(
		".pokemon-two-spatk"
	)!.innerHTML = pokemonTwo.details().stats.spAtk.toString();
	document.querySelector(
		".pokemon-two-spdef"
	)!.innerHTML = pokemonTwo.details().stats.spDef.toString();
	document.querySelector(
		".pokemon-two-speed"
	)!.innerHTML = pokemonTwo.details().stats.speed.toString();

	const PTMoveOne = document.querySelector(".pokemon-two-move-one")!;
	PTMoveOne.querySelector(
		".name"
	)!.innerHTML = pokemonTwo.details().moves[0].name.toUpperCase();
	PTMoveOne.querySelector(
		".type"
	)!.innerHTML = pokemonTwo.details().moves[0].type.toUpperCase();
	PTMoveOne.querySelector(
		".power"
	)!.innerHTML = pokemonTwo.details().moves[0].power!.toString();
	PTMoveOne.querySelector(
		".accuracy"
	)!.innerHTML = pokemonTwo.details().moves[0].accuracy + '%';
	PTMoveOne.querySelector(
		".PP .current-PP"
	)!.innerHTML = pokemonTwo.details().battleStats.moves[0].PP.toString();
	PTMoveOne.querySelector(
		".PP .total-PP"
	)!.innerHTML = pokemonTwo.details().moves[0].PP.toString();

	PTMoveOne.querySelector(".use")?.addEventListener("click", (e) => {
		e.preventDefault();
		pokemonTwo.use(pokemonTwo.details().moves[0].name, pokemonOne);
		PTMoveOne.querySelector(
			".PP .current-PP"
		)!.innerHTML = pokemonTwo.details().battleStats.moves[0].PP.toString();
		document.querySelector(
			".pokemon-one-hp .current-hp"
		)!.innerHTML = pokemonOne.details().battleStats.stats.hp.toString();
		POHPProgressbar.update(pokemonOne.details().battleStats.stats.hp);
	});

	const PTMoveTwo = document.querySelector(".pokemon-two-move-two")!;
	PTMoveTwo.querySelector(
		".name"
	)!.innerHTML = pokemonTwo.details().moves[1].name.toUpperCase();
	PTMoveTwo.querySelector(
		".type"
	)!.innerHTML = pokemonTwo.details().moves[1].type.toUpperCase();
	PTMoveTwo.querySelector(
		".power"
	)!.innerHTML = pokemonTwo.details().moves[1].power!.toString();
	PTMoveTwo.querySelector(
		".accuracy"
	)!.innerHTML = pokemonTwo.details().moves[1].accuracy + '%';
	PTMoveTwo.querySelector(
		".PP .current-PP"
	)!.innerHTML = pokemonTwo.details().battleStats.moves[1].PP.toString();
	PTMoveTwo.querySelector(
		".PP .total-PP"
	)!.innerHTML = pokemonTwo.details().moves[1].PP.toString();

	PTMoveTwo.querySelector(".use")?.addEventListener("click", (e) => {
		e.preventDefault();
		pokemonTwo.use(pokemonTwo.details().moves[1].name, pokemonOne);
		PTMoveTwo.querySelector(
			".PP .current-PP"
		)!.innerHTML = pokemonTwo.details().battleStats.moves[1].PP.toString();
		document.querySelector(
			".pokemon-one-hp .current-hp"
		)!.innerHTML = pokemonOne.details().battleStats.stats.hp.toString();
		POHPProgressbar.update(pokemonOne.details().battleStats.stats.hp);
	});

	const PTMoveThree = document.querySelector(".pokemon-two-move-three")!;
	PTMoveThree.querySelector(
		".name"
	)!.innerHTML = pokemonTwo.details().moves[2].name.toUpperCase();
	PTMoveThree.querySelector(
		".type"
	)!.innerHTML = pokemonTwo.details().moves[2].type.toUpperCase();
	PTMoveThree.querySelector(
		".power"
	)!.innerHTML = pokemonTwo.details().moves[2].power!.toString();
	PTMoveThree.querySelector(
		".accuracy"
	)!.innerHTML = pokemonTwo.details().moves[2].accuracy + '%';
	PTMoveThree.querySelector(
		".PP .current-PP"
	)!.innerHTML = pokemonTwo.details().battleStats.moves[2].PP.toString();
	PTMoveThree.querySelector(
		".PP .total-PP"
	)!.innerHTML = pokemonTwo.details().moves[2].PP.toString();

	PTMoveThree.querySelector(".use")?.addEventListener("click", (e) => {
		e.preventDefault();
		pokemonTwo.use(pokemonTwo.details().moves[2].name, pokemonOne);
		PTMoveThree.querySelector(
			".PP .current-PP"
		)!.innerHTML = pokemonTwo.details().battleStats.moves[2].PP.toString();
		document.querySelector(
			".pokemon-one-hp .current-hp"
		)!.innerHTML = pokemonOne.details().battleStats.stats.hp.toString();
		POHPProgressbar.update(pokemonOne.details().battleStats.stats.hp);
	});

	const PTMoveFour = document.querySelector(".pokemon-two-move-four")!;
	PTMoveFour.querySelector(
		".name"
	)!.innerHTML = pokemonTwo.details().moves[3].name.toUpperCase();
	PTMoveFour.querySelector(
		".type"
	)!.innerHTML = pokemonTwo.details().moves[3].type.toUpperCase();
	PTMoveFour.querySelector(
		".power"
	)!.innerHTML = pokemonTwo.details().moves[3].power!.toString();
	PTMoveFour.querySelector(
		".accuracy"
	)!.innerHTML = pokemonTwo.details().moves[3].accuracy + '%';
	PTMoveFour.querySelector(
		".PP .current-PP"
	)!.innerHTML = pokemonTwo.details().battleStats.moves[3].PP.toString();
	PTMoveFour.querySelector(
		".PP .total-PP"
	)!.innerHTML = pokemonTwo.details().moves[3].PP.toString();

	PTMoveFour.querySelector(".use")?.addEventListener("click", (e) => {
		e.preventDefault();
		pokemonTwo.use(pokemonTwo.details().moves[3].name, pokemonOne);
		PTMoveFour.querySelector(
			".PP .current-PP"
		)!.innerHTML = pokemonTwo.details().battleStats.moves[3].PP.toString();
		document.querySelector(
			".pokemon-one-hp .current-hp"
		)!.innerHTML = pokemonOne.details().battleStats.stats.hp.toString();
		POHPProgressbar.update(pokemonOne.details().battleStats.stats.hp);
	});
})(garchomp, reshiram);
