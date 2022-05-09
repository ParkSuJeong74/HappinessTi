import Swal from 'sweetalert2'

function errorHandler(title, message){
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCloseButton: true,
    })
}
export default errorHandler