import { Skeleton } from "@mui/material";

const Chat = () => {
  return (
    <div className="p-4 h-screen flex flex-col gap-6">
      <Skeleton variant="rounded" width="100%" height={60} />
      <div className="grid grid-cols-[1fr,3fr,1fr] gap-8 flex-auto">
        <div className="h-[interit] grid grid-rows-2 gap-6 flex-auto">
          <Skeleton variant="rounded" width="100%" height="100%" />
          <Skeleton variant="rounded" width="100%" height="100%" />
        </div>
        <Skeleton variant="rounded" width="100%" height="inherit" />
        <Skeleton variant="rounded" width="100%" height="inherit" />
      </div>
    </div>
  );
};

export default Chat;
