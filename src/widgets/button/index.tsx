import React, {type CSSProperties} from 'react';
import './style.scss';

export type ButtonProps = {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "link" | "outline" | "danger";
  children?: React.ReactNode,
} & React.ButtonHTMLAttributes<HTMLButtonElement> & CSSProperties;

export function Button({size='md', variant='primary', className, children, ...props }: ButtonProps) {
  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <button
      className={`btn btn-${size} btn-${variant} ${className ? className : ''}`}
      onClick={handleButton}
      {...props}
    >
      {children}
    </button>
  );
}