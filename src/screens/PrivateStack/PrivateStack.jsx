import { View, Image, Text, Vibration } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home/Home';
import homeIcon from "./../../../assets/images/homeicon.png";
import Awards from '../Awards/Awards';
import awardicon from "./../../../assets/images/awardicon.png"
import profileicon from "./../../../assets/images/profileicon.png"
import ProfileScreen from '../Profile/Profile';
import QRScreen from '../QRScreen/QRScreen';
import qrImage from "./../../../assets/images/qr_transparent.png"
import search from "./../../../assets/images/search.png"
import { scale } from 'react-native-size-matters';
import SearchScreen from '../SearchScreen/SearchScreen';
const Tab = createBottomTabNavigator();

const PrivateStack = () => {
    const logScreenNameOnFocus = ({ route }) => ({
        focus: () => {
            Vibration.vibrate(10)
        },
    });

    return (
        <Tab.Navigator
        tabBarOnPress={()=>{
        }}
            screenOptions={{
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarIcon: () => null,
                tabBarStyle: {
                    backgroundColor: "#FFA100",
                    position: "absolute",
                    height: 80,
                    elevation: 5,
                    left: 0,
                    right: 0,
                    bottom: 0
                }
            }}
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
        >
            <Tab.Screen
                 name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ gap: 8, alignItems: "center" }}>
                            <Image source={homeIcon} />
                            <Text style={{ fontSize: 12,   color: focused ? 'black' : 'white',lineHeight: 18, color: "white" }}>Home</Text>
                        </View>
                    ),
                    animation: "fade"
                }}
            />

            <Tab.Screen
                name="Search"
                initialParams={{ customFunction: () =>{}, url:"", title:""}}
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ gap: 8, alignItems: "center" }}>
                            <Image source={search} />
                            <Text style={{ fontSize: 12, lineHeight: 18, color: "white" }}>Search</Text>
                        </View>
                    ),
                    animation: "fade"
                }}
            />
            <Tab.Screen
                name="QRScan"
                component={QRScreen}
                // initialParams={{ customFunction: () =>{}}}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ gap: 8, alignItems: "center", backgroundColor: "white", padding: scale(20), borderRadius: scale(50) }}>
                            <Image source={qrImage} />
                        </View>
                    ),
                    animation: "fade"
                }}
            />

            <Tab.Screen
                name="Awards"
                component={Awards}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ gap: 8, alignItems: "center" }}>
                            <Image source={awardicon} />
                            <Text style={{ fontSize: 12, lineHeight: 18, color: "white" }}>Awards</Text>
                        </View>
                    ),
                    animation: "fade"
                }}
            />


            <Tab.Screen
                name="Main"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ gap: 8, alignItems: "center" }}>
                            <Image source={profileicon} />
                            <Text style={{ fontSize: 12, lineHeight: 18, color: "white" }}>Profile</Text>
                        </View>
                    ),
                    animation: "fade"
                }}
            />

            


            {/* <Tab.Screen
                name="Logout"
                component={LogoutScreen}
                options={{
                    tabBarIcon: ({ focused }) => <Logout />,
                    animation: "fade"
                }}
            /> */}
        </Tab.Navigator>
    );
};

export default PrivateStack;
