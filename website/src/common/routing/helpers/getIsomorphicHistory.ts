import { IS_SERVER } from "../../../modules/core/constants"
import { createBrowserHistory, Location } from "history"

export const getIsomorphicHistory = () => {
  if (IS_SERVER)
    return {
      listen: () => {},
      push: () => {},
      replace: () => {},
      location: {
        hash: "",
        pathname: "/",
        search: "",
      } as Location,
    }

  return createBrowserHistory()
}
