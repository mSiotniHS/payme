import DebtGraph from "@service/graph";
import { describe, expect, it } from "vitest";

describe("DebtGraph testing", () => {
	describe("Constructor...", () => {
		it("...creates empty map", () => {
			const graph = new DebtGraph();
			expect(graph.edges.size).toEqual(0);
		});
	});

	describe("addEdge...", () => {
		it("...adds edge if none exists", () => {
			const graph = new DebtGraph();
			graph.addEdge("james", "gary", 50);

			expect(graph.getEdgeWeight("james", "gary")).toStrictEqual({ kind: "some", value: 50 });
		});

		it("...adds value to existing edge", () => {
			const graph = new DebtGraph();
			graph.addEdge("james", "gary", 50);
			graph.addEdge("james", "gary", 50);

			expect(graph.getEdgeWeight("james", "gary")).toStrictEqual({ kind: "some", value: 100 });
		});

		it("...subtracts value if exists opposite edge", () => {
			const graph = new DebtGraph();
			graph.addEdge("james", "gary", 50);
			graph.addEdge("gary", "james", 30);

			expect(graph.getEdgeWeight("james", "gary")).toStrictEqual({ kind: "some", value: 20 });
			expect(graph.getEdgeWeight("gary", "james")).toStrictEqual({ kind: "none" });
		});

		it("...adds edge and deletes opposite if new has greater value", () => {
			const graph = new DebtGraph();
			graph.addEdge("james", "gary", 50);
			graph.addEdge("gary", "james", 70);

			expect(graph.getEdgeWeight("gary", "james")).toStrictEqual({ kind: "some", value: 20 });
			expect(graph.getEdgeWeight("james", "gary")).toStrictEqual({ kind: "none" });
		});
	});
});
