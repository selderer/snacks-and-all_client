import { hasLength, isEmail, isNotEmpty, useForm } from '@mantine/form';
import { Button, Group, TextInput } from "@mantine/core";
import classes from "../../assets/css/pages/checkout.module.css";
import {useEffect} from "react";

const CheckoutFirstScreen = ({
    handleFillCardInfo
}) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { fullName: '', email: '', city: '', postCode: '', address: '' },

        validate: {
            fullName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: isEmail('Invalid email'),
            address: isNotEmpty('Enter your address'),
            city: isNotEmpty('Enter your city'),
            postCode: hasLength({ min: 2, max: 5 }, 'Post code must be 2-5 characters long')
        },
    });

    const handleSubmitForm = (data) => {
        handleFillCardInfo(data)
    }

    useEffect(() => {
        const previousOrderDetails = localStorage.getItem('orderDetails')
        
        if (previousOrderDetails) {
            form.setInitialValues(JSON.parse(previousOrderDetails))
        }
    }, [form]);

    return (
        <form className={classes.checkoutForm} onSubmit={form.onSubmit(handleSubmitForm)}>
            <TextInput
                label="Full name"
                placeholder="Sona Babakhanyan"
                withAsterisk
                key={form.key('fullName')}
                {...form.getInputProps('fullName')}
            />
            <TextInput
                label="Email"
                placeholder="sona.babakhanyan@gmail.com"
                withAsterisk
                key={form.key('email')}
                {...form.getInputProps('email')}
            />
            <TextInput
                label="Address"
                placeholder="First Central Str. 25 h."
                withAsterisk
                key={form.key('address')}
                {...form.getInputProps('address')}
            />
            <TextInput
                label="City"
                placeholder="Yerevan"
                withAsterisk
                key={form.key('city')}
                {...form.getInputProps('city')}
            />
            <TextInput
                label="Post code"
                placeholder="0805"
                withAsterisk
                key={form.key('postCode')}
                {...form.getInputProps('postCode')}
            />

            <Group justify="flex-start">
                <Button type="submit" className={classes.checkoutFirstScreenButton}>Fill card info</Button>
            </Group>
        </form>
    )
}

export default CheckoutFirstScreen;
