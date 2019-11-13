import '../../stencil.core';
import { ComponentInterface } from '../../stencil.core';
import { Color, Config, Mode } from '../../interface';
export declare class BackButton implements ComponentInterface {
    el: HTMLElement;
    config: Config;
    win: Window;
    /**
     * The color to use from your application's color palette.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     * For more information on colors, see [theming](/docs/theming/basics).
     */
    color?: Color;
    /**
     * The mode determines which platform styles to use.
     */
    mode: Mode;
    /**
     * The url to navigate back to by default when there is no history.
     */
    defaultHref?: string;
    /**
     * The icon name to use for the back button.
     */
    icon?: string | null;
    /**
     * The text to display in the back button.
     */
    text?: string | null;
    onClick(ev: Event): Promise<boolean>;
    private readonly backButtonIcon;
    private readonly backButtonText;
    private readonly hasIconOnly;
    private readonly rippleType;
    hostData(): {
        class: {
            'button': boolean;
            'back-button-has-icon-only': boolean;
            'ion-activatable': boolean;
            'ion-focusable': boolean;
            'show-back-button': boolean;
        } | {
            [x: string]: boolean;
            'button': boolean;
            'back-button-has-icon-only': boolean;
            'ion-activatable': boolean;
            'ion-focusable': boolean;
            'show-back-button': boolean;
        };
    };
    render(): JSX.Element;
}
