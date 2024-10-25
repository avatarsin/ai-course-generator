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
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setName(course?.courseOutput?.course?.name);
    setDescription(course?.courseOutput?.course?.description);
  }, [course]);

  const onUpdateHandlers = async () => {
    course.courseOutput.course.name = name;
    course.courseOutput.course.description = description;

    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .returning({
        id: CourseList.id,
      });

    refreshData();
    // console.log(result);
  };

  console.log(course);
  return (
    <Dialog>
      <DialogTrigger>
        <PencilIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course title and Description</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label htmlFor="">Course title</label>
              <Input
                onChange={(e) => setName(e.target.value)}
                defaultValue={course?.courseOutput?.course?.name}
              />
            </div>

            <div>
              <label htmlFor="">Description</label>
              <Textarea
                className="h-40"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={course?.courseOutput?.course?.description}
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

export default EditCourseBasicInfo;
