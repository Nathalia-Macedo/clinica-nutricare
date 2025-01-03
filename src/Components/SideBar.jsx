// import React from 'react';
// import { Settings, ImageIcon, ChevronLeft, ChevronRight, X, Menu } from 'lucide-react';

// const Sidebar = ({ activeTab, setActiveTab, isMobile, sidebarVisible, toggleSidebar }) => {
//   return (
//     <>
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-30 bg-white shadow-lg transition-all duration-300 ease-in-out
//           ${sidebarVisible ? 'w-64' : 'w-20'}
//           ${isMobile ? (sidebarVisible ? 'block' : 'hidden') : 'translate-x-0'}
//         `}
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-between p-4 border-b">
//             <span className={`text-xl font-semibold text-green-600 ${!sidebarVisible ? 'hidden' : ''}`}>Nutricare</span>
//             <button
//               onClick={toggleSidebar}
//               className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
//             >
//               {sidebarVisible ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
//             </button>
//           </div>
//           <nav className="flex-1 overflow-y-auto">
//             <ul className="p-2 space-y-2">
//               {[
//                 { id: 'header', icon: <Settings className="h-5 w-5" />, label: 'Configurações' },
//                 { id: 'slides', icon: <ImageIcon className="h-5 w-5" />, label: 'Gerenciar Slides' },
//               ].map((item) => (
//                 <li key={item.id}>
//                   <button
//                     onClick={() => {
//                       setActiveTab(item.id);
//                       if (isMobile) {
//                         toggleSidebar();
//                       }
//                     }}
//                     className={`
//                       flex items-center w-full p-2 rounded-lg transition-colors duration-200
//                       ${activeTab === item.id
//                         ? 'bg-green-100 text-green-700'
//                         : 'text-gray-600 hover:bg-gray-100'
//                       }
//                       ${!sidebarVisible && 'justify-center'}
//                     `}
//                   >
//                     <span className="inline-flex justify-center items-center w-8 h-8">
//                       {item.icon}
//                     </span>
//                     <span className={`ml-3 text-sm font-medium ${!sidebarVisible ? 'hidden' : ''}`}>{item.label}</span>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </aside>
//       {isMobile && (
//         <button
//           onClick={toggleSidebar}
//           className="fixed top-4 right-4 z-50 p-3 rounded-full bg-green-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//         >
//           {sidebarVisible ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       )}
//     </>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Settings, ImageIcon, ChevronLeft, ChevronRight, X, Menu, Info } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isMobile, sidebarVisible, toggleSidebar }) => {
  return (
    <>
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 bg-white shadow-lg transition-all duration-300 ease-in-out
          ${sidebarVisible ? 'w-64' : 'w-20'}
          ${isMobile ? (sidebarVisible ? 'block' : 'hidden') : 'translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <span className={`text-xl font-semibold text-green-600 ${!sidebarVisible ? 'hidden' : ''}`}>Nutricare</span>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              {sidebarVisible ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-2 space-y-2">
              {[
                { id: 'header', icon: <Settings className="h-5 w-5" />, label: 'Configurações' },
                { id: 'slides', icon: <ImageIcon className="h-5 w-5" />, label: 'Gerenciar Slides' },
                { id: 'about', icon: <Info className="h-5 w-5" />, label: 'Sobre' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      if (isMobile) {
                        toggleSidebar();
                      }
                    }}
                    className={`
                      flex items-center w-full p-2 rounded-lg transition-colors duration-200
                      ${activeTab === item.id
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                      ${!sidebarVisible && 'justify-center'}
                    `}
                  >
                    <span className="inline-flex justify-center items-center w-8 h-8">
                      {item.icon}
                    </span>
                    <span className={`ml-3 text-sm font-medium ${!sidebarVisible ? 'hidden' : ''}`}>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 p-3 rounded-full bg-green-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {sidebarVisible ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      )}
    </>
  );
};

export default Sidebar;

