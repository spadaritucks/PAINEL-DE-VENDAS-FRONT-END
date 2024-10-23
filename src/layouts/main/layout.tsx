import Navbar from "@/components/navbar/component";
import { FC, ReactNode } from "react";


export const Main: FC<{ children: ReactNode }> = ({ children }) => {

    return (
        
        <>
            <Navbar title="DC STORE"/>
            {children}

        </>
    )
}