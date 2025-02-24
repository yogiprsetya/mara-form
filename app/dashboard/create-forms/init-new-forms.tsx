'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateFormsType } from '~/model/types/forms';
import { createInsertSchema } from 'drizzle-zod';
import { forms } from '~/model/schema/forms';
import { useFormsAction } from '~/services/use-forms-action';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';

const schema = createInsertSchema(forms).omit({ userId: true });

export const InitNewForms = () => {
  const { createNewForms } = useFormsAction();

  const form = useForm<CreateFormsType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const onSubmit = (values: CreateFormsType) => {
    createNewForms(values);
  };

  return (
    <div className="w-[500px] mx-auto">
      <h1 className="mb-4 text-2xl font-semibold text-center">Start New Forms</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="manage-product" className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Form title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about this form"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit">Let&apos;s Build a Form</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
