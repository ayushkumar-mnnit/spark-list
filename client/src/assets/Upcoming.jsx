import { useEffect, useState } from "react";
import { Button, Input, Box, FormControl, FormLabel, useToast, Select } from "@chakra-ui/react";

export const Upcoming = () => {
  const toast = useToast();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    DateCreated: new Date().toDateString(),
    TimeCreated: new Date().getTime(),
    Reminder: "",
    priority: "Low",
    completed: false,  // Ensure completed field is always here
  });

  const [myTask, setMyTask] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

  const addTask = () => {
    if (newTask.title && newTask.description && newTask.Reminder) {
      const taskWithDate = {
        ...newTask,
        DateCreated: new Date().toDateString(),
        TimeCreated: new Date().getTime(),
        completed: false, // Explicitly setting completed to false
      };

      const updatedTasks = [...myTask, taskWithDate];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      setMyTask(updatedTasks);

      setNewTask({
        title: "",
        description: "",
        Reminder: "",
        priority: "",
        completed: false,  // Reset completed here too
      });

      toast({
        description: "Task added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        description: "All fields are required!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const calculateDueDate = (TimeCreated, Reminder) => {
    const dueDate = new Date(TimeCreated);

    switch (Reminder) {
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

    const formattedTime = dueDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return dueDate.toDateString() + " , " + formattedTime;
  };

  const markTaskAsDone = (TimeCreated) => {
    const updatedTasks = myTask.map((task) =>
      task.TimeCreated === TimeCreated ? { ...task, completed: true, completedOn:new Date().toLocaleString() } : task
    );
    setMyTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
  };



  useEffect(() => {
   
    localStorage.setItem("tasks", JSON.stringify(myTask));
  }, [myTask]);



  return (
    <>
      <Box p={4}>
        <FormControl mb={4}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            placeholder="Enter the title"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            name="description"
            value={newTask.description}
            onChange={handleChange}
            placeholder="Enter the description"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="reminder">Reminder</FormLabel>
          <Select
            id="reminder"
            name="Reminder"
            value={newTask.Reminder}
            onChange={handleChange}
            placeholder="Select a reminder time"
          >
            <option value="15min">15 min</option>
            <option value="30min">30 min</option>
            <option value="1hr">1 hr</option>
            <option value="8hr">8 hr</option>
            <option value="1day">1 day</option>
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="priority">Priority</FormLabel>
          <Select
            id="priority"
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
            placeholder="Choose priority"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </FormControl>

        <Button bg={"purple.100"} onClick={addTask}>
          Add Task
        </Button>
      </Box>

      <Box p={4}>
        {myTask.length === 0 ? (
          <p>Nothing to show up here!</p>
        ) : (
          myTask.filter((task) => !task.completed) // Display tasks that are not completed
            .map((task) => (
              <Box
                key={task.TimeCreated} // Use TimeCreated as a unique identifier
                p={4}
                mb={2}
                border="1px"
                borderColor="gray.200"
                bg={task.priority === "High" ? "red.100" : task.priority === "Medium" ? "purple.100" : "blue.100"}
              >
                <h3><strong>Title:</strong> {task.title}</h3>
                <p><strong>Description:</strong> {task.description}</p>
                <h3><strong>Created:</strong> {task.DateCreated}</h3>
                <h3><strong>Reminder:</strong> {task.Reminder}</h3>
                <h4><strong>Due:</strong> {calculateDueDate(task.TimeCreated, task.Reminder)}</h4>
                <Button
                  onClick={() => markTaskAsDone(task.TimeCreated)} // Pass TimeCreated as a unique identifier
                >
                  Mark as Done
                </Button>
              </Box>
            ))
        )}
      </Box>
    </>
  );
};
