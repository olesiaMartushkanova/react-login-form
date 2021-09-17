import { useRef } from 'react';

const Input = (props) => {
  const inputRef = useRef();

  return (
    <div className={props.className}>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
