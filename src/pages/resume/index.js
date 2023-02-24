import React, { useState } from "react";
import Resume from "./Resume";
import Builder from "./Builder";
import { Box, Fab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/users/action";
import { DebounceField } from "../../utils/forms/DebounceField";
import { selectActiveUser, selectAllUsers } from "../../features/users/select";

const style = {
  bottom: "auto",
  right: 20,
  top: 20,
  left: "auto",
  position: "absolute",
};

export default function Switcher() {
  const [preview, setPreview] = useState(false);
  const user = useSelector(selectActiveUser);
  const id = user?.id;

  const employee = useSelector(selectAllUsers).find((u) => u.id === id);

  const dispatch = useDispatch();
  const set = (profile) => dispatch(setUser({ id: employee.id, profile }));

  if (employee?.profile)
    return (
      <Box padding={3} style={{ position: "relative" }}>
        <Fab
          variant="extended"
          style={style}
          onClick={() => setPreview((preview) => !preview)}
        >
          {preview ? "Edit" : "Preview"}
        </Fab>
        {preview ? (
          <Resume value={{ ...employee.profile, name: employee.name }} />
        ) : (
          <DebounceField value={employee.profile} onChange={set}>
            {(props) => <Builder {...props} />}
          </DebounceField>
        )}
      </Box>
    );
}
