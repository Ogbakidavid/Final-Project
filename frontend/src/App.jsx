import { Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/App';
import Home from "./layouts/Home";
import About from "./layouts/About";
import { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef(null);

  const toggleVisible = () => {
    if (scrollRef.current && scrollRef.current.scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', toggleVisible);
    return () => el.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <div className="font-Poppins h-screen">
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route
          path="/*"
          element={
            <div ref={scrollRef} className="scrollable relative">
              <Home />
              <About />
              {isVisible && (
                <button
                  onClick={scrollToTop}
                  className="fixed bottom-6 right-6 w-8 h-8 bg-primary text-white 
                  rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform 
                  focus:outline-none focus:ring-2 focus:ring-gray-950/80 focus:ring-opacity-50 z-[999]"
                  aria-label="Back to top"
                >
                  <ChevronUp className="w-6 h-6 mx-auto" />
                </button>
              )}
            </div>
          }
        />
      </Routes>
    </div>
  );
}
