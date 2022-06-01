import ResultDashboard from "../components/ResultDashboard";

function ResultPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">Results</h1>
        </div>
        <div className="mt-4 container">
          <ResultDashboard />
        </div>
      </main>
      
    </div>
  );
}

export default ResultPage;
