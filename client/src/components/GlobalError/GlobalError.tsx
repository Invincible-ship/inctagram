import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import {useAppDispatch, useAppSelector} from "@/shared/lib/hooks";
import {toast, ToastContainer} from "react-toastify";
import {appActions} from "@/entities/Slices/app.slice";


export const GlobalError = () => {
    const error = useAppSelector((state) => state.app.error);
    const dispatch = useAppDispatch();
    if (error !== null) {
        toast.error(error);
    }

    useEffect(() => {
        setTimeout(() => {
            dispatch(appActions.setError({ error: null }));
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
            theme="colored"
        />
    );
};