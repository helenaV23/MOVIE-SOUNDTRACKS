import { IComponent } from "../models";

export class FooterComponent implements IComponent {
    private policy: HTMLElement;
    private socialMedia: HTMLElement;
    private policyLinks: string[] = [
        'PRIVACY POLICY', 'COOKIE POLICY'
    ];
    private socialLinks: string[] = [
        'images/footer/twitter-icon.svg', 'images/footer/instagram-icon.svg', 'images/footer/facebook-icon.svg'
    ];

    public render(): HTMLElement {
        const footer = document.createElement('footer');
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper', 'push-apart');
        footer.appendChild(wrapper);

        this.policy = document.createElement('ul');
        this.policy.classList.add('policy');
        wrapper.appendChild(this.policy);

        this.socialMedia = document.createElement('ul');
        this.socialMedia.classList.add('social-media');
        wrapper.appendChild(this.socialMedia);

        this.createPolicyItems();
        this.createMediaItems();

        return footer;
    }

    private createPolicyItems() {
        for (let index = 0; index < this.policyLinks.length; index++) {
            const itemPolicy = document.createElement('li');
            const policyLink = document.createElement('a');
            policyLink.classList.add('policy-link');
            policyLink.href = '#';
            policyLink.textContent = this.policyLinks[index];

            itemPolicy.appendChild(policyLink);
            this.policy.appendChild(itemPolicy);
        }
    }

    private createMediaItems() {
        for (let index = 0; index < this.socialLinks.length; index++) {
            const mediaItem = document.createElement('li');
            const mediaLink = document.createElement('a');
            mediaLink.classList.add('social-media-icon');
            mediaLink.href = '#';
            const mediaIcon = document.createElement('img');
            mediaIcon.src = this.socialLinks[index];

            this.socialMedia.appendChild(mediaItem);
            mediaItem.appendChild(mediaLink);
            mediaLink.appendChild(mediaIcon); 
        }
    }
}
