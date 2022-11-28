import { Link, NavLink, useLoaderData, Form } from '@remix-run/react';

import Logo from '../util/Logo';

function MainHeader() {
  const userId = useLoaderData();
  let authBtn = ''

  if (userId) {
    authBtn =
      (<Form method='delete' action='/logout' id='logout-form'>
        <button className="cta-alt"> Logout </button>
      </Form>);
  } else {
    authBtn = <Link to="/auth" className="cta"> Login </Link>;
  }

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {authBtn}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
