import classNames from 'classnames';
import './title.scss';

type Props = {
  title: string;
  isThin?: boolean;
  isWhite?: boolean;
  isLarge?: boolean;
};

export const TitleComponent: React.FC<Props> = ({
  title,
  isThin = false,
  isWhite = false,
  isLarge = false
}) => (
  <h2
    className={classNames('title', {
      'title--is-thin': isThin,
      'title--is-white': isWhite,
      'title--is-large': isLarge
    })}>
    {title}
  </h2>
);
