"use client";

import Image from "next/image";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { AtSign, MapPin, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ProfileEntry } from "@/types/profile";

interface ProfileCardProps {
  entry: ProfileEntry;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProfileCard({
  entry,
  onEdit,
  onDelete,
}: ProfileCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const address = [
    entry.street,
    [entry.city, entry.state, entry.zip].filter(Boolean).join(", "),
    entry.country,
  ].filter(Boolean);

  return (
    <>
      <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <Image
              src={entry.profileImage}
              alt={`${entry.firstName} ${entry.lastName}`}
              fill
              sizes="64px"
              loading="lazy"
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-slate-900">
              {entry.firstName} {entry.lastName}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <AtSign className="h-3.5 w-3.5" />
              {entry.username}
            </p>
          </div>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
          {entry.aboutMe}
        </p>
        {address.length > 0 && (
          <p className="mt-4 flex items-start gap-2 text-sm leading-5 text-slate-500">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
            {address.join(" · ")}
          </p>
        )}
        <div className="mt-auto flex gap-3 border-t border-slate-100 pt-4">
          <Button
            color="blue"
            size="sm"
            onClick={onEdit}
            className="flex-1 focus:ring-0! focus:outline-none!"
          >
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </Button>
          <Button
            color="red"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex-1 focus:ring-0! focus:outline-none!"
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </article>
      <Modal
        show={isDeleteModalOpen}
        size="md"
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <ModalHeader>Delete profile</ModalHeader>
        <ModalBody>
          <p className="text-sm text-gray-700">
            Delete {entry.firstName} {entry.lastName}&apos;s profile? This
            cannot be undone.
          </p>
          <div className="mt-5 flex justify-end gap-3">
            <Button
              color="gray"
              className="focus:ring-0! focus:outline-none!"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="red"
              className="focus:ring-0! focus:outline-none!"
              onClick={() => { setIsDeleteModalOpen(false); onDelete(); }}
            >
              Delete
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
