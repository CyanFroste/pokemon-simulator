import { TYPE } from "./Globals.js";
const { NORMAL, FIGHTING, FLYING, POISON, GROUND, ROCK, BUG, GHOST, STEEL, FIRE, WATER, GRASS, ELECTRIC, PSYCHIC, ICE, DRAGON, DARK, FAIRY, } = TYPE;
export class Type {
    constructor(name, weakTo = [], immuneTo = [], resistantTo = [], normalTo = []) {
        this.name = name;
        this.weakTo = weakTo;
        this.immuneTo = immuneTo;
        this.resistantTo = resistantTo;
        this.normalTo = normalTo;
    }
    getModifier(type) {
        if (this.immuneTo.indexOf(type) > -1)
            return 0;
        else if (this.weakTo.indexOf(type) > -1)
            return 2;
        else if (this.resistantTo.indexOf(type) > -1)
            return 0.5;
        else
            return 1;
    }
}
export const TYPES = {
    normal: new Type(NORMAL, [FIGHTING], [GHOST], [], [
        NORMAL,
        FLYING,
        POISON,
        GROUND,
        ROCK,
        BUG,
        STEEL,
        FIRE,
        WATER,
        GRASS,
        ELECTRIC,
        PSYCHIC,
        ICE,
        DRAGON,
        DARK,
        FAIRY,
    ]),
    fighting: new Type(FIGHTING, [FLYING, PSYCHIC, FAIRY], [], [ROCK, BUG, DARK], [
        NORMAL,
        FIGHTING,
        POISON,
        GROUND,
        GHOST,
        STEEL,
        FIRE,
        WATER,
        GRASS,
        ELECTRIC,
        ICE,
        DRAGON,
    ]),
    flying: new Type(FLYING, [ROCK, ELECTRIC, ICE], [GROUND], [FIGHTING, BUG, GRASS], [
        NORMAL,
        FLYING,
        POISON,
        GHOST,
        STEEL,
        FIRE,
        WATER,
        PSYCHIC,
        DRAGON,
        DARK,
        FAIRY,
    ]),
    poison: new Type(POISON, [GROUND, PSYCHIC], [], [FIGHTING, POISON, BUG, GRASS, FAIRY], [
        NORMAL,
        FLYING,
        ROCK,
        GHOST,
        STEEL,
        FIRE,
        WATER,
        ELECTRIC,
        ICE,
        DRAGON,
        DARK,
    ]),
    ground: new Type(GROUND, [WATER, GRASS, ICE], [ELECTRIC], [POISON, ROCK], [
        NORMAL,
        FIGHTING,
        FLYING,
        GROUND,
        BUG,
        GHOST,
        STEEL,
        FIRE,
        PSYCHIC,
        DRAGON,
        DARK,
        FAIRY,
    ]),
    rock: new Type(ROCK, [FIGHTING, GROUND, STEEL, WATER, GRASS], [], [NORMAL, FLYING, POISON, FIRE], [ROCK, BUG, GHOST, ELECTRIC, PSYCHIC, ICE, DRAGON, DARK, FAIRY]),
    bug: new Type(BUG, [FLYING, ROCK, FIRE], [], [FIGHTING, GROUND, GRASS], [
        NORMAL,
        POISON,
        BUG,
        GHOST,
        STEEL,
        WATER,
        ELECTRIC,
        PSYCHIC,
        ICE,
        DRAGON,
        DARK,
        FAIRY,
    ]),
    ghost: new Type(GHOST, [GHOST, DARK], [NORMAL, FIGHTING], [POISON, BUG], [
        FLYING,
        GROUND,
        ROCK,
        STEEL,
        FIRE,
        WATER,
        GRASS,
        ELECTRIC,
        PSYCHIC,
        ICE,
        DRAGON,
        FAIRY,
    ]),
    steel: new Type(STEEL, [FIGHTING, GROUND, FIRE], [POISON], [NORMAL, FLYING, ROCK, BUG, STEEL, GRASS, PSYCHIC, ICE, DRAGON, FAIRY], [GHOST, WATER, ELECTRIC, DARK]),
    fire: new Type(FIRE, [GROUND, ROCK, WATER], [], [BUG, STEEL, FIRE, GRASS, ICE, FAIRY], [NORMAL, FIGHTING, FLYING, POISON, GHOST, ELECTRIC, PSYCHIC, DRAGON, DARK]),
    water: new Type(WATER, [GRASS, ELECTRIC], [], [STEEL, FIRE, WATER, ICE], [
        NORMAL,
        FIGHTING,
        FLYING,
        POISON,
        GROUND,
        ROCK,
        BUG,
        GHOST,
        PSYCHIC,
        DRAGON,
        DARK,
        FAIRY,
    ]),
    grass: new Type(GRASS, [FLYING, POISON, BUG, FIRE, ICE], [], [GROUND, WATER, GRASS, ELECTRIC], [NORMAL, FIGHTING, ROCK, GHOST, STEEL, PSYCHIC, DRAGON, DARK, FAIRY]),
    electric: new Type(ELECTRIC, [GROUND], [], [FLYING, STEEL, ELECTRIC], [
        NORMAL,
        FIGHTING,
        POISON,
        ROCK,
        BUG,
        GHOST,
        FIRE,
        WATER,
        GRASS,
        PSYCHIC,
        ICE,
        DRAGON,
        DARK,
        FAIRY,
    ]),
    psychic: new Type(PSYCHIC, [BUG, GHOST, DARK], [], [FIGHTING, PSYCHIC], [
        NORMAL,
        FLYING,
        POISON,
        GROUND,
        ROCK,
        STEEL,
        FIRE,
        WATER,
        GRASS,
        ELECTRIC,
        ICE,
        DRAGON,
        FAIRY,
    ]),
    ice: new Type(ICE, [FIGHTING, ROCK, STEEL, FIRE], [], [ICE], [
        NORMAL,
        FLYING,
        POISON,
        GROUND,
        BUG,
        GHOST,
        WATER,
        GRASS,
        ELECTRIC,
        PSYCHIC,
        DRAGON,
        DARK,
        FAIRY,
    ]),
    dragon: new Type(DRAGON, [ICE, DRAGON, FAIRY], [], [FIRE, WATER, GRASS, ELECTRIC], [
        NORMAL,
        FIGHTING,
        FLYING,
        POISON,
        GROUND,
        ROCK,
        BUG,
        GHOST,
        STEEL,
        PSYCHIC,
        DARK,
    ]),
    dark: new Type(DARK, [FIGHTING, BUG, FAIRY], [PSYCHIC], [GHOST, DARK], [
        NORMAL,
        FLYING,
        POISON,
        GROUND,
        ROCK,
        STEEL,
        FIRE,
        WATER,
        GRASS,
        ELECTRIC,
        ICE,
        DRAGON,
    ]),
    fairy: new Type(FAIRY, [POISON, STEEL], [DRAGON], [FIGHTING, BUG, DARK], [
        NORMAL,
        FLYING,
        GROUND,
        ROCK,
        GHOST,
        FIRE,
        WATER,
        GRASS,
        ELECTRIC,
        PSYCHIC,
        ICE,
        FAIRY,
    ]),
};