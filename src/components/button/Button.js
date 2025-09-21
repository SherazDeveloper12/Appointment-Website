import Styles from './button.module.css';
export default function Button(props) {
    return (
        <button onClick={props.onClick} style={{border: `${props.border}`, backgroundColor: `${props.backgroundColor}`, color: `${props.color}`} } className={`${Styles.button} ${props.className}`}>{props.text}</button>
    );
}