import DebtGraph from "@service/graph";
import { Payer } from "@service/types";

export function calculateDebts(payers: Payer[]): DebtGraph {
	const graph = new DebtGraph();

	for (const { name, transactions } of payers) {
		for (const { amount, shareholders } of transactions) {
			const commonAmount = amount / shareholders.length;

			for (const shareholder of shareholders) {
				if (name != shareholder) {
					graph.addEdge(shareholder, name, commonAmount);
				}
			}
		}
	}

	return graph;
}
