import { useTemplates } from "@/hooks/templates/use-templates";
import { TemplateType, useTemplateStore } from "@/store/useTemplateStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  { id: 'all', name: 'All', icon: 'grid', color: 'text-delulu-dark' },
  { id: 'minimal', name: 'Minimal', icon: 'sparkles', color: 'text-purple-400' },
  { id: 'aesthetic', name: 'Aesthetic', icon: 'leaf', color: 'text-green-500' },
  { id: 'digital', name: 'Digital Art', icon: 'color-palette', color: 'text-pink-400' },
  { id: 'photo', name: 'Photography', icon: 'camera', color: 'text-indigo-400' },
  { id: '3d', name: '3D', icon: 'cube', color: 'text-pink-500' },
  { id: 'anime', name: 'Anime', icon: 'star', color: 'text-orange-400' },
];

export default function Home() {
  const { loadMore, hasMore, isLoading, isRefreshing, pullToRefresh, search, refresh } = useTemplates();
  const templates = useTemplateStore((s) => s.templates);
  const searchQuery = useTemplateStore((s) => s.searchQuery);

  const [inputValue, setInputValue] = useState("");
  const [activeCategory, setActiveCategory] = useState('all');
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    refresh();
  }, []);

  const handleSearchChange = useCallback((text: string) => {
    setInputValue(text);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      search(text);
    }, 400);
  }, [search]);

  const handleClearSearch = useCallback(() => {
    setInputValue("");
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    search("");
  }, [search]);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const showEmptySearch = !isLoading && templates.length === 0 && searchQuery.trim().length > 0;
  const showEmpty = !isLoading && templates.length === 0 && searchQuery.trim().length === 0;

  const featuredTemplates = templates.slice(0, 4);
  const allTemplates = templates;

  return (
    <View className="flex-1 bg-delulu-primary">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setInputValue("");
              pullToRefresh();
            }}
            tintColor="#3C4A22"
          />
        }
      >
        {/* Header Section (Yellow Background) */}
        <SafeAreaView edges={["top"]} className="px-6 pt-4 pb-6">
          <Animated.View entering={FadeInDown.duration(600)}>
            {/* Top Bar */}
            <View className="flex-row justify-between items-center mb-8">
              <Pressable className="w-12 h-12 bg-black/5 rounded-2xl items-center justify-center">
                <Ionicons name="menu" size={28} color="#3C4A22" />
              </Pressable>
              
              <View className="items-center">
                <View className="flex-row items-center">
                  <Image
                    source={require("../../assets/images/splash-icon.png")}
                    className="w-12 h-12 mr-2"
                    contentFit="contain"
                  />
                  <Text className="text-4xl font-extrabold text-delulu-dark tracking-tighter">
                    delulu
                  </Text>
                </View>
                <Text className="text-[10px] font-bold text-delulu-dark mt-1">
                  Turn your <Text className="text-delulu-pink italic">delusion</Text> into reality.
                </Text>
              </View>

              <Pressable className="w-12 h-12 bg-delulu-dark rounded-full items-center justify-center">
                <Ionicons name="person" size={24} color="#D8FA39" />
              </Pressable>
            </View>

            {/* Title */}
            <View className="flex-row items-end justify-between relative">
              <View className="flex-1">
                <Text className="text-[40px] font-extrabold text-delulu-dark leading-none tracking-tight mb-2">
                  Templates
                </Text>
                <Text className="text-delulu-dark text-base font-semibold pr-8 leading-snug">
                  Pick a template, make it yours and bring your ideas to life. ✨
                </Text>
              </View>
              {/* Mascot / Decorative */}
              <View className="absolute right-0 -bottom-10 opacity-90">
                <Image
                  source={require("../../assets/images/splash-icon.png")}
                  className="w-24 h-24"
                  contentFit="contain"
                />
              </View>
              
              {/* Decor */}
              <View className="absolute -top-10 -left-6 opacity-60 transform -rotate-12">
                <Text className="text-delulu-pink text-5xl font-light">〰</Text>
              </View>
              <View className="absolute top-0 right-4 opacity-80">
                <Text className="text-delulu-dark text-3xl">✨</Text>
              </View>
            </View>
          </Animated.View>
        </SafeAreaView>

        {/* Content Section (White Background) */}
        <View className="bg-delulu-card flex-1 rounded-t-[40px] pt-8 px-5 min-h-[600px] shadow-sm">
          
          {/* Search Bar */}
          <View className="flex-row items-center gap-3 mb-6">
            <View className="flex-1 flex-row items-center bg-white rounded-full border border-gray-100 px-4 py-3 shadow-sm shadow-black/5">
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 text-delulu-dark text-base ml-2"
                placeholder="Search image templates..."
                placeholderTextColor="#9CA3AF"
                value={inputValue}
                onChangeText={handleSearchChange}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
              />
              {inputValue.length > 0 && (
                <Pressable onPress={handleClearSearch} className="p-1">
                  <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                </Pressable>
              )}
            </View>
            
            <Pressable className="bg-delulu-primary/20 flex-row items-center px-4 py-3.5 rounded-full">
              <Ionicons name="filter" size={16} color="#3C4A22" />
              <Text className="text-delulu-dark font-bold text-xs ml-1">All Categories</Text>
            </Pressable>
          </View>

          {/* Categories Row */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 -mx-5 px-5">
            {CATEGORIES.map((cat, idx) => {
              const isActive = activeCategory === cat.id;
              return (
                <Pressable 
                  key={cat.id}
                  onPress={() => setActiveCategory(cat.id)}
                  className={`items-center justify-center mr-3 px-5 py-4 rounded-2xl border ${isActive ? 'bg-delulu-primary border-delulu-primary shadow-sm shadow-black/10' : 'bg-white border-gray-100'}`}
                >
                  <Ionicons name={cat.icon as any} size={24} color={isActive ? '#3C4A22' : '#9CA3AF'} className="mb-2" />
                  <Text className={`text-xs font-bold ${isActive ? 'text-delulu-dark' : 'text-gray-400'}`}>
                    {cat.name}
                  </Text>
                </Pressable>
              )
            })}
          </ScrollView>

          {/* Loading State */}
          {isLoading && templates.length === 0 && (
            <View className="pt-4 flex-row flex-wrap gap-4">
              {[0, 1, 2, 3].map((i) => (
                <View key={i} className="w-[47%]">
                  <SkeletonCard />
                </View>
              ))}
            </View>
          )}

          {/* Empty Search State */}
          {showEmptySearch && (
            <View className="py-20 items-center">
              <Ionicons name="search" size={48} color="#D1D5DB" className="mb-4" />
              <Text className="text-delulu-dark text-lg font-bold">No results found</Text>
              <Text className="text-gray-500 text-sm mt-2 text-center">
                Try searching with different keywords
              </Text>
            </View>
          )}

          {/* Empty State */}
          {showEmpty && (
            <View className="py-20 items-center">
              <Text className="text-delulu-dark text-base">No templates available</Text>
              <Text className="text-gray-500 text-sm mt-2">Check back later!</Text>
            </View>
          )}

          {templates.length > 0 && (
            <>
              {/* Featured Templates */}
              <View className="mb-8">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-xl font-extrabold text-delulu-dark">Featured Templates</Text>
                  <Text className="text-delulu-pink font-bold text-sm">See all &gt;</Text>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
                  {featuredTemplates.map((template, index) => (
                    <FeaturedTemplateCard key={template.id} template={template} index={index} />
                  ))}
                </ScrollView>
              </View>

              {/* All Templates */}
              <View>
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-xl font-extrabold text-delulu-dark">All Templates</Text>
                  <View className="flex-row items-center bg-white px-3 py-1.5 rounded-full border border-gray-100">
                    <Text className="text-delulu-dark font-bold text-xs mr-1">Most Popular</Text>
                    <Ionicons name="chevron-down" size={12} color="#3C4A22" />
                  </View>
                </View>

                <View className="flex-row flex-wrap justify-between">
                  {allTemplates.map((template, index) => (
                    <AllTemplateCard key={template.id} template={template} index={index} />
                  ))}
                </View>

                {/* Load More */}
                {hasMore && (
                  <Pressable
                    onPress={loadMore}
                    className="w-full py-4 items-center justify-center bg-white rounded-2xl border border-gray-100 mt-4 active:bg-gray-50 shadow-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#3C4A22" />
                    ) : (
                      <Text className="text-delulu-dark font-bold">Load More</Text>
                    )}
                  </Pressable>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function FeaturedTemplateCard({ template, index }: { template: TemplateType; index: number }) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/template/${template.id}`);
  };

  const isNew = index === 0;
  const isPopular = index === 1;

  return (
    <Pressable
      className="mr-4 active:scale-95 w-48 bg-white rounded-3xl border border-gray-100 shadow-sm shadow-black/5 overflow-hidden"
      onPress={handlePress}
    >
      <View className="relative h-56 w-full">
        {template.previewUrl ? (
          <ImageWithShimmer source={template.previewUrl} />
        ) : (
          <View className="h-full w-full bg-gray-100" />
        )}
        
        {/* Badges */}
        {isNew && (
          <View className="absolute top-3 left-3 bg-pink-400 px-2 py-0.5 rounded-md">
            <Text className="text-white text-[10px] font-bold">New</Text>
          </View>
        )}
        {isPopular && (
          <View className="absolute top-3 left-3 bg-green-500 px-2 py-0.5 rounded-md">
            <Text className="text-white text-[10px] font-bold">Popular</Text>
          </View>
        )}
        
        {/* Bookmark Icon */}
        <View className="absolute top-3 right-3">
          <Ionicons name="bookmark-outline" size={20} color="white" />
        </View>
      </View>
      
      <View className="p-4">
        <Text className="text-delulu-dark font-extrabold text-[15px] mb-1" numberOfLines={1}>
          {template.name}
        </Text>
        <Text className="text-gray-500 text-xs mb-3 leading-tight" numberOfLines={2}>
          {"Clean and minimal designs for any idea."}
        </Text>
        
        <View className="flex-row items-center">
          <Ionicons name="documents-outline" size={14} color="#9CA3AF" />
          <Text className="text-gray-500 text-[10px] font-semibold ml-1">
            {Math.floor(Math.random() * 20) + 1}.{Math.floor(Math.random() * 9)}K uses
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function AllTemplateCard({ template, index }: { template: TemplateType; index: number }) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/template/${template.id}`);
  };

  return (
    <View className="w-[47%] mb-4">
      <Pressable
        className="active:scale-95"
        onPress={handlePress}
      >
        <View className="relative h-48 w-full rounded-[24px] overflow-hidden bg-gray-100 mb-2">
          {template.previewUrl ? (
            <ImageWithShimmer source={template.previewUrl} />
          ) : (
            <View className="h-full w-full" />
          )}
        </View>
        
        <View className="flex-row justify-between items-center px-1">
          <Text className="text-delulu-dark font-extrabold text-[13px] flex-1 mr-2" numberOfLines={1}>
            {template.name}
          </Text>
          <Ionicons name="bookmark-outline" size={16} color="#3C4A22" />
        </View>
      </Pressable>
    </View>
  );
}

function ImageWithShimmer({ source }: { source: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <View className="relative h-full w-full bg-gray-100">
      <Image
        source={source}
        className="h-full w-full"
        contentFit="cover"
        transition={200}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <View className="absolute inset-0 items-center justify-center">
          <ActivityIndicator color="#D1D5DB" />
        </View>
      )}
    </View>
  );
}

function SkeletonCard() {
  return (
    <View className="h-48 w-full rounded-[24px] bg-gray-100 items-center justify-center">
      <ActivityIndicator color="#D1D5DB" />
    </View>
  );
}
