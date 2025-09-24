import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useAddTasks = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (task) => {
      const { data: createTask } = await axios.post(
        "http://localhost:3000/tasks",
        task
      )
      return createTask
    },
    onSuccess: (task) => {
      queryClient.setQueryData(["tasks"], (oldTasks = []) => {
        return [...oldTasks, task]
      })
    },
  })
}
