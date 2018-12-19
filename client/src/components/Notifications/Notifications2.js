
let notifications= []

function applyForPlace() {
    if (this.places > 0) {
        this.places = (this.places) - 1
        notifications.push(`${passenger.name} has booked a place in your journey ${journey.id}`)
    } else {
        return -1
    }
}

function acceptPassenger() {
    if (this.places > 0) {
        notifications.push(`${driver.name} has accepted your request`)

    }
}
function denyPassenger() {
        if (this.places > 0) {
            this.places = (this.places) + 1
            notifications.push(`${driver.name} has denied your request`)
        }
    }
function newStop(){
    notifications.push(`${passenger.name} has suggested a new stop in the journey ${journey.id}`)
}
function acceptNewRoute(){
    notifications.push(`${driver.name} has accepted your change with the next conditions:`)
}
function denyNewRoute(){
    notifications.push(`${driver.name} has denied your change`)
}

