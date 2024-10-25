import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContext } from "react";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="mx-20 lg:!mx-44">
      <div className="mt-5">
        <label htmlFor="">
          Write the topic for which you want to generate a course (e.g., Python
          Course, Yoga Course, etc)
        </label>
        <Input
          placeholder="Topic"
          onChange={(e) => handleInputChange("topic", e.target.value)}
          defaultValue={userCourseInput?.topic}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="">
          Tell us more about your course, what you want to include in the course
          (Optional)
        </label>
        <Textarea
          defaultValue={userCourseInput?.description}
          placeholder="Course Description"
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}

export default TopicDescription;
