'use server'

import { api } from "../axios"

export interface ClientesProps {
    id:number
    nome: string;
    cpf: string;
}

export const getClientes = async () => {
    try {
        const response = await api.get('/api/clientes');

        return response.data.clientes
    } catch (error: any) {
        console.error('Falha ao consultar os clientes ' + error)
        return []

    }
}

export const createClientes = async (formdata: FormData) => {

    try {
        const response = await api.post('/api/clientes', formdata);

        return {
            status: true,
            message: response.data.message,
            cliente: response.data.cliente
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

export const updateClientes = async (id: number, formdata: FormData) => {

    try {
        const response = await api.post(`/api/clientes/${id}?_method=PUT`, formdata);

        return {
            status: true,
            message: response.data.message,
            cliente: response.data.cliente
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


export const deleteClientes = async (id: number) => {
    try {
        const response = await api.delete(`/api/clientes/${id}`);

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