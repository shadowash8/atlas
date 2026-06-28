import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import AppTabs from '@/components/app-tabs';
import { DatabaseProvider } from '@/db/database';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <DatabaseProvider>
                <AppTabs />
            </DatabaseProvider>
        </ThemeProvider>
    );
}
