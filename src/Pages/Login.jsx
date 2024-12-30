// import React, { useState } from 'react';
// import { useAuth } from '../Context/SiteContext';
// import { useNavigate } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';

// const nutriCareGreen = 'rgb(140, 198, 63)';
// const nutriCareGreenDark = 'rgb(120, 178, 43)';

// export function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const result = await login(username, password, rememberMe);
//       if (result.success) {
//         navigate('/admin');
//       } else {
//         setError('Falha no login. Por favor, verifique suas credenciais.');
//       }
//     } catch (err) {
//       setError('Ocorreu um erro. Por favor, tente novamente.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8" 
//          style={{ 
//            fontFamily: 'Sora, sans-serif',
//            backgroundImage: `url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
//          }}>
//       <div className="max-w-md w-full space-y-8">
//         <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-10">
//           <div className="text-center">
//             <h2 className="mt-6 text-3xl font-extrabold" style={{ color: nutriCareGreen }}>
//               Nutricare
//             </h2>
//             <p className="mt-2 text-sm text-gray-200">
//               Entre na sua conta
//             </p>
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div className="rounded-md shadow-sm space-y-4">
//               <div>
//                 <label htmlFor="username" className="sr-only">
//                   Nome de usuário
//                 </label>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   required
//                   className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
//                   style={{ 
//                     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                     focusRing: `2px solid ${nutriCareGreen}`,
//                     focusBorderColor: nutriCareGreen
//                   }}
//                   placeholder="Nome de usuário"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//               <div className="relative">
//                 <label htmlFor="password" className="sr-only">
//                   Senha
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
//                   style={{ 
//                     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                     focusRing: `2px solid ${nutriCareGreen}`,
//                     focusBorderColor: nutriCareGreen
//                   }}
//                   placeholder="Senha"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 rounded border-gray-300 focus:ring-2"
//                   style={{ 
//                     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                     color: nutriCareGreen,
//                     focusRing: nutriCareGreen
//                   }}
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
//                   Lembrar-me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <a href="#" className="font-medium hover:underline text-white">
//                   Esqueceu sua senha?
//                 </a>
//               </div>
//             </div>

//             {error && (
//               <div className="text-red-300 text-sm mt-2 bg-red-500 bg-opacity-25 p-2 rounded">
//                 {error}
//               </div>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
//                 style={{ 
//                   backgroundColor: nutriCareGreen,
//                   focusRing: nutriCareGreen
//                 }}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                     <svg className="h-5 w-5 animate-spin" style={{ color: nutriCareGreenDark }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                   </span>
//                 ) : null}
//                 {isLoading ? 'Carregando' : 'Entrar'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useAuth } from '../Context/SiteContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const nutriCareGreen = 'rgb(140, 198, 63)';
const nutriCareGreenDark = 'rgb(120, 178, 43)';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(username, password, rememberMe);
      if (result.success) {
        navigate('/admin');
      } else {
        setError('Falha no login. Por favor, verifique suas credenciais.');
      }
    } catch (err) {
      setError('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8" 
         style={{ 
           fontFamily: 'Sora, sans-serif',
           backgroundImage: `url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
         }}>
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold" style={{ color: "white" }}>
              Nutricare
            </h2>
            <p className="mt-2 text-sm text-gray-200">
              Entre na sua conta
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Nome de usuário
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    focusRing: `2px solid ${nutriCareGreen}`,
                    focusBorderColor: nutriCareGreen
                  }}
                  placeholder="Nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    focusRing: `2px solid ${nutriCareGreen}`,
                    focusBorderColor: nutriCareGreen
                  }}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    color: nutriCareGreen,
                    focusRing: nutriCareGreen
                  }}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium hover:underline text-white">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            {error && (
              <div className="text-red-300 text-sm mt-2 bg-red-500 bg-opacity-25 p-2 rounded">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
                style={{ 
                  backgroundColor: nutriCareGreen,
                  focusRing: nutriCareGreen
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 animate-spin" style={{ color: nutriCareGreenDark }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                ) : null}
                {isLoading ? 'Carregando' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

