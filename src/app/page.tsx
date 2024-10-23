'use client'
import Image from "next/image";
import "./page.css";
import { Main } from "@/layouts/main/layout";
import Card from "@/components/card/component";
import notebook from '../../public/notebook.jpg'
import Modal from "@/components/modal/component";
import { useRef, useState } from "react";
import Input from "@/components/input/component";
import Button from "@/components/button/component";
import { LoginAuth } from "@/api/login/api";

export default function Home() {

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmitLogin = async () => {

    if(formRef.current){
      const formdata = new FormData(formRef.current)

      const response = await LoginAuth(formdata)

      if (response) {
        if (response.status === false) {
            alert('Erro' + response.message)
            return
        } else {
            alert('Sucesso ' + response.message)
            window.location.href = '/vendas'
        }
    }
    }
  }


  return (
  

      <section className="login-menu">
        <div className="login-content">
          <h2>Login do Vendedor</h2>
          <form action="" onSubmit={handleSubmitLogin} ref={formRef}>
            <Input label="CPF" name="cpf" placeholder="Insira o seu CPF" type="text" />
            <Input label="Senha" name="password" type="password" />
            <Button type="submit" buttonName="Login" variant="primary" />
          </form>
        </div>
      </section>

      

  
  );
}
