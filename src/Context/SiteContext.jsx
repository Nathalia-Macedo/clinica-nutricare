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
    slides: [],
    about: {}
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  async function fetchSiteData() {
    try {
      setIsLoaded(false);
      const [headerResponse, slidesResponse, aboutResponse] = await Promise.all([
        fetch('https://api-nutricare-1.onrender.com/api/header'),
        fetch('https://api-nutricare-1.onrender.com/api/slides'),
        fetch('https://api-nutricare-1.onrender.com/api/about')
      ]);

      if (!headerResponse.ok || !slidesResponse.ok || !aboutResponse.ok) {
        throw new Error('Falha ao carregar dados do site');
      }

      const [headerData, slidesData, aboutData] = await Promise.all([
        headerResponse.json(),
        slidesResponse.json(),
        aboutResponse.json()
      ]);

      setSiteData({
        header: headerData,
        slides: slidesData,
        about: aboutData
      });

      const token = localStorage.getItem('nutricare_token') || sessionStorage.getItem('nutricare_token');
      if (token) {
        setUser({ authToken: token });
      }
    } catch (err) {
      console.error('Erro ao buscar dados do site:', err);
      setError(err.message);
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    fetchSiteData();
    const token = localStorage.getItem('nutricare_token') || sessionStorage.getItem('nutricare_token');
    if (token) {
      setUser({ authToken: token });
    }
  }, []);

  async function updateHeaderData(newHeaderData) {
    try {
      setIsLoaded(false);
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
      setIsLoaded(true);
    }
  }

  async function createSlide(slideData) {
    try {
      setIsLoaded(false);
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
      setIsLoaded(true);
    }
  }

  async function editSlide(id, slideData) {
    try {
      setIsLoaded(false);
      const response = await fetch(`https://api-nutricare-1.onrender.com/api/slides/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slideData),
      });

      if (!response.ok) {
        throw new Error('Falha ao editar o slide');
      }

      const updatedSlide = await response.json();
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
      setIsLoaded(true);
    }
  }

  async function deleteSlide(id) {
    try {
      setIsLoaded(false);
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
      setIsLoaded(true);
    }
  }

  async function login(username, password, rememberMe) {
    try {
      setIsLoaded(false);
      const response = await fetch('https://api-nutricare-1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Falha ao fazer login');
      }

      const data = await response.json();
      const authToken = data.token;
      setUser({ authToken });

     
      localStorage.setItem('nutricare_token', authToken);
     

      return { success: true, authToken };
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoaded(true);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('nutricare_token');
    sessionStorage.removeItem('nutricare_token');
  }

  async function updateAboutData(newAboutData) {
    try {
      setIsLoaded(false);
      const token = localStorage.getItem('nutricare_token') || sessionStorage.getItem('nutricare_token');
      console.log(token)
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }
      const response = await fetch('https://api-nutricare-1.onrender.com/api/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAboutData),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar dados da seção Sobre');
      }

      const updatedAboutData = await response.json();
      setSiteData(prevData => ({
        ...prevData,
        about: updatedAboutData,
      }));

      return { success: true, message: 'Seção Sobre atualizada com sucesso!' };
    } catch (err) {
      console.error('Erro ao atualizar dados da seção Sobre:', err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoaded(true);
    }
  }

  const value = {
    siteData,
    isLoaded,
    error,
    user,
    updateHeaderData,
    createSlide,
    editSlide,
    deleteSlide,
    refetchSiteData: fetchSiteData,
    login,
    logout,
    updateAboutData,
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
  const { isLoaded } = useSiteData();
  return !isLoaded;
}

export function useSiteError() {
  const { error } = useSiteData();
  return error;
}

export function useAuth() {
  const { user, login, logout } = useSiteData();
  return { user, login, logout };
}

export function useAboutData() {
  const { siteData } = useSiteData();
  return siteData.about;
}



