import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Paper, Container } from "@mui/material";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { delOffer } from "../../features/offers/action";
import { getFilter } from "./filters";

export default function OfferIndex() {
  const user = useSelector((state) => state.login.user);
  const owner = ["super", "employee"].includes(user?.role);

  const filter = getFilter(user);
  const list = useSelector((state) => state.offers).filter(filter);

  const dispatch = useDispatch();
  const remove = (id) => {
    if (owner) dispatch(delOffer({ id }));
  };

  const navigate = useNavigate();
  const view = (id = nanoid()) => {
    navigate("./" + id + "/edit");
  };

  const jobs = useSelector((state) => state.jobs);
  const getJobFromId = (id) => jobs.find((e) => e.id === id);

  return (
    <Container>
      <Stack gap={2}>
        <h1>Offers</h1>
        {list.map(({ id, JobId, createDate }, i) => (
          <Paper key={id}>
            <Stack direction="row">
              {owner ? <Button onClick={(e) => remove(id)}>X</Button> : null}
              <Container onClick={() => view(id)} style={{ cursor: "pointer" }}>
                <pre>{getJobFromId(JobId)?.title}</pre>
                <pre>{new Date(createDate).toLocaleString()}</pre>
              </Container>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
