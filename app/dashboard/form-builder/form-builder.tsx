'use client';

import { FC } from 'react';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { useForm } from 'react-hook-form';
// import { useFormsId } from '~/services/use-forms-id';
import { createInsertSchema } from 'drizzle-zod';
import { questions } from '~/model/schema/questions';
import { CreateQuestionsType } from '~/model/types/questions';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FieldCreator } from './field-creator';
import { Input } from '~/components/ui/input';

type Props = {
  id: string;
};

const schema = createInsertSchema(questions, {
  options: z.any().optional()
});

export const FormBuilder: FC<Props> = ({ id }) => {
  // const { data } = useFormsId({ id });

  const form = useForm<CreateQuestionsType>({
    resolver: zodResolver(schema),
    defaultValues: {
      formId: id
    }
  });

  const onSubmit = (values: CreateQuestionsType) => {
    // createNewForms(values);
  };

  return (
    <div className="relative flex w-full gap-10">
      <main className="w-full">
        <header className="flex justify-end items-center mb-6">
          <Button>Publish</Button>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Form title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </main>

      <FieldCreator />
    </div>
  );
};
