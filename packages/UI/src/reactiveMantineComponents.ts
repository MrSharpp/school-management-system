import { reactive } from '@legendapp/state/react';
import { Select, TextInput } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { DateInput } from '@mantine/dates';

export const TextInput$ = reactive(TextInput) as typeof TextInput;
export const DataTable$ = reactive(DataTable) as typeof DataTable;
export const Select$ = reactive(Select) as typeof Select;
export const DateInput$ = reactive(DateInput) as typeof DateInput;
