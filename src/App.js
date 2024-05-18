import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { createTheme, Input, MantineProvider } from "@mantine/core";
import React from "react";
import classes from "./assets/css/general.module.css";
import ScrollToTop from "./components/general/ScrollToTop";

const theme = createTheme({
    components: {
        Input: Input.extend({
            classNames: {
                input: classes.generalInput,
            },
        })
    },
});

const App = () => {
    return (
        <MantineProvider theme={theme}>
            <RouterProvider router={router}>
                <ScrollToTop />
            </RouterProvider>
        </MantineProvider>
    )
}

export default App;
