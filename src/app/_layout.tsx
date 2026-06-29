import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import AppTabs from '@/components/app-tabs';
import { DatabaseProvider } from '@/db/database';
import { Host } from '@expo/ui';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <Host style={{ flex: 1 }}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <DatabaseProvider>
                    <AppTabs />
                </DatabaseProvider>
            </ThemeProvider>
        </Host>
    );
}
