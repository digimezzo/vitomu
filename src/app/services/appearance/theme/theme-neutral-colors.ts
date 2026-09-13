export class ThemeNeutralColors {
    constructor(
        public windowButtonIcon: string,
        public hoveredItemBackground: string,
        public selectedItemBackground: string = '',
        public tabText: string = '',
        public selectedTabText: string = '',
        public mainBackground: string = '',
        public headerBackground: string = '',
        public footerBackground: string = '',
        public sidePaneBackground: string = '',
        public primaryText: string = '',
        public secondaryText: string = '',
        public sliderBackground: string = '',
        public sliderThumbBackground: string = '',
        public albumCoverBackground: string = '',
        public headerSeparator: string = '',
        public paneSeparators: string = '',
        public settingsSeparators: string = '',
        public contextMenuSeparators: string = '',
        public scrollBars: string = '',
        public searchBox: string = '',
        public searchBoxText: string = '',
        public searchBoxIcon: string = '',
        public dialogBackground: string = '',
        public primaryButtonText: string = '',
        public secondaryButtonBackground: string = '',
        public secondaryButtonText: string = '',
        public tooltipText: string = '',
        public buttonBorder: string = '',
        public highlightForeground: string = ''
    ) {
        if (arguments.length === 11) {
            const legacyTabText = this.selectedItemBackground;
            const legacySelectedTabText = this.tabText;
            const legacyMainBackground = this.selectedTabText;
            const legacyHeaderBackground = this.mainBackground;
            const legacyPrimaryText = this.headerBackground;
            const legacySecondaryText = this.footerBackground;
            const legacySettingsSeparators = this.sidePaneBackground;
            const legacyScrollBars = this.primaryText;
            const legacyButtonText = this.secondaryText;

            this.selectedItemBackground = this.hoveredItemBackground;
            this.tabText = legacyTabText;
            this.selectedTabText = legacySelectedTabText;
            this.mainBackground = legacyMainBackground;
            this.headerBackground = legacyHeaderBackground;
            this.footerBackground = legacyHeaderBackground;
            this.sidePaneBackground = legacyHeaderBackground;
            this.primaryText = legacyPrimaryText;
            this.secondaryText = legacySecondaryText;
            this.sliderBackground = legacyHeaderBackground;
            this.sliderThumbBackground = legacyPrimaryText;
            this.albumCoverBackground = legacyHeaderBackground;
            this.headerSeparator = 'transparent';
            this.paneSeparators = 'transparent';
            this.settingsSeparators = legacySettingsSeparators;
            this.contextMenuSeparators = legacySettingsSeparators;
            this.scrollBars = legacyScrollBars;
            this.searchBox = legacyHeaderBackground;
            this.searchBoxText = legacyPrimaryText;
            this.searchBoxIcon = legacySecondaryText;
            this.dialogBackground = legacyHeaderBackground;
            this.primaryButtonText = legacyButtonText;
            this.secondaryButtonBackground = legacyHeaderBackground;
            this.secondaryButtonText = legacyButtonText;
            this.tooltipText = legacyButtonText;
            this.buttonBorder = legacyHeaderBackground;
            this.highlightForeground = legacyButtonText;
        }
    }

    public get primaryBackground(): string {
        return this.mainBackground;
    }

    public get secondaryBackground(): string {
        return this.headerBackground;
    }

    public get buttonText(): string {
        return this.primaryButtonText;
    }
}
