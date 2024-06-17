export const helpStatus = (userStatus:any) => {
    return userStatus === 'admin' || userStatus === 'editor'? false : true
}