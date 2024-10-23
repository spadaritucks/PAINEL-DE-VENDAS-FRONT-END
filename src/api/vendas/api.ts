'use server'

import { api } from "../axios"

 export interface VendasProps {
    id:number
    cliente_id: number;
    vendedor_id: number;
    valor_integral: number
    parcelas: number
    created_at: string;
}

export const getVendas= async () => {
    try {
        const response = await api.get('/api/vendas');

        return response.data.vendas
    } catch (error: any) {
        console.error('Falha ao consultar as vendas' + error)
        return []

    }
}

export const createVendas= async (formdata: FormData) => {

    try {
        const response = await api.post('/api/vendas', formdata);

        return {
            status: true,
            message: response.data.message,
            venda: response.data.venda
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

export const updateVendas= async (id: number, formdata: FormData) => {

    try {
        const response = await api.post(`/api/vendas/${id}?_method=PUT`, formdata);

        return {
            status: true,
            message: response.data.message,
            venda: response.data.venda
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


export const deleteVendas= async (id: number) => {
    try {
        const response = await api.delete(`/api/vendas/${id}`);

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