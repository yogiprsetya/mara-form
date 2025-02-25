import { Type, FileDigit } from 'lucide-react';
import { FC, ReactNode } from 'react';

const ButtonFieldSelect: FC<{ children: ReactNode }> = (props) => (
  <div
    role="button"
    className="flex items-center justify-center p-4 text-primary hover:text-foreground bg-background hover:bg-foreground/10"
  >
    {props.children}
  </div>
);

export const FieldCreator = () => {
  return (
    <div className=" rounded-md bg-secondary w-96 overflow-hidden">
      <div className="grid grid-cols-2 gap-2 p-6">
        <ButtonFieldSelect>
          <Type className="size-8" />
        </ButtonFieldSelect>

        <ButtonFieldSelect>
          <FileDigit className="size-8" />
        </ButtonFieldSelect>
      </div>
    </div>
  );
};
