import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
export const DoraMethodologySection = () => {
  const validationPoints = ['Developed by Digital Detox (global leader in digital wellness)', 'Input from mental health professionals and subject-matter experts', 'Validated across 80+ countries', 'Based on Polytomous Rasch Rating Scale Model'];
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Understanding the DORA Assessment
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Scientific Methodology
                </h3>
                <ul className="space-y-4">
                  {validationPoints.map((point, index) => <li key={index} className="flex items-start">
                      <CheckCircleIcon className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>)}
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Scientific Credibility
                </h3>
                <p className="text-gray-700 mb-4">
                  The DORA assessment has been rigorously tested and validated
                  through multiple studies across diverse populations.
                </p>
                <p className="text-gray-700 mb-4">
                  Our methodology has been reviewed by leading experts in
                  digital wellness, psychology, and educational technology.
                </p>
                <div className="flex items-center mt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">99%</span>
                  </div>
                  <p className="text-gray-700">
                    Accuracy rate in identifying digital wellness concerns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};