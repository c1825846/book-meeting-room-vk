import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { BookingForm } from './BookingForm'

import './App.css'

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BookingForm />
        </LocalizationProvider>
    )
}

export default App
