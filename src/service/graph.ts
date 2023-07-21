import Some from "@service/some";
import { Money, Name } from "@service/types";

/**
 * Represents weighted oriented graph, where
 * vertex X points to vertex Y with weight Z only and only if
 * person X owes person Y Z amount of money
 */
export default class DebtGraph {
	public edges: Map<string, Money>;

	public constructor() {
		this.edges = new Map();
	}

	public static encodeEdge(debtor: Name, payer: Name) {
		return `${debtor}#${payer}`;
	}

	public static decodeEdge(edge: string): [Name, Name] {
		const split = edge.split("#");
		return [split[0], split[1]];
	}

	public addEdge(debtor: Name, payer: Name, amount: Money) {
		const encoding = DebtGraph.encodeEdge(debtor, payer);
		const reversed = DebtGraph.encodeEdge(payer, debtor);

		if (this.edges.has(encoding)) {
			const currentAmount = this.edges.get(encoding)!;
			this.edges.set(encoding, currentAmount + amount);
		} else if (this.edges.has(reversed)) {
			const currentAmount = this.edges.get(reversed)!;

			if (currentAmount > amount) {
				this.edges.set(reversed, currentAmount - amount);
			} else if (currentAmount < amount) {
				this.edges.delete(reversed);
				this.edges.set(encoding, amount - currentAmount);
			} else {
				this.edges.delete(reversed);
			}
		} else {
			this.edges.set(encoding, amount);
		}
	}

	public getEdgeWeight(debtor: Name, payer: Name): Some<Money> {
		const edge = DebtGraph.encodeEdge(debtor, payer);

		if (this.edges.has(edge)) {
			return { kind: "some", value: this.edges.get(edge)! };
		} else {
			return { kind: "none" };
		}
	}
}
