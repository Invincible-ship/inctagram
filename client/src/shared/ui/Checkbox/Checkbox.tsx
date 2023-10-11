import styles from './Checkbox.module.scss';
import {ChangeEvent, FC} from "react";

type Props = {
	handleAgree: (check: boolean) => void
}

export const Checkbox: FC<Props> = ({handleAgree}) => {

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleAgree(e.currentTarget.checked)
	}

	return (
		<div>
			<input type="checkbox" id="myCheckbox" className={styles.customCheckbox} onChange={onChange}/>
			<label htmlFor="myCheckbox" className={styles.checkboxLabel}></label>
		</div>
	);
}
