"use client";

import dynamic from 'next/dynamic';

const LightLeakBackground = dynamic(
  () => import('./LightLeakBackground'),
  { ssr: false }
);

export default function WebGLBackgroundWrapper() {
  return <LightLeakBackground />;
}
