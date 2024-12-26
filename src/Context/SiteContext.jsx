// import React, { createContext, useContext, useState, useEffect } from 'react';

// const SiteContext = createContext();

// export function SiteProvider({ children }) {
//   const [siteData, setSiteData] = useState({
//     header: {
//       logo: '',
//       contacts: [{
//         phone: '',
//         whatsapp: '',
//         email: '',
//         social: []
//       }]
//     },
//     slides: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchSiteData();
//   }, []);

//   async function fetchSiteData() {
//     try {
//       setLoading(true);
//       const [headerResponse, slidesResponse] = await Promise.all([
//         fetch('https://api-nutricare-1.onrender.com/api/header'),
//         fetch('https://api-nutricare-1.onrender.com/api/slides')
//       ]);

//       if (!headerResponse.ok) {
//         throw new Error('Falha ao carregar dados do header');
//       }
//       if (!slidesResponse.ok) {
//         throw new Error('Falha ao carregar dados dos slides');
//       }

//       const [headerData, slidesData] = await Promise.all([
//         headerResponse.json(),
//         slidesResponse.json()
//       ]);

//       setSiteData(prevData => ({
//         ...prevData,
//         header: headerData,
//         slides: slidesData
//       }));
//     } catch (err) {
//       console.error('Erro ao buscar dados do site:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function updateHeaderData(newHeaderData) {
//     try {
//       setLoading(true);
//       const response = await fetch('https://api-nutricare-1.onrender.com/api/header', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           logo: newHeaderData.logo,
//           contacts: [{
//             phone: newHeaderData.contacts[0].phone,
//             whatsapp: newHeaderData.contacts[0].whatsapp,
//             email: newHeaderData.contacts[0].email,
//             social: newHeaderData.contacts[0].social
//           }]
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Falha ao atualizar dados do header');
//       }

//       const updatedHeaderData = await response.json();
//       setSiteData(prevData => ({
//         ...prevData,
//         header: updatedHeaderData,
//       }));

