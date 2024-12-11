import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import {
    ArrayInput,
    BooleanField,
    Button,
    Create,
    Datagrid,
    DeleteButton,
    Edit,
    List,
    ReferenceInput,
    SelectArrayInput,
    Show,
    SimpleForm,
    SimpleFormIterator,
    TextField,
    TextInput,
    TopToolbar,
    useRecordContext,
} from "react-admin";

const redirectOauth = () =>
    window.location.assign(
        "https://login.eveonline.com/v2/oauth/authorize?response_type=code&client_id=91407ce2465e47a2b0d3844fa801f15c&redirect_uri=https://notifs.ibns.tech/%23/auth-callback&scope=esi-search.search_structures.v1 esi-universe.read_structures.v1 esi-corporations.read_structures.v1 esi-characters.read_notifications.v1&state=asdf123".replace(
            " ",
            "%20"
        )
    );

const CreateMenuItemButton = () => (
    <Button
        resource="character"
        label="Add"
        children={<PersonAddAltOutlinedIcon />}
        onClick={redirectOauth}
    />
);

const MenuItemActions = () => (
    <TopToolbar>
        <CreateMenuItemButton />
    </TopToolbar>
);

export const CharacterList = () => (
    <List actions={<MenuItemActions />}>
        <Datagrid>
            <TextField source="name" />
            <BooleanField source="isMain" label="Main" />
            <DeleteButton />
        </Datagrid>
    </List>
);

const CharList = () => {
    const record = useRecordContext();
    if (!record) return "No Characters Found";
    console.log(record.characters);
    return (
        <ul>
            {record.characters.map((char: any) => {
                <li>{char.name}</li>;
            })}
        </ul>
    );
};

export const UserShow = () => (
    <Show>
        <CharList></CharList>
    </Show>
);

export const UserCreate = () => {
    <Create>
        <SimpleForm>
            <ReferenceInput source="id" reference="users" />
            <TextInput source="characterName" />
        </SimpleForm>
    </Create>;
};

export const InterestCreate = () => {
    <Create>
        <SimpleForm>
            <ReferenceInput source="id" reference="users" />
            <TextInput source="webhook" />
            <SelectArrayInput
                source="interests"
                choices={[
                    {
                        id: "esi-alliances.read_contacts.v1",
                        name: "Alliance Contracts",
                    },
                ]}
            ></SelectArrayInput>
        </SimpleForm>
    </Create>;
};

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <ArrayInput source="interests">
                <SimpleFormIterator>
                    <TextInput source="notificationType" />
                    <TextInput source="targetWebhook" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);
