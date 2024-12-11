import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import authProvider from "./authProvider";
import { dataProvider } from "./dataProvider";
import { NotificationList } from "./objects/notifications.object";
import { CharacterList } from "./objects/users.object";

export const PostToken = (foo: any): Promise<string> => {
    fetch(`${import.meta.env.VITE_JSON_SERVER_URL}/tokens/`, {
        method: "POST",
        body: JSON.stringify({ code: foo }),
        headers: {
            Authentication: `bearer ${window.localStorage.getItem("JWT")}`,
            "Content-Type": "application/JSON",
        },
    })
        .then((res) => res.json())
        .then(
            (result) => {
                console.log(`result ${result}`);
            },
            (error) => {
                console.log(`error ${error}`);
            }
        );
    return Promise.resolve("foobar");
};

export const App = () => {
    return (
        <Admin
            layout={Layout}
            dataProvider={dataProvider}
            authProvider={authProvider}
        >
            <Resource
                name="characters"
                list={CharacterList}
                icon={PersonOutlineOutlinedIcon}
            />
            <Resource
                name="notifications"
                list={NotificationList}
                icon={NotificationImportantOutlinedIcon}
            />
        </Admin>
    );
};
