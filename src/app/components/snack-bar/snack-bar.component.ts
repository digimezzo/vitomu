import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-snack-bar',
    host: { style: 'display: block; position: absolute; z-index: 2000; bottom: 0; left : 0; right: 0' },
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('expandCollapse', [
            state('collapsed', style({ height: '0', overflow: 'hidden' })),
            state('expanded', style({ height: '60px' })),
            transition('collapsed => expanded', animate('150ms ease-in')),
            transition('expanded => collapsed', animate('150ms ease-out')),
        ]),
    ],
})
export class SnackBarComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();

    public constructor(private snackBarService: SnackBarService) {
    }

    public text: string = '';
    public isExpanded: boolean = false;
    
    public ngOnInit(): void {
        this.subscription.add(
            this.snackBarService.showNotification$.subscribe((text: string) => {
                this.showSnackBar(text);
            }),
        );

        this.subscription.add(
            this.snackBarService.dismissNotification$.subscribe(() => {
                this.dismissSnackBar();
            }),
        );
    }

    public ngOnDestroy(): void {
    }

    public dismiss(): void {
        this.snackBarService.dismiss();
    }

    private showSnackBar(text: string): void {
        this.text = text;
        this.isExpanded = true;
    }

    private dismissSnackBar(): void {
        this.isExpanded = false;
    }
}
