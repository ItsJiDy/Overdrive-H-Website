'use client';

import { Layout } from 'lucide-react';

type LayoutIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const LayoutIcon: React.FC<LayoutIconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return <Layout size={size} color={color} className={className} />;
};

export default LayoutIcon;
