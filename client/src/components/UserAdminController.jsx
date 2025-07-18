import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../UI/Button';
import { CiUser, CiTrash } from 'react-icons/ci';

function UserAdminController({ close }) {
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  const handleInsertUsers = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/users/insert-demo-users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ count: 20 }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to insert users');
      }

      const data = await response.json();
      console.log('Inserted users:', data);
      toast.success(`✅ ${data.message || 'Users inserted successfully!'}`);
    } catch (error) {
      console.error('Error inserting users:', error);
      toast.error('❌ Failed to insert users');
    }
  };

  const handleDeleteAllUsers = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/users/delete-all-users',
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete users');
      }

      const data = await response.json();
      console.log('Deleted all users:', data);
      toast.success(`🗑️ ${data.message || 'All users deleted!'}`);
    } catch (error) {
      console.error('Error deleting users:', error);
      toast.error('❌ Failed to delete users');
    }
  };

  useEffect(() => {
    if (close) setIsWindowOpen(false);
  }, [close]);

  return (
    <div className="flex items-end ">
      {isWindowOpen && close && (
        <button
          type="NAVBAR-APPROVE"
          onClick={handleInsertUsers}
          className="w-16 h-16 text-7xl bg rounded-full hover:text-sky-800 transition duration-300 cursor-pointer active:scale-70"
        >
          <CiUser className="text-5xl font-semibold" />
        </button>
      )}
      <button
        onClick={() => setIsWindowOpen(!isWindowOpen)}
        className="w-16 h-16 rounded-full hover:text-sky-800 transition duration-300 cursor-pointer active:scale-70"
      >
        ADMIN
      </button>
      {isWindowOpen && (
        <button
          className="w-16 h-16 text-7xl rounded-full hover:text-sky-800 transition duration-300 cursor-pointer active:scale-70"
          type="NAVBAR-DANGER"
          onClick={handleDeleteAllUsers}
        >
          <CiTrash className="text-5xl " />
        </button>
      )}
    </div>
  );
}

export default UserAdminController;
