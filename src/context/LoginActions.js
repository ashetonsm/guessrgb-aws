export const signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
        setUser(newUser);
        callback();
    });
};
export const signout = (callback) => {
    return fakeAuthProvider.signout(() => {
        setUser(null);
        callback();
    });
};