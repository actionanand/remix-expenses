import { Links, Link, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react';

import sharedStyles from '~/styles/shared.css';
import Error from './components/util/Error';

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export function Document({children, title='Remix-Expenses'}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title> {title} </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet" />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return <Document>
    <Outlet />
  </Document>;
}

export function CatchBoundary() {
  const caughtResp = useCatch();

  return <Document title={caughtResp.statusText}>
    <main>
      <Error title={caughtResp.statusText}>
        <p> {caughtResp.data?.message || 'Something went wrong, Please try again after sometime!'} </p>
        <p>Back to <Link to='/'> Safty </Link> . </p>
      </Error>
    </main>
  </Document>;
}

export function ErrorBoundary() {

}

export function links() {
  return [{ 'rel': 'stylesheet', href: sharedStyles }];
}