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
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Templates",
          tabBarIcon: ({ color, focused }) => (
            <View className={`px-4 py-1.5 rounded-xl ${focused ? 'bg-[#D8FA39]' : 'bg-transparent'}`}>
              <Ionicons name={focused ? "grid" : "grid-outline"} size={22} color={color} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: () => (
            <View className="bg-[#D8FA39] w-14 h-14 rounded-full items-center justify-center -mt-6 shadow-lg shadow-black/20">
              <Ionicons name="add" size={32} color="#3C4A22" />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          title: "My Plans",
          tabBarIcon: ({ color }) => (
            <Ionicons name="clipboard-outline" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={24} color={color} />
          )
        }}
      />
      {/* Hide profile from bottom tabs but keep it accessible */}
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}
