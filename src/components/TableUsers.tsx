import type { User } from "../types/user";

interface TableUsersProps {
  data: User[];
  onShowDetails: (user: User) => void;
}

function TableUsers({ data, onShowDetails }: TableUsersProps) {
  return (
    <table className="w-full min-w-[950px] text-left text-sm text-gray-600">
      <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3 whitespace-nowrap">
            ID
          </th>
          <th scope="col" className="px-6 py-3 whitespace-nowrap">
            Name
          </th>
          <th scope="col" className="px-6 py-3 whitespace-nowrap">
            Email
          </th>
          <th scope="col" className="px-6 py-3 whitespace-nowrap">
            Phone
          </th>
          <th scope="col" className="px-6 py-3 whitespace-nowrap">
            Address
          </th>
          <th scope="col" className="px-6 py-3 whitespace-nowrap">
            Website
          </th>
          <th scope="col" className="px-6 py-3 whitespace-nowrap">
            Company
          </th>
          <th scope="col" className="px-6 py-3 whitespace-nowrap">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {user.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="text-xs text-gray-500">@{user.username}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {user.address.street}, {user.address.city}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.website}
              </a>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {user.company.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => onShowDetails(user)}
                className="bg-slate-500 px-4 py-2 rounded-lg text-white text-xs hover:bg-slate-600 transition-colors"
              >
                Show Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableUsers;