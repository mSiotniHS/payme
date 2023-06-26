type Some<T> =
	| { kind: "none" }
	| { kind: "some", value: T }

export default Some;
