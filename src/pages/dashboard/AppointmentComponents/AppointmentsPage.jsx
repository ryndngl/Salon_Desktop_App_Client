import React, { useState } from 'react';
import AppointmentTable from './AppointmentTable';
import AppointmentStats from './AppointmentStats';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "09123456789",
      services: "Hair Cut, Hair Color",
      date: new Date().toISOString().split("T")[0],
      time: "10:00 AM",
      modeOfPayment: "Cash",
      status: "Pending"
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      email: "juan@email.com",
      phone: "09987654321",
      services: "Massage, Facial",
      date: "2024-01-16",
      time: "2:00 PM",
      modeOfPayment: "GCash",
      status: "Confirmed"
    },
    {
      id: 3,
      name: "Ana Garcia",
      email: "ana@email.com",
      phone: "09111222333",
      services: "Manicure, Pedicure",
      date: new Date().toISOString().split("T")[0],
      time: "11:00 AM",
      modeOfPayment: "Card",
      status: "Completed"
    },
    {
      id: 4,
      name: "Pedro Silva",
      email: "pedro@email.com",
      phone: "09444555666",
      services: "Haircut",
      date: "2024-01-18",
      time: "3:00 PM",
      modeOfPayment: "Cash",
      status: "Rescheduled"
    },
    {
      id: 5,
      name: "Lisa Wong",
      email: "lisa@email.com",
      phone: "09777888999",
      services: "Facial Treatment",
      date: "2024-01-19",
      time: "1:00 PM",
      modeOfPayment: "GCash",
      status: "Cancelled"
    }
  ]);

  const handleEdit = (appointment) => {
    console.log('Edit appointment:', appointment);
  };

  const handleDelete = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    }
  };

  const handleConfirm = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'Confirmed' }
          : apt
      )
    );
  };

  const handleReschedule = (appointment) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointment.id 
          ? { ...apt, status: 'Rescheduled' }
          : apt
      )
    );
  };

  const handleCancel = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: 'Cancelled' }
            : apt
        )
      );
    }
  };

  const handleMarkAsCompleted = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'Completed' }
          : apt
      )
    );
  };

  const handleCall = (phoneNumber) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phoneNumber);
      alert(`Phone number ${phoneNumber} copied to clipboard!`);
    } else {
      alert(`Call: ${phoneNumber}`);
    }
  };

  return (
    <div className="space-y-6">
      <AppointmentStats appointments={appointments} />
      
      <AppointmentTable
        appointments={appointments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onConfirm={handleConfirm}
        onReschedule={handleReschedule}
        onCancel={handleCancel}
        onMarkAsCompleted={handleMarkAsCompleted}
        onCall={handleCall}
      />
    </div>
  );
};

export default AppointmentsPage;