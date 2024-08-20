
"use client"
import { useCallback } from 'react';




// type FileUploaderProps={
// files:File[] | undefined |File
// onChange:(files:File[]) => void
// }
export const FileUploader = ({ files, onChange }) => {
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>)=> {
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
