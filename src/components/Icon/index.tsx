import { Component, lazy } from "solid-js";
import styles from "./index.module.css";

const iconMap = {
	"edit": lazy(() => import("./icons/edit")),
	"delete": lazy(() => import("./icons/delete")),
} as const;

export type IconName = keyof typeof iconMap;

export type Props = {
	icon: IconName,
	size?: number
};

const Icon: Component<Props> = (props) => {
	const { icon, size: maybeSize } = props;
	const size = maybeSize ?? 18;

	return <div style={{ "--size": `${size}px` }} class={styles.icon}>
		{iconMap[icon]()}
	</div>
}

export default Icon;
