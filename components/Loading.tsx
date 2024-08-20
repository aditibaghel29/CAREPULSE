import { Progress } from "@/components/ui/progress";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-center items-center gap-4 p-4">
        <div className="w-64 h-6 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-48 h-6 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-72 h-6 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default Loading;


