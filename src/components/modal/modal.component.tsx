import './modal.scss';

interface IProps {
  children: JSX.Element;
}

export const ModalComponent: React.FC<IProps> = ({ children }) => (
  <div className="modal">{children}</div>
);
