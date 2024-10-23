'use client'
import Image, { StaticImageData } from "next/image";
import '@/components/card/component.css'
import Button from "@/components/button/component";
import { useState } from "react";
import Modal from "../modal/component";

interface CardProps {
    productImage: StaticImageData;
    productTitle: string;
    productPrice: number;
    
}


export default function Card({ productImage, productTitle, productPrice }: CardProps) {

   
    const [productId, setProductId] = useState<number>()

 

    return (
        <div className="card-content">
            <Image width={300} height={200} alt="" src={productImage}></Image>

            <div className="card-information">
                <h2 className="product-title">{productTitle}</h2>
                <p className="product-price">R$ {productPrice}</p>
            </div>

            <Button buttonName="Adicionar no Carrinho" variant="primary" />

           
        </div>


    )
}