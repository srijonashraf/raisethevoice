import Navbar from 'components/Navbar';
import AppLayout from 'layouts/AppLayout';
import AboutPage from 'pages/about';
import ContactPage from 'pages/contact';
import ExplorePage from 'pages/explore';
import FeedPage from 'pages/feed';
import LoginPage from 'pages/login';
import PostPage from 'pages/post';
import PrivacyPage from 'pages/privacy';
import SearchPage from 'pages/search';
import TermsPage from 'pages/terms';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useLazyLoadUserQuery } from 'store/api/auth';

export default function App() {
  const [loadUser] = useLazyLoadUserQuery();

  useEffect(() => {
    loadUser('');
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
