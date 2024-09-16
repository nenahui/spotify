import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  className?: string;
}

export const BackButton: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <Button variant={'ghost'} onClick={() => navigate(-1)} className={cn('pl-2 -ml-2.5', className)}>
      <ChevronLeft size={18} />
      <span>Back</span>
    </Button>
  );
};
