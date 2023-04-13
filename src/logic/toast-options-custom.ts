import { ToastOptions } from "react-hot-toast";

export function toastOptionsCustom(options: ToastOptions, backgroundColor: string = 'white'): ToastOptions {
    options.style = {
        border: '1px solid #000000',
        padding: '9px',
        color: 'black',
        backgroundColor,
    }

    options.className = 'font-riffic text-sm tracking-wide'

    return options
}