import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="auth" options={{ 
          // headerShown: true,
          title: "Welcome",
          headerBackVisible: true,
          gestureEnabled: true,
        }} />
    </Stack>
  );
}