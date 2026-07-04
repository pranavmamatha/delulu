import GoogleSignInButton from "@/components/auth/google-signin-button";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function Login() {
  return (
    <View className="flex-1 bg-delulu-primary relative overflow-hidden">
      <StatusBar style="dark" />

      {/* Decorative background shapes */}
      <View className="absolute -bottom-40 -left-20 w-[400px] h-[400px] bg-delulu-dark rounded-full" />
      <View className="absolute -right-20 top-1/4 w-[300px] h-[300px] bg-delulu-primary/80 rounded-full mix-blend-screen" />
      
      <View className="absolute top-12 left-8 opacity-80 transform -rotate-12">
        <Text className="text-delulu-pink text-5xl font-light">〰</Text>
      </View>
      <View className="absolute top-16 right-10">
        <Text className="text-delulu-dark text-4xl">✨</Text>
      </View>
      <View className="absolute bottom-32 right-6 opacity-80 transform rotate-12">
        <Text className="text-delulu-pink text-5xl font-light">〰</Text>
      </View>
      <View className="absolute top-1/2 left-6">
        <Text className="text-delulu-dark text-3xl">✴</Text>
      </View>

      <View className="flex-1 justify-center items-center p-6 w-full max-w-md mx-auto z-10 mt-10 mb-8">
        <Animated.View
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="w-full bg-delulu-card rounded-[40px] p-8 items-center shadow-xl shadow-black/5 flex-1 justify-between py-12"
        >
          <View className="items-center w-full">
            {/* Logo Section */}
            <Image
              source={require("../assets/images/splash-icon.png")}
              className="w-32 h-32 mb-2"
              contentFit="contain"
            />

            <Text className="text-[64px] font-extrabold text-delulu-dark tracking-tighter mb-4 text-center leading-none">
              delulu
            </Text>
            
            <View className="items-center mb-8">
              <Text className="text-delulu-dark text-[20px] font-bold text-center">
                Turn your <Text className="text-delulu-pink italic">delusion</Text> into reality.
              </Text>
              <View className="w-16 h-1 bg-delulu-pink/40 rounded-full mt-2 -rotate-2" />
            </View>

            <Text className="text-delulu-dark/70 text-center text-[15px] font-medium px-4 leading-relaxed">
              Your AI companion to plan, create and achieve the life you imagine.
            </Text>
          </View>

          {/* Action Section */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="w-full mt-8"
          >
            <View className="mb-8">
              <GoogleSignInButton />
            </View>

            <Text className="text-delulu-dark/60 text-[13px] text-center px-2 leading-5">
              By continuing, you agree to our{"\n"}
              <Text className="text-delulu-pink font-semibold">Terms of Service</Text> and <Text className="text-delulu-pink font-semibold">Privacy Policy</Text>
            </Text>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}
