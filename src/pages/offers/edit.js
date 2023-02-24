import React from "react";
import { Button, Stack, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActions, getFilter } from "./filters";
import { selectActiveUser, selectAllUsers } from "../../features/users/select";

export default function Offer() {
  let { id } = useParams();

  const user = useSelector(selectActiveUser);
  const canEdit = ["super", "employer"].includes(user?.role);
  const canView = canEdit || ["employee"].includes(user?.role);

  const filter = getFilter(user);
  const actions = getActions(user);

  const defaults = {};

  const list = useSelector((state) => state.offers).filter(filter);
  const form = list.find((f) => f.id === id);

  const dispatch = useDispatch();
  const doAction = (f) => {
    dispatch(f(form, user));
  };

  const users = useSelector(selectAllUsers);
  const getUserFromId = (id) => users.find((e) => e.id === id);

  if (canView)
    return (
      <Container>
        <Stack gap={2}>
          <h1>Offer</h1>
          <OfferView form={form ?? defaults} getUserFromId={getUserFromId} />
          {Object.entries(actions).map(([name, f]) => (
            <Button onClick={() => doAction(f)}>{name}</Button>
          ))}
        </Stack>
      </Container>
    );
}

function OfferView({ form, getUserFromId }) {
  const ownerName = getUserFromId(form.OwnerId)?.name;
  const workerName = getUserFromId(form.UserId)?.name;
  const createDate = form.createDate;

  return (
    <>
      <h2>Employer: {ownerName}</h2>
      <h2>Employee: {workerName}</h2>
      <h3>Date: {new Date(createDate).toLocaleString()}</h3>
    </>
  );
}
