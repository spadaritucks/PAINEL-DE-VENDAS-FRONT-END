'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import Modal from "@/components/modal/component"
import { Main } from "@/layouts/main/layout"
import React, { useEffect, useRef, useState } from "react"
import './page.css'
import { createProdutos, getProdutos, ProdutosProps } from "@/api/produtos/api"
import Select from "@/components/select/component"
import { ClientesProps, getClientes } from "@/api/clientes/api"
import { createVendas } from "@/api/vendas/api"
import { UsuariosProps } from "@/api/usuarios/api"

interface ParcelasProps {
    valor: string
    data_vencimento: Date
}


export default function VendaProdutos() {

    const [addProduto, setAddProduto] = useState<boolean>(false)
    const [Clientes, setClientes] = useState<ClientesProps[] | []>([]);
    const [Produtos, setProdutos] = useState<ProdutosProps[] | []>([]);
    const [produtoSelected, setProdutoSelected] = useState<number | null>(null)
    const [quantidade, setQuantidade] = useState<number | null>(null)
    const [total, setTotal] = useState<number>(0)
    const [PagamentoParcelado, setPagamentoParcelado] = useState<boolean>(false)
    const [parcelasNumber, setParcelasNumber] = useState<number>(0)
    const [user, setUser] = useState<UsuariosProps>()

    const [parcelas, setParcelas] = useState<ParcelasProps[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const userResponse = sessionStorage.getItem('user');
        if (userResponse) {
            setUser(JSON.parse(userResponse));
        }
    }, [])

    useEffect(() => {

        const fetchClientes = async () => {
            const response = await getClientes()
            setClientes(response)
        }

        fetchClientes()

        const fetchProdutos = async () => {
            const response = await getProdutos()
            setProdutos(response)
        }
        fetchProdutos()

    }, [])

    const handleSubmitProduto = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formRef.current) {
            const formdata = new FormData(formRef.current);
            const response = await createProdutos(formdata);
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

    const handleSubmitVenda = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formRef.current) {
            const formdata = new FormData(formRef.current);
            const vendedor_id = user?.id
            console.log(vendedor_id)

            if (vendedor_id) {
                formdata.append('vendedor_id', vendedor_id.toString())
                const response = await createVendas(formdata);
                console.log(formdata)

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
    }

    const handleModalCreateProdutos = () => {
        setAddProduto(true)
    }

    const handleChangeValorIntegral = () => {
        if (produtoSelected && quantidade) {
            const produto = Produtos.find(produto => produto.id === produtoSelected)
            if (produto) {
                const valorProduto = parseFloat(produto.valor)
                const valorAdicional = valorProduto * quantidade
                setTotal((prevTotal) => (prevTotal || 0) + valorAdicional)
            }
        } else {
            alert("Selecione um produto e insira a quantidade.")
        }
    }

    const handleChangeProduto = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const produtoId = parseInt(e.target.value)
        setProdutoSelected(produtoId)
    }

    const handleChangeQuantidade = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantidade = parseInt(e.target.value)
        setQuantidade(quantidade)
    }

    const handleChangePagamentoParcelado = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const pagamentoParcelado = parseInt(e.target.value)
        pagamentoParcelado === 1 ? setPagamentoParcelado(true) : setPagamentoParcelado(false)

    }

    const handleChangeParcelas = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numeroParcelas = parseInt(e.target.value)
        setParcelasNumber(numeroParcelas);
    }

    const handleGerarParcelas = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (parcelasNumber > 0 && total > 0) {

            const valorParcela = total / parcelasNumber;

            const novasParcelas = Array.from({ length: parcelasNumber }, (_, index) => ({
                valor: valorParcela.toFixed(2), // Definindo o mesmo valor para todas as parcelas
                data_vencimento: new Date(new Date().setMonth(new Date().getMonth() + (index + 1))) // Definindo a data de vencimento para o próximo mês
            }));

            setParcelas(novasParcelas);
        } else {
            alert('Insira um número válido de parcelas e o valor total.');
        }
    }

    const handleUpdateValorParcela = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = e.target.value;
        setParcelas(prevParcelas => {
            const updatedParcelas = [...prevParcelas];
            updatedParcelas[index].valor = newValue;
            return updatedParcelas;
        });
    }

    const handleUpdateParcelaData = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newDate = new Date(e.target.value);
        setParcelas(prevParcelas => {
            const updatedParcelas = [...prevParcelas];
            updatedParcelas[index].data_vencimento = newDate;
            return updatedParcelas;
        });
    };






    return (
        <Main>
            <section className="area-cadastro">
                <h2>Criar Venda</h2>
                <div className="vendas-form-content">
                    <div className="addProduto-Content">
                        <Button buttonName="Adicionar Produto" type="button" variant="primary" onClick={() => handleModalCreateProdutos()} />
                    </div>

                    <form ref={formRef} onSubmit={handleSubmitVenda}>

                        <div className="product-calc-content" style={{ gridColumn: '1 / -1' }}>
                            <Select label="Selecione um Produto" onChange={handleChangeProduto} defaultValue="selecione" name="cliente_id" option={
                                <>
                                    <option disabled value='selecione'>Selecione</option>
                                    {Produtos.map((produto) => (
                                        <option key={produto.id} value={produto.id}>{produto.nome} - R${produto.valor.replace('.', ',')}</option>
                                    ))}
                                </>
                            } />
                            <Input label="Quantidade" type="text" onChange={handleChangeQuantidade} />
                            <Button buttonName="Adicionar" variant="primary" type="button" onClick={handleChangeValorIntegral}></Button>
                            <Button buttonName="Reiniciar" variant="secondary" type="button" onClick={() => setTotal(0)}></Button>
                        </div>


                        <Input label="Valor Total" type="text" name="valor_integral" value={total ? total.toFixed(2).replace('.', ',') : ''} readOnly={true} />
                        <Select label="Selecione o Cliente (Opcional)" defaultValue="selecione" name="cliente_id" option={
                            <>
                                <option disabled value='selecione'>Selecione</option>
                                {Clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                                ))}
                            </>
                        } />
                        <Select label="Forma de Pagamento" defaultValue="selecione" name="forma_pagamento" option={
                            <>
                                <option disabled value='selecione'>Selecione</option>
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Credito">Cartão de Credito</option>
                                <option value="Debito">Cartão de Debito</option>
                            </>
                        } />

                        <Select label="Tipo de Pagamento" defaultValue="selecione" onChange={handleChangePagamentoParcelado} option={
                            <>
                                <option disabled value='selecione'>Selecione</option>
                                <option value="0">a vista</option>
                                <option value="1">Parcelado</option>
                            </>
                        } />

                        <Input label="Parcelas" type="text" name="parcelas" disabled={PagamentoParcelado === false} onChange={handleChangeParcelas}></Input>
                        {PagamentoParcelado && <Button buttonName="Gerar Parcelas" type="button" variant="primary" onClick={handleGerarParcelas} />}
                        {PagamentoParcelado &&
                            <div className="parcelas-container" style={{ gridColumn: '1 / -1' }}>
                                <table className="parcelas-table">
                                    <thead>
                                        <tr>
                                            <th>Parcela</th>
                                            <th>Valor Unitario</th>
                                            <th>Data de Vencimento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parcelas.map((parcela, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><Input label="Valor Unitario" type="text" value={parcela.valor} onChange={(e) => handleUpdateValorParcela(e, index)} readOnly={false}></Input></td>
                                                <td><Input label="Data de Vencimento" type="date" onChange={(e) => handleUpdateParcelaData(e, index)} value={parcela.data_vencimento.toISOString().substr(0, 10)} readOnly={false}></Input></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>

                            </div>}
                        <div className="submit-form-area" style={{ gridColumn: '1 / -1' }}>
                            <Button buttonName="Cadastrar Venda" type="submit" variant="primary" />
                        </div>


                    </form>



                </div>



                {addProduto && <Modal
                    modalTitle="Cadastrar Produto"
                    modalBody={
                        <>
                            <div className="produto-form-content">
                                <form onSubmit={handleSubmitProduto} ref={formRef}>
                                    <Input label="Nome do Produto" name="nome" type="text" placeholder="Nome do Produto" />
                                    <Input label="Valor do Produto" name="valor" type="text" placeholder="Valor do Produto" />
                                    <Button buttonName="Cadastrar" type="submit" variant="primary" />
                                </form>
                            </div>
                        </>
                    }
                    modalClose={() => setAddProduto(false)} />}

            </section>


        </Main>


    )
}