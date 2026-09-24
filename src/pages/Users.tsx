import TableUsers from "../components/TableUsers";
import SearchBar from "../components/SearchBar";
import UserDetailModal from "../components/UserDetailModal";
import { getUsersData } from "../utils/network-data";
import { useState, useEffect, useDeferredValue, useMemo } from "react";
import type { User } from "../types/user";

function Users() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    const fetchUsers = async () => {
      try {
        const response = await getUsersData();
        console.log("[pages/Users.tsx] fetched users data:", response);

        if (!ignore) {
          if (response.error || !response.data) {
            setErrorMessage(
              response.message || "Gagal memuat data pengguna. Silakan coba beberapa saat lagi."
            );
          } else {
            setData(response.data);
          }
        }
      } catch (error) {
        if (!ignore) {
          console.error("Error fetching users data:", error);
          setErrorMessage("Terjadi kesalahan yang tidak terduga saat mengambil data.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      ignore = true;
    };
  }, [retryKey]);

  const handleRetry = () => {
    setIsLoading(true);
    setErrorMessage(null);
    setRetryKey((prev) => prev + 1);
  };

  const onKeywordChange = (value: string) => {
    setKeyword(value);
  };

  const deferredKeyword = useDeferredValue(keyword);

  console.log("[pages/Users.tsx] deferredKeyword:", deferredKeyword);

  const filteredData = useMemo(() => {
    if (!deferredKeyword) {
      return data;
    }
    const lowerKeyword = deferredKeyword.toLowerCase();
    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerKeyword) ||
        user.username.toLowerCase().includes(lowerKeyword) ||
        user.email.toLowerCase().includes(lowerKeyword)
    );
  }, [data, deferredKeyword]);

  console.log("[pages/Users.tsx] filteredData:", filteredData);

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900">Users</h1>
      <div className="mt-6 rounded-lg bg-white p-6 shadow">
        <div className="mb-4">
          <SearchBar keyword={keyword} onKeywordChange={onKeywordChange} />
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <svg
              className="h-10 w-10 animate-spin text-blue-600 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="text-sm font-medium">Sedang memuat data pengguna...</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-red-800">
              Gagal Memuat Data
            </h3>
            <p className="mt-1 text-sm text-red-600 max-w-md mx-auto">
              {errorMessage}
            </p>
            <button
              onClick={handleRetry}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Coba Lagi
            </button>
          </div>
        )}

        {!isLoading && !errorMessage && (
          <>
            {filteredData.length === 0 ? (
              <div className="py-12 text-center text-sm text-gray-500">
                {keyword ? (
                  <p>Tidak ada pengguna yang cocok dengan pencarian &quot;{keyword}&quot;.</p>
                ) : (
                  <p>Belum ada data pengguna yang tersedia.</p>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <TableUsers
                  data={filteredData}
                  onShowDetails={(user) => setSelectedUser(user)}
                />
              </div>
            )}
          </>
        )}
      </div>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
}

export default Users;