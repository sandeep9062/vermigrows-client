import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE ;

export const api = axios.create({
    baseURL,
});

export function withAuth(token?: string) {
    return axios.create({
        baseURL,
        headers: token
            ? {
                Authorization: `Bearer ${token}`,
            }
            : undefined,
    });
}


