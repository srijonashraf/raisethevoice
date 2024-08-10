import Footer from './Footer';
import Trending from './Trending';

export default function RightSidebar() {
  return (
    <div className="sticky top-[88px]">
      <Trending />
      <Footer />
    </div>
  );
}
