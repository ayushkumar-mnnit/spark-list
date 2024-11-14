import { useEffect, useState } from "react";
import { Button, Input, Box, FormControl, FormLabel, useToast, Select } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaCheckCircle } from "react-icons/fa";

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

  const [editTaskData, setEditTaskData] = useState({
    isEditing: false,
    editedTitle: "",
    editedDescription: "",
    taskToEdit: null,
  });

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

    return dueDate.toLocaleString('en-US', 
    { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

  };

  const markTaskAsDone = (TimeCreated) => {
    const updatedTasks = myTask.map((task) =>
      task.TimeCreated === TimeCreated ? { ...task, completed: true, completedOn: new Date().toLocaleString() } : task
    );
    setMyTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (TimeCreated) => {
    // Remove the task from the array
    const updatedTasks = myTask.filter(task => task.TimeCreated !== TimeCreated);

    // Update localStorage and state
    setMyTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast({
      description: "Task deleted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const updateTask = (TimeCreated, updatedFields) => {
    const updatedTasks = myTask.map((task) =>
      task.TimeCreated === TimeCreated ? { ...task, ...updatedFields } : task
    );
    setMyTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const startEdit = (task) => {
    setEditTaskData({
      isEditing: true,
      editedTitle: task.title,
      editedDescription: task.description,
      taskToEdit: task,
    });
  };

  const cancelEdit = () => {
    setEditTaskData({
      isEditing: false,
      editedTitle: "",
      editedDescription: "",
      taskToEdit: null,
    });
  };

  const saveEdit = () => {
    if (editTaskData.editedTitle && editTaskData.editedDescription) {
      updateTask(editTaskData.taskToEdit.TimeCreated, {
        title: editTaskData.editedTitle,
        description: editTaskData.editedDescription,
      });
      cancelEdit();
    } else {
      toast({
        description: "Title and description are required!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
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
                {editTaskData.isEditing && editTaskData.taskToEdit?.TimeCreated === task.TimeCreated ? (
                  <>
                  <strong>Title: </strong>
                    <Input
                      value={editTaskData.editedTitle}
                      onChange={(e) => setEditTaskData({ ...editTaskData, editedTitle: e.target.value })}
                      placeholder="Edit Title"
                    />
                    <strong>Description: </strong>
                    <Input
                      mt={2}
                      value={editTaskData.editedDescription}
                      onChange={(e) => setEditTaskData({ ...editTaskData, editedDescription: e.target.value })}
                      placeholder="Edit Description"
                    />
                    <Button mt={2} onClick={saveEdit}>
                      Save
                    </Button>
                    <Button mt={2} ml={2} onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <h4><strong>Title</strong> {task.title}</h4>
                    <h4><strong>Description:</strong> {task.description}</h4>
                    <h4><strong>Created:</strong> {new Date().toLocaleString('en-US',
                    { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}</h4>

                    <h4><strong>Due on:</strong> {calculateDueDate(task.TimeCreated, task.Reminder)}</h4>
                 
                      <Box mt={2} gap={7} display={'flex'}>

                      <FaCheckCircle color="green" style={{cursor:'pointer'}} onClick={() => markTaskAsDone(task.TimeCreated)} />
                      <FaEdit color="blue" style={{cursor:'pointer'}} onClick={() => startEdit(task)}/>
                      <MdDelete color="red" style={{cursor:'pointer'}} onClick={() => deleteTask(task.TimeCreated)}/>

                    </Box>

                  </>
                )}
              </Box>
            ))
        )}
      </Box>
    </>
  );
};
