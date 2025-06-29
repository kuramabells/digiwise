import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export const Footer = () => {
  return <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DigiWise</h3>
            <p className="text-gray-300">
              Helping you build a healthier relationship with technology
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Our Methodology
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Take Assessment
                </a>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-300 hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>
            © 2025 DigiWise. All rights reserved. Powered by{' '}
            <a href="https://www.techpro360solutions.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              TechPro360 Solutions
            </a>
            .
          </p>
        </div>
      </div>
    </footer>;
};