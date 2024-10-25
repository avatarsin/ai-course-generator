import { Clock } from "lucide-react";

function ChapterListCard({ chapter, index }) {
  return (
    <div className="grid grid-cols-5 p-3 items-center border-b">
      <div>
        <h2 className="p-2 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full text-center">
          {index + 1}
        </h2>
      </div>
      <div className="col-span-4">
        <h2 className="font-medium">{chapter?.name}</h2>
        <h2 className="flex items-center gap-2 text-sm text-primary">
          <Clock />
          {chapter?.duration}
        </h2>
      </div>
    </div>
  );
}

export default ChapterListCard;
