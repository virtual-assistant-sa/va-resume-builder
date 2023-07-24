import React from "react";
import { Stack } from "@mui/material";
import { TextField } from "../../utils/forms/TextField";
import { DateField } from "../../utils/forms/DateField";
import { ListField } from "../../utils/forms/ListField";

export default function ProfileEdit({ value, onChange }) {
  return (
    <Stack gap={2}>
      <h1>Profile</h1>
      <TextField
        {...{
          value: value.intro,
          onChange: (intro) => onChange({ ...value, intro }),
          placeholder: "Intro",
          rows: 5,
          multiline: true,
        }}
      />
      <ListField
        {...{
          label: "Skills",
          value: value.skills,
          onChange: (skills) => onChange({ ...value, skills }),
          defaultValue: { text: "" },
        }}
      >
        {({ onChange, value }) => (
          <Stack gap={1} p={1}>
            <TextField
              {...{
                value: value.text,
                onChange: (text) => onChange({ ...value, text }),
                placeholder: "Skill",
              }}
            />
          </Stack>
        )}
      </ListField>
      <ListField
        {...{
          label: "Education",
          value: value.educations,
          onChange: (educations) => onChange({ ...value, educations }),
          defaultValue: { start: 0, end: 0, what: "", where: "" },
        }}
      >
        {({ onChange, value }) => (
          <Stack gap={1} p={1}>
            <DateField
              {...{
                value: value.start,
                onChange: (start) => onChange({ ...value, start }),
                placeholder: "Start",
              }}
            />
            <DateField
              {...{
                value: value.end,
                onChange: (end) => onChange({ ...value, end }),
                placeholder: "End",
              }}
            />
            <TextField
              {...{
                value: value.what,
                onChange: (what) => onChange({ ...value, what }),
                placeholder: "What",
              }}
            />
            <TextField
              {...{
                value: value.where,
                onChange: (where) => onChange({ ...value, where }),
                placeholder: "Where",
              }}
            />
          </Stack>
        )}
      </ListField>
      <ListField
        {...{
          label: "Experience",
          value: value.experiences,
          onChange: (experiences) => onChange({ ...value, experiences }),
          defaultValue: {
            start: 0,
            end: 0,
            responsibilities: [],
            where: { business: "", country: "" },
          },
        }}
      >
        {({ onChange, value }) => (
          <Stack gap={1} p={1}>
            <DateField
              {...{
                value: value.start,
                onChange: (start) => onChange({ ...value, start }),
                placeholder: "Start",
              }}
            />
            <DateField
              {...{
                value: value.end,
                onChange: (end) => onChange({ ...value, end }),
                placeholder: "End",
              }}
            />
            <ListField
              {...{
                label: "Responsibilities",
                value: value.responsibilities,
                onChange: (responsibilities) =>
                  onChange({ ...value, responsibilities }),
                defaultValue: { text: "" },
              }}
            >
              {({ onChange, value }) => (
                <Stack gap={1} p={1}>
                  <TextField
                    {...{
                      value: value.text,
                      onChange: (text) => onChange({ ...value, text }),
                      placeholder: "Responsibility",
                    }}
                  />
                </Stack>
              )}
            </ListField>
            <TextField
              {...{
                value: value.where.business,
                onChange: (business) =>
                  onChange({
                    ...value,
                    where: { ...value.where, business },
                  }),
                placeholder: "Business",
              }}
            />
            <TextField
              {...{
                value: value.where.country,
                onChange: (country) =>
                  onChange({
                    ...value,
                    where: { ...value.where, country },
                  }),
                placeholder: "Country",
              }}
            />
          </Stack>
        )}
      </ListField>
      <ListField
        {...{
          label: "Hobbies",
          value: value.hobbies,
          onChange: (hobbies) => onChange({ ...value, hobbies }),
          defaultValue: { text: "" },
        }}
      >
        {({ onChange, value }) => (
          <Stack gap={1} p={1}>
            <TextField
              {...{
                value: value.text,
                onChange: (text) => onChange({ ...value, text }),
                placeholder: "Hobby",
              }}
            />
          </Stack>
        )}
      </ListField>
    </Stack>
  );
}
