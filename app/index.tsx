import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";

// Add this temporarily to reset onboarding
AsyncStorage.removeItem('hasCompletedOnboarding');

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-red-200">
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
