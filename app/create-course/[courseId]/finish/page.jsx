"use client";

import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { and, eq } from "drizzle-orm";
import { ClipboardEditIcon } from "lucide-react";

function FinishScreen({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList?.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    console.log(result);
    setCourse(result[0]);
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">
        Congrats! Your course is ready
      </h2>
      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <h2 className="mt-3">Course URL:</h2>
      <h2 className="text-center text-gray-400 border p-2 rounded-md flex gap-5 items-center justify-center">
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
        <ClipboardEditIcon
          className="h-5 w-5 cursor-pointer"
          onClick={async () =>
            await navigator.clipboard.writeText(
              "https://ai-course-generator-woad.vercel.app/" +
                "/course/" +
                course?.courseId +
                "/start"
            )
          }
        />
      </h2>
    </div>
  );
}

export default FinishScreen;
