import { navigate } from "@reach/router";

export const getCookie = (cname: string) => {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

export const setCookie = (cookieName: string, cookieValue: string, expireDays: number) => {
    const date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    return document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

export const getSortedData = (array: any, key: string, direction: number) => {
    return array.sort((a: any, b: any) => {
        if(a[key] < b[key]) return -1 * direction;
        if(a[key] > b[key]) return direction;
        return 0;
    })
};

export const signOut = () => {
    const accessToken = getCookie('access_token');
    if (accessToken) setCookie('access_token', '', 0);
    navigate('/login');
};
