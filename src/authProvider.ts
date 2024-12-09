import { AuthProvider } from "react-admin";

const newGuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
};

const cleanup = () => {
    // Remove the ?code&state from the URL
    window.history.replaceState(
        {},
        window.document.title,
        window.location.origin
    );
};

const SCOPES = [
    "esi-characters.read_notifications.v1",
    "esi-corporations.read_structures.v1",
    "esi-search.search_structures.v1",
    "esi-universe.read_structures.v1",
];

export const authProvider: AuthProvider = {
    login: () => Promise.resolve(),
    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        if (!localStorage.getItem("user") || !localStorage.getItem("jwt")) {
            //redirect to oauth flow
            window.location.assign(
                `https://login.eveonline.com/v2/oauth/authorize/?response_type=code&state=${newGuid()}&client_id=91407ce2465e47a2b0d3844fa801f15c&redirect_uri=http://localhost:5173/%23/auth-callback&scopes=${SCOPES.join("%20")}`
            );
            return Promise.reject();
        }

        // let jwt = jwtDecode(localStorage.getItem("jwt") ?? "");

        // if (jwt.exp ?? 0 <= Date.now()) {
        //     Promise.reject();
        // }

        return Promise.resolve();
    },
    async handleCallback() {
        const params = new URLSearchParams(window.location.search);
        if (!params.has("code") && !params.has("state")) {
            cleanup();
            throw new Error("Invalid Callback");
        }

        //send code to api and get JWT in response
        await fetch(
            `http://localhost:3333/api/oauth/callback/?code=${params.get("code")}`
        )
            .then((res) => res.json())
            .then((res: any) => {
                console.log(res);
                localStorage.setItem("jwt", res.jwt);
                localStorage.setItem("user", JSON.stringify(res.user));
                cleanup();
                Promise.resolve();
            });
    },
    getPermissions: () => {
        return Promise.resolve(undefined);
    },
    getIdentity: () => {
        const persistedUser = localStorage.getItem("user");
        const user = persistedUser ? JSON.parse(persistedUser) : null;

        return Promise.resolve(user);
    },
};

export default authProvider;
