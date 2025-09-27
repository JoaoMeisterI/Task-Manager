import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../../lib/axios"
import { taskQueryKeys } from "../../keys/queries"
import { taskMutationKeys } from "../../keys/mutation"

export const useAddTasks = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (task) => {
      const { data: createTask } = await api.post("/tasks", task)
      return createTask
    },
    onSuccess: (task) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks = []) => {
        return [...oldTasks, task]
      })
    },
  })
}
