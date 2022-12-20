import axios from 'axios';
import { parseCookies } from 'nookies';

const {nlwcopaToken} = parseCookies();

export const api = axios.create({
    baseURL: "http://localhost:3333"
});

if (nlwcopaToken) {
    api.defaults.headers['Authorization'] = `Bearer ${nlwcopaToken}`
}