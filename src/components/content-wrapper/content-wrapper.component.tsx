import React, { useEffect, useState } from 'react';
import { ModalComponent } from '../modal';
import { LoaderComponent } from '../loader';
import { InfoComponent } from '../info';

interface IProps {
  children: JSX.Element;
  status: 'idle' | 'loading' | 'failed';
}

export const ContentWrapperComponent: React.FC<IProps> = React.memo(({ children, status }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (status !== 'idle') {
      setIsOpenModal(true);
    }

    const timerId = setTimeout(() => {
      setIsOpenModal(false);
    }, 1500);

    return () => {
      clearTimeout(timerId);
    };
  }, [status]);

  return (
    <>
      {isOpenModal ? (
        <ModalComponent>
          {status === 'loading' ? (
            <LoaderComponent />
          ) : (
            <InfoComponent isSuccess={status === 'idle'} />
          )}
        </ModalComponent>
      ) : (
        <>{children}</>
      )}
    </>
  );
});

ContentWrapperComponent.displayName = 'ContentWrapperComponent';
