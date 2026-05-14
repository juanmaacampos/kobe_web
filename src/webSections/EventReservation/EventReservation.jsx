import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useBusinessContact } from '../../hooks/useBusinessContact.js';
import { buildEventReservationMessage, buildWhatsAppLink } from '../../utils/whatsapp.js';
import './eventReservation.css';



const EventReservation = () => {
  const [guestCount, setGuestCount] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { contactPhone, whatsAppHref, isInitialized } = useBusinessContact();

  const guestMax = 10;

  const handleGuestCountChange = (event) => {
    const nextValue = event.target.value;

    if (!nextValue) {
      setGuestCount('');
      return;
    }

    const numericValue = Number(nextValue);
    if (Number.isNaN(numericValue)) {
      return;
    }

    setGuestCount(String(Math.min(numericValue, guestMax)));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const reservationData = {
      reservationMode: 'table',
      fullName: formData.get('fullName')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      eventType: '',
      eventDate: formData.get('eventDate')?.toString().trim(),
      eventTime: formData.get('eventTime')?.toString().trim(),
      guests: formData.get('guests')?.toString().trim(),
      message: formData.get('message')?.toString().trim(),
    };
    const message = buildEventReservationMessage(reservationData);
    const submitLink = buildWhatsAppLink(contactPhone, message) || whatsAppHref;

    window.open(submitLink, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="reservas" className="event-reservation" aria-label="Reserva de eventos">
      <div className="event-reservation__inner">
        <div className="event-reservation__intro">
       
          <h2>Organizá tu próxima experiencia en Kobe Sushi</h2>
         
        </div>

        <div className="event-reservation__card">
          {!submitted ? (
            <form className="event-form" onSubmit={handleSubmit}>
              <div className="event-form__grid">
                <label>
                  Nombre y apellido
                  <input type="text" name="fullName" required placeholder="Ej: Juan Pérez" autoComplete="name" enterKeyHint="next" />
                </label>

                <label>
                  WhatsApp
                  <input type="tel" name="phone" required placeholder="Ej: +54 9 11 1234-5678" autoComplete="tel" inputMode="tel" enterKeyHint="next" />
                </label>

                <label>
                  Fecha estimada
                  <input type="date" name="eventDate" required enterKeyHint="next" />
                </label>

                <label>
                    Hora de la reserva
                    <input
                      type="time"
                      name="eventTime"
                      required
                      value={reservationTime}
                      onChange={(e) => setReservationTime(e.target.value)}
                      enterKeyHint="next"
                    />
                  </label>

                <label>
                  Cantidad de personas
                  <input
                    type="number"
                    min="1"
                    max={guestMax}
                    name="guests"
                    required
                    value={guestCount}
                    onChange={handleGuestCountChange}
                    placeholder="Hasta 10 personas"
                    inputMode="numeric"
                    enterKeyHint="next"
                  />
                </label>
              </div>

              <label className="event-form__full">
                Comentario (opcional)
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Si querés, agregá un comentario para tu reserva"
                  autoComplete="off"
                  enterKeyHint="done"
                />
              </label>

              <div className="event-form__actions">
                <button type="submit" className="event-form__submit" disabled={!whatsAppHref && isInitialized}>
                  <FaWhatsapp aria-hidden="true" />
                  Enviar por WhatsApp
                </button>
              </div>
            </form>
          ) : (
            <div className="event-form__success" role="status" aria-live="polite">
              <h3>¡Gracias por tu consulta!</h3>
              <p>Tu solicitud fue recibida. Te vamos a contactar pronto para coordinar los detalles.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventReservation;
