import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className="flex gap-2 p-4 border-b mb-4">
      <Button asChild>
        <Link to="/">APOD</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link to="/mars">Mars</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link to="/search">Search</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link to="/neo">NEO Feed</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link to="/epic">EPIC</Link>
      </Button>
    </nav>
  );
}
