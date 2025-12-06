import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import "../global.css";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // Wait for navigation to be ready
    if (!navigationState?.key) return;

    const checkOnboardingStatus = async () => {
      const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
      
      if (!hasCompletedOnboarding) {
        router.push("/(onboarding)/splash");
      }
    };

    checkOnboardingStatus();
  }, [navigationState?.key]);

  return (
    
    <GluestackUIProvider mode="dark">
      <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="index" />
    </Stack>
    </GluestackUIProvider>
  
  );
}
