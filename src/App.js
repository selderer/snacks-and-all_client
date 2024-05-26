import { BrowserRouter } from "react-router-dom";
import { createTheme, Input, MantineProvider } from "@mantine/core";
import React from "react";
import classes from "./assets/css/general.module.css";
import ScrollToTop from "./components/general/ScrollToTop";
import Root from "./routes/Root";

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
            <BrowserRouter>
                <Root />
                <ScrollToTop />
            </BrowserRouter>
        </MantineProvider>
    )
}

export default App;
