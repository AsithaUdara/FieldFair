import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🌾</span>
              </div>
              <div>
                <h3 className="text-xl font-black">FieldFair</h3>
                <p className="text-emerald-400 text-xs font-medium">Farm to Table</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Connecting farmers and consumers through transparency, technology, and trust.
            </p>
          </div>

          {[
            {
              title: "Quick Links",
              links: ["About Us", "Features", "Pricing", "Contact"]
            },
            {
              title: "For Farmers", 
              links: ["Farmer Dashboard", "Sell Products", "AI Insights", "Support"]
            },
            {
              title: "For Consumers",
              links: ["Marketplace", "Find Farms", "QR Scanner", "Reviews"]
            }
          ].map((section, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4">{section.title}</h4>
              <ul className="space-y-3 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FieldFair by Team Bad Batch. Built for IDEALIZE 2025 Competition.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;