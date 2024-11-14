import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const Completed = () => {
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    setInterval(()=>{
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setCompletedTasks(tasks);
    },2000)
  }, []);


  return (
    <Box p={4}>
      {completedTasks.length === 0 ? (
        <p>Nothing to show up here!</p>
      ) : (
        completedTasks
          .filter((task) => task.completed === true) // Filter out completed tasks only
          .map((task, index) => (
            <Box
              key={index}
              p={4}
              mb={2}
              border="1px"
              borderColor="gray.200"
              bg={task.priority === "High" ? "red.100" : task.priority === "Medium" ? "purple.100" : "blue.100"}
            >
              <h3><strong>Title:</strong> {task.title}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <h3><strong>Created:</strong> {task.DateCreated}</h3>
              <h3><strong>Status:</strong> Completed on {task.completedOn}</h3>
            </Box>
          ))
      )}
    </Box>
  );
};
