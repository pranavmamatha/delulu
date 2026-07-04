import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Plans() {
  return (
    <View className="flex-1 bg-delulu-primary">
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-delulu-dark">My Plans</Text>
      </SafeAreaView>
    </View>
  );
}
