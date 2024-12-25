import React, { useState } from 'react';
import { useSiteData, useSlidesData, useSiteLoading, useSiteError } from '../Context/SiteContext';
import { EditSlideModal } from './EditSlideModal';
import { ConfirmationModal } from './ConfirmationModal';
import { Trash2, Edit2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SlidePreview = ({ slide, onEdit, onDelete }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img 
      src={slide.image || 'https://via.placeholder.com/300x200'} 
      alt={slide.title} 
      className="w-full h-40 object-cover"
    />
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2 truncate">{slide.title}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{slide.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Posição: {slide.position}</span>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(slide)} 
            className="text-blue-500 hover:text-blue-700"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => onDelete(slide)} 
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export function SlidesList() {
  const { deleteSlide } = useSiteData();
  const slides = useSlidesData();
  const loading = useSiteLoading();
  const error = useSiteError();
  const [editingSlide, setEditingSlide] = useState(null);
  const [deletingSlide, setDeletingSlide] = useState(null);

  const handleDelete = async () => {
    if (deletingSlide) {
      const result = await deleteSlide(deletingSlide._id);
      if (result.success) {
        toast.success('Slide excluído com sucesso!');
      } else {
        toast.error('Erro ao excluir slide: ' + result.message);
      }
      setDeletingSlide(null);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Carregando slides...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Erro ao carregar slides: {error}</div>;
  }

  if (!slides || slides.length === 0) {
    return <div className="text-center py-4">Nenhum slide encontrado.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((slide) => (
          <SlidePreview 
            key={slide._id} 
            slide={slide} 
            onEdit={setEditingSlide} 
            onDelete={setDeletingSlide}
          />
        ))}
      </div>
      {editingSlide && (
        <EditSlideModal
          slide={editingSlide}
          onClose={() => setEditingSlide(null)}
        />
      )}
      <ConfirmationModal
        isOpen={!!deletingSlide}
        onClose={() => setDeletingSlide(null)}
        onConfirm={handleDelete}
        message="Tem certeza que deseja excluir este slide?"
      />
    </div>
  );
}

