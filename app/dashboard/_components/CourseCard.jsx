import { BookOpen, EllipsisVerticalIcon } from "lucide-react";
import Image from "next/image";
import DropDownOption from "./DropDownOption";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseCard({ course, refreshData, displayUser = false }) {
  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList?.id });

    if (resp) {
      refreshData();
    }
  };

  return (
    <div className="shadow-sm rounded-lg flex flex-col gap-1 border p-2 hover:scale-105 cursor-pointer transition-all mt-4">
      <Link href={`/course/${course?.courseId}`}>
        <Image
          src={course?.courseBanner}
          alt="course thumbnail"
          height={200}
          width={300}
          className="w-full h-[200px] object-cover rounded-md"
        />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg flex justify-between ">
          {course?.courseOutput?.course?.name}{" "}
          {!displayUser && (
            <DropDownOption handleOnDelete={() => handleOnDelete()}>
              <EllipsisVerticalIcon />
            </DropDownOption>
          )}
        </h2>

        <p className="text-sm text-gray-400">{course?.category}</p>

        <div className="flex items-center justify-between">
          <h2 className="flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm">
            <BookOpen /> {course?.courseOutput?.noOfChapters} chapters
          </h2>
          <h2 className="text-sm bg-purple-50 text-primary p-1 rounded-sm">
            {course?.level}
          </h2>
        </div>

        {displayUser && (
          <div className="flex gap-2 items-center mt-2">
            <Image
              src={course?.userProfileImage}
              alt="user image"
              width={35}
              height={35}
              className="rounded-full"
            />
            <h2>{course?.userName}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
