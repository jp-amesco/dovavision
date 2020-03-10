export function authenticated(accessToken, refreshToken) {
    return {
        type: 'AUTHENTICATED',
        accessToken: accessToken,
        refreshToken: refreshToken,
        isAuthenticated: true
    };
}