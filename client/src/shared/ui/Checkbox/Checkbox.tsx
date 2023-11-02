import styles from './Checkbox.module.scss';
import {ChangeEvent, FC} from "react";

type Props = {
	handleAgree: (check: boolean) => void
	checkedAgree: boolean
}

export const Checkbox: FC<Props> = ({handleAgree, checkedAgree}) => {

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleAgree(e.currentTarget.checked)
	}

	return (
		<div>
			<input type="checkbox" id="myCheckbox" className={styles.customCheckbox} onChange={onChange} checked={checkedAgree}/>
			<label htmlFor="myCheckbox" className={styles.checkboxLabel}></label>
		</div>
	);
}
