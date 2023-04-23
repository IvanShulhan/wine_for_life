import classNames from 'classnames';
import { TitleComponent } from '../title';
import './info.scss';

interface IProps {
  isSuccess?: boolean;
}

export const InfoComponent: React.FC<IProps> = ({ isSuccess = true }) => (
  <div className="info">
    <div className={classNames('info__content', { 'info__content--is-success': isSuccess })}>
      <TitleComponent
        title={isSuccess ? 'Your request has been completed successfully!' : 'Request failed!'}
        isThin={true}
      />
    </div>
  </div>
);
