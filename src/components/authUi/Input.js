import { TextInput, HelperText } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/styles";

function Input({
    label,
    keyboardType,
    onUpdateValue,
    value,
    isInvalid,
    invalidText,
    password,
    onBlur,
    email,
    multiline
}) {

    const [seePassword, setSeePassword] = useState(true);

    if (password === false) {
        seePassword = true;
    }

    return (
        <View>
            <TextInput
                label={label}
                keyboardType={keyboardType}
                mode="outlined"
                autoCapitalize="none"
                activeOutlineColor={Colors.primary}
                onChangeText={onUpdateValue}
                value={value}
                onBlur={onBlur}
                multiline={multiline}
                secureTextEntry={password ? seePassword : false}
                right={password ? <TextInput.Icon icon="eye" onPress={() => setSeePassword(!seePassword)} /> : false ||
                    email ? <TextInput.Icon icon="email" /> : false}
            />
            <HelperText type="error" visible={isInvalid}>
                {invalidText}
            </HelperText>
        </View>
    );
}

export default Input;