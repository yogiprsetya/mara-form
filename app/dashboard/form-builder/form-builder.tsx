'use client';

import { FC, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form';
import { useFieldArray, useForm } from 'react-hook-form';
import { useFormsId } from '~/services/use-forms-id';
import { CreateQuestionsType } from '~/model/types/questions';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FieldCreator } from './field-creator';
import { GripVertical, Trash } from 'lucide-react';
import { Checkbox } from '~/components/ui/checkbox';
import { TypeIcons } from './type-icon';
import { OptionBuilder } from './option-builder';
import { useFormsAction } from '~/services/use-forms-action';

type Props = {
  id: string;
};

const questions = z
  .object({
    type: z.enum(['number', 'text', 'radio', 'checkbox']),
    label: z.string().nonempty(),
    required: z.boolean(),
    options: z.array(z.string()).optional()
  })
  .superRefine((value, ctx) => {
    if (!value.options && (value.type === 'radio' || value.type === 'checkbox')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Options are required for `radio` and `checklist` types.'
      });
    }
  });

const schema = z.object({
  formId: z.string(),
  questions: z.array(questions)
});

export const FormBuilder: FC<Props> = ({ id }) => {
  const { data } = useFormsId({ id });
  const { formBuilder, isMutating } = useFormsAction();

  const form = useForm<CreateQuestionsType>({
    resolver: zodResolver(schema)
  });

  const question = useFieldArray({
    control: form.control,
    name: 'questions'
  });

  const onSubmit = (values: CreateQuestionsType) => {
    formBuilder(values);
  };
  console.log(form.formState.errors);
  useEffect(() => {
    if (data?.data.questions) {
      form.reset({
        formId: id,
        questions: data.data.questions.map((q) => ({
          type: q.type,
          label: q.label,
          required: q.required,
          options: Array.isArray(q.options) ? q.options.map(String) : undefined
        }))
      });
    }
  }, [data?.data.questions, form, id]);

  return (
    <div className="relative flex w-full max-w-5xl mx-auto gap-10">
      <main className="w-full">
        <header className="flex justify-end items-center mb-6">
          <Button form="build-form" type="submit" disabled={isMutating}>
            {isMutating ? 'Loading' : 'Publish'}
          </Button>
        </header>

        <div className="bg-background rounded-md border">
          <div className="h-20 px-6 w-full rounded-lg flex items-center text-2xl font-semibold leading-none tracking-tight">
            {data?.data.title}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="build-form">
              {question.fields.map((field, index) => {
                const Icon = TypeIcons[field.type];

                return (
                  <div key={field.id} className="px-4 border-b py-5 last:mb-8">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <GripVertical className="size-4 mr-4" />

                        <Icon className="size-4 mr-2 text-primary" />

                        <FormField
                          control={form.control}
                          name={`questions.${index}.label`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <input
                                  className="focus-visible:border-b focus-visible:outline-none"
                                  placeholder="Field label"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex items-center">
                        <FormField
                          control={form.control}
                          name={`questions.${index}.required`}
                          render={({ field }) => (
                            <FormItem className="space-y-0 flex items-center gap-1 mr-4">
                              <FormLabel className="text-muted-foreground text-xs">
                                Required?
                              </FormLabel>

                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => question.remove(index)}
                          aria-label="Delete row"
                        >
                          <Trash />
                        </Button>
                      </div>

                      <input
                        type="hidden"
                        {...form.register(`questions.${index}.type`)}
                        value={field.type}
                      />
                    </div>

                    <OptionBuilder optionIndex={index} />
                  </div>
                );
              })}
            </form>
          </Form>
        </div>
      </main>

      <FieldCreator onAdd={question.append} />
    </div>
  );
};
