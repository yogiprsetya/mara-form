import { FC, HTMLAttributes } from 'react';
import { QuestionType } from '~/model/types/questions';
import { TypeIcons } from './type-icon';

const ButtonFieldSelect: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
  <div
    role="button"
    onClick={props.onClick}
    className="flex items-center justify-center border rounded-md p-4 text-primary hover:text-foreground bg-background hover:bg-secondary"
  >
    {props.children}
  </div>
);

type FieldCreatorProps = {
  onAdd: (v: { label: string; type: QuestionType; required: boolean }) => void;
};

export const FieldCreator: FC<FieldCreatorProps> = ({ onAdd }) => {
  return (
    <div className="w-96 overflow-hidden h-full">
      <h3 className="mb-4 font-medium">Need a field?</h3>

      <div className="grid grid-cols-2 gap-2">
        {Object.entries(TypeIcons).map(([type, Icon]) => (
          <ButtonFieldSelect
            key={type}
            onClick={() =>
              onAdd({ label: 'Name for a field', type: type as QuestionType, required: false })
            }
          >
            <Icon className="size-8" />
          </ButtonFieldSelect>
        ))}
      </div>
    </div>
  );
};
