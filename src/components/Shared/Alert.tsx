import type { ReactNode } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faTriangleExclamation } from '@fortawesome/sharp-duotone-light-svg-icons';

interface IAlertProps {
  children: ReactNode;
  type?: 'error' | 'warning';
}

const alertClass = {
  error: 'alert--danger',
  warning: 'alert--warning',
};

const icon = {
  error: faCircleExclamation,
  warning: faTriangleExclamation,
};

const Alert = ({ type = 'error', children }: IAlertProps) => {
  return (
    <div className={ classNames('alert mb-4', alertClass[type]) }>
      <FontAwesomeIcon icon={ icon[type] } className="alert__icon" />
      <span className="alert__text">{children}</span>
    </div>
  );
};

export default Alert;
