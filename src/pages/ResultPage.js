import ResultDashboard from "../components/ResultDashboard";
import { useLocation } from "react-router-dom";
function ResultPage() {
  const { state } = useLocation();
  console.log(state);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* <h1>{event}</h1> */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">Results</h1>
        </div>
        <div className="mt-4 container">
          <ResultDashboard state={state} />
        </div>
      </main>
    </div>
  );
}

export default ResultPage;
