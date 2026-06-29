import * as Crypto from 'expo-crypto';

/**
 * Generates a random 5-character ID consisting of uppercase letters and numbers.
 * Example outputs: "2A7B9", "AA87B", "99ZX1"
 */
export function generateArtifactId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    // Create a typed array for 5 random bytes
    const randomBytes = new Uint8Array(5);

    // Fill it with cryptographically strong pseudo-random values using expo-crypto
    Crypto.getRandomValues(randomBytes);

    for (let i = 0; i < 5; i++) {
        result += chars[randomBytes[i] % chars.length];
    }

    return result;
}
