import React, { useState, useEffect } from 'react';
import { LinkedInLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { Github, Heart } from 'lucide-react';
import DonationModal from './DonationModal';
import { useSearchParams } from 'react-router-dom';

function About() {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [searchParams] = useSearchParams();

  // Check URL params for donation success
  useEffect(() => {
    if (searchParams.get('donation') === 'success') {
      setShowThankYou(true);
    }
  }, [searchParams]);

  return (
    <div className="space-y-8">
      {/* About Me Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Background & Inspirations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-4 mb-4">
                Hi, thank you for visiting my website! My name's Ben and I am currently 19 and studying Mathematics and 
                Computer Science at the University of Queensland. 
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-4 mb-4">
                During my first year at university, I spent a lot of time brainstorming project ideas. I knew I wanted to create something that combined my two greatest passions — Maths and Computer Science — while being meaningful, impactful, and genuinely helpful to others. I also realised that I had a natural talent for simplifying and conveying concepts clearly, whether to friends or family, which inspired me to focus on making these subjects accessible and engaging for others. 
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-4 mb-4">
                Looking back on my senior year at St Laurence's College (2023) - I'm certain that I would've appreciated having an 
                easily accessible website to practise for my Maths internal and external exams. I found it particularly hassling
                to download past papers hundreds of times or swap tabs to Cambridge GO or something
                to view marking guides and additional problems. 
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-4 mb-4">
                Because of this, I began coding up OzMath in November of 2024. I'd like to note that I take a lot of 
                inspiration from Joel Speranza's Math videos as well as Leetcode. 
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-4">
                Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                My mission is to create a minimalistic and straightforward, yet accessible learning environment where students can 
                master mathematical concepts at their own pace, one problem at a time. Through interactive problems, 
                detailed solutions, and video explanations, I strive to make complex mathematical concepts simple, approachable and enjoyable.
              </p>
            </div>
          </div>
          
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <img
                src="/images/headshot.png"
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/chaubenn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <LinkedInLogoIcon className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://github.com/chaubenn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a 
                href="mailto:ozmathau@gmail.com"
                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <EnvelopeClosedIcon className="w-5 h-5" />
                <span>Email</span>
              </a>
            </div>
            <button
              onClick={() => setShowDonationModal(true)}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>Support OzMath</span>
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Frequently Asked Questions (FAQ)</h2>
        
        <div className="space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              What is OzMath?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              OzMath is an interactive platform designed specifically for QLD high school mathematics students. 
              It provides a collection of practice problems from past papers, detailed solutions, and video explanations 
              to help students prepare for their assessments. Students can answer problems and take tests online, automatically and accurately marked by AI and prompted directly from the QCAA marking guide.
            </p>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              How did you create this website?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              I built OzMath using modern web technologies including React, Vite, TypeScript/JavaScript, Radix UI/Shadcn/ui and Tailwind CSS. I used MUX to handle the media, Supabase to manage the user database and deployed the website using Netlify. I self-taught myself throughout the process with guidance from friends and family. I also regularly 
              leveraged online resources including YouTube and ChatGPT. For the mathematical equations, I use KaTeX to render LaTeX notation, and I embedded the OpenAI API (GPT 4.0-turbo) to evaluate user responses. The platform is designed to be fast, 
              responsive, and user-friendly. All the problems, solutions, and video content are carefully curated 
              and created by me. 
            </p>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              How are the problems organised?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Problems are tagged with identifiers like TA (Technology Active), TF (Technology Free), and years 
              (2021-2023). You can filter problems using these tags to focus on specific types of questions or 
              time periods.
            </p>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              What resources are available?
            </h3>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="mb-2">Each problem comes with:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Step-by-step solutions</li>
                <li>Video explanations (for selected problems)</li>
                <li>Access to relevant formula sheets</li>
                <li>Multiple-choice and written response formats</li>
              </ul>
            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              How often is new content added?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              I regularly update the platform with new problems and solutions. The focus is on providing comprehensive 
              coverage of the QLD mathematics curriculum, with special attention to recent exam patterns and topics.
            </p>
          </div>

          <div className="pb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              How can I provide feedback?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              If you notice any errors, have suggestions for improvement, or would like 
              to request specific topics, please feel free to reach out to me at ozmathau@gmail.com!
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDonationModal && (
        <DonationModal onClose={() => setShowDonationModal(false)} />
      )}
      {showThankYou && (
        <DonationModal 
          onClose={() => setShowThankYou(false)} 
          isThankYou 
        />
      )}
    </div>
  );
}

export default About;
