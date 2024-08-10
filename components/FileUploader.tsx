import { useCallback } from 'react';

export const FileUploader = ({ files, onChange }) => {
  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (file) {
        onChange(file); // Pass the File object directly
      }
    },
    [onChange]
  );

  return (
    <input type="file" onChange={handleFileChange} />
  );
};
