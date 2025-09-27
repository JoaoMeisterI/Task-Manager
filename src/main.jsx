import React from "react"
import ReactDOM from "react-dom/client"
import TasksPage from "./pages/TasksPage.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import TaskDetailsPage from "./pages/Task-details.jsx"
import { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import HomePage from "./pages/Home.jsx"

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/tasks",
    element: <TasksPage />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetailsPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
