import { redirect } from '@remix-run/node';

import authStyles from '~/styles/auth.css';
import AuthForm from '~/components/auth/AuthForm';
import { validateCredentials } from '~/db/validation.server';
import { signup } from '~/db/auth.server';

export default function AuthPage() {
  return <AuthForm />;
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}

export async function action({request}) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if(authMode === 'login') {
      // login logic
    } else {
      await signup(credentials);
      return redirect('/expenses');
    }
  } catch (error) {
    if(error.status === 422) {
      return {
        credentialError: error.message
      };
    }
  }
}