'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';
import { api } from '@/convex/_generated/api';
import { MoreHorizontal } from 'lucide-react';
import { Footer } from './footer';
import { formatDistanceToNow } from 'date-fns';
import { Overlay } from './overlay';
import { Skeleton } from '@/components/ui/skeleton';
import { Actions } from '@/components/actions';
interface BoardCardProps {
  title: string;
  id: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  title,
  id,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });
  const { mutate: onFavorite, pending: onFavoritePending } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnfavorite, pending: onUnfavoritePending } = useApiMutation(
    api.board.unfavorite
  );
  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch((error) =>
        toast.error('Failed to unfavorite!')
      );
    } else {
      onFavorite({ id, orgId }).catch((error) =>
        toast.error('Failed to favorite!')
      );
    }
  };
  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />

          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          onClick={toggleFavorite}
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          disabled={onFavoritePending || onUnfavoritePending}
        />
      </div>
    </Link>
  );
};
BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className=" aspect-[100/127]  rounded-lg   overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
