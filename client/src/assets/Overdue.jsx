import { Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export const Overdue = () => {
  const toast = useToast();

  // Initialize tasks from local storage into state
  const [overdueTasks, setOverdueTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks.filter(
      (task) => task.completed === false && task.overdue === true
    );
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      // Update overdue status for incomplete tasks
      const updatedTasks = currentTasks.map((task) => {
        if (!task.completed) {
          const isOverdueTask = isOverdue(task.TimeCreated, task.Reminder);
          return { ...task, overdue: isOverdueTask };
        }
        return task;
      });

      // Filter overdue tasks and update state
      const newOverdueTasks = updatedTasks.filter(
        (task) => task.overdue === true
      );
      setOverdueTasks(newOverdueTasks);

      // Update local storage with the modified tasks
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }, 2000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const deleteTask = (TimeCreated) => {
    const updatedTasks = overdueTasks.filter(
      (task) => task.TimeCreated !== TimeCreated
    );
    setOverdueTasks(updatedTasks);

    // Update local storage without the deleted task
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

  const calculateDueDate = (TimeCreated, Reminder) => {
    const dueDate = new Date(TimeCreated);
    switch (Reminder) {
      case "1min":
        dueDate.setMinutes(dueDate.getMinutes() + 1);
        break;
      case "15min":
        dueDate.setMinutes(dueDate.getMinutes() + 15);
        break;
      case "30min":
        dueDate.setMinutes(dueDate.getMinutes() + 30);
        break;
      case "1hr":
        dueDate.setHours(dueDate.getHours() + 1);
        break;
      case "8hr":
        dueDate.setHours(dueDate.getHours() + 8);
        break;
      case "1day":
        dueDate.setDate(dueDate.getDate() + 1);
        break;
      default:
        break;
    }
    return dueDate;
  };

  const isOverdue = (TimeCreated, Reminder) => {
    const dueDate = calculateDueDate(TimeCreated, Reminder);
    const currentTime = new Date();
    return currentTime > dueDate;
  };

  return (
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
            bg={
              task.priority === "High"
                ? "red.100"
                : task.priority === "Medium"
                ? "green.100"
                : "purple.100"
            }
          >
            <h3>
              <strong>Title:</strong> {task.title}
            </h3>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <h3>
              <strong>Created:</strong> {task.DateCreated}
            </h3>
            <h3>
              <strong>Due:</strong>{" "}
              {calculateDueDate(
                task.TimeCreated,
                task.Reminder
              ).toLocaleString()}
            </h3>
            <h3>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  fontSize: "15px",
                }}
              >
                incomplete
              </span>
            </h3>
            <MdDelete
              color="red"
              style={{ cursor: "pointer" }}
              onClick={() => deleteTask(task.TimeCreated)}
            />
          </Box>
        ))
      )}
    </Box>
  );
};
