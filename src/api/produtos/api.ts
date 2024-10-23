'use server'

import { api } from "../axios"

 export interface ProdutosProps {
    id:number
    nome: string;
    valor: string;
}

export const getProdutos= async () => {
    try {
        const response = await api.get('/api/produtos');

        return response.data.produtos
    } catch (error: any) {
        console.error('Falha ao consultar os Produtos' + error)
        return []

    }
}

export const createProdutos= async (formdata: FormData) => {

    try {
        const response = await api.post('/api/produtos', formdata);

        return {
            status: true,
            message: response.data.message,
            produto: response.data.produto
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

export const updateProdutos= async (id: number, formdata: FormData) => {

    try {
        const response = await api.post(`/api/produtos/${id}?_method=PUT`, formdata);

        return {
            status: true,
            message: response.data.message,
            produto: response.data.produto
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


export const deleteProdutos= async (id: number) => {
    try {
        const response = await api.delete(`/api/produtos/${id}`);

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