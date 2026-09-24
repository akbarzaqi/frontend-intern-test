import type { User } from "../types/user";

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
            <p className="text-xs text-gray-500">@{user.username}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm text-gray-700 max-h-[70vh] overflow-y-auto">
          <div className="rounded-lg bg-gray-50 p-3">
            <h4 className="font-semibold text-gray-800 mb-2 text-xs uppercase tracking-wider">
              Contact Info
            </h4>
            <div className="space-y-1">
              <p>
                <span className="text-gray-500">Email:</span> {user.email}
              </p>
              <p>
                <span className="text-gray-500">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="text-gray-500">Website:</span>{" "}
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.website}
                </a>
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <h4 className="font-semibold text-gray-800 mb-2 text-xs uppercase tracking-wider">
              Address
            </h4>
            <p>
              {user.address.street}, {user.address.suite}
            </p>
            <p>
              {user.address.city}, {user.address.zipcode}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Geo: ({user.address.geo.lat}, {user.address.geo.lng})
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <h4 className="font-semibold text-gray-800 mb-2 text-xs uppercase tracking-wider">
              Company
            </h4>
            <p className="font-medium text-gray-900">{user.company.name}</p>
            <p className="italic text-gray-600 text-xs mt-0.5">
              "{user.company.catchPhrase}"
            </p>
            <p className="text-xs text-gray-500 mt-1">{user.company.bs}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailModal;
