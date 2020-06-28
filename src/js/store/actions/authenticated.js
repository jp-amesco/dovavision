function authenticated(accessToken, refreshToken) {
    return {
        type: 'AUTHENTICATED',
        accessToken: accessToken,
        refreshToken: refreshToken,
        isAuthenticated: true
    };
}

function logout() {
    return {
        type: 'LOGOUT'
    };
}

export {
    authenticated,
    logout
}