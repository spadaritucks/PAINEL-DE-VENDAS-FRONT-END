'use client'

import Button from "@/components/button/component"
import { ReactNode } from "react"
import './component.css'

interface ModalProps {
    modalTitle: string
    modalBody: ReactNode
    modalClose: () => void
}

export default function Modal({ modalTitle, modalBody, modalClose }: ModalProps) {

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h2>{modalTitle}</h2>
                <Button type="button" buttonName="Fechar" variant="secondary" onClick={modalClose}></Button>
            </div>
            <div className="modal-body">
                {modalBody}
            </div>
        </div>
    )


}