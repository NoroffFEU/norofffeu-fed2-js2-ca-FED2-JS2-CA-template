export function onLogout(api) {
    return async function(){
        await api.auth.logout();
    }
}

