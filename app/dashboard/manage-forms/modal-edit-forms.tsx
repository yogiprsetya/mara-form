import { ComponentPropsWithoutRef, FC, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';
import { CreateFormsType, type FormsType } from '~/model/types/forms';
import { useManageFormState } from './use-state';
import { useFormsAction } from '~/services/use-forms-action';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createInsertSchema } from 'drizzle-zod';
import { useForm } from 'react-hook-form';
import { forms } from '~/model/schema/forms';
import { Textarea } from '~/components/ui/textarea';
import { Input } from '~/components/ui/input';

type DialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children'>;

type Props = DialogProps & {
  data?: FormsType;
};

const schema = createInsertSchema(forms).pick({ title: true, description: true });

export const ModalEditForms: FC<Props> = ({ data, ...props }) => {
  const { closeEditModal } = useManageFormState();
  const { updateDataForms, isMutating } = useFormsAction();

  const form = useForm<CreateFormsType>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: CreateFormsType) => {
    const res = await updateDataForms({ id: data?.id ?? '', ...values });

    if (res.success) {
      form.reset(values);
    }
  };

  useEffect(() => {
    form.reset(data);
  }, [data, form]);

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete form</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="edit-forms" className="space-y-4">
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
          </form>
        </Form>

        <DialogFooter>
          <Button variant="secondary" onClick={closeEditModal} disabled={isMutating}>
            Close
          </Button>

          <Button type="submit" form="edit-forms" disabled={isMutating || !form.formState.isDirty}>
            {isMutating ? 'Update in progress...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
