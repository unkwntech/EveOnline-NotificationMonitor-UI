import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import {
    Button,
    Datagrid,
    DateField,
    List,
    ReferenceField,
    TextField,
} from "react-admin";

export const NotificationList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <DateField source="timestamp" />
            <TextField source="type" />
            <ReferenceField
                source="notificationSource.userID"
                reference="users"
                label="Source"
            >
                <TextField source="characters[0].name" />
            </ReferenceField>
            <TextField source="text" />
            <Button label="Replay" children={<ReplayOutlinedIcon />} />
        </Datagrid>
    </List>
);
