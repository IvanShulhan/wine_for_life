import { TitleComponent } from '../title';
import './success.scss';

export const SuccessComponent = () => (
  <div className="success">
    <div className="success__content">
      <TitleComponent title="Your request has been completed successfully!" isThin={true} />
    </div>
  </div>
);
