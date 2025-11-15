"use client";

// Re-triggering linter to resolve hook errors
import React, { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Menu,
  Text,
  Divider,
  Group,
  Modal,
  TextInput,
  Button,
  Image,
  Stack,
  ActionIcon,
  Grid,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../services/authApi";
import { useUpdateProfileMutation } from "../services/userApi";
import { logoutSuccess as logoutAction, setUser } from "../store/authSlice";
import { toast } from "sonner";
import PhoneInput from "./ui/PhoneInput";
import { validateString } from "../lib/utils";
import AddLocation, { PropertyDetails } from "./AddLocation";
import { E164Number } from "libphonenumber-js/core";

import {
  Heart,
  CalendarDays,
  Home,
  LogOut,
  User as UserIcon,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";

interface User {
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  location?: PropertyDetails;
}

interface ProfileMenuProps {
  user: User;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState<PropertyDetails | undefined>(
    user?.location
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLButtonElement>(null);
  const [preview, setPreview] = useState<string | null>(user?.image || null);

  useEffect(() => {
    if (user?.image) {
      if (user.image.startsWith("http")) {
        setPreview(user.image);
      }
    }
  }, [user?.image]);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setLocation(user.location);
    }
  }, [user]);

  const form = useForm({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      country: user?.location?.country || "",
      city: user?.location?.city || "",
      address: user?.location?.address || "",
      state: user?.location?.state || "",
      pincode: user?.location?.pincode || "",
      landmark: user?.location?.landmark || "",
    },
    validate: {
      name: (value) => validateString(value),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) => validateString(value),
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
      state: (value) => validateString(value),
      pincode: (value) => validateString(value),
    },
  });

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      router.push("/auth");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleProfileUpdate = async () => {
    const {
      name,
      email,
      phone,
      country,
      city,
      address,
      state,
      pincode,
      landmark,
    } = form.values;
    const { hasErrors } = form.validate();
    if (hasErrors) {
      return toast.error("Please fill all the required fields");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append(
      "location",
      JSON.stringify({
        ...location,
        country,
        city,
        address,
        state,
        pincode,
        landmark,
      })
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const updatedUser = await updateProfile(formData).unwrap();
      dispatch(
        setUser({
          user: updatedUser,
          token: localStorage.getItem("token") || "",
        })
      );
      toast.success("Profile updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(
        "Failed to update profile:",
        JSON.stringify(error, null, 2)
      );
    }
  };

  if (!mounted) return null;

  return (
    <>
      <Menu
        width={250}
        position="bottom-end"
        shadow="xl"
        radius="lg"
        transitionProps={{ transition: "scale-y" }}
        styles={{
          dropdown: {
            zIndex: 1300,
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: 10,
          },
          item: {
            fontSize: 14,
            borderRadius: 8,
            padding: "9px 12px",
          },
        }}
      >
        <Menu.Target>
          <Avatar
            src={
              user?.image && user.image.startsWith("http")
                ? user.image
                : `http://localhost:9000/${user?.image?.replace(/\\/g, "/")}`
            }
            alt="user image"
            radius="xl"
            size="md"
            style={{
              cursor: "pointer",
              border: "2px solid rgba(255,255,255,0.5)",
            }}
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Group gap="sm" px="xs" py="xs">
            <Avatar
              src={
                user?.image && user.image.startsWith("http")
                  ? user.image
                  : `http://localhost:9000/${user?.image?.replace(/\\/g, "/")}`
              }
              radius="xl"
              size="lg"
            />
            <div>
              <Text fw={600} size="sm">
                {user?.name || "User"}
              </Text>
              <Text size="xs" c="dimmed">
                {user?.email}
              </Text>
              <Text size="xs" c="dimmed">
                {user?.phone}
              </Text>
            </div>
          </Group>

          <Divider my="xs" />

          <Menu.Item
            leftSection={<UserIcon size={18} />}
            onClick={() => {
              form.setValues({
                name: user?.name || "",
                email: user?.email || "",
                phone: user?.phone || "",
                country: user?.location?.country || "",
                city: user?.location?.city || "",
                address: user?.location?.address || "",
                state: user?.location?.state || "",
                pincode: user?.location?.pincode || "",
                landmark: user?.location?.landmark || "",
              });
              setIsModalOpen(true);
            }}
          >
            Profile
          </Menu.Item>

          <Divider my="xs" />

          <Menu.Item
            color="red"
            leftSection={<LogOut size={18} />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal
        zIndex={1300}
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Profile"
        centered
        radius="lg"
        overlayProps={{ opacity: 0.1, blur: 8 }}
        size="xl"
        styles={{
          title: { fontSize: 24, fontWeight: 700 },
          body: { paddingTop: 20 },
        }}
      >
        <form onSubmit={form.onSubmit(handleProfileUpdate)}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper withBorder radius="md" p="sm" className="text-center">
                <Dropzone
                  onDrop={(files) => {
                    setImageFile(files[0]);
                    setPreview(URL.createObjectURL(files[0]));
                  }}
                  onReject={() => toast.error("Invalid image")}
                  maxSize={3 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                  radius="50%"
                  className="w-40 h-40 mx-auto border-dashed hover:border-blue-500 transition-all duration-300 flex justify-center items-center"
                >
                  <Stack align="center" gap="xs">
                    {preview ? (
                      <div className="relative group">
                        <Avatar src={preview} size={140} radius="50%" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload
                            size={40}
                            strokeWidth={1.5}
                            className="text-white"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload size={50} strokeWidth={1.5} color="#495057" />
                        <Text size="xs" c="dimmed" ta="center">
                          Click to upload or drag & drop
                        </Text>
                      </>
                    )}
                  </Stack>
                </Dropzone>
                {preview && (
                  <Button
                    size="xs"
                    variant="light"
                    color="red"
                    onClick={() => {
                      setPreview(null);
                      setImageFile(null);
                    }}
                    className="mt-2"
                  >
                    Remove
                  </Button>
                )}
                <Text size="xs" c="dimmed" mt="sm">
                  JPG, PNG, WEBP no more than 3MB.
                </Text>
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="md">
                <TextInput
                  label="Name"
                  required
                  radius="md"
                  size="md"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Email"
                  required
                  type="email"
                  radius="md"
                  size="md"
                  {...form.getInputProps("email")}
                />
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Phone Number *
                  </label>
                  <PhoneInput
                    placeholder="Phone Number"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus-outline-none focus:ring-2 focus:ring-indigo-500"
                    defaultCountry="IN"
                    required
                    value={form.values.phone}
                    onChange={(value: E164Number | undefined) =>
                      form.setFieldValue("phone", value || "")
                    }
                  />
                </div>
              </Stack>
            </Grid.Col>
            <Grid.Col span={12}>
              <AddLocation
                form={form}
                propertyDetails={location || {}}
                setPropertyDetails={setLocation}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Button
                type="submit"
                loading={isLoading}
                fullWidth
                mt="md"
                radius="md"
                size="md"
              >
                Update Profile
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
    </>
  );
};

export default ProfileMenu;
