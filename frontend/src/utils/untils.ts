export const previewPhoto = () => {
    const input = document.getElementById('image_url') as HTMLInputElement;
    const file = input.files;

    if (file) {
        const fileReader = new FileReader();
        const preview = document.getElementById('file-preview') as HTMLImageElement;
        const previewPhoto = document.getElementById('file-preview') as HTMLImageElement;

        

        fileReader.onload = function (event) {
            preview.setAttribute('src', event.target?.result as string);
            previewPhoto.classList.remove('d-none');
        };

        fileReader.readAsDataURL(file[0] as Blob);
    }
};