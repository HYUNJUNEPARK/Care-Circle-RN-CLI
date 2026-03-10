import { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

function CircleSpinner() {
    const spinAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const spin = Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: undefined,
            })
        );
        spin.start();
        return () => spin.stop();
    }, [spinAnim]);

    const spinInterpolate = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.spinner}>
            <Animated.View
                style={[
                    styles.spinnerIcon,
                    { transform: [{ rotate: spinInterpolate }] },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinnerIcon: {
        width: 16,
        height: 16,
        borderWidth: 2,
        borderColor: 'transparent',
        borderTopColor: '#333',
        borderRadius: 8,
    },
});

export default CircleSpinner;