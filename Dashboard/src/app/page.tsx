"use client";

import { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { Dashboard } from "../pages/Dashboard";
import { Students } from "../pages/Students";
import { Teachers } from "../pages/Teachers";
import { Pedagogies } from "../pages/Pedagogies";
import { Admins } from "../pages/Admins";
import { Departments } from "../pages/Departments";
import { Internships } from "../pages/Internships";
import { Recovery } from "../pages/Recovery";
import { Settings } from "../pages/Settings";
import { Route } from "../types";

export default function Home() {
  const [currentRoute, setCurrentRoute] = useState<Route>("dashboard");

  const renderRoute = () => {
    switch (currentRoute) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <Students />;
      case "teachers":
        return <Teachers />;
      case "pedagogies":
        return <Pedagogies />;
      case "admins":
        return <Admins />;
      case "departments":
        return <Departments />;
      case "internships":
        return <Internships />;
      case "recovery":
        return <Recovery />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentRoute={currentRoute} onRouteChange={setCurrentRoute}>
      {renderRoute()}
    </Layout>
  );
}
