import { type Ref } from 'react';
import ReactSelect, { SelectInstance, StylesConfig } from 'react-select';
import { IValue } from '../../lib/types';

type ISize = 'sm' | 'md' | 'lg';

interface ISelectProps {
  id?: string;
  innerRef?: Ref<SelectInstance>;
  options: IValue[];
  isClearable?: boolean;
  size?: ISize;
  placeholder?: string;
}

const selectStyle: StylesConfig<IValue> = {
  container: (provided) => ({
    ...provided,
    marginBottom: '0.25rem',
  }),
  control: (provided, state) => {
    const { size } = state.selectProps as { size?: ISize };
    const fontSize =
      size === 'lg' ? '1.25rem' : size === 'sm' ? '0.875rem' : '1rem';
    const borderRadius = size === 'lg' ? '0.25rem' : '0.125rem';

    return {
      ...provided,
      borderColor: 'var(--grey600)',
      borderRadius,
      boxShadow: state.isFocused
        ? '0 0 0 0.2rem var(--focusShadow)'
        : provided.boxShadow,
      '&:hover': {
        borderColor: 'var(--grey600)',
      },
      color: 'var(--black)',
      fontSize,
      padding: 'calc(0.25em + 1px) 0.5em',
    };
  },
  placeholder: (provided) => ({
    ...provided,
    color: 'rgb(117, 117, 117)', // Chrome default placeholder color
    marginLeft: 0,
    marginRight: 4, // default margin-block is 2px
  }),
  singleValue: (provided) => ({
    ...provided,
    marginLeft: 0,
    marginRight: 4, // default margin-block is 2px
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
};

const Select = ({ innerRef, ...props }: ISelectProps) => {
  return <ReactSelect ref={innerRef} styles={selectStyle} {...props} />;
};

export default Select;
