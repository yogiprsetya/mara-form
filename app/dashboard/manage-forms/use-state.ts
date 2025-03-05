import { create } from 'zustand';
import { FormsType } from '~/model/types/forms';
import { devtools } from 'zustand/middleware';

type State = {
  form?: FormsType;

  isDeleteModalOpen: boolean;
  openDeleteModal: (form: FormsType) => void;
  closeDeleteModal: () => void;
};

export const useManageFormState = create<State>()(
  devtools((set) => ({
    isDeleteModalOpen: false,
    openDeleteModal: (form) => set(() => ({ isDeleteModalOpen: true, form })),
    closeDeleteModal: () => set(() => ({ isDeleteModalOpen: false, form: undefined }))
  }))
);
