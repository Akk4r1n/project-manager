export interface Project {
  uuid: string;
  title: string;
  description: string;
  createdAt: Date;
  ownerEmail: string;
  ownerName: string;
  chatUuid: string;
}

export interface Task {
  uuid: string;
  title: string;
  description: string;
  createdAt: Date;
  projectUuid: string;
  plannedMinutes?: number;
  actualMinutes?: number;
}
