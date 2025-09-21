import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const ClientLogoCarousel = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const clients = [
    { name: 'Calvin Klein', displayName: 'Calvin Klein', logoPath: '/images/clients/calvin-klein.png' },
    { name: 'Saks Fifth Avenue', displayName: 'Saks Fifth Avenue', logoPath: '/images/clients/saks.png' },
    { name: 'Tommy Hilfiger', displayName: 'Tommy Hilfiger', logoPath: '/images/clients/tommy-hilfiger.png' },
    { name: 'FairPrice', displayName: 'FairPrice', logoPath: '/images/clients/fairprice.png' },
    { name: 'FedEx', displayName: 'FedEx', logoPath: '/images/clients/fedex.svg' },
    { name: 'Zyter TruCare', displayName: 'Zyter TruCare', logoPath: '/images/clients/zyter-trucare.png' },
    { name: 'Tata Digital', displayName: 'Tata Digital', logoPath: '/images/clients/tata-digital.png' },
    { name: 'Sundaram Finance', displayName: 'Sundaram Finance', logoPath: '/images/clients/sf-logo.png' }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contributed to <span className="gradient-text">Digital Transformation</span> At
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Through collaborative efforts with my team, I've helped deliver innovative solutions for leading global brands
          </p>
        </div>

        <Marquee
          speed={50}
          pauseOnHover={true}
          pauseOnClick={true}
          gradient={true}
          gradientColor={isDarkMode ? [17, 24, 39] : [249, 250, 251]} // Dark mode: gray-900, Light: gray-50
          gradientWidth={80}
          className="py-4"
        >
          {clients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="mx-8"
            >
              <div className="flex items-center justify-center h-20 w-48 relative group cursor-pointer transform transition-all duration-300 hover:scale-110">
                <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-light/0 to-secondary-light/0 group-hover:from-primary-light/10 group-hover:to-secondary-light/10 dark:group-hover:from-primary-dark/10 dark:group-hover:to-secondary-dark/10 rounded-lg transition-all duration-300" />
                <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
                  {client.logoPath ? (
                    <img
                      src={client.logoPath}
                      alt={`${client.name} logo`}
                      className="max-h-12 max-w-full object-contain transition-all duration-500 transform group-hover:scale-110"
                      style={{
                        filter: 'grayscale(100%) contrast(0.8)',
                        transition: 'filter 0.5s ease-in-out',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.filter = 'grayscale(0%) contrast(1.1) saturate(1.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.filter = 'grayscale(100%) contrast(0.8)';
                      }}
                    />
                  ) : (
                    <span className="text-lg font-bold text-gray-500 dark:text-gray-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-light group-hover:to-secondary-light dark:group-hover:from-primary-dark dark:group-hover:to-secondary-dark transition-all duration-300 transform group-hover:scale-110 whitespace-nowrap">
                      {client.displayName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {clients.map((client, index) => (
            <div
              key={`${client.name}-duplicate-${index}`}
              className="mx-8"
            >
              <div className="flex items-center justify-center h-20 w-48 relative group cursor-pointer transform transition-all duration-300 hover:scale-110">
                <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-light/0 to-secondary-light/0 group-hover:from-primary-light/10 group-hover:to-secondary-light/10 dark:group-hover:from-primary-dark/10 dark:group-hover:to-secondary-dark/10 rounded-lg transition-all duration-300" />
                <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
                  {client.logoPath ? (
                    <img
                      src={client.logoPath}
                      alt={`${client.name} logo`}
                      className="max-h-12 max-w-full object-contain transition-all duration-500 transform group-hover:scale-110"
                      style={{
                        filter: 'grayscale(100%) contrast(0.8)',
                        transition: 'filter 0.5s ease-in-out',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.filter = 'grayscale(0%) contrast(1.1) saturate(1.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.filter = 'grayscale(100%) contrast(0.8)';
                      }}
                    />
                  ) : (
                    <span className="text-lg font-bold text-gray-500 dark:text-gray-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-light group-hover:to-secondary-light dark:group-hover:from-primary-dark dark:group-hover:to-secondary-dark transition-all duration-300 transform group-hover:scale-110 whitespace-nowrap">
                      {client.displayName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Marquee>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500 italic">
            * Solutions delivered through team collaboration at Mad Street Den and previous organizations
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientLogoCarousel;