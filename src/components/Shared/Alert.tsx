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
    <div className={ classNames('alert alert--sm mb-4', alertClass[type]) }>
      <div className="alert__icon"><FontAwesomeIcon icon={ icon[type] } size="sm" /></div>
      <div className="alert__text">{children}</div>
    </div>
  );
};

export default Alert;
