
'use client';

import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle, alertVariants } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';

export interface TimedAlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title: string;
  description: string;
  duration?: number;
  onClose?: () => void;
}

const alertIcons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertCircle,
  info: Info
};

export const TimedAlert: React.FC<TimedAlertProps> = ({
  variant,
  title,
  description,
  duration = 10000, // 10 seconds default
  onClose,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration === Infinity) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) {
    return null;
  }
  
  const Icon = alertIcons[variant as keyof typeof alertIcons] || Info;


  return (
    <Alert
      variant={variant}
      className={cn(
        'transition-all duration-300 ease-in-out',
        isVisible ? 'animate-in fade-in' : 'animate-out fade-out',
        className
      )}
      {...props}
    >
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