//       return { success: true, message: 'Header atualizado com sucesso!' };
//     } catch (err) {
//       console.error('Erro ao atualizar dados do header:', err);
//       setError(err.message);
//       return { success: false, message: err.message };
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function createSlide(slideData) {
//     try {
//       setLoading(true);
//       const response = await fetch('https://api-nutricare-1.onrender.com/api/slides', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(slideData),
//       });

//       if (!response.ok) {
//         throw new Error('Falha ao criar novo slide');
//       }

//       const newSlide = await response.json();
//       setSiteData(prevData => ({
//         ...prevData,
//         slides: [...prevData.slides, newSlide],
//       }));

//       return { success: true, message: 'Slide criado com sucesso!' };
//     } catch (err) {
//       console.error('Erro ao criar slide:', err);
//       setError(err.message);
//       return { success: false, message: err.message };
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function editSlide(id, slideData) {
//     try {
//       setLoading(true);
//       const response = await fetch(`https://api-nutricare-1.onrender.com/api/slides/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(slideData),
//       });

//       if (!response.ok) {
//         throw new Error('Falha ao editar o slide');
//       }

//       const updatedSlide = await response.json();
//       setSiteData(prevData => ({
//         ...prevData,
//         slides: prevData.slides.map(slide => 
//           slide._id === id ? updatedSlide : slide
//         ),
//       }));

//       return { success: true, message: 'Slide atualizado com sucesso!' };
//     } catch (err) {
//       console.error('Erro ao editar slide:', err);
//       setError(err.message);
//       return { success: false, message: err.message };
//     } finally {
//       setLoading(false);
//     }
//   }

//   const value = {
//     siteData,
//     loading,
//     error,
//     updateHeaderData,
//     createSlide,
//     editSlide,
//     refetchSiteData: fetchSiteData,
//   };

//   return (
//     <SiteContext.Provider value={value}>
//       {children}
//     </SiteContext.Provider>
//   );
// }

// export function useSiteData() {
//   const context = useContext(SiteContext);
//   if (!context) {
//     throw new Error('useSiteData deve ser usado dentro de um SiteProvider');
//   }
//   return context;
// }

// export function useHeaderData() {
//   const { siteData } = useSiteData();
//   return siteData.header;
// }

// export function useSlidesData() {
//   const { siteData } = useSiteData();
//   return siteData.slides;
// }

// export function useSiteLoading() {
//   const { loading } = useSiteData();
//   return loading;
// }

// export function useSiteError() {
//   const { error } = useSiteData();
//   return error;
// }

import React, { createContext, useContext, useState, useEffect } from 'react';

const SiteContext = createContext();

export function SiteProvider({ children }) {
  const [siteData, setSiteData] = useState({
    header: {
      logo: '',
      contacts: [{
        phone: '',
        whatsapp: '',
        email: '',
        social: []
      }]
    },
    slides: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSiteData();
  }, []);

  async function fetchSiteData() {
    try {
      setLoading(true);
      const [headerResponse, slidesResponse] = await Promise.all([
        fetch('https://api-nutricare-1.onrender.com/api/header'),
        fetch('https://api-nutricare-1.onrender.com/api/slides')
      ]);

      if (!headerResponse.ok) {
        throw new Error('Falha ao carregar dados do header');
      }
      if (!slidesResponse.ok) {
        throw new Error('Falha ao carregar dados dos slides');
      }

      const [headerData, slidesData] = await Promise.all([
        headerResponse.json(),
        slidesResponse.json()
      ]);

      setSiteData(prevData => ({
        ...prevData,
        header: headerData,
        slides: slidesData
      }));
    } catch (err) {
      console.error('Erro ao buscar dados do site:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateHeaderData(newHeaderData) {
    try {
      setLoading(true);
      const response = await fetch('https://api-nutricare-1.onrender.com/api/header', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logo: newHeaderData.logo,
          contacts: [{
            phone: newHeaderData.contacts[0].phone,
            whatsapp: newHeaderData.contacts[0].whatsapp,
            email: newHeaderData.contacts[0].email,
            social: newHeaderData.contacts[0].social
          }]
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar dados do header');
      }

      const updatedHeaderData = await response.json();
      setSiteData(prevData => ({
        ...prevData,
        header: updatedHeaderData,
      }));

      return { success: true, message: 'Header atualizado com sucesso!' };
    } catch (err) {
      console.error('Erro ao atualizar dados do header:', err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }

  async function createSlide(slideData) {
    try {
      setLoading(true);
      const response = await fetch('https://api-nutricare-1.onrender.com/api/slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slideData),
      });

      if (!response.ok) {
        throw new Error('Falha ao criar novo slide');
      }

      const newSlide = await response.json();
      setSiteData(prevData => ({
        ...prevData,
        slides: [...prevData.slides, newSlide],
      }));

      return { success: true, message: 'Slide criado com sucesso!' };
    } catch (err) {
      console.error('Erro ao criar slide:', err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }

  async function editSlide(id, slideData) {
    try {
      setLoading(true);
      const response = await fetch(`https://api-nutricare-1.onrender.com/api/slides/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slideData),
      });
      console.log(slideData)
      if (!response.ok) {
        throw new Error('Falha ao editar o slide');
      }

      const updatedSlide = await response.json();
      console.log(updatedSlide)
      setSiteData(prevData => ({
        ...prevData,
        slides: prevData.slides.map(slide => 
          slide._id === id ? updatedSlide : slide
        ),
      }));

      return { success: true, message: 'Slide atualizado com sucesso!' };
    } catch (err) {
      console.error('Erro ao editar slide:', err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }

  async function deleteSlide(id) {
    try {
      setLoading(true);
      const response = await fetch(`https://api-nutricare-1.onrender.com/api/slides/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir o slide');
      }

      setSiteData(prevData => ({
        ...prevData,
        slides: prevData.slides.filter(slide => slide._id !== id),
      }));

      return { success: true, message: 'Slide excluído com sucesso!' };
    } catch (err) {
      console.error('Erro ao excluir slide:', err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }

  const value = {
    siteData,
    loading,
    error,
    updateHeaderData,
    createSlide,
    editSlide,
    deleteSlide,
    refetchSiteData: fetchSiteData,
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteData deve ser usado dentro de um SiteProvider');
  }
  return context;
}

export function useHeaderData() {
  const { siteData } = useSiteData();
  return siteData.header;
}

export function useSlidesData() {
  const { siteData } = useSiteData();
  return siteData.slides;
}

export function useSiteLoading() {
  const { loading } = useSiteData();
  return loading;
}

export function useSiteError() {
  const { error } = useSiteData();
  return error;
}

