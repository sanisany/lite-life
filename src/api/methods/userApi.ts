import type { Method } from "alova";
import {alovaInstance, mockAlovaInstance} from "@/api/index";
import type { LoginRequset, TokenResponse, UserInfoResponse } from "@/types/api/user";

const alovaIns = import.meta.env.DEV ? mockAlovaInstance : alovaInstance
const apiPrefix = import.meta.env.VITE_API_PREFIX;

// export const login = (
//   email: string,
//   credential: string,
//   type: string
// ): Method => {
//   return alovaIns.Post(
//     `${apiPrefix}/login/${type}`,
//     {
//       email,
//       credential,
//     },
//     {
//       name: "login:" + email,
      
//     }
//   );
// };

export const login = (loginRequset: LoginRequset) => alovaIns.Post<TokenResponse>(
    `${apiPrefix}/login/${loginRequset.type}`,
    {
      email : loginRequset.email,
      credential : loginRequset.credential,
    },
    {
      name: "login"
      
    }
  );

export const register = (email: string, password: string, code: string) => {
  return alovaIns.Post(
    `${apiPrefix}/register`,
    {
      email,
      password,
      code,
    },
    {
      name: "register:" + email,
    }
  );
};

export const forgetPassword = (
  email: string,
  code: string,
  newPassword: string
) => {
  return alovaIns.Post(
    `${apiPrefix}/forget`,
    {
      email,
      code,
      newPassword,
    },
    {
      name: "forget:" + email,
    }
  );
};

export const sendCaptcha = (email: string, type: string) => {
  return alovaIns.Post(
    `${apiPrefix}/captcha`,
    {
      type: type,
      cemail: email,
    },
    {
      name: "get captcha:" + email,
    }
  );
};

export const getUserInfo = () => {
  return alovaIns.Get<UserInfoResponse>(
    `${apiPrefix}/user/info`,
    {
      name: "GET user info",
    }
  )
}
