import { Outlet } from 'react-router-dom';
import Header from './Header';

export const Layout = () => {
  return (
    <>
      <Header type="main" />
      <main className="w-full flex justify-center">
        <section className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col justify-between">
          <Outlet />
        </section>
      </main>
    </>
  );
};
