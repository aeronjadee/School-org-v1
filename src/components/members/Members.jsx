import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { userService } from '../../services/userService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import MemberForm from './MemberForm';
import MemberTable from './MemberTable';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [localMembers, setLocalMembers] = useLocalStorage('localMembers', []);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await userService.getAllUsers();
      setMembers(data || []);
    } catch (err) {
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = (formData) => {
    const newMember = {
      id: Date.now(),
      ...formData,
      avatar: `https://i.pravatar.cc/150?img=${Date.now()}`
    };

    setLocalMembers([...localMembers, newMember]);
    setShowForm(false);
  };

  const handleUpdateMember = (id, formData) => {
    setLocalMembers(
      localMembers.map(m => m.id === id ? { ...m, ...formData } : m)
    );
    setEditingId(null);
    setShowForm(false);
  };

  const handleEditMember = (member) => {
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDeleteMember = (id) => {
    setLocalMembers(localMembers.filter(m => m.id !== id));
  };

  const allMembers = [...members, ...localMembers];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Members</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center transition duration-200 font-medium"
        >
          <Plus size={20} className="mr-2" />
          Add Member
        </button>
      </div>

      {showForm && (
        <MemberForm
          onSubmit={editingId 
            ? (data) => handleUpdateMember(editingId, data)
            : handleAddMember
          }
          onCancel={() => {
            setShowForm(false);
            setEditingId(null);
          }}
          isEditing={!!editingId}
          initialData={editingId 
            ? localMembers.find(m => m.id === editingId)
            : null
          }
        />
      )}

      <MemberTable
        members={allMembers}
        onEdit={handleEditMember}
        onDelete={handleDeleteMember}
        localMemberIds={localMembers.map(m => m.id)}
      />
    </div>
  );
};

export default Members;