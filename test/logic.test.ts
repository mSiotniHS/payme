import { describe, expect, it } from "vitest";
import { Payer } from "@service/types";
import { calculateDebts } from "@service/logic";

describe("calculateDebts testing", () => {
  it("works as expected", () => {
    const payers: Payer[] = [
      {
        name: "James",
        transactions: [
          {
            label: "1",
            amount: 500,
            shareholders: ["James", "Tom"]
          }
        ]
      },
      {
        name: "Tom",
        transactions: [
          {
            label: "2",
            amount: 250,
            shareholders: ["Tom", "James"]
          }
        ]
      }
    ];

    const graph = calculateDebts(payers);

    expect(graph.edges.size).toEqual(1);
    expect(graph.getEdgeWeight("Tom", "James")).toStrictEqual({ kind: "some", value: 125 })
  });
});
