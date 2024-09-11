import { ArrayField, BooleanField, ChipField, Datagrid, DateField, List, NumberField, ReferenceArrayField, SingleFieldList, TextField } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid>
            <DateField source="createdOn" />
            <NumberField source="createdBy" />
            <TextField source="updates" />
            <TextField source="id" />
            <ReferenceArrayField label="# Tokens" reference='tokens' source='tokens'></ReferenceArrayField>
            <ArrayField source="interests"><SingleFieldList><ChipField source="notificationType" /></SingleFieldList></ArrayField>
            <BooleanField source="deleted" />
        </Datagrid>
    </List>
);