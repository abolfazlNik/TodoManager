import { Todo } from '../types'

const TodoCard = ({todo}:{todo:Todo}) => {
  return (
    <div className='p-3 w-full cursor-pointer'>
    <div className="border border-gray-50 p-3 h-20">
      <div className="">{todo.content}</div>
      <div className="text-gray-200">{todo.description}</div>
    </div>
  </div>
  )
}

export default TodoCard