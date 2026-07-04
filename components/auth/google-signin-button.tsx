import { supabase } from "@/lib/supabase";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


const redirectTo = makeRedirectUri();
console.log(redirectTo);

function GoogleSignInButtonUi(operation: () => void) {
  return (
    <TouchableOpacity
      onPress={operation}
      className="flex-row items-center bg-delulu-dark rounded-[24px] py-4 px-6 justify-center w-full active:opacity-80"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
      }}
      activeOpacity={0.8}
    >
      <View className="bg-white rounded-full w-8 h-8 items-center justify-center mr-3">
        <Image
          source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
          style={{ width: 20, height: 20 }}
        />
      </View>
      <Text className="text-white text-[17px] font-bold">
        Continue with Google
      </Text>
    </TouchableOpacity>
  )
}


import * as QueryParams from "expo-auth-session/build/QueryParams";

export default function GoogleSignInButton() {
  async function createSessionFromUrl(url: string) {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) {
      console.error("OAuth Error:", errorCode);
      throw new Error(errorCode);
    }
    
    // Handle PKCE flow
    if (params.code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(params.code);
      if (error) throw error;
      return data.session;
    }

    // Handle Implicit flow
    const { access_token, refresh_token } = params;
    if (!access_token || !refresh_token) return null;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token
    });

    if (error) throw error;
    return data.session;
  }




  async function onClick() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: { prompt: "consent" },
      }
    })

    const url = data.url;
    if (!url) {
      console.error("no oauth url found!");
      return;
    }

    const result = await WebBrowser.openAuthSessionAsync(
      url,
      redirectTo,
    ).catch((error) => {
      console.log(error)
    })

    console.debug('onSignInButtonPress - openAuthSessionAsync - result', { result });

    if (result && result.type === "success") {
      try {
        await createSessionFromUrl(result.url);
      } catch (err) {
        console.error('onSignInButtonPress - createSessionFromUrl - failed', err);
      }
    } else {
      console.error('onSignInButtonPress - openAuthSessionAsync - failed or cancelled');
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return GoogleSignInButtonUi(onClick);

}

