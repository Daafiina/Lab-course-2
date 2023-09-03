import React from 'react';

export default function DateeField(props: DateFieldProps) {
  const { value, displayName } = props;

  // Check if value is defined and not null before formatting
  const formattedDate = value ? new Date(value).toLocaleDateString() : '';

  return (
    <div className="mb-2">
      <label>{displayName}</label>
      <div>{formattedDate}</div>
    </div>
  );
}

interface DateFieldProps {
  value: string | Date | null | undefined;
  displayName: string;
}
