import { useState } from 'react';

export type Props = {
  onClickLoadMore: (offset: number, limit: number) => Promise<number>;
  itemsPerPage?: number;
};

export const ItemsLoader: React.FC<Props> = ({ children, onClickLoadMore, itemsPerPage = 30 }) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    onClickLoadMore(page * itemsPerPage, itemsPerPage).then((count) => {
      (!count || count !== itemsPerPage) && setHasMore(false);
      setPage(page + 1);
    });
  };

  if (!page) {
    loadMore();
  }

  return (
    <>
      {children}
      {hasMore && page && (
        <div className="text-center py-5">
          <button
            onClick={loadMore}
            className="bg-gray-400 rounded-full text-sm text-black font-bold p-3"
          >
            さらに読み込む
          </button>
        </div>
      )}
    </>
  );
};
