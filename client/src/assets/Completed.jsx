import { Box, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useAuth } from "./context/ContextApi.jsx";

export const Completed = () => {
  const toast = useToast();
  const { toggle, Myfooter, langToggle } = useAuth();

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
    <>
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
                  {new Date(task.DateCreated).toLocaleString(
                    langToggle ? "hi-IN" : "en-US",
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
                  <strong>{langToggle ? "स्थिति:" : "Status:"}</strong>{" "}
                  <span
                    style={{
                      color: "green",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                      fontSize: "15px",
                    }}
                  >
                    {langToggle ? "पूर्ण" : "completed"}
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
      <Myfooter />
    </>
  );
};
