import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useJobStore } from "@/store/useJobStore";
import { useProfileStore } from "@/store/useProfileStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import { Alert, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfilePhoto from "./ProfilePhoto";
import ProfileStats from "./ProfileStats";

// Enable NativeWind styling for LinearGradient
cssInterop(LinearGradient, { className: "style" });

export default function ProfileHeader() {
    const { top } = useSafeAreaInsets();
    const { reset: resetAuth } = useAuthStore();
    const { reset: resetJobs } = useJobStore();
    const { reset: resetProfile } = useProfileStore();

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await supabase.auth.signOut();
                        resetAuth();
                        resetJobs();
                        resetProfile();
                    }
                }
            ]
        );
    };

    return (
        <View className="relative mb-8 bg-delulu-primary">
            <View
                style={{
                    paddingTop: top + 10,
                    paddingBottom: 40,
                }}
            >
                {/* Logout Button */}
                <View className="flex-row justify-end px-6 mb-2">
                    <Pressable
                        onPress={handleLogout}
                        className="bg-black/5 rounded-full p-3 active:bg-black/10"
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={20}
                            color="#3C4A22"
                        />
                    </Pressable>
                </View>

                {/* Profile Photo */}
                <ProfilePhoto />
            </View>

            {/* Stats Section Overlapping */}
            <View className="absolute -bottom-8 left-0 right-0 z-10">
                <ProfileStats />
            </View>
        </View>
    );
}
