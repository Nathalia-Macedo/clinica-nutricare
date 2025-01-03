// import React, { useState, useEffect } from 'react';
// import { Toaster } from 'react-hot-toast';
// import { useSiteData, useHeaderData } from '../Context/SiteContext';
// import Sidebar from '../Components/SideBar';
// import Header from '../Components/HeaderTitle';
// import HeaderForm from '../Components/HeaderSettings';
// import SlideForm from '../Components/SlideForm';
// import { SlidesList} from '../Components/SlideList';
// import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
//   input[type="text"],
//   input[type="tel"],
//   input[type="email"],
//   input[type="url"],
//   textarea {
//     font-size: 0.875rem;
//     padding: 0.5rem 0.75rem;
//     border-radius: 0.375rem;
//     border: 1px solid #d1d5db;
//     box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//     outline: none;
//     padding-left: 2.5rem;
//   }

//   input[type="text"]:focus,
//   input[type="tel"]:focus,
//   input[type="email"]:focus,
//   input[type="url"]:focus,
//   textarea:focus {
//     border-color: #10b981;
//     box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
//   }

//   button {
//     font-size: 0.875rem;
//     padding: 0.5rem 1rem;
//     border-radius: 0.375rem;
//     box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//   }
  
//   @media (min-width: 768px) {
//     .ml-64 {
//       margin-left: 16rem;
//     }
//     .ml-20 {
//       margin-left: 5rem;
//     }
//   }
// `;

// export default function AdminPage() {
//   const { updateHeaderData, createSlide } = useSiteData();
//   const headerData = useHeaderData();
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('header');
//   const [isMobile, setIsMobile] = useState(false);
//   const [sidebarVisible, setSidebarVisible] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const newIsMobile = window.innerWidth < 768;
//       setIsMobile(newIsMobile);
//       if (!newIsMobile) {
//         setSidebarVisible(true);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <div className="flex h-screen bg-gray-100">
//         <Toaster position="top-right" />

//         <Sidebar
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           isMobile={isMobile}
//           sidebarVisible={sidebarVisible}
//           toggleSidebar={toggleSidebar}
//         />

//         <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${!isMobile && (sidebarVisible ? 'md:ml-64' : 'md:ml-20')}`}>
//           <Header activeTab={activeTab} />

//           <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
//             {loading ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
//               </div>
//             ) : (
//               <div className="max-w-4xl mx-auto">
//                 {activeTab === 'header' ? (
//                   <HeaderForm headerData={headerData} updateHeaderData={updateHeaderData} />
//                 ) : (
//                   <div className="space-y-6">
//                     <SlideForm createSlide={createSlide} />
//                     <SlidesList />
//                   </div>
//                 )}
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSiteData, useHeaderData } from '../Context/SiteContext';
import Sidebar from '../Components/SideBar';
import Header from '../Components/HeaderTitle';
import HeaderForm from '../Components/HeaderSettings';
import SlideForm from '../Components/SlideForm';
import { createGlobalStyle } from 'styled-components';
import { AdminAbout } from '../Components/AboutAdmin'; // Added import for AdminAbout
import {SlidesList} from '../Components/SlideList';
const GlobalStyle = createGlobalStyle`
  input[type="text"],
  input[type="tel"],
  input[type="email"],
  input[type="url"],
  textarea {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    outline: none;
    padding-left: 2.5rem;
  }

  input[type="text"]:focus,
  input[type="tel"]:focus,
  input[type="email"]:focus,
  input[type="url"]:focus,
  textarea:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  button {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  @media (min-width: 768px) {
    .ml-64 {
      margin-left: 16rem;
    }
    .ml-20 {
      margin-left: 5rem;
    }
  }
`;

export default function AdminPage() {
  const { updateHeaderData, createSlide } = useSiteData();
  const headerData = useHeaderData();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('header'); // Update to include 'about'
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      if (!newIsMobile) {
        setSidebarVisible(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <GlobalStyle />
      <div className="flex h-screen bg-gray-100">
        <Toaster position="top-right" />

        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobile={isMobile}
          sidebarVisible={sidebarVisible}
          toggleSidebar={toggleSidebar}
        />

        <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${!isMobile && (sidebarVisible ? 'md:ml-64' : 'md:ml-20')}`}>
          <Header activeTab={activeTab} />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {activeTab === 'header' ? (
                  <HeaderForm headerData={headerData} updateHeaderData={updateHeaderData} />
                ) : activeTab === 'slides' ? (
                  <div className="space-y-6">
                    <SlideForm createSlide={createSlide} />
                    <SlidesList />
                  </div>
                ) : (
                  <AdminAbout />
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

