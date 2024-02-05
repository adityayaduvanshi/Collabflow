'use client';
import { toast } from 'sonner';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NewBoardButtonProps {
  orgId: string;
  isDisabled?: boolean;
}

export const NewBoardButton = ({ orgId, isDisabled }: NewBoardButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    mutate({
      orgId,
      title: 'Untitled',
    })
      .then((id) => {
        toast.success('Board Created');
        router.push(`/board/${id}`);
      })
      .catch((error) => {
        toast.error('Failed to create board!');
      });
  };
  return (
    <button
      disabled={pending || isDisabled}
      onClick={onClick}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rouned-lg hover:bg-blue-800 flex flex-col justify-center items-center py-6',
        (pending || isDisabled) &&
          'opacity-75  hover:bg-blue-600 cursor-not-allowed'
      )}
    >
      <div />
      <PlusIcon className="h-12 w-12  text-white stroke-1" />
      <p className="text-sm  text-white font-light">New Board</p>
    </button>
  );
};
