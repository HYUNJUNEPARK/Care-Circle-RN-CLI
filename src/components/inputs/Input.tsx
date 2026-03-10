import { View, Text, TextInput, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

export type InputType = "plaintext" | "password";

interface InputProps {
    inputType: InputType;
    label: string;
    placeholder: string;
    value: string;
    onChange: (text: string) => void;
    show?: boolean;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Input({
    inputType,
    label,
    placeholder,
    value,
    onChange,
    show,
    setShow,
}: InputProps) {
    return (
        <View style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 2
        }}>
            <Text style={{
                fontSize: 14,
                marginBottom: 2,
                color: "#000",
                textAlign: "left",
                marginLeft: 4
            }}>{label}</Text>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                position: "relative",
                backgroundColor: "#fff"
            }}>
                <TextInput
                    style={{
                        flex: 1,
                        paddingLeft: 16,
                        paddingRight: 66,
                        fontSize: 16,
                        height: 50,
                        borderRadius: 8,
                        color: "#2b2b2b"
                    }}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={inputType === "password" && !show}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {/* 비밀번호 표시/숨기기 버튼 */}
                {inputType === "password" && value && setShow !== undefined && (
                    <TouchableOpacity
                        onPress={() => setShow && setShow(prev => !prev)}
                        style={{
                            position: "absolute",
                            right: 38,
                            top: "50%",
                            transform: [{ translateY: -25 }],
                            padding: 8,
                            zIndex: 1
                        }}
                    >
                        {show ? (
                            <Feather name="eye" size={20} color="#888" />
                        ) : (
                            <Feather name="eye-off" size={20} color="#888" />
                        )}
                    </TouchableOpacity>
                )}
                {/* 입력 지우기 */}
                {value && (
                    <TouchableOpacity
                        onPress={() => onChange("")}
                        style={{
                            position: "absolute",
                            right: 8,
                            top: "50%",
                            transform: [{ translateY: -25 }],
                            padding: 8,
                            zIndex: 1
                        }}
                    >
                        <MaterialIcons name="cancel" size={24} color="#888" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

