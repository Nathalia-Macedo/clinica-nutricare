import React, { useState, useCallback } from 'react';
import { ImageIcon, Plus, ArrowUp, ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SlideForm = ({ createSlide }) => {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    position: 'left'
  });
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Criando slide...');
    try {
      const result = await createSlide(formData);
      if (result.success) {
        toast.success('Slide criado com sucesso!', { id: toastId });
        setFormData({
          image: '',
          title: '',
          description: '',
          buttonText: '',
          buttonLink: '',
          position: 'left'
        });
        setPreview(null);
      } else {
        toast.error('Erro ao criar slide', { id: toastId });
      }
    } catch (error) {
      toast.error('Erro ao criar slide: ' + error.message, { id: toastId });
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
        setPreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Adicionar Novo Slide</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem do Slide
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
                {preview ? (
                  <img src={preview} alt="Pré-visualização" className="mx-auto h-32 w-auto object-contain mb-4 rounded-lg" />
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
                value={formData.title}
                onChange={handleInputChange}
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
                value={formData.description}
                onChange={handleInputChange}
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
                value={formData.buttonText}
                onChange={handleInputChange}
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
                value={formData.buttonLink}
                onChange={handleInputChange}
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
                  checked={formData.position === 'top'}
                  onChange={handleInputChange}
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
                  checked={formData.position === 'right'}
                  onChange={handleInputChange}
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
                  checked={formData.position === 'bottom'}
                  onChange={handleInputChange}
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
                  checked={formData.position === 'left'}
                  onChange={handleInputChange}
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
  );
};

export default SlideForm;

