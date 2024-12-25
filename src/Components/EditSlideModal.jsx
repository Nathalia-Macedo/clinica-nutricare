import React, { useState, useCallback } from 'react';
import { X, ImageIcon } from 'lucide-react';
import { useSiteData } from '../Context/SiteContext';
import { toast } from 'react-hot-toast';

const positionLabels = {
  left: 'Esquerda',
  right: 'Direita'
};

export function EditSlideModal({ slide, onClose }) {
  const { editSlide } = useSiteData();
  const [formData, setFormData] = useState(slide);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Salvando alterações...');
    try {
      const result = await editSlide(slide._id, formData);
      if (result.success) {
        toast.success('Slide atualizado com sucesso!', { id: toastId });
        onClose();
      } else {
        toast.error(result.message || 'Erro ao atualizar slide', { id: toastId });
      }
    } catch (error) {
      toast.error('Erro ao atualizar slide: ' + error.message, { id: toastId });
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md flex flex-col max-h-[85vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Editar Slide</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Imagem</label>
              <div
                className={`
                  mt-1 flex justify-center px-4 pt-3 pb-4 border-2 border-gray-300 border-dashed rounded-lg
                  transition-colors ${dragActive ? 'border-green-500 bg-green-50' : 'hover:border-gray-400'}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="mx-auto h-24 w-auto object-contain mb-2" />
                  ) : (
                    <ImageIcon className="mx-auto h-10 w-10 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-green-600 hover:text-green-500"
                    >
                      <span>Carregar um arquivo</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => handleFiles(e.target.files)} accept="image/*" />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700">Texto do Botão</label>
              <input
                type="text"
                id="buttonText"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700">Link do Botão</label>
              <input
                type="text"
                id="buttonLink"
                name="buttonLink"
                value={formData.buttonLink}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Posição do Conteúdo</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(positionLabels).map(([value, label]) => (
                  <label key={value} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="position"
                      value={value}
                      checked={formData.position === value}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-green-600"
                    />
                    <span className="ml-2">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
