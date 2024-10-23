'use server'
import { api } from "../axios";

export interface LoginProps {
    cpf: string;
    password: string
}

export const LoginAuth = async (formdata: FormData) => {

    try {

        const response = await api.post('api/login', formdata);

        return {
            status: true,
            message: response.data.message,
            token: response.data.token,
            user: response.data.user,
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