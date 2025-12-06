import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function AuthScreen() {
  const router = useRouter();

  const handleLogin = async () => {
    // Save that user has completed onboarding
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    router.replace("/(auth)/login");
  };
  
  const handleSignUp = async () => {
    // Save that user has completed onboarding
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    router.replace("/(auth)/signup");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Image 
        source={Images.kekeLogo}
        style={{ width: 100, height: 200 }}
        contentFit="contain"
        transition={200}
      />
      <Text className="mb-8 text-3xl text-black font-bold">
        Welcome!
      </Text>

      <Button 
        className="mb-4 bg-primary-main w-full" 
        size="lg"
        action="primary"
        onPress={handleLogin}
        style={{ height: 56 }}
      >
        <ButtonText className="text-white">Login</ButtonText>
      </Button>

      <Button 
        className="w-full bg-primary-light" 
        size="lg"
        variant="outline"
        action="primary"
        onPress={handleSignUp}
        style={{ height: 56 }}
      >
        <ButtonText className="text-black">Sign Up</ButtonText>
      </Button>
    </View>
  );
}