import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Paper, Typography, Box, Grid } from "@mui/material";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { delJob } from "../../features/jobs/action";
import { getFilter } from "./filters";
import { formatDistanceToNow } from "date-fns";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Header } from "../../utils/components/Header";
import { hasSkill } from "./hasSkill";

export default function JobIndex() {
  const user = useSelector((state) => state.login.user);
  const owner = ["super", "employer"].includes(user?.role);
  const showMatchingSkills = ["employee"].includes(user?.role);

  const filter = getFilter(user);

  const offers = useSelector((state) => state.offers);
  const list = useSelector((state) => state.jobs)
    .filter(filter)
    .sort((b, a) => a.modifyDate - b.modifyDate);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const remove = (id) => {
    if (owner) dispatch(delJob({ id }));
  };
  const view = (id = nanoid()) => {
    navigate("./" + id + "/edit");
  };

  return (
    <Box padding={3}>
      <Stack gap={2}>
        <h1>Jobs</h1>
        {owner ? (
          <Button variant="contained" onClick={() => view()}>
            +
          </Button>
        ) : null}
        <JobList
          {...{ list, remove, view, owner, user, offers, showMatchingSkills }}
        />
      </Stack>
    </Box>
  );
}

function JobList({
  list,
  remove,
  view,
  owner,
  user,
  offers,
  showMatchingSkills,
}) {
  return (
    <>
      {list.map((form, i) => (
        <Paper key={form.id}>
          <Stack direction="row">
            {owner ? <Button onClick={(e) => remove(form.id)}>X</Button> : null}
            <Box
              onClick={() => view(form.id)}
              style={{ cursor: "pointer" }}
              sx={{ width: 1 }}
            >
              <JobCard
                user={user}
                job={form}
                offers={offers}
                showMatchingSkills={showMatchingSkills}
              />
            </Box>
          </Stack>
        </Paper>
      ))}
    </>
  );
}

function JobCard({ job, user, offers, showMatchingSkills = true }) {
  const { title, expireDate } = job;
  const matching = job.skills.filter(hasSkill(user));

  const hasOffer = offers.find(
    (o) => o.UserId === user.id && o.JobId === job.id
  );
  const isExpired = job.expireDate < Date.now();
  const expireDistance = formatDistanceToNow(expireDate);

  return (
    <Card>
      <CardContent>
        <Header
          title={title}
          chips={[hasOffer && "APPLIED", isExpired && "EXPIRED"]}
        />
        <Typography>
          {isExpired
            ? `expired ${expireDistance} ago`
            : `expires in ${expireDistance}`}
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <h5>Skills</h5>
            {job.skills.map((s) => (
              <Typography key={s.id}>{s.text}</Typography>
            ))}
          </Grid>
          {showMatchingSkills && matching.length ? (
            <Grid item xs={6}>
              <h5>Matching skills</h5>
              {matching.map((s) => (
                <Typography key={s.id} color="primary">
                  {s.text}
                </Typography>
              ))}
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
    </Card>
  );
}
