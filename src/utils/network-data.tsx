const getUsersData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}`);

        if (!response.ok) {
            return {
                error: true,
                data: null,
                message: `Gagal memuat data (Status: ${response.status})`,
            };
        }

        const data = await response.json();
        console.log("[utils/network-data.tsx] fetched users data:", data);

        return { error: false, data: data, message: null };
    } catch (error) {
        console.error("[utils/network-data.tsx] fetch error:", error);
        return {
            error: true,
            data: null,
            message: "Tidak dapat terhubung ke server. Periksa koneksi internet atau URL API.",
        };
    }
};

export { getUsersData };