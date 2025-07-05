import React, { useState } from 'react';
import Head from 'next/head';
import { EligibilityForm } from '../components/EligibilityForm';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { FormData, EligibilityResult } from '../types';
import { calculateEligibility } from '../utils/eligibilityCalculator';

export default function Home() {
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const handleFormSubmit = (formData: FormData) => {
    const eligibilityResult = calculateEligibility(formData);
    setResult(eligibilityResult);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <>
      <Head>
        <title>Childcare Leave Eligibility Checker - Japan</title>
        <meta name="description" content="Check your eligibility for childcare leave (育児休業) in Japan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Childcare Leave Eligibility Checker
            </h1>
            <p className="text-gray-600">
              Check if you're eligible for childcare leave (育児休業) in Japan
            </p>
          </div>

          <EligibilityForm onSubmit={handleFormSubmit} />
          
          {result && (
            <>
              <ResultsDisplay result={result} />
              <div className="mt-6 text-center">
                <button
                  onClick={handleReset}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Check Again
                </button>
              </div>
            </>
          )}

          <div className="mt-8 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Important Notes:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• This tool provides guidance based on general Japanese labor law requirements</li>
              <li>• Always consult with your HR department for company-specific policies</li>
              <li>• Individual circumstances may affect eligibility</li>
              <li>• Submit your application at least 1 month before your intended start date</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}