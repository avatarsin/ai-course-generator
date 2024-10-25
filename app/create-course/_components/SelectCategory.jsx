import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import { useContext } from "react";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category,
    }));
  };

  return (
    <div className="px-10 md:px-20">
      <h2 className="my-5">Select the course category</h2>
      <div className="grid grid-cols-3 gap-10">
        {CategoryList.map((item, index) => (
          <div
            onClick={() => handleCategoryChange(item.name)}
            className={`flex flex-col p-5 border items-center rounded-xl cursor-pointer hover:border-primary hover:bg-blue-50 ${
              userCourseInput?.category === item.name &&
              "border-purple-500 bg-blue-50"
            }`}
            key={index}
          >
            <Image alt="icon" src={item.icon} width={50} height={50} />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
