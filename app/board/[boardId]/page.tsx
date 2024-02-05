import React from 'react';
import { Canvas } from './_components/canvas';
import { Room } from '@/components/room';
import { Loading } from './_components/loading';

interface BoardIDPageProps {
  params: {
    boardId: string;
  };
}

const BoardIDPage = ({ params }: BoardIDPageProps) => {
  return (
    <Room fallback={<Loading />} roomId={params.boardId}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIDPage;
