class Status {
	constructor(
		private name: string,
		private type: string,
		private category: string,
		private effect: string,
		private volatile: boolean
	) {}
}

// just needs an object containing all the statuses as it cannot be generalized
