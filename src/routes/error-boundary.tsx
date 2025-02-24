import { useRouteError } from 'react-router';

export default function RootErrorBoundary() {
  const error = useRouteError();

  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
    </div>
  );
}
