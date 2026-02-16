import type { VercelRequest, VercelResponse } from '@vercel/node';
import { users, getNextId } from '../_data';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const newUser = { id: getNextId(), ...req.body };
    users.push(newUser);
    return res.status(201).json(newUser);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
