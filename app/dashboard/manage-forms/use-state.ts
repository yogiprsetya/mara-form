import { create } from 'zustand';
import { FormsType } from '~/model/types/forms';
import { devtools } from 'zustand/middleware';

type State = {
  form?: FormsType;

  isDeleteModalOpen: boolean;
  openDeleteModal: (form: FormsType) => void;
  closeDeleteModal: () => void;

  isEditModalOpen: boolean;
  openEditModal: (form: FormsType) => void;
  closeEditModal: () => void;
};

export const useManageFormState = create<State>()(
  devtools((set) => ({
    isDeleteModalOpen: false,
    openDeleteModal: (form) => set(() => ({ isDeleteModalOpen: true, form })),
    closeDeleteModal: () => set(() => ({ isDeleteModalOpen: false, form: undefined })),

    isEditModalOpen: false,
    openEditModal: (form) => set(() => ({ isEditModalOpen: true, form })),
    closeEditModal: () => set(() => ({ isEditModalOpen: false, form: undefined }))
  }))
);
