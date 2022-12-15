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
            className="text-xl border border-gray-400 rounded p-2 w-full"
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
            className="text-xl"
            options={ options }
            isClearable
            placeholder="Enter a time zone (optional)"
            styles={ {
              control: base => ({
                ...base,
                borderColor: '#9ca3af', // gray-400
                '&:hover': {
                  borderColor: '#9ca3af', // gray-400, reset
                },
              }),
              option: (base, state) => ({
                ...base,
                fontSize: '1rem',
                lineHeight: 1,
                backgroundColor: state.isSelected ? '#005b99' : state.isFocused ? '#e5e7eb' : 'white', // primary, gray-200
                '&:active': {
                  backgroundColor: '#e6eff5', // primary @ 10% opacity on white
                  color: '#2c536d', // contrasting WCAG AAA color: https://www.craigmcn.com/colours/
                },
              }),
              placeholder: base => ({
                ...base,
                color: '#9ca3af', // gray-400
                margin: 0,
              }),
              clearIndicator: base => ({
                ...base,
                color: '#9ca3af', // gray-400
                '&:hover': {
                  color: '#4b5563', // gray-600
                },
              }),
              indicatorSeparator: base => ({
                ...base,
                color: '#e5e7eb', // gray-200
              }),
              dropdownIndicator: base => ({
                ...base,
                color: '#9ca3af', // gray-400
                '&:hover': {
                  color: '#4b5563', // gray-600
                },
              }),
              input: base => ({
                ...base,
                margin: 0,
                padding: 0,
              }),
              singleValue: base => ({
                ...base,
                margin: 0,
                padding: 0,
              }),
              valueContainer: base => ({
                ...base,
                padding: '0.5rem',
              }),
            } }
          />
        </div>

        <div>
          <Button
            className="text-primary border-primary hover:text-white hover:bg-primary hover:border-primary-dark text-xl"
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
