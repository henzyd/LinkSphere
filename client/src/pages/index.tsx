import { lazy } from "react";

export const Home = lazy(() => import("./Home"));
export const Chats = lazy(() => import("./Chats"));
export const Requests = lazy(() => import("./Requests"));
export const Profile = lazy(() => import("./Profile"));
export const PostDetails = lazy(() => import("./PostDetails"));
export const Settings = lazy(() => import("./Settings"));
