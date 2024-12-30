// import React, { useState, useEffect, useCallback } from 'react';
// import { useSiteData, useHeaderData } from '../Context/SiteContext';
// import { Phone, Mail, ImageIcon, Trash2, Plus, Save, Menu, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Settings, X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Toaster, toast } from 'react-hot-toast';
// import { SlidesList } from '../Components/SlideList';
// import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
//   /* Estilos Globais */
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

//   /* Ajustes para a barra de navegação no mobile */
//   @media (max-width: 768px) {
//     aside {
//       position: fixed;
//       bottom: 0;
//       left: 0;
//       width: 100%;
//       height: auto;
//       z-index: 50; /* Garante que a barra fique sobre outras camadas, mas abaixo de modais importantes */
//       background: white;
//       box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
//       border-top: 1px solid #e5e7eb;
//       transform: translateY(100%);
//       transition: transform 0.3s ease-in-out;
//     }

//     aside.closed {
//       transform: translateY(100%);
//     }

//     aside.expanded {
//       transform: translateY(0);
//     }

//     aside nav ul {
//       display: flex;
//       justify-content: space-around;
//       align-items: center;
//       padding: 0.5rem;
//     }

//     aside nav ul li button {
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       padding: 0.5rem;
//       font-size: 0.75rem;
//     }

//     aside nav ul li span {
//       margin-left: 0;
//     }
//   }

//   /* Adicione essa classe ao JavaScript para alternar o estado expandido ou fechado */
//   .expanded {
//     transform: translateY(0) !important;
//   }

//   .closed {
//     transform: translateY(100%) !important;
//   }
// `;




// export default function AdminPage() {
//   const { updateHeaderData, createSlide } = useSiteData();
//   const headerData = useHeaderData();
//   const [formData, setFormData] = useState(headerData);
//   const [dragActive, setDragActive] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('header');
//   const [sidebarExpanded, setSidebarExpanded] = useState(() => {
//     // Inicializa como expandido no desktop e retraído no mobile
//     return window.innerWidth >= 768;
//   });
//   const [isMobile, setIsMobile] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarExpanded(prev => !prev);
//   };

//   const [slideFormData, setSlideFormData] = useState({
//     image: '',
//     title: '',
//     description: '',
//     buttonText: '',
//     buttonLink: '',
//     position: 'left'
//   });
//   const [slidePreview, setSlidePreview] = useState(null);
//   const [slideDragActive, setSlideDragActive] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const newIsMobile = window.innerWidth < 768;
//       setIsMobile(newIsMobile);
//       if (!newIsMobile) {
//         setSidebarExpanded(true);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const loadInitialData = async () => {
//       setLoading(true);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       if (headerData) {
//         setFormData(headerData);
//       }
//       setLoading(false);
//     };

//     loadInitialData();
//   }, [headerData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleContactChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       contacts: [{ ...prev.contacts[0], [name]: value }]
//     }));
//   };

//   const handleSocialChange = (index, value) => {
//     setFormData(prev => ({
//       ...prev,
//       contacts: [{
//         ...prev.contacts[0],
//         social: prev.contacts[0].social.map((link, i) => i === index ? value : link)
//       }]
//     }));
//   };

//   const handleAddSocial = () => {
//     setFormData(prev => ({
//       ...prev,
//       contacts: [{
//         ...prev.contacts?.[0],
//         social: [...(prev.contacts?.[0]?.social || []), '']
//       }]
//     }));
//   };

//   const handleRemoveSocial = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       contacts: [{
//         ...prev.contacts[0],
//         social: prev.contacts[0].social.filter((_, i) => i !== index)
//       }]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading('Atualizando...');
//     try {
//       const result = await updateHeaderData(formData);
//       if (result.success) {
//         toast.success('Atualizado com sucesso!', { id: toastId });
//       } else {
//         toast.error('Erro ao atualizar', { id: toastId });
//       }
//     } catch (error) {
//       toast.error('Erro ao atualizar: ' + error.message, { id: toastId });
//     }
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFiles(e.dataTransfer.files);
//     }
//   }, []);

