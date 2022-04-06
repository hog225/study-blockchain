import { generateStore, EventActions } from '@drizzle/store'
import drizzleOptions from '../drizzleOptions'
import { toast } from 'react-toastify'

const contractEventNotifier = store => next => action => {
    if (action.type === EventActions.EVENT_FIRED) {
        const contract = action.name
        const contractEvent = action.event.event
        const returnValues = action.event.returnValues;
        let display = `${contract}(${contractEvent}): ${returnValues['0']}`
        if (contractEvent === "Transfer") {
            display = `${contract}(${contractEvent}): amount ${returnValues['2']}`
        }

        console.log(returnValues)

        toast.success(display, { position: toast.POSITION.TOP_RIGHT })
    }
    return next(action)
}

const appMiddlewares = [ contractEventNotifier ]

export default generateStore({
    drizzleOptions,
    appMiddlewares,
    disableReduxDevTools: false  // enable ReduxDevTools!
})