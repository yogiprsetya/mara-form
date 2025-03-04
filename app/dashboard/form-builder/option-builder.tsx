import { Dot, X } from 'lucide-react';
import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { If } from '~/components/ui/if';
import { CreateQuestionsType } from '~/model/types/questions';

type Props = {
  optionIndex: number;
};

export const OptionBuilder: FC<Props> = ({ optionIndex }) => {
  const { control, watch, formState } = useFormContext<CreateQuestionsType>();

  const optionErrors = formState.errors.questions?.[optionIndex];

  return (
    <If
      condition={
        watch(`questions.${optionIndex}.type`) === 'radio' ||
        watch(`questions.${optionIndex}.type`) === 'checkbox'
      }
    >
      <Controller
        control={control}
        name={`questions.${optionIndex}.options`}
        render={({ field }) => (
          <div className="w-6/12 flex flex-col ml-2">
            {field.value?.length ? (
              <div className="space-y-1 mb-4">
                {field.value.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex gap-2 items-center">
                    <Dot />

                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(field.value ?? [])];
                        newOptions[optionIndex] = e.target.value;
                        console.log('Option index:', newOptions);
                        field.onChange(newOptions);
                      }}
                      className="border-b h-10 focus-visible:outline-none w-full"
                    />

                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        const newOptions = field.value?.filter((_, i) => i !== optionIndex);
                        field.onChange(newOptions);
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <If
                condition={optionErrors}
                fallback={<p className="text-xs text-muted-foreground">Add at least two option</p>}
              >
                {(e) => <p className="text-xs text-destructive">{e.message}</p>}
              </If>
            )}

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => field.onChange([...(field.value || []), ''])}
              className="ml-auto"
            >
              Add option
            </Button>
          </div>
        )}
      />
    </If>
  );
};
