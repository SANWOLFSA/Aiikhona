import { useState, useEffect } from 'react';
import * as firebase from '../lib/firebase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Search, AlertTriangle } from 'lucide-react';

interface SearchLog {
  query: string;
  resultsCount: number;
  timestamp: any;
}

export default function SearchAnalytics() {
  const [logs, setLogs] = useState<SearchLog[]>([]);

  useEffect(() => {
    const q = firebase.query(firebase.collection(firebase.db, 'searchLogs'), firebase.orderBy('timestamp', 'desc'));
    const unsubscribe = firebase.onSnapshot(q, (snapshot) => {
      const data: SearchLog[] = [];
      snapshot.forEach((doc) => data.push(doc.data() as SearchLog));
      setLogs(data);
    });
    return () => unsubscribe();
  }, []);

  const topQueries = logs.reduce((acc, log) => {
    acc[log.query] = (acc[log.query] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedQueries = Object.entries(topQueries)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([query, count]) => ({ query, count }));

  const zeroResultQueries = logs
    .filter(log => log.resultsCount === 0)
    .reduce((acc, log) => {
      acc[log.query] = (acc[log.query] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const sortedZeroResultQueries = Object.entries(zeroResultQueries)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([query, count]) => ({ query, count }));

  return (
    <div className="space-y-8 p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
      <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
        <Search className="w-5 h-5 text-blue-500" />
        Search Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-stone-700 dark:text-stone-300">Top 5 Queries</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedQueries}>
                <XAxis dataKey="query" hide />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  {sortedQueries.map((entry, index) => <Cell key={`cell-${index}`} fill="#3b82f6" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul className="text-xs space-y-1">
            {sortedQueries.map((q, i) => (
              <li key={i} className="flex justify-between">
                <span className="font-mono text-stone-600 dark:text-stone-400">{q.query}</span>
                <span className="font-bold">{q.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-stone-700 dark:text-stone-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Top 5 Zero-Result Queries
          </h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedZeroResultQueries}>
                <XAxis dataKey="query" hide />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]}>
                   {sortedZeroResultQueries.map((entry, index) => <Cell key={`cell-${index}`} fill="#f59e0b" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul className="text-xs space-y-1">
            {sortedZeroResultQueries.map((q, i) => (
              <li key={i} className="flex justify-between">
                <span className="font-mono text-stone-600 dark:text-stone-400">{q.query}</span>
                <span className="font-bold">{q.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
