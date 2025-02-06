import { rest } from "msw";
import { cmsMockData } from "../Utilities/cmsMockData";

export const handlers = [
  rest.get(
    "/api/employees",
    (req, res, ctx) => res(ctx.status(200), ctx.json(cmsMockData))
  )
];
export default handlers;