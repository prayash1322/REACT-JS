"use client";

import Image from "next/image";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function ImageUpload({
  value,
  onChange,
  error,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState("");

  const selectFile = (file?: File) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFileError("Please choose an image file.");
      return;
    }

    setFileError("");
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <p className="mb-1 text-sm font-medium text-gray-900">Profile image</p>
      <div
        className="flex min-h-32 cursor-pointer items-center justify-center border border-dashed border-gray-300 bg-gray-50 p-4 text-center hover:bg-gray-100"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          selectFile(event.dataTransfer.files[0]);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => selectFile(event.target.files?.[0])}
        />
        {value ? (
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-300 bg-white">
              <Image
                src={value}
                alt="Selected profile preview"
                fill
                sizes="64px"
                unoptimized
                className="object-cover"
              />
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-700">
              <Upload className="h-4 w-4" />
              Change image
            </span>
          </div>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
            <Upload className="h-4 w-4 text-blue-600" />
            Drop an image here or click to upload
          </span>
        )}
      </div>
      {(error || fileError) && (
        <p className="mt-1 text-sm text-red-600">{error || fileError}</p>
      )}
    </div>
  );
}
