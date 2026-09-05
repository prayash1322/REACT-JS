"use client";

import { ClipboardList, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProfileCard from "@/components/ProfileCard";
import ProfileForm from "@/components/ProfileForm";
import { deleteEntry, getEntries, saveEntry } from "@/lib/storage";
import type { ProfileEntry } from "@/types/profile";

export default function Home() {
  const [entries, setEntries] = useState<ProfileEntry[]>([]);

  useEffect(() => {
    setEntries(getEntries());
  }, []);
  const [editingEntry, setEditingEntry] = useState<ProfileEntry>();

  const handleSave = (entry: ProfileEntry, isEditing: boolean) => {
    saveEntry(entry);
    setEntries(getEntries());
    setEditingEntry(undefined);
    toast.success(isEditing ? "Changes saved successfully!" : "Profile added successfully!");
  };

  const handleDelete = (id: string) => {
    deleteEntry(id);
    setEntries(getEntries());
    if (editingEntry?.id === id) setEditingEntry(undefined);
    toast.error("Profile deleted successfully.");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-7 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Profiles
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Create and manage saved profile entries.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
            <Users className="h-4 w-4" />
            {entries.length} {entries.length === 1 ? "profile" : "profiles"}
          </div>
        </header>
        <section
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
          aria-labelledby="profile-form-heading"
        >
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              {editingEntry ? (
                <ClipboardList className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </div>
            <div>
              <h2
                id="profile-form-heading"
                className="text-lg font-semibold text-slate-900"
              >
                {editingEntry ? "Edit profile" : "Add profile"}
              </h2>
              <p className="text-sm text-slate-500">
                {editingEntry
                  ? "Update the information below."
                  : "Fill in the details to create a profile."}
              </p>
            </div>
          </div>
          <ProfileForm
            initialData={editingEntry}
            onSave={handleSave}
            onCancel={() => setEditingEntry(undefined)}
          />
        </section>
        <section className="mt-10" aria-labelledby="profiles-heading">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-7 w-1 rounded-full bg-blue-600" />
            <h2
              id="profiles-heading"
              className="text-xl font-semibold text-slate-900"
            >
              Saved profiles
            </h2>
          </div>
          {entries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Users className="h-5 w-5" />
              </div>
              <p className="mt-3 font-medium text-slate-700">No profiles yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Add your first profile using the form above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {entries.map((entry) => (
                <ProfileCard
                  key={entry.id}
                  entry={entry}
                  onEdit={() => setEditingEntry(entry)}
                  onDelete={() => handleDelete(entry.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
