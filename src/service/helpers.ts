import { Money } from "@service/types";

export function formatMoney(amount: Money) {
	return `${amount.toFixed(2)} ₽`;
}

export function classes(...classes: (string | undefined | null)[]) {
	return classes.filter(maybeString => maybeString != null).join(" ");
}
