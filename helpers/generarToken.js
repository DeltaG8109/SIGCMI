import { v4 as uuidv4 } from 'uuid'

const generarToken = () => {
    return uuidv4()
}

export default generarToken