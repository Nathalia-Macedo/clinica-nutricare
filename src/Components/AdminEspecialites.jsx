// import React, { useState, useEffect } from 'react';
// import { useSiteData } from '../Context/SiteContext';
// import { Plus, Trash2, Save, AlertCircle } from 'lucide-react';
// import { toast } from 'react-hot-toast';
// import * as Icons from 'react-icons/fa';

// const IconPreview = ({ iconName }) => {
//   const IconComponent = Icons[iconName];
//   return IconComponent ? <IconComponent className="text-3xl" /> : null;
// };

// const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
//         <h3 className="text-lg font-semibold mb-4">{message}</h3>
//         <div className="flex justify-end space-x-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
//           >
//             Cancelar
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//           >
//             Confirmar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export function AdminSpecialties() {
//   const { siteData, updateSpecialtiesData } = useSiteData();
//   const [specialties, setSpecialties] = useState(siteData.specialties || []);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [specialtyToDelete, setSpecialtyToDelete] = useState(null);

//   useEffect(() => {
//     setSpecialties(siteData.specialties || []);
//   }, [siteData.specialties]);

//   const handleInputChange = (index, field, value) => {
//     const updatedSpecialties = specialties.map((specialty, i) => {
//       if (i === index) {
//         return { ...specialty, [field]: value };
//       }
//       return specialty;
//     });
//     setSpecialties(updatedSpecialties);
//   };

//   const handleAddSpecialty = () => {
//     setSpecialties([...specialties, { name: '', description: '', icon: '' }]);
//   };

//   const handleRemoveSpecialty = (index) => {
//     setSpecialtyToDelete(index);
//     setIsModalOpen(true);
//   };

//   const confirmRemoveSpecialty = () => {
//     const updatedSpecialties = specialties.filter((_, i) => i !== specialtyToDelete);
//     setSpecialties(updatedSpecialties);
//     setIsModalOpen(false);
//     toast.success('Especialidade removida com sucesso!');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading('Atualizando especialidades...');
//     try {
//       const result = await updateSpecialtiesData(specialties);
//       if (result.success) {
//         toast.success('Especialidades atualizadas com sucesso!', { id: toastId });
//       } else {
//         toast.error('Erro ao atualizar especialidades', { id: toastId });
//       }
//     } catch (error) {
//       toast.error('Erro ao atualizar especialidades: ' + error.message, { id: toastId });
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gerenciar Especialidades</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {specialties.map((specialty, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-medium text-gray-900">Especialidade {index + 1}</h3>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveSpecialty(index)}
//                     className="text-red-600 hover:text-red-800 transition-colors"
//                     aria-label={`Remover especialidade ${index + 1}`}
//                   >
//                     <Trash2 className="h-5 w-5" />
//                   </button>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor={`specialty-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                       Nome
//                     </label>
//                     <input
//                       type="text"
//                       id={`specialty-name-${index}`}
//                       value={specialty.name}
//                       onChange={(e) => handleInputChange(index, 'name', e.target.value)}
//                       className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 transition-colors"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor={`specialty-description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                       Descrição
//                     </label>
//                     <textarea
//                       id={`specialty-description-${index}`}
//                       value={specialty.description}
//                       onChange={(e) => handleInputChange(index, 'description', e.target.value)}
//                       rows={3}
//                       className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 transition-colors"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor={`specialty-icon-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                       Ícone
//                     </label>
//                     <div className="flex items-center space-x-2">
//                       <input
//                         type="text"
//                         id={`specialty-icon-${index}`}
//                         value={specialty.icon}
//                         onChange={(e) => handleInputChange(index, 'icon', e.target.value)}
//                         className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 transition-colors"
//                         placeholder="Nome do ícone (ex: FaLeaf)"
//                         required
//                       />
//                       <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md">
//                         <IconPreview iconName={specialty.icon} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button
//             type="button"
//             onClick={handleAddSpecialty}
//             className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
//           >
//             <Plus className="h-5 w-5 mr-2" />
//             Adicionar Especialidade
//           </button>
//           <div className="flex justify-end pt-6">
//             <button
//               type="submit"
//               className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-colors"
//             >
//               <Save className="h-5 w-5 mr-2" />
//               Salvar Alterações
//             </button>
//           </div>
//         </form>
//       </div>
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={confirmRemoveSpecialty}
//         message="Tem certeza que deseja remover esta especialidade?"
//       />
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useSiteData } from '../Context/SiteContext';
import { Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import * as Icons from 'react-icons/fa';

const IconPreview = ({ iconName }) => {
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent className="text-3xl" /> : null;
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">{message}</h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export function AdminSpecialties() {
  const { siteData, updateSpecialtiesData } = useSiteData();
  const [specialties, setSpecialties] = useState(siteData.specialties || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specialtyToDelete, setSpecialtyToDelete] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setSpecialties(siteData.specialties || []);
  }, [siteData.specialties]);

  const handleInputChange = (index, field, value) => {
    const updatedSpecialties = specialties.map((specialty, i) => {
      if (i === index) {
        return { ...specialty, [field]: value };
      }
      return specialty;
    });
    setSpecialties(updatedSpecialties);
  };

  const handleAddSpecialty = () => {
    setSpecialties([...specialties, { name: '', description: '', icon: '' }]);
  };

  const handleRemoveSpecialty = (index) => {
    setSpecialtyToDelete(index);
    setIsModalOpen(true);
  };

  const confirmRemoveSpecialty = () => {
    const updatedSpecialties = specialties.filter((_, i) => i !== specialtyToDelete);
    setSpecialties(updatedSpecialties);
    setIsModalOpen(false);
    toast.success('Especialidade removida com sucesso!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Atualizando especialidades...');
    try {
      const result = await updateSpecialtiesData(specialties);
      if (result.success) {
        toast.success('Especialidades atualizadas com sucesso!', { id: toastId });
      } else {
        toast.error('Erro ao atualizar especialidades', { id: toastId });
      }
    } catch (error) {
      toast.error('Erro ao atualizar especialidades: ' + error.message, { id: toastId });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gerenciar Especialidades</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialties.map((specialty, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Especialidade {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecialty(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor={`specialty-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      id={`specialty-name-${index}`}
                      value={specialty.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`specialty-description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      id={`specialty-description-${index}`}
                      value={specialty.description}
                      onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                      rows={3}
                      className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`specialty-icon-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Ícone
                    </label>
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center justify-center w-12 h-12 border-2 border-dashed rounded-lg transition-colors ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
                        onDragEnter={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragActive(true);
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragActive(false);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragActive(true);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragActive(false);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            const file = e.dataTransfer.files[0];
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              handleInputChange(index, 'icon', event.target?.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      >
                        {specialty.icon ? (
                          <img src={specialty.icon} alt="Ícone" className="w-6 h-6 object-contain" />
                        ) : (
                          <Plus className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <input
                        type="file"
                        id={`specialty-icon-${index}`}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              handleInputChange(index, 'icon', event.target?.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <label
                        htmlFor={`specialty-icon-${index}`}
                        className="flex-1 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                      >
                        {specialty.icon ? 'Trocar ícone' : 'Escolher ícone'}
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Arraste uma imagem ou clique para selecionar</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddSpecialty}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Adicionar Especialidade
          </button>
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
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmRemoveSpecialty}
        message="Tem certeza que deseja remover esta especialidade?"
      />
    </div>
  );
}

