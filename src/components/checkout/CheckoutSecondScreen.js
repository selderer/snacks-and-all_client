import classes from "../../assets/css/pages/checkout.module.css";
import { isNotEmpty, useForm } from "@mantine/form";
import {Button, Group, TextInput} from "@mantine/core";
import visaLogo from "../../assets/icons/paymentMethods/visaLogo.svg";
import masterCardLogo from "../../assets/icons/paymentMethods/mastercardLogo.svg";
import securePaymentLogo from "../../assets/icons/paymentMethods/securePaymentLogo.svg";

const CheckoutSecondScreen = ({
    handlePay
}) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { cardNumber: '', cardholderName: '', expirationDate: '', cvv: '' },

        validate: {
            cardNumber: (value) => (value.length !== 16 ? 'Card number should have 16 symbols' : null),
            cardholderName: isNotEmpty(`Enter cardholder's name`),
            expirationDate: isNotEmpty(`Enter card's expiration date`),
            cvv: (value) => (value.length !== 3 ? 'CVV should have 3 symbols' : null),
        },
    });

    return (
        <form onSubmit={form.onSubmit(handlePay)} className={classes.checkoutForm}>
            <TextInput
                label="Card number"
                placeholder="4514785965234125"
                withAsterisk
                key={form.key('cardNumber')}
                {...form.getInputProps('cardNumber')}
            />
            <TextInput
                label="Cardholder's name"
                placeholder="SONA BABAKHANYAN"
                withAsterisk
                key={form.key('cardholderName')}
                {...form.getInputProps('cardholderName')}
            />
            <TextInput
                label="Expiration date"
                placeholder="06/28"
                withAsterisk
                key={form.key('expirationDate')}
                {...form.getInputProps('expirationDate')}
            />
            <TextInput
                label="CVV"
                placeholder="965"
                withAsterisk
                key={form.key('cvv')}
                {...form.getInputProps('cvv')}
            />

            <div className={classes.checkoutPaymentMethodsWrapper}>
                <div className={classes.checkoutPaymentMethod}>
                    <img src={visaLogo} alt="Payment method visa" />
                </div>
                <div className={classes.checkoutPaymentMethod}>
                    <img src={masterCardLogo} alt="Payment method mastercard" />
                </div>
                <div className={classes.checkoutPaymentMethod}>
                    <img src={securePaymentLogo} alt="Payment method secure payment" />
                </div>
            </div>

            <Group justify="flex-start">
                <Button type="submit" className={classes.checkoutPayButton}>Pay</Button>
            </Group>
        </form>
    )
}

export default CheckoutSecondScreen;
