"use strict";
class Status {
    constructor(name, type, category, effect, volatile) {
        this.name = name;
        this.type = type;
        this.category = category;
        this.effect = effect;
        this.volatile = volatile;
    }
}
// just needs an object containing all the statuses as it cannot be generalized
