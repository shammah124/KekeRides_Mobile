import { Button, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { FormControl } from "@/components/ui/form-control";
import { CheckIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Images } from "@/constants/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    // Add your signup logic here
    await AsyncStorage.setItem("hasCompletedOnboarding", "true");
    router.push("/(auth)/verify-otp");
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center py-10 px-6">
        <View className="items-center mb-6">
          <Image
            source={Images.kekeLogo}
            style={{ width: 100, height: 50 }}
            contentFit="contain"
            transition={200}
          />

          <Text className="mt-4 text-4xl text-black font-bold">
            Create Account
          </Text>
        </View>

        <Button
          size="lg"
          variant="outline"
          style={{ height: 56 }}
          className="w-full flex-row items-center mb-4"
        >
          <Image
            source={Images.icons.googleIcon}
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          <ButtonText className="text-black">Continue with Google</ButtonText>
        </Button>

        <Text className="text-black my-4" size="3xl">
          Or
        </Text>

        <FormControl className="rounded-lg w-full mb-4">
          <VStack className="gap-3">
            <VStack space="xs">
              <Text className="text-black text-xl">Name</Text>
              <Input variant="underlined">
                <InputField
                  type="text"
                  value={name}
                  onChangeText={setName}
                  className="text-black"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text className="text-black text-xl">Email</Text>
              <Input variant="underlined">
                <InputField
                  type="text"
                  value={email}
                  onChangeText={setEmail}
                  className="text-black"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text className="text-black text-xl">Phone Number</Text>
              <Input variant="underlined">
                <InputField
                  type="text"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  className="text-black"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text className="text-black text-xl">Password</Text>
              <Input variant="underlined">
                <InputField
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChangeText={setPassword}
                  className="text-black"
                />
                <InputSlot
                  className="pr-3 text-black"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            </VStack>

            <VStack space="xs">
              <Text className="text-black text-xl">Confirm Password</Text>
              <Input variant="underlined">
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
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

            <Checkbox isDisabled={false} isInvalid={false} size="md" value={""} className="mt-2">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel className="text-black">Terms and conditions</CheckboxLabel>
            </Checkbox>
          </VStack>
        </FormControl>

        <Button
          className="mb-4 w-full bg-primary-main"
          size="lg"
          action="primary"
          onPress={handleSignUp}
          style={{ height: 56 }}
        >
          <ButtonText className="text-white">Create Account</ButtonText>
        </Button>

        <View className="flex-row items-center mb-4">
          <Text className="text-black text-lg">Account created? </Text>
          <Button variant="link" size="md" action="primary" onPress={handleLogin}>
            <ButtonText className="text-primary-main font-bold">Login</ButtonText>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
