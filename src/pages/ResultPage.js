import ResultDashboard from "../components/ResultDashboard";
import { useLocation } from "react-router-dom";
function ResultPage() {
  const { state } = useLocation();
  // console.log(state);

  return (
    <div className="min-h-screen text-gray-900">
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-center py-10">{state.event}</h1>
      <main className=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h2 className="text-3xl font-semibold">Stats</h2>
        </div>
        <div className="mt-4 container">
          <ResultDashboard state={state} />
        </div>
      </main>
    </div>
  );
}

export default ResultPage;
