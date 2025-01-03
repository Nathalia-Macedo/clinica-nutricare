// import React, { useState, useCallback } from 'react';
// import { useSiteData } from '../Context/SiteContext';
// import { ImageIcon, Plus, Trash2, Save } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// export function AdminAbout() {
//   const { siteData, updateAboutData } = useSiteData();
//   const [formData, setFormData] = useState(siteData.about);
//   const [dragActive, setDragActive] = useState(false);
//   const [activeTab, setActiveTab] = useState('titulo');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDescriptionChange = (index, value) => {
//     setFormData(prev => ({
//       ...prev,
//       description: prev.description.map((item, i) => i === index ? value : item)
//     }));
//   };

//   const handleAddDescription = () => {
//     setFormData(prev => ({
//       ...prev,
//       description: [...prev.description, '']
//     }));
//   };

//   const handleRemoveDescription = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       description: prev.description.filter((_, i) => i !== index)
//     }));
//   };

//   const handleCardChange = (index, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       cards: prev.cards.map((card, i) => i === index ? { ...card, [field]: value } : card)
//     }));
//   };

//   const handleAddCard = () => {
//     setFormData(prev => ({
//       ...prev,
//       cards: [...prev.cards, { title: '', icon: '', description: '', backgroundColor: '', iconColor: '', titleColor: '', descriptionColor: '' }]
//     }));
//   };

//   const handleRemoveCard = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       cards: prev.cards.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading('Atualizando...');
//     try {
//       const result = await updateAboutData(formData);
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
//           image: e.target.result
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gerenciar Seção Sobre</h2>
//         <div className="mb-6">
//           <nav className="flex space-x-4" aria-label="Tabs">
//             {['titulo', 'descricao', 'cartoes'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`${
//                   activeTab === tab
//                     ? 'bg-green-100 text-green-700'
//                     : 'text-gray-500 hover:text-gray-700'
//                 } px-3 py-2 font-medium text-sm rounded-md`}
//               >
//                 {tab === 'titulo' ? 'Título' : tab === 'descricao' ? 'Descrição' : 'Cartões'}
//               </button>
//             ))}
//           </nav>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {activeTab === 'titulo' && (
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Imagem
//                 </label>
//                 <div
//                   className={`
//                     mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg
//                     transition-colors ${dragActive ? 'border-green-500 bg-green-50' : 'hover:border-gray-400'}
//                   `}
//                   onDragEnter={handleDrag}
//                   onDragLeave={handleDrag}
//                   onDragOver={handleDrag}
//                   onDrop={handleDrop}
//                 >
//                   <div className="space-y-1 text-center">
//                     {formData.image ? (
//                       <img src={formData.image} alt="Preview" className="mx-auto h-32 w-auto object-contain mb-4 rounded-lg" />
//                     ) : (
//                       <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
//                     )}
//                     <div className="flex text-sm text-gray-600">
//                       <label
//                         className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
//                       >
//                         <span>Carregar um arquivo</span>
//                         <input
//                           type="file"
//                           className="sr-only"
//                           onChange={(e) => handleFiles(e.target.files)}
//                           accept="image/*"
//                         />
//                       </label>
//                       <p className="pl-1">ou arraste e solte</p>
//                     </div>
//                     <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                     Título
//                   </label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="highlightedName" className="block text-sm font-medium text-gray-700 mb-1">
//                     Nome Destacado
//                   </label>
//                   <input
//                     type="text"
//                     id="highlightedName"
//                     name="highlightedName"
//                     value={formData.highlightedName}
//                     onChange={handleInputChange}
//                     className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'descricao' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Descrição
//               </label>
//               {formData.description.map((paragraph, index) => (
//                 <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm font-medium text-gray-500">Parágrafo {index + 1}</span>
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveDescription(index)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                   </div>
//                   <textarea
//                     value={paragraph}
//                     onChange={(e) => handleDescriptionChange(index, e.target.value)}
//                     className="w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300"
//                     rows={4}
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddDescription}
//                 className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 <Plus className="h-5 w-5 mr-2" />
//                 Adicionar Parágrafo
//               </button>
//             </div>
//           )}

