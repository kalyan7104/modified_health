
// Mock API with localStorage for data persistence
const API_DELAY = 800; // Simulate network delay

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique IDs
const generateId = () => 'ID' + Math.random().toString(36).substr(2, 9);

// Doctor API
export const doctorAPI = {
  // POST: Register new doctor
  async register(doctorData: any) {
    await delay(API_DELAY);

    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');

    // Check if email already exists
    const existingDoctor = doctors.find((d: any) => d.email === doctorData.email);
    if (existingDoctor) {
      throw new Error('Email already registered');
    }

    const newDoctor = {
      id: generateId(),
      ...doctorData,
      rating: 4.5,
      totalPatients: 0,
      createdAt: new Date().toISOString()
    };

    doctors.push(newDoctor);
    localStorage.setItem('doctors', JSON.stringify(doctors));

    return newDoctor;
  },

  // GET: Login doctor
  async login(email: string, password: string) {
    await delay(API_DELAY);

    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    const doctor = doctors.find((d: any) => d.email === email && d.password === password);

    if (!doctor) {
      throw new Error('Invalid credentials');
    }

    // Don't return password in response
    const { password: _, ...doctorWithoutPassword } = doctor;
    return doctorWithoutPassword;
  },

  // PUT: Update doctor profile
  async updateProfile(doctorId: string, updateData: any) {
    await delay(API_DELAY);

    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    const doctorIndex = doctors.findIndex((d: any) => d.id === doctorId);

    if (doctorIndex === -1) {
      throw new Error('Doctor not found');
    }

    doctors[doctorIndex] = { ...doctors[doctorIndex], ...updateData };
    localStorage.setItem('doctors', JSON.stringify(doctors));

    const { password: _, ...doctorWithoutPassword } = doctors[doctorIndex];
    return doctorWithoutPassword;
  },

  // PUT: Reset password
  async resetPassword(email: string, newPassword: string) {
    await delay(API_DELAY);

    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    const doctorIndex = doctors.findIndex((d: any) => d.email === email);

    if (doctorIndex === -1) {
      throw new Error('Email not found');
    }

    doctors[doctorIndex].password = newPassword;
    localStorage.setItem('doctors', JSON.stringify(doctors));

    return { message: 'Password updated successfully' };
  },

  // GET: Get doctor by ID
  async getById(doctorId: string) {
    await delay(API_DELAY);

    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    const doctor = doctors.find((d: any) => d.id === doctorId);

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const { password: _, ...doctorWithoutPassword } = doctor;
    return doctorWithoutPassword;
  }
};

// Patient API
export const patientAPI = {
  // POST: Register new patient
  async register(patientData: any) {
    await delay(API_DELAY);

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');

    // Check if email already exists
    const existingPatient = patients.find((p: any) => p.email === patientData.email);
    if (existingPatient) {
      throw new Error('Email already registered');
    }

    const newPatient = {
      id: generateId(),
      ...patientData,
      createdAt: new Date().toISOString()
    };

    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));

    return newPatient;
  },

  // GET: Login patient
  async login(email: string, password: string) {
    await delay(API_DELAY);

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patient = patients.find((p: any) => p.email === email && p.password === password);

    if (!patient) {
      throw new Error('Invalid credentials');
    }

    // Don't return password in response
    const { password: _, ...patientWithoutPassword } = patient;
    return patientWithoutPassword;
  },

  // PUT: Update patient profile
  async updateProfile(patientId: string, updateData: any) {
    await delay(API_DELAY);

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patientIndex = patients.findIndex((p: any) => p.id === patientId);

    if (patientIndex === -1) {
      throw new Error('Patient not found');
    }

    patients[patientIndex] = { ...patients[patientIndex], ...updateData };
    localStorage.setItem('patients', JSON.stringify(patients));

    const { password: _, ...patientWithoutPassword } = patients[patientIndex];
    return patientWithoutPassword;
  },

  // PUT: Reset password
  async resetPassword(email: string, newPassword: string) {
    await delay(API_DELAY);

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patientIndex = patients.findIndex((p: any) => p.email === email);

    if (patientIndex === -1) {
      throw new Error('Email not found');
    }

    patients[patientIndex].password = newPassword;
    localStorage.setItem('patients', JSON.stringify(patients));

    return { message: 'Password updated successfully' };
  },

  // GET: Get patient by ID
  async getById(patientId: string) {
    await delay(API_DELAY);

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patient = patients.find((p: any) => p.id === patientId);

    if (!patient) {
      throw new Error('Patient not found');
    }

    const { password: _, ...patientWithoutPassword } = patient;
    return patientWithoutPassword;
  }
};

