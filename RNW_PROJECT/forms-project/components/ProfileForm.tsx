"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import type { ProfileEntry } from "@/types/profile";
import ImageUpload from "./ImageUpload";

const cities = [
  "Bengaluru",
  "Chennai",
  "Delhi",
  "Hyderabad",
  "Kolkata",
  "Mumbai",
  "Surat",
  "New York",
  "London",
  "Toronto",
];

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  username: z.string().trim().min(1, "Username is required."),
  aboutMe: z
    .string()
    .trim()
    .min(12, "About me must be at least 12 characters."),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  profileImage: z.string().min(1, "Please upload a profile photo."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  initialData?: ProfileEntry;
  onSave: (entry: ProfileEntry, isEditing: boolean) => void;
  onCancel: () => void;
}

const emptyValues: ProfileFormValues = {
  firstName: "",
  lastName: "",
  username: "",
  aboutMe: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  profileImage: "",
};

const inputClassName =
  "w-full [&_input]:!border-gray-300 [&_input]:!bg-white [&_input]:!text-gray-900 [&_input]:!placeholder:text-gray-500 [&_input:focus]:!border-blue-500 [&_input:focus]:!ring-blue-500";

export default function ProfileForm({
  initialData,
  onSave,
  onCancel,
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData ?? emptyValues,
  });

  useEffect(() => {
    reset(initialData ?? emptyValues);
  }, [initialData, reset]);

  const profileImage = useWatch({ control, name: "profileImage" });

  const submitForm = (values: ProfileFormValues) => {
    onSave({ id: initialData?.id ?? crypto.randomUUID(), ...values }, !!initialData);
    if (!initialData) reset(emptyValues);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="First name" error={errors.firstName?.message}>
            <TextInput
              id="firstName"
              placeholder="First name"
              color={errors.firstName ? "failure" : "gray"}
              className={inputClassName}
              {...register("firstName")}
            />
          </Field>
          <Field label="Last name" error={errors.lastName?.message}>
            <TextInput
              id="lastName"
              placeholder="Last name"
              color={errors.lastName ? "failure" : "gray"}
              className={inputClassName}
              {...register("lastName")}
            />
          </Field>
          <Field label="Username" error={errors.username?.message}>
            <TextInput
              id="username"
              placeholder="Username"
              color={errors.username ? "failure" : "gray"}
              className={inputClassName}
              {...register("username")}
            />
          </Field>
          <Field label="City" error={errors.city?.message}>
            <select
              id="city"
              className={`w-full rounded-lg border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } bg-white px-3 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none`}
              {...register("city")}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </Field>
          <div className="md:col-span-2">
            <Field label="About me" error={errors.aboutMe?.message}>
              <Textarea
                id="aboutMe"
                rows={4}
                placeholder="Write a short introduction"
                color={errors.aboutMe ? "failure" : "gray"}
                className="border-gray-300! bg-white! text-gray-900! !placeholder:text-gray-500 focus:border-blue-500! focus:ring-blue-500!"
                {...register("aboutMe")}
              />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Street" error={errors.street?.message}>
              <TextInput
                id="street"
                placeholder="Street address"
                color={errors.street ? "failure" : "gray"}
                className={inputClassName}
                {...register("street")}
              />
            </Field>
          </div>
          <Field label="State" error={errors.state?.message}>
            <TextInput
              id="state"
              placeholder="State or region"
              color={errors.state ? "failure" : "gray"}
              className={inputClassName}
              {...register("state")}
            />
          </Field>
          <Field label="ZIP / postal code" error={errors.zip?.message}>
            <TextInput
              id="zip"
              placeholder="ZIP or postal code"
              color={errors.zip ? "failure" : "gray"}
              className={inputClassName}
              {...register("zip")}
            />
          </Field>
          <Field label="Country" error={errors.country?.message}>
            <TextInput
              id="country"
              placeholder="Country"
              color={errors.country ? "failure" : "gray"}
              className={inputClassName}
              {...register("country")}
            />
          </Field>
        </div>
        <ImageUpload
          value={profileImage}
          onChange={(image) =>
            setValue("profileImage", image, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          error={errors.profileImage?.message}
        />
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
          {initialData && (
            <Button
              type="button"
              color="gray"
              className="focus:ring-0! focus:outline-none"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            type="button"
            color="gray"
            className="focus:ring-0! focus:outline-none"
            onClick={() => reset(emptyValues)}
          >
            Reset form
          </Button>
          <Button
            type="submit"
            color="blue"
            className="focus:ring-0! focus:outline-none"
          >
            {initialData ? "Save changes" : "Add profile"}
          </Button>
        </div>
      </form>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1 block text-sm font-medium text-gray-900!">
        {label}
      </Label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
