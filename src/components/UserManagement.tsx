import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { User, RefreshCw, ShieldCheck } from 'lucide-react';
import type { UserProfile } from '../types';

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList: UserProfile[] = [];
      querySnapshot.forEach((doc) => {
        userList.push(doc.data() as UserProfile);
      });
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <User className="w-4 h-4 text-amber-500" />
          <span>Registered Users ({users.length})</span>
        </h3>
        <button 
          onClick={fetchUsers} 
          className="text-stone-400 hover:text-amber-500 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-stone-400">Fetching users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">User</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Reputation</th>
                <th className="pb-3">Repairs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60 font-medium">
              {users.map(user => (
                <tr key={user.email} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                  <td className="py-3.5 pr-4 flex items-center gap-2">
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                    <div>
                      <div className="font-bold text-stone-900 dark:text-stone-100">{user.name}</div>
                      <div className="text-[10px] text-stone-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-bold">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-stone-600 dark:text-stone-300">
                    {user.reputationPoints}
                  </td>
                  <td className="py-3.5 text-stone-600 dark:text-stone-300">
                    {user.repairsCompleted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
