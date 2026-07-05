import { useProfile } from "@/hooks/profile/use-profile";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  useProfile();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          height: 90,
          paddingTop: 10,
          paddingBottom: 25,
          position: 'absolute',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#3C4A22',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View>
              {focused && (
                <View style={{ position: 'absolute', top: -6, left: -16, right: -16, bottom: -6, backgroundColor: '#D8FA39', borderRadius: 12 }} />
              )}
              <Ionicons name={focused ? "home" : "home-outline"} size={22} color={focused ? '#3C4A22' : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View>
              {focused && (
                <View style={{ position: 'absolute', top: -6, left: -16, right: -16, bottom: -6, backgroundColor: '#D8FA39', borderRadius: 12 }} />
              )}
              <Ionicons name={focused ? "person" : "person-outline"} size={22} color={focused ? '#3C4A22' : color} />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}
