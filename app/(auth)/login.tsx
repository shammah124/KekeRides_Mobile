import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Images } from "@/constants/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Add your login logic here
    await AsyncStorage.setItem("hasCompletedOnboarding", "true");
    router.push("/");
  };

  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <View className="flex-1 items-center justify-evenly pt-20 bg-white p-6">
      <View className="items-center">
        <Image
          source={Images.kekeLogo}
          style={{ width: 100, height: 50 }}
          contentFit="contain"
          transition={200}
        />

        <Text className="mb-8 text-4xl text-black font-bold">
          Welcome Back! Login
        </Text>
      </View>

      <Button
        size="lg"
        variant="outline"
        style={{ height: 56 }}
        className="w-full  flex-row items-center"
      >
        <Image
          source={Images.icons.googleIcon}
          style={{ width: 20, height: 20, marginRight: 8 }}
        />
        <ButtonText className="text-black">Continue with Google</ButtonText>
      </Button>

      <Text className="text-black text-left" size="3xl">
        Or
      </Text>

      <FormControl className="rounded-lg w-full">
        <VStack className="gap-4">
          <VStack space="sm">
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
          <VStack space="sm">
            <Text className="text-black text-xl">Password</Text>
            <Input variant="underlined">
              <InputField
                type={showPassword ? "text" : "password"}
                value={password}
                onChangeText={setPassword}
                className="text-black"
              />
              <InputSlot className="pr-3 text-black" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>

          <Link href="/(auth)/forgot-password" className="self-end">
            <LinkText className="text-black no-underline">
              Forgot Password?
            </LinkText>
          </Link>
        </VStack>
      </FormControl>

      <Button
        className="mb-4 w-full bg-primary-main"
        size="lg"
        action="primary"
        onPress={handleLogin}
        style={{ height: 56 }}
      >
        <ButtonText className="text-white">Login</ButtonText>
      </Button>

      <View className="flex-row items-center">
        <Text className="text-black text-lg">Don't have an account? </Text>
        <Button
          variant="link"
          size="md"
          action="primary"
          onPress={handleSignUp}
        >
          <ButtonText className="text-primary-main font-bold">
            Sign Up
          </ButtonText>
        </Button>
      </View>
    </View>
  );
}
