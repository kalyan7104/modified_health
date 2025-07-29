
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';




export default function MedicalReportPage({ params }: { params: { id: string } }) {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const patientData = localStorage.getItem('patientData');
    if (!patientData) {
      router.push('/patient-login');
      return;
    }

    // Load report data
    loadReport();
  }, [router]);

  const loadReport = () => {
    // Mock report data - in real app, this would come from API
    const mockReport = {
      id: params.id,
      appointmentDate: '2024-01-10',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      diagnosis: 'Hypertension (High Blood Pressure)',
      symptoms: ['Headache', 'Chest tightness', 'Fatigue'],
      vitalSigns: {
        bloodPressure: '150/90 mmHg',
        heartRate: '85 bpm',
        temperature: '98.6°F',
        weight: '75 kg',
        height: '175 cm'
      },
      labResults: [
        { test: 'Blood Sugar', value: '95 mg/dL', status: 'Normal' },
        { test: 'Cholesterol', value: '220 mg/dL', status: 'High' },
        { test: 'Hemoglobin', value: '14.2 g/dL', status: 'Normal' }
      ],
      prescription: [
        { medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
        { medication: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime' }
      ],
      recommendations: [
        'Follow a low-sodium diet',
        'Exercise regularly (30 minutes daily)',
        'Monitor blood pressure at home',
        'Schedule follow-up in 4 weeks'
      ],
      nextAppointment: '2024-02-10'
    };

    setReport(mockReport);
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    // Mock PDF download
    alert('PDF download functionality would be implemented here');
  };

  const handleShare = () => {
    // Mock share functionality
    alert('Share functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Report not found</h2>
          <Link href="/appointment-history" className="text-blue-600 hover:text-blue-700">
            Go back to appointments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/appointment-history" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-arrow-left-line text-gray-600"></i>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Medical Report</h1>
                <p className="text-sm text-gray-500">Appointment #{report.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <i className="ri-share-line text-gray-600"></i>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <i className="ri-download-line text-blue-600"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Report Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Report</h2>
            <p className="text-gray-600">
              {new Date(report.appointmentDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Doctor Information</h3>
              <p className="text-gray-700">{report.doctorName}</p>
              <p className="text-sm text-blue-600">{report.specialty}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Appointment ID</h3>
              <p className="text-gray-700">{report.id}</p>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Diagnosis</h3>
          <p className="text-gray-700 font-medium">{report.diagnosis}</p>
        </div>

        {/* Symptoms */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {report.symptoms.map((symptom: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {symptom}
              </span>
            ))}
          </div>
        </div>

        {/* Vital Signs */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Vital Signs</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(report.vitalSigns).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm font-bold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lab Results */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Lab Results</h3>
          <div className="space-y-3">
            {report.labResults.map((result: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{result.test}</p>
                  <p className="text-sm text-gray-600">{result.value}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  result.status === 'Normal' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {result.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Prescription */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Prescription</h3>
          <div className="space-y-3">
            {report.prescription.map((med: any, index: number) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900">{med.medication}</h4>
                <p className="text-sm text-blue-700">{med.dosage} - {med.frequency}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h3>
          <div className="space-y-2">
            {report.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <i className="ri-check-line text-green-600 mt-0.5"></i>
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Appointment */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Next Appointment</h3>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div>
              <p className="font-medium text-green-900">Follow-up Scheduled</p>
              <p className="text-sm text-green-700">
                {new Date(report.nextAppointment).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <Link 
              href="/book-appointment"
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors !rounded-button"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
