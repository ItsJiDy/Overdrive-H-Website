'use client';

import { Key } from 'lucide-react';

type KeyIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const KeyIcon: React.FC<KeyIconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return <Key size={size} color={color} className={className} />;
};

export default KeyIcon;
