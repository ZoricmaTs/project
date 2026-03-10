import './style.scss';
import React, {useState} from 'react';
import {CircleAlertIcon, EyeIcon, EyeOffIcon} from 'lucide-react';

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

  const [currentErrors, setCurrentErrors] = useState(errors);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    if (e.target.value === '' && props.required) {
      setCurrentErrors(['This field is required']);
    } else {
      setCurrentErrors([]);
    }

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
        className={`input__field ${currentErrors && currentErrors?.length > 0 ? 'error' : ''}`}
        required={props.required || false}
        {...rest}
      />
      {type === 'password' && (
        <button id={`toggle-${id}`} className={`input__password-btn`} onClick={onClickShowPassword}>
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      )}
      {errors?.length
        ? <div className={'input__error-icon error'}><CircleAlertIcon /></div>
        : null
      }
    </div>

    {currentErrors && currentErrors?.length > 0 && <div className={'input__errors error'}>
      {currentErrors.map((error) => (<p key={error}>{error}</p>))}
    </div>}
  </div>
}