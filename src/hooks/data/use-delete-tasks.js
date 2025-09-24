import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useDeleteTasks = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const { data: deleteTask } = await axios.delete(
        `http://localhost:3000/tasks/${taskId}`
      )
      return deleteTask
    },
    onSuccess: (tasks) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        return oldTasks.filter((oldTasks) => oldTasks.id != tasks.id)
      })
    },
  })
}
