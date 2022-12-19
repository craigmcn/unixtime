import React, { useCallback, useEffect, useRef, useState } from 'react';
import Select, { SelectInstance } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/pro-duotone-svg-icons';
import { IFormData, IValue } from '../../lib/types';
import Section from '../Shared/Section';
import Button from '../Shared/Button';

interface IFormProps {
  setConversion: (data: IFormData) => void;
}

const Form = ({ setConversion }: IFormProps) => {
  const timeRef = useRef<HTMLInputElement>(null);
  const timezoneRef = useRef<SelectInstance>(null);
  const [options, setOptions] = useState<IValue[]>([]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConversion({ time: e.currentTarget.time.value, timezone: (timezoneRef.current?.props.value as IValue)?.value || '' });

    if (timeRef.current) {
      timeRef.current.value = '';
      timeRef.current?.focus();
    }
  }, [setConversion]);

  useEffect(() => {
    import('../../data/timezones.json').then(({default: options}) => setOptions(options));
  }, []);

  return (
    <Section>
      <form className="mb-4" autoComplete="off" onSubmit={ handleSubmit }>
        <div className="mb-4">
          <label htmlFor="time" className="sr-only">Date and time or timestamp</label>
          <input
            id="time"
            ref={ timeRef }
            className={ `text-xl border border-gray-400 rounded p-2 w-full
              dark:text-white dark:bg-gray-800 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-inverse
              focus:border-transparent` }
            type="text"
            maxLength={ 64 }
            placeholder="Enter a date and time or a timestamp"
            required
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label htmlFor="timezone" className="sr-only">Time zone <small>(optional)</small></label>
          <Select
            id="timezone"
            ref={ timezoneRef }
            className="react-select-container text-xl"
            classNamePrefix="react-select"
            options={ options }
            isClearable
            placeholder="Enter a time zone (optional)"
          />
        </div>

        <div>
          <Button
            className={ `text-xl text-primary border-primary
              dark:text-primary-inverse dark:border-primary-inverse
              hover:text-white hover:bg-primary hover:border-primary-dark
              dark:hover:text-white dark:hover:bg-primary dark:hover:border-primary
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              dark:focus:ring-primary-inverse` }
            type="submit"
          >
            <FontAwesomeIcon icon={ faClock } className="mr-1" />
            Convert
          </Button>
        </div>
      </form>
    </Section>
  );
};

export default Form;
