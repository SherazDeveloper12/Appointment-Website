import Styles from './button.module.css';
export default function Button(props) {
    return (
        <button onClick={props.onClick} className={`${Styles.button} ${Styles[props.className]}`}>{props.text}</button>
    );
}