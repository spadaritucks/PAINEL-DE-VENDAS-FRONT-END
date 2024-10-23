'use client'
import { ReactNode } from 'react'
import './component.css'



interface SelectProps {
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    label: string
    option: ReactNode
    value?: string;
    defaultValue?: string
    
}



export default function Select({ label, option,name, onChange, defaultValue, value }: SelectProps) {

    return (
        <>
            <div className="select-wrapper">
                <label htmlFor={label}>{label}</label>
                <select name={name} onChange={onChange} defaultValue={defaultValue} value={value}>{option}</select>
            </div>
        </>
    )
}