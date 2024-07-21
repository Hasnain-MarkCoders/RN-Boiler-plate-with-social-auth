

import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  LogBox,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { scale } from 'react-native-size-matters';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import BootSplash from "react-native-bootsplash";
import Snackbar from 'react-native-snackbar';
import {WEBCLIENTID  } from "@env"

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const init = async () => {
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, [isAuth]);
  useEffect(()=>{
    console.log(WEBCLIENTID)
  })
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: WEBCLIENTID, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // specifies an email address or subdomain that will be pre-filled in the login hint field
      forceCodeForRefreshToken: true, // [Android] if you want to force code for refresh token
      accountName: '', // [Android] specifies an account name on the device that should be used,

    });
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const res = await auth().signInWithCredential(googleCredential)
      const firebaseToken = await res.user.getIdToken();
      Snackbar.show({
        text: `${res?.user?.displayName} logged in with Google`,
        duration: Snackbar.LENGTH_SHORT,
    });
    } 
    catch (error) {
        Snackbar.show({
          text: error.toString(),
          duration: Snackbar.LENGTH_SHORT,
      });
    } finally {

      setLoading(false)
    }
  };


  async function onFacebookButtonPress() {
    setLoading(true)

    // Attempt login with permissions
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        Snackbar.show({
          text: 'User cancelled the login process',
          duration: Snackbar.LENGTH_SHORT,
      });
        throw 'User cancelled the login process';
      }

      // // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        Snackbar.show({
          text: 'Something went wrong obtaining access token',
          duration: Snackbar.LENGTH_SHORT,
      });
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(facebookCredential);
      const firebaseIdToken = await userCredential.user.getIdToken();
      Snackbar.show({
        text: `${userCredential?.user?.displayName} logged in with Facebook.`,
        duration: Snackbar.LENGTH_SHORT,
    });


    } catch (error) {
        Snackbar.show({
          text: error.toString(),
          duration: Snackbar.LENGTH_SHORT,
      });
      
    } finally {

      setLoading(false)
    }

  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuth(user)
        console.log(user)
      } else {
        setIsAuth(false)
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [isAuth]);


  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  const handleLogout = async () => {
    Snackbar.show({
      text: "Are you sure you want to log out?",
      duration: Snackbar.LENGTH_SHORT,
      action: {
          text: 'logout',
          textColor: 'red',
          onPress:async () => {
            setLoading(true)
              await auth().signOut()
              setIsAuth(false)
              setLoading(false)
          },
      },
  });
   

  }

  if (loading) {
    return <View style={{
      backgroundColor: "black",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}>
      <ActivityIndicator size={"large"} color={"white"} />

    </View>
  }


  if (!isAuth) {
    return <View style={{
      backgroundColor: "black",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: scale(20),

    }}>
      <TouchableOpacity

        onPress={signInWithGoogle}
        style={{
          borderRadius: scale(12),
          borderWidth: 1,
          borderColor: "#ffffff",
          padding: scale(20),
          color: "white",
          width: "90%",

        }}>
        <Text style={{
          color: "white",
          textAlign: "center",
          fontSize: scale(16)


        }}> Continue With Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onFacebookButtonPress}
        style={{
          borderRadius: scale(12),
          borderWidth: 1,
          borderColor: "#ffffff",
          padding: scale(20),
          width: "90%",
          color: "white"

        }}>
        <Text style={{
          color: "white",
          textAlign: "center",
          fontSize: scale(16)

        }}> Continue With Facebook</Text>
      </TouchableOpacity>

    </View>
  }
  return (

    <View style={{
      flex: 1,
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <View style={{
        width: "90%",
        borderRadius: scale(12),
        borderWidth: 1,
        borderColor: "#ffffff",
        padding: scale(30),
        gap: scale(20)

      }}>
        {isAuth.photoURL && <Image style={{
          width: scale(50),
          height: scale(50),
          borderRadius: scale(12),
          borderWidth: 1,
          borderColor: "white",
        }} source={{ uri: isAuth.photoURL }} />}
        <Text
          ellipsizeMode='tail'
          numberOfLines={1} 
          style={{
            color: "white",
            fontSize: scale(16),
          }}>Name : {isAuth.displayName}</Text>
        <Text
          ellipsizeMode='tail'
          numberOfLines={1} 
          style={{
            color: "white",
            fontSize: scale(16),
          }}>Email : {isAuth.email}</Text>
        <Text
          ellipsizeMode='tail'
          numberOfLines={1} 

          style={{
            color: "white",
            fontSize: scale(16),
          }}>Verified : {isAuth.emailVerified ? "Verified" : "Not Verified"}</Text>
        <Text
          ellipsizeMode='tail'
          style={{
            color: "white",
            fontSize: scale(16),
          }}>Provider : {isAuth.providerId}</Text>

        <TouchableOpacity
          onPress={handleLogout}
        >
          <Text style={{
            color: "red",
            fontSize: scale(16),
            borderWidth:1,
            borderColor:"red",
            alignSelf:"flex-start",
            paddingHorizontal:scale(10),
            paddingVertical:scale(10),
            borderRadius:scale(12)
          }}> Logout</Text>
        </TouchableOpacity>

      </View>
    </View>

  );
}



export default App;
