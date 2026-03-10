import React from 'react';
import { View, Image } from 'react-native';
import { appIcon } from '../../../assets';

interface CircleProfileImageProps {
    imgUrl?: string | undefined | null;
    size?: number;
    style?: object;
}

function CircleProfileImage({
    imgUrl,
    size = 66,
    style
}: CircleProfileImageProps) {
    return (
        <View
            style={{
                alignItems: 'center',
                ...style,
            }}
        >
            <View
                style={{
                    padding: 8,
                    backgroundColor: '#fff',
                    borderRadius: size / 2 + 8,
                    borderWidth: 1,
                    borderColor: '#d7d7d7',
                }}
            >
                <Image
                    source={imgUrl ? { uri: imgUrl } : appIcon}
                    style={{
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: '#fff',
                    }}
                    resizeMode="cover"
                />
            </View>
        </View>
    );
}

export default CircleProfileImage;
