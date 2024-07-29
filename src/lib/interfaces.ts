export interface Education {
  entity: string;
  title: string;
  description: string;
  startyear: number;
  finishyear: number;
}

export interface Experience {
  entity: string;
  description: string;
  startyear: number;
  finishyear: number;
  role: string;
  tasks: [];
}
