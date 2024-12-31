import React, { useState, useCallback } from 'react';
import { Phone, Mail, ImageIcon, Trash2, Plus, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

const HeaderForm = ({ headerData, updateHeaderData }) => {
  const [formData, setFormData] = useState(headerData);
  const [dragActive, setDragActive] = useState(false);

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

  return (
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
  );
};

export default HeaderForm;

