import { IComponent } from "../models";
import { DataService } from "../services/data.service";
import { ServiceLocator, Services } from "../services/service-locator";
import { getMovieRating } from "../utils";

export class HeaderComponent implements IComponent {
    private menuLinks: string[] = [
        'Search', 'Add to the favorites', 'FAQ'
    ];

    private dataService: DataService = ServiceLocator.inject<DataService>(Services.dataService);
    private menu: HTMLElement;
    private submenu: HTMLElement;
    private menuWrapper: HTMLElement;
    private menuBtn: HTMLButtonElement;

    public render(): HTMLElement {
        const header = document.createElement('header');
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper', 'push-apart');
        header.appendChild(wrapper);

        const logoLink = this.createLogo();
        wrapper.appendChild(logoLink);
        
        this.createMenuBtn();
        wrapper.appendChild(this.menuBtn);
        
        this.menuWrapper = document.createElement('nav');
        this.menuWrapper.classList.add('menu-wrapper');
        wrapper.appendChild(this.menuWrapper);

        this.createMenuLinks();
        this.menuWrapper.appendChild(this.menu);

        const dropdown = document.createElement('li');
        dropdown.classList.add('dropdown');
        this.menu.appendChild(dropdown);

        const ratingLink = document.createElement('a');
        ratingLink.classList.add('menu-link');
        ratingLink.href = '#';
        ratingLink.textContent = 'Rating';
        dropdown.appendChild(ratingLink);

        this.createSubMenuLinks();
        dropdown.appendChild(this.submenu);

        return header;
    }

    private createLogo(): HTMLElement {
        const logoLink = document.createElement('a');
        logoLink.href = "#";
        const logoImg = document.createElement('img');
        logoImg.src = 'images/logo.svg';
        logoImg.alt = 'logo';
        logoLink.appendChild(logoImg);

        return logoLink;
    }

    private createMenuBtn(): void {
        this.menuBtn = document.createElement('button');
        this.menuBtn.classList.add('menu-btn');
        const span = document.createElement('span');
        this.menuBtn.appendChild(span);

        this.menuBtn.addEventListener('click', () => {
            this.menuWrapper.classList.toggle('open-burger-menu');
            this.menuBtn.classList.toggle('menu-btn-active');
            document.body.classList.toggle('lock');
        });
    }

    private createMenuLinks(): void {
        this.menu = document.createElement('ul');
        this.menu.classList.add('menu');

        for (let index = 0; index < this.menuLinks.length; index++) {
            const menuItem = document.createElement('li');
            const menuLink = document.createElement('a');
            menuLink.classList.add('menu-link');
            menuLink.href = '#';
            menuLink.textContent = this.menuLinks[index];

            this.menu.appendChild(menuItem);
            menuItem.appendChild(menuLink);
        }
    }

    private createSubMenuLinks(): void {
        this.submenu = document.createElement('ul');
        this.submenu.classList.add('submenu');
        const data = this.dataService.getRating();

        data.forEach((item) => {
            const subMenuItem = document.createElement('li');
            subMenuItem.classList.add('submenu-item');
            const submenuLink = document.createElement('a');
            submenuLink.classList.add('submenu-link');
            submenuLink.href = `#rating-${item.rating}`;
            submenuLink.textContent = getMovieRating(item.rating);

            submenuLink.addEventListener('click', () => {
                document.body.classList.remove('lock');
                this.menuWrapper.classList.remove('open-burger-menu');
                this.menuBtn.classList.remove('menu-btn-active');
            });

            subMenuItem.appendChild(submenuLink);
            this.submenu.appendChild(subMenuItem);
        });
    }
}
