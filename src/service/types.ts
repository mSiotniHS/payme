export type Name = string;
export type Money = number;

export type Transaction = {
	label: string;
	amount: Money;
	shareholders: Name[]
};

export type Payer = {
	name: Name;
	transactions: Transaction[]
};

export type Debtor = {
	name: Name;
	debts: { [payer: Name]: Money }
};
