export interface Project {
  _id: string;
  name: string;
  description: string;
  status: string;
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
  };
}
