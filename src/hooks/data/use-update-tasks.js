import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (task) => {
      const { data: updateTask } = await axios.put(
        `http://localhost:3000/tasks/${taskId}`,
        task
      )
      return updateTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks = []) => {
        return oldTasks.map((oldTask) =>
          oldTask.id === updatedTask.id ? updatedTask : oldTask
        )
      })
    },
  })
}
