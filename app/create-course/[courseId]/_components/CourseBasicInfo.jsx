import { Button } from "@/components/ui/button";
import { Puzzle } from "lucide-react";
import Image from "next/image";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState();

  /**
   *Select file and upload it to firebase
   * @param {*} e
   */

  useEffect(() => {
    if (course) setSelectedFile(course?.courseBanner || "/placeholder.png");
  }, [course]);

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    const fileName = Date.now() + ".jpeg";
    const storageRef = ref(storage, "ai-course/" + fileName);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Upload file completed");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log(downloadURL);
          await db
            .update(CourseList)
            .set({
              courseBanner: downloadURL,
            })
            .where(eq(CourseList?.id, course?.id));
          setSelectedFile(downloadURL);
        });
      });

    // console.log(course);
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.course?.name}{" "}
            {edit && (
              <EditCourseBasicInfo course={course} refreshData={refreshData} />
            )}
          </h2>
          <p className="text-sm mt-3 text-gray-400">
            {course?.courseOutput?.course?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <Puzzle />
            {course?.category}
          </h2>
          {!edit && (
            <Link href={`/course/${course?.courseId}/start`}>
              <Button className="w-full mt-5">Start</Button>
            </Link>
          )}
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={course?.courseBanner || "/placeholder.png"}
              width={300}
              height={300}
              className="w-full rounded-2xl cursor-pointer"
              alt="icon"
            />
          </label>
          {edit && (
            <input
              type="file"
              id="upload-image"
              className="opacity-0"
              onChange={onFileSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
