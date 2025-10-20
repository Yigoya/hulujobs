import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SiteNavbar from './components/SiteNavbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import CompaniesPage from './pages/CompaniesPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import PostJobPage from './pages/PostJobPage';
import DashboardPage from './pages/DashboardPage';
import DashboardJobsPage from './pages/dashboard/DashboardJobsPage';
import DashboardJobManagementPage from './pages/dashboard/DashboardJobManagementPage';
import DashboardApplicationsPage from './pages/dashboard/DashboardApplicationsPage';
import DashboardNotificationsPage from './pages/dashboard/DashboardNotificationsPage';
import DashboardCandidatesPage from './pages/dashboard/DashboardCandidatesPage';
import DashboardSettingsPage from './pages/dashboard/DashboardSettingsPage';
import PostJobFormPage from './pages/dashboard/PostJobFormPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SubscriptionPlansPage from './pages/SubscriptionPlansPage';
import CompanyProfileCompletionPage from './pages/CompanyProfileCompletionPage';
import DashboardJobCandidatesPage from './pages/dashboard/DashboardJobApplicationsPage';
import GlobalLoader from './components/GlobalLoader';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <GlobalLoader />
  <SiteNavbar />
  <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/job/:id" element={<JobDetailPage />} />
            <Route path="/company/:id" element={<CompanyDetailPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/post-job" element={<PostJobPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/jobs" element={<DashboardJobsPage />} />
            <Route path="/dashboard/job-management" element={<DashboardJobManagementPage />} />
            <Route path="/dashboard/applications" element={<DashboardApplicationsPage />} />
            <Route path="/dashboard/notifications" element={<DashboardNotificationsPage />} />
            <Route path="/dashboard/candidates" element={<DashboardCandidatesPage />} />
            <Route path="/dashboard/applications/:id" element={<DashboardJobCandidatesPage />} />
            <Route path="/dashboard/settings" element={<DashboardSettingsPage />} />
            <Route path="/dashboard/post-job" element={<PostJobFormPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/company/profile-completion" element={<CompanyProfileCompletionPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/subscription-plans" element={<SubscriptionPlansPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;