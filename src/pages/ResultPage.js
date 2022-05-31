import ResultDashboard from "../components/ResultDashboard";

function ResultPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">Events</h1>
        </div>
      </main>
      <div className="mt-4 container">
        <ResultDashboard />
      </div>
    </div>
  );
}

export default ResultPage;