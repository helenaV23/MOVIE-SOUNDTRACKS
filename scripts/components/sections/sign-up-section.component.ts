import { IComponent } from "../../models";
import { BaseSectionComponent } from "./base-section.component";

export class SignUpSectionComponent extends BaseSectionComponent implements IComponent {
    public render(): HTMLElement {
        const section = super.render();
        section.classList.add('sign-up');

        const title = document.createElement('h2');
        title.textContent = 'Sign up to receive the latest updates and news';

        const form = document.createElement('form');
        form.classList.add('form');

        const emailInput = document.createElement('input');
        emailInput.classList.add('email-input');
        emailInput.type = 'email';
        emailInput.placeholder = 'Enter your email';

        const submitInput = document.createElement('input');
        submitInput.type = 'submit';
        submitInput.value = 'submit';
        submitInput.classList.add('btn', 'form-btn');

        this.wrapper.appendChild(title);
        this.wrapper.appendChild(form);
        form.appendChild(emailInput);
        form.appendChild(submitInput);

        return section;
    }
}
