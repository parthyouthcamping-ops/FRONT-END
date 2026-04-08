import { Link } from "wouter";

export default function TripDetail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Trip Details</h1>
        <p className="text-gray-600 mb-6">This page will show the full trip experience.</p>
        <Link href="/" className="text-primary font-semibold">Back to trips</Link>
      </div>
    </div>
  );
}