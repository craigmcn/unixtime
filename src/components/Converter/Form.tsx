import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import Select, { SelectInstance } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/sharp-duotone-light-svg-icons';
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

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
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
          <label htmlFor="time" className="visually-hidden">Date and time or timestamp</label>
          <input
            id="time"
            ref={ timeRef }
            className="form-input"
            type="text"
            maxLength={ 64 }
            placeholder="Enter a date and time or a timestamp"
            required
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label htmlFor="timezone" className="visually-hidden">Time zone <small>(optional)</small></label>
          <Select
            id="timezone"
            ref={ timezoneRef }
            className="react-select-container"
            classNamePrefix="react-select"
            options={ options }
            isClearable
            placeholder="Enter a time zone (optional)"
          />
        </div>

        <div>
          <Button className="button--primary" type="submit">
            <FontAwesomeIcon icon={ faClock } className="me-1" />
            Convert
          </Button>
        </div>
      </form>
    </Section>
  );
};

export default Form;
