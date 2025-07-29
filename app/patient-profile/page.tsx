
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { patientAPI } from '@/lib/api';

export default function PatientProfile() {
  const [patientData, setPatientData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    bloodType: '',
    allergies: '',
    medications: ''
  });
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('patientData');
    if (!userData) {
      router.push('/patient-login');
      return;
    }
    
    const patient = JSON.parse(userData);
    setPatientData(patient);
    setProfilePicture(patient.profilePicture || null);
    setFormData({
      name: patient.name || '',
      email: patient.email || '',
      phone: patient.phone || '',
      dateOfBirth: patient.dateOfBirth || '',
      address: patient.address || '',
      emergencyContact: patient.emergencyContact || '',
      bloodType: patient.bloodType || 'A+',
      allergies: patient.allergies || 'None',
      medications: patient.medications || 'None'
    });
  }, [router]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // PUT request to update profile
      const updatedData = await patientAPI.updateProfile(patientData.id, {
        ...formData,
        profilePicture: profilePicture || undefined
      });
      
      localStorage.setItem('patientData', JSON.stringify(updatedData));
      setPatientData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('patientData');
    localStorage.removeItem('userType');
    router.push('/');
  };

  if (!patientData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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
              <Link href="/patient-dashboard" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-arrow-left-line text-gray-600"></i>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-500">Manage your information</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
            >
              <i className="ri-logout-box-line text-red-600"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto overflow-hidden">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <i className="ri-user-line text-blue-600 text-2xl"></i>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                <i className="ri-camera-line text-white text-xs"></i>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{patientData.name}</h2>
          <p className="text-gray-600">Patient ID: {patientData.id}</p>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              ) : (
                <p className="text-gray-900">{patientData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              ) : (
                <p className="text-gray-900">{patientData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              ) : (
                <p className="text-gray-900">{patientData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              ) : (
                <p className="text-gray-900">{new Date(patientData.dateOfBirth).toLocaleDateString()}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              {isEditing ? (
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-20 resize-none"
                />
              ) : (
                <p className="text-gray-900">{patientData.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              ) : (
                <p className="text-gray-900">{patientData.emergencyContact}</p>
              )}
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
              {isEditing ? (
                <select
                  value={formData.bloodType}
                  onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <p className="text-gray-900">{formData.bloodType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
              {isEditing ? (
                <textarea
                  value={formData.allergies}
                  onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-20 resize-none"
                  placeholder="List any allergies..."
                />
              ) : (
                <p className="text-gray-900">{formData.allergies}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
              {isEditing ? (
                <textarea
                  value={formData.medications}
                  onChange={(e) => setFormData({...formData, medications: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-20 resize-none"
                  placeholder="List current medications..."
                />
              ) : (
                <p className="text-gray-900">{formData.medications}</p>
              )}
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Help & Support</h3>
          <Link 
            href="/patient-help-support"
            className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="ri-question-line text-blue-600"></i>
              </div>
              <div>
                <p className="font-medium text-gray-900">Help & Support</p>
                <p className="text-sm text-gray-500">FAQs and contact information</p>
              </div>
            </div>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
          </Link>
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors !rounded-button disabled:opacity-70"
          >
            {isSaving ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            ) : (
              'Save Changes'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
