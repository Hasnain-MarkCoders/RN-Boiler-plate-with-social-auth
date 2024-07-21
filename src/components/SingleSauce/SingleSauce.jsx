import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import filledHeart from "./../../../assets/images/filledHeart.png"
const SingleSauce = ({
    url = "",
    title="",
    customStyles={}
}) => {

const navigation = useNavigation()
const [selected, setSelected] = useState(true)
    return (
        <TouchableOpacity
        activeOpacity={.8}
        onPress={()=>{navigation.navigate("ProductDetail", {url, title})}}
        onLongPress={()=>{setSelected(prev=>!prev)}}
        
        style={[styles.container,
            {width:scale(110), ...customStyles},
            
        ]}>
            <Image
              source={{uri:url}}
                style={styles.image}
            />
            <Text style={styles.text}>
              {title}
            </Text>

        {selected?  <Image
            onPress={()=>{
                setSelected(prev=> !prev)
            }

            }
        
        style={{
                width:scale(20),
                height:scale(20),
                position:"absolute",
                bottom:scale(15),
                right:scale(10),
            }} source={filledHeart}/>
            
            
            : <Image
            
            onPress={()=>{
                setSelected(prev=> !prev)
            }

            }
            style={{
                width:scale(20),
                height:scale(20),
                position:"absolute",
                bottom:scale(15),
                right:scale(10),
            }} source={filledHeart}/>
            
            
            }
          
           
        </TouchableOpacity>
    );
};

export default SingleSauce;

const styles = StyleSheet.create({
    container: {
        borderRadius: moderateScale(7),
        height: verticalScale(160),
        position:"relative",
        borderRadius:scale(10),
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit:"cover",
        borderRadius:scale(10)

    },
    text:{
      position:"absolute",
      bottom:15,
      left:10,
      color:"white",
      width:"50%",
    }
});
