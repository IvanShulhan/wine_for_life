import React from 'react';
import './description-item.scss';
import helperFuncs from '../../common/utils/helper.funcs';

interface IProps {
  name: string;
  text: string | number;
}

export const DescriptionItemComponent: React.FC<IProps> = React.memo(({ name, text }) => (
  <div className="description-item">
    <div className="description-item__name">{name}</div>
    <div className="description-item__text">{helperFuncs.modifyFirstChar(`${text}`)}</div>
  </div>
));

DescriptionItemComponent.displayName = 'DescriptionItemComponent';
