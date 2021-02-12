import {
  FC,
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { UserInterface } from '../StateInterface';

interface ModalContextInterface {
  userState: [
    UserInterface | undefined,
    Dispatch<SetStateAction<UserInterface | undefined>>,
  ];
  modalState: [boolean, Dispatch<SetStateAction<boolean>>];
}

const ModalContext = createContext<ModalContextInterface>({
  userState: [undefined, (state) => state],
  modalState: [false, (state) => state],
});

const UserModalProvider: FC = ({ children }) => {
  const userState = useState<UserInterface>();
  const modalState = useState(false);

  return (
    <ModalContext.Provider
      value={{
        userState,
        modalState,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useUserModalContext = (): ModalContextInterface => {
  const state = useContext(ModalContext);
  if (state === undefined) {
    throw new Error('useContextState must be used within a Provider');
  }

  return state;
};

const useModal = (): {
  closeModal: () => void;
  openModal: () => void;
  setUser: (user: UserInterface) => void;
} => {
  const {
    userState: [, setUser],
    modalState: [, setIsModalOpen],
  } = useUserModalContext();

  return {
    closeModal: () => setIsModalOpen(false),
    openModal: () => setIsModalOpen(true),
    setUser,
  };
};

export { useUserModalContext, useModal };

export default UserModalProvider;