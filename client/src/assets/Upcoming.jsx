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
import { FaEdit, FaCheckCircle } from "react-icons/fa";

import { useAuth } from "./context/ContextApi.jsx";
import { BsEmojiSunglasses } from "react-icons/bs";

export const Upcoming = () => {
  const { toggle, Myfooter, langToggle, calculateDueDate } = useAuth();

  const toast = useToast();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    DateCreated: new Date(),
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
        DateCreated: new Date(),
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
        description: langToggle
          ? "कार्य सफलतापूर्वक जोड़ा गया"
          : "Task added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        description: langToggle
          ? "सभी फ़ील्ड आवश्यक हैं"
          : "All fields are required!",
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

  const markTaskAsDone = (TimeCreated) => {
    const updatedTasks = myTask.map((task) =>
      task.TimeCreated === TimeCreated
        ? { ...task, completed: true, completedOn: new Date().toLocaleString() }
        : task
    );
    setMyTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast({
      description: (
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          {langToggle
            ? `कार्य सफलतापूर्वक पूरा हुआ `
            : `Task completed successfully `}
          <BsEmojiSunglasses color="white" style={{ marginLeft: "5px" }} />
        </span>
      ),
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    
    
  };

  const deleteTask = (TimeCreated) => {
    const updatedTasks = myTask.filter(
      (task) => task.TimeCreated !== TimeCreated
    );

    setMyTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast({
      description: langToggle
        ? "कार्य सफलतापूर्वक हटा दिया गया"
        : "Task deleted successfully!",
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
          <FormLabel htmlFor="title">
            {langToggle ? "शीर्षक" : "Title"}
          </FormLabel>
          <Input
            id="title"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            placeholder="Enter the title"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="description">
            {langToggle ? "विवरण" : "Description"}
          </FormLabel>
          <Input
            id="description"
            name="description"
            value={newTask.description}
            onChange={handleChange}
            placeholder="Enter the description"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="reminder">
            {langToggle ? "अनुस्मारक" : "Reminder"}
          </FormLabel>
          <Select
            id="reminder"
            fontSize={"14px"}
            name="Reminder"
            value={newTask.Reminder}
            onChange={handleChange}
            placeholder={
              langToggle ? "अनुस्मारक समय चुनें" : "select reminder time"
            }
          >
            <option
              style={{ backgroundColor: toggle ? "black" : "white" }}
              value="1min"
            >
              {langToggle ? "1 मिनट" : "1 min."}
            </option>
            <option
              style={{ backgroundColor: toggle ? "black" : "white" }}
              value="15min"
            >
              {langToggle ? "15 मिनट" : "15 min."}
            </option>
            <option
              style={{ backgroundColor: toggle ? "black" : "white" }}
              value="30min"
            >
              {langToggle ? "30 मिनट" : "30 min."}
            </option>
            <option
              style={{ backgroundColor: toggle ? "black" : "white" }}
              value="1hr"
            >
              {langToggle ? "1 घंटा" : "1 hr."}
            </option>
            <option
              style={{ backgroundColor: toggle ? "black" : "white" }}
              value="8hr"
            >
              {langToggle ? "8 घंटा" : "8 hr."}
            </option>
            <option
              style={{ backgroundColor: toggle ? "black" : "white" }}
              value="1day"
            >
              {langToggle ? "1 दिन" : "1 day"}
            </option>
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="priority">
            {langToggle ? "प्राथमिकता" : "Priority"}
          </FormLabel>
          <Select
            id="priority"
            name="priority"
            fontSize={"14px"}
            value={newTask.priority}
            onChange={handleChange}
            placeholder={langToggle ? "प्राथमिकता चुनें" : "choose priority"}
          >
           <option
              style={{ backgroundColor: toggle ? "black" : "white" }}
              value="High"
            >
              {langToggle ? "उच्च" : "High"}
            </option>
            <option
              style={{ backgroundColor: toggle ? "black" : "white" }}
              value="Medium"
            >
              {" "}
              {langToggle ? "मध्यम" : "Medium"}
            </option>
            <option
              style={{ backgroundColor: toggle ? "black" : "white" }}
              value="Low"
            >
              {langToggle ? "न्यूनतम" : "Low"}
            </option>
            
          </Select>
        </FormControl>

        <Button bg={toggle ? "green.200" : "purple.100"} onClick={addTask}>
          {langToggle ? "कार्य जोड़ें" : "Add"}
        </Button>
      </Box>

      <Box
        gap={5}
        display={"flex"}
        alignItems={"center"}
        fontSize="small"
        justifyContent={"center"}
      >
        <Box bg="red.200" w={"20px"} h={"20px"} borderRadius={"50%"}></Box>
        {langToggle ? "उच्च प्राथमिकता" : "High priority"}
        <Box bg="green.200" w={"20px"} h={"20px"} borderRadius={"50%"}></Box>
        {langToggle ? "मध्यम प्राथमिकता" : "Medium priority"}
        <Box bg="purple.200" w={"20px"} h={"20px"} borderRadius={"50%"}></Box>
        {langToggle
          ? "न्यूनतम प्राथमिकता (डिफ़ॉल्ट)"
          : "Low priority (default)"}
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
                color={toggle ? "black" : "black"}
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
                    <strong>{langToggle ? "शीर्षक:" : "Title:"} </strong>
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
                    <strong>{langToggle ? "विवरण:" : "Description:"} </strong>
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
                      {langToggle ? "संपादित करें" : "Save"}
                    </Button>
                    <Button mt={2} ml={2} onClick={cancelEdit}>
                      {langToggle ? "रद्द करें" : "Cancel"}
                    </Button>
                  </>
                ) : (
                  <>
                    <h4>
                      <strong>{langToggle ? "शीर्षक:" : "Title:"}</strong>{" "}
                      {task.title}
                    </h4>
                    <h4>
                      <strong>{langToggle ? "विवरण:" : "Description:"}</strong>{" "}
                      {task.description}
                    </h4>
                    <h4>
                      <strong>{langToggle ? "बनाया:" : "Created:"}</strong>{" "}
                      {task.DateCreated.toLocaleString(
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
                    </h4>

                    <h4>
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

      <Myfooter />
    </>
  );
};
