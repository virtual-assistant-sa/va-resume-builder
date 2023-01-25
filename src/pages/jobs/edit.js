import React, { useMemo, useEffect } from "react";
import { Button, Stack, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import useText, { useMultilineText } from "../../utils/useText";
import { useDispatch, useSelector } from "react-redux";
import { getActions, getFilter } from "./filters";
import { setJob } from "../../features/jobs/action";
import { useDate } from "../../utils/useDateTime";
import { Skills, EditSkills } from "../Skills";
import { useStateMemo } from "../../utils/useStateMemo";

export default function Job() {
  let { id } = useParams();

  const user = useSelector((state) => state.login.user) || { role: "anon" };
  const canEdit = ["super", "employer"].includes(user?.role);
  const canView = canEdit || ["employee"].includes(user?.role);

  const date7days = useMemo(() => Date.now() + 7 * 24 * 60 * 60 * 1000, []);
  const defaults = {
    id,
    title: "",
    expireDate: date7days,
    description: "",
    OwnerId: user?.id,
    skills: [],
  };

  const filter = getFilter(user);

  const list = useSelector((state) => state.jobs).filter(filter);
  const offers = useSelector((state) => state.offers);
  const form = list.find((f) => f.id === id);

  const hasOffer =
    form && offers.find((o) => o.UserId === user.id && o.JobId === form.id);
  const actions = getActions(user, hasOffer);

  const dispatch = useDispatch();
  const doAction = (f) => {
    dispatch(f(form, user));
  };
  const onChange = (modified) => {
    dispatch(setJob(modified, user));
  };

  if (canView)
    return (
      <Box padding={3}>
        <Stack gap={2}>
          <h1>Job</h1>
          {canEdit ? (
            <JobEdit form={form ?? defaults} onChange={onChange} />
          ) : (
            <JobView form={form ?? defaults} />
          )}

          {Object.entries(actions).map(([name, f]) => (
            <Button key={name} onClick={() => doAction(f)}>
              {name}
            </Button>
          ))}
        </Stack>
      </Box>
    );
}

function JobView({ form: { title, expireDate, description, skills } }) {
  return (
    <>
      <h2>{title}</h2>
      <h3>{new Date(expireDate).toLocaleString()}</h3>
      <p>{description}</p>
      <Skills skills={skills} />
    </>
  );
}

function JobEdit({ form, onChange }) {
  const [title, Title] = useText(form.title, { placeholder: "Title" });
  const [expireDate, ExpireDate] = useDate(form.expireDate, {
    label: "Expire Date",
  });
  const [description, Description] = useMultilineText(form.description, {
    placeholder: "Description",
  });
  const [skills, setSkills] = useStateMemo(form.skills);
  const modified = { ...form, title, expireDate, description, skills };

  useEffect(() => {
    if (onChange) onChange(modified);
  }, [title, expireDate, description, skills]);

  return (
    <>
      {onChange ? Title : <h2>{title}</h2>}
      {onChange ? ExpireDate : <h3>{expireDate}</h3>}
      {onChange ? Description : <p>{description}</p>}
      <EditSkills skills={[skills, setSkills]} />
    </>
  );
}
