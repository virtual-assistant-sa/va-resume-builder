import { nanoid } from "nanoid";
import { SET_OFFER, DEL_OFFER, CANCEL_OFFER } from "./type";

export const setOffer = (payload) => ({
  type: SET_OFFER,
  payload,
});
export const delOffer = (payload) => ({
  type: DEL_OFFER,
  payload,
});

export const cancelOffer = (job, user) => ({
  type: CANCEL_OFFER,
  payload: { JobId: job.id, UserId: user.id },
});

export const applyOffer = (job, user) => ({
  type: SET_OFFER,
  payload: {
    id: nanoid(),
    JobId: job.id,
    OwnerId: job.OwnerId,
    UserId: user.id,
    createDate: Date.now(),
  },
});
