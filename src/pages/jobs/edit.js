import React, { useMemo, useEffect } from "react";
import { Button, Stack, Box, Checkbox, FormControlLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import useText, { useMultilineText } from "../../utils/hooks/useText";
import { useDispatch, useSelector } from "react-redux";
import { getActions, getFilter } from "./filters";
import { setJob } from "../../features/jobs/action";
import { useDate } from "../../utils/hooks/useDateTime";
import { Skills, EditSkills } from "../Skills";
import { useStateMemo } from "../../utils/hooks/useStateMemo";
import { matchingSkills } from "./hasSkill";

export default function Job() {
  let { id } = useParams();

  const selectLoggedInUser = (state) =>
    state.login.user || { id: 0, name: "Anon", role: "anon" };
  const user = useSelector(selectLoggedInUser);

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

  const selectAllOffers = (state) => state.offers;
  const selectJobById = (id) => (state) => state.jobs.find((f) => f.id === id);

  const offers = useSelector(selectAllOffers);
  const form = useSelector(selectJobById(id));

  const hasOffer =
    form && offers.find((o) => o.UserId === user.id && o.JobId === form.id);
  const actions = getActions(user, hasOffer);

  const isSuper = ["super"].includes(user?.role);
  const isEmployer = ["employer"].includes(user?.role);
  const isEmployee = ["employee"].includes(user?.role);
  const isExisting = !!form;
  const canRecommend = isSuper && isExisting;
  const canEdit =
    (isSuper && isExisting) ||
    (isEmployer && (!isExisting || form.OwnerId === user?.id));
  const canView =
    canEdit ||
    canRecommend ||
    (isEmployee && isExisting && form.recommend.includes(user?.id));

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
            <JobEdit
              form={form ?? defaults}
              onChange={onChange}
              canRecommend={canRecommend}
            />
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

function JobEdit({ form, onChange, canRecommend }) {
  const [title, Title] = useText(form.title, { placeholder: "Title" });
  const [expireDate, ExpireDate] = useDate(form.expireDate, {
    label: "Expire Date",
  });
  const [description, Description] = useMultilineText(form.description, {
    placeholder: "Description",
  });
  const [skills, setSkills] = useStateMemo(form.skills);
  const [recommend, setRecommend] = useStateMemo(form.recommend || []);
  const modified = {
    ...form,
    title,
    expireDate,
    description,
    skills,
    recommend,
  };

  const job = form;
  const employees = useSelector((state) => state.users)
    .filter((u) => u.profile?.verified)
    .map((u) => ({
      ...u,
      matchingSkills: matchingSkills(u.profile.skills, job.skills),
    }))
    .sort((a, b) => a.matchingSkills.length - b.matchingSkills.length);

  useEffect(() => {
    console.log("onChange", description, modified);
    if (onChange) onChange(modified);
  }, [title, expireDate, description, skills, recommend]);

  const users = useSelector((state) => state.users);
  const getNameOfUserId = (id) => users.find((u) => u.id === id)?.name;

  return (
    <>
      {onChange ? Title : <h2>{title}</h2>}
      {onChange ? ExpireDate : <h3>{expireDate}</h3>}
      {onChange ? Description : <p>{description}</p>}
      <EditSkills skills={[skills, setSkills]} />

      <h3>Recommended</h3>
      {canRecommend ? (
        employees.map((employee, i) => (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  label={employee.name}
                  checked={recommend.includes(employee.id)}
                  onChange={(e) => {
                    console.log(e.target.checked);
                    setRecommend((r) => {
                      const rr = r.filter((e) => e !== employee.id);
                      return !e.target.checked ? rr : [...rr, employee.id];
                    });
                  }}
                />
              }
              label={employee.name}
            />
          </>
        ))
      ) : (
        <>{recommend.map((id) => id + getNameOfUserId(id).name)}</>
      )}
    </>
  );
}
