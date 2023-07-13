"use client"

import {toast, ToastContainer} from "react-toastify";
import { useEffect} from "react";

export default function GlobalError({
                                        error,
                                    }: {
    error?: Error
}) {

    if (error !== null) {
        toast.error(error?.message);
    }

    // useEffect(() => {
    //     if (error) {
    //         toast.error(error);
    //     }
    // }, [error]);

    useEffect(() => {
        setTimeout(() => {
            toast.error(error?.message);
        }, 2000);
    }, [error]);

    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    )
}
