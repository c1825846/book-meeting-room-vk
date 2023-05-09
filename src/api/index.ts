import data from './data.json'

interface BookingData {
    tower: string,
    floor: string,
    room: string,
    comment: string,
    beginTime: string,
    endTime: string,
}

export const getTowers = () => data.towers

export const getFloors = () => data.floors

export const getRooms = () => data.rooms

export const bookRoom = (bookingData: BookingData) => {
    console.log(JSON.stringify(bookingData))
}
