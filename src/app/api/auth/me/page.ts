// Import necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if(res !== undefined){
    try {
      // Get the user session using Auth0's getSession function
      const session = await getSession(req, res);
  
      // If the user session exists, return the user information
      if (session) {
        res.status(200).json({ user: session.user });
      } else {
        // If the user session doesn't exist (user not authenticated), return an error
        res.status(401).json({ error: 'User not authenticated' });
      }
    } catch (error) {
      // Handle any errors that occur during authentication or API request
      console.error('API Authentication Error:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  }
}
