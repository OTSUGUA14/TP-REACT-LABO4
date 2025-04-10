
import React from "react";

import { Route, Routes } from "react-router";
import Main from "../components/screens/Main";

export function AppRouter() {
    return (



        <div className="">
            <Routes>
                <Route element={<Main />} path="/" />

            </Routes>
        </div>

    );
}