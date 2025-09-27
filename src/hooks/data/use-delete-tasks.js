import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../../lib/axios"
import { taskQueryKeys } from "../../keys/queries"
import { taskMutationKeys } from "../../keys/mutation"

export const useDeleteTasks = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deleteTask } = await api.delete(`/tasks/${taskId}`)
      return deleteTask
    },
    onSuccess: (tasks) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.filter((oldTasks) => oldTasks.id != tasks.id)
      })
    },
  })
}
