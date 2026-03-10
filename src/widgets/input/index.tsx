import './style.scss';
import React, {useState} from 'react';
import {EyeIcon, EyeOffIcon} from 'lucide-react';

export type InputType = 'text' | 'password' | 'email';
export type InputProps = {
  id: string,
  label: string,
  onChange?: (value: unknown) => void,
  errors?: string[],
  type?: InputType,
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  const {type, id, label, onChange, errors, ...rest} = props;
  const [showPassword, setShowPassword] = useState(false);
  const [currentType, setCurrentType] = useState(props.type);
  const [currentValue, setCurrentValue] = useState(props.value);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);

    if (onChange) {
      onChange(currentValue);
    }
  }

  const onClickShowPassword = () => {
    setShowPassword(!showPassword);
    if (type === 'password') {
      setCurrentType(showPassword ? 'password' : 'text');
    }
  }
  return <div className={'input'}>
    <label htmlFor={id} className={'input__label'}>{label}</label>
    <div className={'input__field_wrapper'}>
      <input
        placeholder={props.placeholder}
        value={currentValue}
        onChange={onChangeHandler}
        type={currentType}
        id={id}
        className={'input__field'}
        {...rest}
      />
      {type === 'password' && (
        <button id={`toggle-${id}`} className={'input__password-btn'} onClick={onClickShowPassword}>
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      )}
      {errors?.length ? <div className={'input__error-icon'}>!</div> : null}
    </div>

    {errors?.length && <div className={'input__errors'}>
      {errors.map((error) => (<p key={error}>{error}</p>))}
    </div>}
  </div>
}