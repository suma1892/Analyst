import React from 'react';
import { View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const SkeletonPlaceHoler = ({ visible }) => (
    <View style={{
        // marginHorizontal: 20,
        padding: 15,
        // paddingBottom:10,
        borderBottomColor: "#c4c4c4",
        borderBottomWidth: 1,
        marginBottom: 10
    }}>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // marginTop: 40,
            }}>
            <ShimmerPlaceHolder
                height={15}
                width={115}
                style={{ borderRadius: 30 }}
                visible={false}
            />
            <ShimmerPlaceHolder
                height={15}
                width={115}
                style={{ borderRadius: 30 }}
                visible={false}
            />
        </View>

        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
            }}>
            <View style={{

            }}>
                <ShimmerPlaceHolder
                    height={50}
                    width={135}
                    style={{ borderRadius: 10 }}
                    visible={false}
                />
            </View>
            <ShimmerPlaceHolder
                height={15}
                width={75}
                style={{ borderRadius: 30, alignSelf: 'flex-start' }}
                visible={false}
            />
        </View>
    </View>
);

export default SkeletonPlaceHoler;