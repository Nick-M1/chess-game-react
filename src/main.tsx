import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LayoutMain from "./components/layout/LayoutMain";

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route element={<LayoutMain/>} errorElement={<ErrorPage/>}>
            <Route index lazy={() => import("./pages/HomePage")}/>
            {/*<Route path='/leaderboard' lazy={() => import("./pages/LeaderboardPage")}/>*/}
            <Route path='/game/:gameid' lazy={() => import("./pages/GamePage")}/>
        </Route>
    )
)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
