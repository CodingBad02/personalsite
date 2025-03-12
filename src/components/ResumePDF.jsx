import React, { useState } from 'react';
import { FiDownload, FiEye, FiExternalLink } from 'react-icons/fi';

const ResumePDF = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const resumePath = '/Manjunathan_Resume.pdf';
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 gradient-text">My Resume</h2>
      
      <div className="flex flex-col">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Want to know more about my professional experience and skills? Feel free to view or download my resume.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
          >
            <FiEye className="h-5 w-5" />
            View Resume
          </button>
          
          <a
            href={resumePath}
            download="Manjunathan_Radhakrishnan_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark rounded-lg hover:bg-primary-light hover:dark:bg-primary-dark hover:text-white hover:dark:text-white transition-colors"
          >
            <FiDownload className="h-5 w-5" />
            Download PDF
          </a>
          
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-700 transition-colors"
          >
            <FiExternalLink className="h-5 w-5" />
            Open in New Tab
          </a>
        </div>
      </div>
      
      {/* PDF Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-lg shadow-2xl">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300"
            >
              Close
            </button>
            
            {/* Using object tag instead of iframe for better PDF compatibility */}
            <object
              data={resumePath}
              type="application/pdf"
              className="w-full h-full rounded-lg"
            >
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Unable to display PDF directly in the browser.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href={resumePath}
                    download="Manjunathan_Radhakrishnan_Resume.pdf"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
                  >
                    <FiDownload className="h-5 w-5" />
                    Download PDF
                  </a>
                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark rounded-lg hover:bg-primary-light hover:dark:bg-primary-dark hover:text-white hover:dark:text-white transition-colors"
                  >
                    <FiExternalLink className="h-5 w-5" />
                    Open in New Tab
                  </a>
                </div>
              </div>
            </object>
            
            {/* Fallback options at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-800 p-3 text-center text-sm text-gray-600 dark:text-gray-400 border-t">
              Having trouble viewing? Try to <a href={resumePath} download="Manjunathan_Radhakrishnan_Resume.pdf" className="text-primary-light dark:text-primary-dark underline">download</a> or <a href={resumePath} target="_blank" rel="noopener noreferrer" className="text-primary-light dark:text-primary-dark underline">open in new tab</a>.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePDF; 