'use client'
import './component.css'

type InputTypes = 'text' | 'file' | 'password' | 'date'


interface InputProps {
    type: InputTypes
    name?: string
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string
    value?: string
    readOnly?: boolean; 
    disabled?: boolean
    
}



export default function Input({ label, type, placeholder,name, onChange, value, readOnly, disabled }: InputProps) {

    return (
        <>
            <div className="input-wrapper">
                <label htmlFor={label}>{label}</label>
                <input type={type} name={name} placeholder={placeholder} onChange={onChange} value={value} readOnly={readOnly} disabled={disabled} />
            </div>
        </>
    )
}