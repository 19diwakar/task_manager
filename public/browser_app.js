const loadingDOM = document.querySelector('.loading-text')
const taskDOM = document.querySelector('.tasks')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

const showTasks = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
        const {
            data: { tasks },
        } = await axios.get('/api/v1/tasks')

        if (tasks.length < 1) {
            taskDOM.innerHTML = '<h5 class="empty-list">No task in your list</h5>'
            loadingDOM.style.visibility = 'hidden'
            return
        }

        const allTasks = tasks.map((task) => {
            const { completed, _id: taskId, name } = task

            return `<div class="single-task ${completed && 'task-completed'}">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
            <div class="task-links">
            <a href="task.html?id=${taskId}" class="edit-link">
            <i class="fas fa-edit"></i>
            </a>
            <button type="button" class="delete-btn" data-id="${taskId}">
            <i class="fas fa-trash"></i>
            </button>
            </div>
            </div>`
        }).join('')
        taskDOM.innerHTML = allTasks
    } catch (err) {
        taskDOM.innerHTML =
            `<h5 class="empty-list">There was an error, please try later...</h5>`
    }
    loadingDOM.style.visibility = 'hidden'
}

showTasks()

taskDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('delete-btn')) {
        loadingDOM.style.visibility = 'visible'
        const id = el.parentElement.dataset.id
        try {
            await axios.delete(`/api/v1/tasks/${id}`)
            showTasks()
        } catch (err) {
            console.log(err)
        }
    }
    loadingDOM.style.visibility = 'hidden'
})

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = taskInputDOM.value

    try {
        await axios.post('/api/v1/tasks', { name })
        showTasks()
        taskInputDOM.value = ''
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = 'success, task added'
        formAlertDOM.classList.add('text-success')
    } catch (err) {
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = 'error, please try again'
    }

    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
    }, 3000)
})