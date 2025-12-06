import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Images } from "@/constants/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email as string;
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {

    router.push('/');

    if (!newPassword || !confirmPassword) {
      // Show error: All fields are required
      return;
    }

    if (newPassword !== confirmPassword) {
      // Show error: Passwords don't match
      return;
    }

    if (newPassword.length < 8) {
      // Show error: Password must be at least 8 characters
      return;
    }

    // TODO: Call API to change password
    
    // Navigate to home after successful password change
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    router.replace('/');
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
          Change Password
        </Text>
        <Text className="mt-2 text-lg text-gray-600 text-center">
          Enter your new password
        </Text>
      </View>

      <FormControl className="rounded-lg w-full mb-6">
        <VStack className="gap-4">
          <VStack space="sm">
            <Text className="text-black text-xl">New Password</Text>
            <Input variant="underlined">
              <InputField
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                className="text-black"
              />
              <InputSlot
                className="pr-3 text-black"
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <InputIcon as={showNewPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>

          <VStack space="sm">
            <Text className="text-black text-xl">Confirm Password</Text>
            <Input variant="underlined">
              <InputField
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                className="text-black"
              />
              <InputSlot
                className="pr-3 text-black"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
        </VStack>
      </FormControl>

      <Button
        className="w-full bg-primary-main"
        size="lg"
        action="primary"
        onPress={handleChangePassword}
        style={{ height: 56 }}
      >
        <ButtonText className="text-white">Change Password</ButtonText>
      </Button>
    </View>
  );
}