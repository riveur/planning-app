import { Page, PageProps, Errors, ErrorBag } from "@inertiajs/inertia";

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  created_at: string;
  updated_at: string;
  role_id: number;
  group_id: number;
};

export type WithRole = {
  role?: Role
};

export type WithGroup = {
  group?: Group
}

export type Role = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type Group = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type Schedule = {
  id: number;
  date: string;
  start_morning_date: string;
  end_morning_date: string;
  start_afternoon_date: string;
  end_afternoon_date: string;
  created_at: string;
  updated_at: string;
};

export type WithEvent = {
  event: Event;
};

export type Event = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type WithGroups = {
  groups?: Group[]
};

export type WithSchedules = {
  schedules?: Schedule[]
};

export interface AuthenticatedInertiaPage extends Page<PageProps> {
  props: {
    errors: Errors & ErrorBag,
    auth: {
      user: User
    }
  }
};
