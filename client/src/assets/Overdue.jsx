import { Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useAuth } from "./context/ContextApi.jsx";

export const Overdue = () => {
  const toast = useToast();
  const { toggle, Myfooter, langToggle,calculateDueDate } = useAuth();

  const [overdueTasks, setOverdueTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks.filter(
      (task) => task.completed === false && task.overdue === true
    );
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      const updatedTasks = currentTasks.map((task) => {
        if (!task.completed) {
          const isOverdueTask = isOverdue(task.TimeCreated, task.Reminder);
          return { ...task, overdue: isOverdueTask };
        }
        return task;
      });

      const newOverdueTasks = updatedTasks.filter(
        (task) => task.overdue === true
      );
      setOverdueTasks(newOverdueTasks);

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const deleteTask = (TimeCreated) => {
    const updatedTasks = overdueTasks.filter(
      (task) => task.TimeCreated !== TimeCreated
    );
    setOverdueTasks(updatedTasks);

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTasksList = allTasks.filter(
      (task) => task.TimeCreated !== TimeCreated
    );
    localStorage.setItem("tasks", JSON.stringify(newTasksList));

    toast({
      description: "Task deleted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  
  const isOverdue = (TimeCreated, Reminder) => {
    const dueDate = calculateDueDate(TimeCreated, Reminder);
    const currentTime = new Date();
    return currentTime > dueDate;
  };

  return (
    <>
      <Box p={4}>
        {overdueTasks.length === 0 ? (
          <p>Nothing to show up here!</p>
        ) : (
          overdueTasks.map((task, index) => (
            <Box
              key={index}
              p={4}
              mb={2}
              border="1px"
              borderColor="gray.200"
              color={toggle ? "black" : "black"}
              bg={
                task.priority === "High"
                    ? "red.100"
                    : task.priority === "Medium"
                    ? "green.100"
                    : "purple.100"
              }
            >
              <h3>
                <strong>{langToggle ? "शीर्षक:" : "Title:"}</strong>{" "}
                {task.title}
              </h3>
              <p>
                <strong>{langToggle ? "विवरण:" : "Description:"}</strong>{" "}
                {task.description}
              </p>
              <h3>
                <strong>{langToggle ? "बनाया:" : "Created:"}</strong>{" "}
                {new Date(task.DateCreated).toLocaleString(  // all date methods work on date obj but the returned from storage or db
                  langToggle ? "hi-IN" : "en-US",            // is string so we need to convert it to date obj to use date methods
                  {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  }
                )}
              </h3>
              <h3>
                <strong>{langToggle ? "नियत तारीख:" : "Due:"}</strong>{" "}
                {calculateDueDate(
                  task.TimeCreated,
                  task.Reminder
                ).toLocaleString(langToggle ? "hi-IN" : "en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
              </h3>

              <h3>
                <strong>{langToggle ? "स्थिति:" : "Status:"}</strong>{" "}
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    fontSize: "15px",
                  }}
                >
                  {langToggle ? "अधूरा" : "incomplete"}
                </span>
              </h3>
              <Box mt={2} gap={7} display={"flex"}>
                <MdDelete
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteTask(task.TimeCreated)}
                />
              </Box>
            </Box>
          ))
        )}
      </Box>

      <Myfooter />
    </>
  );
};
