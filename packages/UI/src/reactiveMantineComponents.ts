import { reactive } from '@legendapp/state/react';
import { Select, TextInput } from '@mantine/core';
import { DataTable } from 'mantine-datatable';

export const TextInput$ = reactive(TextInput) as typeof TextInput;
export const DataTable$ = reactive(DataTable) as typeof DataTable;
export const Select$ = reactive(Select) as typeof Select;