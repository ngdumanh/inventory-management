"use client";
import DashboardWrapper from "@/app/dashboardWrapper";
import withAuth from "@/hooks/withAuths";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <div>Welcome to the Dashboard!</div>
    </DashboardWrapper>
  );
};
export default withAuth(Dashboard);
