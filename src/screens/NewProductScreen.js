import React, { useState, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from "react-native-paper";
import { Formik } from 'formik';
import * as yup from 'yup';

import { Colors } from '../constants/styles';
import { addProduct } from '../util/Https';
import Input from '../components/authUi/Input';
import { ProductsContext } from '../store/products-context';
import { ScrollView } from 'react-native-gesture-handler';

const initialFormValues = {
    pName: '',
    url: '',
    description: '',
    specifications: '',
    createdOn: new Date().getMonth() + 1 + "/" + new Date().getDate() + "/" + new Date().getFullYear(),
}

function NewProductScreen({ navigation }) {

    const [isSending, setIsSending] = useState();
    const productsCtx = useContext(ProductsContext);

    const { t } = useTranslation();

    async function postHandler(formValues) {
        setIsSending(true);
        try {
            const id = await addProduct(formValues);
            productsCtx.addProduct({ ...formValues, id: id })
            Alert.alert(
                t('sentSuccessfully')
            );
            setIsSending(false);
            navigation.navigate('Main')
        } catch (error) {
            Alert.alert(
                t('sentErrorTitle'),
                t('sentError')
            );
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.headerContainer}>
                <View style={styles.textContainer}>
                    <Text variant="headlineLarge" style={styles.headertextStyle} >
                        {t('addProduct')}
                    </Text>
                    <Text variant="titleMedium" style={styles.textStyle}>
                        {t('addProductTitle')}
                    </Text>
                </View>
            </View>
            <View style={styles.flexBody}>
                <Formik
                    initialValues={initialFormValues}
                    onSubmit={postHandler}
                    validationSchema={yup.object().shape({
                        pName: yup
                            .string()
                            .required(),
                        url: yup
                            .string()
                            .url()
                            .required(),
                        description: yup
                            .string()
                            .required(),
                        specifications: yup
                            .string()
                            .min(8)
                            .required(),
                    })}>

                    {({ handleSubmit, handleChange, values, errors, setFieldTouched, touched, isValid }) => (
                        <Fragment>
                            <ScrollView>
                                <View>
                                    <View>
                                        <Input
                                            label={t('productImg')}
                                            value={values.url}
                                            onUpdateValue={handleChange('url')}
                                            onBlur={() => setFieldTouched('url')}
                                            isInvalid={touched.url && errors.url}
                                            invalidText={errors.url}
                                            multiline={true}
                                        />
                                    </View>
                                    <View>
                                        <Input
                                            label={t('productName')}
                                            value={values.pName}
                                            onUpdateValue={handleChange('pName')}
                                            onBlur={() => setFieldTouched('pName')}
                                            isInvalid={touched.pName && errors.pName}
                                            invalidText={errors.pName}
                                        />
                                    </View>
                                    <View>
                                        <Input
                                            label={t('productDescription')}
                                            value={values.description}
                                            onUpdateValue={handleChange('description')}
                                            onBlur={() => setFieldTouched('description')}
                                            isInvalid={touched.description && errors.description}
                                            invalidText={errors.description}
                                            multiline={true}
                                        />
                                    </View>
                                    <View>
                                        <Input
                                            label={t('techSpecs')}
                                            value={values.specifications}
                                            onUpdateValue={handleChange('specifications')}
                                            onBlur={() => setFieldTouched('specifications')}
                                            isInvalid={touched.specifications && errors.specifications}
                                            invalidText={errors.specifications}
                                            multiline={true}
                                        />
                                    </View>
                                </View>
                            </ScrollView>

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

export default NewProductScreen;

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
})