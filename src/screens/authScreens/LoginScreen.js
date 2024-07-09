import { Fragment, useContext, useState } from 'react';
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Input from '../../components/authUi/Input';
import { login } from '../../util/Auth';
import { AuthContext } from '../../store/auth-context';
import { useTranslation } from 'react-i18next';
import TranslationButton from '../../components/ui/TranslationButton';
import { Colors } from '../../constants/styles';

const initialFormValues = { email: '', password: '' }

function LoginScreen({ navigation }) {
    const { t } = useTranslation();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);

    async function loginHandler(formValues) {
        setIsAuthenticating(true);
        try {
            const token = await login(formValues.email, formValues.password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert(
                t('authErrorHeader'),
                t('authError')
            );
            setIsAuthenticating(false);
        }
    }


    const insets = useSafeAreaInsets();

    return (

        <View style={{
            flex: 1,

            // Paddings to handle safe area
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <View style={styles.screen}>
                <View style={styles.headerContainer}>
                    <View style={styles.textContainer}>
                        <Text variant="headlineLarge" style={styles.headertextStyle} >
                            {t('loginHeader')}
                        </Text>
                        <Text variant="titleMedium" style={styles.textStyle}>
                            {t('loginTitle')}
                        </Text>
                    </View>
                    <TranslationButton />
                </View>

                <View style={styles.flexBody}>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={loginHandler}
                        validationSchema={yup.object().shape({
                            email: yup
                                .string()
                                .email()
                                .required(),
                            password: yup
                                .string()
                                .min(6)
                                .required(),
                        })}>

                        {({ handleSubmit, handleChange, values, errors, setFieldTouched, touched, isValid }) => (
                            <Fragment>
                                <View>
                                    <View>
                                        <Input
                                            label="E-mail"
                                            keyboardType="email-address"
                                            value={values.email}
                                            onUpdateValue={handleChange('email')}
                                            onBlur={() => setFieldTouched('email')}
                                            email
                                            isInvalid={touched.email && errors.email}
                                            invalidText={errors.email}
                                        />
                                    </View>
                                    <View>
                                        <Input
                                            label={t('password')}
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
                                        onPress={handleSubmit}
                                        disabled={!isValid || isAuthenticating}
                                        loading={isAuthenticating}
                                    >
                                        {t('login')}
                                    </Button>
                                </View>
                            </Fragment>

                        )}
                    </Formik>

                    <View style={styles.registerNavText}>
                        <Text style={styles.registerTextStyle} variant="bodyMedium"> {t('registerQuestion')} </Text>
                        <Button
                            mode="text"
                            textColor={Colors.secondary}
                            style={styles.registerButtonStyle}
                            onPress={() => navigation.navigate('Register')}>
                            {t('register')}</Button>

                    </View>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 48,
    },
    headerContainer: {
        flex: 1,
        alignContent: 'space-between',
        flexDirection: 'row',
    },
    flexBody: {
        flex: 6
    },
    textContainer: {
        flex: 3
    },
    headertextStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.secondary,
    },
    registerNavText: {
        padding: 16,
        textAlign: 'center'
    },
    registerButtonStyle: {
        paddingVertical: 16,
    },
    buttonStyle: {
        padding: 16,
    },
    line: {
        marginTop: 156,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        marginBottom: 10,
    },
    registerTextStyle: {
        textAlign: 'center'
    },
})
