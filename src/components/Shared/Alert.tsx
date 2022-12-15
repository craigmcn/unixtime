import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faTriangleExclamation } from '@fortawesome/pro-light-svg-icons';

interface IAlertProps {
  children: React.ReactNode;
  type?: 'error' | 'warning';
}

const style = {
  error: 'text-red-700 border-red-700',
  warning: 'text-yellow-700 border-yellow-700',
};

const icon = {
  error: faCircleExclamation,
  warning: faTriangleExclamation,
};

const Alert = ({ type = 'error', children }: IAlertProps) => {
  return (
    <div className={ classNames('border rounded mb-4 px-1', style[type]) }>
      <FontAwesomeIcon icon={ icon[type] } className="mr-1" />
      {children}
    </div>
  );
};

export default Alert;
