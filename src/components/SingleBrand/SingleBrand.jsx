import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const SingleBrand = ({
    url = "",
}) => {
    return (
        <View style={styles.container}>
            <Image
                source={url}
                style={styles.image}
            />
           
        </View>
    );
};

export default SingleBrand;

const styles = StyleSheet.create({
    container: {
        borderRadius: moderateScale(7),
      elevation:5

    },
});
