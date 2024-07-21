import { Image, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import React from 'react'
import back from "./../../../assets/images/back.png"
import { useSelector } from 'react-redux'
import { scale } from 'react-native-size-matters'
import menu from "./../../../assets/images/menu.png"
import { useNavigation, DrawerActions } from '@react-navigation/native';
const Header = ({
  title = "",
  description = "",
  isWelcome = false,
  showText = true,
  showDescription=true,
  cb = () => { },
  headerContainerStyle={},
  showProfilePic=true,
  showMenu=true
}) => {
  const navigation = useNavigation()
let url = ""
  const auth = useSelector(state => state.auth)
  const { user, authenticated } = auth
  url = auth?.url
  const titleArray = title?.split(" ")
  console.log(auth)
  return (

    <View style={{
      paddingHorizontal: scale(20),
      paddingTop: scale(30),
      ...headerContainerStyle
    }}>

    <View style={{
           flexDirection:authenticated?"row":"column",
           justifyContent:"space-between",
    }}>
      <View style={{
      }}>
        <TouchableOpacity onPress={()=>(cb(), Vibration.vibrate(10))} >
          <Image style={{
            display: "flex"
          }} source={back} />
        </TouchableOpacity>

      </View>

{   (authenticated && showProfilePic)?  
      <TouchableOpacity onPress={()=>{navigation.navigate("Main")}}>

        <Image
         style={{
           width: scale(40),
           height: scale(40),
           borderRadius: scale(50)
         }}
         source={{ uri: url }}
       />
      </TouchableOpacity>
      
      :(authenticated && showMenu)?<TouchableOpacity onPress={() => (navigation.dispatch(DrawerActions.openDrawer(), Vibration.vibrate(10)))}>
        <Image source={menu}/>
      </TouchableOpacity>:null
}
    </View>

    
{
  showText ?

    <>

      <View style={{
        flexDirection: "row",
        gap: 10,
        marginTop:scale(30)
      }}>
        {
          titleArray?.map((x, i) => (<Text
            key={i}
            style={{
              color: "white",
              fontWeight: 600,
              fontSize: 35,
              lineHeight: 50

            }}>{x.length > 1 ? `${x.charAt(0).toLocaleUpperCase()}${x.slice(1)}` : x}</Text>))


        }
        {
          isWelcome &&
          <Text style={{
            color: "#FFA100",
            fontWeight: 600,
            fontSize: 35,
            lineHeight: 50

          }}>Sauced</Text>
        }
      </View>
    {showDescription &&  <Text style={{
        color: "white",
        marginTop: 15,
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: "700"
      }}>
        {description}
      </Text>}
    </>
    : null
}
</View>


  )
}

export default Header

const styles = StyleSheet.create({})