import { useState } from 'react'
import {
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Grid,
    TextField,
    Button,
    Typography,
} from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'

import { getTowers, getFloors, getRooms, bookRoom } from '../api'

export const BookingForm = () => {
    const towers = getTowers()
    const floors = getFloors()
    const rooms = getRooms()

    const dateNow = new Date()
    const defaultEndTime = new Date().setMinutes(dateNow.getMinutes() + 30)

    const [tower, setTower] = useState<string>('')
    const [floor, setFloor] = useState<string>('')
    const [room, setRoom] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [date, setDate] = useState<number>(Date.now())
    const [beginTime, setBeginTime] = useState<number>(Date.now())
    const [endTime, setEndTime] = useState<number>(defaultEndTime.valueOf())

    const changeDate = (target: Date, source: Date) => {
        const formattedSource = new Date(source)
        const formattedTarget = new Date(target)
        formattedTarget.setFullYear(formattedSource.getFullYear())
        formattedTarget.setMonth(formattedSource.getMonth())
        formattedTarget.setDate(formattedSource.getDate())

        return formattedTarget.toISOString()
    }

    const clearFrom = () => {
        setTower('')
        setFloor('')
        setRoom('')
        setComment('')
        setDate(Date.now())
        setBeginTime(Date.now())
        setEndTime(defaultEndTime)
    }

    const handleFrom = () => {
        bookRoom({
            tower,
            floor,
            room,
            comment,
            beginTime: changeDate(new Date(beginTime), new Date(date)),
            endTime: changeDate(new Date(endTime), new Date(date)),
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h1">Book the meeting room</Typography>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Tower</InputLabel>
                    <Select
                        label="Tower"
                        value={tower}
                        onChange={e => {
                            setTower(e.target.value)
                        }}
                    >
                        {towers.map(tower => (
                            <MenuItem key={tower} value={tower}>
                                {tower}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Floor</InputLabel>
                    <Select
                        label="Floor"
                        value={floor}
                        onChange={e => {
                            setFloor(e.target.value)
                        }}
                    >
                        {floors.map(tower => (
                            <MenuItem key={tower} value={tower}>
                                {tower}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Room</InputLabel>
                    <Select
                        label="Room"
                        value={room}
                        onChange={e => {
                            setRoom(e.target.value)
                        }}
                    >
                        {rooms.map(tower => (
                            <MenuItem key={tower} value={tower}>
                                {tower}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={date => {
                            date && setDate(date)
                        }}
                    ></DatePicker>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <TimePicker
                        label="Begin time"
                        value={beginTime}
                        onChange={time => {
                            time && setBeginTime(time)
                        }}
                    ></TimePicker>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <TimePicker
                        minTime={beginTime}
                        label="End time"
                        value={endTime}
                        onChange={time => {
                            time && setEndTime(time)
                        }}
                    ></TimePicker>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField
                        multiline
                        minRows={2}
                        value={comment}
                        onChange={e => {
                            setComment(e.target.value)
                        }}
                    ></TextField>
                </FormControl>
            </Grid>
            <Grid item container justifyContent="end" spacing={2}>
                <Grid item>
                    <Button
                        onClick={() => {
                            clearFrom()
                        }}
                    >
                        Clear
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleFrom()
                        }}
                    >
                        Book
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
