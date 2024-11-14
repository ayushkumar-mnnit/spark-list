import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Box,
  FormControl,
  FormLabel,
  useToast,
  Select,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaCheckCircle, FaHeart } from "react-icons/fa";
import { BsEmojiWinkFill } from "react-icons/bs";
import { RiCopyrightLine } from "react-icons/ri";

export const Upcoming = () => {
  const toast = useToast();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    DateCreated: new Date().toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }),
    TimeCreated: new Date(),
    Reminder: "",
    completed: false,
    overdue: false,
  });

  const [myTask, setMyTask] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

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
        DateCreated: new Date().toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        }),
        TimeCreated: new Date(),
        completed: false,
        overdue: false,
      };

      const updatedTasks = [...myTask, taskWithDate];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      setMyTask(updatedTasks);

      setNewTask({
        title: "",
        description: "",
        Reminder: "",
        completed: false,
        overdue: false,
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

    return dueDate.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  const markTaskAsDone = (TimeCreated) => {
    const updatedTasks = myTask.map((task) =>
      task.TimeCreated === TimeCreated
        ? { ...task, completed: true, completedOn: new Date().toLocaleString() }
        : task
    );
    setMyTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (TimeCreated) => {
    const updatedTasks = myTask.filter(
      (task) => task.TimeCreated !== TimeCreated
    );

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
            <option value="1min">1 min</option>
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

      <Box
        gap={5}
        display={"flex"}
        alignItems={"center"}
        fontSize="small"
        justifyContent={"center"}
      >
        <Box bg="red.200" w={"20px"} h={"20px"} borderRadius={"50%"}></Box>High
        priority
        <Box bg="green.200" w={"20px"} h={"20px"} borderRadius={"50%"}></Box>
        Medium priority
        <Box bg="purple.200" w={"20px"} h={"20px"} borderRadius={"50%"}></Box>
        Low priority (default)
      </Box>

      <Box p={4}>
        {myTask.length === 0 ? (
          <p>Nothing to show up here!</p>
        ) : (
          myTask
            .filter((task) => !task.completed && !task.overdue)
            .map((task) => (
              <Box
                key={task.TimeCreated}
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
                {editTaskData.isEditing &&
                editTaskData.taskToEdit?.TimeCreated === task.TimeCreated ? (
                  <>
                    <strong>Title: </strong>
                    <Input
                      value={editTaskData.editedTitle}
                      onChange={(e) =>
                        setEditTaskData({
                          ...editTaskData,
                          editedTitle: e.target.value,
                        })
                      }
                      placeholder="Edit Title"
                    />
                    <strong>Description: </strong>
                    <Input
                      mt={2}
                      value={editTaskData.editedDescription}
                      onChange={(e) =>
                        setEditTaskData({
                          ...editTaskData,
                          editedDescription: e.target.value,
                        })
                      }
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
                    <h4>
                      <strong>Title</strong> {task.title}
                    </h4>
                    <h4>
                      <strong>Description:</strong> {task.description}
                    </h4>
                    <h4>
                      <strong>Created:</strong> {task.DateCreated}
                    </h4>

                    <h4>
                      <strong>Due:</strong>{" "}
                      {calculateDueDate(task.TimeCreated, task.Reminder)}
                    </h4>

                    <Box mt={2} gap={7} display={"flex"}>
                      <FaCheckCircle
                        color="green"
                        style={{ cursor: "pointer" }}
                        onClick={() => markTaskAsDone(task.TimeCreated)}
                      />
                      <FaEdit
                        color="blue"
                        style={{ cursor: "pointer" }}
                        onClick={() => startEdit(task)}
                      />
                      <MdDelete
                        color="red"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteTask(task.TimeCreated)}
                      />
                    </Box>
                  </>
                )}
              </Box>
            ))
        )}
      </Box>

      <div
        className="footer"
        style={{ textAlign: "center", padding: "10px 0", fontSize: "small" }}
      >
        <h5
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          Made with love
          <FaHeart size={"17px"} color="red" />
          and a bit of code
          <BsEmojiWinkFill size={"17px"} color="green" />
        </h5>

        <p>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <RiCopyrightLine /> 2024-25 | All rights reserved @
          </span>
          <span style={{ textDecoration: "underline", color: "purple" }}>
            <a
              href="https://www.linkedin.com/in/ayushkumar2025"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ayush Kumar
            </a>
          </span>
        </p>

        <p>
          <span>
            Powered by <strong>SparkList</strong>
          </span>
        </p>
      </div>
    </>
  );
};
