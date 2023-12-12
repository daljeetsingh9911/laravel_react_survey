import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
});


export const ShowErrorMessage=(Text: string,title:string = '')=>{
    Toast.fire({
        icon: "error",
        title: `${title}`,
        html: `${Text}
            `
    });
}

export const ShowSuceessMessage=(Text: string,title:string = '')=>{
    Toast.fire({
        icon: "success",
        title: `${title}`,
        html: `${Text}`
    });
}