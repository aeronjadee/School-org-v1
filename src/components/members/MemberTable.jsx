import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const MemberTable = ({ members, onEdit, onDelete, localMemberIds }) => {
  if (members.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600 text-lg">No members found. Add your first member!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Avatar</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => {
              const isLocal = localMemberIds.includes(member.id);

              return (
                <tr key={member.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <img
                      src={member.avatar}
                      alt={member.first_name}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {member.first_name} {member.last_name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{member.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isLocal
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {isLocal ? 'Local' : 'API'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {isLocal && (
                        <>
                          <button
                            onClick={() => onEdit(member)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 p-2 rounded transition"
                            title="Edit member"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => onDelete(member.id)}
                            className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded transition"
                            title="Delete member"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                      {!isLocal && (
                        <span className="text-gray-400 text-sm">Read-only</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberTable;