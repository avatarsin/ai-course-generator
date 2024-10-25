"use client";

import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));
    console.log(result);
    setCourse(result[0]);

    GetSelectedChapterContent(0);
  };

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters?.chapterId, chapterId),
          eq(Chapters?.courseId, course?.courseId)
        )
      );
    console.log(result, course, Chapters);
    setChapterContent(result[0]);
  };

  return (
    <div>
      <div className="fixed md:w-72 hidden md:!block h-screen bg-blue-50 shadow-sm border-r overflow-scroll">
        <h2 className="font-medium text-lg bg-primary p-3 text-white">
          {course?.courseOutput?.course?.name}
        </h2>
        <div>
          {course?.courseOutput?.course?.chapters.map((chapter, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
              }}
              className={`cursor-pointer hover:bg-purple-50 ${
                selectedChapter?.name === chapter?.name && "bg-purple-50"
              }`}
            >
              <ChapterListCard index={index} chapter={chapter} />
            </div>
          ))}
        </div>
      </div>

      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;
