import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { SelectInstance } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/sharp-duotone-light-svg-icons";
import { IFormData, IValue } from "../../lib/types";
import Section from "../Shared/Section";
import Button from "../Shared/Button";
import Select from "./Select";

interface IFormProps {
  setConversion: (data: IFormData) => void;
}

const Form = ({ setConversion }: IFormProps) => {
  const timeRef = useRef<HTMLInputElement>(null);
  const timezoneRef = useRef<SelectInstance<IValue>>(null);
  const [options, setOptions] = useState<IValue[]>([]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setConversion({
        time: timeRef.current?.value || "",
        timezone: (timezoneRef.current?.props.value as IValue)?.value || "",
      });

      if (timeRef.current) {
        timeRef.current.value = "";
        timeRef.current?.focus();
      }
    },
    [setConversion],
  );

  useEffect(() => {
    import("../../data/timezones.json").then(({ default: options }) =>
      setOptions(options),
    );
  }, []);

  return (
    <Section>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="time" className="visually-hidden">
            Date and time or timestamp
          </label>
          <input
            id="time"
            name="time"
            ref={timeRef}
            className="form__control form__control--lg"
            type="text"
            maxLength={64}
            placeholder="Enter a date and time or a timestamp"
            required
            // eslint-disable-next-line jsx-a11y/no-autofocus -- primary input for keyboard-first entry on page load
            autoFocus
          />
        </div>

        <div className="form__group">
          <label htmlFor="timezone" className="visually-hidden">
            Time zone <small>(optional)</small>
          </label>
          <Select
            inputId="timezone"
            innerRef={timezoneRef}
            options={options}
            isClearable
            size="lg"
            placeholder="Enter a time zone (optional)"
          />
        </div>

        <Button className="button--primary button--lg" type="submit">
          <FontAwesomeIcon icon={faClock} className="me-2" />
          Convert
        </Button>
      </form>
    </Section>
  );
};

export default Form;
