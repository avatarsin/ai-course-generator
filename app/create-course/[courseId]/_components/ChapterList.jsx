import { Check, Clock } from "lucide-react";
import EditChapters from "./EditChapters";

function ChapterList({ course, refreshData, edit = true }) {
  return (
    <div className="mt-3">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.course?.chapters.map((chapter, index) => (
          <div className="border p-5 rounded-lg mb-3 flex justify-between items-center">
            <div className="flex gap-5 items-center" key={index}>
              <h2 className="bg-primary h-10 w-10 text-white rounded-full p-2 text-center">
                {index + 1}
              </h2>
              <div>
                <h2 className="font-medium text-lg">
                  {chapter?.name}{" "}
                  {edit && (
                    <EditChapters
                      refreshData={refreshData}
                      course={course}
                      index={index}
                    />
                  )}
                </h2>
                <p className="text-sm text-gray-500">{chapter?.about}</p>
                <p className="flex gap-2 text-primary items-center">
                  <Clock />
                  {chapter?.duration}
                </p>
              </div>
            </div>
            <Check className="text-4xl text-gray-300 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
