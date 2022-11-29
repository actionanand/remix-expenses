import { redirect } from '@remix-run/node';

import authStyles from '~/styles/auth.css';
import AuthForm from '~/components/auth/AuthForm';
import { validateCredentials } from '~/db/validation.server';
import { signup, login } from '~/db/auth.server';

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
      return await login(credentials);
    } else {
      return await signup(credentials);
    }
  } catch (error) {
    if(error.status === 422 || 401) {
      return {
        credentialError: error.message
      };
    }
  }
}

export function meta() {
  return {
    title: 'Remix-Expenses Authentication',
    description: 'Manage your expenses with ease. This page authenticates the users to manage expenses.'
  };
}