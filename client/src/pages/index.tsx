import { lazy } from "react";

export const Home = lazy(() => import("./home"));
export const Chats = lazy(() => import("./chats"));
export const Requests = lazy(() => import("./Requests"));
export const Profile = lazy(() => import("./Profile"));
export const PostDetails = lazy(() => import("./PostDetails"));
export const Settings = lazy(() => import("./settings"));
export const UpdateProfile = lazy(() => import("./settings/UpdateProfile"));
export const Notification = lazy(() => import("./settings/Notification"));
