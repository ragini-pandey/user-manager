import type { VercelRequest, VercelResponse } from '@vercel/node';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

declare global {
  var users: User[];
  var nextId: number;
}

if (!global.users) {
  global.users = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', phone: '+1-555-0101', email: 'alice.johnson@example.com' },
    { id: 2, firstName: 'Bob', lastName: 'Smith', phone: '+1-555-0102', email: 'bob.smith@example.com' },
    { id: 3, firstName: 'Charlie', lastName: 'Brown', phone: '+1-555-0103', email: 'charlie.brown@example.com' },
  ];
  global.nextId = 4;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const id = Number(req.query.id);
  const userIndex = global.users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(global.users[userIndex]);
  }

  if (req.method === 'PUT') {
    global.users[userIndex] = { ...global.users[userIndex], ...req.body, id };
    return res.status(200).json(global.users[userIndex]);
  }

  if (req.method === 'DELETE') {
    const deleted = global.users.splice(userIndex, 1)[0];
    return res.status(200).json(deleted);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
