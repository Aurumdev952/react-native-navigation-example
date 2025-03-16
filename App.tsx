import React from "react";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, Button, Image, StyleSheet } from "react-native";
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
  <View style={styles.container}>
    <Image source={{ uri: "data:image/jpeg;base64,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" }} style={styles.image} />
    <Text style={styles.title}>Welcome to the Home Screen</Text>
    <Text style={styles.text}>Explore the app and navigate through different sections.</Text>
    <Button title="Go to Details" onPress={() => navigation.navigate("Details")} color="#6200EE" />
  </View>
);

const DetailsScreen: React.FC<{ navigation: DetailsScreenNavigationProp }> = ({ navigation }) => (
  <View style={styles.container}>
    <Ionicons name="information-circle" size={80} color="#6200EE" />
    <Text style={styles.title}>Details Screen</Text>
    <Text style={styles.text}>Here you can find more detailed information about the app.</Text>
    <Button title="Go to Profile" onPress={() => navigation.navigate("Main", { screen: "Profile" } as any)} color="#6200EE" />
  </View>
);

const ProfileScreen: React.FC = () => (
  <View style={styles.container}>
    <Ionicons name="person-circle" size={80} color="#6200EE" />
    <Text style={styles.title}>Profile Screen</Text>
    <Text style={styles.text}>Manage your profile settings and personal information here.</Text>
  </View>
);

const SettingsScreen: React.FC = () => (
  <View style={styles.container}>
    <Ionicons name="settings" size={80} color="#6200EE" />
    <Text style={styles.title}>Settings</Text>
    <Text style={styles.text}>Adjust your preferences and application settings.</Text>
  </View>
);

const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = route.name === "Home" ? "home" : "person";
        return <Ionicons name={iconName as any} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#6200EE",
      tabBarInactiveTintColor: "gray",
    })}
  >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#6200EE",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
});

const App: React.FC = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
