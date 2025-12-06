import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Images } from "@/constants/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useRef } from "react";
import { View, TextInput } from "react-native";

export default function VerifyOTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email as string;
  const from = params.from as string; // 'signup' or 'forgot-password'
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
      router.push('/(auth)/change-password');
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      // Show error message
      return;
    }


    // TODO: Call API to verify OTP
    // For now, just navigate based on the flow
    
    if (from === 'forgot-password') {
      router.push({
        pathname: '/(auth)/change-password',
        params: { email }
      });
    } else {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      router.replace('/');
    }
  };

  const handleResend = () => {
    // TODO: Call API to resend OTP
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <View className="flex-1 items-center pt-20 bg-white p-6">
      <View className="items-center mb-8">
        <Image
          source={Images.kekeLogo}
          style={{ width: 100, height: 50 }}
          contentFit="contain"
          transition={200}
        />
        <Text className="mt-4 text-4xl text-black font-bold">
          Verify OTP
        </Text>
        <Text className="mt-2 text-lg text-gray-600 text-center">
          Enter the 4-digit code sent to{'\n'}{email}
        </Text>
      </View>

      <VStack className="gap-6 w-full">
        <View className="flex-row justify-between w-full px-8">
          {otp.map((digit, index) => (
            <Input
              key={index}
              variant="outline"
              className="w-16 h-16"
            >
              <InputField
                ref={(ref) => (inputRefs.current[index] = ref)}
                type="text"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                className="text-black text-center text-2xl"
                selectTextOnFocus
              />
            </Input>
          ))}
        </View>

        <Button
          className="w-full bg-primary-main"
          size="lg"
          action="primary"
          onPress={handleVerify}
          style={{ height: 56 }}
        >
          <ButtonText className="text-white">Verify</ButtonText>
        </Button>

        <View className="flex-row items-center justify-center">
          <Text className="text-black text-lg">Didn't receive code? </Text>
          <Button variant="link" size="md" action="primary" onPress={handleResend}>
            <ButtonText className="text-primary-main font-bold">Resend</ButtonText>
          </Button>
        </View>
      </VStack>
    </View>
  );
}