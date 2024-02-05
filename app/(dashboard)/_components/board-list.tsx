'use client';

import { EmptyBoards } from './empty-boards';
import { EmptyFavorites } from './empty-favorites';
import { EmptySearch } from './empty-search';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { BoardCard } from './board-card';
import { NewBoardButton } from './newboard-button';

interface BoardListProps {
  query: { search?: string; favorites?: string };
  orgId: string;
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, {
    orgId,
    ...query,
  });
  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? 'Favortie Boards' : 'Team Boards'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 mb-10">
          <NewBoardButton isDisabled orgId={orgId} />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }
  if (!data?.length && query.search) {
    return <EmptySearch />;
  }
  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }
  if (!data?.length) {
    return <EmptyBoards />;
  }
  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? 'Favortie Boards' : 'Team Boards'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 mb-10">
        <NewBoardButton orgId={orgId} />
        {data?.map((item) => (
          <BoardCard
            key={item._id}
            title={item.title}
            id={item._id}
            imageUrl={item.imageUrl}
            authorId={item.authorId}
            authorName={item.authorName}
            createdAt={item._creationTime}
            orgId={item.orgId}
            isFavorite={item.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
