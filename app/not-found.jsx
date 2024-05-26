import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>We Were Unable To Find The Requested Page.</h1>
      <Link href="/" className="btn btn-warning">
        Go Back To Home
      </Link>
    </main>
  );
}
