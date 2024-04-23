export interface UserLoginRequest {
  email: string;
  password_plain: string;
}

export interface UserResponse {
  email: string;
  name: string;
}

export interface UserRegisterRequest {
  email: string;
  name: string;
  password_plain: string;
}

export interface ProjectResponse {
  uuid: string;
  title: string;
  description: string;
  created_at: Date;
  owner_user: UserResponse;
  chat_uuid: string;
  messages_count: number;
  tasks_count: number;
  member_users: UserResponse[];
}

export interface ProjectCreateRequest {
  title: string;
  description: string;
}

export interface ProjectUpdateRequest {
  title: string;
  description: string;
}

export interface ProjectMemberResponse {
  project_uuid: string;
  user_email: string;
}

export interface ProjectMemberCreateRequest {
  user_emails: string[];
}

export interface ProjectMemberDeleteRequest {
  user_emails: string[];
}

export interface TaskResponse {
  uuid: string;
  title: string;
  description: string;
  project_uuid: string;
  created_at: Date;
  planned_minutes?: number;
  actual_minutes?: number;
}

export interface TaskCreateRequest {
  title: string;
  description: string;
  planned_minutes?: number;
}

export interface TaskUpdateRequest {
  title: string;
  description: string;
  planned_minutes?: number;
  actual_minutes?: number;
}

export interface ChatResponse {
  uuid: string;
}

export interface MessageResponse {
  uuid: string;
  chat_uuid: string;
  content: string;
  created_at: Date;
  author_user: UserResponse;
}

export interface MessageCreateRequest {
  content: string;
}