// Notification API
export const notificationAPI = {
  // POST: Create notification
  async createNotification(notificationData: any) {
    await delay(200); // Shorter delay for notifications

    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');

    const newNotification = {
      id: generateId(),
      ...notificationData,
      read: false,
      createdAt: new Date().toISOString()
    };

    notifications.push(newNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));

    return newNotification;
  },

  // GET: Get notifications by patient ID
  async getByPatientId(patientId: string) {
    await delay(300);

    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    return notifications.filter((n: any) => n.patientId === patientId);
  },

  // PUT: Mark notification as read
  async markAsRead(notificationId: string) {
    await delay(200);

    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const notificationIndex = notifications.findIndex((n: any) => n.id === notificationId);

    if (notificationIndex !== -1) {
      notifications[notificationIndex].read = true;
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }

    return notifications[notificationIndex];
  }
};

// Appointment API
export const appointmentAPI = {
  // POST: Book new appointment
  async bookAppointment(appointmentData: any) {
    await delay(API_DELAY);

    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

    const newAppointment = {
      id: generateId(),
      ...appointmentData,
      createdAt: new Date().toISOString()
    };

    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Create notification for the appointment
    await notificationAPI.createNotification({
      patientId: appointmentData.patientId,
      type: 'appointment_booked',
      title: 'Appointment Booked',
      message: `Your appointment with ${appointmentData.doctorName} has been confirmed for ${appointmentData.date} at ${appointmentData.time}. Token: ${appointmentData.tokenNumber}`,
      appointmentId: newAppointment.id
    });

    return newAppointment;
  },

  // GET: Get appointments by patient ID
  async getByPatientId(patientId: string) {
    await delay(API_DELAY);

    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    return appointments.filter((a: any) => a.patientId === patientId);
  },

  // GET: Get appointments by doctor ID
  async getByDoctorId(doctorId: string) {
    await delay(API_DELAY);

    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    return appointments.filter((a: any) => a.doctorId === doctorId);
  },

  // PUT: Update appointment status
  async updateStatus(appointmentId: string, status: string) {
    await delay(API_DELAY);

    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const appointmentIndex = appointments.findIndex((a: any) => a.id === appointmentId);

    if (appointmentIndex === -1) {
      throw new Error('Appointment not found');
    }

    appointments[appointmentIndex].status = status;
    localStorage.setItem('appointments', JSON.stringify(appointments));

    return appointments[appointmentIndex];
  },

  // DELETE: Cancel appointment
  async cancelAppointment(appointmentId: string) {
    await delay(API_DELAY);

    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const appointmentIndex = appointments.findIndex((a: any) => a.id === appointmentId);

    if (appointmentIndex === -1) {
      throw new Error('Appointment not found');
    }

    const appointment = appointments[appointmentIndex];
    appointments[appointmentIndex].status = 'cancelled';
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Create notification for cancelled appointment
    await notificationAPI.createNotification({
      patientId: appointment.patientId,
      type: 'appointment_cancelled',
      title: 'Appointment Cancelled',
      message: `Your appointment with ${appointment.doctorName} scheduled for ${appointment.date} at ${appointment.time} has been cancelled.`,
      appointmentId: appointmentId
    });

    return { message: 'Appointment cancelled successfully' };
  }
};

