import {useEffect, useState} from "react";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import classes from '../assets/css/pages/admin.module.css';
import {AdminsApi} from "../api/admins";
import {useNavigate} from "react-router-dom";

const Admin = () => {
    let navigate = useNavigate()
    const [adminIsAuthenticated, setAdminIsAuthenticated] = useState(false)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            login: '',
            password: ''
        },

        validate: {
            login: isNotEmpty('Login cannot be empty'),
            password: isNotEmpty('Password cannot be empty')
        },
    });

    const handleLogin = (values) => {
        AdminsApi.authenticateAdmin(values).then(response => {
            setAdminIsAuthenticated(true)
            localStorage.setItem('adminToken', response.data.token)
        })
    }

    useEffect(() => {
        const authenticationToken = localStorage.getItem('adminToken');

        if (authenticationToken) {
            setAdminIsAuthenticated(true)
        }
    }, []);

    return (
        <div className={classes.adminContainer}>
            {
                !adminIsAuthenticated ? (
                    <div className={classes.adminAuthContainer}>
                        <div className={classes.adminAuthTitle}>
                            Login to admin account
                        </div>
                        <form onSubmit={form.onSubmit(handleLogin)}>
                            <TextInput
                                label="Login"
                                placeholder="Admin login"
                                className={classes.adminAuthLoginInput}
                                key={form.key('login')}
                                {...form.getInputProps('login')}
                            />

                            <PasswordInput
                                label="Password"
                                placeholder="Admin password"
                                key={form.key('password')}
                                {...form.getInputProps('password')}
                            />

                            <Group justify="flex-end" mt="md">
                                <Button type="submit">Login</Button>
                            </Group>
                        </form>
                    </div>
                ) : (
                    <div className={classes.adminProductActionsWrapper}>
                        <button onClick={() => navigate('/admin/edit')} className={classes.adminProductActionButton}>
                            Edit/Delete product
                        </button>
                        <button onClick={() => navigate('/admin/add')} className={classes.adminProductActionButton}>
                            Add product
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default Admin;
