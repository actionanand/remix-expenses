import { json } from '@remix-run/node';

import { destroyUserSession } from '../db/auth.server';

export function action({request}) {
  if(request.method !== 'DELETE') {
    return json({message: 'Invalid request for \'logout\''}, {
      status: 400,
      statusText: 'Invalid request received'
    });
  }

  return destroyUserSession(request);
}