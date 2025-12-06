import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { Image } from 'expo-image';
import { Images } from "@/constants/Images";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simulate splash screen delay
    const timer = setTimeout(() => {
      router.push("/(onboarding)/auth");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image 
        source={Images.kekeLogo}
        style={{ width: 200, height: 200 }}
        contentFit="contain"
        transition={200}
      />
    </View>
  );
}