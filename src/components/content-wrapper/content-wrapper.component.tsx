import React, { useEffect, useState } from 'react';
import { ModalComponent } from '../modal';
import { LoaderComponent } from '../loader';
import { InfoComponent } from '../info';

interface IProps {
  children?: JSX.Element;
  status: 'idle' | 'loading' | 'failed' | 'success';
}

export const ContentWrapperComponent: React.FC<IProps> = React.memo(({ children, status }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setIsOpenModal(true);

    const timerId = setTimeout(() => {
      setIsOpenModal(false);
    }, 1500);

    return () => {
      clearTimeout(timerId);
    };
  }, [status]);

  return (
    <>
      {isOpenModal && status !== 'idle' ? (
        <ModalComponent>
          <>
            {status === 'loading' && <LoaderComponent />}
            {status === 'failed' && <InfoComponent isSuccess={false} />}
            {status === 'success' && <InfoComponent />}
          </>
        </ModalComponent>
      ) : (
        <>{children}</>
      )}
    </>
  );
});

ContentWrapperComponent.displayName = 'ContentWrapperComponent';
