// src/components/user-appointments/UserAppointment.js
import Styles from './userappointment.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAppointments } from '../../features/slices/appointmentSlice';
import { completeAppointment } from '../../features/slices/appointmentSlice';
import { useSelector as useAuthSelector } from 'react-redux'; // Assuming auth slice is in store

export default function UserAppointment() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.User) || {};
  const appointments = useSelector((state) => state.appointments.appointments);
  const loading = useSelector((state) => state.appointments.loading);
  const error = useSelector((state) => state.appointments.error);

  useEffect(() => {
    if (user.uid) {
      dispatch(fetchUserAppointments(user.uid)); // Fetch appointments for this user
    }
  }, [dispatch, user.uid]);

  // Filter upcoming and past appointments
  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const pastAppointments = appointments.filter(app => app.status === 'completed' || app.status === 'cancelled');
  console.log("Appointments in UserAppointment.js", appointments);
  const handleCompleteAppointment = (appointment) => { 
    dispatch(completeAppointment(appointment.id));
  };
  if (loading) return <div className={Styles.loading}>Loading appointments...</div>;
  if (error) return <div className={Styles.error}>Error: {error}</div>;

  return (
    <div className={Styles.UserAppointment}>
      <h2 className={Styles.title}>My Appointments</h2>
      {appointments.length === 0 ? (
        <p className={Styles.noAppointments}>No appointments found.</p>
      ) : (
        <>
          <div className={Styles.section}>
            <h3 className={Styles.sectionTitle}>Upcoming Appointments</h3>
            {upcomingAppointments.length === 0 ? (
              <p className={Styles.noAppointments}>No upcoming appointments.</p>
            ) : (
              <ul className={Styles.appointmentList}>
                {upcomingAppointments.map((appointment) => (
                  <li key={appointment.id} className={Styles.appointmentItem}>
                    <div className={Styles.appointmentDetails}>
                    <div className={Styles.drImage}>
                      <img src={appointment.DrImageUrl} alt={appointment.doctorName} />
                    </div>
                    <div className={Styles.UpcomingappointmentInfo}>
                      <p><strong>Doctor:</strong> {appointment.DoctorName}</p>
                      <p><strong>Specialties:</strong> {appointment.Specialties}</p>
                       <p><strong>Reason:</strong> {appointment.reason || 'Not specified'}</p>
                      <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {appointment.time}</p>
                      </div>
                      <div className={Styles.doctorActions}>
                        <button className={Styles.CompleteButton} onClick={() => handleCompleteAppointment(appointment)}>Complete</button>

                      </div>
                     
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={Styles.section}>
            <h3 className={Styles.sectionTitle}>Past Appointments</h3>
            {pastAppointments.length === 0 ? (
              <p className={Styles.noAppointments}>No past appointments.</p>
            ) : (
              <ul className={Styles.appointmentList}>
                {pastAppointments.map((appointment) => (
                  <li key={appointment.id} className={Styles.appointmentItem}>
                    <div className={Styles.appointmentDetails}>
                    <div className={Styles.appointmentInfo}>
                      <p><strong>Doctor:</strong> {appointment.DoctorName}</p>
                      <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {appointment.time}</p>
                      <p><strong>Reason:</strong> {appointment.reason || 'Not specified'}</p>
                      <p className={Styles.CompletedAppointment} ><strong>Status:</strong> {appointment.status}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}