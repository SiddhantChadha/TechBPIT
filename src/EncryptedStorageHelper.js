import EncryptedStorage from 'react-native-encrypted-storage';

export function setAuthTokens(accessToken, refreshToken) {
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
}

export async function setAccessToken(accessToken) {
    try {
        await EncryptedStorage.setItem(
            "access_token",
            accessToken
        );
    } catch (error) {
    }
}

export async function setRefreshToken(refreshToken) {
    try {
        await EncryptedStorage.setItem(
            "refresh_token",
             refreshToken
        );
    } catch (error) {
    }
}

export async function getAccessToken() {
    try {   
        const accessToken = await EncryptedStorage.getItem("access_token");
        console.log(accessToken)

        if (accessToken !== undefined) {
            return accessToken
        }
    } catch (error) {
    }
    return null
}

export async function getRefreshToken() {
    try {   
        const refreshToken = await EncryptedStorage.getItem("refresh_token");
    
        if (refreshToken !== undefined) {
            return refreshToken
        }
    } catch (error) {
    }
}