//   const handleFiles = (files) => {
//     if (files && files[0]) {
//       const file = files[0];
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setFormData(prev => ({
//           ...prev,
//           logo: e.target.result
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSlideInputChange = (e) => {
//     const { name, value } = e.target;
//     setSlideFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSlideDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setSlideDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setSlideDragActive(false);
//     }
//   };

//   const handleSlideImageDrop = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setSlideDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleSlideFiles(e.dataTransfer.files);
//     }
//   }, []);

//   const handleSlideFiles = (files) => {
//     if (files && files[0]) {
//       const file = files[0];
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setSlidePreview(e.target.result);
//         setSlideFormData(prev => ({
//           ...prev,
//           image: e.target.result
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSlideSubmit = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading('Criando slide...');
//     try {
//       const result = await createSlide(slideFormData);
//       if (result.success) {
//         toast.success('Slide criado com sucesso!', { id: toastId });
//         setSlideFormData({
//           image: '',
//           title: '',
//           description: '',
//           buttonText: '',
//           buttonLink: '',
//           position: 'left'
//         });
//         setSlidePreview(null);
//       } else {
//         toast.error('Erro ao criar slide', { id: toastId });
//       }
//     } catch (error) {
//       toast.error('Erro ao criar slide: ' + error.message, { id: toastId });
//     }
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <div className="flex h-screen bg-gray-100">
//         <Toaster position="top-right" />

//         {/* Sidebar */}
//         <aside
//           className={`
//             fixed inset-y-0 left-0 z-30 bg-white shadow-lg transition-all duration-300 ease-in-out
//             ${sidebarExpanded ? 'w-64' : 'w-20'}
//             ${isMobile && !sidebarExpanded ? '-translate-x-full' : 'translate-x-0'}
//           `}
//         >
//           <div className="flex flex-col h-full">
//             <div className="flex items-center justify-between p-4 border-b">
//               <span className={`text-xl font-semibold text-green-600 ${!sidebarExpanded ? 'hidden' : ''}`}>Nutricare</span>
//               <button
//                 onClick={toggleSidebar}
//                 className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
//               >
//                 {sidebarExpanded ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
//               </button>
//             </div>
//             <nav className="flex-1 overflow-y-auto">
//               <ul className="p-2 space-y-2">
//                 {[
//                   { id: 'header', icon: <Settings className="h-5 w-5" />, label: 'Configurações' },
//                   { id: 'slides', icon: <ImageIcon className="h-5 w-5" />, label: 'Gerenciar Slides' },
//                 ].map((item) => (
//                   <li key={item.id}>
//                     <button
//                       onClick={() => {
//                         setActiveTab(item.id);
//                         if (isMobile) {
//                           setSidebarExpanded(false);
//                         }
//                       }}
//                       className={`
//                         flex items-center w-full p-2 rounded-lg transition-colors duration-200
//                         ${activeTab === item.id
//                           ? 'bg-green-100 text-green-700'
//                           : 'text-gray-600 hover:bg-gray-100'
//                         }
//                         ${!sidebarExpanded && 'justify-center'}
//                       `}
//                     >
//                       <span className="inline-flex justify-center items-center w-8 h-8">
//                         {item.icon}
//                       </span>
//                       <span className={`ml-3 text-sm font-medium ${!sidebarExpanded ? 'hidden' : ''}`}>{item.label}</span>
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </div>
//         </aside>

//         {/* Main content */}
//         <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
//           {/* Header */}
//           <header className="bg-white shadow-sm z-20 relative">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
//               <h1 className="text-lg font-semibold text-gray-900 ml-4 flex-grow text-center">
//                 {activeTab === 'header' ? 'Configurações do Cabeçalho' : 'Gerenciar Slides'}
//               </h1>
//             </div>
//           </header>

//           {/* Page content */}
//           <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
//             {loading ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
//               </div>
//             ) : (
//               <div className="max-w-4xl mx-auto">
//                 {activeTab === 'header' ? (
//                   <div className="bg-white shadow-md rounded-lg overflow-hidden">
//                     <div className="p-6 space-y-6">
//                       <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* Logo Upload */}
//                         <div>
//                           <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
//                             Logo
//                           </label>
//                           <div
//                             className={`
//                               mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg
//                               transition-colors ${dragActive ? 'border-green-500 bg-green-50' : 'hover:border-gray-400'}
//                             `}
//                             onDragEnter={handleDrag}
//                             onDragLeave={handleDrag}
//                             onDragOver={handleDrag}
//                             onDrop={handleDrop}
//                           >
//                             <div className="space-y-1 text-center">
//                               {formData?.logo ? (
//                                 <img src={formData.logo} alt="Logo" className="mx-auto h-20 w-auto mb-4 rounded-lg" />
//                               ) : (
//                                 <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
//                               )}
//                               <div className="flex text-sm text-gray-600">
//                                 <label
//                                   htmlFor="file-upload"
//                                   className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
//                                 >
//                                   <span>Carregar um arquivo</span>
//                                   <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => handleFiles(e.target.files)} accept="image/*" />
//                                 </label>
//                                 <p className="pl-1">ou arraste e solte</p>
//                               </div>
//                               <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Contact Information */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           <div>
//                             <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                               Telefone
//                             </label>
//                             <div className="mt-1 relative rounded-md shadow-sm">
//                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <Phone className="h-4 w-4 text-gray-400" />
//                               </div>
//                               <input
//                                 type="tel"
//                                 id="phone"
//                                 name="phone"
//                                 value={formData?.contacts?.[0]?.phone || ''}
//                                 onChange={handleContactChange}
//                                 className="block w-full pl-9 pr-3 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
//                                 placeholder="(00) 0000-0000"
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
//                               WhatsApp
//                             </label>
//                             <div className="mt-1 relative rounded-md shadow-sm">
//                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <Phone className="h-4 w-4 text-gray-400" />
//                               </div>
//                               <input
//                                 type="tel"
//                                 id="whatsapp"
//                                 name="whatsapp"
//                                 value={formData?.contacts?.[0]?.whatsapp || ''}
//                                 onChange={handleContactChange}
//                                 className="block w-full pl-9 pr-3 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
//                                 placeholder="(00) 00000-0000"
//                               />
//                             </div>
//                           </div>
//                           <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
//                             <div className="sm:col-span-2">
//                               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                                 E-mail
//                               </label>
//                               <div className="mt-1 relative rounded-md shadow-sm">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                   <Mail className="h-4 w-4 text-gray-400" />
//                                 </div>
//                                 <input
//                                   type="email"
//                                   id="email"
//                                   name="email"
//                                   value={formData?.contacts?.[0]?.email || ''}
//                                   onChange={handleContactChange}
//                                   className="block w-full pl-9 pr-3 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
//                                   placeholder="exemplo@nutricare.com"
//                                 />
//                               </div>
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Redes Sociais
//                               </label>
//                               <div className="mt-1 space-y-2">
//                                 {formData?.contacts?.[0]?.social?.map((link, index) => (
//                                   <div key={index} className="flex items-center">
//                                     <input
//                                       type="url"
//                                       value={link}
//                                       onChange={(e) => handleSocialChange(index, e.target.value)}
//                                       className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
//                                       placeholder="https://exemplo.com"
//                                     />
//                                     <button
//                                       type="button"
//                                       onClick={() => handleRemoveSocial(index)}
//                                       className="ml-2 p-1 text-red-600 hover:text-red-800"
//                                     >
//                                       <Trash2 className="h-4 w-4" />
//                                     </button>
//                                   </div>
//                                 ))}
//                                 <button
//                                   type="button"
//                                   onClick={handleAddSocial}
//                                   className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                                 >
//                                   <Plus className="h-4 w-4 mr-1" />
//                                   Adicionar
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Submit Button */}
//                         <div className="flex justify-end">
//                           <button
//                             type="submit"
//                             className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm"
//                           >
//                             <Save className="h-4 w-4 mr-2" />
//                             Salvar Alterações
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-6">
//                     <div className="bg-white shadow rounded-lg overflow-hidden">
//                       <div className="p-6">
//                         <h2 className="text-xl font-semibold text-gray-900 mb-6">Adicionar Novo Slide</h2>
//                         <form onSubmit={handleSlideSubmit} className="space-y-6">
//                           {/* Image Upload */}
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Imagem do Slide
//                             </label>
//                             <div
//                               className={`
//                                 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg
//                                 transition-colors ${slideDragActive ? 'border-green-500 bg-green-50' : 'hover:border-gray-400'}
//                               `}
//                               onDragEnter={handleSlideDrag}
//                               onDragLeave={handleSlideDrag}
//                               onDragOver={handleSlideDrag}
//                               onDrop={handleSlideImageDrop}
//                             >
//                               <div className="space-y-1 text-center">
//                                 {slidePreview ? (
//                                   <img src={slidePreview} alt="Pré-visualização" className="mx-auto h-32 w-auto object-contain mb-4 rounded-lg" />
//                                 ) : (
//                                   <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
//                                 )}
//                                 <div className="flex text-sm text-gray-600">
//                                   <label
//                                     className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
//                                   >
//                                     <span>Carregar um arquivo</span>
//                                     <input
//                                       type="file"
//                                       className="sr-only"
//                                       onChange={(e) => handleSlideFiles(e.target.files)}
//                                       accept="image/*"
//                                     />
//                                   </label>
//                                   <p className="pl-1">ou arraste e solte</p>
//                                 </div>
//                                 <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Text Content */}
//                           <div className="grid grid-cols-1 gap-6">
//                             <div>
//                               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Título
//                               </label>
//                               <input
//                                 type="text"
//                                 id="title"
//                                 name="title"
//                                 value={slideFormData.title}
//                                 onChange={handleSlideInputChange}
//                                 className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                                 placeholder="Digite o título do slide"
//                               />
//                             </div>
//                             <div>
//                               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Descrição
//                               </label>
//                               <textarea
//                                 id="description"
//                                 name="description"
//                                 rows={3}
//                                 value={slideFormData.description}
//                                 onChange={handleSlideInputChange}
//                                 className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                                 placeholder="Digite a descrição do slide"
//                               />
//                             </div>
//                           </div>

//                           {/* Button Configuration */}
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                               <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Texto do Botão
//                               </label>
//                               <input
//                                 type="text"
//                                 id="buttonText"
//                                 name="buttonText"
//                                 value={slideFormData.buttonText}
//                                 onChange={handleSlideInputChange}
//                                 className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                                 placeholder="Ex: Saiba Mais"
//                               />
//                             </div>
//                             <div>
//                               <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Link do Botão
//                               </label>
//                               <input
//                                 type="text"
//                                 id="buttonLink"
//                                 name="buttonLink"
//                                 value={slideFormData.buttonLink}
//                                 onChange={handleSlideInputChange}
//                                 className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                                 placeholder="Ex: /sobre"
//                               />
//                             </div>
//                           </div>

//                           {/* Position Selection */}
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Posição do Conteúdo
//                             </label>
//                             <div className="grid grid-cols-2 gap-4">
//                               <label className="flex items-center">
//                                 <input
//                                   type="radio"
//                                   name="position"
//                                   value="top"
//                                   checked={slideFormData.position === 'top'}
//                                   onChange={handleSlideInputChange}
//                                   className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
//                                 />
//                                 <span className="ml-2 flex items-center text-sm text-gray-700">
//                                   <ArrowUp className="h-5 w-5 mr-1" /> Topo
//                                 </span>
//                               </label>
//                               <label className="flex items-center">
//                                 <input
//                                   type="radio"
//                                   name="position"
//                                   value="right"
//                                   checked={slideFormData.position === 'right'}
//                                   onChange={handleSlideInputChange}
//                                   className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
//                                 />
//                                 <span className="ml-2 flex items-center text-sm text-gray-700">
//                                   <ArrowRight className="h-5 w-5 mr-1" /> Direita
//                                 </span>
//                               </label>
//                               <label className="flex items-center">
//                                 <input
//                                   type="radio"
//                                   name="position"
//                                   value="bottom"
//                                   checked={slideFormData.position === 'bottom'}
//                                   onChange={handleSlideInputChange}
//                                   className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
//                                 />
//                                 <span className="ml-2 flex items-center text-sm text-gray-700">
//                                   <ArrowDown className="h-5 w-5 mr-1" /> Baixo
//                                 </span>
//                               </label>
//                               <label className="flex items-center">
//                                 <input
//                                   type="radio"
//                                   name="position"
//                                   value="left"
//                                   checked={slideFormData.position === 'left'}
//                                   onChange={handleSlideInputChange}
//                                   className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
//                                 />
//                                 <span className="ml-2 flex items-center text-sm text-gray-700">
//                                   <ArrowLeft className="h-5 w-5 mr-1" /> Esquerda
//                                 </span>
//                               </label>
//                             </div>
//                           </div>

//                           {/* Submit Button */}
//                           <div>
//                             <button
//                               type="submit"
//                               className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                             >
//                               <Plus className="h-5 w-5 mr-2" />
//                               Criar Slide
//                             </button>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                     <div className="bg-white shadow rounded-lg overflow-hidden">
//                       <div className="p-6">
//                         <h2 className="text-xl font-semibold text-gray-900 mb-6">Slides Existentes</h2>
//                         <SlidesList />
//                       </div>
//                     </div>
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

import React, { useState, useEffect, useCallback } from 'react';
import { useSiteData, useHeaderData } from '../Context/SiteContext';
import { Phone, Mail, ImageIcon, Trash2, Plus, Save, Menu, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Settings, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { SlidesList } from '../Components/SlideList';
import { createGlobalStyle } from 'styled-components';

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
      padding-left: 2.5rem; /* Ajuste o valor conforme necessário */

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
  const [formData, setFormData] = useState(headerData);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('header');
  const [sidebarExpanded, setSidebarExpanded] = useState(() => {
    // Inicializa como recolhido no mobile e expandido no desktop
    return window.innerWidth >= 768;
  });
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false); // Update 1

  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev);
  };

  const toggleMobileNav = () => { // Update 2
    setSidebarVisible(prev => !prev);
  };

  const [slideFormData, setSlideFormData] = useState({
    image: '',
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    position: 'left'
  });
  const [slidePreview, setSlidePreview] = useState(null);
  const [slideDragActive, setSlideDragActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      if (!newIsMobile) {
        setSidebarExpanded(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (headerData) {
        setFormData(headerData);
      }
      setLoading(false);
    };

    loadInitialData();
  }, [headerData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contacts: [{ ...prev.contacts[0], [name]: value }]
    }));
  };

  const handleSocialChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      contacts: [{
        ...prev.contacts[0],
        social: prev.contacts[0].social.map((link, i) => i === index ? value : link)
      }]
    }));
  };

  const handleAddSocial = () => {
    setFormData(prev => ({
      ...prev,
      contacts: [{
        ...prev.contacts?.[0],
        social: [...(prev.contacts?.[0]?.social || []), '']
      }]
    }));
  };

  const handleRemoveSocial = (index) => {
    setFormData(prev => ({
      ...prev,
      contacts: [{
        ...prev.contacts[0],
        social: prev.contacts[0].social.filter((_, i) => i !== index)
      }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Atualizando...');
    try {
      const result = await updateHeaderData(formData);
      if (result.success) {
        toast.success('Atualizado com sucesso!', { id: toastId });
      } else {
        toast.error('Erro ao atualizar', { id: toastId });
      }
    } catch (error) {
      toast.error('Erro ao atualizar: ' + error.message, { id: toastId });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          logo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSlideInputChange = (e) => {
    const { name, value } = e.target;
    setSlideFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlideDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setSlideDragActive(true);
    } else if (e.type === 'dragleave') {
      setSlideDragActive(false);
    }
  };

  const handleSlideImageDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setSlideDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSlideFiles(e.dataTransfer.files);
    }
  }, []);

  const handleSlideFiles = (files) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setSlidePreview(e.target.result);
        setSlideFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSlideSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Criando slide...');
    try {
      const result = await createSlide(slideFormData);
      if (result.success) {
        toast.success('Slide criado com sucesso!', { id: toastId });
        setSlideFormData({
          image: '',
          title: '',
          description: '',
          buttonText: '',
          buttonLink: '',
          position: 'left'
        });
        setSlidePreview(null);
      } else {
        toast.error('Erro ao criar slide', { id: toastId });
      }
    } catch (error) {
      toast.error('Erro ao criar slide: ' + error.message, { id: toastId });
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="flex h-screen bg-gray-100">
        <Toaster position="top-right" />

        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 bg-white shadow-lg transition-all duration-300 ease-in-out
            ${sidebarExpanded ? 'w-64' : 'w-20'}
            ${isMobile ? (sidebarVisible ? 'block' : 'hidden') : 'translate-x-0'} // Update 3
          `}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <span className={`text-xl font-semibold text-green-600 ${!sidebarExpanded ? 'hidden' : ''}`}>Nutricare</span>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              >
                {sidebarExpanded ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <ul className="p-2 space-y-2">
                {[
                  { id: 'header', icon: <Settings className="h-5 w-5" />, label: 'Configurações' },
                  { id: 'slides', icon: <ImageIcon className="h-5 w-5" />, label: 'Gerenciar Slides' },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        if (isMobile) {
                          setSidebarExpanded(false);
                        }
                      }}
                      className={`
                        flex items-center w-full p-2 rounded-lg transition-colors duration-200
                        ${activeTab === item.id
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                        ${!sidebarExpanded && 'justify-center'}
                      `}
                    >
                      <span className="inline-flex justify-center items-center w-8 h-8">
                        {item.icon}
                      </span>
                      <span className={`ml-3 text-sm font-medium ${!sidebarExpanded ? 'hidden' : ''}`}>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        {isMobile && ( // Update 4
          <button
            onClick={toggleMobileNav}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-green-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {sidebarVisible ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        )}


        {/* Main content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${!isMobile && (sidebarExpanded ? 'md:ml-64' : 'md:ml-20')}`}> {/* Update 5 */}
          {/* Header */}
          <header className="bg-white shadow-sm z-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
              <h1 className="text-lg font-semibold text-gray-900">
                {activeTab === 'header' ? 'Configurações do Cabeçalho' : 'Gerenciar Slides'}
              </h1>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {activeTab === 'header' ? (
                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6 space-y-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Logo Upload */}
                        <div>
                          <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                            Logo
                          </label>
                          <div
                            className={`
                              mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg
                              transition-colors ${dragActive ? 'border-green-500 bg-green-50' : 'hover:border-gray-400'}
                            `}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                          >
                            <div className="space-y-1 text-center">
                              {formData?.logo ? (
                                <img src={formData.logo} alt="Logo" className="mx-auto h-20 w-auto mb-4 rounded-lg" />
                              ) : (
                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                              )}
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                                >
                                  <span>Carregar um arquivo</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => handleFiles(e.target.files)} accept="image/*" />
                                </label>
                                <p className="pl-1">ou arraste e solte</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                            </div>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Telefone
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData?.contacts?.[0]?.phone || ''}
                                onChange={handleContactChange}
                                className="block w-full pl-9 pr-3 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                placeholder="(00) 0000-0000"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                              WhatsApp
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                id="whatsapp"
                                name="whatsapp"
                                value={formData?.contacts?.[0]?.whatsapp || ''}
                                onChange={handleContactChange}
                                className="block w-full pl-9 pr-3 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                placeholder="(00) 00000-0000"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                E-mail
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Mail className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={formData?.contacts?.[0]?.email || ''}
                                  onChange={handleContactChange}
                                  className="block w-full pl-9 pr-3 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                  placeholder="exemplo@nutricare.com"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Redes Sociais
                              </label>
                              <div className="mt-1 space-y-2">
                                {formData?.contacts?.[0]?.social?.map((link, index) => (
                                  <div key={index} className="flex items-center">
                                    <input
                                      type="url"
                                      value={link}
                                      onChange={(e) => handleSocialChange(index, e.target.value)}
                                      className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                      placeholder="https://exemplo.com"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveSocial(index)}
                                      className="ml-2 p-1 text-red-600 hover:text-red-800"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={handleAddSocial}
                                  className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Adicionar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Salvar Alterações
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Adicionar Novo Slide</h2>
                        <form onSubmit={handleSlideSubmit} className="space-y-6">
                          {/* Image Upload */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Imagem do Slide
                            </label>
                            <div
                              className={`
                                mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg
                                transition-colors ${slideDragActive ? 'border-green-500 bg-green-50' : 'hover:border-gray-400'}
                              `}
                              onDragEnter={handleSlideDrag}
                              onDragLeave={handleSlideDrag}
                              onDragOver={handleSlideDrag}
                              onDrop={handleSlideImageDrop}
                            >
                              <div className="space-y-1 text-center">
                                {slidePreview ? (
                                  <img src={slidePreview} alt="Pré-visualização" className="mx-auto h-32 w-auto object-contain mb-4 rounded-lg" />
                                ) : (
                                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                )}
                                <div className="flex text-sm text-gray-600">
                                  <label
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                                  >
                                    <span>Carregar um arquivo</span>
                                    <input
                                      type="file"
                                      className="sr-only"
                                      onChange={(e) => handleSlideFiles(e.target.files)}
                                      accept="image/*"
                                    />
                                  </label>
                                  <p className="pl-1">ou arraste e solte</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                              </div>
                            </div>
                          </div>

                          {/* Text Content */}
                          <div className="grid grid-cols-1 gap-6">
                            <div>
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Título
                              </label>
                              <input
                                type="text"
                                id="title"
                                name="title"
                                value={slideFormData.title}
                                onChange={handleSlideInputChange}
                                className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                placeholder="Digite o título do slide"
                              />
                            </div>
                            <div>
                              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Descrição
                              </label>
                              <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={slideFormData.description}
                                onChange={handleSlideInputChange}
                                className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                placeholder="Digite a descrição do slide"
                              />
                            </div>
                          </div>

                          {/* Button Configuration */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-2">
                                Texto do Botão
                              </label>
                              <input
                                type="text"
                                id="buttonText"
                                name="buttonText"
                                value={slideFormData.buttonText}
                                onChange={handleSlideInputChange}
                                className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                placeholder="Ex: Saiba Mais"
                              />
                            </div>
                            <div>
                              <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 mb-2">
                                Link do Botão
                              </label>
                              <input
                                type="text"
                                id="buttonLink"
                                name="buttonLink"
                                value={slideFormData.buttonLink}
                                onChange={handleSlideInputChange}
                                className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                placeholder="Ex: /sobre"
                              />
                            </div>
                          </div>

                          {/* Position Selection */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Posição do Conteúdo
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="position"
                                  value="top"
                                  checked={slideFormData.position === 'top'}
                                  onChange={handleSlideInputChange}
                                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                                />
                                <span className="ml-2 flex items-center text-sm text-gray-700">
                                  <ArrowUp className="h-5 w-5 mr-1" /> Topo
                                </span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="position"
                                  value="right"
                                  checked={slideFormData.position === 'right'}
                                  onChange={handleSlideInputChange}
                                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                                />
                                <span className="ml-2 flex items-center text-sm text-gray-700">
                                  <ArrowRight className="h-5 w-5 mr-1" /> Direita
                                </span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="position"
                                  value="bottom"
                                  checked={slideFormData.position === 'bottom'}
                                  onChange={handleSlideInputChange}
                                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                                />
                                <span className="ml-2 flex items-center text-sm text-gray-700">
                                  <ArrowDown className="h-5 w-5 mr-1" /> Baixo
                                </span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="position"
                                  value="left"
                                  checked={slideFormData.position === 'left'}
                                  onChange={handleSlideInputChange}
                                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                                />
                                <span className="ml-2 flex items-center text-sm text-gray-700">
                                  <ArrowLeft className="h-5 w-5 mr-1" /> Esquerda
                                </span>
                              </label>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div>
                            <button
                              type="submit"
                              className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <Plus className="h-5 w-5 mr-2" />
                              Criar Slide
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Slides Existentes</h2>
                        <SlidesList />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

