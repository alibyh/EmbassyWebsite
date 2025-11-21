'use client';

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import { Container } from '@/shared/ui/Container';
import { Announcement, mockAnnouncements } from '@/entities/announcement';
import styles from './Announcements.module.css';

const SortIcon: React.FC<{ direction?: 'asc' | 'desc' | false }> = ({ direction }) => {
  if (!direction) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.sortIcon}>
        <path d="M8 3V13M8 3L4 7M8 3L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`${styles.sortIcon} ${styles.sortIconActive}`}>
      {direction === 'asc' ? (
        <path d="M8 3V13M8 3L4 7M8 3L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      ) : (
        <path d="M8 13V3M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      )}
    </svg>
  );
};

const columns: ColumnDef<Announcement>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return (
        <div className={styles.date}>
          {date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Announcement',
    cell: ({ row }) => (
      <div>
        <div className={styles.announcementTitle}>{row.original.title}</div>
        <div className={styles.excerpt}>{row.original.excerpt}</div>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const categoryClass = `category${row.original.category.replace(/\s+/g, '')}`;
      return (
        <span className={`${styles.badge} ${styles[categoryClass as keyof typeof styles]}`}>
          {row.original.category}
        </span>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const priorityClass = `priority${row.original.priority.charAt(0).toUpperCase() + row.original.priority.slice(1)}`;
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={`${styles.priorityIndicator} ${styles[priorityClass as keyof typeof styles]}`} />
          <span style={{ textTransform: 'capitalize' }}>{row.original.priority}</span>
        </div>
      );
    },
  },
];

export const Announcements: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: mockAnnouncements,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <section className={styles.section} id="announcements">
      <Container>
        <div className={styles.header}>
          <div className={styles.sectionBadge}>Latest Updates</div>
          <h2 className={styles.title}>Announcements</h2>
          <p className={styles.description}>
            Stay informed with the latest news, updates, and important notices from the embassy.
          </p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={styles.th}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <SortIcon direction={header.column.getIsSorted() as 'asc' | 'desc' | false} />
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={styles.tbody}>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={styles.tr}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.td}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
};
