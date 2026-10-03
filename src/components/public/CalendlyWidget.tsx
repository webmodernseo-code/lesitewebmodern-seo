'use client';

import React from 'react';
import { CalBookingWidget } from './CalWidget';

// Remplacement transparent de l'ancien widget Calendly par Cal.com officiel
export const CalendlyWidget: React.FC = () => {
  return <CalBookingWidget namespace="30min" calLink="jean-prosper-dsljpi/30min" />;
};

export default CalendlyWidget;
