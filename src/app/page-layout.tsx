'use client';
import React from 'react';
import ClientLayout from './_components/ClientLayout';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
