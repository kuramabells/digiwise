import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
export const FaqSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);
  const faqs = [{
    id: 1,
    question: 'How accurate is the Digital Wellness Assessment?',
    answer: 'The Digital Wellness Assessment has been validated across multiple studies with a 95%+ accuracy rate. It uses a scientifically validated methodology based on the Polytomous Rasch Rating Scale Model and has been tested across 80+ countries with diverse populations.'
  }, {
    id: 2,
    question: 'Is my data private and secure?',
    answer: 'Absolutely. We take privacy extremely seriously. All assessment data is encrypted, anonymized, and stored securely. We never sell personal data to third parties, and you can request deletion of your data at any time through your account settings.'
  }, {
    id: 3,
    question: 'How often should I retake the assessment?',
    answer: 'We recommend retaking the assessment every 3-6 months to track your progress. Digital habits can change over time, and regular assessment helps you stay aware of these changes and their impact on your wellbeing.'
  }, {
    id: 4,
    question: 'What if I score in the Red zone?',
    answer: 'Scoring in the Red zone indicates significant digital wellness concerns that may be impacting your daily life and wellbeing. The assessment provides personalized recommendations, but we also suggest speaking with a mental health professional for additional support.'
  }, {
    id: 5,
    question: 'How does this relate to DepEd curriculum?',
    answer: 'DigiWise works closely with the Department of Education to align our resources with the DepEd curriculum on digital literacy and wellness. Our educational materials complement classroom teaching on responsible technology use and digital citizenship.'
  }, {
    id: 6,
    question: 'Is DigiWise suitable for all ages?',
    answer: 'DigiWise offers age-appropriate assessments and resources. Our main assessment is designed for individuals aged 13 and above. For younger children (ages 8-12), we offer a simplified version that requires parental guidance and consent.'
  }];
  const toggleItem = (id: number) => {
    if (openItem === id) {
      setOpenItem(null);
    } else {
      setOpenItem(id);
    }
  };
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map(faq => <div key={faq.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={() => toggleItem(faq.id)} aria-expanded={openItem === faq.id} aria-controls={`faq-answer-${faq.id}`}>
                  <span className="text-lg font-medium text-gray-800">
                    {faq.question}
                  </span>
                  {openItem === faq.id ? <ChevronUpIcon className="text-blue-600" size={20} /> : <ChevronDownIcon className="text-gray-400" size={20} />}
                </button>
                {openItem === faq.id && <div id={`faq-answer-${faq.id}`} className="px-6 pb-4 animate-fadeIn">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>}
              </div>)}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Have more questions? We're here to help.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>;
};