import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMaterialColors } from "@expo/ui/jetpack-compose";

export default function Layout() {
    const colors = useMaterialColors();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: colors.background,
                },
                tabBarActiveTintColor: colors.primary,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="search"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
