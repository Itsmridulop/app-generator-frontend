import { Project } from "./projectType";

export interface User {
  _id: string;
  email: string;
  name: string;
  projects: Project[];
}

export interface UserResponse {
  data: User;
  token: string;
}
