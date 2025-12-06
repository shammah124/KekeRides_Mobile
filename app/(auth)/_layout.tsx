import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="verify-otp" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="change-password" />
    </Stack>
  );
}