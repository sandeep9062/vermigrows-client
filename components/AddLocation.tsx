"use client";
import React from "react";
import dynamic from "next/dynamic";
import {
  Select,
  TextInput,
  Paper,
  Title,
  Text,
  Grid,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import useCountries from "../lib/useCountries";

interface FormValues {
  country: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  address: string;
}

export interface PropertyDetails {
  country?: string;
  city?: string;
  address?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  coordinates?: {
    type: string;
    coordinates: [number, number];
  };
}

interface AddLocationProps<T> {
  propertyDetails: PropertyDetails;
  setPropertyDetails: React.Dispatch<
    React.SetStateAction<PropertyDetails | undefined>
  >;
  form: UseFormReturnType<T>;
}

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const AddLocation = <T extends FormValues>({
  propertyDetails,
  setPropertyDetails,
  form,
}: AddLocationProps<T>) => {
  const { getAll } = useCountries();
  const coords = propertyDetails?.coordinates?.coordinates;
  const mapLocation = coords ? { lat: coords[1], lng: coords[0] } : undefined;

  return (
    <Paper withBorder p="xl" radius="md" mt="lg">
      <Title order={4} mb="xs">
        Location Details
      </Title>
      <Text c="dimmed" mb="lg">
        Please provide the location details and pin it on the map.
      </Text>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Select
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll().map((country) => ({
              value: country.value,
              label: country.label,
            }))}
            {...form.getInputProps("country")}
            radius="md"
            size="md"
            styles={{ dropdown: { zIndex: 1301 } }}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            withAsterisk
            label="City"
            {...form.getInputProps("city")}
            radius="md"
            size="md"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            withAsterisk
            label="State"
            {...form.getInputProps("state")}
            radius="md"
            size="md"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            withAsterisk
            label="Pincode"
            {...form.getInputProps("pincode")}
            radius="md"
            size="md"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Landmark"
            {...form.getInputProps("landmark")}
            radius="md"
            size="md"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            withAsterisk
            label="Address"
            {...form.getInputProps("address")}
            radius="md"
            size="md"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Paper
            h={300}
            radius="md"
            withBorder
            className="overflow-hidden mt-4"
          >
            <Map
              location={mapLocation}
              setLocation={(coords) =>
                setPropertyDetails((prev) => ({
                  ...(prev || {}),
                  coordinates: {
                    type: "Point",
                    coordinates: [coords.lng, coords.lat],
                  },
                }))
              }
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default AddLocation;
