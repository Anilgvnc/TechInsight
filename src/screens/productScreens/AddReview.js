import React, { useState, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Alert, Pressable } from 'react-native';
import { Button, Text } from "react-native-paper";
import { Formik } from 'formik';
import * as yup from 'yup';

import { Colors } from '../../constants/styles';
import Input from '../../components/authUi/Input';
import { addReview } from '../../util/Https';
import { AuthContext } from '../../store/auth-context';
import { BlurView } from 'expo-blur';


const initialFormValues = {
    rAuthor: '',
    rMail: '',
    rTitle: '',
    rMessage: '',
    rRate: '',
    createdOn: new Date().getMonth() + 1 + "/" + new Date().getDate() + "/" + new Date().getFullYear(),
};

function AddReview({ route, navigation }) {

    //fetch id from route
    const productName = route.params?.productId;

    const [isSending, setIsSending] = useState(false);
    //const productsCtx = useContext(ProductsContext);

    //Set Author name
    const authCtx = useContext(AuthContext);
    initialFormValues.rAuthor = authCtx.nameInfo;
    initialFormValues.rMail = authCtx.mailInfo;

    const { t } = useTranslation();

    async function PostHandler(formValues) {
        setIsSending(true);
        try {
            await addReview(productName, formValues);
            //productsCtx.addProduct({ ...formValues, id: id })
            navigation.goBack();
        } catch (error) {
            Alert.alert(
                t('sentErrorTitle'),
                t('sentError')
            );
            console.log(error);
            setIsSending(false);
        }

    }

    return (
        <View style={styles.screen}>
            <Pressable
                onPress={() => navigation.goBack()}
                style={{ flex: 1 }}
            />
            <BlurView
                experimentalBlurMethod='dimezisBlurView'
                intensity={90}
                tint='light'
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '55%',
                    padding: 16,
                    bottom: 0
                }}
            >
                <View style={styles.headerContainer}>
                    <View style={styles.textContainer}>
                        <Text variant="headlineLarge" style={styles.headertextStyle} >
                            {t('addReviewHeader')}
                        </Text>
                        <Text variant="titleMedium" style={styles.textStyle}>
                            {t('addReviewTitle')}
                        </Text>
                    </View>
                </View>
                <View style={styles.flexBody}>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={PostHandler}
                        validationSchema={yup.object().shape({
                            rTitle: yup
                                .string()
                                .min(5)
                                .required(),
                            rMessage: yup
                                .string()
                                .min(5)
                                .required(),
                            rRate: yup
                                .number()
                                .max(5)
                                .required(),
                        })}>

                        {({ handleSubmit, handleChange, values, errors, setFieldTouched, touched, isValid }) => (
                            <Fragment>
                                <View>
                                    <View>
                                        <Input
                                            label={t('reviewTitle')}
                                            value={values.rTitle}
                                            onUpdateValue={handleChange('rTitle')}
                                            onBlur={() => setFieldTouched('rTitle')}
                                            isInvalid={touched.rTitle && errors.rTitle}
                                            invalidText={errors.rTitle}
                                        />
                                    </View>
                                    <View>
                                        <Input
                                            label={t('reviewMessage')}
                                            value={values.rMessage}
                                            onUpdateValue={handleChange('rMessage')}
                                            onBlur={() => setFieldTouched('rMessage')}
                                            isInvalid={touched.rMessage && errors.rMessage}
                                            invalidText={errors.rMessage}
                                            multiline={true}
                                        />
                                    </View>
                                    <View>
                                        <Input
                                            label={t('reviewRate')}
                                            value={values.rRate}
                                            onUpdateValue={handleChange('rRate')}
                                            onBlur={() => setFieldTouched('rRate')}
                                            isInvalid={touched.rRate && errors.rRate}
                                            invalidText={errors.rRate}
                                        />
                                    </View>
                                </View>
                                <View style={styles.buttonStyle}>
                                    <Button
                                        mode="elevated"
                                        buttonColor={Colors.secondary}
                                        textColor={Colors.tint}
                                        onPress={handleSubmit}
                                        disabled={!isValid || isSending}
                                        loading={isSending}
                                    >
                                        {t('send')}
                                    </Button>
                                </View>
                            </Fragment>

                        )}
                    </Formik>
                </View>
            </BlurView>
        </View>
    );
}

export default AddReview;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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
    rating: {
        margin: 16
    }
})