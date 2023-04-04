import React, { useState } from 'react';
import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrow-down.svg';
import { ReactComponent as ArrowTop } from '../../../assets/icons/arrow-top.svg';
import helperFuncs from '../../../common/utils/helper.funcs';
import './select.scss';

interface IProps {
  name: string;
  values: string[];
}

export const SelectComponent: React.FC<IProps> = React.memo(({ name, values }) => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const [filterValue, setFilterValue] = useState(searchParams.get(name) || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string) => {
    setFilterValue(value);
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="select">
      <div
        className={classNames('select__content', { 'select__content--is-open': isOpen })}
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}>
        <h3 className="select__text">{helperFuncs.modifyFirstChar(name)}</h3>
        {isOpen ? <ArrowTop /> : <ArrowDown />}
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
});

SelectComponent.displayName = 'SelectComponent';
