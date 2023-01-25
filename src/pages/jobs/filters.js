import { applyOffer, cancelOffer } from "../../features/offers/action";

export function getFilter(user) {
  return {
    super: () => true,
    employer: (j) => j.OwnerId === user?.id,
    employee: (j) => j.expireDate > Date.now(),
    anon: () => false,
  }[user?.role ?? "anon"];
}

export function getActions(user, hasOffer) {
  return {
    super: {},
    employer: {},
    employee: hasOffer ? { Cancel: cancelOffer } : { Apply: applyOffer },
    anon: {},
  }[user?.role ?? "anon"];
}
