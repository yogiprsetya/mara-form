import { Ellipsis } from 'lucide-react';
import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { FormsType } from '~/model/types/forms';
import { useManageFormState } from './use-state';

export const FormCardMenu: FC<FormsType> = (props) => {
  const { openDeleteModal } = useManageFormState();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="text-primary" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <a href={`/dashboard/form-builder/${props.id}`}>Edit</a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive" onClick={() => openDeleteModal(props)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
