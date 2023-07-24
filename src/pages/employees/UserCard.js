import React from "react";
import { Button, Stack, Container, Card, CardContent } from "@mui/material";
import { Header } from "../../utils/components/Header";
import { onClick } from "../../utils/onClick";

export function UserCard({
  user: {
    id,
    email,
    profile: { verified },
  },
  remove,
  view,
  admin,
}) {
  return (
    <Card onClick={onClick(() => view(id))} style={{ cursor: "pointer" }}>
      <CardContent>
        <Stack direction="row">
          {admin ? (
            <Button onClick={onClick(() => remove(id))}>X</Button>
          ) : null}
          <Container>
            <Header title={email} chips={[verified && "VERIFIED"]} />
          </Container>
        </Stack>
      </CardContent>
    </Card>
  );
}
