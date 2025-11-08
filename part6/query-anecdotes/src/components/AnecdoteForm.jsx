import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const { notificationDispatch } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () =>
      notificationDispatch({
        type: 'SHOW',
        payload: `too short anecdote, must have length 5 or more`,
      }),
  })

  console.log('newAnecdoteMutation: ', newAnecdoteMutation)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
    notificationDispatch({
      payload: `anecdote '${content}' created`,
      type: 'SHOW',
    })
    setTimeout(() => {
      notificationDispatch({
        type: 'HIDE',
      })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
