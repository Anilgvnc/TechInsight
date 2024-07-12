import * as React from 'react';
import { Fragment } from 'react';
import { Alert, View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useState, useContext } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup'
import { useTranslation } from 'react-i18next';

import Input from '../../components/authUi/Input';
import { createUser } from '../../util/Auth';
import { AuthContext } from '../../store/auth-context';
import { Colors } from '../../constants/styles';

const initialFormValues = {
    name: '',
    email: '',
    password: '',
}

function RegisterScreen({ navigation }) {

    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);
    const { t } = useTranslation();

    async function RegisterHandler(formValues) {
        setIsAuthenticating(true);
        try {
            const accountData = await createUser(formValues.name, formValues.email, formValues.password);
            authCtx.authenticate(accountData.token);
            authCtx.StoreNameInfo(accountData.displayName);
            authCtx.StoreMailInfo(accountData.mail);
        } catch (error) {
            Alert.alert(
                t('authErrorHeader'),
                t('authError')
            );
            setIsAuthenticating(false);
        }
    }

    return (

        <View style={styles.screen}>
            <View style={styles.textContainer}>
                <Text style={styles.headertextStyle} variant="headlineLarge"> {t('registerHeader')} </Text>
                <Text variant="titleMedium"> {t('registerTitle')} </Text>
            </View>

            <View style={styles.flexBody}>
                <Formik
                    initialValues={initialFormValues}
                    onSubmit={RegisterHandler}
                    validationSchema={yup.object().shape({
                        name: yup
                            .string()
                            .required(),
                        email: yup
                            .string()
                            .email()
                            .required(),
                        password: yup
                            .string()
                            .min(6)
                            .required()
                    })}>
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <Fragment>
                            <View>
                                <View>
                                    <Input
                                        label={t('name')}
                                        value={values.name}
                                        onUpdateValue={handleChange('name')}
                                        onBlur={() => setFieldTouched('name')}
                                        isInvalid={touched.name && errors.name}
                                        invalidText={errors.name}
                                    />
                                </View>
                                <View>
                                    <Input
                                        label="E-mail"
                                        keyboardType="email-address"
                                        value={values.email}
                                        onUpdateValue={handleChange('email')}
                                        onBlur={() => setFieldTouched('email')}
                                        isInvalid={touched.email && errors.email}
                                        invalidText={errors.email}
                                    />
                                </View>
                                <View>
                                    <Input
                                        label={t('Password')}
                                        password
                                        value={values.password}
                                        onUpdateValue={handleChange('password')}
                                        onBlur={() => setFieldTouched('password')}
                                        isInvalid={touched.password && errors.password}
                                        invalidText={errors.password}
                                    />
                                </View>
                            </View>
                            <View style={styles.buttonStyle}>
                                <Button
                                    mode="elevated"
                                    buttonColor={Colors.secondary}
                                    textColor={Colors.tint}
                                    disabled={!isValid || isAuthenticating}
                                    loading={isAuthenticating}
                                    onPress={handleSubmit}>
                                    {t('register')}
                                </Button>
                            </View>
                        </Fragment>
                    )}
                </Formik>
            </View>
        </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 32,
    },
    textContainer: {
        flex: 1,
        marginBottom: 24,
        flexDirection: 'column'
    },
    headertextStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.secondary,
    },
    buttonStyle: {
        padding: 24,
    },
    flexBody: {
        flex: 13
    },
})