"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { Upload, X, FileImage } from "lucide-react";
import { clsx } from "clsx";

export interface UploadedFile {
  name: string;
  size: string;
  raw: File;
}

interface UploadZoneProps {
  onFileSelected: (file: UploadedFile) => void;
  onFileRemoved: () => void;
  uploadedFile?: UploadedFile | null;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function UploadZone({
  onFileSelected,
  onFileRemoved,
  uploadedFile,
  className,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file: File) {
    onFileSelected({ name: file.name, size: formatBytes(file.size), raw: file });
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  return (
    <div
      className={clsx(
        "relative transition-all duration-150 dropzone",
        isDragging && "dropzone-active",
        className
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,.dcm"
        className="hidden"
        onChange={handleChange}
      />

      <div className="flex flex-col items-center gap-2 p-10">
        {/* Upload icon */}
        <button
          onClick={() => inputRef.current?.click()}
          className="size-16 rounded-full bg-card shadow-sm flex items-center justify-center shrink-0 cursor-pointer hover:shadow-md transition-shadow"
        >
          <Upload size={24} className="text-brand" />
        </button>

        {/* Text */}
        <button
          onClick={() => inputRef.current?.click()}
          className="mt-2 text-base font-medium text-foreground text-center cursor-pointer hover:text-brand transition-colors"
        >
          Glissez votre image ici ou cliquez pour parcourir
        </button>
        <p className="text-sm text-muted-foreground text-center">
          Formats acceptés : JPEG, PNG, DICOM — Max 10 Mo
        </p>

        {/* File preview chip */}
        {uploadedFile && (
          <div className="mt-4 flex items-center gap-3 bg-card border border-border rounded-full px-4 py-2 shadow-sm">
            <FileImage size={14} className="text-brand shrink-0" />
            <span className="text-sm font-medium text-foreground max-w-[200px] truncate">
              {uploadedFile.name}
            </span>
            <span className="text-xs text-muted-foreground">{uploadedFile.size}</span>
            <button
              onClick={onFileRemoved}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer ml-1"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}