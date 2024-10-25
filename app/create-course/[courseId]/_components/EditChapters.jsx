"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";

function EditChapters({ course, index, refreshData }) {
  const Chapters = course?.courseOutput?.course?.chapters;

  const [name, setName] = useState();
  const [about, setAbout] = useState();

  useEffect(() => {
    setName(Chapters[index]?.name);
    setAbout(Chapters[index]?.about);
  }, [course]);

  const onUpdateHandlers = async () => {
    console.log(course.courseOutput.course.chapters[index].name);
    course.courseOutput.course.chapters[index].name = name;
    course.courseOutput.course.chapters[index].about = about;

    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .returning({
        id: CourseList.id,
      });
    refreshData();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <EditIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label htmlFor="">Course Title</label>
              <Input
                onChange={(e) => setName(e.target.value)}
                defaultValue={Chapters[index].name}
              />
            </div>

            <div>
              <label htmlFor="">Description</label>
              <Textarea
                className="h-40"
                onChange={(e) => setAbout(e.target.value)}
                defaultValue={Chapters[index].about}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateHandlers}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;
