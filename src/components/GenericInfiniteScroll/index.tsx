import React from 'react';
import LoadingIndicator from 'components/Loaders/LoadingIndicator';
import DynamicMessage from 'components/Messages/DynamicMessage/DynamicMessage';
import styles from './GenericInfiniteScroll.module.scss';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import cn from 'classnames';

interface GenericInfiniteScrollProps<T> {
  /**
   * Query result from the infinite query hook containing paginated data.
   */
  queryData: UseInfiniteQueryResult<
    InfiniteData<
      {
        data: T[];
        page: number;
      },
      unknown
    >,
    Error
  >;
  /**
   * Message to display when no data is available.
   */
  noItemsMessage: string;
  /**
   * A function that renders each item in the list.
   * @param item
   */
  renderItem: (item: T) => React.ReactNode;
  /**
   * A function that renders skeletons for each item while loading.
   */
  renderItemSkeleton: () => React.ReactNode;
}

const GenericInfiniteScroll = <T,>({
  queryData,
  noItemsMessage,
  renderItem,
  renderItemSkeleton,
}: GenericInfiniteScrollProps<T>) => {
  const items = queryData?.data?.pages?.flatMap((page) => page.data) || [];
  const isFetchingNextPage = queryData.isFetchingNextPage;
  const hasNextPage = queryData.hasNextPage;
  const isLoading = queryData.isLoading;
  const noQueryDataFound =
    queryData.isSuccess && !queryData?.data?.pages?.flatMap((page) => page.data).length;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const shouldLoadMore =
      scrollHeight - scrollTop === clientHeight && hasNextPage && !isFetchingNextPage;

    if (shouldLoadMore) {
      queryData?.fetchNextPage();
    }
  };

  return (
    <div
      className={cn(styles.scrollContainer, {
        [styles.noData]: noQueryDataFound,
        [styles.isFetched]: queryData.isFetched,
      })}
      onScroll={handleScroll}
    >
      <DynamicMessage isVisible={noQueryDataFound}>{noItemsMessage}</DynamicMessage>

      <ul className={styles.itemList}>
        {isLoading
          ? renderItemSkeleton()
          : items.map((item, index) => (
              <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
            ))}
      </ul>
      <LoadingIndicator isLoading={isFetchingNextPage} className="mt-3" />
    </div>
  );
};

export default GenericInfiniteScroll;
