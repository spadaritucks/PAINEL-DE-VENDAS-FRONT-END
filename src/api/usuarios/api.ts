'use server'

import { api } from "../axios"

export interface UsuariosProps {
    id:number
    nome: string;
    cpf: string;
}

export const getUsuarios = async () => {
    try {
        const response = await api.get('/api/usuarios');

        return response.data.usuarios
    } catch (error: any) {
        console.error('Falha ao consultar os usuarios ' + error)
        return []

    }
}

export const createUsuarios = async (formdata: FormData) => {

    try {
        const response = await api.post('/api/usuarios', formdata);

        return {
            status: true,
            message: response.data.message,
            usuario: response.data.usuario
        }

    } catch (error: any) {

        if (error.response && error.response.data && error.response.data.message) {
            return {
                status: false,
                message: error.response.data.message
            };
        }

    }
}

export const updateUsuarios = async (id: number, formdata: FormData) => {

    try {
        const response = await api.post(`/api/usuarios/${id}?_method=PUT`, formdata);

        return {
            status: true,
            message: response.data.message,
            usuario: response.data.usuario
        }

    } catch (error: any) {

        if (error.response && error.response.data && error.response.data.message) {
            return {
                status: false,
                message: error.response.data.message
            };
        }

    }
}


export const deleteUsuarios = async (id: number) => {
    try {
        const response = await api.delete(`/api/usuarios/${id}`);

        return {
            status: true,
            message: response.data.message
        }

    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            return {
                status: false,
                message: error.response.data.message
            };
        }
    }
}