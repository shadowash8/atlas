import { SQLiteProvider } from "expo-sqlite";

import { migrateDbIfNeeded } from "./migrations";

export { useSQLiteContext } from "expo-sqlite";

export function DatabaseProvider({
    children,
}: React.PropsWithChildren) {
    return (
        <SQLiteProvider
            databaseName="atlas.db"
            onInit={migrateDbIfNeeded}
        >
            {children}
        </SQLiteProvider>
    );
}
