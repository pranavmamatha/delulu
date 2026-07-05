import Jobs from "@/components/jobs/Jobs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Image } from "expo-image";
import { cssInterop } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { useJobs } from "@/hooks/jobs/use-jobs";
import { useJobStore } from "@/store/useJobStore";

cssInterop(Image, { className: "style" });

export default function Profile() {
  const { loadMore, hasMore } = useJobs();
  const { isLoading } = useJobStore();

  return (
    <View className="flex-1 bg-delulu-primary">
      <View className="absolute bottom-0 left-0 right-0 h-1/2 bg-delulu-card" />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={({ nativeEvent }) => {
          const isCloseToBottom = nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 200;
          if (isCloseToBottom && hasMore && !isLoading) {
            loadMore();
          }
        }}
        scrollEventThrottle={16}
      >
        {/* Profile Header with gradient, photo, stats, and logout */}
        <ProfileHeader />

        {/* My Creations Section */}
        <View className="bg-delulu-card flex-1 rounded-t-[40px] pt-12 pb-[100px] px-6 min-h-[600px] mt-4">
          <Text className="text-xl font-extrabold text-delulu-dark mb-6 tracking-tight">
            My Creations
          </Text>
          <Jobs />
        </View>
      </ScrollView>
    </View>
  )
}
