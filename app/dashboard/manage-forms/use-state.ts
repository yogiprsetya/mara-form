import { create } from 'zustand';
import { Forms } from '~/model/types/forms';
import { devtools } from 'zustand/middleware';

type State = {
  form?: Forms;

  isDeleteModalOpen: boolean;
  openDeleteModal: (form: Forms) => void;
  closeDeleteModal: () => void;
};

export const useProductState = create<State>()(
  devtools((set) => ({
    isDeleteModalOpen: false,
    openDeleteModal: (product) => set(() => ({ isDeleteModalOpen: true, product })),
    closeDeleteModal: () => set(() => ({ isDeleteModalOpen: false, product: undefined }))
  }))
);
