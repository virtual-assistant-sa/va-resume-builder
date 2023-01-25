import { SET_JOB, DEL_JOB } from "./type";

export const setJob = (job, user) => ({
  type: SET_JOB,
  payload: { ...job, OwnerId: user?.id, modifyDate: Date.now() },
});
export const delJob = (payload) => ({
  type: DEL_JOB,
  payload,
});
