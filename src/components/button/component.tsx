import { FormEventHandler, MouseEventHandler } from "react";
import './component.css'
import Link from "next/link";


type BtnVariants = "primary" | "secondary"
type BtnTypes = 'submit' | 'button' | 'reset'

interface ButtonProps{
    buttonName: string ;
    variant: BtnVariants;
    type: BtnTypes;
    onClick? : MouseEventHandler<HTMLButtonElement> 
    disabled?: boolean
}


export default function Button ({type,buttonName,variant,onClick, disabled}: ButtonProps) {

    return(
        <button disabled ={disabled} type={type}  className={variant} onClick={onClick} >{buttonName}</button>
    )
}