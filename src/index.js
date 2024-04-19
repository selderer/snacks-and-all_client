import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import '@mantine/core/styles.css';
import reportWebVitals from './reportWebVitals';
import { router } from './routes/index';
import {createTheme, Input, MantineProvider} from "@mantine/core";
import classes from "./assets/css/general.module.css";

const theme = createTheme({
    components: {
        Input: Input.extend({
            classNames: {
                input: classes.generalInput,
            },
        })
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <MantineProvider theme={theme}>
          <RouterProvider router={router} />
      </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
