import { base_url } from "./constant";

function getAccessToken(): string | null {
    return localStorage.getItem('access_token');
}

function putAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
}


export interface ApiResponse<T = null> {
    error: boolean;
    data?: T;
    message?: string;
}

export interface RegisterPayload{
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload{
    email: string;
    password: string;
}

export interface User{
    id: string;
    name: string; 
    email: string;
}

export interface NotePayload{
    title: string;
    body: string;
}

export interface Note{
    id: string;
    title: string;
    body: string;
    owner: string;
    archived: boolean;
    createdAt: string;
}

async function fetchWithToken(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
}

// AUTH
async function register(registerPayload: RegisterPayload): Promise<ApiResponse> {
    const response = await fetch(`${base_url}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerPayload),
    });
    const responseJson = await response.json();

    if(responseJson.status !== 'success'){
        return {
            error: false,
            message: responseJson.message,
            data: null,
        };
    }
    return {error: false, message: responseJson.message, data: null};
}

async function login(loginPayload: LoginPayload): Promise<ApiResponse<{accessToken: string}>> {
    const response = await fetch(`${base_url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
    });
    const responseJson = await response.json();

    if(responseJson.status !== 'success'){
        return {
            error: true,
            message: responseJson.message,
        };
    }
    return {error: false, message: responseJson.message, data: responseJson.data};
}

async function getProfile(): Promise<ApiResponse<User>>{
    const response = await fetchWithToken(`${base_url}/users/me`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success'){
        return {error: true, message: responseJson.message};
    }
    return { error: false, message: responseJson.message, data: responseJson.data};
}

// NOTES

async function addNotes(notePayload: NotePayload): Promise<ApiResponse>{
    const response = await fetchWithToken(`${base_url}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notePayload),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success'){
        return {error: true, message: responseJson.message, data: null}
    }
    return {error: false, message: responseJson.message, data: responseJson.data};
}

async function getNotes(): Promise<ApiResponse<Note[]>>{ 
    const response = await fetchWithToken(`${base_url}/notes`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success'){
        return {error: true, message: responseJson.message};
    }
    return {error: false, message: responseJson.message, data: responseJson.data};
}

async function getArchivedNotes(): Promise<ApiResponse<Note[]>>{
    const response = await fetchWithToken(`${base_url}/notes/archived`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success'){
        return {error: true, message: responseJson.message, data: []};
    }

    return {error: false, message: responseJson.message, data: responseJson.data};
}

async function getSingleNotes(id: string): Promise<ApiResponse<Note>>{
    const response = await fetchWithToken(`${base_url}/notes/${id}`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success'){
        return {error: true, message: responseJson.message};
    }
    return {error: false, message: responseJson.messsage, data: responseJson.data};
}

async function archivedNote(id: string): Promise<ApiResponse> {
    const response = await fetchWithToken(`${base_url}/notes/${id}/archive`, {
        method: 'POST',
    });
    const responseJson = await response.json();
    if(responseJson.status !== 'success'){
        return {error: true, message: responseJson.message};
    }
    return {error: false, message: responseJson.message};
}

async function unArchivedNote(id: string): Promise<ApiResponse> {
    const response = await fetchWithToken(`${base_url}/notes/${id}/unarchive`, {
        method: 'POST',
    });
    const responseJson = await response.json();
    if(responseJson.status !== 'success'){
        return {error: true, message: responseJson.message};
    }
    return {error: false, message: responseJson.message};
}

async function deleteNote(id: string): Promise<ApiResponse>{
    const response = await fetchWithToken(`${base_url}/notes/${id}`, {
        method: 'DELETE',
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success'){
        return {error: true, message: responseJson.message};
    }
    return {error: false, message: responseJson.message};
}

export {
    getAccessToken,
    putAccessToken,
    register,
    login,
    getProfile,
    addNotes,
    getNotes,
    getArchivedNotes,
    getSingleNotes,
    archivedNote,
    unArchivedNote,
    deleteNote,
}