// Initialize demo data
export const initializeDemoData = () => {
  // Demo doctors
  const demoDoctors = [
    {
      id: 'D001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      password: 'password123',
      phone: '+1 (555) 123-4567',
      specialty: 'Cardiology',
      hospital: 'City General Hospital',
      experience: '12 years',
      license: 'MD12345',
      education: 'MD from Harvard Medical School',
      about: 'Experienced cardiologist specializing in preventive care and heart disease treatment.',
      rating: 4.8,
      totalPatients: 156,
      createdAt: new Date().toISOString()
    },
    {
      id: 'D002',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@hospital.com',
      password: 'password123',
      phone: '+1 (555) 234-5678',
      specialty: 'Orthopedics',
      hospital: 'Metro Medical Center',
      experience: '8 years',
      license: 'MD23456',
      education: 'MD from Johns Hopkins University',
      about: 'Orthopedic surgeon specializing in joint replacement and sports medicine.',
      rating: 4.6,
      totalPatients: 98,
      createdAt: new Date().toISOString()
    },
    {
      id: 'D003',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@hospital.com',
      password: 'password123',
      phone: '+1 (555) 345-6789',
      specialty: 'Dermatology',
      hospital: 'Skin Care Clinic',
      experience: '10 years',
      license: 'MD34567',
      education: 'MD from Stanford Medical School',
      about: 'Dermatologist specializing in skin cancer prevention and cosmetic dermatology.',
      rating: 4.9,
      totalPatients: 203,
      createdAt: new Date().toISOString()
    },
    {
      id: 'D004',
      name: 'Dr. James Wilson',
      email: 'james.wilson@hospital.com',
      password: 'password123',
      phone: '+1 (555) 456-7890',
      specialty: 'Pediatrics',
      hospital: 'Children\'s Hospital',
      experience: '15 years',
      license: 'MD45678',
      education: 'MD from Yale Medical School',
      about: 'Pediatrician with expertise in child development and adolescent health.',
      rating: 4.7,
      totalPatients: 312,
      createdAt: new Date().toISOString()
    },
    {
      id: 'D005',
      name: 'Dr. Lisa Park',
      email: 'lisa.park@hospital.com',
      password: 'password123',
      phone: '+1 (555) 567-8901',
      specialty: 'Neurology',
      hospital: 'Brain & Spine Center',
      experience: '11 years',
      license: 'MD56789',
      education: 'MD from UCLA Medical School',
      about: 'Neurologist specializing in headache disorders and movement disorders.',
      rating: 4.8,
      totalPatients: 145,
      createdAt: new Date().toISOString()
    }
  ];

  // Demo patients
  const demoPatients = [
    {
      id: 'P001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      password: 'password123',
      phone: '+1 (555) 345-6789',
      dateOfBirth: '1985-06-15',
      address: '123 Main St, City, State 12345',
      emergencyContact: 'Jane Smith - +1 (555) 456-7890',
      bloodType: 'A+',
      allergies: 'Penicillin',
      medications: 'Lisinopril 10mg daily',
      createdAt: new Date().toISOString()
    },
    {
      id: 'P002',
      name: 'Emily Johnson',
      email: 'emily.johnson@email.com',
      password: 'password123',
      phone: '+1 (555) 456-7890',
      dateOfBirth: '1990-03-22',
      address: '456 Oak Ave, City, State 12345',
      emergencyContact: 'Mike Johnson - +1 (555) 567-8901',
      bloodType: 'B-',
      allergies: 'None',
      medications: 'Multivitamin',
      createdAt: new Date().toISOString()
    }
  ];

  // Demo appointments with extensive completed appointments from all doctors
  const demoAppointments = [
    // Completed appointments for Patient P001
    {
      id: 'A001',
      patientId: 'P001',
      doctorId: 'D001',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-01-15',
      time: '10:00 AM',
      appointmentType: 'Consultation',
      notes: 'Regular cardiac check-up and EKG examination',
      tokenNumber: 'T1234',
      status: 'completed',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A002',
      patientId: 'P001',
      doctorId: 'D001',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-01-08',
      time: '2:00 PM',
      appointmentType: 'Follow-up',
      notes: 'Follow-up after cardiac stress test results',
      tokenNumber: 'T1239',
      status: 'completed',
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A003',
      patientId: 'P001',
      doctorId: 'D001',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2023-12-28',
      time: '9:30 AM',
      appointmentType: 'Regular Check-up',
      notes: 'Blood pressure monitoring and medication review',
      tokenNumber: 'T1241',
      status: 'completed',
      createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A004',
      patientId: 'P001',
      doctorId: 'D002',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Orthopedics',
      date: '2024-01-25',
      time: '11:00 AM',
      appointmentType: 'Consultation',
      notes: 'Knee pain evaluation and X-ray review',
      tokenNumber: 'T1236',
      status: 'completed',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A005',
      patientId: 'P001',
      doctorId: 'D002',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Orthopedics',
      date: '2024-01-05',
      time: '4:30 PM',
      appointmentType: 'Follow-up',
      notes: 'MRI results review and treatment plan discussion',
      tokenNumber: 'T1240',
      status: 'completed',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A006',
      patientId: 'P001',
      doctorId: 'D002',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Orthopedics',
      date: '2023-12-20',
      time: '3:00 PM',
      appointmentType: 'Consultation',
      notes: 'Initial consultation for shoulder pain',
      tokenNumber: 'T1242',
      status: 'completed',
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A007',
      patientId: 'P001',
      doctorId: 'D003',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      date: '2024-01-20',
      time: '2:30 PM',
      appointmentType: 'Follow-up',
      notes: 'Skin examination follow-up and biopsy results',
      tokenNumber: 'T1235',
      status: 'completed',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A008',
      patientId: 'P001',
      doctorId: 'D003',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      date: '2023-12-15',
      time: '1:15 PM',
      appointmentType: 'Regular Check-up',
      notes: 'Annual skin cancer screening',
      tokenNumber: 'T1243',
      status: 'completed',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A009',
      patientId: 'P001',
      doctorId: 'D004',
      doctorName: 'Dr. James Wilson',
      specialty: 'Pediatrics',
      date: '2024-01-10',
      time: '9:00 AM',
      appointmentType: 'Regular Check-up',
      notes: 'Annual physical examination and vaccinations',
      tokenNumber: 'T1237',
      status: 'completed',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A010',
      patientId: 'P001',
      doctorId: 'D004',
      doctorName: 'Dr. James Wilson',
      specialty: 'Pediatrics',
      date: '2023-12-22',
      time: '10:30 AM',
      appointmentType: 'Consultation',
      notes: 'Flu symptoms consultation and treatment',
      tokenNumber: 'T1244',
      status: 'completed',
      createdAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A011',
      patientId: 'P001',
      doctorId: 'D005',
      doctorName: 'Dr. Lisa Park',
      specialty: 'Neurology',
      date: '2024-01-12',
      time: '3:00 PM',
      appointmentType: 'Consultation',
      notes: 'Headache consultation and neurological assessment',
      tokenNumber: 'T1238',
      status: 'completed',
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A012',
      patientId: 'P001',
      doctorId: 'D005',
      doctorName: 'Dr. Lisa Park',
      specialty: 'Neurology',
      date: '2023-12-18',
      time: '11:45 AM',
      appointmentType: 'Follow-up',
      notes: 'EEG results discussion and medication adjustment',
      tokenNumber: 'T1245',
      status: 'completed',
      createdAt: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString()
    },
    // Additional completed appointments for Patient P002
    {
      id: 'A013',
      patientId: 'P002',
      doctorId: 'D001',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-01-18',
      time: '1:00 PM',
      appointmentType: 'Consultation',
      notes: 'Chest pain evaluation and cardiac workup',
      tokenNumber: 'T1246',
      status: 'completed',
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A014',
      patientId: 'P002',
      doctorId: 'D003',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      date: '2024-01-14',
      time: '4:00 PM',
      appointmentType: 'Regular Check-up',
      notes: 'Routine skin examination and mole check',
      tokenNumber: 'T1247',
      status: 'completed',
      createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'A015',
      patientId: 'P002',
      doctorId: 'D005',
      doctorName: 'Dr. Lisa Park',
      specialty: 'Neurology',
      date: '2024-01-07',
      time: '2:15 PM',
      appointmentType: 'Follow-up',
      notes: 'Migraine treatment follow-up and medication review',
      tokenNumber: 'T1248',
      status: 'completed',
      createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Only initialize if data doesn't exist
  if (!localStorage.getItem('doctors')) {
    localStorage.setItem('doctors', JSON.stringify(demoDoctors));
  }

  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify(demoPatients));
  }

  if (!localStorage.getItem('appointments')) {
    localStorage.setItem('appointments', JSON.stringify(demoAppointments));
  }

  if (!localStorage.getItem('notifications')) {
    localStorage.setItem('notifications', JSON.stringify([]));
  }
};
