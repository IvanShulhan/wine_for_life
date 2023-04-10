import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as ArrowTop } from '../../assets/icons/arrow-top.svg';
import helperFuncs from '../../common/utils/helper.funcs';
import classNames from 'classnames';
import './select.scss';

interface IProps {
  name: string;
  values?: string[];
  isDisabled?: boolean;
  property?: string;
  onChangeFun?: (key: string, value: string) => void;
  currentVal?: string;
  isFull?: boolean;
  withParams?: boolean;
}

export const SelectComponent: React.FC<IProps> = React.memo(
  ({
    name,
    values = [],
    isDisabled = false,
    isFull = false,
    withParams = true,
    onChangeFun,
    currentVal = '',
    property = ''
  }) => {
    const { search } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams(search);
    const [value, setValue] = useState(withParams ? searchParams.get(name) || '' : '');
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (value: string) => {
      setValue(value);
      if (withParams) {
        searchParams.set(name, value);
        setSearchParams(searchParams);
      }
    };

    useEffect(() => {
      if (onChangeFun) {
        onChangeFun(property, value);
      }
    }, [value]);

    useEffect(() => {
      setValue(currentVal);
    }, [currentVal]);

    return (
      <div
        className={classNames('select', {
          'select--is-disabled': isDisabled,
          'select--is-full': isFull
        })}>
        <div
          className={classNames('select__content', {
            'select__content--is-open': isOpen
          })}
          tabIndex={0}
          onClick={() => {
            if (!isDisabled) setIsOpen(!isOpen);
          }}>
          <h3 className="select__text">
            {withParams
              ? helperFuncs.modifyFirstChar(name)
              : value || helperFuncs.modifyFirstChar(name)}
          </h3>
          {!isDisabled && (isOpen ? <ArrowTop /> : <ArrowDown />)}
          <ul className={classNames('select__list', { 'select__list--is-visible': isOpen })}>
            {values.map((item) => (
              <li className="select__list-item" key={uuid()}>
                <button className="select__button" onClick={() => handleChange(item)}>
                  <h3 className="select__text">{helperFuncs.modifyFirstChar(item)}</h3>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {isOpen && <span className="select__mask" onClick={() => setIsOpen(false)} />}
      </div>
    );
  }
);

SelectComponent.displayName = 'SelectComponent';
