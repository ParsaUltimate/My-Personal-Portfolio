import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="container mx-auto px-4 py-16 flex flex-col items-start gap-4">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found.</p>
      <Link to="/" className="text-blue-500 hover:underline underline-offset-4">Return to Home</Link>
    </main>
  );
};

export default NotFound;