//           {activeTab === 'cartoes' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-4">
//                 Cartões
//               </label>
//               <div className="space-y-6">
//                 {formData.cards.map((card, index) => (
//                   <div key={index} className="bg-gray-50 rounded-lg p-6">
//                     <div className="flex justify-between items-center mb-4">
//                       <h3 className="text-lg font-medium text-gray-900">Cartão {index + 1}</h3>
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveCard(index)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <Trash2 className="h-5 w-5" />
//                       </button>
//                     </div>
//                     <div className="space-y-4">
//                       <div>
//                         <label htmlFor={`card-title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                           Título
//                         </label>
//                         <input
//                           type="text"
//                           id={`card-title-${index}`}
//                           value={card.title}
//                           onChange={(e) => handleCardChange(index, 'title', e.target.value)}
//                           className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor={`card-icon-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                           Ícone (nome do ícone)
//                         </label>
//                         <input
//                           type="text"
//                           id={`card-icon-${index}`}
//                           value={card.icon}
//                           onChange={(e) => handleCardChange(index, 'icon', e.target.value)}
//                           className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                           placeholder="Ex: Heart, Star, etc."
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor={`card-description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                           Descrição
//                         </label>
//                         <textarea
//                           id={`card-description-${index}`}
//                           value={card.description}
//                           onChange={(e) => handleCardChange(index, 'description', e.target.value)}
//                           className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                           rows={3}
//                         />
//                       </div>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <label htmlFor={`card-background-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                             Cor de Fundo
//                           </label>
//                           <div className="flex items-center">
//                             <input
//                               type="color"
//                               id={`card-background-${index}`}
//                               value={card.backgroundColor}
//                               onChange={(e) => handleCardChange(index, 'backgroundColor', e.target.value)}
//                               className="w-8 h-8 p-0 border-0 rounded-md mr-2"
//                             />
//                             <input
//                               type="text"
//                               value={card.backgroundColor}
//                               onChange={(e) => handleCardChange(index, 'backgroundColor', e.target.value)}
//                               className="flex-grow px-2 py-1 text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label htmlFor={`card-icon-color-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                             Cor do Ícone
//                           </label>
//                           <div className="flex items-center">
//                             <input
//                               type="color"
//                               id={`card-icon-color-${index}`}
//                               value={card.iconColor}
//                               onChange={(e) => handleCardChange(index, 'iconColor', e.target.value)}
//                               className="w-8 h-8 p-0 border-0 rounded-md mr-2"
//                             />
//                             <input
//                               type="text"
//                               value={card.iconColor}
//                               onChange={(e) => handleCardChange(index, 'iconColor', e.target.value)}
//                               className="flex-grow px-2 py-1 text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label htmlFor={`card-title-color-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                             Cor do Título
//                           </label>
//                           <div className="flex items-center">
//                             <input
//                               type="color"
//                               id={`card-title-color-${index}`}
//                               value={card.titleColor}
//                               onChange={(e) => handleCardChange(index, 'titleColor', e.target.value)}
//                               className="w-8 h-8 p-0 border-0 rounded-md mr-2"
//                             />
//                             <input
//                               type="text"
//                               value={card.titleColor}
//                               onChange={(e) => handleCardChange(index, 'titleColor', e.target.value)}
//                               className="flex-grow px-2 py-1 text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label htmlFor={`card-description-color-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                             Cor da Descrição
//                           </label>
//                           <div className="flex items-center">
//                             <input
//                               type="color"
//                               id={`card-description-color-${index}`}
//                               value={card.descriptionColor}
//                               onChange={(e) => handleCardChange(index, 'descriptionColor', e.target.value)}
//                               className="w-8 h-8 p-0 border-0 rounded-md mr-2"
//                             />
//                             <input
//                               type="text"
//                               value={card.descriptionColor}
//                               onChange={(e) => handleCardChange(index, 'descriptionColor', e.target.value)}
//                               className="flex-grow px-2 py-1 text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 type="button"
//                 onClick={handleAddCard}
//                 className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 <Plus className="h-5 w-5 mr-2" />
//                 Adicionar Cartão
//               </button>
//             </div>
//           )}

//           <div className="flex justify-end pt-6">
//             <button
//               type="submit"
//               className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm"
//             >
//               <Save className="h-5 w-5 mr-2" />
//               Salvar Alterações
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useCallback } from 'react';
import { useSiteData } from '../Context/SiteContext';
import { ImageIcon, Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function AdminAbout() {
  const { siteData, updateAboutData } = useSiteData();
  const [formData, setFormData] = useState(siteData.about);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState('titulo');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description.map((item, i) => i === index ? value : item)
    }));
  };

  const handleAddDescription = () => {
    setFormData(prev => ({
      ...prev,
      description: [...prev.description, '']
    }));
  };

  const handleRemoveDescription = (index) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index)
    }));
  };

  const handleCardChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      cards: prev.cards.map((card, i) => i === index ? { ...card, [field]: value } : card)
    }));
  };

  const handleAddCard = () => {
    setFormData(prev => ({
      ...prev,
      cards: [...prev.cards, { title: '', icon: '', description: '', backgroundColor: '', iconColor: '', titleColor: '', descriptionColor: '' }]
    }));
  };

  const handleRemoveCard = (index) => {
    setFormData(prev => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Atualizando...');
    try {
      const result = await updateAboutData(formData);
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
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardIconChange = async (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          cards: prev.cards.map((card, i) => 
            i === index 
              ? { ...card, icon: e.target.result }
              : card
          )
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gerenciar Seção Sobre</h2>
        <div className="mb-6">
          <nav className="flex space-x-4" aria-label="Tabs">
            {['titulo', 'descricao', 'cartoes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 font-medium text-sm rounded-md`}
              >
                {tab === 'titulo' ? 'Título' : tab === 'descricao' ? 'Descrição' : 'Cartões'}
              </button>
            ))}
          </nav>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'titulo' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem
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
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="mx-auto h-32 w-auto object-contain mb-4 rounded-lg" />
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
                          onChange={(e) => handleFiles(e.target.files)}
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="highlightedName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Destacado
                  </label>
                  <input
                    type="text"
                    id="highlightedName"
                    name="highlightedName"
                    value={formData.highlightedName}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'descricao' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              {formData.description.map((paragraph, index) => (
                <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Parágrafo {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDescription(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <textarea
                    value={paragraph}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    className="w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300"
                    rows={4}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddDescription}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Parágrafo
              </button>
            </div>
          )}

          {activeTab === 'cartoes' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Cartões
              </label>
              <div className="space-y-6">
                {formData.cards.map((card, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Cartão {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => handleRemoveCard(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor={`card-title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Título
                        </label>
                        <input
                          type="text"
                          id={`card-title-${index}`}
                          value={card.title}
                          onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                          className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label htmlFor={`card-icon-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Ícone
                        </label>
                        <div className="flex items-center space-x-4">
                          {card.icon && (
                            <div className="w-12 h-12 relative">
                              <img
                                src={card.icon}
                                alt="Icon preview"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <label
                              className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 inline-flex items-center px-3 py-2 border border-gray-300"
                            >
                              <span>{card.icon ? 'Trocar ícone' : 'Carregar ícone'}</span>
                              <input
                                type="file"
                                id={`card-icon-${index}`}
                                className="sr-only"
                                accept="image/*"
                                onChange={(e) => e.target.files && handleCardIconChange(index, e.target.files[0])}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor={`card-description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Descrição
                        </label>
                        <textarea
                          id={`card-description-${index}`}
                          value={card.description}
                          onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                          className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`card-background-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Cor de Fundo
                          </label>
                          <div className="flex items-center">
                            <input
                              type="color"
                              id={`card-background-${index}`}
                              value={card.backgroundColor}
                              onChange={(e) => handleCardChange(index, 'backgroundColor', e.target.value)}
                              className="w-8 h-8 p-0 border-0 rounded-md mr-2"
                            />
                            <input
                              type="text"
                              value={card.backgroundColor}
                              onChange={(e) => handleCardChange(index, 'backgroundColor', e.target.value)}
                              className="flex-grow px-2 py-1 text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor={`card-icon-color-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Cor do Ícone
                          </label>
                          <div className="flex items-center">
                            <input
                              type="color"
                              id={`card-icon-color-${index}`}
                              value={card.iconColor}
                              onChange={(e) => handleCardChange(index, 'iconColor', e.target.value)}
                              className="w-8 h-8 p-0 border-0 rounded-md mr-2"
                            />
                            <input
                              type="text"
                              value={card.iconColor}
                              onChange={(e) => handleCardChange(index, 'iconColor', e.target.value)}
                              className="flex-grow px-2 py-1 text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor={`card-title-color-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Cor do Título
                          </label>
                          <div className="flex items-center">
                            <input
                              type="color"
                              id={`card-title-color-${index}`}
                              value={card.titleColor}
                              onChange={(e) => handleCardChange(index, 'titleColor', e.target.value)}
                              className="w-8 h-8 p-0 border-0 rounded-md mr-2"
                            />
                            <input
                              type="text"
                              value={card.titleColor}
                              onChange={(e) => handleCardChange(index, 'titleColor', e.target.value)}
                              className="flex-grow px-2 py-1 text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor={`card-description-color-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Cor da Descrição
                          </label>
                          <div className="flex items-center">
                            <input
                              type="color"
                              id={`card-description-color-${index}`}
                              value={card.descriptionColor}
                              onChange={(e) => handleCardChange(index, 'descriptionColor', e.target.value)}
                              className="w-8 h-8 p-0 border-0 rounded-md mr-2"
                            />
                            <input
                              type="text"
                              value={card.descriptionColor}
                              onChange={(e) => handleCardChange(index, 'descriptionColor', e.target.value)}
                              className="flex-grow px-2 py-1 text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddCard}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Cartão
              </button>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm"
            >
              <Save className="h-5 w-5 mr-2" />
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

