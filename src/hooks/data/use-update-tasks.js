import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../../lib/axios"
import { taskQueryKeys } from "../../keys/queries"
import { taskMutationKeys } from "../../keys/mutation"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (task) => {
      const { data: updateTask } = await api.patch(`/tasks/${taskId}`, {
        title: task?.title?.trim(),
        description: task?.description?.trim(),
        time: task?.time,
        status: task?.status,
      })
      return updateTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks = []) => {
        return oldTasks.map((oldTask) =>
          oldTask.id === updatedTask.id ? updatedTask : oldTask
        )
      })
    },
  })
}
