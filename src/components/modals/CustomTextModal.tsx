import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import colors from '../../styles/colors';

const ANIMATION_DURATION = 300; // ms

type CustomTextModalProps = {
    show: boolean;
    title: string;
    message?: string | null;
    confirmText?: string | null;
    cancelText?: string | null;
    onConfirm: () => void;
    onCancel?: () => void;
};

const CustomTextModal = ({
    show,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
}: CustomTextModalProps) => {
    const [visible, setVisible] = useState(show);
    const [slideAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (show) {
            setVisible(true);
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
                easing: Easing.in(Easing.cubic),
            }).start(() => setVisible(false));
        }
    }, [show, slideAnim]);

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent={true}
        >
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.modalBox,
                        {
                            opacity: slideAnim,
                            transform: [
                                {
                                    translateY: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-100, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.title}>{title}</Text>
                    {!!message && <Text style={styles.message}>{message}</Text>}
                    <View style={styles.buttonRow}>
                        {cancelText && onCancel && (
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={onCancel}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.buttonText, styles.cancelButtonText]}>{cancelText}</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={onConfirm}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.buttonText, styles.confirmButtonText]}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.14)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBox: {
        backgroundColor: '#fff',
        borderRadius: 32,
        minWidth: 280,
        maxWidth: '90%',
        paddingTop: 32,
        paddingBottom: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 24,
        elevation: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 14,
        color: '#000',
        textAlign: 'center',
    },
    message: {
        fontSize: 13,
        fontWeight: '400',
        color: '#000',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 0,
        marginTop: 0,
        alignSelf: 'stretch',
    },
    buttonRow: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    button: {
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 0,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    cancelButton: {
        backgroundColor: '#e6e6e7',
    },
    confirmButton: {
        backgroundColor: colors.primary,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '700',
    },
    cancelButtonText: {
        color: '#000',
    },
    confirmButtonText: {
        color: '#fff',
    },
});

export default CustomTextModal;
