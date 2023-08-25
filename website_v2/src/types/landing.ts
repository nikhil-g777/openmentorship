import type {AuthenticationError} from "../types/authentication";

type LoginHandler = {
  error: string;
  setSuccessAlert: (value: string, timer: number) => void;
  setAuthenticationError: (value: AuthenticationError | null) => void;
  setRouteActionLoading: (value: boolean) => void;
};

export type {LoginHandler};
