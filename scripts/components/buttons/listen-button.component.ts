export class ListenButtonComponent {
    private buttonClick: () => void;

    constructor (buttonClick: () => void) {
        this.buttonClick = buttonClick;
    }

    public render(): HTMLElement {
        const listenBtn = document.createElement('button'); 
        listenBtn.classList.add('btn');
        listenBtn.textContent = 'Listen';

        listenBtn.addEventListener('click', () => {
            this.buttonClick();
        });

        return listenBtn;   
    }
}
