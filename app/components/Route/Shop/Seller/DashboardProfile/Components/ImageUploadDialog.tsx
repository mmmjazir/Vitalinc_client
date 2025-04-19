"use client";

import { useState, useRef, useCallback, FC, useEffect } from "react";
import { Loader2, Plus, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpdatePharmacyImagesMutation } from "@/redux/features/pharmacy/pharmacyApi";
import toast from "react-hot-toast";
import Image from "next/image";

type Props = {
  id: string;
  refetch: any;
};

const ImageUploadDialog: FC<Props> = ({ id, refetch }) => {
  const [updatePharmacyImages, { isSuccess, error, data, isLoading }] =
    useUpdatePharmacyImagesMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files[0] as any;
    handleFiles(file);
  };

  const handleFiles = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const image = preview;
      await updatePharmacyImages({ id, image });
      setIsDialogOpen(false);
      setSelectedFile(null);
      setPreview(null);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message;
      toast.success(message);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="aspect-square w-[10rem] h-[10rem] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          <Plus className="w-8 h-8 text-gray-400" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div
          className={`mt-4  flex flex-col cursor-pointer items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors ${
            dragActive ? "border-primary" : "border-gray-300"
          } ${selectedFile ? "bg-gray-50" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <input
            ref={inputRef}
            type="file"
            id="image"
            accept="image/*"
            // accept="image/png,image/jpg,image/jpeg,image/webp"
            className="hidden"
            onChange={handleChange}
          />
          {selectedFile && preview ? (
            <div className="text-center">
              {/* <img
                src={preview}
                alt="Preview"
                className="max-h-40 max-w-full mb-2 rounded"
              /> */}
              <div className="relative max-h-40 w-full mb-2 rounded overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop or click to upload
              </p>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            className="text-white"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
