import { createContext, useContext } from 'react';

type ModalCtx = { openReserve: () => void };

export const ModalContext = createContext<ModalCtx>({ openReserve: () => {} });

export const useModal = () => useContext(ModalContext);
