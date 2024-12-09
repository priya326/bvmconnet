// utils/auth.ts
import { decrypt } from "./security";

export const getToken = (): string | null => {
    const storedUserData =
        localStorage.getItem("usere") || localStorage.getItem("user");
    if (!storedUserData) return null;

    try {
        const decryptedData = decrypt(storedUserData);
        const userData =
            typeof decryptedData === "string"
                ? JSON.parse(decryptedData)
                : decryptedData;

        return userData.data?.token || null;
    } catch (error) {
        console.error("Error decrypting user data:", error);
        return null;
    }
};
