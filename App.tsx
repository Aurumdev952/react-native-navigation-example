import React from "react";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

type RootStackParamList = {
  Main: undefined;
  Details: undefined;
};

type TabParamList = {
  Home: undefined;
  Profile: undefined;
};

type DrawerParamList = {
  Tabs: undefined;
  Settings: undefined;
};

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Details">;

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const HomeScreen: React.FC<{ navigation: DetailsScreenNavigationProp }> = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 24 }}>Home Screen</Text>
    <Button title="Go to Details" onPress={() => navigation.navigate("Details")} />
  </View>
);

const DetailsScreen: React.FC<{ navigation: DetailsScreenNavigationProp }> = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 24 }}>Details Screen</Text>
    <Button title="Go to Profile" onPress={() => navigation.navigate("Main", { screen: "Profile" } as any)} />
  </View>
);

const ProfileScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 24 }}>Profile Screen</Text>
  </View>
);

const SettingsScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 24 }}>Settings Screen</Text>
  </View>
);

const TabNavigator: React.FC = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName = route.name === "Home" ? "home" : "person";
      return <Ionicons name={iconName as any} size={size} color={color} />;
    },
  })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const DrawerNavigator: React.FC = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Tabs" component={TabNavigator} options={{ title: "Home" }} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
  </Drawer.Navigator>
);

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("myapp://")],
  config: {
    screens: {
      Main: {
        screens: {
          Tabs: {
            screens: {
              Home: "home",
              Profile: "profile",
            },
          },
          Settings: "settings",
        },
      },
      Details: "details",
    },
  },
};


const App: React.FC = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
