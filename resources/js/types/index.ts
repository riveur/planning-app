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
};

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
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
};

export type WithCategory = {
  category: Category
};

export type WithEvent = {
  event: Event;
};

export type Event = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

export type WithOwner = {
  owner: User
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
    },
    can: {
      viewAnyEvent: boolean,
      viewAnyUser: boolean,
      viewAnyGroup: boolean,
      viewAnyRole: boolean,
      viewAnyCategory: boolean,
    }
  }
};

export interface LaravelPaginationResponse<T> {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  from: number;
  to: number;
  data: T[];
};
