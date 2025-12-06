import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Images } from "@/constants/Images";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) {
      // Show error message
      return;
    }

    // TODO: Call API to send OTP to email
    
    router.push({
      pathname: '/(auth)/verify-otp',
      params: { 
        email,
        from: 'forgot-password'
      }
    });
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <View className="items-center mb-8">
        <Image
          source={Images.kekeLogo}
          style={{ width: 100, height: 50 }}
          contentFit="contain"
          transition={200}
        />
        <Text className="mt-4 text-4xl text-black font-bold">
          Forgot Password?
        </Text>
        <Text className="mt-2 text-lg text-gray-600 text-center">
          Enter your email address and we'll send you a code to reset your password
        </Text>
      </View>

      <FormControl className="rounded-lg w-full mb-6">
        <VStack space="sm">
          <Text className="text-black text-xl">Email</Text>
          <Input variant="underlined">
            <InputField
              type="text"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              className="text-black"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Input>
        </VStack>
      </FormControl>

      <Button
        className="mb-4 w-full bg-primary-main"
        size="lg"
        action="primary"
        onPress={handleSubmit}
        style={{ height: 56 }}
      >
        <ButtonText className="text-white">Send Code</ButtonText>
      </Button>

      <View className="flex-row items-center">
        <Text className="text-black text-lg">Remember password? </Text>
        <Button
          variant="link"
          size="md"
          action="primary"
          onPress={handleBackToLogin}
        >
          <ButtonText className="text-primary-main font-bold">
            Back to Login
          </ButtonText>
        </Button>
      </View>
    </View>
  );
}