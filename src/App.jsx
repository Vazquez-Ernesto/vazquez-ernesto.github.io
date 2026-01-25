import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import "./styles/App.css";

// Context providers
import { AuthProvider } from './context/AuthContext';

// Importa tus páginas
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BlogEditor from './pages/BlogEditor';
import Projects from './pages/Projects';
import Games from './pages/Games';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CourseSyllabus from './pages/CourseSyllabus';
import Dashboard from './pages/Dashboard';
import SeedCoursesButton from './components/SeedCoursesButton';

// Componentes de autenticación
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Sistema de stream HTTP - Estrellas Fugaces
    let httpAnimationId = null;
    let isHttpStreaming = true;
    const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
    const httpStatuses = ['200', '201', '204', '400', '401', '403', '404', '500', '502', '503'];

    const createHttpRequest = () => {
      if (!isHttpStreaming) return;
    
      const httpStream = document.getElementById('http-stream');
      if (!httpStream) return;
    
      const request = document.createElement('div');
      request.className = 'http-request';
      
      // Método HTTP aleatorio
      const method = httpMethods[Math.floor(Math.random() * httpMethods.length)];
      // Status aleatorio
      const status = httpStatuses[Math.floor(Math.random() * httpStatuses.length)];
      
      request.textContent = status;
      
      // Posición inicial VARIADA (no solo desde la izquierda)
      const startPositions = [
        { left: '-50px', top: Math.random() * 50 + '%' }, // Desde izquierda
        { right: '-50px', top: Math.random() * 50 + '%' }, // Desde derecha
        { top: '-30px', left: Math.random() * 80 + 10 + '%' }, // Desde arriba
        { bottom: '-30px', left: Math.random() * 80 + 10 + '%' } // Desde abajo
      ];
      
      const startPos = startPositions[Math.floor(Math.random() * startPositions.length)];
      Object.assign(request.style, startPos);
      
      // Trayectoria aleatoria
      const trajectory = Math.floor(Math.random() * 4); // 0, 1, 2, 3
      request.style.setProperty('--trajectory', trajectory);
      
      // Ángulo de rotación aleatorio más amplio
      const rotationAngle = -45 + Math.random() * 90; // -45° a +45°
      request.style.setProperty('--rotation', rotationAngle + 'deg');
      
      // Duración de animación más variada (2-8 segundos)
      const duration = 2 + Math.random() * 6;
      request.style.animationDuration = duration + 's';
      
      // Delay inicial aleatorio (0.2-2 segundos)
      request.style.animationDelay = (0.2 + Math.random() * 1.8) + 's';
      
      httpStream.appendChild(request);
      
      // Remover después de la animación
      setTimeout(() => {
        if (request.parentNode) {
          request.parentNode.removeChild(request);
        }
      }, (duration + 2) * 1000);
    };

    const startHttpStream = () => {
      if (!isHttpStreaming) return;
      
      // Crear nueva estrella fugaz cada 1-3 segundos
      const interval = 1000 + Math.random() * 2000;
      setTimeout(() => {
        createHttpRequest();
        startHttpStream();
      }, interval);
    };

    // Iniciar stream HTTP
    startHttpStream();

    // Cleanup
    return () => {
      isHttpStreaming = false;
      
      // Limpiar stream HTTP
      const httpStream = document.getElementById('http-stream');
      if (httpStream) {
        httpStream.innerHTML = '';
      }
    };
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div ref={containerRef} className="app">
            {/* Nueva capa de plasma - Movimiento orgánico tipo lava */}
            <div className="plasma-background"></div>
            
            {/* Stream de peticiones HTTP en el fondo */}
            <div className="http-stream" id="http-stream"></div>
            
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/blog-editor" element={<BlogEditor />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/games" element={<Games />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/course-syllabus/:courseId" element={<CourseSyllabus />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                
                
                {/* Rutas de autenticación */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;