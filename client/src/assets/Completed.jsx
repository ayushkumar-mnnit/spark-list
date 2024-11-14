import { Box, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

export const Completed = () => {
  const toast = useToast();

  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    setInterval(() => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setCompletedTasks(tasks);
    }, 2000);
  }, []);

  const deleteTask = (TimeCreated) => {
    const updatedTasks = completedTasks.filter(
      (task) => task.TimeCreated !== TimeCreated
    );

    setCompletedTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast({
      description: "Task deleted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Box p={4}>
      {completedTasks.length === 0 ? (
        <p>Nothing to show up here!</p>
      ) : (
        completedTasks
          .filter((task) => task.completed === true)
          .map((task, index) => (
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
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    fontSize: "15px",
                  }}
                >
                  completed on
                </span>{" "}
                {task.completedOn}
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
