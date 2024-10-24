'use client'
import { Main } from '@/layouts/main/layout'
import './page.css'
import { useEffect, useState } from 'react'
import { ClientesProps, getClientes } from '@/api/clientes/api'
import { getProdutos, ProdutosProps } from '@/api/produtos/api'
import { getVendas, VendasProps } from '@/api/vendas/api'
import { getUsuarios, UsuariosProps } from '@/api/usuarios/api'

export default function Vendas() {

    const [Clientes, setClientes] = useState<ClientesProps[] | []>([]);
    const [Produtos, setProdutos] = useState<ProdutosProps[] | []>([]);
    const [vendas, setVendas] = useState<VendasProps[] | []>([]);
    const [Usuarios, setUsuarios] = useState<UsuariosProps[] | []>([]);

    useEffect(() => {
        const fetchClientes = async () => {
            const response = await getClientes()
            setClientes(response)
        }
        fetchClientes()

        const fetchUsuarios = async () => {
            const response = await getUsuarios()
            setUsuarios(response)
        }
        fetchUsuarios()

        const fetchProdutos = async () => {
            const response = await getProdutos()
            setProdutos(response)
        }
        fetchProdutos()

        const fetchVendas = async () => {
            const response = await getVendas()
            setVendas(response)
        }
        fetchVendas()


    }, [])

    return (
        <Main>
            <section className='menu-vendas'>
                <div className='vendas-table-content'>
                    <h2>Vendas Realizadas</h2>
                    <table className='vendas-table'>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Cliente</th>
                                <th>Data da Venda</th>
                                <th>Valor Integral</th>
                                <th>N°Parcelas</th>
                                <th>Tipo de Pagamento</th>
                                <th>Usuario (Vendedor)</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendas.map((venda) => {
                                const clienteFiltrado = Clientes.find(cliente => cliente.id === venda.cliente_id)
                                const vendedorFiltrato = Usuarios.find(usuario => usuario.id === venda.vendedor_id)
                                return (
                                    
                                        <tr key={venda.id}>
                                            <td>{venda.id}</td>
                                            <td>{clienteFiltrado?.nome}</td>
                                            <td>{new Date(venda.created_at).toLocaleDateString('pt-BR')}</td>
                                            <td>{venda.valor_integral}</td>
                                            <td>{venda.parcelas}</td>
                                            <td>{venda.forma_pagamento}</td>
                                            <td>{vendedorFiltrato?.nome}</td>
                                        </tr>

                                    
                                )
                            })

                            }
                        </tbody>
                    </table>
                </div>
                <div className='litle-tables-content'>
                    <div className='products-table-content'>
                        <h2>Produtos Cadastratos</h2>
                        <table className='product-table'>
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nome do Produto</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Produtos.map(produtos => (
                                    
                                        <tr key={produtos.id}>
                                            <td>{produtos.id}</td>
                                            <td>{produtos.nome}</td>
                                            <td>R$ {produtos.valor.replace('.', ',')}</td>
                                        </tr>
                                    
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='client-table-content'>
                        <h2>Clientes Cadastratos</h2>
                        <table className='client-table'>
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nome do Cliente</th>
                                    <th>CPF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Clientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        
                                            <td>{cliente.id}</td>
                                            <td>{cliente.nome}</td>
                                            <td>{cliente.cpf}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>


        </Main>
    )
}