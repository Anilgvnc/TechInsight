import React, { useState, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from "react-native-paper";
import { Formik } from 'formik';
import * as yup from 'yup';

import { Colors } from '../../constants/styles';
import Input from '../../components/authUi/Input';
import { ProductsContext } from '../../store/products-context';
import { Rating } from 'react-native-ratings';
import { addReview } from '../../util/Https';

const initialFormValues = {
    rAuthor: '',
    rTitle: '',
    rMessage: '',
    rRate: '',
    createdOn: new Date().getFullYear()
}

function AddReview({ route, navigation }) {
    //fetch id from route
    const productName = route.params?.productId;

    const [isSending, setIsSending] = useState();
    const productsCtx = useContext(ProductsContext);

    const { t } = useTranslation();

    async function postHandler(formValues) {
        setIsSending(true);
        try {
            const id = await addReview(productName, formValues);
            //productsCtx.addProduct({ ...formValues, id: id })
            Alert.alert(
                t('sentSuccessfully')
            );
            setIsSending(false);
        } catch (error) {
            Alert.alert(
                t('sentErrorTitle'),
                t('sentError')
            );
        }
        this.formValues.clear();
    }

    return (
        <View style={styles.screen}>
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
                    onSubmit={postHandler}
                    validationSchema={yup.object().shape({
                        rTitle: yup
                            .string()
                            .required(),
                        rMessage: yup
                            .string()
                            .required(),
                        rRate: yup
                            .string()
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
                                    />
                                </View>
                                <View>
                                    <Rating
                                        imageSize={40}
                                        onFinishRating={values.rRate}
                                        style={styles.rating}
                                        showRating
                                        label={t('reviewRate')}
                                        value={values.rRate}
                                        onUpdateValue={handleChange('description')}
                                        onBlur={() => setFieldTouched('description')}
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

        </View>
    );
}

export default AddReview;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    }, headerContainer: {
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