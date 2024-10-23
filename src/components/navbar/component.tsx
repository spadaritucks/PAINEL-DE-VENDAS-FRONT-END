'use client'

import { useRef, useState } from "react"
import Button from "../button/component"
import '@/components/navbar/component.css'
import Modal from "@/components/modal/component"
import Link from "next/link"
import Input from "@/components/input/component"
import { createUsuarios } from "@/api/usuarios/api"
import { createClientes } from "@/api/clientes/api"

interface NavbarProps {
    title: string,

}


export default function Navbar({ title }: NavbarProps) {

    const [cadastrarVendedor, setCadastrarVendedor] = useState<boolean>(false);
    const [cadastrarCliente, setCadastrarCliente] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmitVendedor = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formRef.current) {
            const formdata = new FormData(formRef.current);
            if (formdata.get('password') === formdata.get('confirm_password')) {
                formdata.delete('confirm_password')
                const response = await createUsuarios(formdata)

                if (response) {
                    if (response.status === false) {
                        alert('Erro' + response.message)
                        return
                    } else {
                        alert('Sucesso ' + response.message)
                    }
                }
            } else {
                alert('Confirme corretamente sua senha!')
            }
        }
    }

    const handleSubmitCliente = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formRef.current) {
            const formdata = new FormData(formRef.current);
            const response = await createClientes(formdata)
            if (response) {
                if (response.status === false) {
                    alert('Erro' + response.message)
                    return
                } else {
                    alert('Sucesso ' + response.message)
                }
            }
        }
    }

    const handleOpenModalCadastrarVendedor = () => {
        setCadastrarVendedor(true)
    }

    const handleOpenModalCadastrarCliente = () => {
        setCadastrarCliente(true)
    }



    return (
        <nav className="navbar-content">
            <h2>{title}</h2>
            <div className="nav-buttons">
                <Link href='/vendas'>Painel de Vendas</Link>
                <Link href='/venda-produtos'>Criar Venda</Link>
                <Button type="button" buttonName="Cadastrar Vendedor" variant="primary" onClick={() => handleOpenModalCadastrarVendedor()} disabled={cadastrarCliente} />
                <Button type="button" buttonName="Cadastrar Cliente" variant="secondary" onClick={() => handleOpenModalCadastrarCliente()} disabled={cadastrarVendedor} />
            </div>

            {
                cadastrarVendedor &&
                <Modal modalTitle="Cadastrar Vendedor"
                    modalBody={
                        <>
                            <div className="vendedor-form-content" >
                                <form onSubmit={handleSubmitVendedor} ref={formRef}>
                                    <Input label="Nome Completo" type="text" name="nome" placeholder="Nome Completo"></Input>
                                    <Input label="CPF" type="text" name="cpf"></Input>
                                    <Input label="Senha" type="password" name="password"></Input>
                                    <Input label="Confirme sua Senha" type="password" name="confirm_password"></Input>
                                    <Button type="submit" variant="primary" buttonName="Cadastrar"></Button>
                                </form>

                            </div>
                        </>
                    }
                    modalClose={() => setCadastrarVendedor(false)}

                />
            }

            {
                cadastrarCliente &&
                <Modal modalTitle="Cadastrar Cliente"
                    modalBody={
                        <>
                            <div className="cliente-form-content" >
                                <form onSubmit={handleSubmitCliente} ref={formRef}>
                                    <Input label="Nome Completo" type="text" name="nome" placeholder="Nome Completo"></Input>
                                    <Input label="CPF" type="text" name="cpf"></Input>
                                    <Button type="submit" variant="primary" buttonName="Cadastrar"></Button>
                                </form>

                            </div>
                        </>
                    }
                    modalClose={() => setCadastrarCliente(false)}

                />
            }
        </nav>



    )
}