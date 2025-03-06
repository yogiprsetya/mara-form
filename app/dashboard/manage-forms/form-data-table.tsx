'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { FormsType } from '~/model/types/forms';
import { useFormsData } from '~/services/use-forms-data';
import { FormCardMenu } from './form-card-menu';
import { Card } from '~/components/ui/card';
import { Searchbar } from '~/components/pattern/Searchbar';
import { Loading } from '~/components/ui/loading';
import { If } from '~/components/ui/if';
import { Boxes, Newspaper } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useManageFormState } from './use-state';
import { ModalDeleteForms } from './modal-delete-forms';
import { ModalEditForms } from './modal-edit-forms';

export const FormsDataTable = () => {
  const { data, setSearchKeyword, isLoading } = useFormsData();
  const state = useManageFormState();

  const columns: ColumnDef<FormsType>[] = useMemo(
    () => [
      {
        header: 'Title',
        accessorKey: 'title'
      },
      {
        header: 'Description',
        accessorKey: 'description'
      },
      {
        header: 'Menu',
        accessorKey: 'menu',
        cell: ({ row }) => <FormCardMenu {...row.original} />
      }
    ],
    []
  );

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div>
      <div className="flex justify-center mb-8 items-center gap-4">
        <Searchbar className="w-72" onChange={setSearchKeyword} />

        <Button asChild size="sm">
          <a href="/dashboard/create-forms">
            <Newspaper />
            Create Forms
          </a>
        </Button>
      </div>

      {isLoading ? (
        <Loading className="size-6 mx-auto" />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <If
            condition={table.getRowModel().rows?.length}
            fallback="Data form is empty, please create."
          >
            {table.getRowModel().rows.map((row) => {
              const cellMenu = row.getVisibleCells().find((cell) => cell.column.id === 'menu');
              const menuEl = cellMenu
                ? flexRender(cellMenu.column.columnDef.cell, cellMenu.getContext())
                : null;

              return (
                <Card key={row.original.id} className="flex h-24">
                  <div className="w-20 shrink-0 bg-secondary flex justify-center items-center rounded-l-lg">
                    <Boxes className="text-primary size-8" />
                  </div>

                  <div className="h-full grow overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-center gap-2">
                        <h3 className="font-semibold truncate" title={row.original.title}>
                          {row.original.title}
                        </h3>

                        {menuEl}
                      </div>

                      <If condition={row.original.description}>
                        <p className="text-sm text-muted-foreground mt-1">
                          {row.original.description}
                        </p>
                      </If>
                    </div>
                  </div>
                </Card>
              );
            })}
          </If>
        </div>
      )}

      <ModalDeleteForms
        open={state.isDeleteModalOpen}
        onOpenChange={state.closeDeleteModal}
        data={state.form}
      />

      <ModalEditForms
        open={state.isEditModalOpen}
        onOpenChange={state.closeEditModal}
        data={state.form}
      />
    </div>
  );
};
