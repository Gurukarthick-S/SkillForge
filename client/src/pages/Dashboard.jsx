import DashboardSidebar from "../components/layout/DashboardSidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <DashboardSidebar />

      <main className="ml-64 min-h-screen p-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's your learning progress.
        </p>

      </main>

    </div>
  );
};

export default Dashboard;