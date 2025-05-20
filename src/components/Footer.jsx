import { NavLink } from "react-router";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaCopyright,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebook, url: "#" },
    { icon: FaInstagram, url: "#" },
    { icon: FaXTwitter, url: "#" },
    { icon: FaLinkedin, url: "#" },
  ];

  const quickLinks = [
    { name: "Librería", url: "/library" },
    { name: "Crear Personaje", url: "/create-character" },
    { name: "Planes", url: "/plans" },
  ];

  const legalLinks = [
    { name: "Términos de Servicio", url: "#" },
    { name: "Política de Privacidad", url: "#" },
  ];

  return (
    <footer className="bg-background border-t border-violet/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl roboto-600 bg-linear-65  from-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
              PersonifAI
            </h3>
            <p className="text-gray-400 mb-4">
              Crea, personaliza y conversa con personajes impulsados por IA.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-gray-400 hover:text-violet-light transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Navegación Rápida
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.url}
                    className="text-gray-400 hover:text-violet-light transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.url}
                    className="text-gray-400 hover:text-violet-light transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-violet/10 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            <FaCopyright className="w-4 h-4" /> {currentYear} PersonifAI. Todos
            los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
