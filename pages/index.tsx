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
        <title>育児休業受給資格チェッカー</title>
        <meta name="description" content="日本の育児休業受給資格を簡単にチェックできるWebアプリケーション" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* OGP Meta Tags */}
        <meta property="og:title" content="育児休業受給資格チェッカー - Japan Childcare Leave Eligibility Checker" />
        <meta property="og:description" content="日本の育児休業受給資格を簡単にチェックできるWebアプリケーション。出産予定日や雇用形態に基づいて資格を判定します。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://parental-leave-checker.vercel.app" />
        <meta property="og:image" content="https://parental-leave-checker.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="育児休業受給資格チェッカー" />
        <meta property="og:locale" content="ja_JP" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="育児休業受給資格チェッカー - Japan Childcare Leave Eligibility Checker" />
        <meta name="twitter:description" content="日本の育児休業受給資格を簡単にチェックできるWebアプリケーション。出産予定日や雇用形態に基づいて資格を判定します。" />
        <meta name="twitter:image" content="https://parental-leave-checker.vercel.app/og-image.png" />
        
        {/* Additional Meta Tags */}
        <meta name="keywords" content="育児休業,育休,受給資格,日本,労働法,雇用保険,出産,子育て,childcare leave,parental leave,japan" />
        <meta name="author" content="Parental Leave Checker" />
      </Head>
      
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              育児休業受給資格チェッカー
            </h1>
            <p className="text-gray-600">
              日本の育児休業受給資格を簡単にチェックできます
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
                  再度チェック
                </button>
              </div>
            </>
          )}

          <div className="mt-8 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">重要事項:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• このツールは一般的な日本の労働法に基づいた判定を行います</li>
              <li>• 実際の申請時は所属企業の人事部門にご相談ください</li>
              <li>• 個別の事情により結果が異なる場合があります</li>
              <li>• 申請は取得開始予定日の1ヶ月前までに行ってください</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}