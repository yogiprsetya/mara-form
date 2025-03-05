import { ComponentPropsWithoutRef, FC } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';
import { type FormsType } from '~/model/types/forms';
import { useManageFormState } from './use-state';
import { useFormsAction } from '~/services/use-forms-action';

type DialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children'>;

type Props = DialogProps & {
  data?: FormsType;
};

export const ModalDeleteForms: FC<Props> = ({ data, ...props }) => {
  const { closeDeleteModal } = useManageFormState();
  const { deleteFormById, isMutating } = useFormsAction();

  if (!data) return null;

  const handleDelete = async () => {
    const res = await deleteFormById(data?.id);

    if (res) {
      closeDeleteModal();
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete form</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Are you sure you want to delete <b>{data?.title}</b>?. This action cannot be undone, and
          all fields will deleted also.
        </DialogDescription>

        <DialogFooter>
          <Button variant="secondary">Cancel</Button>

          <Button variant="destructive" disabled={isMutating} onClick={handleDelete}>
            {isMutating ? 'Loading ...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
